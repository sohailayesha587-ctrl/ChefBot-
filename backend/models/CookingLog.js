const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  recipeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recipe', 
    required: true 
  },
  recipeName: { 
    type: String, 
    required: true 
  },
  members: { 
    type: Number, 
    required: true, 
    min: 1, 
    default: 4 
  },
  ingredientsUsed: [
    {
      name: String,
      quantity: Number,
      unit: String
    }
  ]
}, { timestamps: true });

const cookingLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  dayName: { 
    type: String, 
    required: true 
  },
  meals: [mealSchema],
  isComplete: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

cookingLogSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('CookingLog', cookingLogSchema);