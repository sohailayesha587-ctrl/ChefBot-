const mongoose = require('mongoose');

const pantryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'piece' }
}, { _id: false });

const userReplySchema = new mongoose.Schema({
  status: { 
    type: String, 
    enum: ['pending', 'answered', 'skipped'], 
    default: 'pending' 
  },
  itemsUsed: [pantryItemSchema],
  repliedAt: { type: Date },
  offlineQueued: { type: Boolean, default: false }
}, { _id: false });

const dailyReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    date: {
      type: Date,
      required: true,
      default: () => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now;
      },
      index: true
    },
    meals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }],
    pantryUpdates: {
      itemsUsed: [pantryItemSchema],
      lowStock: [pantryItemSchema]
    },
    shoppingActivity: [pantryItemSchema],
    alarmsUsed: {
      type: Number,
      default: 0
    },
    summary: {
      type: String,
      default: ''
    },
    userReply: userReplySchema
  },
  {
    timestamps: { createdAt: 'generatedAt', updatedAt: false }
  }
);

dailyReportSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyReport', dailyReportSchema);