import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

const missingArticles = [
  {
    id: 'iphone-16-pro-review',
    slug: 'iphone-16-pro-review',
    title: { en: 'iPhone 16 Pro Review', fa: 'بررسی آیفون ۱۶ پرو' },
    brand: 'Apple',
    category: 'Review',
    content: { 
      en: 'The iPhone 16 Pro delivers professional-grade features with titanium design, advanced camera system, and the powerful A17 Pro chip.', 
      fa: 'آیفون ۱۶ پرو ویژگی‌های حرفه‌ای را با طراحی تیتانیوم، سیستم دوربین پیشرفته و تراشه قدرتمند A17 Pro ارائه می‌دهد.' 
    },
    excerpt: { en: 'Professional features with titanium design and A17 Pro.', fa: 'ویژگی‌های حرفه‌ای با طراحی تیتانیوم و A17 Pro.' },
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
    content: { 
      en: 'The iPhone 15 introduces Dynamic Island to the standard model, along with a powerful A16 chip and an improved camera system.', 
      fa: 'آیفون ۱۵ داینامیک آیلند را به مدل استاندارد معرفی می‌کند، همراه با تراشه قدرتمند A16 و سیستم دوربین بهبود یافته.' 
    },
    excerpt: { en: 'Dynamic Island comes to the standard iPhone with A16 chip.', fa: 'داینامیک آیلند به آیفون استاندارد با تراشه A16 آمد.' },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: '2026-01-08',
    readTime: 5,
    active: true,
    featured: true
  },
  {
    id: 'ipad-air-review',
    slug: 'ipad-air-review',
    title: { en: 'iPad Air Review', fa: 'بررسی آیپد ایر' },
    brand: 'Apple',
    category: 'Review',
    content: { 
      en: 'The iPad Air offers the perfect balance of power and portability with the M2 chip and stunning Liquid Retina display.', 
      fa: 'آیپد ایر تعادل کامل بین قدرت و قابلیت حمل را با تراشه M2 و نمایشگر خیره‌کننده Liquid Retina ارائه می‌دهد.' 
    },
    excerpt: { en: 'Perfect balance of power and portability with M2 chip.', fa: 'تعادل کامل بین قدرت و قابلیت حمل با تراشه M2.' },
    tags: ['iPad', 'Apple', 'Review', 'M2'],
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
    content: { 
      en: 'The iPad Pro with M4 chip is the ultimate tablet experience with Ultra Retina XDR display and Apple Pencil Pro support.', 
      fa: 'آیپد پرو با تراشه M4 نهایی‌ترین تجربه تبلت را با نمایشگر Ultra Retina XDR و پشتیبانی از Apple Pencil Pro ارائه می‌دهد.' 
    },
    excerpt: { en: 'Ultimate tablet experience with M4 chip.', fa: 'نهایی‌ترین تجربه تبلت با تراشه M4.' },
    tags: ['iPad', 'Apple', 'Review', 'M4', 'Pro'],
    publishDate: '2026-01-06',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    id: 'macbook-air-m3-review',
    slug: 'macbook-air-m3-review',
    title: { en: 'MacBook Air M3 Review', fa: 'بررسی مک‌بوک ایر M3' },
    brand: 'Apple',
    category: 'Review',
    content: { 
      en: 'The MacBook Air M3 is the perfect laptop with incredible performance, all-day battery life, and a lightweight design.', 
      fa: 'مک‌بوک ایر M3 لپ‌تاپ ایده‌آل با عملکرد فوق‌العاده، عمر باتری تمام روز و طراحی سبک است.' 
    },
    excerpt: { en: 'The perfect laptop with M3 chip and all-day battery.', fa: 'لپ‌تاپ ایده‌آل با تراشه M3 و باتری تمام روز.' },
    tags: ['MacBook', 'Apple', 'Review', 'M3'],
    publishDate: '2026-01-04',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    id: 'airpods-max-review',
    slug: 'airpods-max-review',
    title: { en: 'AirPods Max Review', fa: 'بررسی ایرپادز مکس' },
    brand: 'Apple',
    category: 'Review',
    content: { 
      en: 'The AirPods Max deliver exceptional audio quality with active noise cancellation and a premium design.', 
      fa: 'ایرپادز مکس کیفیت صدای استثنایی با حذف نویز فعال و طراحی ممتاز را ارائه می‌دهند.' 
    },
    excerpt: { en: 'Exceptional audio with active noise cancellation.', fa: 'صدای استثنایی با حذف نویز فعال.' },
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
    content: { 
      en: 'The AirPods Pro offer industry-leading active noise cancellation with the H2 chip and comfortable in-ear design.', 
      fa: 'ایرپادز پرو حذف نویز فعال پیشرو در صنعت را با تراشه H2 و طراحی راحت درون گوشی ارائه می‌دهند.' 
    },
    excerpt: { en: 'Industry-leading noise cancellation with H2 chip.', fa: 'حذف نویز پیشرو در صنعت با تراشه H2.' },
    tags: ['AirPods', 'Apple', 'Review'],
    publishDate: '2026-01-02',
    readTime: 4,
    active: true,
    featured: true
  },
  {
    id: 'galaxy-s25-ultra-review',
    slug: 'galaxy-s25-ultra-review',
    title: { en: 'Galaxy S25 Ultra Review', fa: 'بررسی گلکسی اس۲۵ اولترا' },
    brand: 'Samsung',
    category: 'Review',
    content: { 
      en: 'The Galaxy S25 Ultra is Samsung\'s most advanced smartphone with a 200MP camera, Snapdragon 8 Gen 4, and enhanced Galaxy AI.', 
      fa: 'گلکسی اس۲۵ اولترا پیشرفته‌ترین گوشی سامسونگ با دوربین ۲۰۰ مگاپیکسلی، Snapdragon 8 Gen 4 و Galaxy AI بهبود یافته است.' 
    },
    excerpt: { en: 'Most advanced Samsung with 200MP camera.', fa: 'پیشرفته‌ترین سامسونگ با دوربین ۲۰۰ مگاپیکسلی.' },
    tags: ['Samsung', 'Galaxy S25', 'Review'],
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
    content: { 
      en: 'The Galaxy Z Fold 5 is Samsung\'s latest foldable flagship with a refined hinge, improved durability, and powerful Snapdragon processor.', 
      fa: 'گلکسی زد فولد ۵ جدیدترین پرچمدار تاشو سامسونگ با لولای بهبود یافته، دوام بالاتر و پردازنده قدرتمند Snapdragon است.' 
    },
    excerpt: { en: 'Ultimate multitasking foldable device.', fa: 'نهایی‌ترین دستگاه چندوظیفه‌ای تاشو.' },
    tags: ['Samsung', 'Foldable', 'Review'],
    publishDate: '2026-01-07',
    readTime: 7,
    active: true,
    featured: true
  }
];

async function addMissingArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    let added = 0;
    let skipped = 0;
    
    for (const article of missingArticles) {
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

addMissingArticles();
