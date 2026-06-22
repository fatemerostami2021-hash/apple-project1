import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

await mongoose.connect(process.env.MONGODB_URI);

const accessoryArticles = await Article.find({ category: 'Accessory' });

console.log('📰 تعداد مقالات لوازم جانبی:', accessoryArticles.length);
console.log('─────────────────────────────────');

if (accessoryArticles.length === 0) {
  console.log('⚠️ هیچ مقاله‌ای برای لوازم جانبی وجود ندارد');
} else {
  accessoryArticles.forEach((a, i) => {
    const title = a.title?.en || a.title || 'بدون عنوان';
    const slug = a.slug || 'بدون اسلاگ';
    const brand = a.brand || 'نامشخص';
    console.log(`  ${i+1}. ${title} (${brand})`);
    console.log(`     اسلاگ: ${slug}`);
    console.log('');
  });
}

await mongoose.disconnect();
