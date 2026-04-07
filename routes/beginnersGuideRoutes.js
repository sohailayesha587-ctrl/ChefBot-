const express = require('express');
const router = express.Router();
const {
  getAllGuides,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide,
} = require('../controllers/beginnersGuideController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes (anyone can view)
router.get('/', getAllGuides);
router.get('/:id', getGuideById);

// Admin only routes (require authentication)
router.post('/', protect, adminOnly, createGuide);
router.put('/:id', protect, adminOnly, updateGuide);
router.delete('/:id', protect, adminOnly, deleteGuide);

module.exports = router;