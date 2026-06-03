const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Article = require('./models/Article');

// IMPORTANT: مسیر درست فایل articlesData رو وارد کن
const { articlesData } = require('../src/data/articlesData.js');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing articles
    await Article.deleteMany({});
    console.log('🗑️ Cleared existing articles');
    
    // Insert all articles
    const result = await Article.insertMany(articlesData);
    console.log(`✅ ${result.length} articles migrated successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

migrate();