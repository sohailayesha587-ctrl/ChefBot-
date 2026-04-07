const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // Sound Preferences
  soundPreferences: {
    beepEnabled: { type: Boolean, default: true },
    vibrationEnabled: { type: Boolean, default: true },
    beepVolume: { type: Number, default: 70, min: 0, max: 100 }
  },
  // Notification Preferences
  notificationPreferences: {
    browserNotification: { type: Boolean, default: true },
    flashTitle: { type: Boolean, default: true }
  },
  // Display Preferences
  displayPreferences: {
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    compactMode: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);