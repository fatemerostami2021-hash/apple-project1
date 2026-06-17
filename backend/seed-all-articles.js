import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

const allArticles = [
  // ===== آیفون =====
  {
    id: 'iphone-18-promax-review',
    slug: 'iphone-18-promax-review',
    title: { en: 'iPhone 18 Pro Max Review', fa: 'بررسی آیفون ۱۸ پرو مکس' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'The iPhone 18 Pro Max represents the pinnacle...', fa: 'آیفون ۱۸ پرو مکس اوج مهندسی اپل...' },
    excerpt: { en: 'The most advanced iPhone ever.', fa: 'پیشرفته‌ترین آیفون تاریخ.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2026-01-15',
    readTime: 8,
    active: true,
    featured: true
  },
  {
    id: 'iphone-16-review',
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
    id: 'iphone-16-pro-review',
    slug: 'iphone-16-pro-review',
    title: { en: 'iPhone 16 Pro Review', fa: 'بررسی آیفون ۱۶ پرو' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Professional features with titanium design.', fa: 'ویژگی‌های حرفه‌ای با طراحی تیتانیوم.' },
    excerpt: { en: 'Professional features with A17 Pro.', fa: 'ویژگی‌های حرفه‌ای با A17 Pro.' },
    tags: ['iPhone', 'Apple', 'Review', 'Pro'],
    publishDate: '2026-01-12',
    readTime: 7,
    active: true,
    featured: true
  },
  {
    id: 'iphone-15-review',
    slug: 'iphone-15-review',
    title: { en: 'iPhone 15 Review', fa: 'بررسی آیفون ۱۵' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Dynamic Island comes to standard iPhone.', fa: 'داینامیک آیلند به آیفون استاندارد آمد.' },
    excerpt: { en: 'Dynamic Island with A16 chip.', fa: 'داینامیک آیلند با تراشه A16.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2026-01-08',
    readTime: 5,
    active: true,
    featured: true
  },
  // ===== آیپد =====
  {
    id: 'ipad-air-review',
    slug: 'ipad-air-review',
    title: { en: 'iPad Air Review', fa: 'بررسی آیپد ایر' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Perfect balance with M2 chip.', fa: 'تعادل کامل با تراشه M2.' },
    excerpt: { en: 'Balance of power with M2.', fa: 'تعادل قدرت با M2.' },
    tags: ['iPad', 'Apple', 'Review'],
    publishDate: '2026-01-05',
    readTime: 5,
    active: true,
    featured: true
  },
  {
    id: 'ipad-pro-review',
    slug: 'ipad-pro-review',
    title: { en: 'iPad Pro Review', fa: 'بررسی آیپد پرو' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Ultimate tablet with M4 chip.', fa: 'نهایی‌ترین تبلت با تراشه M4.' },
    excerpt: { en: 'Ultimate tablet experience.', fa: 'نهایی‌ترین تجربه تبلت.' },
    tags: ['iPad', 'Apple', 'Review', 'Pro'],
    publishDate: '2026-01-06',
    readTime: 6,
    active: true,
    featured: true
  },
  // ===== مک‌بوک =====
  {
    id: 'macbook-air-m3-review',
    slug: 'macbook-air-m3-review',
    title: { en: 'MacBook Air M3 Review', fa: 'بررسی مک‌بوک ایر M3' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Perfect laptop with M3 chip.', fa: 'لپ‌تاپ ایده‌آل با تراشه M3.' },
    excerpt: { en: 'Perfect laptop with M3.', fa: 'لپ‌تاپ ایده‌آل با M3.' },
    tags: ['MacBook', 'Apple', 'Review'],
    publishDate: '2026-01-04',
    readTime: 6,
    active: true,
    featured: true
  },
  // ===== ایرپاد =====
  {
    id: 'airpods-max-review',
    slug: 'airpods-max-review',
    title: { en: 'AirPods Max Review', fa: 'بررسی ایرپادز مکس' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Exceptional audio with ANC.', fa: 'صدای استثنایی با ANC.' },
    excerpt: { en: 'Exceptional audio quality.', fa: 'کیفیت صدای استثنایی.' },
    tags: ['AirPods', 'Apple', 'Review'],
    publishDate: '2026-01-03',
    readTime: 4,
    active: true,
    featured: true
  },
  {
    id: 'airpods-pro-review',
    slug: 'airpods-pro-review',
    title: { en: 'AirPods Pro Review', fa: 'بررسی ایرپادز پرو' },
    brand: 'Apple',
    category: 'Review',
    content: { en: 'Industry-leading ANC with H2.', fa: 'ANC پیشرو در صنعت با H2.' },
    excerpt: { en: 'Industry-leading ANC.', fa: 'ANC پیشرو در صنعت.' },
    tags: ['AirPods', 'Apple', 'Review', 'Pro'],
    publishDate: '2026-01-02',
    readTime: 4,
    active: true,
    featured: true
  },
  // ===== سامسونگ =====
  {
    id: 'galaxy-s25-ultra-review',
    slug: 'galaxy-s25-ultra-review',
    title: { en: 'Galaxy S25 Ultra Review', fa: 'بررسی گلکسی اس۲۵ اولترا' },
    brand: 'Samsung',
    category: 'Review',
    content: { en: 'Most advanced Samsung with 200MP.', fa: 'پیشرفته‌ترین سامسونگ با ۲۰۰MP.' },
    excerpt: { en: 'Most advanced Samsung.', fa: 'پیشرفته‌ترین سامسونگ.' },
    tags: ['Samsung', 'Galaxy', 'Review'],
    publishDate: '2026-01-01',
    readTime: 8,
    active: true,
    featured: true
  },
  {
    id: 'galaxy-z-fold-5-review',
    slug: 'galaxy-z-fold-5-review',
    title: { en: 'Galaxy Z Fold 5 Review', fa: 'بررسی گلکسی زد فولد ۵' },
    brand: 'Samsung',
    category: 'Review',
    content: { en: 'Ultimate foldable multitasking device.', fa: 'نهایی‌ترین دستگاه تاشو.' },
    excerpt: { en: 'Ultimate foldable device.', fa: 'نهایی‌ترین دستگاه تاشو.' },
    tags: ['Samsung', 'Foldable', 'Review'],
    publishDate: '2026-01-07',
    readTime: 7,
    active: true,
    featured: true
  },
  // ===== مقالات موجود قبلی =====
  {
    id: 'iphone-17-pro-max',
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
    id: 'iphone-16-pro-max',
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
    id: 'iphone-15-pro-max',
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
    id: 'iphone-14-pro-max',
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
    id: 'iphone-13-pro-max',
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
    id: 'iphone-12-pro-max',
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
    id: 'galaxy-s24-ultra-ai-revolution',
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
    id: 'iphone-14-to-17-evolution-comparison',
    slug: 'iphone-14-to-17-evolution-comparison',
    title: { en: 'iPhone 14 to 17: Four Years of Evolution', fa: 'آیفون ۱۴ تا ۱۷: چهار سال تکامل' },
    brand: 'Apple',
    category: 'Comparison',
    content: { en: 'Four years of iPhone evolution...', fa: 'چهار سال تکامل آیفون...' },
    excerpt: { en: 'Four years of evolution.', fa: 'چهار سال تکامل.' },
    tags: ['iPhone', 'Apple', 'Comparison'],
    publishDate: '2025-11-20',
    readTime: 10,
    active: true,
    featured: true
  }
];

async function seedAll() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    let added = 0;
    let skipped = 0;
    
    for (const article of allArticles) {
      const existing = await Article.findOne({ slug: article.slug });
      if (!existing) {
        await Article.create(article);
        console.log('✅ اضافه شد:', article.slug);
        added++;
      } else {
        console.log('⏩ موجود است:', article.slug);
        skipped++;
      }
    }
    
    console.log('\n📊 خلاصه:');
    console.log('✅', added, 'مقاله جدید اضافه شد');
    console.log('⏩', skipped, 'مقاله موجود بود');
    console.log('📚 مجموع مقالات:', await Article.countDocuments());
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

seedAll();
