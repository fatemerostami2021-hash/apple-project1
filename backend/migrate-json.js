require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const fs = require('fs');

const Article = require('./models/Article');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // خواندن از فایل JSON
    const articlesData = JSON.parse(fs.readFileSync('./articles-backup.json', 'utf8'));
    console.log(`📚 Found ${articlesData.length} articles to migrate`);

    // پاک کردن مقالات قبلی
    const deleted = await Article.deleteMany({});
    console.log(`🗑️ Cleared ${deleted.deletedCount} existing articles`);

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