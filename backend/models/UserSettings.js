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
      timerSound: {
        type: String,
        default: 'default'
      },
      beepEnabled: {
        type: Boolean,
        default: true
      },
      volume: {
        type: Number,
        default: 70,
        min: 0,
        max: 100
      },
      vibrationEnabled: {
        type: Boolean,
        default: true
      }
    },

    notificationPreferences: {
      emailNotifications: {
        type: Boolean,
        default: true
      },
      pushNotifications: {
        type: Boolean,
        default: true
      },
      timerReminders: {
        type: Boolean,
        default: true
      },
      browserNotification: {
        type: Boolean,
        default: true
      }
    },

    displayPreferences: {
     
      language: {
        type: String,
        enum: ['en', 'ur'],
        default: 'en'
      },
      fontSize: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('UserSettings', userSettingsSchema);