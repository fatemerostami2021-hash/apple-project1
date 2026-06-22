import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

const articleData = {
  slug: 'samsung-galaxy-s26-ultra-case-review',
  brand: 'Samsung',
  title: {
    en: 'Samsung Galaxy S26 Ultra Case Review',
    fa: 'بررسی قاب سامسونگ گلکسی S26 اولترا'
  },
  excerpt: {
    en: 'Premium protection for your Galaxy S26 Ultra with stylish design and perfect fit.',
    fa: 'محافظت ممتاز برای گلکسی S26 اولترا با طراحی شیک و تناسب کامل.'
  },
  content: {
    en: `<h1>Samsung Galaxy S26 Ultra Case Review</h1>
    <p>The Samsung Galaxy S26 Ultra Case offers premium protection with a stylish design. Made from high-quality materials, it provides excellent drop protection while maintaining a slim profile.</p>
    <h2>Key Features</h2>
    <ul>
      <li>Premium quality materials</li>
      <li>Perfect fit for Galaxy S26 Ultra</li>
      <li>Shock absorption technology</li>
      <li>Slim and lightweight design</li>
      <li>Available in multiple colors</li>
    </ul>
    <h2>Design and Build Quality</h2>
    <p>The case features a sleek design that complements the Galaxy S26 Ultra's premium look. The precise cutouts ensure easy access to all ports and buttons.</p>`,
    fa: `<h1>بررسی قاب سامسونگ گلکسی S26 اولترا</h1>
    <p>قاب سامسونگ گلکسی S26 اولترا محافظت ممتاز با طراحی شیک را ارائه می‌دهد. ساخته شده از مواد با کیفیت بالا، محافظت عالی در برابر ضربه را با حفظ ظاهر باریک فراهم می‌کند.</p>
    <h2>ویژگی‌های کلیدی</h2>
    <ul>
      <li>مواد با کیفیت ممتاز</li>
      <li>تناسب کامل برای گلکسی S26 اولترا</li>
      <li>فناوری جذب ضربه</li>
      <li>طراحی باریک و سبک</li>
      <li>قابل انتخاب در چند رنگ</li>
    </ul>
    <h2>طراحی و کیفیت ساخت</h2>
    <p>این قاب دارای طراحی شیکی است که با ظاهر ممتاز گلکسی S26 اولترا هماهنگ می‌شود. برش‌های دقیق دسترسی آسان به تمام پورت‌ها و دکمه‌ها را فراهم می‌کنند.</p>`
  },
  tags: ['Samsung', 'Galaxy S26 Ultra', 'Case', 'Accessory', 'Protection'],
  readTime: 5,
  active: true,
  featured: false,
  cover: '/assets/accesseries/us-galaxy-s26ultra-es948-e.png',
  publishDate: new Date().toISOString().split('T')[0]
};

async function createArticle() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // بررسی وجود مقاله
    const existing = await Article.findOne({ slug: articleData.slug });
    if (existing) {
      console.log('⚠️ مقاله قبلاً وجود دارد:', articleData.slug);
      await mongoose.disconnect();
      return;
    }

    // ایجاد مقاله جدید
    const article = new Article(articleData);
    await article.save();
    console.log('✅ مقاله ایجاد شد:', articleData.slug);

    // نمایش اطلاعات مقاله
    console.log('\n📰 اطلاعات مقاله:');
    console.log(`  عنوان: ${articleData.title.en}`);
    console.log(`  اسلاگ: ${articleData.slug}`);
    console.log(`  برند: ${articleData.brand}`);
    console.log(`  تگ‌ها: ${articleData.tags.join(', ')}`);

    await mongoose.disconnect();
    console.log('\n✅ عملیات کامل شد!');
  } catch (error) {
    console.error('❌ خطا:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createArticle();
