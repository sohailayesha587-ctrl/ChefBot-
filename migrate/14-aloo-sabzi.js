// 14-aloo-sabzi.js
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
require('dotenv').config({ path: '../.env' });

const recipesToMigrate = [
  {
    title: "Aloo Ki Sabzi",
    tagline: "Simple and classic potato curry",
    image: "http://localhost:5000/uploads/Aalo_Sabzi.jpg",  // ✅ Full URL
    cuisine: "Pakistani",
    ingredientsRaw: [
      "4 medium potatoes - boiled, peeled, and cut into cubes",
      "2 medium tomatoes - finely chopped",
      "1 medium onion - finely chopped",
      "2 green chilies - slit lengthwise",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon red chili powder",
      "1 teaspoon coriander powder",
      "2 tablespoons cooking oil",
      "Salt to taste",
      "Fresh coriander leaves for garnish"
    ],
    stepsRaw: [
      "Heat oil in a pan over medium heat. Add cumin seeds and let them crackle for about 30 seconds until fragrant.",
      "Add chopped onions and sauté for 5-7 minutes until they turn golden brown.",
      "Add green chilies and chopped tomatoes. Cook for 5-6 minutes until tomatoes become soft and mushy.",
      "Add turmeric powder, red chili powder, coriander powder, and salt. Mix well and cook for 2 minutes until spices are fragrant.",
      "Add boiled potato cubes and mix gently with the masala. Be careful not to break the potatoes.",
      "Cover the pan and cook on low heat for 5-7 minutes, stirring occasionally to prevent sticking.",
      "Garnish with fresh coriander leaves. Serve hot with roti, paratha, or puri."
    ],
    difficulty: "Easy",
    cookingTime: 20,
    isActive: true,
    isHalal: true,
    description: "A classic Pakistani potato curry that's simple, flavorful, and perfect with roti or rice.",
    category: "Lunch",
    subCategory: "plain-vegetables",
    dietType: "Vegetarian",
    suitableForMeals: ["Lunch", "Dinner"],
    allergens: [],
    budget: "economy",
    costPerServing: 30,
    baseServings: 4,
    calories: 180,
    ageGroup: ["adults", "kids", "seniors"],
    patientFriendly: ["general", "diabetes", "heart", "bp"],
    pantryKeywords: ["potato", "tomato", "onion", "green chili", "cumin", "turmeric", "red chili", "coriander", "oil", "salt"],
    searchKeywords: ["aloo", "potato", "sabzi", "curry", "vegetarian", "pakistani", "easy"],
    isFeatured: false,
    averageRating: 0,
    totalRatings: 0,
    timesSuggested: 0,
    timesUsedInPlans: 0
  }
];

async function migrate() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGOURI;
    if (!mongoURI) throw new Error('MongoDB URI not found');
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000, family: 4 });
    console.log('✅ Connected to MongoDB!');

    let added = 0;
    let skipped = 0;

    for (let recipe of recipesToMigrate) {
      const existing = await Recipe.findOne({ title: recipe.title });
      if (!existing) {
        await Recipe.create(recipe);
        console.log(`✅ Added: ${recipe.title}`);
        added++;
      } else {
        console.log(`⚠️ Skipped: ${recipe.title} (already exists)`);
        skipped++;
      }
    }

    console.log('\n🎉 Migration Complete!');
    console.log(`📊 Added: ${added}, Skipped: ${skipped}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

migrate();