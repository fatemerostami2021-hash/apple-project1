import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');
const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

await mongoose.connect(process.env.MONGODB_URI);

console.log('\n' + '='.repeat(70));
console.log('📊 گزارش کامل محصولات و مقالات سامسونگ');
console.log('='.repeat(70));

// ============================================================
// ۱. آمار کلی
// ============================================================
const totalProducts = await Product.countDocuments();
const totalSamsung = await Product.countDocuments({ brand: 'Samsung' });
const totalApple = await Product.countDocuments({ brand: 'Apple' });
const totalArticles = await Article.countDocuments();
const totalSamsungArticles = await Article.countDocuments({ brand: 'Samsung' });

console.log('\n📈 آمار کلی:');
console.log('─────────────────────────────────────────────────────');
console.log(`  📦 کل محصولات:          ${totalProducts}`);
console.log(`    📱 سامسونگ:           ${totalSamsung}`);
console.log(`    🍎 اپل:               ${totalApple}`);
console.log(`  📰 کل مقالات:           ${totalArticles}`);
console.log(`    📰 مقالات سامسونگ:    ${totalSamsungArticles}`);

// ============================================================
// ۲. لیست کامل محصولات سامسونگ
// ============================================================
console.log('\n\n📱 لیست کامل محصولات سامسونگ:');
console.log('─────────────────────────────────────────────────────');

const samsungProducts = await Product.find({ brand: 'Samsung' }).sort({ category: 1 });

// گروه‌بندی بر اساس دسته‌بندی
const categories = {};
samsungProducts.forEach(p => {
  const cat = p.category || 'نامشخص';
  if (!categories[cat]) categories[cat] = [];
  categories[cat].push(p);
});

Object.keys(categories).forEach(cat => {
  console.log(`\n📂 ${cat} (${categories[cat].length} محصول):`);
  console.log('  ────────────────────────────────────────────────');
  
  categories[cat].forEach((p, i) => {
    const num = String(i + 1).padStart(2);
    const nameEn = p.name?.en || 'بدون نام';
    const nameFa = p.name?.fa || 'بدون نام';
    const slug = p.slug || 'بدون اسلاگ';
    const price = p.price?.toLocaleString() || 'نامشخص';
    const thumbnail = p.thumbnail || '❌ ندارد';
    const articleSlug = p.articleSlug || '❌ ندارد';
    const inStock = p.inStock !== false ? '✅' : '❌';
    const featured = p.featured ? '⭐' : '';
    
    console.log(`  ${num}. ${featured} ${nameEn} (${nameFa})`);
    console.log(`       🔗 اسلاگ:     ${slug}`);
    console.log(`       💰 قیمت:      ${price} تومان`);
    console.log(`       📸 تصویر:     ${thumbnail}`);
    console.log(`       📰 مقاله:     ${articleSlug}`);
    console.log(`       📦 موجودی:    ${inStock}`);
    console.log('');
  });
});

// ============================================================
// ۳. لیست کامل مقالات سامسونگ
// ============================================================
console.log('\n\n📰 لیست کامل مقالات سامسونگ:');
console.log('─────────────────────────────────────────────────────');

const samsungArticles = await Article.find({ brand: 'Samsung' }).sort({ createdAt: -1 });

if (samsungArticles.length === 0) {
  console.log('  ⚠️ هیچ مقاله‌ای برای سامسونگ یافت نشد');
} else {
  samsungArticles.forEach((a, i) => {
    const num = String(i + 1).padStart(2);
    const titleEn = a.title?.en || 'بدون عنوان';
    const titleFa = a.title?.fa || 'بدون عنوان';
    const slug = a.slug || 'بدون اسلاگ';
    const cover = a.cover || '❌ ندارد';
    const excerpt = a.excerpt?.en || a.excerpt || 'بدون خلاصه';
    const tags = a.tags?.join(', ') || 'بدون تگ';
    const readTime = a.readTime || 'نامشخص';
    const featured = a.featured ? '⭐' : '';
    const productSlug = a.productSlug || '❌ ندارد';
    
    console.log(`  ${num}. ${featured} ${titleEn}`);
    console.log(`       📝 عنوان فارسی: ${titleFa}`);
    console.log(`       🔗 اسلاگ:       ${slug}`);
    console.log(`       📸 کاور:        ${cover}`);
    console.log(`       📝 خلاصه:       ${excerpt.substring(0, 80)}${excerpt.length > 80 ? '...' : ''}`);
    console.log(`       🏷️ تگ‌ها:       ${tags}`);
    console.log(`       ⏱️ زمان مطالعه: ${readTime} دقیقه`);
    console.log(`       📦 محصول:       ${productSlug}`);
    console.log('');
  });
}

// ============================================================
// ۴. محصولات سامسونگ بدون مقاله
// ============================================================
console.log('\n\n⚠️ محصولات سامسونگ بدون مقاله مرتبط:');
console.log('─────────────────────────────────────────────────────');

const withoutArticle = samsungProducts.filter(p => !p.articleSlug);

if (withoutArticle.length === 0) {
  console.log('  ✅ همه محصولات سامسونگ مقاله مرتبط دارند!');
} else {
  console.log(`  تعداد: ${withoutArticle.length} محصول`);
  console.log('');
  withoutArticle.forEach((p, i) => {
    const name = p.name?.en || p.name || 'بدون نام';
    const slug = p.slug || 'بدون اسلاگ';
    console.log(`  ${i+1}. ${name} (اسلاگ: ${slug})`);
  });
}

// ============================================================
// ۵. مقالات سامسونگ بدون محصول
// ============================================================
console.log('\n\n⚠️ مقالات سامسونگ بدون محصول مرتبط:');
console.log('─────────────────────────────────────────────────────');

const withoutProduct = samsungArticles.filter(a => !a.productSlug);

if (withoutProduct.length === 0) {
  console.log('  ✅ همه مقالات سامسونگ محصول مرتبط دارند!');
} else {
  console.log(`  تعداد: ${withoutProduct.length} مقاله`);
  console.log('');
  withoutProduct.forEach((a, i) => {
    const title = a.title?.en || a.title || 'بدون عنوان';
    const slug = a.slug || 'بدون اسلاگ';
    console.log(`  ${i+1}. ${title} (اسلاگ: ${slug})`);
  });
}

// ============================================================
// ۶. محصولات غیر سامسونگ (برای گالری)
// ============================================================
console.log('\n\n📦 محصولات غیر سامسونگ (قابل استفاده برای گالری و مقایسه):');
console.log('─────────────────────────────────────────────────────');

const otherProducts = await Product.find({ brand: { $ne: 'Samsung' } });

if (otherProducts.length === 0) {
  console.log('  ⚠️ هیچ محصول غیر سامسونگی یافت نشد');
} else {
  console.log(`  تعداد کل: ${otherProducts.length} محصول`);
  console.log('');
  
  // گروه‌بندی بر اساس برند
  const brands = {};
  otherProducts.forEach(p => {
    const brand = p.brand || 'نامشخص';
    if (!brands[brand]) brands[brand] = [];
    brands[brand].push(p);
  });
  
  Object.keys(brands).forEach(brand => {
    console.log(`  🏷️ ${brand} (${brands[brand].length} محصول):`);
    brands[brand].slice(0, 10).forEach((p, i) => {
      const name = p.name?.en || p.name || 'بدون نام';
      const price = p.price?.toLocaleString() || 'نامشخص';
      console.log(`     ${i+1}. ${name} - ${price} تومان`);
    });
    if (brands[brand].length > 10) {
      console.log(`     ... و ${brands[brand].length - 10} محصول دیگر`);
    }
    console.log('');
  });
}

// ============================================================
// ۷. پیشنهادات برای اتصال
// ============================================================
console.log('\n\n💡 پیشنهادات برای اتصال محصولات به مقالات:');
console.log('─────────────────────────────────────────────────────');

// محصولات بدون مقاله
if (withoutArticle.length > 0) {
  console.log('\n  📌 برای این محصولات مقاله ایجاد کن:');
  withoutArticle.forEach((p, i) => {
    const name = p.name?.en || p.name || 'بدون نام';
    console.log(`     ${i+1}. ${name} → پیشنهاد اسلاگ: ${p.slug}-review`);
  });
}

// مقالات بدون محصول
if (withoutProduct.length > 0) {
  console.log('\n  📌 این مقالات به محصول متصل نیستند:');
  withoutProduct.forEach((a, i) => {
    const title = a.title?.en || a.title || 'بدون عنوان';
    console.log(`     ${i+1}. ${title} → می‌تواند به محصول ${a.slug} متصل شود`);
  });
}

// ============================================================
// ۸. خلاصه نهایی
// ============================================================
console.log('\n\n' + '='.repeat(70));
console.log('✅ خلاصه نهایی:');
console.log('─────────────────────────────────────────────────────');
console.log(`  📱 محصولات سامسونگ:        ${samsungProducts.length}`);
console.log(`  📰 مقالات سامسونگ:         ${samsungArticles.length}`);
console.log(`  ⚠️ محصولات بدون مقاله:     ${withoutArticle.length}`);
console.log(`  ⚠️ مقالات بدون محصول:      ${withoutProduct.length}`);
console.log(`  📦 محصولات قابل استفاده:   ${otherProducts.length}`);
console.log('='.repeat(70));

await mongoose.disconnect();
console.log('\n✅ گزارش کامل شد!');
