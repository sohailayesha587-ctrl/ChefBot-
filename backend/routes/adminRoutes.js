const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const adminController = require('../controllers/adminController');
const { adminProtect } = require('../middleware/adminProtect');
const adminAuth = require('../controllers/adminAuthController');

router.post('/login', adminAuth.loginAdmin);
router.post('/forgot-password', adminAuth.forgotPasswordAdmin);
router.post('/verify-otp', adminAuth.verifyOTPAdmin);
router.post('/reset-password', adminAuth.resetPasswordAdmin);

router.get('/dashboard', adminProtect, async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;

    const dbStatusText = {
      0: 'Disconnected',
      1: 'Connected',
      2: 'Connecting',
      3: 'Disconnecting'
    }[dbStatus] || 'Unknown';

    res.json({
      success: true,
      message: 'Admin dashboard API working',
      mongodb: dbStatusText,
      mongodbReadyState: dbStatus
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/dashboard/stats', adminController.getDashboardStats);

router.get('/users', adminController.getUsers);

router.get('/users/:id', adminController.getUserById);

router.put('/users/:id', adminController.updateUser);

router.delete('/users/:id', adminController.deleteUser);

router.put('/users/:id/block', adminController.blockUser);

router.put('/users/:id/unblock', adminController.unblockUser);

router.get('/activities', adminController.getActivities);

router.get('/pantry', adminController.getPantryItems);

router.put('/pantry/:id', adminController.updatePantryItem);

router.delete('/pantry/:id', adminController.deletePantryItem);

router.get('/shopping', adminController.getShoppingItems);

router.get('/shoppings', adminController.getShoppingLists);

router.post('/shoppings', adminController.addShoppingList);

router.put('/shoppings/:id', adminController.updateShoppingList);

router.delete('/shoppings/:id', adminController.deleteShoppingList);

router.get('/mealplans', adminController.getMealPlans);

router.post('/mealplans', adminController.createMealPlan);

router.put('/mealplans/:id', adminController.updateMealPlan);

router.delete('/mealplans/:id', adminController.deleteMealPlan);

router.get('/meal-suggestions', adminController.getMealSuggestions);

router.get('/meal-suggestions/filter/by-category/:category', adminController.getMealSuggestionsByCategory);

router.get('/meal-suggestions/filter/by-diet/:dietType', async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
});

router.get('/meal-suggestions/filter/by-user/:userId', adminController.getMealSuggestionsByUser);

router.get('/meal-suggestions/recommendations/:userId', adminController.getPersonalizedRecommendations);

router.get('/meal-suggestions/:id', adminController.getMealSuggestionById);

router.post('/meal-suggestions', adminController.createMealSuggestion);

router.put('/meal-suggestions/:id', adminController.updateMealSuggestion);

router.delete('/meal-suggestions/:id', adminController.deleteMealSuggestion);

router.get('/recipe-collection', adminController.getRecipe);

router.post('/recipe-collection', adminController.addToRecipe);

router.put('/recipe-collection/:id', adminController.updateRecipe);

router.delete('/recipe-collection/:id', adminController.deleteFromRecipe);

router.get('/export', adminController.exportData);

router.get('/beginners-guide', adminController.getBeginnersGuide);

router.post('/beginners-guide', adminController.addBeginnersGuide);

router.put('/beginners-guide/:id', adminController.updateBeginnersGuide);

router.delete('/beginners-guide/:id', adminController.deleteBeginnersGuide);

router.get('/collections', async (req, res) => {
  try {
    const db = mongoose.connection.db;

    if (!db) {
      return res.status(500).json({
        success: false,
        error: 'Database not connected'
      });
    }

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    const counts = {};

    for (const name of collectionNames) {
      try {
        counts[name] = await db.collection(name).countDocuments();
      } catch (error) {
        counts[name] = 'Error counting';
      }
    }

    res.json({
      success: true,
      collections: collectionNames,
      counts
    });
  } catch (error) {
    console.error('Collections error:', error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/fix-cookinglogs', async (req, res) => {
  res.json({ success: true, message: 'Fix cookinglogs endpoint' });
});

router.get('/fix-mealplans', async (req, res) => {
  res.json({ success: true, message: 'Fix mealplans endpoint' });
});

router.get('/fix-shoppings', async (req, res) => {
  res.json({ success: true, message: 'Fix shoppings endpoint' });
});

router.get('/shoppings-data', async (req, res) => {
  res.json({ success: true, message: 'Shoppings debug data endpoint' });
});

module.exports = router;