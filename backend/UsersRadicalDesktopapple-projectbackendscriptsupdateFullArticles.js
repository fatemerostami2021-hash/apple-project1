require('dotenv').config();
const mongoose = require('mongoose');

// اتصال به دیتابیس
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

// مدل Article
const articleSchema = new mongoose.Schema({
  slug: String,
  brand: String,
  title: { fa: String, en: String },
  excerpt: { fa: String, en: String },
  content: { fa: String, en: String },
  cover: String,
  readTime: Number,
  likes: Number,
  tags: [String],
  author: String,
  publishDate: Date,
  isTrending: Boolean,
  views: Number
});

const Article = mongoose.model('Article', articleSchema);

// محتوای جدید برای یک مقاله
const newContent = {
  fa: `# آیفون ۱۷ پرو مکس: بررسی تخصصی

## معرفی
آیفون ۱۷ پرو مکس جدیدترین پرچمدار اپل است که با تراشه A18 Pro معرفی شده.

## طراحی و ساخت
فریم تیتانیومی و وزن ۲۲۱ گرمی این گوشی را بسیار خوشدست کرده است.

## نمایشگر
صفحه نمایش ۶.۹ اینچی Super Retina XDR با نرخ نوسازی ۱۲۰ هرتز ProMotion.

## دوربین
دوربین اصلی ۴۸ مگاپیکسل با دیافراگم f/1.68 و لرزشگیر اپتیکال نسل سوم.

## پردازنده
تراشه A18 Pro با معماری ۳ نانومتری، ۲۰٪ سریع‌تر از نسل قبل.

## باتری
باتری ۴۷۶۰ میلی‌آمپر ساعتی با شارژ سریع ۳۵ وات.

## جمع‌بندی
آیفون ۱۷ پرو مکس بهترین گوشی سال ۲۰۲۵ است.
امتیاز: ۹.۲ از ۱۰`,

  en: `# iPhone 17 Pro Max: Expert Review

## Introduction
The iPhone 17 Pro Max is Apple's latest flagship with the A18 Pro chip.

## Design
Titanium frame weighing 221 grams.

## Display
6.9-inch Super Retina XDR with 120Hz ProMotion.

## Camera
48MP main camera with f/1.68 aperture and 3rd-gen optical stabilization.

## Processor
A18 Pro chip on 3nm architecture, 20% faster than previous generation.

## Battery
4760 mAh battery with 35W fast charging.

## Verdict
The iPhone 17 Pro Max is the best phone of 2025.
Score: 9.2/10`
};

async function updateArticle() {
  try {
    // پیدا کردن مقاله آیفون ۱۷ پرو مکس
    const article = await Article.findOne({ slug: "iphone-17-pro-max" });
    
    if (article) {
      article.content = newContent;
      await article.save();
      console.log('✅ مقاله با موفقیت به‌روزرسانی شد!');
      console.log('📝 عنوان:', article.title.fa);
    } else {
      console.log('❌ مقاله پیدا نشد!');
      console.log('لیست مقالات موجود:');
      const allArticles = await Article.find({}, 'slug title.fa');
      allArticles.forEach(a => console.log(`   - ${a.slug}: ${a.title.fa}`));
    }
    
  } catch (error) {
    console.error('❌ خطا:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 disconnected');
  }
}

// اجرا
updateArticle();