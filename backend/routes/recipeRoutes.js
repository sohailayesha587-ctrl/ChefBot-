const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/recipeController');

router.get('/', getAllRecipes);
router.get('/search', searchRecipes);
router.get('/featured', getFeaturedRecipes);
router.get('/pantry', getRecipesByPantry);
router.get('/count', getRecipeCount);
router.get('/patient/:type', getRecipesByPatientType);
router.get('/category-filter/:type', getRecipesByCategoryFilter);
router.get('/subCategory/:subCategory', getRecipesBySubCategory);
router.get('/category/:category', getRecipesByCategory);
router.get('/cuisine/:cuisine', getRecipesByCuisine);
router.get('/:id', getRecipeById);

router.post('/', addRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;