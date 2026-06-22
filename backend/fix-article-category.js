import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

await mongoose.connect(process.env.MONGODB_URI);

// پیدا کردن مقاله با تگ Accessory
const article = await Article.findOne({ 
  tags: { $in: ['Accessory', 'accessory'] } 
});

if (article) {
  console.log('📰 مقاله پیدا شد:', article.title?.en);
  console.log('📂 دسته فعلی:', article.category || 'ندارد');
  
  // اضافه کردن دسته Accessory
  article.category = 'Accessory';
  await article.save();
  
  console.log('✅ دسته مقاله به Accessory تغییر یافت');
} else {
  console.log('⚠️ مقاله‌ای با تگ Accessory پیدا نشد');
}

// بررسی مجدد
const updated = await Article.findOne({ category: 'Accessory' });
console.log('\n📰 مقالات با دسته Accessory:', updated ? updated.title?.en : 'هیچ کدام');

await mongoose.disconnect();
