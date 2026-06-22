import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

const macbookArticles = [
  {
    slug: 'macbook-pro-m4-review',
    brand: 'Apple',
    category: 'Laptop',
    title: {
      en: 'MacBook Pro M4 Review: The Ultimate Powerhouse',
      fa: 'بررسی مک‌بوک پرو M4: نیروگاه نهایی'
    },
    excerpt: {
      en: 'The MacBook Pro with M4 Pro chip delivers groundbreaking performance for professionals.',
      fa: 'مک‌بوک پرو با تراشه M4 Pro عملکرد بی‌نظیری برای حرفه‌ای‌ها ارائه می‌دهد.'
    },
    content: {
      en: `<h1>MacBook Pro M4 Review</h1>
      <p>The MacBook Pro with M4 Pro chip is Apple's most powerful laptop ever. With up to 36GB of unified memory and a 12-core CPU, it handles the most demanding workflows with ease.</p>
      <h2>Key Features</h2>
      <ul>
        <li>M4 Pro chip with 12-core CPU and 16-core GPU</li>
        <li>Up to 36GB unified memory</li>
        <li>Liquid Retina XDR display with ProMotion</li>
        <li>22 hours battery life</li>
        <li>12MP Center Stage camera</li>
      </ul>
      <h2>Performance</h2>
      <p>The M4 Pro chip delivers up to 2x faster performance than the previous generation. Video editing, 3D rendering, and software development are all faster than ever.</p>`,
      fa: `<h1>بررسی مک‌بوک پرو M4</h1>
      <p>مک‌بوک پرو با تراشه M4 Pro قدرتمندترین لپ‌تاپ اپل است. با تا ۳۶ گیگابایت حافظه یکپارچه و CPU ۱۲ هسته‌ای، سنگین‌ترین کارها را به راحتی انجام می‌دهد.</p>
      <h2>ویژگی‌های کلیدی</h2>
      <ul>
        <li>تراشه M4 Pro با CPU ۱۲ هسته‌ای و GPU ۱۶ هسته‌ای</li>
        <li>تا ۳۶ گیگابایت حافظه یکپارچه</li>
        <li>نمایشگر Liquid Retina XDR با ProMotion</li>
        <li>۲۲ ساعت عمر باتری</li>
        <li>دوربین ۱۲ مگاپیکسلی Center Stage</li>
      </ul>
      <h2>عملکرد</h2>
      <p>تراشه M4 Pro تا ۲ برابر سریع‌تر از نسل قبل است. ویرایش ویدیو، رندرینگ سه‌بعدی و توسعه نرم‌افزار همه سریع‌تر از همیشه هستند.</p>`
    },
    tags: ['MacBook', 'Apple', 'M4', 'Pro', 'Review'],
    readTime: 8,
    active: true,
    featured: true,
    cover: '/assets/macbook/macbook-pro.png',
    publishDate: new Date().toISOString().split('T')[0]
  },
  {
    slug: 'macbook-air-m3-review',
    brand: 'Apple',
    category: 'Laptop',
    title: {
      en: 'MacBook Air M3 Review: Perfect Balance',
      fa: 'بررسی مک‌بوک ایر M3: تعادل کامل'
    },
    excerpt: {
      en: 'The MacBook Air M3 is the perfect balance of performance and portability.',
      fa: 'مک‌بوک ایر M3 تعادل کامل بین عملکرد و قابلیت حمل است.'
    },
    content: {
      en: `<h1>MacBook Air M3 Review</h1>
      <p>The MacBook Air M3 is the thinnest and lightest MacBook ever. With the M3 chip, it delivers incredible performance while remaining ultra-portable.</p>
      <h2>Key Features</h2>
      <ul>
        <li>M3 chip with 8-core CPU and 10-core GPU</li>
        <li>Up to 24GB unified memory</li>
        <li>Liquid Retina display with True Tone</li>
        <li>18 hours battery life</li>
        <li>1080p FaceTime HD camera</li>
      </ul>
      <h2>Design</h2>
      <p>The MacBook Air M3 is just 0.44 inches thick and weighs only 2.7 pounds. It's the perfect companion for students, professionals, and anyone on the go.</p>`,
      fa: `<h1>بررسی مک‌بوک ایر M3</h1>
      <p>مک‌بوک ایر M3 باریک‌ترین و سبک‌ترین مک‌بوک تاریخ است. با تراشه M3، عملکرد فوق‌العاده‌ای را در عین فوق‌العاده قابل حمل بودن ارائه می‌دهد.</p>
      <h2>ویژگی‌های کلیدی</h2>
      <ul>
        <li>تراشه M3 با CPU ۸ هسته‌ای و GPU ۱۰ هسته‌ای</li>
        <li>تا ۲۴ گیگابایت حافظه یکپارچه</li>
        <li>نمایشگر Liquid Retina با True Tone</li>
        <li>۱۸ ساعت عمر باتری</li>
        <li>دوربین ۱۰۸۰p FaceTime HD</li>
      </ul>
      <h2>طراحی</h2>
      <p>مک‌بوک ایر M3 فقط ۰.۴۴ اینچ ضخامت و ۱.۲ کیلوگرم وزن دارد. همراه ایده‌آل برای دانشجویان، حرفه‌ای‌ها و هر کسی که در حرکت است.</p>`
    },
    tags: ['MacBook', 'Apple', 'M3', 'Air', 'Review'],
    readTime: 6,
    active: true,
    featured: true,
    cover: '/assets/macbook/macboo-air-m3--.png',
    publishDate: new Date().toISOString().split('T')[0]
  }
];

async function seedMacbookArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    let created = 0;
    let skipped = 0;

    for (const articleData of macbookArticles) {
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

    // اتصال مقالات به محصولات
    for (const articleData of macbookArticles) {
      const productSlug = articleData.slug.replace('-review', '');
      await Product.updateOne(
        { slug: productSlug },
        { $set: { articleSlug: articleData.slug } }
      );
      console.log(`🔗 ${productSlug} → ${articleData.slug}`);
    }

    console.log(`\n📊 نتیجه:`);
    console.log(`  ✅ مقالات ایجاد شد: ${created}`);
    console.log(`  ⏩ مقالات موجود: ${skipped}`);
    console.log(`  🔗 محصولات متصل شدند: ${macbookArticles.length}`);

    await mongoose.disconnect();
    console.log('✅ عملیات کامل شد!');
  } catch (error) {
    console.error('❌ خطا:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedMacbookArticles();
