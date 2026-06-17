import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

const articles = [
  // ========== آیفون ==========
  {
    title: { 
      en: 'iPhone 18 Pro Max Review', 
      fa: 'بررسی آیفون ۱۸ پرو مکس' 
    },
    slug: 'iphone-18-promax-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPhone 18 Pro Max represents the pinnacle of Apple\'s engineering. With groundbreaking AI capabilities, an advanced camera system, and the new A18 Bionic chip, this device redefines what a smartphone can do.',
      fa: 'آیفون ۱۸ پرو مکس اوج مهندسی اپل را نشان می‌دهد. با قابلیت‌های پیشگامانه هوش مصنوعی، سیستم دوربین پیشرفته و تراشه جدید A18 Bionic، این دستگاه定义了 یک گوشی هوشمند.'
    },
    excerpt: {
      en: 'The most advanced iPhone ever with A18 Bionic and AI capabilities.',
      fa: 'پیشرفته‌ترین آیفون تاریخ با تراشه A18 Bionic و قابلیت‌های هوش مصنوعی.'
    },
    tags: ['iPhone', 'Apple', 'Review', 'A18 Bionic'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 8,
    active: true,
    featured: true
  },
  {
    title: { 
      en: 'iPhone 16 Review', 
      fa: 'بررسی آیفون ۱۶' 
    },
    slug: 'iphone-16-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPhone 16 brings powerful upgrades including the A17 chip, improved battery life, and a refined design. It\'s the perfect balance of performance and value.',
      fa: 'آیفون ۱۶ ارتقاءهای قدرتمندی از جمله تراشه A17، عمر باتری بهبود یافته و طراحی ظریف را به ارمغان می‌آورد. تعادل کامل بین عملکرد و ارزش.'
    },
    excerpt: {
      en: 'Powerful upgrades with A17 chip and improved battery.',
      fa: 'ارتقاءهای قدرتمند با تراشه A17 و باتری بهبود یافته.'
    },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 6,
    active: true,
    featured: true
  },
  {
    title: { 
      en: 'iPhone 16 Pro Review', 
      fa: 'بررسی آیفون ۱۶ پرو' 
    },
    slug: 'iphone-16-pro-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPhone 16 Pro delivers professional-grade features with a stunning titanium design, advanced camera system, and the powerful A17 Pro chip.',
      fa: 'آیفون ۱۶ پرو ویژگی‌های حرفه‌ای را با طراحی خیره‌کننده تیتانیوم، سیستم دوربین پیشرفته و تراشه قدرتمند A17 Pro ارائه می‌دهد.'
    },
    excerpt: {
      en: 'Professional features with titanium design and A17 Pro.',
      fa: 'ویژگی‌های حرفه‌ای با طراحی تیتانیوم و A17 Pro.'
    },
    tags: ['iPhone', 'Apple', 'Review', 'Pro'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 7,
    active: true,
    featured: true
  },
  {
    title: { 
      en: 'iPhone 15 Review', 
      fa: 'بررسی آیفون ۱۵' 
    },
    slug: 'iphone-15-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPhone 15 introduces Dynamic Island to the standard model, along with a powerful A16 chip and an improved camera system.',
      fa: 'آیفون ۱۵ داینامیک آیلند را به مدل استاندارد معرفی می‌کند، همراه با تراشه قدرتمند A16 و سیستم دوربین بهبود یافته.'
    },
    excerpt: {
      en: 'Dynamic Island comes to the standard iPhone with A16 chip.',
      fa: 'داینامیک آیلند به آیفون استاندارد با تراشه A16 آمد.'
    },
    tags: ['iPhone', 'Apple', 'Review'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 5,
    active: true,
    featured: true
  },

  // ========== آیپد ==========
  {
    title: { 
      en: 'iPad Air Review', 
      fa: 'بررسی آیپد ایر' 
    },
    slug: 'ipad-air-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPad Air offers the perfect balance of power and portability. With the M2 chip and a stunning Liquid Retina display, it\'s the ideal tablet for productivity and creativity.',
      fa: 'آیپد ایر تعادل کامل بین قدرت و قابلیت حمل را ارائه می‌دهد. با تراشه M2 و نمایشگر خیره‌کننده Liquid Retina، تبلت ایده‌آل برای بهره‌وری و خلاقیت است.'
    },
    excerpt: {
      en: 'Perfect balance of power and portability with M2 chip.',
      fa: 'تعادل کامل بین قدرت و قابلیت حمل با تراشه M2.'
    },
    tags: ['iPad', 'Apple', 'Review', 'M2'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 5,
    active: true,
    featured: true
  },
  {
    title: { 
      en: 'iPad Pro Review', 
      fa: 'بررسی آیپد پرو' 
    },
    slug: 'ipad-pro-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The iPad Pro with M4 chip is the ultimate tablet experience. With the stunning Ultra Retina XDR display and Apple Pencil Pro support, it\'s a creative powerhouse.',
      fa: 'آیپد پرو با تراشه M4 نهایی‌ترین تجربه تبلت است. با نمایشگر خیره‌کننده Ultra Retina XDR و پشتیبانی از Apple Pencil Pro، یک نیروگاه خلاق است.'
    },
    excerpt: {
      en: 'Ultimate tablet experience with M4 chip and Ultra Retina XDR.',
      fa: 'نهایی‌ترین تجربه تبلت با تراشه M4 و Ultra Retina XDR.'
    },
    tags: ['iPad', 'Apple', 'Review', 'M4', 'Pro'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 6,
    active: true,
    featured: true
  },

  // ========== مک‌بوک ==========
  {
    title: { 
      en: 'MacBook Air M3 Review', 
      fa: 'بررسی مک‌بوک ایر M3' 
    },
    slug: 'macbook-air-m3-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The MacBook Air M3 is the perfect laptop for most users. With incredible performance, all-day battery life, and a lightweight design, it\'s the ultimate everyday companion.',
      fa: 'مک‌بوک ایر M3 لپ‌تاپ ایده‌آل برای اکثر کاربران است. با عملکرد فوق‌العاده، عمر باتری تمام روز و طراحی سبک، همراه نهایی روزمره است.'
    },
    excerpt: {
      en: 'The perfect laptop with M3 chip and all-day battery.',
      fa: 'لپ‌تاپ ایده‌آل با تراشه M3 و باتری تمام روز.'
    },
    tags: ['MacBook', 'Apple', 'Review', 'M3'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 6,
    active: true,
    featured: true
  },

  // ========== ایرپاد ==========
  {
    title: { 
      en: 'AirPods Max Review', 
      fa: 'بررسی ایرپادز مکس' 
    },
    slug: 'airpods-max-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The AirPods Max deliver exceptional audio quality with active noise cancellation and a premium design. They are the ultimate headphones for audiophiles.',
      fa: 'ایرپادز مکس کیفیت صدای استثنایی با حذف نویز فعال و طراحی ممتاز را ارائه می‌دهند. آنها نهایی‌ترین هدفون برای علاقه‌مندان به صدا هستند.'
    },
    excerpt: {
      en: 'Exceptional audio quality with active noise cancellation.',
      fa: 'کیفیت صدای استثنایی با حذف نویز فعال.'
    },
    tags: ['AirPods', 'Apple', 'Review', 'Headphones'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 4,
    active: true,
    featured: true
  },
  {
    title: { 
      en: 'AirPods Pro Review', 
      fa: 'بررسی ایرپادز پرو' 
    },
    slug: 'airpods-pro-review',
    brand: 'Apple',
    category: 'Review',
    content: {
      en: 'The AirPods Pro offer industry-leading active noise cancellation and a comfortable in-ear design. With the H2 chip, they deliver incredible sound quality.',
      fa: 'ایرپادز پرو حذف نویز فعال پیشرو در صنعت و طراحی درون گوشی راحت را ارائه می‌دهند. با تراشه H2، کیفیت صدای فوق‌العاده‌ای ارائه می‌دهند.'
    },
    excerpt: {
      en: 'Industry-leading noise cancellation with H2 chip.',
      fa: 'حذف نویز پیشرو در صنعت با تراشه H2.'
    },
    tags: ['AirPods', 'Apple', 'Review', 'Pro'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 4,
    active: true,
    featured: true
  },

  // ========== سامسونگ ==========
  {
    title: { 
      en: 'Galaxy S25 Ultra Review', 
      fa: 'بررسی گلکسی اس۲۵ اولترا' 
    },
    slug: 'galaxy-s25-ultra-review',
    brand: 'Samsung',
    category: 'Review',
    content: {
      en: 'The Galaxy S25 Ultra is Samsung\'s most advanced smartphone. With a 200MP camera, Snapdragon 8 Gen 4, and enhanced Galaxy AI features, it redefines the Android experience.',
      fa: 'گلکسی اس۲۵ اولترا پیشرفته‌ترین گوشی سامسونگ است. با دوربین ۲۰۰ مگاپیکسلی، Snapdragon 8 Gen 4 و ویژگی‌های بهبود یافته Galaxy AI، تجربه اندروید را بازتعریف می‌کند.'
    },
    excerpt: {
      en: 'Samsung\'s most advanced smartphone with 200MP camera.',
      fa: 'پیشرفته‌ترین گوشی سامسونگ با دوربین ۲۰۰ مگاپیکسلی.'
    },
    tags: ['Samsung', 'Galaxy S25', 'Review', 'Android'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 8,
    active: true,
    featured: true
  },
  {
    title: { 
      en: 'Galaxy Z Fold 5 Review', 
      fa: 'بررسی گلکسی زد فولد ۵' 
    },
    slug: 'galaxy-z-fold-5-review',
    brand: 'Samsung',
    category: 'Review',
    content: {
      en: 'The Galaxy Z Fold 5 is Samsung\'s latest foldable flagship. With a refined hinge, improved durability, and powerful Snapdragon processor, it\'s the ultimate multitasking device.',
      fa: 'گلکسی زد فولد ۵ جدیدترین پرچمدار تاشو سامسونگ است. با لولای بهبود یافته، دوام بالاتر و پردازنده قدرتمند Snapdragon، نهایی‌ترین دستگاه چندوظیفه‌ای است.'
    },
    excerpt: {
      en: 'The ultimate multitasking device with refined foldable design.',
      fa: 'نهایی‌ترین دستگاه چندوظیفه‌ای با طراحی تاشو ظریف.'
    },
    tags: ['Samsung', 'Z Fold 5', 'Review', 'Foldable'],
    publishDate: new Date().toISOString().slice(0, 10),
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
