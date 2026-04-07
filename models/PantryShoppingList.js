const mongoose = require('mongoose');

const pantryShoppingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  addedFrom: {
    type: String,
    default: 'pantry'
  }
});

const pantryShoppingListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [pantryShoppingItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('PantryShoppingList', pantryShoppingListSchema);