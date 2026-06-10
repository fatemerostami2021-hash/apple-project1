import mongoose from 'mongoose';
import Article from './models/Article.js';
import dotenv from 'dotenv';
dotenv.config();

const allArticles = [
  // iPhone 12 تا 17 (6 مقاله)
  {
    slug: 'iphone-12-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۲ پرو مکس - طراحی جدید و 5G', en: 'iPhone 12 Pro Max - New Design and 5G' },
    content: { fa: '<h1>آیفون ۱۲ پرو مکس</h1><p>اولین آیفون با طراحی لبه تخت و پشتیبانی از 5G. دوربین LiDAR و نمایشگر Super Retina XDR.</p><h2>طراحی</h2><p>بدنه استیل ضد زنگ با لبه‌های تخت، در رنگ‌های طلایی، نقره‌ای، گرافیت و آبی اقیانوسی.</p><h2>دوربین</h2><p>سیستم دوربین سه‌گانه ۱۲ مگاپیکسلی با حسگر LiDAR برای واقعیت افزوده.</p><h2>باتری</h2><p>باتری ۳۶۸۷ میلی‌آمپر ساعتی با شارژ سریع ۲۰ وات.</p>', en: '<h1>iPhone 12 Pro Max</h1><p>First iPhone with flat-edge design and 5G support. LiDAR camera and Super Retina XDR display.</p><h2>Design</h2><p>Stainless steel body with flat edges in Gold, Silver, Graphite, and Pacific Blue.</p><h2>Camera</h2><p>Triple 12MP camera system with LiDAR sensor for AR.</p><h2>Battery</h2><p>3687mAh battery with 20W fast charging.</p>' },
    cover: '/assets/hero-articlepage/iphone-12.png',
    readTime: 8,
    tags: ['iPhone', 'Apple', '5G'],
    author: 'مدیر سایت',
    publishDate: new Date('2026-01-01')
  },
  {
    slug: 'iphone-13-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۳ پرو مکس - نسل ProMotion', en: 'iPhone 13 Pro Max - ProMotion Generation' },
    content: { fa: '<h1>آیفون ۱۳ پرو مکس</h1><p>اولین آیفون با نمایشگر ۱۲۰ هرتز ProMotion و ناچ کوچک‌تر. باتری فوق‌العاده قدرتمند.</p><h2>نمایشگر</h2><p>صفحه نمایش ۶.۷ اینچی Super Retina XDR با نرخ بروزرسانی ۱۲۰ هرتز و ناچ ۲۰ درصد کوچک‌تر.</p><h2>دوربین</h2><p>حالت سینمایی برای فیلمبرداری با افکت بوکه حرفه‌ای.</p><h2>باتری</h2><p>باتری ۴۳۵۲ میلی‌آمپر ساعتی، بهترین عمر باتری در میان آیفون‌ها.</p>', en: '<h1>iPhone 13 Pro Max</h1><p>First iPhone with 120Hz ProMotion display and smaller notch. Incredible battery life.</p><h2>Display</h2><p>6.7-inch Super Retina XDR with 120Hz refresh rate and 20% smaller notch.</p><h2>Camera</h2><p>Cinematic mode for professional bokeh effect in videos.</p><h2>Battery</h2><p>4352mAh battery, best battery life among iPhones.</p>' },
    cover: '/assets/hero-articlepage/iphone-12-pro.png',
    readTime: 9,
    tags: ['iPhone', 'Apple', 'ProMotion'],
    author: 'مدیر سایت',
    publishDate: new Date('2026-01-15')
  },
  {
    slug: 'iphone-14-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۴ پرو مکس - جزیره داینامیک', en: 'iPhone 14 Pro Max - Dynamic Island' },
    content: { fa: '<h1>آیفون ۱۴ پرو مکس</h1><p>معرفی جزیره داینامیک (Dynamic Island) و نمایشگر همیشه روشن. دوربین ۴۸ مگاپیکسلی.</p><h2>جزیره داینامیک</h2><p>جایگزین ناچ با تعاملات پویا و هوشمند.</p><h2>نمایشگر</h2><p>صفحه نمایش Always-On با نرخ بروزرسانی ۱ هرتز.</p><h2>دوربین</h2><p>سنسور اصلی ۴۸ مگاپیکسلی با قابلیت ثبت تصاویر ProRAW.</p><h2>امنیت</h2><p>تشخیص تصادف و SOS اضطراری از طریق ماهواره.</p>', en: '<h1>iPhone 14 Pro Max</h1><p>Introducing Dynamic Island and Always-On display. 48MP main camera.</p><h2>Dynamic Island</h2><p>Replaces the notch with dynamic and intelligent interactions.</p><h2>Display</h2><p>Always-On display with 1Hz refresh rate.</p><h2>Camera</h2><p>48MP main sensor with ProRAW capability.</p><h2>Safety</h2><p>Crash Detection and Emergency SOS via satellite.</p>' },
    cover: '/assets/hero-articlepage/iphone-14-pro-max.png',
    readTime: 10,
    tags: ['iPhone', 'Apple', 'Dynamic Island'],
    author: 'مدیر سایت',
    publishDate: new Date('2026-02-01')
  },
  {
    slug: 'iphone-15-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۵ پرو مکس - تیتانیوم و USB-C', en: 'iPhone 15 Pro Max - Titanium and USB-C' },
    content: { fa: '<h1>آیفون ۱۵ پرو مکس</h1><p>بدنه تیتانیومی سبک‌تر، پورت USB-C و دکمه اکشن. دوربین با زوم ۵ برابر.</p><h2>بدنه</h2><p>فریم تیتانیومی با وزن ۲۲۱ گرم، ۱۰ درصد سبک‌تر.</p><h2>پورت USB-C</h2><p>سرعت انتقال داده تا ۱۰ گیگابایت بر ثانیه.</p><h2>دکمه اکشن</h2><p>قابل برنامه‌ریزی برای دسترسی سریع به قابلیت‌های مختلف.</p><h2>دوربین</h2><p>زوم اپتیکال ۵ برابر (۱۲۰ میلی‌متر).</p>', en: '<h1>iPhone 15 Pro Max</h1><p>Lighter titanium body, USB-C port, and Action button. 5x optical zoom.</p><h2>Body</h2><p>Titanium frame weighing 221g, 10% lighter.</p><h2>USB-C Port</h2><p>Data transfer speeds up to 10Gbps.</p><h2>Action Button</h2><p>Customizable for quick access to various features.</p><h2>Camera</h2><p>5x optical zoom (120mm).</p>' },
    cover: '/assets/hero-articlepage/iphone-15-pro.png',
    readTime: 10,
    tags: ['iPhone', 'Apple', 'USB-C'],
    author: 'مدیر سایت',
    publishDate: new Date('2026-02-15')
  },
  {
    slug: 'iphone-16-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۶ پرو مکس - دوربین ۴۸ مگاپیکسلی', en: 'iPhone 16 Pro Max - 48MP Camera' },
    content: { fa: '<h1>آیفون ۱۶ پرو مکس</h1><p>پیشرفت در دوربین و تراشه A18 Pro. دکمه کپچر برای عکاسی حرفه‌ای.</p><h2>دوربین</h2><p>دوربین اصلی ۴۸ مگاپیکسل با دیافراگم f/1.78 و لرزشگیر اپتیکال نسل دوم.</p><h2>تراشه A18 Pro</h2><p>CPU ۶ هسته‌ای و GPU ۶ هسته‌ای با قابلیت رهگیری پرتو.</p><h2>دکمه کپچر</h2><p>دکمه اختصاصی برای عکاسی و فیلمبرداری با لمس حساس به فشار.</p>', en: '<h1>iPhone 16 Pro Max</h1><p>Camera advancements and A18 Pro chip. Capture button for professional photography.</p><h2>Camera</h2><p>48MP main camera with f/1.78 aperture and second-gen OIS.</p><h2>A18 Pro Chip</h2><p>6-core CPU and 6-core GPU with ray tracing capability.</p><h2>Capture Button</h2><p>Dedicated button for photography with pressure-sensitive touch.</p>' },
    cover: '/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png',
    readTime: 11,
    tags: ['iPhone', 'Apple', 'Camera'],
    author: 'مدیر سایت',
    publishDate: new Date('2026-03-01')
  },
  {
    slug: 'iphone-17-pro-max',
    brand: 'Apple',
    title: { fa: 'آیفون ۱۷ پرو مکس - قدرتمندترین گوشی اپل', en: 'iPhone 17 Pro Max - Apple\'s Most Powerful Phone' },
    content: { fa: '<h1>آیفون ۱۷ پرو مکس</h1><p>قدرتمندترین آیفون تاریخ با تراشه A19 Pro، دوربین ۴۸ مگاپیکسلی و نمایشگر ۱۲۰ هرتزی.</p><h2>طراحی</h2><p>بدنه تیتانیومی با وزن ۲۲۱ گرم، ۱۰ درصد سبک‌تر از نسل قبل. فریم تخت با لبه‌های خمیده.</p><h2>نمایشگر</h2><p>صفحه نمایش ۶.۹ اینچی OLED با رزولوشن ۱۴۴۰×۳۲۰۰ پیکسل، نرخ ۱۲۰ هرتز ProMotion و روشنایی ۳۰۰۰ نیت.</p><h2>تراشه A19 Pro</h2><p>CPU ۶ هسته‌ای (۲ هسته قدرتمند + ۴ هسته کم‌مصرف) و GPU ۶ هسته‌ای، ۲۰ درصد سریع‌تر از A17 Pro.</p><h2>دوربین</h2><p>دوربین اصلی ۴۸ مگاپیکسل با دیافراگم f/1.78، دوربین اولتراواید ۱۲ مگاپیکسل، دوربین تله‌فوتو ۱۲ مگاپیکسل با زوم اپتیکال ۵ برابر.</p><h2>باتری</h2><p>باتری ۴۸۵۰ میلی‌آمپر ساعتی، شارژ سریع ۳۵ وات (۵۰ درصد در ۲۵ دقیقه).</p>', en: '<h1>iPhone 17 Pro Max</h1><p>The most powerful iPhone ever with A19 Pro chip, 48MP camera, and 120Hz display.</p><h2>Design</h2><p>Titanium body weighing 221g, 10% lighter. Flat frame with curved edges.</p><h2>Display</h2><p>6.9-inch OLED with 1440×3200 resolution, 120Hz ProMotion, 3000 nits brightness.</p><h2>A19 Pro Chip</h2><p>6-core CPU (2 performance + 4 efficiency) and 6-core GPU, 20% faster than A17 Pro.</p><h2>Camera</h2><p>48MP main camera with f/1.78 aperture, 12MP ultra-wide, 12MP telephoto with 5x optical zoom.</p><h2>Battery</h2><p>4850mAh battery, 35W fast charging (50% in 25 minutes).</p>' },
    cover: '/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg',
    readTime: 12,
    tags: ['iPhone', 'Apple', 'Pro Max', 'A19'],
    author: 'مدیر سایت',
    publishDate: new Date('2026-03-15')
  },
  // Samsung و مقایسه‌ها
  {
    slug: 'galaxy-s24-ultra-ai-revolution',
    brand: 'Samsung',
    title: { fa: 'گلکسی S24 اولترا - انقلاب هوش مصنوعی', en: 'Galaxy S24 Ultra - AI Revolution' },
    content: { fa: '<h1>گلکسی S24 اولترا</h1><p>سامسونگ با گلکسی S24 اولترا، هوش مصنوعی را به قلب گوشی هوشمند آورده است.</p><h2>Galaxy AI</h2><p>ترجمه زنده تماس‌ها، ویرایش هوشمند عکس‌ها، قابلیت Circle to Search.</p><h2>طراحی</h2><p>بدنه تیتانیومی با فریم تخت، نمایشگر ۶.۸ اینچی Dynamic AMOLED 2X.</p><h2>دوربین</h2><p>دوربین اصلی ۲۰۰ مگاپیکسل، زوم اپتیکال ۱۰ برابر.</p>', en: '<h1>Galaxy S24 Ultra</h1><p>Samsung brings AI to the heart of the smartphone with Galaxy S24 Ultra.</p><h2>Galaxy AI</h2><p>Live translate during calls, intelligent photo editing, Circle to Search.</p><h2>Design</h2><p>Titanium body with flat frame, 6.8-inch Dynamic AMOLED 2X.</p><h2>Camera</h2><p>200MP main camera, 10x optical zoom.</p>' },
    cover: '/assets/hero-articlepage/galaxy-s24.png',
    readTime: 10,
    tags: ['Samsung', 'Galaxy', 'AI'],
    author: 'مدیر سایت',
    publishDate: new Date('2026-02-10')
  },
  {
    slug: 'iphone-14-to-17-evolution-comparison',
    brand: 'Apple',
    title: { fa: 'مقایسه آیفون ۱۴ تا ۱۷ - چهار نسل تکامل', en: 'iPhone 14 to 17 Comparison - Four Generations' },
    content: { fa: '<h1>مقایسه آیفون ۱۴ تا ۱۷</h1><p>بررسی تحول چهار نسل آیفون از ۱۴ تا ۱۷.</p><h2>جدول مقایسه</h2><table border="1"><tr><th>مدل</th><th>پردازنده</th><th>دوربین</th><th>باتری</th></tr><tr><td>iPhone 14 Pro Max</td><td>A16 Bionic</td><td>48MP</td><td>4323mAh</td></tr><tr><td>iPhone 15 Pro Max</td><td>A17 Pro</td><td>48MP+5x</td><td>4422mAh</td></tr><tr><td>iPhone 16 Pro Max</td><td>A18 Pro</td><td>48MP+ improved</td><td>4676mAh</td></tr><tr><td>iPhone 17 Pro Max</td><td>A19 Pro</td><td>48MP+ upgraded</td><td>4850mAh</td></tr></table>', en: '<h1>iPhone 14 to 17 Comparison</h1><p>Evolution of four iPhone generations from 14 to 17.</p><h2>Comparison Table</h2><table border="1"><tr><th>Model</th><th>Chip</th><th>Camera</th><th>Battery</th></tr><tr><td>iPhone 14 Pro Max</td><td>A16 Bionic</td><td>48MP</td><td>4323mAh</td></tr><tr><td>iPhone 15 Pro Max</td><td>A17 Pro</td><td>48MP+5x</td><td>4422mAh</td></tr><tr><td>iPhone 16 Pro Max</td><td>A18 Pro</td><td>48MP+ improved</td><td>4676mAh</td></tr><tr><td>iPhone 17 Pro Max</td><td>A19 Pro</td><td>48MP+ upgraded</td><td>4850mAh</td></tr></table>' },
    cover: '/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg',
    readTime: 15,
    tags: ['iPhone', 'Apple', 'Comparison'],
    author: 'مدیر سایت',
    publishDate: new Date('2026-03-20')
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apple-store');
    console.log('✅ Connected to MongoDB');
    
    // حذف مقالات قدیمی (اختیاری)
    // await Article.deleteMany({});
    // console.log('🗑️ Old articles removed');
    
    let added = 0;
    let updated = 0;
    
    for (const article of allArticles) {
      const existing = await Article.findOne({ slug: article.slug });
      if (!existing) {
        await Article.create(article);
        console.log(`✅ Added: ${article.slug}`);
        added++;
      } else {
        // به‌روزرسانی محتوای موجود
        await Article.findOneAndUpdate(
          { slug: article.slug },
          { 
            title: article.title,
            content: article.content,
            cover: article.cover,
            readTime: article.readTime,
            tags: article.tags,
            publishDate: article.publishDate
          }
        );
        console.log(`🔄 Updated: ${article.slug}`);
        updated++;
      }
    }
    
    console.log(`\n📊 Summary: Added ${added}, Updated ${updated}, Total ${allArticles.length} articles`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seed();
