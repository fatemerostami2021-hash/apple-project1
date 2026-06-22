import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');
const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

await mongoose.connect(process.env.MONGODB_URI);

// ============================================================
// ۱. محصولات سامسونگ
// ============================================================
const samsungProducts = await Product.find({ brand: 'Samsung' });
console.log('\n📱 ===== محصولات سامسونگ =====');
console.log('تعداد کل:', samsungProducts.length);
console.log('─────────────────────────────────');

// گروه‌بندی بر اساس دسته‌بندی
const categories = {};
samsungProducts.forEach(p => {
  const cat = p.category || 'نامشخص';
  if (!categories[cat]) categories[cat] = [];
  categories[cat].push(p);
});

Object.keys(categories).forEach(cat => {
  console.log(`\n📂 ${cat}: ${categories[cat].length} محصول`);
  categories[cat].forEach((p, i) => {
    const name = p.name?.en || p.name || 'بدون نام';
    const slug = p.slug || 'بدون اسلاگ';
    const hasArticle = p.articleSlug ? '✅' : '❌';
    console.log(`  ${i+1}. ${name} (${slug}) - مقاله: ${hasArticle}`);
  });
});

// ============================================================
// ۲. مقالات سامسونگ
// ============================================================
const samsungArticles = await Article.find({ brand: 'Samsung' });
console.log('\n\n📰 ===== مقالات سامسونگ =====');
console.log('تعداد کل:', samsungArticles.length);
console.log('─────────────────────────────────');

samsungArticles.forEach((a, i) => {
  const title = a.title?.en || a.title || 'بدون عنوان';
  const slug = a.slug || 'بدون اسلاگ';
  const hasProduct = a.productSlug ? '✅' : '❌';
  console.log(`  ${i+1}. ${title} (${slug}) - محصول: ${hasProduct}`);
});

// ============================================================
// ۳. محصولات غیر سامسونگ (برای گالری)
// ============================================================
const otherProducts = await Product.find({ brand: { $ne: 'Samsung' } });
console.log(`\n\n📦 ===== محصولات غیر سامسونگ (${otherProducts.length} عدد) =====`);
console.log('─────────────────────────────────');
console.log('این محصولات برای گالری و نمایش در کنار محصولات سامسونگ قابل استفاده هستند:');

// گروه‌بندی برندها
const brands = {};
otherProducts.forEach(p => {
  const brand = p.brand || 'نامشخص';
  if (!brands[brand]) brands[brand] = [];
  brands[brand].push(p);
});

Object.keys(brands).forEach(brand => {
  console.log(`\n🏷️ ${brand}: ${brands[brand].length} محصول`);
  brands[brand].slice(0, 5).forEach((p, i) => {
    const name = p.name?.en || p.name || 'بدون نام';
    console.log(`  ${i+1}. ${name}`);
  });
  if (brands[brand].length > 5) {
    console.log(`  ... و ${brands[brand].length - 5} محصول دیگر`);
  }
});

// ============================================================
// ۴. محصولات سامسونگ بدون مقاله
// ============================================================
const productsWithoutArticle = samsungProducts.filter(p => !p.articleSlug);
console.log(`\n\n⚠️ محصولات سامسونگ بدون مقاله (${productsWithoutArticle.length} عدد):`);
console.log('─────────────────────────────────────────────────────');
productsWithoutArticle.forEach((p, i) => {
  const name = p.name?.en || p.name || 'بدون نام';
  console.log(`  ${i+1}. ${name} (اسلاگ: ${p.slug})`);
});

// ============================================================
// ۵. مقالات سامسونگ بدون محصول
// ============================================================
const articlesWithoutProduct = samsungArticles.filter(a => !a.productSlug);
console.log(`\n\n📰 مقالات سامسونگ بدون محصول (${articlesWithoutProduct.length} عدد):`);
console.log('─────────────────────────────────────────────────────');
articlesWithoutProduct.forEach((a, i) => {
  const title = a.title?.en || a.title || 'بدون عنوان';
  console.log(`  ${i+1}. ${title} (اسلاگ: ${a.slug})`);
});

await mongoose.disconnect();
console.log('\n✅ بررسی کامل شد!');
