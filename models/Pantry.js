const mongoose = require('mongoose');

const pantryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  unit: { type: String, default: 'piece' },
  category: { type: String, default: 'general' },
  threshold: { type: Number, default: 2 }, // Low stock alert threshold
  isLowStock: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now }
});

const usageHistorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'piece' },
  action: { type: String, enum: ['added', 'used', 'removed'], default: 'used' },
  usedAt: { type: Date, default: Date.now }
});

const pantrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [pantryItemSchema],
  usageHistory: [usageHistorySchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Pantry', pantrySchema);