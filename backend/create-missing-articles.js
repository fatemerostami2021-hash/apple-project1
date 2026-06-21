import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

const missingArticles = [
  {
    slug: 'galaxy-s26-review',
    brand: 'Samsung',
    title: {
      en: 'Galaxy S26 Review: The Future of Samsung',
      fa: 'بررسی گلکسی S26: آینده سامسونگ'
    },
    excerpt: {
      en: 'The Galaxy S26 brings cutting-edge AI features and a revolutionary camera system.',
      fa: 'گلکسی S26 با ویژگی‌های پیشرفته هوش مصنوعی و سیستم دوربین انقلابی.'
    },
    content: {
      en: '<h1>Galaxy S26 Review</h1><p>The Galaxy S26 is Samsung\'s most advanced smartphone yet. With the new Exynos 2400 chip and a 200MP camera, it redefines what a smartphone can do.</p>',
      fa: '<h1>بررسی گلکسی S26</h1><p>گلکسی S26 پیشرفته‌ترین گوشی سامسونگ تا به امروز است. با تراشه جدید Exynos 2400 و دوربین ۲۰۰ مگاپیکسلی،定义了 یک گوشی هوشمند.</p>'
    },
    tags: ['Samsung', 'Galaxy S26', 'Review', 'AI'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 8,
    active: true,
    featured: true,
    cover: '/assets/galexy-series-s/galaxy-s26.png'
  },
  {
    slug: 'iphone-17-pro-review',
    brand: 'Apple',
    title: {
      en: 'iPhone 17 Pro Review: AI at Its Peak',
      fa: 'بررسی آیفون ۱۷ پرو: هوش مصنوعی در اوج'
    },
    excerpt: {
      en: 'iPhone 17 Pro with A19 Pro chip and advanced AI features.',
      fa: 'آیفون ۱۷ پرو با تراشه A19 Pro و ویژگی‌های پیشرفته هوش مصنوعی.'
    },
    content: {
      en: '<h1>iPhone 17 Pro Review</h1><p>The iPhone 17 Pro brings advanced AI capabilities to your pocket. With the A19 Pro chip, machine learning tasks are faster than ever.</p>',
      fa: '<h1>بررسی آیفون ۱۷ پرو</h1><p>آیفون ۱۷ پرو قابلیت‌های پیشرفته هوش مصنوعی را به جیب شما می‌آورد. با تراشه A19 Pro، وظایف یادگیری ماشین سریع‌تر از همیشه هستند.</p>'
    },
    tags: ['iPhone', 'Apple', 'iPhone 17 Pro', 'AI'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 7,
    active: true,
    featured: true,
    cover: '/assets/iphone/iphone-17-pro.png'
  },
  {
    slug: 'iphone-17-review',
    brand: 'Apple',
    title: {
      en: 'iPhone 17 Review: The Next Generation',
      fa: 'بررسی آیفون ۱۷: نسل بعدی'
    },
    excerpt: {
      en: 'iPhone 17 with next-generation A19 chip and advanced AI features.',
      fa: 'آیفون ۱۷ با تراشه نسل بعدی A19 و ویژگی‌های پیشرفته هوش مصنوعی.'
    },
    content: {
      en: '<h1>iPhone 17 Review</h1><p>The iPhone 17 represents the next generation of smartphones with the A19 chip and enhanced AI capabilities.</p>',
      fa: '<h1>بررسی آیفون ۱۷</h1><p>آیفون ۱۷ نماینده نسل بعدی گوشی‌های هوشمند با تراشه A19 و قابلیت‌های پیشرفته هوش مصنوعی است.</p>'
    },
    tags: ['iPhone', 'Apple', 'iPhone 17', 'AI'],
    publishDate: new Date().toISOString().slice(0, 10),
    readTime: 6,
    active: true,
    featured: true,
    cover: '/assets/iphone/iphone-17.png'
  }
];

async function createMissingArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    let created = 0;
    let skipped = 0;

    for (const articleData of missingArticles) {
      const existing = await Article.findOne({ slug: articleData.slug });
      if (existing) {
        console.log(`⏩ ${articleData.slug} - از قبل وجود دارد`);
        skipped++;
        continue;
      }

      const article = new Article(articleData);
      await article.save();
      console.log(`✅ ${articleData.slug} - ایجاد شد`);
      created++;
    }

    console.log(`\n📊 نتیجه:`);
    console.log(`  ✅ ایجاد شد: ${created}`);
    console.log(`  ⏩ موجود بود: ${skipped}`);

    await mongoose.disconnect();
    console.log('\n✅ عملیات کامل شد!');

  } catch (error) {
    console.error('❌ خطا:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createMissingArticles();
