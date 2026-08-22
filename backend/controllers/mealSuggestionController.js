const Pantry = require('../models/Pantry');
const Recipe = require('../models/Recipe');
const ShoppingList = require('../models/ShoppingList');
const CookingLog = require('../models/CookingLog');
const { checkFundamentalIngredients } = require('../utils/pantryHelper');
const { normalizeIngredient, getIngredientCategory } = require('../utils/urduHelper');
const levenshtein = require('fast-levenshtein');

const nonIngredientKeywords = [
  'toaster', 'pressure cooker', 'pan', 'pot', 'oven', 'microwave',
  'blender', 'mixer', 'grinder', 'stove', 'cooker', 'utensil',
  'bowl', 'plate', 'cup', 'spoon', 'fork', 'knife', 'cutting board',
  'hyderabadi', 'punjabi', 'mughlai', 'awadhi', 'kashmiri', 'bengali',
  'boil', 'fry', 'roast', 'bake', 'grill', 'steam', 'chop', 'slice',
  'dice', 'mince'
];

const isValidIngredient = (ingredient) => {
  if (!ingredient || typeof ingredient !== 'string') return false;

  const lowerIng = ingredient.toLowerCase().trim();

  if (lowerIng.length < 2) return false;

  const hasLetters = /[a-z\u0600-\u06FF]/i.test(lowerIng);

  if (!hasLetters) return false;

  for (const keyword of nonIngredientKeywords) {
    if (lowerIng.includes(keyword)) return false;
  }

  return true;
};

const normalizeText = (str) => {
  if (!str) return '';
  return normalizeIngredient(String(str));
};

const parseQuantity = (value) => {
  if (value === undefined || value === null || value === '') return 1;

  if (typeof value === 'number') {
    return value > 0 ? value : 1;
  }

  const text = String(value).trim();

  if (!text) return 1;

  if (text.includes('/')) {
    const parts = text.split('/');

    if (parts.length === 2) {
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);

      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        return numerator / denominator;
      }
    }
  }

  const mixedFraction = text.match(/^(\d+)\s+(\d+)\/(\d+)$/);

  if (mixedFraction) {
    const whole = parseFloat(mixedFraction[1]);
    const numerator = parseFloat(mixedFraction[2]);
    const denominator = parseFloat(mixedFraction[3]);

    if (!isNaN(whole) && !isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      return whole + numerator / denominator;
    }
  }

  const number = parseFloat(text);

  return !isNaN(number) && number > 0 ? number : 1;
};

const normalizeUnit = (unit) => {
  if (!unit) return 'pieces';

  const value = String(unit).toLowerCase().trim();

  const aliases = {
    kilo: 'kg',
    kilos: 'kg',
    kilogram: 'kg',
    kilograms: 'kg',

    gram: 'g',
    grams: 'g',

    liter: 'liters',
    litre: 'liters',
    litres: 'liters',
    l: 'liters',

    milliliter: 'ml',
    milliliters: 'ml',
    millilitre: 'ml',
    millilitres: 'ml',

    piece: 'pieces',
    pcs: 'pieces',
    pc: 'pieces',

    dozen: 'dozen',
    dozens: 'dozen'
  };

  return aliases[value] || value;
};

const convertQuantity = (quantity, fromUnit, toUnit) => {
  const from = normalizeUnit(fromUnit);
  const to = normalizeUnit(toUnit);

  if (from === to) return quantity;

  if (from === 'kg' && to === 'g') return quantity * 1000;
  if (from === 'g' && to === 'kg') return quantity / 1000;

  if (from === 'liters' && to === 'ml') return quantity * 1000;
  if (from === 'ml' && to === 'liters') return quantity / 1000;

  if (from === 'dozen' && to === 'pieces') return quantity * 12;
  if (from === 'pieces' && to === 'dozen') return quantity / 12;

  return null;
};

const extractIngredientData = (recipe) => {
  const result = [];

  if (Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0) {
    for (const ingredient of recipe.ingredients) {
      if (typeof ingredient === 'string') {
        if (isValidIngredient(ingredient)) {
          result.push({
            name: ingredient,
            quantity: 1,
            unit: 'pieces'
          });
        }
        continue;
      }

      if (ingredient && typeof ingredient === 'object') {
        const name =
          ingredient.name ||
          ingredient.ingredient ||
          ingredient.item ||
          ingredient.title;

        if (!name || !isValidIngredient(String(name))) continue;

        result.push({
          name: String(name).trim(),
          quantity: parseQuantity(
            ingredient.quantity ??
            ingredient.amount ??
            ingredient.qty ??
            1
          ),
          unit: normalizeUnit(
            ingredient.unit ||
            ingredient.measurement ||
            'pieces'
          )
        });
      }
    }

    if (result.length > 0) return result;
  }

  if (Array.isArray(recipe.ingredientsRaw) && recipe.ingredientsRaw.length > 0) {
    for (const raw of recipe.ingredientsRaw) {
      if (!raw || typeof raw !== 'string') continue;

      const text = raw.trim();

      const match = text.match(
        /^((?:\d+(?:\.\d+)?|\d+\s+\d+\/\d+|\d+\/\d+))\s*(kg|g|grams?|kilograms?|liters?|litres?|l|ml|milliliters?|pieces?|pcs?|dozen)?\s+(.+)$/i
      );

      if (match) {
        const quantity = parseQuantity(match[1]);
        const unit = normalizeUnit(match[2] || 'pieces');
        const name = match[3].trim();

        if (isValidIngredient(name)) {
          result.push({
            name,
            quantity,
            unit
          });
        }
      } else if (isValidIngredient(text)) {
        result.push({
          name: text,
          quantity: 1,
          unit: 'pieces'
        });
      }
    }

    if (result.length > 0) return result;
  }

  if (Array.isArray(recipe.pantryKeywords) && recipe.pantryKeywords.length > 0) {
    return recipe.pantryKeywords
      .filter(isValidIngredient)
      .map(name => ({
        name,
        quantity: 1,
        unit: 'pieces'
      }));
  }

  return [];
};

const getRecipeIngredients = (recipe) => {
  if (recipe.pantryKeywords && recipe.pantryKeywords.length > 0) {
    return recipe.pantryKeywords;
  }
  
  const extracted = extractIngredientData(recipe).map(item => item.name);
  return extracted;
};

const scaleIngredientForDeduction = (ingredient, scaleFactor) => {
  if (!ingredient) return 1;

  const match = String(ingredient).match(
    /^((?:\d+(?:\.\d+)?|\d+\s+\d+\/\d+|\d+\/\d+))/
  );

  if (!match) return 1;

  return parseQuantity(match[1]) * scaleFactor;
};

const scaleIngredientText = (ingredient, scaleFactor) => {
  if (!ingredient) return ingredient;

  const match = String(ingredient).match(
    /^((?:\d+(?:\.\d+)?|\d+\s+\d+\/\d+|\d+\/\d+))(\s*)(.*)$/
  );

  if (!match) return ingredient;

  const quantity = parseQuantity(match[1]);
  const scaledQty = quantity * scaleFactor;

  const formattedQty = Number.isInteger(scaledQty)
    ? String(scaledQty)
    : scaledQty.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');

  return `${formattedQty}${match[2]}${match[3]}`.trim();
};

const isIngredientMatch = (pantryItem, recipeIngredient) => {
  const p = normalizeText(pantryItem);
  const r = normalizeText(recipeIngredient);

  if (!p || !r) return false;

  if (p === r) return true;

  if (p.includes(r) || r.includes(p)) return true;

  const distance = levenshtein.get(p, r);

  if (distance <= 2) return true;

  const pWords = p.split(/\s+/);
  const rWords = r.split(/\s+/);

  if (pWords.some(word => word.length > 2 && rWords.includes(word))) {
    return true;
  }

  return false;
};

const calculateMatchPercentage = (recipe, pantryItems) => {
  try {
    const recipeIngredients = getRecipeIngredients(recipe);

    if (recipeIngredients.length === 0) return 50;
    if (!pantryItems || pantryItems.length === 0) return 0;

    const pantryNames = pantryItems
      .map(item => {
        const name = item.name || item.itemName || '';
        return normalizeText(name);
      })
      .filter(name => name.length > 0);

    if (pantryNames.length === 0) return 0;

    let matchedCount = 0;

    for (const ingredient of recipeIngredients) {
      const normalizedIng = normalizeText(ingredient);

      if (!normalizedIng) continue;

      const found = pantryNames.some(pantryName =>
        isIngredientMatch(pantryName, normalizedIng)
      );

      if (found) matchedCount++;
    }

    const matchPercent = Math.round(
      (matchedCount / recipeIngredients.length) * 100
    );

    return Math.min(100, matchPercent);
  } catch (error) {
    return 50;
  }
};

const getMissingIngredients = (recipe, pantryItems) => {
  try {
    const recipeIngredients = getRecipeIngredients(recipe);

    if (recipeIngredients.length === 0) return [];

    if (!pantryItems || pantryItems.length === 0) {
      return recipeIngredients.slice(0, 5);
    }

    const missing = recipeIngredients.filter(ingredient => {
      const normalizedIng = normalizeText(ingredient);

      if (!normalizedIng) return false;

      return !pantryItems.some(item =>
        isIngredientMatch(
          normalizeText(item.name || item.itemName),
          normalizedIng
        )
      );
    });

    return missing.filter(isValidIngredient).slice(0, 5);
  } catch (error) {
    return [];
  }
};

const deductPantryItems = async (userId, recipe, scaleFactor) => {
  const pantry = await Pantry.findOne({ userId });

  if (!pantry || !Array.isArray(pantry.items) || pantry.items.length === 0) {
    return [];
  }

  const ingredients = extractIngredientData(recipe);

  if (ingredients.length === 0) {
    return [];
  }

  const deductedItems = [];

  for (const ingredient of ingredients) {
    const recipeName = normalizeText(ingredient.name);

    if (!recipeName) continue;

    const pantryItem = pantry.items.find(item =>
      isIngredientMatch(
        normalizeText(item.name),
        recipeName
      )
    );

    if (!pantryItem) continue;

    const recipeQuantity = parseQuantity(ingredient.quantity);
    const scaledQuantity = recipeQuantity * scaleFactor;
    const recipeUnit = normalizeUnit(ingredient.unit);
    const pantryUnit = normalizeUnit(pantryItem.unit);

    let quantityToDeduct = convertQuantity(
      scaledQuantity,
      recipeUnit,
      pantryUnit
    );

    if (quantityToDeduct === null) {
      if (recipeUnit === pantryUnit) {
        quantityToDeduct = scaledQuantity;
      } else {
        continue;
      }
    }

    if (!quantityToDeduct || quantityToDeduct <= 0) continue;

    const oldQuantity = Number(pantryItem.quantity) || 0;
    const newQuantity = Math.max(0, oldQuantity - quantityToDeduct);

    pantryItem.quantity = newQuantity;
    pantryItem.isLowStock = newQuantity <= 2;

    deductedItems.push({
      name: pantryItem.name,
      unit: pantryItem.unit,
      oldQuantity,
      deducted: Math.min(oldQuantity, quantityToDeduct),
      newQuantity
    });

    if (newQuantity === 0) {
      pantry.items = pantry.items.filter(
        item => item._id.toString() !== pantryItem._id.toString()
      );
    }
  }

  await pantry.save();

  return deductedItems;
};

const getMealSuggestions = async (req, res) => {
  try {
    const {
      search = '',
      mealTime,
      dietType,
      allergy,
      ageGroup,
      limit = 50,
      skipFundamental = 'false',
      pantry: pantryQuery
    } = req.query;

    const userId = req.user._id || req.user.id;

    let pantryItems = [];

    if (pantryQuery && pantryQuery.trim() !== '') {
      pantryItems = pantryQuery
        .split(',')
        .map(name => ({
          name: name.trim().toLowerCase(),
          itemName: name.trim().toLowerCase()
        }));
    }

    if (pantryItems.length === 0) {
      const pantryDoc = await Pantry.findOne({ userId }).lean();

      if (pantryDoc?.items) {
        pantryItems = pantryDoc.items;
      }
    }

    const shouldSkip = skipFundamental === 'true';

    let missingFundamentalsList = null;

    if (!shouldSkip) {
      let dietTypeForFundamental = null;

      if (dietType === 'veg') {
        dietTypeForFundamental = 'veg';
      } else if (dietType === 'non-veg') {
        dietTypeForFundamental = 'non-veg';
      }

      const fundamentalCheck = checkFundamentalIngredients(
        pantryItems,
        dietTypeForFundamental
      );

      if (!fundamentalCheck.hasFundamentals) {
        missingFundamentalsList = fundamentalCheck.missingFundamentals;
      }
    }

    const query = { isActive: true };

    if (search && search.trim() !== '') {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { subCategory: { $regex: search, $options: 'i' } }
      ];
    }

  if (mealTime && mealTime.toLowerCase() !== 'all') {
  const normalizedMealTime =
    mealTime.trim().toLowerCase();

  const mealTimeMap = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack',
    appetizer: 'Appetizer',
    dessert: 'Dessert',
    anytime: 'Anytime'
  };

  const mealValue = mealTimeMap[normalizedMealTime];

  if (mealValue) {
    query.$or = [
      { category: mealValue },
      { suitableForMeals: mealValue }
    ];
  }
}

    if (dietType && dietType !== 'all') {
      let dietFilter =
        dietType === 'veg'
          ? 'Vegetarian'
          : 'Non-Vegetarian';

      if (dietType === 'eggetarian') {
        dietFilter = 'Vegetarian';
      }

      query.dietType = dietFilter;
    }

    if (allergy && allergy !== 'none') {
      query.allergens = {
        $nin: [allergy.toLowerCase()]
      };
    }

    if (ageGroup && ageGroup !== 'general') {
      const ageMap = {
        toddler: 'toddlers',
        patient: 'seniors',
        'family-mix': ['adults', 'seniors']
      };

      const ageValue = ageMap[ageGroup];

      if (ageValue) {
        query.ageGroup = Array.isArray(ageValue)
          ? { $in: ageValue }
          : { $in: [ageValue] };
      }
    }

    const recipes = await Recipe.find(query)
      .limit(parseInt(limit))
      .lean();

    if (!recipes || recipes.length === 0) {
      return res.json({
        success: true,
        suggestions: [],
        total: 0
      });
    }

    const suggestions = recipes
      .map(recipe => {
        try {
          const match = calculateMatchPercentage(
            recipe,
            pantryItems
          );

          const missing = getMissingIngredients(
            recipe,
            pantryItems
          );

          return {
            id: recipe._id,
            name: recipe.title || 'Untitled',
            category: recipe.category || 'General',
            subCategory: recipe.subCategory || '',
            dietType: recipe.dietType || 'Vegetarian',
            cookingTime: recipe.cookingTime || 30,
            match: isNaN(match) ? 50 : match,
            image: recipe.image || '',
            missing: missing.slice(0, 5),
            baseServings: recipe.baseServings || 4
          };
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean);

    suggestions.sort((a, b) => b.match - a.match);

    res.json({
      success: true,
      suggestions,
      total: recipes.length,
      filtered: suggestions.length,
      missingFundamentals: missingFundamentalsList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const cookRecipe = async (req, res) => {
  try {
    const {
      recipeId,
      members,
      scaleFactor
    } = req.body;

    const userId = req.user._id || req.user.id;

    if (!recipeId) {
      return res.status(400).json({
        success: false,
        message: 'recipeId required'
      });
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    const selectedMembers = parseInt(members) || recipe.baseServings || 4;

    const scale =
      scaleFactor ||
      selectedMembers / (recipe.baseServings || 4);

    const deductedItems = await deductPantryItems(
      userId,
      recipe,
      scale
    );

    const today = new Date()
      .toISOString()
      .split('T')[0];

    const dayName = new Date(today).toLocaleDateString(
      'en-US',
      { weekday: 'long' }
    );

    let cookingLog = await CookingLog.findOne({
      userId,
      date: today
    });

    if (!cookingLog) {
      cookingLog = new CookingLog({
        userId,
        date: today,
        dayName,
        meals: []
      });
    }

    cookingLog.meals.push({
      recipeId,
      recipeName: recipe.title,
      members: selectedMembers,
      ingredientsUsed: deductedItems
    });

    await cookingLog.save();

    const scaledIngredientsRaw =
      Array.isArray(recipe.ingredientsRaw)
        ? recipe.ingredientsRaw.map(ingredient =>
            scaleIngredientText(ingredient, scale)
          )
        : [];

    res.json({
      success: true,
      message: `${recipe.title} cooked for ${selectedMembers} people`,
      deductedItems,
      scaledRecipe: {
        id: recipe._id,
        title: recipe.title,
        tagline: recipe.tagline,
        description: recipe.description,
        image: recipe.image,
        ingredientsRaw: scaledIngredientsRaw,
        stepsRaw: recipe.stepsRaw,
        cookingTime: recipe.cookingTime,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        dietType: recipe.dietType,
        category: recipe.category,
        subCategory: recipe.subCategory,
        baseServings: recipe.baseServings,
        requestedMembers: selectedMembers,
        scaleFactor: scale
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const addToShoppingList = async (req, res) => {
  try {
    const { missingIngredients } = req.body;
    const userId = req.user._id || req.user.id;

    if (!missingIngredients || missingIngredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No missing ingredients to add'
      });
    }

    let shoppingList = await ShoppingList.findOne({ userId });

    if (!shoppingList) {
      shoppingList = new ShoppingList({
        userId,
        items: []
      });
    }

    const addedItems = [];
    const alreadyExist = [];

    for (const ingredient of missingIngredients) {
      if (!isValidIngredient(ingredient)) continue;

      const existingItem = shoppingList.items.find(
        item =>
          item.name?.toLowerCase() === ingredient.toLowerCase() &&
          !item.purchased
      );

      if (existingItem) {
        alreadyExist.push(ingredient);
      } else {
        const category = getIngredientCategory(ingredient);

        shoppingList.items.push({
          name: ingredient,
          quantity: 1,
          unit: 'pieces',
          category,
          fromPantry: false,
          purchased: false,
          source: 'meal-suggestion'
        });

        addedItems.push(ingredient);
      }
    }

    await shoppingList.save();

    res.json({
      success: true,
      message: `Added ${addedItems.length} items`,
      addedItems,
      alreadyExist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getCookingLogByDate = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { date } = req.params;

    const cookingLog = await CookingLog.findOne({
      userId,
      date
    });

    const isNoCookingDay =
      cookingLog?.isComplete === true &&
      (!cookingLog?.meals || cookingLog.meals.length === 0);

    res.json({
      success: true,
      date,
      meals: cookingLog?.meals || [],
      isComplete: cookingLog?.isComplete || false,
      isNoCookingDay
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const addToCookingLog = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const {
      date,
      recipeId,
      recipeName,
      members,
      noCooking
    } = req.body;

    const dayName = new Date(date).toLocaleDateString(
      'en-US',
      { weekday: 'long' }
    );

    let cookingLog = await CookingLog.findOne({
      userId,
      date
    });

    if (!cookingLog) {
      cookingLog = new CookingLog({
        userId,
        date,
        dayName,
        meals: []
      });
    }

    if (noCooking) {
      cookingLog.isComplete = true;
      cookingLog.meals = [];

      await cookingLog.save();

      return res.json({
        success: true,
        message: 'Marked as no cooking day',
        isNoCookingDay: true
      });
    }

    cookingLog.meals.push({
      recipeId,
      recipeName,
      members: parseInt(members),
      ingredientsUsed: []
    });

    cookingLog.isComplete = false;

    await cookingLog.save();

    res.json({
      success: true,
      message: 'Meal added successfully',
      cookingLog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateCookingLogMeal = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { date, mealId } = req.params;
    const { recipeId, recipeName, members } = req.body;

    const cookingLog = await CookingLog.findOne({
      userId,
      date
    });

    if (!cookingLog) {
      return res.status(404).json({
        success: false,
        message: 'Log not found'
      });
    }

    const meal = cookingLog.meals.id(mealId);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }

    if (recipeId) meal.recipeId = recipeId;
    if (recipeName) meal.recipeName = recipeName;
    if (members) meal.members = parseInt(members);

    cookingLog.isComplete = false;

    await cookingLog.save();

    res.json({
      success: true,
      message: 'Meal updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteCookingLogMeal = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { date, mealId } = req.params;

    const cookingLog = await CookingLog.findOne({
      userId,
      date
    });

    if (!cookingLog) {
      return res.status(404).json({
        success: false,
        message: 'Log not found'
      });
    }

    cookingLog.meals = cookingLog.meals.filter(
      meal => meal._id.toString() !== mealId
    );

    if (
      cookingLog.meals.length === 0 &&
      cookingLog.isComplete !== true
    ) {
      cookingLog.isComplete = false;
    }

    await cookingLog.save();

    res.json({
      success: true,
      message: 'Meal deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMonthHistory = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const cookingLogs = await CookingLog.find({
      userId
    }).sort({ date: -1 });

    const meals = [];

    for (const log of cookingLogs) {
      for (const meal of log.meals) {
        meals.push({
          date: log.date,
          dayName: log.dayName,
          recipeName: meal.recipeName,
          members: meal.members,
          recipeId: meal.recipeId
        });
      }
    }

    res.json({
      success: true,
      meals,
      total: meals.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getMealSuggestions,
  addToShoppingList,
  cookRecipe,
  getCookingLogByDate,
  addToCookingLog,
  updateCookingLogMeal,
  deleteCookingLogMeal,
  getMonthHistory
};