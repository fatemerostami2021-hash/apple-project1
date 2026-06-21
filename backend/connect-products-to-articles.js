import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');
const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

// ============================================================
// نقشه: اسلاگ محصول → اسلاگ مقاله
// ============================================================
const productToArticleMap = {
  // ===== Apple iPhone =====
  'iphone-12': 'iphone-12-review',
  'iphone-12-pro': 'iphone-12-pro-review',
  'iphone-12-pro-max': 'iphone-12-pro-max',
  'iphone-13': 'iphone-13-review',
  'iphone-13-pro': 'iphone-13-pro-review',
  'iphone-13-pro-max': 'iphone-13-pro-max',
  'iphone-14': 'iphone-14-review',
  'iphone-14-pro': 'iphone-14-pro-review',
  'iphone-14-pro-max': 'iphone-14-pro-max',
  'iphone-15': 'iphone-15-review',
  'iphone-15-pro': 'iphone-15-pro-review',
  'iphone-15-pro-max': 'iphone-15-pro-max',
  'iphone-16': 'iphone-16-review',
  'iphone-16-pro': 'iphone-16-pro-review',
  'iphone-16-pro-max': 'iphone-16-pro-max',
  'iphone-17': 'iphone-17-review',
  'iphone-17-pro': 'iphone-17-pro-review',
  'iphone-17-pro-max': 'iphone-17-pro-max',
  'iphone-18-promax': 'iphone-18-promax-review',

  // ===== Apple iPad =====
  'ipad-air': 'ipad-air-review',
  'ipad-pro-m4': 'ipad-pro-review',

  // ===== Apple MacBook =====
  'macbook-air-m3': 'macbook-air-m3-review',
  'macbook-pro-m4': 'macbook-pro-m3-review',

  // ===== Apple Watch =====
  'apple-watch-ultra-3': 'apple-watch-ultra-3',
  'apple-watch-series-10': 'apple-watch-series-12',
  'apple-watch-se-3': 'apple-watch-se-3',

  // ===== AirPods =====
  'airpods-max': 'airpods-max-review',
  'airpods-pro-3': 'airpods-pro-review',

  // ===== Samsung Galaxy S =====
  'galaxy-s24': 'galaxy-s24-ultra-ai-revolution',
  'galaxy-s24-plus': 's24-plus-vs-iphone-15-pro-max-comparison',
  'galaxy-s24-ultra': 'galaxy-s24-ultra-ai-revolution',
  'galaxy-s25-ultra': 'galaxy-s25-ultra-review',
  'galaxy-s26': 'galaxy-s26-review',

  // ===== Samsung Galaxy Z =====
  'galaxy-z-fold-6': 'z-flip-6-style-durability-review',
  'galaxy-z-flip-6': 'z-flip-6-style-durability-review',
  'galaxy-z-modelle': 'z-flip-6-style-durability-review',

  // ===== Samsung Galaxy A, Note, M =====
  'galaxy-a-series': 'galaxy-s24-ultra-ai-revolution',
  'galaxy-note': 'galaxy-s24-ultra-ai-revolution',
  'galaxy-note-collection': 'galaxy-s24-ultra-ai-revolution',
  'galaxy-m17-5g': 'galaxy-s24-ultra-ai-revolution',

  // ===== Samsung Tablets =====
  'galaxy-tab-s10-ultra': 'tab-s10-ultra-vs-ipad-pro-m4',
  'galaxy-tab-s4': 'tab-s10-ultra-vs-ipad-pro-m4',
  'galaxy-tab-pro': 'tab-s10-ultra-vs-ipad-pro-m4',

  // ===== Samsung Laptops =====
  'galaxy-book': 'galaxy-s24-ultra-ai-revolution',
  'galaxy-book-6': 'galaxy-s24-ultra-ai-revolution',
};

async function connectProductsToArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    let updated = 0;
    let skipped = 0;

    // دریافت همه محصولات
    const products = await Product.find({});
    console.log(`📦 تعداد کل محصولات: ${products.length}\n`);

    for (const product of products) {
      const slug = product.slug;
      const articleSlug = productToArticleMap[slug];

      if (articleSlug) {
        // بررسی اینکه مقاله وجود دارد
        const article = await Article.findOne({ slug: articleSlug });
        if (article) {
          // به‌روزرسانی محصول
          await Product.updateOne(
            { _id: product._id },
            { $set: { articleSlug: articleSlug } }
          );
          console.log(`✅ ${product.brand} - ${product.name?.en || slug} → ${articleSlug}`);
          updated++;
        } else {
          console.log(`⚠️ مقاله ${articleSlug} برای ${slug} وجود ندارد`);
          skipped++;
        }
      } else {
        console.log(`⏩ ${slug} - بدون مقاله مرتبط`);
        skipped++;
      }
    }

    console.log(`\n📊 نتیجه:`);
    console.log(`  ✅ به‌روزرسانی شد: ${updated}`);
    console.log(`  ⏩ رد شد: ${skipped}`);

    await mongoose.disconnect();
    console.log('\n✅ عملیات کامل شد!');

  } catch (error) {
    console.error('❌ خطا:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

connectProductsToArticles();
