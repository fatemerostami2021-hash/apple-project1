require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

const Article = require('./models/Article');

// ایمپورت مستقیم از فایل articlesData.js
const { articlesData } = require('../src/data/articlesData.js');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // پاک کردن مقالات قبلی
    await Article.deleteMany({});
    console.log('🗑️ Cleared existing articles');

    // اضافه کردن مقالات جدید
    const result = await Article.insertMany(articlesData);
    console.log(`✅ ${result.length} articles migrated successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

migrate();