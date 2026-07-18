const mongoose = require('mongoose');

const beginnersGuideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    default: 'general'
  },
  subCategory: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  video: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  estimatedTime: {
    type: Number,
    default: 10
  },
  steps: [{
    stepNumber: Number,
    description: String,
    tip: String,
    image: String
  }],
  requiredItems: [{
    name: String,
    quantity: String,
    notes: String
  }],
  appliances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appliance'
  }],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  totalViews: {
    type: Number,
    default: 0
  },
  avgRating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

beginnersGuideSchema.index({ title: 'text', description: 'text', content: 'text' });
beginnersGuideSchema.index({ category: 1, subCategory: 1 });
beginnersGuideSchema.index({ status: 1, publishedAt: -1 });
beginnersGuideSchema.index({ difficulty: 1 });
beginnersGuideSchema.index({ tags: 1 });
beginnersGuideSchema.index({ appliances: 1 });

beginnersGuideSchema.virtual('readTime').get(function() {
  const words = (this.content || '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
});

beginnersGuideSchema.virtual('displayImage').get(function() {
  return this.image || '/images/default-guide.jpg';
});

beginnersGuideSchema.methods.incrementViews = async function() {
  this.totalViews += 1;
  return this.save();
};

beginnersGuideSchema.methods.publish = async function() {
  this.status = 'published';
  this.publishedAt = new Date();
  return this.save();
};

beginnersGuideSchema.statics.findPublished = function() {
  return this.find({ status: 'published' });
};

beginnersGuideSchema.statics.findByCategory = function(category) {
  return this.find({ category, status: 'published' }).sort({ publishedAt: -1 });
};

beginnersGuideSchema.statics.findPopular = function(limit = 10) {
  return this.find({ status: 'published' })
    .sort({ totalViews: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.search = function(query) {
  return this.find(
    { $text: { $search: query }, status: 'published' },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

module.exports = mongoose.model('BeginnersGuide', beginnersGuideSchema);