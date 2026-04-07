// controllers/mealPlanController.js
const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');
const Pantry = require('../models/Pantry');

// ============================================================
// GENERATE MEAL PLAN (Pantry-Based)
// ============================================================
const generateMealPlan = async (req, res) => {
  try {
    const {
      duration,        // 'daily' or 'weekly'
      dietType,        // 'veg', 'non-veg', 'mixed'
      targetAudience,  // 'general', 'kids', 'patient'
      ageGroup,        // for kids
      patientCondition, // for patient
      allergies,       // array of allergies
      familyMembers,   // number of people
      budget,          // 'economy', 'standard', 'premium', 'deluxe'
      planningMode,    // 'ai', 'pantry', 'custom'
    } = req.body;

    // ✅ Get user's pantry items
    const pantry = await Pantry.findOne({ userId: req.user?._id });
    const pantryItems = pantry?.items || [];
    const pantryItemNames = pantryItems.map(item => item.name.toLowerCase());
    
    console.log(`📦 Pantry items (${pantryItemNames.length}):`, pantryItemNames);

    // Build filter for recipes
    const filter = { isActive: true };

    // 1. Diet Type Filter
    if (dietType === 'veg') {
      filter.isVegetarian = true;
    } else if (dietType === 'non-veg') {
      filter.isVegetarian = false;
    }

    // 2. Budget Filter
    if (budget === 'economy') {
      filter.cookingTime = { $lte: 30 };
      filter.difficulty = { $in: ['Easy', 'easy'] };
    } else if (budget === 'premium' || budget === 'deluxe') {
      filter.cookingTime = { $gte: 45 };
    }

    // 3. Target Audience Filter
    if (targetAudience === 'kids') {
      filter.cookingTime = { $lte: 40 };
      filter.difficulty = { $in: ['Easy', 'easy'] };
    } else if (targetAudience === 'patient') {
      filter.patientFriendly = { $in: [patientCondition, 'general'] };
    }

    // 4. Allergies Filter
    if (allergies && allergies.length > 0) {
      filter.ingredientsRaw = { $nin: allergies.map(a => new RegExp(a, 'i')) };
    }

    // Fetch recipes from database
    let recipes = await Recipe.find(filter).limit(200);
    
    console.log(`📚 Total recipes found: ${recipes.length}`);

    // ✅ PANTRY MATCHING LOGIC - Score each recipe
    const scoredRecipes = recipes.map(recipe => {
      let matchedIngredients = [];
      let missingIngredients = [];
      let matchPercentage = 0;
      
      if (recipe.ingredientsRaw && recipe.ingredientsRaw.length > 0 && pantryItemNames.length > 0) {
        // Check each ingredient against pantry items
        recipe.ingredientsRaw.forEach(ingredient => {
          const ingredientLower = ingredient.toLowerCase();
          const isMatched = pantryItemNames.some(pantryItem => 
            ingredientLower.includes(pantryItem) || pantryItem.includes(ingredientLower.split(' ')[0])
          );
          
          if (isMatched) {
            matchedIngredients.push(ingredient);
          } else {
            missingIngredients.push(ingredient);
          }
        });
        
        // Calculate match percentage
        matchPercentage = (matchedIngredients.length / recipe.ingredientsRaw.length) * 100;
      } else if (pantryItemNames.length === 0) {
        // No pantry items - all recipes are available but with 0% match
        matchPercentage = 0;
        missingIngredients = recipe.ingredientsRaw || [];
      } else if (recipe.ingredientsRaw?.length === 0) {
        matchPercentage = 100; // No ingredients needed
      }
      
      // Determine availability based on planning mode
      let available = true;
      if (planningMode === 'pantry') {
        // Pantry mode: Only show recipes with at least 50% match
        available = matchPercentage >= 50;
      } else if (planningMode === 'ai') {
        // AI mode: Show all recipes but prioritize high match
        available = true;
      }
      
      return {
        ...recipe.toObject(),
        pantryMatch: {
          percentage: Math.round(matchPercentage),
          matchedIngredients,
          missingIngredients,
          totalIngredients: recipe.ingredientsRaw?.length || 0,
          matchedCount: matchedIngredients.length,
          missingCount: missingIngredients.length
        },
        available
      };
    });
    
    // Filter available recipes based on planning mode
    let availableRecipes = scoredRecipes;
    if (planningMode === 'pantry') {
      availableRecipes = scoredRecipes.filter(r => r.available === true);
    }
    
    // Sort by pantry match percentage (highest first)
    availableRecipes.sort((a, b) => b.pantryMatch.percentage - a.pantryMatch.percentage);
    
    console.log(`✅ Available recipes: ${availableRecipes.length}`);

    // Separate breakfast, lunch, dinner recipes
    const breakfastRecipes = availableRecipes.filter(r => 
      r.mealTime?.some(m => ['Breakfast', 'breakfast'].includes(m))
    );
    const lunchRecipes = availableRecipes.filter(r => 
      r.mealTime?.some(m => ['Lunch', 'lunch'].includes(m))
    );
    const dinnerRecipes = availableRecipes.filter(r => 
      r.mealTime?.some(m => ['Dinner', 'dinner'].includes(m))
    );

    // Generate meal plan based on duration
    const days = duration === 'daily' ? 1 : 7;
    const plan = new Map();
    const shoppingList = []; // Items to buy

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      
      // Get recipes for each meal
      const breakfast = breakfastRecipes[i % breakfastRecipes.length] || lunchRecipes[i % lunchRecipes.length];
      const lunch = lunchRecipes[i % lunchRecipes.length] || breakfastRecipes[i % breakfastRecipes.length];
      const dinner = dinnerRecipes[i % dinnerRecipes.length] || lunchRecipes[i % lunchRecipes.length];
      
      // Add missing ingredients to shopping list
      if (planningMode === 'pantry') {
        const addToShoppingList = (recipe) => {
          if (recipe?.pantryMatch?.missingIngredients) {
            recipe.pantryMatch.missingIngredients.forEach(ing => {
              if (!shoppingList.includes(ing)) {
                shoppingList.push(ing);
              }
            });
          }
        };
        addToShoppingList(breakfast);
        addToShoppingList(lunch);
        addToShoppingList(dinner);
      }
      
      plan.set(dateKey, {
        breakfast: breakfast ? {
          recipeId: breakfast._id,
          name: breakfast.title,
          image: breakfast.image,
          available: breakfast.available,
          pantryMatch: breakfast.pantryMatch
        } : null,
        lunch: lunch ? {
          recipeId: lunch._id,
          name: lunch.title,
          image: lunch.image,
          available: lunch.available,
          pantryMatch: lunch.pantryMatch
        } : null,
        dinner: dinner ? {
          recipeId: dinner._id,
          name: dinner.title,
          image: dinner.image,
          available: dinner.available,
          pantryMatch: dinner.pantryMatch
        } : null,
      });
    }

    res.status(200).json({
      success: true,
      message: planningMode === 'pantry' ? 'Pantry-based meal plan generated' : 'AI meal plan generated',
      plan: Object.fromEntries(plan),
      stats: {
        totalRecipesFound: recipes.length,
        availableRecipes: availableRecipes.length,
        pantryItemsCount: pantryItemNames.length,
        shoppingList: planningMode === 'pantry' ? shoppingList : [],
        averageMatchPercentage: availableRecipes.length > 0 
          ? Math.round(availableRecipes.reduce((sum, r) => sum + r.pantryMatch.percentage, 0) / availableRecipes.length)
          : 0
      }
    });

  } catch (error) {
    console.error('Error generating meal plan:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// ============================================================
// SAVE MEAL PLAN
// ============================================================
const saveMealPlan = async (req, res) => {
  try {
    const {
      name,
      duration,
      startDate,
      preferences,
      plan,
    } = req.body;

    const endDate = new Date(startDate);
    if (duration === 'weekly') {
      endDate.setDate(endDate.getDate() + 7);
    } else {
      endDate.setDate(endDate.getDate() + 1);
    }

    const mealPlan = new MealPlan({
      userId: req.user?._id,
      name: name || 'My Meal Plan',
      duration,
      startDate: new Date(startDate),
      endDate,
      preferences,
      plan: new Map(Object.entries(plan)),
    });

    await mealPlan.save();

    res.status(201).json({
      success: true,
      message: 'Meal plan saved successfully',
      mealPlanId: mealPlan._id,
    });

  } catch (error) {
    console.error('Error saving meal plan:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// ============================================================
// GET USER'S MEAL PLANS
// ============================================================
const getUserMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({ 
      userId: req.user._id,
      isActive: true 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      mealPlans,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================================
// GET SINGLE MEAL PLAN
// ============================================================
const getMealPlanById = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.status(200).json({
      success: true,
      mealPlan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateMealPlan,
  saveMealPlan,
  getUserMealPlans,
  getMealPlanById,
};