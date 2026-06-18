import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const slideSchema = new mongoose.Schema({}, { strict: false });
const Slide = mongoose.model('Slide', slideSchema, 'slides');
const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

async function fixAllSlides() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // 1. دریافت همه اسلایدها
    const slides = await Slide.find({});
    console.log(`🎠 تعداد اسلایدها: ${slides.length}\n`);

    // 2. دریافت همه مقالات موجود
    const articles = await Article.find({}, 'slug');
    const articleSlugs = articles.map(a => a.slug);
    console.log(`📰 تعداد مقالات موجود: ${articleSlugs.length}\n`);

    let fixed = 0;

    for (const slide of slides) {
      const title = slide.title?.en || slide.title || 'بدون عنوان';
      const currentSlug = slide.articleSlug || '';
      
      // بررسی آیا مقاله موجود است
      const articleExists = articleSlugs.includes(currentSlug);
      
      if (!articleExists && currentSlug) {
        // مقاله وجود ندارد - پیدا کردن جایگزین
        let newSlug = null;
        const titleLower = title.toLowerCase();
        const brand = slide.brand || '';
        
        // پیدا کردن مقاله جایگزین بر اساس برند و عنوان
        if (brand === 'Samsung' || titleLower.includes('samsung') || titleLower.includes('galaxy')) {
          if (articleSlugs.includes('galaxy-s24-ultra-ai-revolution')) {
            newSlug = 'galaxy-s24-ultra-ai-revolution';
          }
        } else if (brand === 'Apple' || titleLower.includes('apple') || titleLower.includes('iphone')) {
          if (articleSlugs.includes('iphone-17-pro-max')) {
            newSlug = 'iphone-17-pro-max';
          }
        } else if (titleLower.includes('watch')) {
          if (articleSlugs.includes('apple-watch-ultra-4')) {
            newSlug = 'apple-watch-ultra-4';
          } else if (articleSlugs.includes('apple-watch-se-3')) {
            newSlug = 'apple-watch-se-3';
          }
        }
        
        // اگر هیچ جایگزینی پیدا نشد، از اولین مقاله استفاده کن
        if (!newSlug && articleSlugs.length > 0) {
          newSlug = articleSlugs[0];
        }
        
        if (newSlug) {
          await Slide.updateOne(
            { _id: slide._id },
            { $set: { articleSlug: newSlug } }
          );
          console.log(`✅ اصلاح شد: "${title}" -> ${newSlug}`);
          fixed++;
        }
      } else if (!currentSlug) {
        // اسلاگ خالی است
        let newSlug = null;
        const titleLower = title.toLowerCase();
        const brand = slide.brand || '';
        
        if (brand === 'Samsung' || titleLower.includes('samsung') || titleLower.includes('galaxy')) {
          if (articleSlugs.includes('galaxy-s24-ultra-ai-revolution')) {
            newSlug = 'galaxy-s24-ultra-ai-revolution';
          }
        } else if (titleLower.includes('watch')) {
          if (articleSlugs.includes('apple-watch-ultra-4')) {
            newSlug = 'apple-watch-ultra-4';
          } else if (articleSlugs.includes('apple-watch-se-3')) {
            newSlug = 'apple-watch-se-3';
          }
        }
        
        if (!newSlug && articleSlugs.length > 0) {
          newSlug = articleSlugs[0];
        }
        
        if (newSlug) {
          await Slide.updateOne(
            { _id: slide._id },
            { $set: { articleSlug: newSlug } }
          );
          console.log(`✅ اسلاگ اضافه شد: "${title}" -> ${newSlug}`);
          fixed++;
        }
      }
    }

    console.log(`\n✅ ${fixed} اسلاید اصلاح شد`);

    // 3. چک نهایی
    const updatedSlides = await Slide.find({}, 'title articleSlug');
    console.log('\n📋 لیست نهایی اسلایدها:');
    updatedSlides.forEach((s, i) => {
      const title = s.title?.en || s.title || 'بدون عنوان';
      console.log(`  ${i+1}. ${title} => ${s.articleSlug || '❌'}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ عملیات کامل شد');
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

fixAllSlides();
