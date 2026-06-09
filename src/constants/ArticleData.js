export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const HERO_MAP = {
  "iphone-18-pro-max": [
    "/assets/hero-articlepage/iphone-18-promax.png",
    "/assets/hero-articlepage/iphone18-promax-hero.png",
  ],
  "iphone-17-pro-max": [
    "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
    "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png",
  ],
  "iphone-16-pro-max": ["/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png"],
  "iphone-15-pro-max": ["/assets/hero-articlepage/iphone-15-pro.png"],
  "iphone-14-pro-max": ["/assets/hero-articlepage/iphone-14-pro-max.png"],
  "iphone-13-pro-max": ["/assets/hero-articlepage/iphone-12-pro.png"],
  "iphone-12-pro-max": ["/assets/hero-articlepage/iphone-12.png"],
  "galaxy-s24-ultra-ai-revolution": [
    "/assets/hero-articlepage/galaxy-s24.png",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
  "galaxy-s25-ultra": ["/assets/hero-articlepage/galaxy-s24.png"],
  "galaxy-z-fold-6": ["/assets/hero-articlepage/download.jpg"],
  "galaxy-z-flip-6": ["/assets/hero-articlepage/download.jpg"],
  "iphone-14-to-17-evolution-comparison": [
    "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
  ],
  "tab-s10-ultra-vs-ipad-pro-m4": ["/assets/hero-articlepage/galaxy-s24-plus.png"],
};

export const GALLERY_IMAGES = {
  "iphone-18-pro-max": [
    "/assets/hero-articlepage/iphone-18-promax.png",
    "/assets/hero-articlepage/iphone18-promax-hero.png",
  ],
  "iphone-17-pro-max": [
    "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
    "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png",
    "/assets/hero-articlepage/iphone-15-pro.png",
    "/assets/hero-articlepage/iphone-14-pro-max.png",
  ],
  "iphone-16-pro-max": [
    "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png",
    "/assets/hero-articlepage/hero-endframe.png",
    "/assets/hero-articlepage/iphone-12-pro.png",
  ],
  "iphone-15-pro-max": [
    "/assets/hero-articlepage/iphone-15-pro.png",
    "/assets/hero-articlepage/iphone-15.png",
  ],
  "iphone-14-pro-max": ["/assets/hero-articlepage/iphone-14-pro-max.png"],
  "galaxy-s24-ultra-ai-revolution": [
    "/assets/hero-articlepage/galaxy-s24.png",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
};

export const VIDEO_MAIN = {
  "iphone-17-pro-max": { id: "tQdPRHdrCUI", title: "iPhone 17 Pro Max Full Review", duration: "14:30" },
  "iphone-16-pro-max": { id: "hDZrB9V-UTk", title: "iPhone 16 Pro Max Camera Test", duration: "11:20" },
  "galaxy-s24-ultra-ai-revolution": { id: "DX0HzqxrjEQ", title: "iPhone 17 vs Samsung S25 Ultra", duration: "15:10" },
};

const DEFAULT_RELATED = [
  { id: "DX0HzqxrjEQ", title: "iPhone 17 vs Samsung S25 Ultra", duration: "15:10" },
  { id: "hDZrB9V-UTk", title: "iPhone 16 Pro Max Camera Test", duration: "11:20" },
  { id: "-rdqBWYwFTo", title: "iOS 19 and Apple Intelligence", duration: "18:15" },
];

export const VIDEO_RELATED = {
  "iphone-17-pro-max": DEFAULT_RELATED,
  "iphone-16-pro-max": [
    { id: "tQdPRHdrCUI", title: "iPhone 17 Pro Max Full Review", duration: "14:30" },
    ...DEFAULT_RELATED.slice(0, 2),
  ],
  "galaxy-s24-ultra-ai-revolution": [
    { id: "tQdPRHdrCUI", title: "iPhone 17 Pro Max Full Review", duration: "14:30" },
    { id: "hDZrB9V-UTk", title: "iPhone 16 Pro Max Camera Test", duration: "11:20" },
    { id: "-rdqBWYwFTo", title: "iOS 19 and Apple Intelligence", duration: "18:15" },
  ],
};

const FALLBACK_HERO = "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg";

export const getHeroImages = (slug) => HERO_MAP[slug]?.length ? HERO_MAP[slug] : [FALLBACK_HERO];
export const getGalleryImages = (slug) => GALLERY_IMAGES[slug] || [];
export const getMainVideo = (slug) =>
  VIDEO_MAIN[slug] || { id: "tQdPRHdrCUI", title: "iPhone 17 Pro Max Full Review", duration: "14:30" };
export const getRelatedVideos = (slug) => VIDEO_RELATED[slug] || DEFAULT_RELATED;
