import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/apple-db';

async function checkSlugs() {
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const articles = await db.collection('articles').find().toArray();

    console.log(`📰 ${articles.length} مقاله یافت شد\n`);
    console.log('📋 لیست اسلاگ‌ها:');
    
    articles.forEach((a, i) => {
      const title = a.title?.en || a.title?.fa || 'بدون عنوان';
      const slug = a.slug || '❌ ندارد';
      console.log(`${i+1}. ${title} → اسلاگ: ${slug}`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ خطا:', error.message);
  }
}

checkSlugs();
