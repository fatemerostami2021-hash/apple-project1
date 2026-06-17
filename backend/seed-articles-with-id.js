import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

const articles = [
  // ========== آیفون ==========
  {
    id: 'iphone-18-promax-review',
    title: { 
      en: 'iPhone 18 Pro Max Review', 
      fa: 'بررسی آیفون ۱۸ پرو مکس' 
    },
    slug: 'iphone-18-promax-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPhone 18 Pro Max represents the pinnacle of Apple\'s engineering.',
      fa: 'آیفون ۱۸ پرو مکس اوج مهندسی اپل را نشان می‌دهد.'
    },
    excerpt: {
      en: 'The most advanced iPhone ever with A18 Bionic.',
      fa: 'پیشرفته‌ترین آیفون تاریخ با تراشه A18 Bionic.'
    },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2026-01-15',
    readTime: 8,
    active: true,
    featured: true
  },
  {
    id: 'iphone-16-review',
    title: { 
      en: 'iPhone 16 Review', 
      fa: 'بررسی آیفون ۱۶' 
    },
    slug: 'iphone-16-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPhone 16 brings powerful upgrades including the A17 chip.',
      fa: 'آیفون ۱۶ ارتقاءهای قدرتمندی از جمله تراشه A17 را به ارمغان می‌آورد.'
    },
    excerpt: {
      en: 'Powerful upgrades with A17 chip.',
      fa: 'ارتقاءهای قدرتمند با تراشه A17.'
    },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2026-01-10',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    id: 'iphone-16-pro-review',
    title: { 
      en: 'iPhone 16 Pro Review', 
      fa: 'بررسی آیفون ۱۶ پرو' 
    },
    slug: 'iphone-16-pro-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPhone 16 Pro delivers professional-grade features.',
      fa: 'آیفون ۱۶ پرو ویژگی‌های حرفه‌ای را ارائه می‌دهد.'
    },
    excerpt: {
      en: 'Professional features with titanium design.',
      fa: 'ویژگی‌های حرفه‌ای با طراحی تیتانیوم.'
    },
    tags: ['iPhone', 'Apple', 'Review', 'Pro'],
    publishDate: '2026-01-12',
    readTime: 7,
    active: true,
    featured: true
  },
  {
    id: 'iphone-15-review',
    title: { 
      en: 'iPhone 15 Review', 
      fa: 'بررسی آیفون ۱۵' 
    },
    slug: 'iphone-15-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPhone 15 introduces Dynamic Island to the standard model.',
      fa: 'آیفون ۱۵ داینامیک آیلند را به مدل استاندارد معرفی می‌کند.'
    },
    excerpt: {
      en: 'Dynamic Island comes to the standard iPhone.',
      fa: 'داینامیک آیلند به آیفون استاندارد آمد.'
    },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2026-01-08',
    readTime: 5,
    active: true,
    featured: true
  },
  // ========== آیپد ==========
  {
    id: 'ipad-air-review',
    title: { 
      en: 'iPad Air Review', 
      fa: 'بررسی آیپد ایر' 
    },
    slug: 'ipad-air-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPad Air offers the perfect balance of power and portability.',
      fa: 'آیپد ایر تعادل کامل بین قدرت و قابلیت حمل را ارائه می‌دهد.'
    },
    excerpt: {
      en: 'Perfect balance with M2 chip.',
      fa: 'تعادل کامل با تراشه M2.'
    },
    tags: ['iPad', 'Apple', 'Review'],
    publishDate: '2026-01-05',
    readTime: 5,
    active: true,
    featured: true
  },
  {
    id: 'ipad-pro-review',
    title: { 
      en: 'iPad Pro Review', 
      fa: 'بررسی آیپد پرو' 
    },
    slug: 'ipad-pro-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPad Pro with M4 is the ultimate tablet experience.',
      fa: 'آیپد پرو با M4 نهایی‌ترین تجربه تبلت است.'
    },
    excerpt: {
      en: 'Ultimate tablet with M4 chip.',
      fa: 'نهایی‌ترین تبلت با تراشه M4.'
    },
    tags: ['iPad', 'Apple', 'Review'],
    publishDate: '2026-01-06',
    readTime: 6,
    active: true,
    featured: true
  },
  // ========== مک‌بوک ==========
  {
    id: 'macbook-air-m3-review',
    title: { 
      en: 'MacBook Air M3 Review', 
      fa: 'بررسی مک‌بوک ایر M3' 
    },
    slug: 'macbook-air-m3-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The MacBook Air M3 is the perfect laptop with incredible performance.',
      fa: 'مک‌بوک ایر M3 لپ‌تاپ ایده‌آل با عملکرد فوق‌العاده است.'
    },
    excerpt: {
      en: 'Perfect laptop with M3 chip.',
      fa: 'لپ‌تاپ ایده‌آل با تراشه M3.'
    },
    tags: ['MacBook', 'Apple', 'Review'],
    publishDate: '2026-01-04',
    readTime: 6,
    active: true,
    featured: true
  },
  // ========== ایرپاد ==========
  {
    id: 'airpods-max-review',
    title: { 
      en: 'AirPods Max Review', 
      fa: 'بررسی ایرپادز مکس' 
    },
    slug: 'airpods-max-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The AirPods Max deliver exceptional audio quality.',
      fa: 'ایرپادز مکس کیفیت صدای استثنایی را ارائه می‌دهند.'
    },
    excerpt: {
      en: 'Exceptional audio with noise cancellation.',
      fa: 'صدای استثنایی با حذف نویز.'
    },
    tags: ['AirPods', 'Apple', 'Review'],
    publishDate: '2026-01-03',
    readTime: 4,
    active: true,
    featured: true
  },
  {
    id: 'airpods-pro-review',
    title: { 
      en: 'AirPods Pro Review', 
      fa: 'بررسی ایرپادز پرو' 
    },
    slug: 'airpods-pro-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The AirPods Pro offer industry-leading noise cancellation.',
      fa: 'ایرپادز پرو حذف نویز پیشرو در صنعت را ارائه می‌دهند.'
    },
    excerpt: {
      en: 'Industry-leading noise cancellation.',
      fa: 'حذف نویز پیشرو در صنعت.'
    },
    tags: ['AirPods', 'Apple', 'Review'],
    publishDate: '2026-01-02',
    readTime: 4,
    active: true,
    featured: true
  },
  // ========== سامسونگ ==========
  {
    id: 'galaxy-s25-ultra-review',
    title: { 
      en: 'Galaxy S25 Ultra Review', 
      fa: 'بررسی گلکسی اس۲۵ اولترا' 
    },
    slug: 'galaxy-s25-ultra-review',
    brand: 'Samsung',
    category: 'Review',
    content: {
      en: 'The Galaxy S25 Ultra is Samsung\'s most advanced smartphone.',
      fa: 'گلکسی اس۲۵ اولترا پیشرفته‌ترین گوشی سامسونگ است.'
    },
    excerpt: {
      en: 'Most advanced Samsung with 200MP camera.',
      fa: 'پیشرفته‌ترین سامسونگ با دوربین ۲۰۰ مگاپیکسلی.'
    },
    tags: ['Samsung', 'Galaxy', 'Review'],
    publishDate: '2026-01-01',
    readTime: 8,
    active: true,
    featured: true
  },
  {
    id: 'galaxy-z-fold-5-review',
    title: { 
      en: 'Galaxy Z Fold 5 Review', 
      fa: 'بررسی گلکسی زد فولد ۵' 
    },
    slug: 'galaxy-z-fold-5-review',
    brand: 'Samsung',
    category: 'Review',
    content: {
      en: 'The Galaxy Z Fold 5 is Samsung\'s latest foldable flagship.',
      fa: 'گلکسی زد فولد ۵ جدیدترین پرچمدار تاشو سامسونگ است.'
    },
    excerpt: {
      en: 'Ultimate multitasking foldable device.',
      fa: 'نهایی‌ترین دستگاه چندوظیفه‌ای تاشو.'
    },
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
    let skipped = 0;
    
    for (const article of articles) {
      const existing = await Article.findOne({ slug: article.slug });
      if (!existing) {
        await Article.create(article);
        console.log(`✅ اضافه شد: ${article.slug}`);
        added++;
      } else {
        console.log(`⏩ موجود است: ${article.slug}`);
        skipped++;
      }
    }
    
    console.log(`\n📊 خلاصه:`);
    console.log(`✅ ${added} مقاله جدید اضافه شد`);
    console.log(`⏩ ${skipped} مقاله موجود بود`);
    console.log(`📚 مجموع مقالات: ${await Article.countDocuments()}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

seedArticles();
