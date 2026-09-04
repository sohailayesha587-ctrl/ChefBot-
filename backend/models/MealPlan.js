const mongoose = require('mongoose');

const mealItemSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null },
    name: { type: String, default: '' },
    image: { type: String, default: '' },
    tagline: { type: String, default: '' },
    available: { type: Boolean, default: false },
    matchScore: { type: Number, default: 0 }
  },
  { _id: false }
);

const dayPlanSchema = new mongoose.Schema(
  {
    breakfast: { type: mealItemSchema, default: null },
    lunch: { type: mealItemSchema, default: null },
    dinner: { type: mealItemSchema, default: null }
  },
  { _id: false }
);

const mealPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    name: {
      type: String,
      default: '',
      trim: true
    },

    preferences: {
      dietType: {
        type: String,
        enum: ['veg', 'non-veg', 'mixed', 'eggetarian', ''],
        default: ''
      },
      allergy: {
        type: String,
        enum: ['none', 'egg', 'peanut', 'gluten', 'lactose', 'shellfish', 'nuts', ''],
        default: 'none'
      },
      ageGroup: {
        type: String,
        enum: ['general', 'kids', 'teens', 'elderly', 'patient', ''],
        default: 'general'
      },
      budget: {
        type: String,
        enum: ['economy', 'standard', 'premium', 'deluxe', ''],
        default: 'standard'
      },
      familyMembers: {
        type: String,
        default: '2'
      },
      planDuration: {
        type: String,
        enum: ['daily', 'weekly', ''],
        default: 'weekly'
      }
    },

    plan: {
      type: Map,
      of: dayPlanSchema,
      default: {}
    },

    totalDays: {
      type: Number,
      default: 7,
      min: 1,
      max: 7
    },

    familyCount: {
      type: Number,
      default: 2
    },
expiresAt: {
  type: Date,
  index: true
},
    savedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

mealPlanSchema.index({ user: 1, savedAt: -1 });
mealPlanSchema.index({ 'preferences.dietType': 1 });
mealPlanSchema.index({ 'preferences.planDuration': 1 });

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);
module.exports = MealPlan;