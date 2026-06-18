import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

const missingArticles = [
  {
    slug: 'apple-ecosystem-guide',
    title: { en: 'Apple Ecosystem Guide', fa: 'راهنمای اکوسیستم اپل' },
    brand: 'Apple',
    category: 'Guide',
    content: { en: 'Complete guide to Apple ecosystem...', fa: 'راهنمای کامل اکوسیستم اپل...' },
    excerpt: { en: 'Seamless integration across all Apple devices.', fa: 'ادغام یکپارچه در تمام دستگاه‌های اپل.' },
    tags: ['Apple', 'Ecosystem', 'Guide'],
    publishDate: '2025-01-15',
    readTime: 6,
    active: true,
    featured: true,
    cover: '/assets/iphone/hero-endframe.png'
  },
  {
    slug: 'apple-watch-series-9-review',
    title: { en: 'Apple Watch Series 9 Review', fa: 'بررسی اپل واچ سری ۹' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Apple Watch Series 9 review...', fa: 'بررسی اپل واچ سری ۹...' },
    excerpt: { en: 'Smarter, brighter, more powerful.', fa: 'باهوش‌تر، درخشان‌تر، قدرتمندتر.' },
    tags: ['Apple Watch', 'Apple', 'Review'],
    publishDate: '2025-01-10',
    readTime: 5,
    active: true,
    featured: true,
    cover: '/assets/watch/apple-watch-ultra-4.png'
  },
  {
    slug: 'iphone-13-red-review',
    title: { en: 'iPhone 13 Product Red Review', fa: 'بررسی آیفون ۱۳ پروداکت رد' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'iPhone 13 Product Red review...', fa: 'بررسی آیفون ۱۳ پروداکت رد...' },
    excerpt: { en: 'Special color, unlimited power.', fa: 'رنگ خاص، قدرت بی‌پایان.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2025-01-08',
    readTime: 4,
    active: true,
    featured: true,
    cover: '/assets/iphone/iphone-13-pro-max.png'
  },
  {
    slug: 'iphone-15-pro-review',
    title: { en: 'iPhone 15 Pro Review', fa: 'بررسی آیفون ۱۵ پرو' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'iPhone 15 Pro review...', fa: 'بررسی آیفون ۱۵ پرو...' },
    excerpt: { en: 'Titanium. Lightest and strongest Pro ever.', fa: 'تیتانیوم. سبک‌ترین و قوی‌ترین پرو تاریخ.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2025-01-05',
    readTime: 6,
    active: true,
    featured: true,
    cover: '/assets/iphone/iphone-15-pro-max.png'
  },
  {
    slug: 'samsung-flagships-2024',
    title: { en: 'Samsung Flagships 2024', fa: 'پرچمداران سامسونگ ۲۰۲۴' },
    brand: 'Samsung',
    category: 'Guide',
    content: { en: 'Samsung flagships guide...', fa: 'راهنمای پرچمداران سامسونگ...' },
    excerpt: { en: 'The pinnacle of Android technology.', fa: 'اوج تکنولوژی اندروید.' },
    tags: ['Samsung', 'Flagship', 'Guide'],
    publishDate: '2025-01-01',
    readTime: 7,
    active: true,
    featured: true,
    cover: '/assets/galexy-series-s/galaxy-s24-ultra.png'
  },
  {
    slug: 'macbook-pro-m3-review',
    title: { en: 'MacBook Pro M3 Review', fa: 'بررسی مک‌بوک پرو M3' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'MacBook Pro M3 review...', fa: 'بررسی مک‌بوک پرو M3...' },
    excerpt: { en: 'For the pros. M3 chip power.', fa: 'برای حرفه‌ای‌ها. قدرت تراشه M3.' },
    tags: ['MacBook', 'Apple', 'Review'],
    publishDate: '2025-01-01',
    readTime: 8,
    active: true,
    featured: true,
    cover: '/assets/macbook/macboo-air-m3--.png'
  },
  {
    slug: 'ipad-pro-m2-review',
    title: { en: 'iPad Pro M2 Review', fa: 'بررسی آیپد پرو M2' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'iPad Pro M2 review...', fa: 'بررسی آیپد پرو M2...' },
    excerpt: { en: 'Your next computer.', fa: 'کامپیوتر بعدی شما.' },
    tags: ['iPad', 'Apple', 'Review'],
    publishDate: '2025-01-01',
    readTime: 5,
    active: true,
    featured: true,
    cover: '/assets/ipad/ipad-pro.png'
  },
  {
    slug: 'iphone-17-dual-view',
    title: { en: 'iPhone 17 Dual View Concept', fa: 'کانسپت نمای دوگانه آیفون ۱۷' },
    brand: 'Concept',
    category: 'Concept',
    content: { en: 'Dual view concept...', fa: 'کانسپت نمای دوگانه...' },
    excerpt: { en: 'Circular camera module design.', fa: 'طراحی ماژول دوربین دایره‌ای.' },
    tags: ['iPhone', 'Concept', 'Design'],
    publishDate: '2025-01-01',
    readTime: 3,
    active: true,
    featured: true,
    cover: '/assets/iphone/hero-endframe.png'
  },
  {
    slug: 'apple-full-setup-guide',
    title: { en: 'Apple Full Setup Guide', fa: 'راهنمای ست کامل اپل' },
    brand: 'Apple',
    category: 'Guide',
    content: { en: 'Complete Apple setup guide...', fa: 'راهنمای کامل ست اپل...' },
    excerpt: { en: 'Complete Apple workspace.', fa: 'میز کار کامل اپل.' },
    tags: ['Apple', 'Setup', 'Guide'],
    publishDate: '2025-01-01',
    readTime: 4,
    active: true,
    featured: true,
    cover: '/assets/iphone/hero-endframe.png'
  },
  {
    slug: 'galaxy-s24-series-comparison',
    title: { en: 'Galaxy S24 Series Comparison', fa: 'مقایسه سری گلکسی اس۲۴' },
    brand: 'Samsung',
    category: 'Comparison',
    content: { en: 'Galaxy S24 series comparison...', fa: 'مقایسه سری گلکسی اس۲۴...' },
    excerpt: { en: 'Choose your best Galaxy.', fa: 'بهترین گلکسی خود را انتخاب کنید.' },
    tags: ['Samsung', 'Galaxy S24', 'Comparison'],
    publishDate: '2025-01-01',
    readTime: 6,
    active: true,
    featured: true,
    cover: '/assets/galexy-series-s/galaxy-s24-ultra.png'
  },
  {
    slug: 'apple-watch-collection-guide',
    title: { en: 'Apple Watch Collection Guide', fa: 'راهنمای کلکسیون اپل واچ' },
    brand: 'Apple',
    category: 'Guide',
    content: { en: 'Apple Watch collection guide...', fa: 'راهنمای کلکسیون اپل واچ...' },
    excerpt: { en: 'Styles and models for every taste.', fa: 'تنوعی از بندها و مدل‌ها.' },
    tags: ['Apple Watch', 'Collection', 'Guide'],
    publishDate: '2025-01-01',
    readTime: 4,
    active: true,
    featured: true,
    cover: '/assets/watch/apple-watch-ultra-4.png'
  }
];

async function seedMissingArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    let added = 0;
    for (const article of missingArticles) {
      const existing = await Article.findOne({ slug: article.slug });
      if (!existing) {
        await Article.create(article);
        console.log('✅ اضافه شد:', article.slug);
        added++;
      } else {
        console.log('⏩ موجود است:', article.slug);
      }
    }
    
    console.log(`\n✅ ${added} مقاله جدید اضافه شد`);
    console.log(`📚 مجموع مقالات: ${await Article.countDocuments()}`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

seedMissingArticles();
