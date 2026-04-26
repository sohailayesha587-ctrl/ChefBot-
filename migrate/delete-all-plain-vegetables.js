const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
require('dotenv').config({ path: '../.env' });

async function deleteAllPlainVegetables() {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGOURI;
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    const result = await Recipe.deleteMany({ subCategory: "plain-vegetables" });
    console.log(`✅ Deleted ${result.deletedCount} recipes with subCategory: plain-vegetables`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

deleteAllPlainVegetables();