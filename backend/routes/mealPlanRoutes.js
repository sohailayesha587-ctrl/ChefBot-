const express = require('express');

const router = express.Router();

const {
  generateMealPlan,
  saveMealPlan,
  deleteMealPlan
} = require('../controllers/mealPlanController');

const { protect } = require('../middleware/authMiddleware');

router.get('/generate', protect, generateMealPlan);

router.post('/save', protect, saveMealPlan);

router.delete('/delete/:id', protect, deleteMealPlan);

module.exports = router;