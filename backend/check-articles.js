import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

async function checkArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // ===== همه مقالات =====
    const allArticles = await Article.find({}, 'slug title brand category');
    console.log(`📚 مجموع کل مقالات: ${allArticles.length}\n`);

    // ===== مقالات اپل واچ =====
    const watchArticles = await Article.find({
      $or: [
        { title: { $regex: 'Watch', $options: 'i' } },
        { title: { $regex: 'اپل واچ', $options: 'i' } },
        { slug: { $regex: 'watch', $options: 'i' } },
        { tags: { $regex: 'Watch', $options: 'i' } },
        { brand: 'Apple', category: 'Watch' }
      ]
    });

    console.log(`⌚ مقالات اپل واچ: ${watchArticles.length}`);
    watchArticles.forEach((a, i) => {
      const title = a.title?.en || a.title || 'بدون عنوان';
      console.log(`  ${i+1}. ${title} (slug: ${a.slug})`);
    });

    // ===== مقالات اپل =====
    const appleArticles = await Article.find({
      $or: [
        { brand: 'Apple' },
        { title: { $regex: 'iPhone', $options: 'i' } },
        { title: { $regex: 'iPad', $options: 'i' } },
        { title: { $regex: 'Mac', $options: 'i' } }
      ]
    });

    console.log(`\n🍎 مقالات اپل: ${appleArticles.length}`);
    appleArticles.forEach((a, i) => {
      const title = a.title?.en || a.title || 'بدون عنوان';
      console.log(`  ${i+1}. ${title} (slug: ${a.slug})`);
    });

    await mongoose.disconnect();
    console.log('\n✅ بررسی کامل شد');
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

checkArticles();
