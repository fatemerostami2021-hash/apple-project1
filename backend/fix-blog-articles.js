import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

async function checkArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // ===== 1. تعداد کل مقالات =====
    const total = await Article.countDocuments();
    console.log(`📚 تعداد کل مقالات در دیتابیس: ${total}\n`);

    // ===== 2. لیست کامل مقالات =====
    const articles = await Article.find({}, 'slug title.en brand category publishDate');
    console.log('📰 لیست مقالات:');
    console.log('─────────────────────────────────────────────');
    articles.forEach((a, i) => {
      console.log(`  ${String(i+1).padStart(2, '0')}. ${a.slug}`);
      console.log(`      عنوان: ${a.title?.en || 'بدون عنوان'}`);
      console.log(`      برند: ${a.brand || 'نامشخص'}`);
      console.log(`      دسته: ${a.category || 'نامشخص'}`);
      console.log(`      تاریخ: ${a.publishDate || 'نامشخص'}`);
      console.log('');
    });

    // ===== 3. آمار بر اساس برند =====
    const appleCount = await Article.countDocuments({ brand: 'Apple' });
    const samsungCount = await Article.countDocuments({ brand: 'Samsung' });
    const otherCount = await Article.countDocuments({ brand: { $nin: ['Apple', 'Samsung'] } });

    console.log('📊 آمار بر اساس برند:');
    console.log(`  🍎 اپل: ${appleCount}`);
    console.log(`  📱 سامسونگ: ${samsungCount}`);
    console.log(`  📌 سایر: ${otherCount}`);

    // ===== 4. مقالاتی که cover ندارند =====
    const noCover = await Article.countDocuments({ cover: { $exists: false } });
    console.log(`\n🖼️ مقالات بدون تصویر کاور: ${noCover}`);

    // ===== 5. مقالات غیرفعال =====
    const inactive = await Article.countDocuments({ active: false });
    console.log(`⛔ مقالات غیرفعال: ${inactive}`);

    console.log('\n✅ بررسی کامل شد');
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

checkArticles();
