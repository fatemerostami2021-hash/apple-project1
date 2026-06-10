import mongoose from 'mongoose';
import Article from './models/Article.js';
import dotenv from 'dotenv';
dotenv.config();

const allArticles = [
  {
    slug: 'iphone-17-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۷ پرو مکس - قدرتمندترین گوشی اپل', en: 'iPhone 17 Pro Max - Apple\'s Most Powerful Phone' },
    content: { fa: '<h2>معرفی آیفون ۱۷ پرو مکس</h2><p>بررسی کامل آیفون ۱۷ پرو مکس</p>', en: '<h2>iPhone 17 Pro Max Review</h2><p>Complete review of iPhone 17 Pro Max</p>' },
    cover: '/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg',
    readTime: 12,
    tags: ['iPhone', 'Apple', 'Pro Max'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'iphone-16-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۶ پرو مکس - بررسی کامل', en: 'iPhone 16 Pro Max - Full Review' },
    content: { fa: '<h2>آیفون ۱۶ پرو مکس</h2><p>بررسی آیفون ۱۶ پرو مکس با دوربین ۴۸ مگاپیکسلی</p>', en: '<h2>iPhone 16 Pro Max</h2><p>Review of iPhone 16 Pro Max with 48MP camera</p>' },
    cover: '/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png',
    readTime: 10,
    tags: ['iPhone', 'Apple', 'Pro Max'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'iphone-15-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۵ پرو مکس - تیتانیوم و USB-C', en: 'iPhone 15 Pro Max - Titanium and USB-C' },
    content: { fa: '<h2>آیفون ۱۵ پرو مکس</h2><p>بررسی آیفون ۱۵ پرو مکس با بدنه تیتانیومی</p>', en: '<h2>iPhone 15 Pro Max</h2><p>Review of iPhone 15 Pro Max with titanium body</p>' },
    cover: '/assets/hero-articlepage/iphone-15-pro.png',
    readTime: 10,
    tags: ['iPhone', 'Apple', 'Pro Max'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'iphone-14-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۴ پرو مکس - Dynamic Island', en: 'iPhone 14 Pro Max - Dynamic Island' },
    content: { fa: '<h2>آیفون ۱۴ پرو مکس</h2><p>بررسی آیفون ۱۴ پرو مکس با Dynamic Island</p>', en: '<h2>iPhone 14 Pro Max</h2><p>Review of iPhone 14 Pro Max with Dynamic Island</p>' },
    cover: '/assets/hero-articlepage/iphone-14-pro-max.png',
    readTime: 10,
    tags: ['iPhone', 'Apple', 'Pro Max'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'iphone-13-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۳ پرو مکس - نسل ProMotion', en: 'iPhone 13 Pro Max - ProMotion Generation' },
    content: { fa: '<h2>آیفون ۱۳ پرو مکس</h2><p>بررسی آیفون ۱۳ پرو مکس با نمایشگر ۱۲۰ هرتز</p>', en: '<h2>iPhone 13 Pro Max</h2><p>Review of iPhone 13 Pro Max with 120Hz display</p>' },
    cover: '/assets/hero-articlepage/iphone-12-pro.png',
    readTime: 9,
    tags: ['iPhone', 'Apple', 'Pro Max'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'iphone-12-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۲ پرو مکس - طراحی جدید', en: 'iPhone 12 Pro Max - New Design' },
    content: { fa: '<h2>آیفون ۱۲ پرو مکس</h2><p>بررسی آیفون ۱۲ پرو مکس با طراحی لبه تخت</p>', en: '<h2>iPhone 12 Pro Max</h2><p>Review of iPhone 12 Pro Max with flat edge design</p>' },
    cover: '/assets/hero-articlepage/iphone-12.png',
    readTime: 8,
    tags: ['iPhone', 'Apple', 'Pro Max'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'iphone-14-to-17-evolution-comparison',
    brand: 'Apple',
    title: { fa: 'مقایسه آیفون ۱۴ تا ۱۷ - تکامل چهار نسل', en: 'iPhone 14 to 17 Evolution - Four Generations' },
    content: { fa: '<h2>تکامل آیفون از ۱۴ تا ۱۷</h2><p>مقایسه کامل چهار نسل آیفون</p>', en: '<h2>iPhone Evolution 14 to 17</h2><p>Complete comparison of four iPhone generations</p>' },
    cover: '/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg',
    readTime: 15,
    tags: ['iPhone', 'Apple', 'Comparison'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'galaxy-s24-ultra-ai-revolution',
    brand: 'Samsung',
    title: { fa: 'گلکسی S24 اولترا - انقلاب هوش مصنوعی', en: 'Galaxy S24 Ultra - AI Revolution' },
    content: { fa: '<h2>گلکسی S24 اولترا</h2><p>بررسی قابلیت‌های هوش مصنوعی</p>', en: '<h2>Galaxy S24 Ultra</h2><p>Review of AI capabilities</p>' },
    cover: '/assets/hero-articlepage/galaxy-s24.png',
    readTime: 10,
    tags: ['Samsung', 'Galaxy', 'AI'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'galaxy-z-flip-6',
    brand: 'Samsung',
    title: { fa: 'گلکسی زد فلیپ ۶ - طراحی و دوام', en: 'Galaxy Z Flip 6 - Design and Durability' },
    content: { fa: '<h2>گلکسی زد فلیپ ۶</h2><p>بررسی طراحی تاشو و دوام</p>', en: '<h2>Galaxy Z Flip 6</h2><p>Review of foldable design and durability</p>' },
    cover: '/assets/hero-articlepage/download.jpg',
    readTime: 9,
    tags: ['Samsung', 'Galaxy', 'Foldable'],
    author: 'مدیر سایت',
    publishDate: new Date()
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apple-store');
    console.log('✅ Connected to MongoDB');
    
    let added = 0;
    for (const article of allArticles) {
      const existing = await Article.findOne({ slug: article.slug });
      if (!existing) {
        await Article.create(article);
        console.log(`✅ Added: ${article.slug}`);
        added++;
      } else {
        console.log(`⏩ Exists: ${article.slug}`);
      }
    }
    
    console.log(`\n✅ Done! Added ${added} new articles.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seed();
