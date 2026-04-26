// delete-soups.js - Delete all soup recipes
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
require('dotenv').config({ path: '../.env' });

async function deleteAllSoups() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGOURI;
    if (!mongoURI) throw new Error('MongoDB URI not found');
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000, family: 4 });
    console.log('✅ Connected to MongoDB!');

    // Delete all recipes where subCategory is "soups"
    const result = await Recipe.deleteMany({ subCategory: "soups" });
    
    console.log('\n🗑️ Deletion Complete!');
    console.log(`📊 Deleted ${result.deletedCount} soup recipes`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

deleteAllSoups();