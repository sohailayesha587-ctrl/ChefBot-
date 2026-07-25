const Recipe = require('../models/Recipe');
const CookingLog = require('../models/CookingLog');

const getMealSuggestions = async (req, res) => {
  try {
    const { search = '', mealTime, dietType, limit = 50 } = req.query;
    const userId = req.user._id || req.user.id;
    
    let pantryItems = [];
    const pantry = await Pantry.findOne({ userId });
    if (pantry) pantryItems = pantry.items || [];
    
    let query = { isActive: true };
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (mealTime && mealTime !== 'all') {
      query.suitableForMeals = { $in: [mealTime] };
    }
    if (dietType && dietType !== 'all') {
      query.dietType = dietType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian';
    }
    
    const recipes = await Recipe.find(query).limit(parseInt(limit)).lean();
    
    const suggestions = recipes.map(recipe => {
      let match = 0;
      const recipeIngredients = recipe.ingredientsRaw || [];
      const pantryNames = pantryItems.map(p => p.name.toLowerCase());
      
      if (recipeIngredients.length > 0 && pantryNames.length > 0) {
        let matched = 0;
        recipeIngredients.forEach(ing => {
          const ingName = ing.toLowerCase();
          if (pantryNames.some(p => ingName.includes(p) || p.includes(ingName))) {
            matched++;
          }
        });
        match = Math.round((matched / recipeIngredients.length) * 100);
      }
      
      return {
        id: recipe._id,
        name: recipe.title || 'Untitled',
        category: recipe.category || 'General',
        dietType: recipe.dietType || 'Vegetarian',
        cookingTime: recipe.cookingTime || 30,
        match: match,
        image: recipe.image || '',
        baseServings: recipe.baseServings || 4
      };
    });
    
    suggestions.sort((a, b) => b.match - a.match);
    res.json({ success: true, suggestions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const cookRecipe = async (req, res) => {
  try {
    const { recipeId, members = 4 } = req.body;
    const userId = req.user._id || req.user.id;
    
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    
    const pantry = await Pantry.findOne({ userId });
    const deductedItems = [];
    
    if (pantry && pantry.items.length > 0) {
      const recipeIngredients = recipe.ingredientsRaw || [];
      const scale = members / (recipe.baseServings || 4);
      
      recipeIngredients.forEach(ing => {
        const ingName = ing.toLowerCase();
        const pantryItem = pantry.items.find(p => 
          ingName.includes(p.name.toLowerCase()) || 
          p.name.toLowerCase().includes(ingName)
        );
        
        if (pantryItem) {
          const qty = parseFloat(ing.match(/[\d.]+/)?.[0] || 1) * scale;
          const oldQty = pantryItem.quantity;
          pantryItem.quantity = Math.max(0, pantryItem.quantity - qty);
          
          deductedItems.push({
            name: pantryItem.name,
            oldQuantity: oldQty,
            newQuantity: pantryItem.quantity,
            deducted: qty
          });
          
          if (pantryItem.quantity === 0) {
            pantry.items = pantry.items.filter(p => p.name !== pantryItem.name);
          }
        }
      });
      
      await pantry.save();
    }
    
    const today = new Date().toISOString().split('T')[0];
    let cookingLog = await CookingLog.findOne({ userId, date: today });
    if (!cookingLog) {
      cookingLog = new CookingLog({ 
        userId, 
        date: today, 
        meals: [] 
      });
    }
    
    cookingLog.meals.push({
      recipeId: recipe._id,
      recipeName: recipe.title,
      members: members,
      ingredientsUsed: deductedItems
    });
    
    await cookingLog.save();
    
    res.json({
      success: true,
      message: recipe.title + ' cooked for ' + members + ' people',
      deductedItems
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToShoppingList = async (req, res) => {
  try {
    const { ingredients } = req.body;
    const userId = req.user._id || req.user.id;
    
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No ingredients to add' 
      });
    }
    
    let shoppingList = await ShoppingList.findOne({ userId });
    if (!shoppingList) {
      shoppingList = new ShoppingList({ userId, items: [] });
    }
    
    const addedItems = [];
    ingredients.forEach(ing => {
      const exists = shoppingList.items.some(item => 
        item.name.toLowerCase() === ing.toLowerCase() && !item.purchased
      );
      
      if (!exists) {
        shoppingList.items.push({
          name: ing,
          quantity: 1,
          purchased: false
        });
        addedItems.push(ing);
      }
    });
    
    await shoppingList.save();
    res.json({ 
      success: true, 
      message: addedItems.length + ' items added to shopping list',
      addedItems 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCookingLogByDate = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { date } = req.params;
    
    const log = await CookingLog.findOne({ userId, date });
    res.json({ 
      success: true, 
      date, 
      meals: log?.meals || [],
      isComplete: log?.isComplete || false
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToCookingLog = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { date, recipeId, recipeName, members, noCooking } = req.body;
    
    let log = await CookingLog.findOne({ userId, date });
    if (!log) {
      log = new CookingLog({ userId, date, meals: [] });
    }
    
    if (noCooking) {
      log.isComplete = true;
      log.meals = [];
    } else {
      log.meals.push({
        recipeId,
        recipeName,
        members: parseInt(members) || 4
      });
      log.isComplete = false;
    }
    
    await log.save();
    res.json({ success: true, message: 'Log updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCookingLogMeal = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { date, mealId } = req.params;
    const { recipeId, recipeName, members } = req.body;
    
    const log = await CookingLog.findOne({ userId, date });
    if (!log) {
      return res.status(404).json({ success: false, message: 'Log not found' });
    }
    
    const meal = log.meals.id(mealId);
    if (!meal) {
      return res.status(404).json({ success: false, message: 'Meal not found' });
    }
    
    if (recipeId) meal.recipeId = recipeId;
    if (recipeName) meal.recipeName = recipeName;
    if (members) meal.members = parseInt(members);
    
    await log.save();
    res.json({ success: true, message: 'Meal updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCookingLogMeal = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { date, mealId } = req.params;
    
    const log = await CookingLog.findOne({ userId, date });
    if (!log) {
      return res.status(404).json({ success: false, message: 'Log not found' });
    }
    
    log.meals = log.meals.filter(m => m._id.toString() !== mealId);
    await log.save();
    
    res.json({ success: true, message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMonthHistory = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const logs = await CookingLog.find({ userId }).sort({ date: -1 });
    
    const meals = [];
    logs.forEach(log => {
      log.meals.forEach(meal => {
        meals.push({
          date: log.date,
          recipeName: meal.recipeName,
          members: meal.members
        });
      });
    });
    
    res.json({ success: true, meals, total: meals.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMealSuggestions,
  cookRecipe,
  addToShoppingList,
  getCookingLogByDate,
  addToCookingLog,
  updateCookingLogMeal,
  deleteCookingLogMeal,
  getMonthHistory
};