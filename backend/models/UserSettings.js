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
   
      beepEnabled: {
        type: Boolean,
        default: true
      },
    },
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('UserSettings', userSettingsSchema);