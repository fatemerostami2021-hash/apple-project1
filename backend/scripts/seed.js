// backend/scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('../models/Article');

// داده‌های مقالات شما (از articlesData.js)
const articlesData = [
  {
    id: "iphone-17-pro-max",
    brand: "Apple",
    slug: "iphone-17-pro-max",
    cover: "/assets/iphone/iphone-17-pro-max.png",
    title: { fa: "آیفون ۱۷ پرو مکس: انقلابی در قدرت و تجربه کاربری", en: "iPhone 17 Pro Max: A Revolution in Power and User Experience" },
    excerpt: { fa: "نگاهی عمیق به آیفون ۱۷ پرو مکس با پردازنده نسل آینده A18...", en: "An in-depth look at the iPhone 17 Pro Max..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 15,
    likes: 342,
    isTrending: true,
    publishDate: new Date("2025-02-10"),
    tags: ["آیفون", "پرو مکس", "A18", "دوربین", "Apple Intelligence"],
    author: "تیم تک‌کرانچ",
    views: 1250
  },
  {
    id: "iphone-16-pro-max",
    brand: "Apple",
    slug: "iphone-16-pro-max",
    cover: "/assets/iphone/iphone-16-pro-max.png",
    title: { fa: "آیفون ۱۶ پرو مکس: تعادل قدرت و طراحی", en: "iPhone 16 Pro Max: Balance of Power and Design" },
    excerpt: { fa: "ترکیبی از عملکرد قدرتمند تراشه A17 Pro، طراحی مدرن تیتانیومی...", en: "A blend of powerful A17 Pro performance..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 9,
    likes: 278,
    isTrending: true,
    publishDate: new Date("2025-02-05"),
    tags: ["آیفون", "پرو مکس", "A17 Pro", "Camera Control", "تیتانیوم"],
    author: "تیم تک‌کرانچ",
    views: 890
  },
  {
    id: "iphone-15-pro-max",
    brand: "Apple",
    slug: "iphone-15-pro-max",
    cover: "/assets/iphone/iphone-15-pro-max.png",
    title: { fa: "آیفون ۱۵ پرو مکس: آغاز عصر تیتانیوم", en: "iPhone 15 Pro Max: The Beginning of the Titanium Era" },
    excerpt: { fa: "سبک‌تر، مقاوم‌تر و مجهز به USB-C. بررسی کامل تغییرات انقلابی...", en: "Lighter, stronger, and equipped with USB-C..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 9,
    likes: 421,
    isTrending: true,
    publishDate: new Date("2025-01-28"),
    tags: ["آیفون", "پرو مکس", "تیتانیوم", "USB-C", "Action Button"],
    author: "تیم تک‌کرانچ",
    views: 2100
  },
  {
    id: "iphone-14-pro-max",
    brand: "Apple",
    slug: "iphone-14-pro-max",
    cover: "/assets/iphone/iphone-14-pro-max.png",
    title: { fa: "آیفون ۱۴ پرو مکس: Dynamic Island و دوربین ۴۸ مگاپیکسلی", en: "iPhone 14 Pro Max: Dynamic Island and 48MP Camera" },
    excerpt: { fa: "معرفی Dynamic Island، دوربین ۴۸ مگاپیکسلی و Always-On Display...", en: "Dynamic Island, 48MP camera, and Always-On Display..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 8,
    likes: 198,
    isTrending: false,
    publishDate: new Date("2025-01-20"),
    tags: ["آیفون", "پرو مکس", "Dynamic Island", "Always-On", "A16"],
    author: "تیم تک‌کرانچ",
    views: 560
  },
  {
    id: "iphone-13-pro-max",
    brand: "Apple",
    slug: "iphone-13-pro-max",
    cover: "/assets/iphone/iphone-13-pro-max.png",
    title: { fa: "آیفون ۱۳ پرو مکس: پادشاه باتری و ProMotion", en: "iPhone 13 Pro Max: Battery King and ProMotion" },
    excerpt: { fa: "اولین آیفون با نمایشگر ProMotion 120Hz و بهترین عمر باتری...", en: "The first iPhone with ProMotion 120Hz display..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 9,
    likes: 312,
    isTrending: false,
    publishDate: new Date("2025-01-15"),
    tags: ["آیفون", "پرو مکس", "ProMotion", "باتری", "Cinematic Mode"],
    author: "تیم تک‌کرانچ",
    views: 780
  },
  {
    id: "iphone-12-pro-max",
    brand: "Apple",
    slug: "iphone-12-pro-max",
    cover: "/assets/iphone/iphone-12-pro-max.png",
    title: { fa: "آیفون ۱۲ پرو مکس: آغاز عصر 5G و MagSafe", en: "iPhone 12 Pro Max: The Dawn of 5G and MagSafe" },
    excerpt: { fa: "اولین آیفون با پشتیبانی از 5G و MagSafe، طراحی لبه تخت...", en: "The first iPhone with 5G and MagSafe support..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 8,
    likes: 156,
    isTrending: false,
    publishDate: new Date("2025-01-10"),
    tags: ["آیفون", "پرو مکس", "5G", "MagSafe", "A14"],
    author: "تیم تک‌کرانچ",
    views: 430
  },
  {
    id: "s24-ultra-ai-revolution",
    brand: "Samsung",
    slug: "galaxy-s24-ultra-ai-revolution",
    cover: "/assets/samsung/galaxy-s24-ultra.png",
    title: { fa: "گلکسی S24 اولترا: انقلاب هوش مصنوعی در جیب تو", en: "Galaxy S24 Ultra: The AI Revolution in Your Pocket" },
    excerpt: { fa: "از ترجمه زنده تماس تا ویرایش جادویی عکس؛ ۱۰ قابلیت Galaxy AI...", en: "From live call translation to magic photo editing..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 7,
    likes: 567,
    isTrending: true,
    publishDate: new Date("2025-02-14"),
    tags: ["سامسونگ", "هوش مصنوعی", "Galaxy AI", "S24 Ultra", "S Pen"],
    author: "تیم تک‌کرانچ",
    views: 3400
  },
  {
    id: "s24-plus-vs-iphone-15-pro-max",
    brand: "Samsung",
    slug: "s24-plus-vs-iphone-15-pro-max-comparison",
    cover: "/assets/samsung/galaxy-s24-plus.png",
    title: { fa: "نبرد ارزش خرید: S24 پلاس یا آیفون ۱۵ پرو مکس؟", en: "Value Battle: S24 Plus or iPhone 15 Pro Max?" },
    excerpt: { fa: "مقایسه کامل نمایشگر، باتری، دوربین و قیمت...", en: "Complete comparison of display, battery, camera, and price..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 6,
    likes: 432,
    isTrending: true,
    publishDate: new Date("2025-02-12"),
    tags: ["مقایسه", "ارزش خرید", "سامسونگ", "اپل"],
    author: "تیم تک‌کرانچ",
    views: 1900
  },
  {
    id: "galaxy-ai-tips-for-creators",
    brand: "Samsung",
    slug: "5-galaxy-ai-tips-content-creators",
    cover: "/assets/samsung/galaxy-s24.png",
    title: { fa: "۵ ترفند Galaxy AI که محتوای اینستاگرام تو را حرفه‌ای می‌کند", en: "5 Galaxy AI Tips That Make Your Instagram Content Professional" },
    excerpt: { fa: "از حذف مزاحم‌های پس‌زمینه تا ساخت استیکر اختصاصی...", en: "From removing photobombers to creating custom stickers..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 4,
    likes: 389,
    isTrending: true,
    publishDate: new Date("2025-02-10"),
    tags: ["آموزش", "هوش مصنوعی", "اینستاگرام", "ترفند", "کریتور"],
    author: "تیم تک‌کرانچ",
    views: 2100
  },
  {
    id: "z-flip6-genz-style",
    brand: "Samsung",
    slug: "z-flip-6-style-durability-review",
    cover: "/assets/samsung/galaxy-z-flip6.png",
    title: { fa: "Z Flip 6: چرا نسل جدید عاشق این گوشی تاشو شده؟", en: "Z Flip 6: Why the New Generation Loves This Foldable?" },
    excerpt: { fa: "بررسی استایل، دوام ۴۰۰ هزار بار تا شدن، دوربین سلفی خلاقانه...", en: "Style review, 400k fold durability, creative selfie camera..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 11,
    likes: 234,
    isTrending: false,
    publishDate: new Date("2025-02-05"),
    tags: ["تاشو", "سبک زندگی", "سامسونگ", "Z Flip 6", "فولد"],
    author: "تیم تک‌کرانچ",
    views: 1200
  },
  {
    id: "tab-s10-ultra-vs-ipad-pro",
    brand: "Samsung",
    slug: "tab-s10-ultra-vs-ipad-pro-m4",
    cover: "/assets/samsung/galaxy-tab-s10-ultra.png",
    title: { fa: "تبلت برای ادیت ویدیو: تب S10 اولترا یا آیپد پرو M4؟", en: "Tablet for Video Editing: Tab S10 Ultra or iPad Pro M4?" },
    excerpt: { fa: "مقایسه قلم، نرم‌افزار، نمایشگر و قیمت برای تولیدکنندگان محتوای حرفه‌ای.", en: "Comparison of stylus, software, display, and price..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 14,
    likes: 287,
    isTrending: false,
    publishDate: new Date("2025-02-01"),
    tags: ["تبلت", "ادیت ویدیو", "سامسونگ", "اپل", "مقایسه"],
    author: "تیم تک‌کرانچ",
    views: 980
  },
  {
    id: "iphone-vs-samsung-best-camera-2025",
    brand: "Comparison",
    slug: "iphone-vs-samsung-camera-battle-2025",
    cover: "/assets/iphone/iphone-15-pro-max.png",
    title: { fa: "جنگ دوربین ۲۰۲۵: اپل در برابر سامسونگ", en: "Camera Battle 2025: Apple vs Samsung" },
    excerpt: { fa: "تست ویدیو در نور کم، لرزشگیر، رنگ‌ها و زوم...", en: "Low-light video test, stabilization, colors, and zoom..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 15,
    likes: 678,
    isTrending: true,
    publishDate: new Date("2025-02-13"),
    tags: ["دوربین", "تولید محتوا", "مقایسه", "اپل", "سامسونگ"],
    author: "تیم تک‌کرانچ",
    views: 4500
  },
  {
    id: "iphone-evolution-14-17-comparison",
    brand: "Comparison",
    slug: "iphone-14-to-17-evolution-comparison",
    cover: "/assets/iphone/iphone-17-pro-max.png",
    title: { fa: "🔁 مقایسه تحلیلی iPhone 14 تا iPhone 17", en: "🔁 Analytical Comparison of iPhone 14 to iPhone 17" },
    excerpt: { fa: "از Dynamic Island و تیتانیوم تا Apple Intelligence و Camera Control...", en: "From Dynamic Island and Titanium to Apple Intelligence..." },
    content: { fa: "متن کامل مقاله به فارسی...", en: "Full article content in English..." },
    readTime: 12,
    likes: 0,
    isTrending: true,
    publishDate: new Date("2025-06-01"),
    tags: ["مقایسه", "تحلیلی", "iPhone 14", "iPhone 15", "iPhone 16", "iPhone 17"],
    author: "تیم تک‌کرانچ",
    views: 320
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // پاک کردن مقالات قبلی
    await Article.deleteMany({});
    console.log('🗑️ Existing articles deleted');
    
    // وارد کردن مقالات جدید
    const result = await Article.insertMany(articlesData);
    console.log(`✅ ${result.length} articles inserted successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();