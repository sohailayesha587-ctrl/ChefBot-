const express = require('express');
const router = express.Router();
const { generateMealPlan, saveMealPlan } = require('../controllers/mealPlanController');
const { protect } = require('../middleware/authMiddleware');

router.get('/generate', protect, generateMealPlan);
router.post('/save', protect, saveMealPlan);

module.exports = router;