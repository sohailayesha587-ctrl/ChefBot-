const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getSettings,
  updateProfile,
  updateSettings,
  getStats
} = require('../controllers/settingsController');

router.get('/', protect, getSettings);
router.put('/profile', protect, updateProfile);
router.put('/', protect, updateSettings);

module.exports = router;