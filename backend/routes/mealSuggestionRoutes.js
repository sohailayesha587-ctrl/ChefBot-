const express = require('express');
const router = express.Router();
const { 
  getMealSuggestions, 
  addToShoppingList, 
  cookRecipe,
  getCookingLogByDate,
  addToCookingLog,
  updateCookingLogMeal,
  deleteCookingLogMeal,
  getMonthHistory
} = require('../controllers/mealSuggestionController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getMealSuggestions);
router.post('/add-to-shopping', addToShoppingList);
router.post('/cook', cookRecipe);

router.get('/cooking-log/:date', getCookingLogByDate);
router.post('/cooking-log', addToCookingLog);
router.put('/cooking-log/:date/meal/:mealId', updateCookingLogMeal);
router.delete('/cooking-log/:date/meal/:mealId', deleteCookingLogMeal);

router.get('/cooking-log/month', getMonthHistory);

module.exports = router;