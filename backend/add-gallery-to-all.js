const mongoose = require('mongoose');
require('dotenv').config();

const GALLERY_DATA = {
  "iphone-17-pro-max": [
    { src: "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg", alt: "iPhone 17 Pro Max", caption: "نمایشگر ۶.۹ اینچی" },
    { src: "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png", alt: "iPhone 17 Pro Max Back", caption: "دوربین سه‌گانه" }
  ],
  "iphone-16-pro-max": [
    { src: "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png", alt: "iPhone 16 Pro Max", caption: "طراحی تیتانیومی" }
  ],
  "iphone-15-pro-max": [
    { src: "/assets/hero-articlepage/iphone-15-pro.png", alt: "iPhone 15 Pro Max", caption: "فریم تیتانیوم" },
    { src: "/assets/hero-articlepage/iphone-15.png", alt: "iPhone 15", caption: "Dynamic Island" }
  ],
  "iphone-14-pro-max": [
    { src: "/assets/hero-articlepage/iphone-14-pro-max.png", alt: "iPhone 14 Pro Max", caption: "Dynamic Island" }
  ],
  "galaxy-s24-ultra-ai-revolution": [
    { src: "/assets/hero-articlepage/galaxy-s24.png", alt: "Galaxy S24 Ultra", caption: "دوربین ۲۰۰ مگاپیکسلی" },
    { src: "/assets/hero-articlepage/galaxy-s24-plus.png", alt: "Galaxy S24 Plus", caption: "Galaxy AI" }
  ]
};

async function addGalleries() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Article = mongoose.model('Article', new mongoose.Schema({}, { strict: false, collection: 'articles' }));
  
  for (const [slug, gallery] of Object.entries(GALLERY_DATA)) {
    await Article.updateOne({ slug }, { $set: { gallery } });
    console.log(`✅ Gallery added to: ${slug}`);
  }
  
  console.log("🎉 Done!");
  process.exit();
}

addGalleries();
