const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const activityController = require('../controllers/activityController');

// ✅ EXISTING ROUTES (Same rakhein)
// All routes require authentication and admin
router.get('/', protect, adminOnly, activityController.getAllActivities);
router.get('/user/:userId', protect, adminOnly, activityController.getUserActivities);
router.delete('/:id', protect, adminOnly, activityController.deleteActivity);

// ✅ ADD THESE NEW ROUTES - Socket.io ke liye
// Get today's activities
router.get('/today', protect, adminOnly, activityController.getTodayActivities);

// Get recent activities (limit ke saath)
router.get('/recent/:limit', protect, adminOnly, activityController.getRecentActivities);

// Get activities by date range
router.get('/date-range', protect, adminOnly, activityController.getActivitiesByDateRange);

// Get activity statistics
router.get('/stats', protect, adminOnly, activityController.getActivityStats);

// ✅ ADD THIS - Create activity (backup for Socket.io)
router.post('/', protect, adminOnly, activityController.createActivity);

// ✅ ADD THIS - Get unique users activity
router.get('/users', protect, adminOnly, activityController.getUniqueUsers);

// ✅ ADD THIS - Delete all activities (cleanup)
router.delete('/all', protect, adminOnly, activityController.deleteAllActivities);

module.exports = router;




