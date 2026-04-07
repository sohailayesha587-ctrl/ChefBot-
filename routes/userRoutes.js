const express = require('express');
const router = express.Router();
const { 
  getProfile, 
  updateProfile, 
  getSettings, 
  updateSettings,
  getStats 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/settings', protect, getSettings);
router.put('/settings', protect, updateSettings);
router.get('/stats', protect, getStats);

module.exports = router;