const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: 'ChefBot'
    },
    maintenanceMode: {
      type: Boolean,
      default: false
    },
    allowRegistrations: {
      type: Boolean,
      default: true
    },
    maxUsersAllowed: {
      type: Number,
      default: 10000
    },
    contactEmail: {
      type: String,
      default: ''
    },
    featuresEnabled: {
      mealSuggestion: { type: Boolean, default: true },
      smartPantry: { type: Boolean, default: true },
      mealPlanner: { type: Boolean, default: true },
      smartShopping: { type: Boolean, default: true },
      beginnersGuide: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);