const mongoose = require('mongoose');

const beginnersGuideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      index: true
    },
    name: {
      type: String,
      default: ''
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true
    },
    mainCategory: {
      type: String,
      default: '',
      index: true
    },
    subCategory: {
      type: String,
      default: '',
      index: true
    },
    filterTags: {
      type: [String],
      default: [],
      index: true
    },
    tags: {
      type: [String],
      default: [],
      index: true
    },
    image: {
      type: String,
      default: ''
    },
    video: {
      type: String,
      default: ''
    },
    previewImg: {
      type: String,
      default: ''
    },
    tagline: {
      type: String,
      default: '',
      maxlength: 200
    },
    fullDesc: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    keyUses: {
      type: [String],
      default: []
    },
    type: {
      type: String,
      default: ''
    },
    types: {
      type: [String],
      default: []
    },
    material: {
      type: String,
      default: ''
    },
    materialType: {
      type: String,
      enum: ['Stainless Steel', 'Cast Iron', 'Non-Stick', 'Ceramic', 'Glass', 
             'Wood', 'Bamboo', 'Plastic', 'Silicone', 'Copper', 'Aluminum', 'Rubber', 
             'Hardwood', 'Polyethylene', 'Other', ''],
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    sizes: {
      type: [String],
      default: []
    },
    length: {
      type: String,
      default: ''
    },
    diameter: {
      type: String,
      default: ''
    },
    capacity: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    priceRange: {
      type: String,
      enum: ['$', '$$', '$$$', '$$$$', 'Budget', 'Mid-Range', 'Premium', 'Luxury', 
             'Budget to Mid', 'Mid to Premium', 'Budget to Premium', ''],
      default: ''
    },
    bestFor: {
      type: String,
      default: ''
    },
    recommendedFor: {
      type: [String],
      default: []
    },
    durability: {
      type: String,
      default: ''
    },
    care: {
      type: String,
      default: ''
    },
    maintenance: {
      type: String,
      default: ''
    },
    cleaning: {
      type: String,
      default: ''
    },
    pros: {
      type: [String],
      default: []
    },
    cons: {
      type: [String],
      default: []
    },
    utensilType: {
      type: String,
      enum: ['wooden-spoon', 'spatula', 'whisk', 'tongs', 'ladle', 'slotted-spoon', 
             'pasta-server', 'potato-masher', 'peeler', 'grater', 'zester', 'garlic-press', 
             'can-opener', 'rolling-pin', 'pastry-brush', 'dough-scraper', 'sifter', 
             'dry-measuring-cups', 'measuring-spoons', 'liquid-measuring-cup', 'kitchen-scale',
             'shears', 'meat-tenderizer', 'basting-brush', 'serving-utensils-complete-set', 'set', ''],
      default: ''
    },
    cookwareType: {
      type: String,
      default: ''
    },
    crockeryType: {
      type: String,
      default: ''
    },
    cutleryType: {
      type: String,
      enum: ['dinner-fork', 'dinner-knife', 'tablespoon', 'teaspoon', 'dessert-spoon', 
             'soup-spoon', 'salad-fork', 'coffee-spoon', 'sugar-spoon', 'butter-knife', 
             'tea-strainer', 'serving-fork', 'serving-spoon', 'slotted-serving-spoon',
             'eating-cutlery-complete-set', 'set', ''],
      default: ''
    },
    servingType: {
      type: String,
      enum: ['bowl', 'platter', 'gravy-boat', 'salad-bowl', 'cake-stand', 'tea-pot', 
             'coffee-carafe', 'sugar-bowl', 'creamer', 'honey-pot', 'butter-dish', 
             'salt-pepper', 'condiment-tray', 'cutlery-set-complete', 'pie-server',
             'utensils-set', 'cutlery-set', 'bowls-set', 'platters-set', 'gravy-set', 
             'accessories-set', 'set', ''],
      default: ''
    },
    bladeType: {
      type: String,
      enum: ['chef', 'paring', 'serrated', 'santoku', 'boning', 'utility', 'nakiri', ''],
      default: ''
    },
    items: {
      type: [String],
      default: []
    },
    commonItems: {
      type: [String],
      default: []
    },
    subcategory: {
      type: String,
      default: ''
    },
    spiceType: {
      type: String,
      enum: ['whole', 'ground', 'dried-herb', ''],
      default: ''
    },
    properUsage: {
      type: String,
      default: ''
    },
    commonMistakes: {
      type: [String],
      default: []
    },
    vegetableType: {
      type: String,
      enum: ['root', 'leafy', 'cruciferous', 'gourd', 'fruitveg', 'flower', 'mushroom', 'other', ''],
      default: ''
    },
    season: {
      type: String,
      default: 'All year'
    },
    nutritionalInfo: {
      type: String,
      default: ''
    },
    healthBenefits: {
      type: [String],
      default: []
    },
    cookingTips: {
      type: String,
      default: ''
    },
    brand: {
      type: String,
      default: ''
    },
    warranty: {
      type: String,
      default: ''
    },
    meatType: {
      type: String,
      default: ''
    },
    processType: {
      type: String,
      default: ''
    },
    temperatures: {
      type: [String],
      default: []
    },
    stages: {
      type: [String],
      default: []
    },
    methods: {
      type: [String],
      default: []
    },
    signs: {
      type: String,
      default: ''
    },
    problems: {
      type: [String],
      default: []
    },
    solutions: {
      type: [String],
      default: []
    },
    equipment: {
      type: String,
      default: ''
    },
    ingredients: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    storage: {
      type: String,
      default: ''
    },
    storageTips: {
      type: String,
      default: ''
    },
    shelfLife: {
      type: String,
      default: ''
    },
    functions: {
      type: [String],
      default: []
    },
    substitution: {
      type: String,
      default: ''
    },
    urduName: {
      type: String,
      default: ''
    },
    tipTypes: {
      type: [String],
      default: []
    },
    materials: {
      type: [String],
      default: []
    },
    techniques: {
      type: [String],
      default: []
    },
    tools: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    colorTypes: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    components: {
      type: [String],
      default: []
    },
    usage: {
      type: [String],
      default: []
    },
    units: {
      type: [String],
      default: []
    },
    setIncludes: {
      type: [String],
      default: []
    },
    precision: {
      type: String,
      default: ''
    },
    temperatureRange: {
      type: String,
      default: ''
    },
    accuracy: {
      type: String,
      default: ''
    },
    whenToUse: {
      type: String,
      default: ''
    },
    whenNotToUse: {
      type: String,
      default: ''
    },
    commonConversions: {
      type: [String],
      default: []
    },
    metricConversions: {
      type: [String],
      default: []
    },
    criticalRules: {
      type: [String],
      default: []
    },
    commonErrors: {
      type: [String],
      default: []
    },
    toolsRequired: {
      type: [String],
      default: []
    },
    keyFeatures: {
      type: [String],
      default: []
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', ''],
      default: 'Beginner'
    },
    estimatedTime: {
      type: Number,
      default: null,
      min: 1,
      max: 480
    },
    servings: {
      type: Number,
      default: null,
      min: 1
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
    nutrition: {
      calories: { type: Number, default: null },
      protein: { type: Number, default: null },
      carbs: { type: Number, default: null },
      fat: { type: Number, default: null },
      fiber: { type: Number, default: null },
      sugar: { type: Number, default: null },
      sodium: { type: Number, default: null }
    },
    instructions: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    warnings: {
      type: String,
      default: ''
    },
    safetyTips: {
      type: String,
      default: ''
    },
    energySavingTips: {
      type: String,
      default: ''
    },
    usageGuide: {
      type: String,
      default: ''
    },
    burners: {
      type: String,
      default: ''
    },
    washPrograms: {
      type: String,
      default: ''
    },
    placeSettings: {
      type: String,
      default: ''
    },
    coolingCapacity: {
      type: String,
      default: ''
    },
    dryCapacity: {
      type: String,
      default: ''
    },
    hotWaterTemp: {
      type: String,
      default: ''
    },
    coldWaterTemp: {
      type: String,
      default: ''
    },
    estimatedConsumption: {
      type: String,
      default: ''
    },
    estimatedPowerConsumption: {
      type: String,
      default: ''
    },
    estimatedGasConsumption: {
      type: String,
      default: ''
    },
    installationTips: {
      type: String,
      default: ''
    },
    relatedGuides: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BeginnersGuide'
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
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
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    },
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

beginnersGuideSchema.index({ title: 'text', fullDesc: 'text', tags: 'text' });
beginnersGuideSchema.index({ category: 1, subCategory: 1 });
beginnersGuideSchema.index({ category: 1, mainCategory: 1 });
beginnersGuideSchema.index({ mainCategory: 1, subCategory: 1 });
beginnersGuideSchema.index({ category: 1, difficulty: 1 });
beginnersGuideSchema.index({ createdAt: -1 });
beginnersGuideSchema.index({ totalViews: -1 });
beginnersGuideSchema.index({ avgRating: -1 });
beginnersGuideSchema.index({ filterTags: 1 });
beginnersGuideSchema.index({ materialType: 1 });
beginnersGuideSchema.index({ priceRange: 1 });
beginnersGuideSchema.index({ type: 1 });
beginnersGuideSchema.index({ bladeType: 1 });
beginnersGuideSchema.index({ utensilType: 1 });
beginnersGuideSchema.index({ cookwareType: 1 });
beginnersGuideSchema.index({ spiceType: 1 });
beginnersGuideSchema.index({ vegetableType: 1 });
beginnersGuideSchema.index({ season: 1 });
beginnersGuideSchema.index({ items: 1 });
beginnersGuideSchema.index({ subcategory: 1 });
beginnersGuideSchema.index({ mainCategory: 1, subCategory: 1, status: 1 });
beginnersGuideSchema.index({ category: 1, filterTags: 1, status: 1 });
beginnersGuideSchema.index({ category: 1, spiceType: 1 });
beginnersGuideSchema.index({ category: 1, vegetableType: 1 });
beginnersGuideSchema.index({ 'content.meatType': 1 });
beginnersGuideSchema.index({ 'content.type': 1 });

beginnersGuideSchema.virtual('isPublished').get(function() {
  return this.status === 'published';
});

beginnersGuideSchema.virtual('readTime').get(function() {
  if (!this.fullDesc && !this.description) return 1;
  const text = this.fullDesc || this.description || '';
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
});

beginnersGuideSchema.virtual('displayImage').get(function() {
  if (this.image) return this.image;
  if (this.previewImg) return this.previewImg;
  return '/images/default-guide.jpg';
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

beginnersGuideSchema.methods.addRating = async function(rating) {
  if (rating < 1 || rating > 5) return;
  const newTotal = (this.avgRating * this.totalRatings) + rating;
  this.totalRatings += 1;
  this.avgRating = parseFloat((newTotal / this.totalRatings).toFixed(1));
  return this.save();
};

beginnersGuideSchema.statics.findByCategory = function(category, limit = 10) {
  return this.find({ category, status: 'published' })
    .sort({ createdAt: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.findByMainCategory = function(mainCategory, limit = 10) {
  return this.find({ mainCategory, status: 'published' })
    .sort({ createdAt: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.findBySubCategory = function(subCategory, limit = 10) {
  return this.find({ subCategory, status: 'published' })
    .sort({ createdAt: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.findByCategoryAndSub = function(category, subCategory, limit = 10) {
  const query = { status: 'published' };
  if (category) query.category = category;
  if (subCategory) query.subCategory = subCategory;
  if (category && !subCategory) query.mainCategory = category;
  return this.find(query).sort({ createdAt: -1 }).limit(limit);
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

beginnersGuideSchema.statics.findByFilterTags = function(tags, limit = 10) {
  return this.find({ filterTags: { $in: tags }, status: 'published' })
    .sort({ totalViews: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.findByType = function(type, limit = 10) {
  return this.find({ type, status: 'published' })
    .sort({ totalViews: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.findBySpiceType = function(spiceType, limit = 10) {
  return this.find({ spiceType, category: 'pantry-basics', subCategory: 'spices', status: 'published' })
    .sort({ totalViews: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.findByVegetableType = function(vegetableType, limit = 10) {
  return this.find({ vegetableType, category: 'pantry-basics', subCategory: 'vegetables', status: 'published' })
    .sort({ totalViews: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.findByMeatType = function(meatType, type = null) {
  const query = { 
    category: 'meat-processing',
    'content.meatType': meatType 
  };
  if (type) {
    query['content.type'] = type;
  }
  return this.find(query);
};

beginnersGuideSchema.statics.getRecentByMainCategory = function(mainCategory, limit = 5) {
  return this.find({ mainCategory, status: 'published' })
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit);
};

beginnersGuideSchema.statics.getGroupedBySubCategory = function(mainCategory) {
  return this.aggregate([
    { $match: { mainCategory, status: 'published' } },
    { $group: {
      _id: '$subCategory',
      count: { $sum: 1 },
      items: { $push: { title: '$title', image: '$image', _id: '$_id' } }
    }},
    { $sort: { count: -1 } }
  ]);
};

module.exports = mongoose.model('BeginnersGuide', beginnersGuideSchema);