import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');
const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');
const slideSchema = new mongoose.Schema({}, { strict: false });
const Slide = mongoose.model('Slide', slideSchema, 'slides');

// ✅ استفاده از async function به جای top-level await
async function checkAllDetails() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('\n' + '='.repeat(60));
    console.log('📊 گزارش کامل دیتابیس');
    console.log('='.repeat(60));

    // ============================================================
    // ۱. آمار کلی
    // ============================================================
    const products = await Product.countDocuments();
    const apple = await Product.countDocuments({ brand: 'Apple' });
    const samsung = await Product.countDocuments({ brand: 'Samsung' });
    const articles = await Article.countDocuments();
    const slides = await Slide.countDocuments();

    console.log('\n📈 آمار کلی:');
    console.log('─────────────────');
    console.log(`  📦 کل محصولات:     ${products}`);
    console.log(`    🍎 اپل:          ${apple}`);
    console.log(`    📱 سامسونگ:      ${samsung}`);
    console.log(`  📰 مقالات:         ${articles}`);
    console.log(`  🎠 اسلایدها:       ${slides}`);

    // ============================================================
    // ۲. لیست کامل محصولات
    // ============================================================
    console.log('\n📋 لیست کامل محصولات:');
    console.log('─────────────────────────────────────────────────────');
    const allProducts = await Product.find({}).sort({ brand: 1, category: 1 });

    allProducts.forEach((p, i) => {
      const num = String(i + 1).padStart(2);
      const name = p.name?.en || p.name || 'بدون نام';
      const brand = p.brand || 'Apple';
      const category = p.category || 'نامشخص';
      const price = p.price || 0;
      const slug = p.slug || 'بدون اسلاگ';
      const hasArticle = p.articleSlug ? '✅' : '❌';
      
      console.log(`  ${num}. ${brand} - ${name}`);
      console.log(`      📂 دسته: ${category} | 💰 قیمت: $${price}`);
      console.log(`      🔗 اسلاگ: ${slug} | مقاله: ${hasArticle}`);
    });

    // ============================================================
    // ۳. لیست کامل مقالات
    // ============================================================
    console.log('\n📰 لیست کامل مقالات:');
    console.log('─────────────────────────────────────────────────────');
    const allArticles = await Article.find({}).sort({ brand: 1 });

    allArticles.forEach((a, i) => {
      const num = String(i + 1).padStart(2);
      const title = a.title?.en || a.title || 'بدون عنوان';
      const brand = a.brand || 'Apple';
      const slug = a.slug || 'بدون اسلاگ';
      const hasCover = a.cover ? '✅' : '❌';
      const isFeatured = a.featured ? '⭐' : '';
      
      console.log(`  ${num}. ${brand} ${isFeatured} - ${title}`);
      console.log(`      🔗 اسلاگ: ${slug} | کاور: ${hasCover}`);
    });

    // ============================================================
    // ۴. لیست کامل اسلایدها
    // ============================================================
    console.log('\n🎠 لیست کامل اسلایدها:');
    console.log('─────────────────────────────────────────────────────');
    const allSlides = await Slide.find({}).sort({ order: 1 });

    allSlides.forEach((s, i) => {
      const num = String(i + 1).padStart(2);
      const title = s.title?.en || s.title || 'بدون عنوان';
      const brand = s.brand || 'Apple';
      const articleSlug = s.articleSlug || '❌ ندارد';
      const productId = s.productId || '❌ ندارد';
      const isActive = s.active !== false ? '✅' : '❌';
      
      console.log(`  ${num}. ${brand} - ${title}`);
      console.log(`      🔗 مقاله: ${articleSlug}`);
      console.log(`      📦 محصول: ${productId}`);
      console.log(`      فعال: ${isActive}`);
    });

    // ============================================================
    // ۵. محصولات بدون مقاله
    // ============================================================
    console.log('\n⚠️ محصولات بدون مقاله مرتبط:');
    console.log('─────────────────────────────────────────────────────');
    const productsWithoutArticle = await Product.find({ 
      articleSlug: { $exists: false } 
    });

    if (productsWithoutArticle.length === 0) {
      console.log('  ✅ همه محصولات مقاله مرتبط دارند!');
    } else {
      productsWithoutArticle.forEach((p) => {
        const name = p.name?.en || p.name || 'بدون نام';
        console.log(`  - ${p.brand} - ${name} (اسلاگ: ${p.slug})`);
      });
    }

    // ============================================================
    // ۶. مقالات بدون محصول
    // ============================================================
    console.log('\n⚠️ مقالات بدون محصول مرتبط:');
    console.log('─────────────────────────────────────────────────────');
    const articlesWithoutProduct = await Article.find({ 
      productSlug: { $exists: false } 
    });

    if (articlesWithoutProduct.length === 0) {
      console.log('  ✅ همه مقالات محصول مرتبط دارند!');
    } else {
      articlesWithoutProduct.forEach((a) => {
        const title = a.title?.en || a.title || 'بدون عنوان';
        console.log(`  - ${a.brand} - ${title} (اسلاگ: ${a.slug})`);
      });
    }

    // ============================================================
    // ۷. برندهای موجود
    // ============================================================
    console.log('\n🏷️ برندهای موجود:');
    console.log('─────────────────────────────────────────────────────');
    const brands = await Product.distinct('brand');
    for (let i = 0; i < brands.length; i++) {
      const b = brands[i];
      const count = await Product.countDocuments({ brand: b });
      console.log(`  ${i+1}. ${b}: ${count} محصول`);
    }

    // ============================================================
    // ۸. دسته‌بندی‌های موجود
    // ============================================================
    console.log('\n📂 دسته‌بندی‌های موجود:');
    console.log('─────────────────────────────────────────────────────');
    const categories = await Product.distinct('category');
    for (let i = 0; i < categories.length; i++) {
      const c = categories[i];
      const count = await Product.countDocuments({ category: c });
      console.log(`  ${i+1}. ${c}: ${count} محصول`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ گزارش کامل شد!');
    console.log('='.repeat(60));

    await mongoose.disconnect();

  } catch (error) {
    console.error('❌ خطا:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// اجرای تابع
checkAllDetails();
