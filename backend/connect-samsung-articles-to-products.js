import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');
const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

// ============================================================
// نقشه: اسلاگ مقاله → اسلاگ محصول
// ============================================================
const articleToProductMap = {
  // مقالات سامسونگ → محصولات مرتبط
  'galaxy-s25-ultra-review': 'galaxy-s25-ultra',
  'galaxy-z-fold-5-review': 'galaxy-z-fold-6',
  'galaxy-s24-ultra-ai-revolution': 'galaxy-s24-ultra',
  's24-plus-vs-iphone-15-pro-max-comparison': 'galaxy-s24-plus',
  '5-galaxy-ai-tips-content-creators': 'galaxy-s24-ultra',
  'z-flip-6-style-durability-review': 'galaxy-z-flip-6',
  'tab-s10-ultra-vs-ipad-pro-m4': 'galaxy-tab-s10-ultra',
  'samsung-flagships-2024': 'galaxy-s24-ultra',
  'galaxy-s24-series-comparison': 'galaxy-s24-ultra',
  'galaxy-s26-review': 'galaxy-s26'
};

async function connectArticlesToProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    let updated = 0;
    let skipped = 0;
    let notFound = [];

    console.log('📰 ===== اتصال مقالات به محصولات =====\n');

    for (const [articleSlug, productSlug] of Object.entries(articleToProductMap)) {
      // پیدا کردن مقاله
      const article = await Article.findOne({ slug: articleSlug });
      if (!article) {
        console.log(`❌ مقاله "${articleSlug}" یافت نشد`);
        notFound.push(articleSlug);
        skipped++;
        continue;
      }

      // پیدا کردن محصول
      const product = await Product.findOne({ slug: productSlug });
      if (!product) {
        console.log(`❌ محصول "${productSlug}" یافت نشد`);
        notFound.push(productSlug);
        skipped++;
        continue;
      }

      // به‌روزرسانی مقاله با productSlug و productId
      await Article.updateOne(
        { _id: article._id },
        { 
          $set: { 
            productSlug: product.slug,
            productId: product._id
          } 
        }
      );

      console.log(`✅ ${article.title?.en || articleSlug} → ${product.name?.en || productSlug}`);
      updated++;
    }

    console.log('\n📊 ===== نتیجه =====');
    console.log(`  ✅ به‌روزرسانی شد: ${updated}`);
    console.log(`  ⏩ رد شد: ${skipped}`);

    if (notFound.length > 0) {
      console.log('\n⚠️ موارد پیدا نشد:');
      notFound.forEach(item => console.log(`  - ${item}`));
    }

    // ============================================================
    // نمایش مقالاتی که هنوز به محصول متصل نیستند
    // ============================================================
    const remainingArticles = await Article.find({
      brand: 'Samsung',
      productSlug: { $exists: false }
    });

    if (remainingArticles.length > 0) {
      console.log(`\n⚠️ مقالات سامسونگ باقی‌مانده بدون محصول (${remainingArticles.length} عدد):`);
      remainingArticles.forEach(a => {
        console.log(`  - ${a.title?.en || a.slug} (اسلاگ: ${a.slug})`);
      });
    } else {
      console.log('\n✅ همه مقالات سامسونگ به محصولات متصل شدند!');
    }

    await mongoose.disconnect();
    console.log('\n✅ عملیات کامل شد!');

  } catch (error) {
    console.error('❌ خطا:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

connectArticlesToProducts();
