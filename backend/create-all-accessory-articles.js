import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

// لیست محصولات بدون مقاله و مقالات پیشنهادی
const accessoryData = [
  {
    productSlug: 'accessories-cases-set',
    articleSlug: 'accessories-cases-set-review',
    title: {
      en: 'Accessories & Cases Set Review',
      fa: 'بررسی مجموعه لوازم جانبی و قاب'
    },
    excerpt: {
      en: 'Complete set of accessories and cases for your device.',
      fa: 'مجموعه کامل لوازم جانبی و قاب برای دستگاه شما.'
    },
    cover: '/assets/accesseries/accessories-and-cases.png'
  },
  {
    productSlug: 'premium-cover-case',
    articleSlug: 'premium-cover-case-review',
    title: {
      en: 'Premium Cover Case Review',
      fa: 'بررسی قاب کاور ممتاز'
    },
    excerpt: {
      en: 'Premium quality cover case with excellent protection.',
      fa: 'قاب کاور با کیفیت ممتاز با محافظت عالی.'
    },
    cover: '/assets/accesseries/accessory-cover3.png'
  },
  {
    productSlug: 'baseus-18w-mirror-lake',
    articleSlug: 'baseus-18w-mirror-lake-review',
    title: {
      en: 'Baseus 18W Mirror Lake Charger Review',
      fa: 'بررسی شارژر Baseus 18W Mirror Lake'
    },
    excerpt: {
      en: 'Fast charger with 18W output for all devices.',
      fa: 'شارژر سریع با خروجی ۱۸ وات برای تمام دستگاه‌ها.'
    },
    cover: '/assets/accesseries/Baseus-CCJMHA-18W-Mirror-Lake-8.png'
  },
  {
    productSlug: 'mcdodo-gan-65w',
    articleSlug: 'mcdodo-gan-65w-review',
    title: {
      en: 'McDodo GaN 65W Fast Charger Review',
      fa: 'بررسی شارژر سریع McDodo GaN 65W'
    },
    excerpt: {
      en: 'Compact GaN charger with 65W output.',
      fa: 'شارژر جمع‌وجور GaN با خروجی ۶۵ وات.'
    },
    cover: '/assets/accesseries/McDodo-Ch-0171-GaN-Mini-Fast-Traver-Charger-65W-lianclassic.com_.png'
  },
  {
    productSlug: 'fast-charging-kit',
    articleSlug: 'fast-charging-kit-review',
    title: {
      en: 'Fast Charging Kit Review',
      fa: 'بررسی کیت شارژ سریع'
    },
    excerpt: {
      en: 'Complete fast charging kit with GaN technology.',
      fa: 'کیت کامل شارژ سریع با فناوری GaN.'
    },
    cover: '/assets/accesseries/fast-charging1.png'
  },
  {
    productSlug: 'wireless-charger-classic',
    articleSlug: 'wireless-charger-classic-review',
    title: {
      en: 'Wireless Charger Classic Review',
      fa: 'بررسی شارژر بی‌سیم کلاسیک'
    },
    excerpt: {
      en: 'Classic wireless charger with Qi compatibility.',
      fa: 'شارژر بی‌سیم کلاسیک با سازگاری Qi.'
    },
    cover: '/assets/accesseries/WIRELESS-CHARGER-classic.png'
  },
  {
    productSlug: 'brave-bdc-52-cable',
    articleSlug: 'brave-bdc-52-cable-review',
    title: {
      en: 'Brave BDC-52 Cable Review',
      fa: 'بررسی کابل Brave BDC-52'
    },
    excerpt: {
      en: 'USB-C to USB-C cable with 100W power delivery.',
      fa: 'کابل USB-C به USB-C با توان ۱۰۰ وات.'
    },
    cover: '/assets/accesseries/Brave-BDC-52-Cable-C-To-C-100W.png'
  },
  {
    productSlug: 'yesido-c175-car-holder',
    articleSlug: 'yesido-c175-car-holder-review',
    title: {
      en: 'Yesido C175 Car Holder Review',
      fa: 'بررسی جاگوشی ماشین Yesido C175'
    },
    excerpt: {
      en: 'Car holder with wireless charging.',
      fa: 'جاگوشی ماشین با شارژ بی‌سیم.'
    },
    cover: '/assets/accesseries/Yesido-C175-Car-Holder-8-1.png'
  },
  {
    productSlug: 'camera-accessory-kit',
    articleSlug: 'camera-accessory-kit-review',
    title: {
      en: 'Camera Accessory Kit Review',
      fa: 'بررسی کیت لوازم جانبی دوربین'
    },
    excerpt: {
      en: 'Professional camera accessory kit for iPhone.',
      fa: 'کیت لوازم جانبی دوربین حرفه‌ای برای آیفون.'
    },
    cover: '/assets/accesseries/camera-accessory.png'
  },
  {
    productSlug: 'samsung-accessory-package',
    articleSlug: 'samsung-accessory-package-review',
    title: {
      en: 'Samsung Accessory Package Review',
      fa: 'بررسی بسته لوازم جانبی سامسونگ'
    },
    excerpt: {
      en: 'Complete accessory package for Samsung devices.',
      fa: 'بسته کامل لوازم جانبی برای دستگاه‌های سامسونگ.'
    },
    cover: '/assets/accesseries/samsung-accessory-package.png'
  },
  {
    productSlug: 'scommrcl-premium-accessory',
    articleSlug: 'scommrcl-premium-accessory-review',
    title: {
      en: 'SCOMMRCL Premium Accessory Review',
      fa: 'بررسی لوازم جانبی ممتاز SCOMMRCL'
    },
    excerpt: {
      en: 'Premium accessory package with elegant design.',
      fa: 'بسته لوازم جانبی ممتاز با طراحی شیک.'
    },
    cover: '/assets/accesseries/SCOMMRCL-118-Bach_Scom_Only_Colo.png'
  }
];

async function createArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    let created = 0;
    let skipped = 0;

    for (const data of accessoryData) {
      // بررسی وجود مقاله
      const existingArticle = await Article.findOne({ slug: data.articleSlug });
      if (existingArticle) {
        console.log(`⏩ ${data.articleSlug} - از قبل وجود دارد`);
        skipped++;
        continue;
      }

      // ایجاد مقاله
      const article = new Article({
        slug: data.articleSlug,
        brand: 'Accessory',
        category: 'Accessory',
        title: data.title,
        excerpt: data.excerpt,
        content: {
          en: `<h1>${data.title.en}</h1><p>${data.excerpt.en}</p>`,
          fa: `<h1>${data.title.fa}</h1><p>${data.excerpt.fa}</p>`
        },
        tags: ['Accessory', 'Review'],
        readTime: 4,
        active: true,
        featured: false,
        cover: data.cover,
        productSlug: data.productSlug,
        publishDate: new Date().toISOString().split('T')[0]
      });

      await article.save();
      console.log(`✅ ${data.articleSlug} - ایجاد شد`);

      // به‌روزرسانی محصول با articleSlug
      await Product.updateOne(
        { slug: data.productSlug },
        { $set: { articleSlug: data.articleSlug } }
      );
      console.log(`   → محصول ${data.productSlug} به مقاله متصل شد`);

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

createArticles();
