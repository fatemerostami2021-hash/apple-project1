import mongoose from 'mongoose';
import Article from './models/Article.js';
import dotenv from 'dotenv';
dotenv.config();

const missingArticles = [
  {
    slug: 's24-plus-vs-iphone-15-pro-max-comparison',
    brand: 'Comparison',
    title: { 
      fa: 'مقایسه S24 Plus vs آیفون ۱۵ پرو مکس', 
      en: 'S24 Plus vs iPhone 15 Pro Max Comparison' 
    },
    content: { 
      fa: '<h1>مقایسه S24 Plus vs آیفون ۱۵ پرو مکس</h1><p>مقایسه دو پرچمدار میان‌رده سامسونگ و اپل.</p><h2>مشخصات</h2><table border=\"1\"><tr><th>ویژگی</th><th>S24 Plus</th><th>iPhone 15 Pro Max</th></tr><tr><td>پردازنده</td><td>Snapdragon 8 Gen 3</td><td>A17 Pro</td></tr><tr><td>رم</td><td>12GB</td><td>8GB</td></tr><tr><td>دوربین</td><td>50MP</td><td>48MP</td></tr><tr><td>باتری</td><td>4900mAh</td><td>4422mAh</td></tr></table><h3>نتیجه</h3><p>S24 Plus ارزش خرید بالاتری دارد، اما آیفون در عملکرد و دوربین قدرتمندتر است.</p>',
      en: '<h1>S24 Plus vs iPhone 15 Pro Max Comparison</h1><p>Comparison of Samsung and Apple mid-range flagships.</p><h2>Specs</h2><table border=\"1\"><tr><th>Feature</th><th>S24 Plus</th><th>iPhone 15 Pro Max</th></tr><tr><td>Processor</td><td>Snapdragon 8 Gen 3</td><td>A17 Pro</td></tr><tr><td>RAM</td><td>12GB</td><td>8GB</td></tr><tr><td>Camera</td><td>50MP</td><td>48MP</td></tr><tr><td>Battery</td><td>4900mAh</td><td>4422mAh</td></tr></table><h3>Conclusion</h3><p>S24 Plus offers better value, but iPhone is more powerful in performance and camera.</p>'
    },
    cover: '/assets/hero-articlepage/galaxy-s24-plus.png',
    readTime: 8,
    tags: ['Samsung', 'Apple', 'Comparison'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'z-flip-6-style-durability-review',
    brand: 'Samsung',
    title: { 
      fa: 'Z Flip 6 - بررسی طراحی و دوام', 
      en: 'Z Flip 6 - Style and Durability Review' 
    },
    content: { 
      fa: '<h1>Z Flip 6 - بررسی طراحی و دوام</h1><p>بررسی گوشی تاشو سامسونگ Z Flip 6.</p><h2>طراحی</h2><p>بدنه فلزی، لولا بهبود یافته، صفحه نمایش بیرونی ۳.۴ اینچی.</p><h2>دوام</h2><p>استاندارد IP48، لولا با ۲۰۰٬۰۰۰ بار باز و بسته شدن.</p>',
      en: '<h1>Z Flip 6 - Style and Durability Review</h1><p>Samsung Z Flip 6 foldable phone review.</p><h2>Design</h2><p>Metal body, improved hinge, 3.4-inch cover display.</p><h2>Durability</h2><p>IP48 rating, hinge rated for 200,000 folds.</p>'
    },
    cover: '/assets/hero-articlepage/download.jpg',
    readTime: 7,
    tags: ['Samsung', 'Foldable', 'Z Flip'],
    author: 'مدیر سایت',
    publishDate: new Date()
  }
];

async function addMissing() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apple-store');
    console.log('✅ Connected to MongoDB');
    
    let added = 0;
    for (const article of missingArticles) {
      const existing = await Article.findOne({ slug: article.slug });
      if (!existing) {
        await Article.create(article);
        console.log(`✅ Added: ${article.slug}`);
        added++;
      } else {
        console.log(`⏩ Already exists: ${article.slug}`);
      }
    }
    
    console.log(`\n✅ Added ${added} articles`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

addMissing();
