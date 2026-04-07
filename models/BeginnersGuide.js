const mongoose = require('mongoose');

const beginnersGuideSchema = new mongoose.Schema(
  {
    // ============ BASIC INFO ============
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      index: true
    },
    content: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        // Existing categories
        'tools', 'techniques', 'ingredients', 'temperature', 'decorating', 'basics',
        'cooking-methods', 'cutting-techniques',
        'kitchen-tools', 'knives', 'cutting-boards', 'mixing-bowls', 'utensils',
        'cookware', 'crockery', 'cutlery', 'servingware', 'measuring-tools',
        'measuring-techniques', 'estimation', 'conversions', 'precision',
        'meat-processing', 'appliances',
        'pantry-basics', 'spices', 'staples', 'vegetables',
        
        // ============ NEW CATEGORIES ADDED ============
        'safety-tips', 'cleaning-hacks', 'organization', 'meal-prep', 
        'budget-cooking', 'quick-meals', 'healthy-cooking', 'batch-cooking',
        'leftover-ideas', 'freezer-meals', 'one-pot-meals', 'kids-cooking',
        'holiday-cooking', 'party-food', 'baking-basics', 'bread-making',
        'desserts', 'breakfast-ideas', 'lunch-ideas', 'dinner-ideas',
        'snacks', 'beverages', 'sauces-dips', 'soups-stews',
        'salads', 'vegetarian', 'vegan', 'gluten-free', 'low-carb',
        'international-cuisine', 'pakistani-cuisine', 'asian-cuisine'
      ],
    },
    
    // ============ MEDIA ============
    image: { 
      type: String, 
      default: '' 
    },
    video: { 
      type: String, 
      default: '' 
    },
    
    // ============ AUTHOR ============
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // ============ SEO & DISPLAY ============
    tagline: { 
      type: String, 
      default: '',
      maxlength: 150
    },
    fullDesc: { 
      type: String, 
      default: '' 
    },
    
    // ============ INGREDIENT SPECIFIC (for ingredients category) ============
    storageTips: { 
      type: String, 
      default: '' 
    },
    shelfLife: { 
      type: String, 
      default: '' 
    },
    keyUses: { 
      type: [String], 
      default: [] 
    },
    types: { 
      type: [mongoose.Schema.Types.Mixed], 
      default: [] 
    },
    urduName: { 
      type: String, 
      default: '' 
    },
    season: { 
      type: String, 
      default: 'All year' 
    },
    
    // ============ TOOL/TECHNIQUE SPECIFIC ============
    keyFeatures: { 
      type: [String], 
      default: [] 
    },
    properUsage: { 
      type: String, 
      default: '' 
    },
    commonMistakes: { 
      type: [String], 
      default: [] 
    },
    
    // ============ NEW FIELDS FOR BETTER USER EXPERIENCE ============
    
    // Difficulty level
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Beginner'
    },
    
    // Estimated time (in minutes)
    estimatedTime: {
      type: Number,
      default: null,
      min: 1,
      max: 480
    },
    
    // Serving size (for recipes)
    servings: {
      type: Number,
      default: null,
      min: 1
    },
    
    // Tags for better search
    tags: {
      type: [String],
      default: [],
      index: true
    },
    
    // Related guides (by IDs)
    relatedGuides: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BeginnersGuide'
    }],
    
    // Step by step instructions (for techniques/recipes)
    steps: [{
      stepNumber: Number,
      description: String,
      tip: String,
      image: String
    }],
    
    // Required items/tools
    requiredItems: [{
      name: String,
      quantity: String,
      notes: String
    }],
    
    // Nutrition info (for recipes)
    nutrition: {
      calories: { type: Number, default: null },
      protein: { type: Number, default: null },
      carbs: { type: Number, default: null },
      fat: { type: Number, default: null },
      fiber: { type: Number, default: null },
      sugar: { type: Number, default: null },
      sodium: { type: Number, default: null }
    },
    
    // Rating and engagement
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    totalViews: {
      type: Number,
      default: 0
    },
    totalSaves: {
      type: Number,
      default: 0
    },
    
    // Status
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    
    // Publish date
    publishedAt: {
      type: Date,
      default: null
    },
    
    // Last updated by
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ============ INDEXES FOR BETTER PERFORMANCE ============
beginnersGuideSchema.index({ title: 'text', content: 'text', tags: 'text' });
beginnersGuideSchema.index({ category: 1, difficulty: 1 });
beginnersGuideSchema.index({ createdAt: -1 });
beginnersGuideSchema.index({ totalViews: -1 });
beginnersGuideSchema.index({ avgRating: -1 });

// ============ VIRTUAL FIELDS ============
beginnersGuideSchema.virtual('isPublished').get(function() {
  return this.status === 'published';
});

beginnersGuideSchema.virtual('readTime').get(function() {
  if (!this.content) return 0;
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// ============ METHODS ============
beginnersGuideSchema.methods.incrementViews = async function() {
  this.totalViews += 1;
  return this.save();
};

beginnersGuideSchema.methods.publish = async function() {
  this.status = 'published';
  this.publishedAt = new Date();
  return this.save();
};

// ============ STATIC METHODS ============
beginnersGuideSchema.statics.findByCategory = function(category, limit = 10) {
  return this.find({ category, status: 'published' })
    .sort({ createdAt: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.getPopular = function(limit = 10) {
  return this.find({ status: 'published' })
    .sort({ totalViews: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.getTopRated = function(limit = 10) {
  return this.find({ status: 'published', totalRatings: { $gt: 5 } })
    .sort({ avgRating: -1, totalRatings: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.search = function(query) {
  return this.find(
    { $text: { $search: query }, status: 'published' },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

module.exports = mongoose.model('BeginnersGuide', beginnersGuideSchema);