const Pantry = require('../models/Pantry');
const Recipe = require('../models/Recipe');
const ShoppingList = require('../models/ShoppingList');

// ==================
// GET MEAL SUGGESTIONS WITH SEARCH QUERY
// ==================
const getMealSuggestions = async (req, res) => {
  try {
    console.log('🔍 Meal suggestion API called');
    const { search } = req.query;
    const userId = req.user._id;
    
    console.log('User ID:', userId);
    console.log('Search query:', search);
    
    // 1. Get user's pantry items
    const pantry = await Pantry.findOne({ userId });
    const pantryItems = pantry?.items.map(item => item.name.toLowerCase()) || [];
    console.log('Pantry items:', pantryItems.length);
    
    // 2. Get all active recipes
    let recipes = await Recipe.find({ isActive: true });
    console.log('Total recipes:', recipes.length);
    
    // 3. If search query exists, filter recipes by search
    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      
      recipes = recipes.filter(recipe => {
        // Search in title
        if (recipe.title?.toLowerCase().includes(searchLower)) return true;
        
        // Search in category
        if (recipe.category?.toLowerCase().includes(searchLower)) return true;
        
        // Search in subCategory
        if (recipe.subCategory?.toLowerCase().includes(searchLower)) return true;
        
        // Search in cuisine
        if (recipe.cuisine?.toLowerCase().includes(searchLower)) return true;
        
        // Search in mealTime
        if (recipe.mealTime?.some(mt => mt.toLowerCase().includes(searchLower))) return true;
        
        // Search in ingredients
        if (recipe.ingredients) {
          if (recipe.ingredients.some(ing => ing.name?.toLowerCase().includes(searchLower))) return true;
        }
        
        // Search in ingredientsRaw
        if (recipe.ingredientsRaw) {
          if (recipe.ingredientsRaw.some(ing => ing.toLowerCase().includes(searchLower))) return true;
        }
        
        return false;
      });
      
      console.log('Recipes after search filter:', recipes.length);
    }
    
    // 4. Calculate match percentage with pantry
    const suggestions = [];
    
    for (const recipe of recipes) {
      // Get recipe ingredients
      let recipeIngredients = [];
      
      if (recipe.ingredients && recipe.ingredients.length > 0) {
        recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
      } else if (recipe.ingredientsRaw && recipe.ingredientsRaw.length > 0) {
        recipeIngredients = recipe.ingredientsRaw.map(ing => ing.toLowerCase());
      }
      
      if (recipeIngredients.length === 0) continue;
      
      // Match with pantry
      let matchedCount = 0;
      const matchedIngredients = [];
      const missingIngredients = [];
      
      for (const ing of recipeIngredients) {
        const isMatched = pantryItems.some(pantryItem => 
          pantryItem.includes(ing) || ing.includes(pantryItem)
        );
        
        if (isMatched) {
          matchedCount++;
          matchedIngredients.push(ing);
        } else {
          // Only add unique missing ingredients
          if (!missingIngredients.includes(ing)) {
            missingIngredients.push(ing);
          }
        }
      }
      
      const matchPercent = Math.round((matchedCount / recipeIngredients.length) * 100);
      
      // Only show if at least 10% match OR pantry is empty OR user searched
      if (matchPercent >= 10 || pantryItems.length === 0 || search) {
        suggestions.push({
          id: recipe._id,
          name: recipe.title,
          category: recipe.category,
          subCategory: recipe.subCategory,
          cuisine: recipe.cuisine,
          mealTime: recipe.mealTime,
          match: `${matchPercent}%`,
          matchValue: matchPercent,
          image: recipe.image || 'https://via.placeholder.com/300x200?text=Recipe',
          missing: missingIngredients.slice(0, 8),
          totalIngredients: recipeIngredients.length,
          matchedCount: matchedCount,
          cookingTime: recipe.cookingTime,
          difficulty: recipe.difficulty,
          isVegetarian: recipe.isVegetarian
        });
      }
    }
    
    // Sort by match percentage (highest first)
    suggestions.sort((a, b) => b.matchValue - a.matchValue);
    
    console.log('Final suggestions count:', suggestions.length);
    
    res.status(200).json({
      success: true,
      count: suggestions.length,
      searchQuery: search || null,
      suggestions: suggestions,
      pantryCount: pantryItems.length
    });
    
  } catch (error) {
    console.error('Error in getMealSuggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating suggestions',
      error: error.message
    });
  }
};

// ==================
// ADD MISSING INGREDIENTS TO SHOPPING LIST
// ==================
const addMissingToShoppingList = async (req, res) => {
  try {
    console.log('🛒 Add to shopping list called');
    const { recipeId, missingIngredients } = req.body;
    
    if (!missingIngredients || missingIngredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No missing ingredients to add'
      });
    }
    
    // Get or create user's shopping list
    let shoppingList = await ShoppingList.findOne({ userId: req.user._id });
    
    if (!shoppingList) {
      shoppingList = await ShoppingList.create({
        userId: req.user._id,
        items: []
      });
    }
    
    const addedItems = [];
    const skippedItems = [];
    
    for (const ingredient of missingIngredients) {
      // Check if already exists in shopping list (not purchased yet)
      const existingItem = shoppingList.items.find(
        item => item.name.toLowerCase() === ingredient.toLowerCase() && !item.purchased
      );
      
      if (!existingItem) {
        shoppingList.items.push({
          name: ingredient,
          quantity: 1,
          unit: 'pieces',
          category: 'Groceries',
          fromPantry: true,
          purchased: false
        });
        addedItems.push(ingredient);
      } else {
        skippedItems.push(ingredient);
      }
    }
    
    await shoppingList.save();
    
    console.log(`Added ${addedItems.length} items, skipped ${skippedItems.length}`);
    
    res.status(200).json({
      success: true,
      message: `Added ${addedItems.length} items to shopping list`,
      addedItems: addedItems,
      skippedItems: skippedItems
    });
    
  } catch (error) {
    console.error('Error in addMissingToShoppingList:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding items to shopping list',
      error: error.message
    });
  }
};

module.exports = {
  getMealSuggestions,
  addMissingToShoppingList
};