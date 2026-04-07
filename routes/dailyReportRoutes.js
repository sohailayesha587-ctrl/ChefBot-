const express = require('express');
const router = express.Router();
const DailyReport = require('../models/DailyReport');
const { protect } = require('../middleware/authMiddleware');

// Get missing notifications (UNREPLIED)
router.get('/missing-notifications', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Last 7 days ke pending reports
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const reports = await DailyReport.find({
      userId,
      date: { $gte: sevenDaysAgo },
      'userReply.status': 'pending'
    }).sort({ date: -1 });
    
    // Collect missing notifications
    let missingNotifications = [];
    
    for (const report of reports) {
      if (report.missingNotifications && report.missingNotifications.length > 0) {
        const unreplied = report.missingNotifications.filter(n => !n.replied);
        missingNotifications.push(...unreplied.map(n => ({
          id: n.notificationId || n._id,
          title: n.title,
          message: n.message,
          sentAt: n.sentAt,
          reportDate: report.date,
          reportId: report._id
        })));
      }
    }
    
    res.json({
      success: true,
      notifications: missingNotifications,
      count: missingNotifications.length
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark notification as replied
router.put('/mark-replied/:notificationId', protect, async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user._id;
    
    const report = await DailyReport.findOne({
      userId,
      'missingNotifications.notificationId': notificationId
    });
    
    if (!report) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    
    const notification = report.missingNotifications.find(
      n => n.notificationId === notificationId
    );
    
    if (notification) {
      notification.replied = true;
      notification.repliedAt = new Date();
      await report.save();
    }
    
    res.json({ success: true, message: 'Marked as replied' });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Generate report
router.post('/generate', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const pendingReports = await DailyReport.find({
      userId,
      'userReply.status': 'pending'
    });
    
    res.json({
      success: true,
      message: 'Report generated',
      pendingCount: pendingReports.length
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;