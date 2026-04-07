const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// ======================
// GET USER SETTINGS
// ======================
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    const settings = {
      profile: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      },
      notifications: {
        emailNotifications: user.emailNotifications || true,
        pushNotifications: user.pushNotifications || true
      },
      // ✅ NEW - Report Preferences
      reportPreferences: user.reportPreferences || {
        reminderTime: "21:00",
        autoMarkAfterDays: 2,
        defaultAction: "assume_none",
        enableReminders: true
      },
      appearance: {
        theme: user.theme || 'light',
        language: user.language || 'en'
      }
    };
    
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ======================
// UPDATE REPORT PREFERENCES (NEW)
// ======================
router.put('/report-preferences', protect, async (req, res) => {
  try {
    const { reminderTime, autoMarkAfterDays, defaultAction, enableReminders } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update report preferences
    if (reminderTime) user.reportPreferences.reminderTime = reminderTime;
    if (autoMarkAfterDays) user.reportPreferences.autoMarkAfterDays = autoMarkAfterDays;
    if (defaultAction) user.reportPreferences.defaultAction = defaultAction;
    if (enableReminders !== undefined) user.reportPreferences.enableReminders = enableReminders;
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'Report preferences updated successfully',
      reportPreferences: user.reportPreferences
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ======================
// UPDATE PROFILE
// ======================
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ======================
// UPDATE NOTIFICATION SETTINGS
// ======================
router.put('/notifications', protect, async (req, res) => {
  try {
    const { emailNotifications, pushNotifications } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (emailNotifications !== undefined) user.emailNotifications = emailNotifications;
    if (pushNotifications !== undefined) user.pushNotifications = pushNotifications;
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'Notification settings updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ======================
// UPDATE APPEARANCE SETTINGS
// ======================
router.put('/appearance', protect, async (req, res) => {
  try {
    const { theme, language } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (theme) user.theme = theme;
    if (language) user.language = language;
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'Appearance settings updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ======================
// GET MISSED REPORTS LOG (NEW)
// ======================
router.get('/missed-reports-log', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('missedReportsLog');
    
    res.json({ 
      success: true, 
      missedReportsLog: user.missedReportsLog || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;