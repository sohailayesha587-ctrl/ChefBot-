const mongoose = require('mongoose');

// ─────────────────────────────────────────────────────────
// INGREDIENT SUB-DOCUMENT
// ─────────────────────────────────────────────────────────
const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    quantity: { type: String, default: '' },
    unit: { type: String, default: '' },
  },
  { _id: false }
);

// ─────────────────────────────────────────────────────────
// STEP SUB-DOCUMENT
// ─────────────────────────────────────────────────────────
const stepSchema = new mongoose.Schema(
  {
    stepNumber: { type: Number, required: true },
    instruction: { type: String, required: true, trim: true },
  },
  { _id: false }
);

// ─────────────────────────────────────────────────────────
// MAIN RECIPE SCHEMA
// ─────────────────────────────────────────────────────────
const recipeSchema = new mongoose.Schema(
  {
    // ── Basic Info
    title: { type: String, required: true, unique: true, trim: true },
    tagline: { type: String, trim: true, default: '' },
    image: { type: String, default: '' },

    // ── Ingredients & Steps
    ingredients: { type: [ingredientSchema], default: [] },
    ingredientsRaw: { type: [String], default: [] },
    instructions: { type: String, default: '' },
    steps: { type: [stepSchema], default: [] },
    stepsRaw: { type: [String], default: [] },
    voiceUrl: { type: String, default: '' },

    // ── Main Category
    category: {
      type: String,
      required: true,
      enum: [
        'Fish',  // ✅ YAHAN "Fish" ADD KARO - SABSE PEHLE
        'LightDinner', 'lightdinner',
        'Light Dinner', 'light dinner',
        'Qeema Dishes','qeemadishes',
        'Breakfast', 'breakfast',
        'Lunch', 'lunch',
        'Dinner', 'dinner',
        'Snacks', 'snacks',
        'Appetizers', 'appetizers',
        'Soups', 'soups',
        'Salads', 'salads',
        'Desserts', 'desserts',
        'Beverages', 'beverages',
        'Baking', 'baking',
        'Regional', 'regional',
        'Cheat Meal', 'cheatmeal', 'CheatMeal',
        'Student', 'student',
        'Quick', 'quick',
        'Budget', 'budget',
        'Vegetarian', 'vegetarian',
        'Non-Vegetarian', 'non-vegetarian',
        'BBQ', 'bbq',
        'Rice', 'rice',
        'Breads', 'breads',
        'HeavyGravy', 'heavygravy',
        'Student Meals', 'student meals'
      ],
    },

    // ── Sub-Category (same rahega - bohot lamba hai isliye yahan nahi likha)
    subCategory: {
      type: String,
      enum: [
        'Egg', 'egg', 'Paratha', 'paratha', 'Egg Curry', 'egg curry',
        'Fish Curry', 'fish curry', 'Fish Fry', 'fish fry', 'Fish', 'fish',
        'Tikka', 'Kebab', 'Roll', 'Sandwich', 'Soup', 'Pickle', 'Snack',
        'Kofta', 'Pulao', 'Biryani', 'Rice', 'rice',
        // ... baaki sab tumhare original mein jo hai woh rakhna
      ],
      default: 'Other',
    },

    // ── Cuisine
    cuisine: {
      type: String,
      enum: [
        'Pakistani', 'pakistani', 'Continental', 'continental',
        'Chinese', 'chinese', 'Italian', 'italian', 'Turkish', 'turkish',
        // ... baaki sab
      ],
      default: 'Pakistani',
    },

    // ── Beverage Category
    beverageCategory: {
      type: String,
      enum: ['Hot Drinks', 'hot drinks', 'Cold Drinks', 'cold drinks', 'Smoothies', 'smoothies', 'Mocktails', 'mocktails', 'Cocktails', 'cocktails', 'Traditional', 'traditional', null],
      default: null,
    },

    // ── Pantry Keywords
    pantryKeywords: { type: [String], default: [] },

    // ── Dietary Flags
    isVegetarian: { type: Boolean, default: false },
    isHalal: { type: Boolean, default: true },

    // ── Cooking Info
    cookingTime: { type: Number, default: null },
    servings: { type: Number, default: null },
    difficulty: {
      type: String,
      enum: ['Easy', 'easy', 'Medium', 'medium', 'Hard', 'hard'],
      default: 'Medium',
    },
    
    // ── Meal Time
    mealTime: {
      type: [String],
      enum: ['Breakfast', 'breakfast', 'Lunch', 'lunch', 'Dinner', 'dinner', 'Snack', 'snack', 'Appetizers', 'appetizers', 'Dessert', 'dessert', 'Anytime', 'anytime'],
      default: ['Anytime'],
    },

    // ── Meal Planning & Suggestion Fields
    budget: {
      type: String,
      enum: ['economy', 'standard', 'premium', 'deluxe'],
      default: 'standard',
    },
    ageGroup: {
      type: [String],
      enum: ['toddlers', 'kids', 'preteens', 'teens', 'adults', 'seniors'],
      default: ['adults'],
    },
    patientFriendly: {
      type: [String],
      enum: ['general', 'diabetes', 'heart', 'bp', 'lowsalt', 'lowfat'],
      default: ['general'],
    },

    // ── Admin Fields
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalRatings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ── INDEXES
recipeSchema.index({ title: 'text', tagline: 'text' });
recipeSchema.index({ category: 1 });
recipeSchema.index({ subCategory: 1 });
recipeSchema.index({ cuisine: 1 });
recipeSchema.index({ isVegetarian: 1 });
recipeSchema.index({ pantryKeywords: 1 });
recipeSchema.index({ mealTime: 1 });
recipeSchema.index({ difficulty: 1 });
recipeSchema.index({ budget: 1 });
recipeSchema.index({ ageGroup: 1 });
recipeSchema.index({ patientFriendly: 1 });
recipeSchema.index({ isActive: 1 });
recipeSchema.index({ isFeatured: 1 });
recipeSchema.index({ cookingTime: 1 });
recipeSchema.index({ servings: 1 });

// ── VIRTUAL for formatted cooking time
recipeSchema.virtual('cookingTimeFormatted').get(function() {
  if (!this.cookingTime) return null;
  const hours = Math.floor(this.cookingTime / 60);
  const minutes = this.cookingTime % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
});

// ── METHOD to convert raw ingredients to structured format
recipeSchema.methods.convertRawIngredients = function() {
  if (!this.ingredientsRaw || this.ingredientsRaw.length === 0) return;
  
  this.ingredients = this.ingredientsRaw.map(raw => {
    const match = raw.match(/^([\d/]+\s*)?(.*)$/);
    const quantity = match[1]?.trim() || '';
    const name = match[2]?.trim() || raw;
    
    return { name, quantity, unit: '' };
  });
};

// ── METHOD to convert raw steps to structured format
recipeSchema.methods.convertRawSteps = function() {
  if (!this.stepsRaw || this.stepsRaw.length === 0) return;
  
  this.steps = this.stepsRaw.map((instruction, index) => ({
    stepNumber: index + 1,
    instruction: instruction.trim()
  }));
};

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;