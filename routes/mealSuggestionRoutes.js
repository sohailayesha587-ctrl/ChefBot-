const express = require('express');
const router = express.Router();
const { 
  getMealSuggestions, 
  addMissingToShoppingList 
} = require('../controllers/mealSuggestionController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/meal-suggestions?search=breakfast
router.get('/', protect, getMealSuggestions);

// POST /api/meal-suggestions/add-to-shopping
router.post('/add-to-shopping', protect, addMissingToShoppingList);

module.exports = router;