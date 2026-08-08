const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    soundPreferences: {
      timerSound: { type: String, default: 'default' },
      volume: { type: Number, default: 70, min: 0, max: 100 }
    },
    notificationPreferences: {
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true },
      timerReminders: { type: Boolean, default: true }
    },
    displayPreferences: {
      theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
      language: { type: String, enum: ['en', 'ur'], default: 'en' },
      fontSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('UserSettings', userSettingsSchema);