import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const slideSchema = new mongoose.Schema({}, { strict: false });
const Slide = mongoose.model('Slide', slideSchema, 'slides');
const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

async function checkSlides() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // ===== اسلایدها =====
    const slides = await Slide.find({}, 'title articleSlug brand');
    console.log('🎠 اسلایدهای هیرو:');
    console.log('');
    slides.forEach((s, i) => {
      const title = s.title?.en || s.title || 'بدون عنوان';
      console.log(`  ${i+1}. ${title}`);
      console.log(`     برند: ${s.brand}`);
      console.log(`     articleSlug: ${s.articleSlug || '❌ خالی'}`);
      console.log('');
    });

    // ===== مقالات مورد نیاز =====
    const slugs = [
      'apple-ecosystem-guide',
      'apple-watch-series-9-review',
      'iphone-13-red-review',
      'apple-watch-collection-guide',
      'ipad-pro-creative-tools',
      'galaxy-s24-ultra-ai-revolution',
      'iphone-17-pro-max',
      'apple-watch-ultra-4',
      'apple-watch-ultra-3',
      'apple-watch-series-12',
      'apple-watch-se-3'
    ];

    console.log('📰 بررسی مقالات مورد نیاز اسلایدها:');
    console.log('');
    for (const slug of slugs) {
      const exists = await Article.findOne({ slug });
      console.log(`  ${slug}: ${exists ? '✅ موجود' : '❌ وجود ندارد'}`);
    }

    await mongoose.disconnect();
    console.log('\n✅ بررسی کامل شد');
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

checkSlides();
