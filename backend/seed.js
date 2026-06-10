import mongoose from 'mongoose';
import Article from './models/Article.js';
import dotenv from 'dotenv';
dotenv.config();

const articles = [
  {
    slug: 'iphone-17-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۷ پرو مکس - قدرتمندترین گوشی اپل', en: 'iPhone 17 Pro Max - Apple\'s Most Powerful Phone' },
    content: { 
      fa: '<h2>معرفی آیفون ۱۷ پرو مکس</h2><p>اپل با معرفی آیفون ۱۷ پرو مکس، بار دیگر استانداردهای جدیدی در دنیای گوشی‌های هوشمند تعیین کرد.</p><h3>طراحی و نمایشگر</h3><p>بدنه تیتانیومی با وزن کمتر و استحکام بیشتر، نمایشگر ۶.۹ اینچی Super Retina XDR.</p>', 
      en: '<h2>iPhone 17 Pro Max Review</h2><p>Apple has once again set new standards with the iPhone 17 Pro Max.</p><h3>Design & Display</h3><p>Titanium body, 6.9-inch Super Retina XDR display.</p>'
    },
    cover: '/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg',
    gallery: ['/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg'],
    mainVideo: { id: 'tQdPRHdrCUI', title: 'iPhone 17 Pro Max Review', duration: '14:30' },
    relatedVideos: [{ id: 'DX0HzqxrjEQ', title: 'iPhone 17 vs S25 Ultra', duration: '15:10' }],
    readTime: 12,
    tags: ['iPhone', 'Apple', 'Pro Max'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'galaxy-s24-ultra-ai-revolution',
    brand: 'Samsung',
    title: { fa: 'سامسونگ گلکسی S24 اولترا - انقلاب هوش مصنوعی', en: 'Samsung Galaxy S24 Ultra - AI Revolution' },
    content: { 
      fa: '<h2>معرفی گلکسی S24 اولترا</h2><p>سامسونگ با گلکسی S24 اولترا، هوش مصنوعی را به قلب گوشی هوشمند آورده است.</p><h3>Galaxy AI</h3><p>ترجمه زنده تماس‌ها، ویرایش هوشمند عکس‌ها، و قابلیت Circle to Search.</p>',
      en: '<h2>Galaxy S24 Ultra Review</h2><p>Samsung has brought AI to the heart of the smartphone.</p><h3>Galaxy AI</h3><p>Live translate during calls, intelligent photo editing, and Circle to Search.</p>'
    },
    cover: '/assets/hero-articlepage/galaxy-s24.png',
    gallery: ['/assets/hero-articlepage/galaxy-s24.png', '/assets/hero-articlepage/galaxy-s24-plus.png'],
    mainVideo: { id: 'DX0HzqxrjEQ', title: 'Galaxy S24 Ultra Review', duration: '15:10' },
    relatedVideos: [{ id: 'hDZrB9V-UTk', title: 'iPhone 16 Pro Max Test', duration: '11:20' }],
    readTime: 10,
    tags: ['Samsung', 'Galaxy', 'AI'],
    author: 'مدیر سایت',
    publishDate: new Date()
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apple-store');
    console.log('✅ Connected to MongoDB');
    
    for (const article of articles) {
      const existing = await Article.findOne({ slug: article.slug });
      if (!existing) {
        await Article.create(article);
        console.log(`✅ Added: ${article.slug}`);
      } else {
        console.log(`⏩ Already exists: ${article.slug}`);
      }
    }
    
    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seed();
