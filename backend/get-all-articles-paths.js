import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/apple-db';

async function getAllArticles() {
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    
    // دریافت همه مقالات
    const articles = await db.collection('articles').find().toArray();
    
    console.log(`📰 تعداد کل مقالات: ${articles.length}\n`);
    console.log('📋 لیست مسیرهای مقالات:');
    console.log('='.repeat(60));
    
    articles.forEach((article, index) => {
      const slug = article.slug || 'بدون اسلاگ';
      const title = article.title?.en || article.title?.fa || 'بدون عنوان';
      const path = `/articles/${slug}`;
      console.log(`${String(index + 1).padStart(2, '0')}. ${path} → ${title}`);
    });
    
    // ذخیره در فایل
    const fs = await import('fs');
    const paths = articles.map(a => `/articles/${a.slug}`);
    fs.writeFileSync('./articles-paths.json', JSON.stringify(paths, null, 2));
    console.log('\n✅ مسیرها در فایل articles-paths.json ذخیره شدند.');
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ خطا:', error.message);
  }
}

getAllArticles();
