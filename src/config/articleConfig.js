// src/config/articleConfig.js
// ─────────────────────────────────────────────
// تمام داده‌های استاتیک ArticlePage در یک فایل
// ─────────────────────────────────────────────

export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ══════════════════════════════════════════════
   تصاویر هیرو — تمام slugها از articlesData
══════════════════════════════════════════════ */
export const HERO_MAP = {
  // Apple
  "iphone-18-pro-max": [
    "/assets/hero-articlepage/iphone-18-promax.png",
    "/assets/hero-articlepage/iphone18-promax-hero.png",
  ],
  "iphone-17-pro-max": [
    "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
    "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png",
  ],
  "iphone-16-pro-max": [
    "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png",
    "/assets/hero-articlepage/hero-endframe.png",
  ],
  "iphone-15-pro-max": [
    "/assets/hero-articlepage/iphone-15-pro.png",
    "/assets/hero-articlepage/iphone-15.png",
  ],
  "iphone-14-pro-max": [
    "/assets/hero-articlepage/iphone-14-pro-max.png",
    "/assets/hero-articlepage/hero-endframe.png",
  ],
  "iphone-13-pro-max": [
    "/assets/hero-articlepage/iphone-12-pro.png",
    "/assets/hero-articlepage/hero-endframe.png",
  ],
  "iphone-12-pro-max": [
    "/assets/hero-articlepage/iphone-12-pro.png",
    "/assets/hero-articlepage/iphone-12.png",
  ],
  // Samsung
  "galaxy-s24-ultra-ai-revolution": [
    "/assets/hero-articlepage/galaxy-s24.png",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
  "galaxy-s25-ultra": [
    "/assets/hero-articlepage/galaxy-s24.png",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
  "galaxy-z-fold-6": [
    "/assets/hero-articlepage/download.jpg",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
  "galaxy-z-flip-6": [
    "/assets/hero-articlepage/download.jpg",
    "/assets/hero-articlepage/GNB_Mobile_L1_08_88x88.webp",
  ],
  // Comparison (slugهای واقعی از articlesData)
  "iphone-14-to-17-evolution-comparison": [
    "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
    "/assets/hero-articlepage/iphone-14-pro-max.png",
  ],
  "iphone-vs-samsung-camera-battle-2025": [
    "/assets/hero-articlepage/iphone-15-pro.png",
    "/assets/hero-articlepage/galaxy-s24.png",
  ],
  "s24-plus-vs-iphone-15-pro-max-comparison": [
    "/assets/hero-articlepage/galaxy-s24-plus.png",
    "/assets/hero-articlepage/iphone-15-pro.png",
  ],
  "5-galaxy-ai-tips-content-creators": [
    "/assets/hero-articlepage/galaxy-s24.png",
    "/assets/hero-articlepage/GNB_Mobile_L1_08_88x88.webp",
  ],
  "z-flip-6-style-durability-review": [
    "/assets/hero-articlepage/download.jpg",
    "/assets/hero-articlepage/GNB_Mobile_L1_08_88x88.webp",
  ],
  "tab-s10-ultra-vs-ipad-pro-m4": [
    "/assets/hero-articlepage/galaxy-s24-plus.png",
    "/assets/hero-articlepage/hero-endframe.png",
  ],
};

const FALLBACK_HERO = "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg";

/* ══════════════════════════════════════════════
   گالری تصاویر — از assets واقعی پروژه
══════════════════════════════════════════════ */
export const GALLERY_MAP = {
  "iphone-18-pro-max": [
    { src: "/assets/hero-articlepage/iphone-18-promax.png",      caption: "آیفون ۱۸ پرو مکس — نمای جلو" },
    { src: "/assets/hero-articlepage/iphone18-promax-hero.png",  caption: "Hero Shot" },
    { src: "/assets/hero-articlepage/hero-endframe.png",         caption: "طراحی پریمیوم" },
  ],
  "iphone-17-pro-max": [
    { src: "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg", caption: "نمای اصلی" },
    { src: "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png", caption: "نمای پشت" },
    { src: "/assets/hero-articlepage/iphone-15-pro.png",         caption: "مقایسه نسل‌ها" },
    { src: "/assets/hero-articlepage/iphone-14-pro-max.png",     caption: "سیر تکامل" },
    { src: "/assets/hero-articlepage/hero-endframe.png",         caption: "جزئیات دوربین" },
  ],
  "iphone-16-pro-max": [
    { src: "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png", caption: "نمای رسمی" },
    { src: "/assets/hero-articlepage/hero-endframe.png",         caption: "Camera Control" },
    { src: "/assets/hero-articlepage/iphone-12-pro.png",         caption: "بدنه تیتانیومی" },
    { src: "/assets/hero-articlepage/iphone-15-pro.png",         caption: "مقایسه" },
  ],
  "iphone-15-pro-max": [
    { src: "/assets/hero-articlepage/iphone-15-pro.png",         caption: "بدنه تیتانیومی" },
    { src: "/assets/hero-articlepage/iphone-15.png",             caption: "مقایسه با آیفون ۱۵" },
    { src: "/assets/hero-articlepage/hero-endframe.png",         caption: "USB-C" },
  ],
  "iphone-14-pro-max": [
    { src: "/assets/hero-articlepage/iphone-14-pro-max.png",     caption: "Dynamic Island" },
    { src: "/assets/hero-articlepage/hero-endframe.png",         caption: "Always-On Display" },
  ],
  "iphone-13-pro-max": [
    { src: "/assets/hero-articlepage/iphone-12-pro.png",         caption: "ProMotion 120Hz" },
    { src: "/assets/hero-articlepage/hero-endframe.png",         caption: "Cinematic Mode" },
  ],
  "iphone-12-pro-max": [
    { src: "/assets/hero-articlepage/iphone-12-pro.png",         caption: "بدنه استیل" },
    { src: "/assets/hero-articlepage/iphone-12.png",             caption: "طراحی لبه تخت" },
  ],
  "galaxy-s24-ultra-ai-revolution": [
    { src: "/assets/hero-articlepage/galaxy-s24.png",            caption: "Galaxy S24 Ultra" },
    { src: "/assets/hero-articlepage/galaxy-s24-plus.png",       caption: "S Pen" },
    { src: "/assets/hero-articlepage/download.jpg",              caption: "Galaxy AI" },
  ],
  "iphone-14-to-17-evolution-comparison": [
    { src: "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg", caption: "آیفون ۱۷" },
    { src: "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png", caption: "آیفون ۱۶" },
    { src: "/assets/hero-articlepage/iphone-15-pro.png",         caption: "آیفون ۱۵" },
    { src: "/assets/hero-articlepage/iphone-14-pro-max.png",     caption: "آیفون ۱۴" },
    { src: "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png", caption: "تکامل طراحی" },
  ],
  "iphone-vs-samsung-camera-battle-2025": [
    { src: "/assets/hero-articlepage/iphone-15-pro.png",         caption: "دوربین اپل" },
    { src: "/assets/hero-articlepage/galaxy-s24.png",            caption: "دوربین سامسونگ" },
    { src: "/assets/hero-articlepage/galaxy-s24-plus.png",       caption: "زوم ۱۰۰x" },
  ],
  "s24-plus-vs-iphone-15-pro-max-comparison": [
    { src: "/assets/hero-articlepage/galaxy-s24-plus.png",       caption: "Galaxy S24 Plus" },
    { src: "/assets/hero-articlepage/iphone-15-pro.png",         caption: "آیفون ۱۵ پرو مکس" },
  ],
  "z-flip-6-style-durability-review": [
    { src: "/assets/hero-articlepage/download.jpg",              caption: "Z Flip 6" },
    { src: "/assets/hero-articlepage/GNB_Mobile_L1_08_88x88.webp", caption: "FlexWindow" },
  ],
  "5-galaxy-ai-tips-content-creators": [
    { src: "/assets/hero-articlepage/galaxy-s24.png",            caption: "Galaxy AI" },
    { src: "/assets/hero-articlepage/GNB_Mobile_L1_08_88x88.webp", caption: "Circle to Search" },
  ],
  "tab-s10-ultra-vs-ipad-pro-m4": [
    { src: "/assets/hero-articlepage/galaxy-s24-plus.png",       caption: "Tab S10 Ultra" },
    { src: "/assets/hero-articlepage/hero-endframe.png",         caption: "iPad Pro M4" },
  ],
};

/* ══════════════════════════════════════════════
   ۴ ویدیوی رسمی TechZone — یکسان برای همه مقالات
══════════════════════════════════════════════ */
export const OFFICIAL_VIDEOS = [
  {
    id: "tQdPRHdrCUI",
    title: "iPhone 17 Pro Max — Full Review",
    titleFa: "آیفون ۱۷ پرو مکس — بررسی کامل",
    duration: "18:45",
    channel: "TechZone",
  },
  {
    id: "DX0HzqxrjEQ",
    title: "iPhone 17 vs Samsung S25 Ultra — Camera Battle",
    titleFa: "آیفون ۱۷ در برابر S25 Ultra — جنگ دوربین",
    duration: "14:22",
    channel: "TechZone",
  },
  {
    id: "hDZrB9V-UTk",
    title: "iPhone 16 Pro Max — Camera Deep Dive",
    titleFa: "آیفون ۱۶ پرو مکس — تست عمیق دوربین",
    duration: "11:38",
    channel: "TechZone",
  },
  {
    id: "-rdqBWYwFTo",
    title: "iOS 19 & Apple Intelligence — Everything New",
    titleFa: "iOS 19 و Apple Intelligence — همه چیز جدید",
    duration: "16:10",
    channel: "TechZone",
  },
];

/* ══════════════════════════════════════════════
   توابع کمکی — همه export شده برای ArticlePage
══════════════════════════════════════════════ */

/**
 * تصاویر هیرو اسلایدر
 * اولویت: HERO_MAP → articlesData.media → FALLBACK
 */
export function getHeroImages(slug, articleMedia = []) {
  if (HERO_MAP[slug]?.length) return HERO_MAP[slug];
  const fromMedia = articleMedia
    .filter(m => m.type === "image")
    .map(m => m.src);
  return fromMedia.length ? fromMedia.slice(0, 4) : [FALLBACK_HERO];
}

/**
 * تصاویر گالری
 * اولویت: GALLERY_MAP → articlesData.media → []
 */
export function getGalleryImages(slug, articleMedia = []) {
  if (GALLERY_MAP[slug]?.length) return GALLERY_MAP[slug];
  return articleMedia
    .filter(m => m.type === "image")
    .map(m => ({ src: m.src, caption: m.alt || "" }));
}

/**
 * ساخت URL کامل API
 */
export function apiUrl(path) {
  return `${API_BASE}${path}`;
}