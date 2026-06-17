import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

async function checkWatchArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const watchArticles = await Article.find({
      slug: {
        $in: [
          'apple-watch-ultra-4',
          'apple-watch-ultra-3',
          'apple-watch-series-12',
          'apple-watch-se-3'
        ]
      }
    }, 'slug title cover');

    console.log('⌚ مقالات اپل واچ و تصاویر آنها:');
    console.log('');

    watchArticles.forEach((a, i) => {
      console.log(`  ${i+1}. ${a.title?.en || a.title || 'بدون عنوان'}`);
      console.log(`     slug: ${a.slug}`);
      console.log(`     cover: ${a.cover || '❌ خالی'}`);
      console.log('');
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

checkWatchArticles();
