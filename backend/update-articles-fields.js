const mongoose = require('mongoose');
require('dotenv').config();

const articleSchema = new mongoose.Schema({}, { strict: false, collection: 'articles' });
const Article = mongoose.model('Article', articleSchema);

// داده‌های نمونه برای هر مقاله
const ARTICLE_DATA = {
  "iphone-17-pro-max": {
    gallery: [
      { src: "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg", alt: "iPhone 17 Pro Max Front", caption: "نمایشگر 6.9 اینچی" },
      { src: "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png", alt: "iPhone 17 Pro Max Back", caption: "دوربین سه‌گانه 48 مگاپیکسلی" }
    ],
    sections: [
      { id: "design", title: { fa: "طراحی و ساخت", en: "Design & Build" } },
      { id: "display", title: { fa: "نمایشگر", en: "Display" } },
      { id: "performance", title: { fa: "عملکرد و سخت‌افزار", en: "Performance & Hardware" } },
      { id: "camera", title: { fa: "دوربین", en: "Camera" } },
      { id: "battery", title: { fa: "باتری و شارژ", en: "Battery & Charging" } },
      { id: "verdict", title: { fa: "نتیجه‌گیری", en: "Verdict" } }
    ]
  },
  "iphone-16-pro-max": {
    gallery: [
      { src: "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png", alt: "iPhone 16 Pro Max", caption: "طراحی تیتانیومی" }
    ],
    sections: [
      { id: "design", title: { fa: "طراحی و ساخت", en: "Design & Build" } },
      { id: "display", title: { fa: "نمایشگر", en: "Display" } },
      { id: "performance", title: { fa: "عملکرد", en: "Performance" } },
      { id: "camera", title: { fa: "دوربین", en: "Camera" } },
      { id: "battery", title: { fa: "باتری", en: "Battery" } }
    ]
  },
  "galaxy-s24-ultra-ai-revolution": {
    gallery: [
      { src: "/assets/hero-articlepage/galaxy-s24.png", alt: "Galaxy S24 Ultra", caption: "دوربین 200 مگاپیکسلی" },
      { src: "/assets/hero-articlepage/galaxy-s24-plus.png", alt: "Galaxy S24 Plus", caption: "نمایشگر Dynamic AMOLED" }
    ],
    sections: [
      { id: "design", title: { fa: "طراحی و ساخت", en: "Design & Build" } },
      { id: "display", title: { fa: "نمایشگر", en: "Display" } },
      { id: "performance", title: { fa: "عملکرد و Galaxy AI", en: "Performance & Galaxy AI" } },
      { id: "camera", title: { fa: "دوربین", en: "Camera" } },
      { id: "battery", title: { fa: "باتری", en: "Battery" } }
    ]
  }
};

async function updateArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const articles = await Article.find({});
    console.log(`📚 Found ${articles.length} articles`);

    for (const article of articles) {
      const data = ARTICLE_DATA[article.slug];
      if (data) {
        await Article.updateOne(
          { slug: article.slug },
          { 
            $set: { 
              gallery: data.gallery || [],
              sections: data.sections || [],
              relatedVideos: data.relatedVideos || []
            }
          }
        );
        console.log(`✅ Updated: ${article.slug} (gallery, sections, relatedVideos)`);
      } else {
        // برای مقالاتی که داده خاص ندارند، مقادیر پیش‌فرض
        await Article.updateOne(
          { slug: article.slug },
          { 
            $set: { 
              gallery: [],
              sections: [
                { id: "intro", title: { fa: "مقدمه", en: "Introduction" } },
                { id: "design", title: { fa: "طراحی", en: "Design" } },
                { id: "verdict", title: { fa: "نتیجه‌گیری", en: "Verdict" } }
              ],
              relatedVideos: []
            }
          }
        );
        console.log(`✅ Updated (default): ${article.slug}`);
      }
    }

    console.log('🎉 All articles updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateArticles();
