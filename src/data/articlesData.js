// src/data/articlesData.js
// src/data/articlesData.js

// ========== Assets آیفون (مسیرهای فعلی تو) - IMPORT‌ها حذف شده ==========
// عکس‌ها مستقیماً با مسیر string استفاده می‌شن

// ========== Assets سامسونگ - IMPORT‌ها حذف شده ==========

// ========== مقالات ==========
export const articlesData = [
  // ========== مقالات آیفون ==========
 {
    id: "iphone-17-pro-max",
    brand: "Apple",
    slug: "iphone-17-pro-max",
    cover: "/assets/iphone/iphone-17-pro-max.png",
    title: {
      fa: "آیفون ۱۷ پرو مکس: انقلابی در قدرت و تجربه کاربری",
      en: "iPhone 17 Pro Max: A Revolution in Power and User Experience",
    },
    excerpt: {
      fa: "نگاهی عمیق به آیفون ۱۷ پرو مکس با پردازنده نسل آینده A18 و سیستم دوربین حرفه‌ای ۴۸ مگاپیکسلی. قدرتمندترین آیفون تاریخ!",
      en: "An in-depth look at the iPhone 17 Pro Max with next-gen A18 processor and pro 48MP camera system. The most powerful iPhone ever!",
    },
    content: {
      fa: `## آیفون ۱۷ پرو مکس: اوج مهندسی اپل

در دنیایی که رقابت میان غول‌های فناوری هر روز نفس‌گیرتر می‌شود، اپل با معرفی **آیفون ۱۷ پرو مکس** بار دیگر ثابت کرد که هنوز هم می‌توان از یک گوشی هوشمند شگفت‌زده شد...`,
      en: `## iPhone 17 Pro Max: The Peak of Apple Engineering...`,
    },
    readTime: 15,
    likes: 342,
    isTrending: true,
    publishDate: "2025-02-10",
    tags: ["آیفون", "پرو مکس", "A18", "دوربین", "Apple Intelligence", "۲ نانومتر", "۳۰۰۰ نیت"],
  },
  {
    id: "iphone-16-pro-max",
    brand: "Apple",
    slug: "iphone-16-pro-max",
    cover: "/assets/iphone/iphone-16-pro-max.png",
    title: {
      fa: "آیفون ۱۶ پرو مکس: تعادل قدرت و طراحی",
      en: "iPhone 16 Pro Max: Balance of Power and Design",
    },
    excerpt: {
      fa: "ترکیبی از عملکرد قدرتمند تراشه A17 Pro، طراحی مدرن تیتانیومی و دوربین پیشرفته ۴۸ مگاپیکسلی.",
      en: "A blend of powerful A17 Pro performance, modern titanium design, and advanced 48MP camera.",
    },
    content: {
      fa: `## آیفون ۱۶ پرو مکس: بلوغ طراحی اپل...`,
      en: `## iPhone 16 Pro Max: The Maturity of Apple Design...`,
    },
    readTime: 9,
    likes: 278,
    isTrending: true,
    publishDate: "2025-02-05",
    tags: ["آیفون", "پرو مکس", "A17 Pro", "Camera Control", "تیتانیوم"],
  },
  {
    id: "iphone-15-pro-max",
    brand: "Apple",
    slug: "iphone-15-pro-max",
    cover: "/assets/iphone/iphone-15-pro-max.png",
    title: {
      fa: "آیفون ۱۵ پرو مکس: آغاز عصر تیتانیوم",
      en: "iPhone 15 Pro Max: The Beginning of the Titanium Era",
    },
    excerpt: {
      fa: "سبک‌تر، مقاوم‌تر و مجهز به USB-C. بررسی کامل تغییرات انقلابی این نسل و مقایسه با نسل قبل.",
      en: "Lighter, stronger, and equipped with USB-C. A complete review of this generation's revolutionary changes.",
    },
    content: {
      fa: `## آیفون ۱۵ پرو مکس: نقطه عطف تاریخی اپل...`,
      en: `## iPhone 15 Pro Max: Apple's Historical Turning Point...`,
    },
    readTime: 9,
    likes: 421,
    isTrending: true,
    publishDate: "2025-01-28",
    tags: ["آیفون", "پرو مکس", "تیتانیوم", "USB-C", "Action Button", "A16"],
  },
  {
    id: "iphone-14-pro-max",
    brand: "Apple",
    slug: "iphone-14-pro-max",
    cover: "/assets/iphone/iphone-14-pro-max.png",
    title: {
      fa: "آیفون ۱۴ پرو مکس: Dynamic Island و دوربین ۴۸ مگاپیکسلی",
      en: "iPhone 14 Pro Max: Dynamic Island and 48MP Camera",
    },
    excerpt: {
      fa: "معرفی Dynamic Island، دوربین ۴۸ مگاپیکسلی و Always-On Display — سه نوآوری که صنعت را تغییر داد.",
      en: "Dynamic Island, 48MP camera, and Always-On Display — three innovations that changed the industry.",
    },
    content: {
      fa: `## آیفون ۱۴ پرو مکس: سه نوآوری که صنعت را تکان داد...`,
      en: `## iPhone 14 Pro Max: Three Innovations That Shook the Industry...`,
    },
    readTime: 8,
    likes: 198,
    isTrending: false,
    publishDate: "2025-01-20",
    tags: ["آیفون", "پرو مکس", "Dynamic Island", "Always-On", "A16", "دوربین ۴۸ مگاپیکسل"],
  },
  {
    id: "iphone-13-pro-max",
    brand: "Apple",
    slug: "iphone-13-pro-max",
    cover: "/assets/iphone/iphone-13-pro-max.png",
    title: {
      fa: "آیفون ۱۳ پرو مکس: پادشاه باتری و ProMotion",
      en: "iPhone 13 Pro Max: Battery King and ProMotion",
    },
    excerpt: {
      fa: "اولین آیفون با نمایشگر ProMotion 120Hz و بهترین عمر باتری در تاریخ آیفون تا آن زمان.",
      en: "The first iPhone with ProMotion 120Hz display and the best battery life in iPhone history at the time.",
    },
    content: {
      fa: `## آیفون ۱۳ پرو مکس: وقتی باتری و نمایشگر با هم پیشرفت کردند...`,
      en: `## iPhone 13 Pro Max: When Battery and Display Evolved Together...`,
    },
    readTime: 9,
    likes: 312,
    isTrending: false,
    publishDate: "2025-01-15",
    tags: ["آیفون", "پرو مکس", "ProMotion", "باتری", "Cinematic Mode", "A15"],
  },
  {
    id: "iphone-12-pro-max",
    brand: "Apple",
    slug: "iphone-12-pro-max",
    cover: "/assets/iphone/iphone-12-pro-max.png",
    title: {
      fa: "آیفون ۱۲ پرو مکس: آغاز عصر 5G و MagSafe",
      en: "iPhone 12 Pro Max: The Dawn of 5G and MagSafe",
    },
    excerpt: {
      fa: "اولین آیفون با پشتیبانی از 5G و MagSafe، طراحی لبه تخت و تراشه A14 Bionic با فرآیند ۵ نانومتری.",
      en: "The first iPhone with 5G and MagSafe support, flat-edge design, and A14 Bionic on 5nm process.",
    },
    content: {
      fa: `## آیفون ۱۲ پرو مکس: آغاز یک دوران جدید...`,
      en: `## iPhone 12 Pro Max: The Dawn of a New Era...`,
    },
    readTime: 8,
    likes: 156,
    isTrending: false,
    publishDate: "2025-01-10",
    tags: ["آیفون", "پرو مکس", "5G", "MagSafe", "A14", "طراحی لبه تخت"],
  },
  

  // ========== مقالات سامسونگ ==========
  {
    id: "s24-ultra-ai-revolution",
    brand: "Samsung",
    slug: "galaxy-s24-ultra-ai-revolution",
    cover: "/assets/samsung/galaxy-s24-ultra.png",
    title: {
      fa: "گلکسی S24 اولترا: انقلاب هوش مصنوعی در جیب تو",
      en: "Galaxy S24 Ultra: The AI Revolution in Your Pocket",
    },
    excerpt: {
      fa: "از ترجمه زنده تماس تا ویرایش جادویی عکس؛ ۱۰ قابلیت Galaxy AI که دنیای گوشی هوشمند را تغییر می‌دهند.",
      en: "From live call translation to magic photo editing: 10 Galaxy AI features changing the smartphone world.",
    },
    content: {
      fa: `## Galaxy AI: نسل جدید هوشمندی...`,
      en: `## Galaxy AI: New Generation of Intelligence...`,
    },
    readTime: 7,
    likes: 567,
    isTrending: true,
    publishDate: "2025-02-14",
    tags: ["سامسونگ", "هوش مصنوعی", "Galaxy AI", "S24 Ultra", "S Pen"],
  },
  {
    id: "s24-plus-vs-iphone-15-pro-max",
    brand: "Samsung",
    slug: "s24-plus-vs-iphone-15-pro-max-comparison",
    cover: "/assets/samsung/galaxy-s24-plus.png",
    title: {
      fa: "نبرد ارزش خرید: S24 پلاس یا آیفون ۱۵ پرو مکس؟",
      en: "Value Battle: S24 Plus or iPhone 15 Pro Max?",
    },
    excerpt: {
      fa: "مقایسه کامل نمایشگر، باتری، دوربین و قیمت. کدام برای نسل جدید به‌صرفه‌تر است؟",
      en: "Complete comparison of display, battery, camera, and price. Which is more cost-effective for the new generation?",
    },
    content: {
      fa: `## مقایسه مشخصات فنی...`,
      en: `## Specifications Comparison...`,
    },
    readTime: 6,
    likes: 432,
    isTrending: true,
    publishDate: "2025-02-12",
    tags: ["مقایسه", "ارزش خرید", "سامسونگ", "اپل"],
  },
  {
    id: "galaxy-ai-tips-for-creators",
    brand: "Samsung",
    slug: "5-galaxy-ai-tips-content-creators",
    cover: "/assets/samsung/galaxy-s24.png",
    title: {
      fa: "۵ ترفند Galaxy AI که محتوای اینستاگرام تو را حرفه‌ای می‌کند",
      en: "5 Galaxy AI Tips That Make Your Instagram Content Professional",
    },
    excerpt: {
      fa: "از حذف مزاحم‌های پس‌زمینه تا ساخت استیکر اختصاصی؛ ترفندهایی که هیچ آیفونی ندارد!",
      en: "From removing photobombers to creating custom stickers; tricks no iPhone has!",
    },
    content: {
      fa: `## ۵ ترفند هوش مصنوعی سامسونگ برای کریتورها...`,
      en: `## 5 Samsung AI Tips for Creators...`,
    },
    readTime: 4,
    likes: 389,
    isTrending: true,
    publishDate: "2025-02-10",
    tags: ["آموزش", "هوش مصنوعی", "اینستاگرام", "ترفند", "کریتور"],
  },
  {
    id: "z-flip6-genz-style",
    brand: "Samsung",
    slug: "z-flip-6-style-durability-review",
    cover: "/assets/samsung/galaxy-z-flip6.png",
    title: {
      fa: "Z Flip 6: چرا نسل جدید عاشق این گوشی تاشو شده؟",
      en: "Z Flip 6: Why the New Generation Loves This Foldable?",
    },
    excerpt: {
      fa: "بررسی استایل، دوام ۴۰۰ هزار بار تا شدن، دوربین سلفی خلاقانه و مقایسه با Z Fold 6.",
      en: "Style review, 400k fold durability, creative selfie camera, and comparison with Z Fold 6.",
    },
    content: {
      fa: `## Z Flip 6: بازگشت به آینده با سبکی تازه...`,
      en: `## Z Flip 6: Back to the Future with Fresh Style...`,
    },
    readTime: 11,
    likes: 234,
    isTrending: false,
    publishDate: "2025-02-05",
    tags: ["تاشو", "سبک زندگی", "سامسونگ", "Z Flip 6", "فولد", "نسل Z", "استایل"],
  },
  {
    id: "tab-s10-ultra-vs-ipad-pro",
    brand: "Samsung",
    slug: "tab-s10-ultra-vs-ipad-pro-m4",
    cover: "/assets/samsung/galaxy-tab-s10-ultra.png",
    title: {
      fa: "تبلت برای ادیت ویدیو: تب S10 اولترا یا آیپد پرو M4؟",
      en: "Tablet for Video Editing: Tab S10 Ultra or iPad Pro M4?",
    },
    excerpt: {
      fa: "مقایسه قلم، نرم‌افزار، نمایشگر و قیمت برای تولیدکنندگان محتوای حرفه‌ای.",
      en: "Comparison of stylus, software, display, and price for professional content creators.",
    },
    content: {
      fa: `## مقدمه: کدام تبلت جای لپ‌تاپ شما را می‌گیرد؟...`,
      en: `## Introduction: Which Tablet Replaces Your Laptop?...`,
    },
    readTime: 14,
    likes: 287,
    isTrending: false,
    publishDate: "2025-02-01",
    tags: ["تبلت", "ادیت ویدیو", "سامسونگ", "اپل", "مقایسه", "Tab S10 Ultra", "iPad Pro M4", "قلم"],
  },

  // ========== مقالات ویژه مقایسه‌ای ==========
  {
    id: "iphone-vs-samsung-best-camera-2025",
    brand: "Comparison",
    slug: "iphone-vs-samsung-camera-battle-2025",
    cover: "/assets/iphone/iphone-15-pro-max.png",
    title: {
      fa: "جنگ دوربین ۲۰۲۵: اپل در برابر سامسونگ - کدام برای تولید محتوا بهتر است؟",
      en: "Camera Battle 2025: Apple vs Samsung - Which is Better for Content Creation?",
    },
    excerpt: {
      fa: "تست ویدیو در نور کم، لرزشگیر، رنگ‌ها و زوم. هر آنچه باید قبل از خرید بدانی!",
      en: "Low-light video test, stabilization, colors, and zoom. Everything you need to know before buying!",
    },
    content: {
      fa: `## مقدمه: نبرد غول‌ها در عصر هوش مصنوعی...`,
      en: `## Introduction: Battle of the Giants in the AI Era...`,
    },
    readTime: 15,
    likes: 678,
    isTrending: true,
    publishDate: "2025-02-13",
    tags: ["دوربین", "تولید محتوا", "مقایسه", "اپل", "سامسونگ", "آیفون ۱۷ پرو مکس", "S25 Ultra", "جنگ دوربین"],
  },

  // ========== مقاله مقایسه تحلیلی آیفون ۱۴ تا ۱۷ ==========
  {
    id: "iphone-evolution-14-17-comparison",
    brand: "Comparison",
    slug: "iphone-14-to-17-evolution-comparison",
    cover: "/assets/iphone/iphone-17-pro-max.png",
    title: {
      fa: "🔁 مقایسه تحلیلی iPhone 14 تا iPhone 17: سیر تکامل پرچم‌دار اپل (۲۰۲۲–۲۰۲۵)",
      en: "🔁 Analytical Comparison of iPhone 14 to iPhone 17: Evolution of Apple's Flagship (2022–2025)"
    },
    excerpt: {
      fa: "از Dynamic Island و تیتانیوم تا Apple Intelligence و Camera Control — هر آنچه باید درباره جهش‌های نسل Pro Max بدانید.",
      en: "From Dynamic Island and Titanium to Apple Intelligence and Camera Control — everything you need to know about the Pro Max generation leaps."
    },
    content: {
      fa: `## 🚀 مقدمه: چهار سال جهش بی‌وقفه...`,
      en: `## 🚀 Introduction: Four Years of Unstoppable Leaps...`
    },
    readTime: 12,
    likes: 0,
    isTrending: true,
    publishDate: "2025-06-01",
    tags: ["مقایسه", "تحلیلی", "iPhone 14", "iPhone 15", "iPhone 16", "iPhone 17", "تکامل", "Apple Intelligence", "پیش‌بینی", "آیفون ۱۸"],
    media: [
      { type: "image", src: "/assets/iphone/iphone18-promax-hero.png", alt: "iPhone 18 Pro Max Hero" },
      { type: "image", src: "/assets/iphone/iphone-17-pro-max.png", alt: "iPhone 17 Pro Max" },
      { type: "image", src: "/assets/iphone/iphone-16-pro-max.png", alt: "iPhone 16 Pro Max" },
      { type: "image", src: "/assets/iphone/iphone-15-pro-max.png", alt: "iPhone 15 Pro Max" },
      { type: "image", src: "/assets/iphone/iphone-14-pro-max.png", alt: "iPhone 14 Pro Max" },
      { type: "image", src: "/assets/iphone/iphone-18-promax.png", alt: "iPhone 18 Pro Max Concept" }
    ]
  }
];

// ========== توابع کمکی ==========

// گرفتن همه مقالات


// گرفتن مقاله بر اساس اسلاگ (برای صفحه جزئیات)
export const getArticleBySlug = (slug) => {
  return articlesData.find(article => article.slug === slug);
};

// گرفتن مقالات ترند
export const getTrendingArticles = () => {
  return articlesData.filter(article => article.isTrending).sort((a, b) => b.likes - a.likes);
};

// گرفتن مقالات یک برند خاص
export const getArticlesByBrand = (brand) => {
  if (brand === "all") return articlesData;
  return articlesData.filter(article => article.brand === brand);
};

// گرفتن مقالات مرتبط با یک مدل خاص
export const getRelatedArticles = (currentSlug, brand, limit = 3) => {
  return articlesData
    .filter(article => article.slug !== currentSlug && article.brand === brand)
    .slice(0, limit);
};

// ========== اگر asset سامسونگ نداری، از این استفاده کن (Fallback) ==========
// import s24Ultra from "../assets/iphone/iphone-15-pro-max.png";
// import s24Plus from "../assets/iphone/iphone-16-pro-max.png";

// ========== مقالات ==========
