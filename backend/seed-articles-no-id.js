import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

const articles = [
  // ===== مقالات جدید =====
  {
    slug: 'iphone-18-promax-review',
    title: { en: 'iPhone 18 Pro Max Review', fa: 'بررسی آیفون ۱۸ پرو مکس' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'The iPhone 18 Pro Max represents the pinnacle of Apple\'s engineering...', fa: 'آیفون ۱۸ پرو مکس اوج مهندسی اپل...' },
    excerpt: { en: 'The most advanced iPhone ever.', fa: 'پیشرفته‌ترین آیفون تاریخ.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2026-01-15',
    readTime: 8,
    active: true,
    featured: true
  },
  {
    slug: 'iphone-16-review',
    title: { en: 'iPhone 16 Review', fa: 'بررسی آیفون ۱۶' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'The iPhone 16 brings powerful upgrades...', fa: 'آیفون ۱۶ ارتقاءهای قدرتمندی را به ارمغان می‌آورد...' },
    excerpt: { en: 'Powerful upgrades with A17 chip.', fa: 'ارتقاءهای قدرتمند با تراشه A17.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2026-01-10',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    slug: 'iphone-16-pro-review',
    title: { en: 'iPhone 16 Pro Review', fa: 'بررسی آیفون ۱۶ پرو' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Professional features with titanium design...', fa: 'ویژگی‌های حرفه‌ای با طراحی تیتانیوم...' },
    excerpt: { en: 'Professional features with A17 Pro.', fa: 'ویژگی‌های حرفه‌ای با A17 Pro.' },
    tags: ['iPhone', 'Apple', 'Review', 'Pro'],
    publishDate: '2026-01-12',
    readTime: 7,
    active: true,
    featured: true
  },
  {
    slug: 'iphone-15-review',
    title: { en: 'iPhone 15 Review', fa: 'بررسی آیفون ۱۵' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Dynamic Island comes to standard iPhone...', fa: 'داینامیک آیلند به آیفون استاندارد آمد...' },
    excerpt: { en: 'Dynamic Island with A16 chip.', fa: 'داینامیک آیلند با تراشه A16.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2026-01-08',
    readTime: 5,
    active: true,
    featured: true
  },
  {
    slug: 'ipad-air-review',
    title: { en: 'iPad Air Review', fa: 'بررسی آیپد ایر' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Perfect balance with M2 chip...', fa: 'تعادل کامل با تراشه M2...' },
    excerpt: { en: 'Balance of power with M2.', fa: 'تعادل قدرت با M2.' },
    tags: ['iPad', 'Apple', 'Review'],
    publishDate: '2026-01-05',
    readTime: 5,
    active: true,
    featured: true
  },
  {
    slug: 'ipad-pro-review',
    title: { en: 'iPad Pro Review', fa: 'بررسی آیپد پرو' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Ultimate tablet with M4 chip...', fa: 'نهایی‌ترین تبلت با تراشه M4...' },
    excerpt: { en: 'Ultimate tablet experience.', fa: 'نهایی‌ترین تجربه تبلت.' },
    tags: ['iPad', 'Apple', 'Review', 'Pro'],
    publishDate: '2026-01-06',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    slug: 'macbook-air-m3-review',
    title: { en: 'MacBook Air M3 Review', fa: 'بررسی مک‌بوک ایر M3' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Perfect laptop with M3 chip...', fa: 'لپ‌تاپ ایده‌آل با تراشه M3...' },
    excerpt: { en: 'Perfect laptop with M3.', fa: 'لپ‌تاپ ایده‌آل با M3.' },
    tags: ['MacBook', 'Apple', 'Review'],
    publishDate: '2026-01-04',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    slug: 'airpods-max-review',
    title: { en: 'AirPods Max Review', fa: 'بررسی ایرپادز مکس' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Exceptional audio with ANC...', fa: 'صدای استثنایی با ANC...' },
    excerpt: { en: 'Exceptional audio quality.', fa: 'کیفیت صدای استثنایی.' },
    tags: ['AirPods', 'Apple', 'Review'],
    publishDate: '2026-01-03',
    readTime: 4,
    active: true,
    featured: true
  },
  {
    slug: 'airpods-pro-review',
    title: { en: 'AirPods Pro Review', fa: 'بررسی ایرپادز پرو' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Industry-leading ANC with H2...', fa: 'ANC پیشرو در صنعت با H2...' },
    excerpt: { en: 'Industry-leading ANC.', fa: 'ANC پیشرو در صنعت.' },
    tags: ['AirPods', 'Apple', 'Review', 'Pro'],
    publishDate: '2026-01-02',
    readTime: 4,
    active: true,
    featured: true
  },
  {
    slug: 'galaxy-s25-ultra-review',
    title: { en: 'Galaxy S25 Ultra Review', fa: 'بررسی گلکسی اس۲۵ اولترا' },
    brand: 'Samsung',
    category: 'Review',
    content: { en: 'Most advanced Samsung with 200MP...', fa: 'پیشرفته‌ترین سامسونگ با ۲۰۰MP...' },
    excerpt: { en: 'Most advanced Samsung.', fa: 'پیشرفته‌ترین سامسونگ.' },
    tags: ['Samsung', 'Galaxy', 'Review'],
    publishDate: '2026-01-01',
    readTime: 8,
    active: true,
    featured: true
  },
  {
    slug: 'galaxy-z-fold-5-review',
    title: { en: 'Galaxy Z Fold 5 Review', fa: 'بررسی گلکسی زد فولد ۵' },
    brand: 'Samsung',
    category: 'Review',
    content: { en: 'Ultimate foldable multitasking device...', fa: 'نهایی‌ترین دستگاه تاشو...' },
    excerpt: { en: 'Ultimate foldable device.', fa: 'نهایی‌ترین دستگاه تاشو.' },
    tags: ['Samsung', 'Foldable', 'Review'],
    publishDate: '2026-01-07',
    readTime: 7,
    active: true,
    featured: true
  }
];

async function seedArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    let added = 0;
    for (const article of articles) {
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

seedArticles();
