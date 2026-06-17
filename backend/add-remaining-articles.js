import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

const remainingArticles = [
  {
    slug: 'iphone-17-pro-max',
    title: { en: 'iPhone 17 Pro Max: A Revolution', fa: 'آیفون ۱۷ پرو مکس: انقلابی' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'The iPhone 17 Pro Max is a revolution...', fa: 'آیفون ۱۷ پرو مکس یک انقلاب است...' },
    excerpt: { en: 'A revolution in power.', fa: 'انقلابی در قدرت.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2025-12-20',
    readTime: 8,
    active: true,
    featured: true
  },
  {
    slug: 'iphone-16-pro-max',
    title: { en: 'iPhone 16 Pro Max: Balance of Power', fa: 'آیفون ۱۶ پرو مکس: تعادل قدرت' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Balance of power and design...', fa: 'تعادل قدرت و طراحی...' },
    excerpt: { en: 'Balance of power.', fa: 'تعادل قدرت.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2025-11-15',
    readTime: 7,
    active: true,
    featured: true
  },
  {
    slug: 'iphone-15-pro-max',
    title: { en: 'iPhone 15 Pro Max: The Beginning of Titanium', fa: 'آیفون ۱۵ پرو مکس: آغاز تیتانیوم' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'The beginning of titanium era...', fa: 'آغاز عصر تیتانیوم...' },
    excerpt: { en: 'Titanium era begins.', fa: 'عصر تیتانیوم آغاز شد.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2025-10-10',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    slug: 'iphone-14-pro-max',
    title: { en: 'iPhone 14 Pro Max: Dynamic Island', fa: 'آیفون ۱۴ پرو مکس: داینامیک آیلند' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Dynamic Island changes everything...', fa: 'داینامیک آیلند همه چیز را تغییر داد...' },
    excerpt: { en: 'Dynamic Island innovation.', fa: 'نوآوری داینامیک آیلند.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2025-09-05',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    slug: 'iphone-13-pro-max',
    title: { en: 'iPhone 13 Pro Max: Battery King', fa: 'آیفون ۱۳ پرو مکس: پادشاه باتری' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'The battery king with ProMotion...', fa: 'پادشاه باتری با ProMotion...' },
    excerpt: { en: 'Battery king.', fa: 'پادشاه باتری.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2025-08-01',
    readTime: 5,
    active: true,
    featured: true
  },
  {
    slug: 'iphone-12-pro-max',
    title: { en: 'iPhone 12 Pro Max: The Dawn of 5G', fa: 'آیفون ۱۲ پرو مکس: طلوع 5G' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'The dawn of 5G and MagSafe...', fa: 'طلوع 5G و MagSafe...' },
    excerpt: { en: 'Dawn of 5G.', fa: 'طلوع 5G.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2025-07-01',
    readTime: 5,
    active: true,
    featured: true
  },
  {
    slug: 'galaxy-s24-ultra-ai-revolution',
    title: { en: 'Galaxy S24 Ultra: The AI Revolution', fa: 'گلکسی اس۲۴ اولترا: انقلاب هوش مصنوعی' },
    brand: 'Samsung',
    category: 'Review',
    content: { en: 'The AI revolution in your pocket...', fa: 'انقلاب هوش مصنوعی در جیب شما...' },
    excerpt: { en: 'AI revolution.', fa: 'انقلاب هوش مصنوعی.' },
    tags: ['Samsung', 'Galaxy', 'AI'],
    publishDate: '2025-12-01',
    readTime: 7,
    active: true,
    featured: true
  },
  {
    slug: 's24-plus-vs-iphone-15-pro-max-comparison',
    title: { en: 'Value Battle: S24 Plus vs iPhone 15 Pro Max', fa: 'نبرد ارزش: S24 Plus در مقابل آیفون ۱۵ پرو مکس' },
    brand: 'Samsung',
    category: 'Comparison',
    content: { en: 'Value battle between S24 Plus and iPhone 15 Pro Max...', fa: 'نبرد ارزش بین S24 Plus و آیفون ۱۵ پرو مکس...' },
    excerpt: { en: 'Value battle.', fa: 'نبرد ارزش.' },
    tags: ['Samsung', 'Apple', 'Comparison'],
    publishDate: '2025-11-25',
    readTime: 10,
    active: true,
    featured: true
  },
  {
    slug: '5-galaxy-ai-tips-content-creators',
    title: { en: '5 Galaxy AI Tips for Content Creators', fa: '۵ نکته Galaxy AI برای تولیدکنندگان محتوا' },
    brand: 'Samsung',
    category: 'Tips',
    content: { en: '5 Galaxy AI tips for content creators...', fa: '۵ نکته Galaxy AI برای تولیدکنندگان محتوا...' },
    excerpt: { en: 'AI tips for creators.', fa: 'نکات هوش مصنوعی برای تولیدکنندگان.' },
    tags: ['Samsung', 'Galaxy AI', 'Tips'],
    publishDate: '2025-11-10',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    slug: 'z-flip-6-style-durability-review',
    title: { en: 'Z Flip 6: Why New Generation Loves This Foldable?', fa: 'Z Flip 6: چرا نسل جدید عاشق این تاشو است؟' },
    brand: 'Samsung',
    category: 'Review',
    content: { en: 'Z Flip 6 review...', fa: 'بررسی Z Flip 6...' },
    excerpt: { en: 'Why Gen Z loves Z Flip 6.', fa: 'چرا نسل Z عاشق Z Flip 6 است.' },
    tags: ['Samsung', 'Z Flip', 'Foldable'],
    publishDate: '2025-10-20',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    slug: 'tab-s10-ultra-vs-ipad-pro-m4',
    title: { en: 'Tablet for Video Editing: Tab S10 Ultra or iPad Pro M4?', fa: 'تبلت برای تدوین ویدیو: Tab S10 Ultra یا iPad Pro M4؟' },
    brand: 'Samsung',
    category: 'Comparison',
    content: { en: 'Tablet comparison for video editing...', fa: 'مقایسه تبلت برای تدوین ویدیو...' },
    excerpt: { en: 'Which tablet for video editing?', fa: 'کدام تبلت برای تدوین ویدیو؟' },
    tags: ['Samsung', 'Apple', 'Comparison', 'Tablet'],
    publishDate: '2025-10-05',
    readTime: 8,
    active: true,
    featured: true
  },
  {
    slug: 'iphone-vs-samsung-camera-battle-2025',
    title: { en: 'Camera Battle 2025: Apple vs Samsung', fa: 'نبرد دوربین ۲۰۲۵: اپل در مقابل سامسونگ' },
    brand: 'Apple',
    category: 'Comparison',
    content: { en: 'Camera battle between Apple and Samsung in 2025...', fa: 'نبرد دوربین بین اپل و سامسونگ در سال ۲۰۲۵...' },
    excerpt: { en: 'Camera battle 2025.', fa: 'نبرد دوربین ۲۰۲۵.' },
    tags: ['Apple', 'Samsung', 'Comparison', 'Camera'],
    publishDate: '2025-09-15',
    readTime: 10,
    active: true,
    featured: true
  },
  {
    slug: 'iphone-14-to-17-evolution-comparison',
    title: { en: 'iPhone 14 to 17: Four Years of Evolution', fa: 'آیفون ۱۴ تا ۱۷: چهار سال تکامل' },
    brand: 'Apple',
    category: 'Comparison',
    content: { en: 'Four years of iPhone evolution...', fa: 'چهار سال تکامل آیفون...' },
    excerpt: { en: 'Four years of evolution.', fa: 'چهار سال تکامل.' },
    tags: ['iPhone', 'Apple', 'Comparison'],
    publishDate: '2025-08-20',
    readTime: 12,
    active: true,
    featured: true
  }
];

async function addRemaining() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    let added = 0;
    for (const article of remainingArticles) {
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

addRemaining();
