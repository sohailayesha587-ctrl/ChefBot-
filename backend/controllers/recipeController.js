const Recipe = require('../models/Recipe');

const addRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      createdBy: req.user._id,
    });
    const saved = await recipe.save();
    res.status(201).json({ message: 'Recipe added successfully', recipe: saved });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      cuisine,
      isVegetarian,
      isHalal,
      difficulty,
      mealTime,
      isFeatured,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (cuisine) filter.cuisine = cuisine;
    if (difficulty) filter.difficulty = difficulty;
    if (mealTime) filter.mealTime = mealTime;
    if (isVegetarian !== undefined) filter.isVegetarian = isVegetarian === 'true';
    if (isHalal !== undefined) filter.isHalal = isHalal === 'true';
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

    const skip = (Number(page) - 1) * Number(limit);

    const recipes = await Recipe.find(filter)
      .select('title tagline image category subCategory cuisine difficulty mealTime isVegetarian isHalal isFeatured cookingTime servings ingredientsRaw stepsRaw')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Recipe.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      recipes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe || !recipe.isActive) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.status(200).json({ success: true, recipes: [], total: 0 });
    }

    const recipes = await Recipe.find({
      isActive: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { tagline: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    })
    .select('title tagline image category subCategory cuisine dietType')
    .limit(20);

    res.status(200).json({ success: true, total: recipes.length, recipes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRecipesByPantry = async (req, res) => {
  try {
    const { keywords } = req.query;
    if (!keywords) {
      return res.status(400).json({ message: 'Keywords are required' });
    }

    const keywordArray = keywords
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    const recipes = await Recipe.find({
      isActive: true,
      pantryKeywords: { $in: keywordArray },
    }).select('title tagline image category subCategory pantryKeywords');

    res.status(200).json({ total: recipes.length, recipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const recipes = await Recipe.find({ isActive: true, category })
      .select('title tagline image category subCategory cuisine isVegetarian cookingTime difficulty ingredientsRaw stepsRaw')
      .skip(skip)
      .limit(Number(limit))
      .sort({ isFeatured: -1, createdAt: -1 });

    const total = await Recipe.countDocuments({ isActive: true, category });

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      recipes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipesBySubCategory = async (req, res) => {
  try {
    const { subCategory } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const recipes = await Recipe.find({ isActive: true, subCategory })
      .select('title tagline image category subCategory cuisine isVegetarian cookingTime difficulty ingredientsRaw stepsRaw')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Recipe.countDocuments({ isActive: true, subCategory });

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      recipes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeaturedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ isActive: true, isFeatured: true })
      .select('title tagline image category subCategory cuisine isVegetarian cookingTime difficulty')
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).json({ total: recipes.length, recipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipesByCuisine = async (req, res) => {
  try {
    const { cuisine } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const recipes = await Recipe.find({ isActive: true, cuisine })
      .select('title tagline image category subCategory cuisine isVegetarian cookingTime difficulty')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Recipe.countDocuments({ isActive: true, cuisine });

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      recipes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipeCount = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };
    if (category && category !== 'undefined' && category !== 'null' && category !== '') {
      query.category = category;
    }
    const count = await Recipe.countDocuments(query);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipesByPatientType = async (req, res) => {
  try {
    const { type } = req.params;
    const { limit = 5, skip = 0, dietType } = req.query;

    let filter = { isActive: true };

    switch (type) {
      case 'diabetes':
        filter.patientFriendly = 'diabetes';
        break;
      case 'heart':
        filter.patientFriendly = 'heart';
        break;
      case 'bp':
        filter.patientFriendly = { $in: ['bp', 'lowsalt'] };
        break;
      case 'kidney':
        filter.patientFriendly = 'kidney';
        break;
      case 'lowfat':
        filter.patientFriendly = 'lowfat';
        break;
      default:
        filter.patientFriendly = type;
    }

    if (dietType && dietType !== 'all') {
      filter.dietType = dietType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian';
    }

    const recipes = await Recipe.find(filter)
      .select('title tagline image category subCategory dietType cookingTime difficulty patientFriendly')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .lean();

    const total = await Recipe.countDocuments(filter);

    res.status(200).json({
      success: true,
      recipes,
      total,
      hasMore: skip + recipes.length < total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipesByCategoryFilter = async (req, res) => {
  try {
    const { type } = req.params;
    const { limit = 5, skip = 0 } = req.query;

    let filter = { isActive: true };

    switch (type) {
      case 'quick':
        filter.cookingTime = { $lte: 30 };
        break;
      case 'spicy':
        filter.searchKeywords = 'spicy';
        break;
      case 'healthy':
        filter.patientFriendly = { $in: ['lowfat', 'diabetes', 'heart'] };
        break;
      case 'chicken':
        filter.subCategory = 'pure-chicken';
        break;
      case 'vegetarian':
        filter.dietType = 'Vegetarian';
        break;
      case 'fish':
        filter.subCategory = 'fish-dish';
        break;
      case 'rice':
        filter.subCategory = 'rice';
        break;
      case 'dessert':
        filter.subCategory = 'desserts';
        break;
      default:
        return res.status(400).json({ message: 'Invalid category type' });
    }

    const recipes = await Recipe.find(filter)
      .select('title tagline image category subCategory dietType cookingTime difficulty')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .lean();

    const total = await Recipe.countDocuments(filter);

    res.status(200).json({
      success: true,
      recipes,
      total,
      hasMore: skip + recipes.length < total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe updated successfully', recipe });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  searchRecipes,
  getRecipesByPantry,
  getRecipesByCategory,
  getRecipesBySubCategory,
  getFeaturedRecipes,
  getRecipesByCuisine,
  getRecipeCount,
  getRecipesByPatientType,
  getRecipesByCategoryFilter,
  updateRecipe,
  deleteRecipe,
};