import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const articleSchema = new mongoose.Schema({}, { strict: false });
const Article = mongoose.model('Article', articleSchema, 'articles');

const watchArticles = [
  {
    slug: 'apple-watch-ultra-4',
    title: { 
      en: 'Apple Watch Ultra 4: The Ultimate Adventure Smartwatch', 
      fa: 'اپل واچ اولترا ۴: ساعت هوشمند نهایی ماجراجویی' 
    },
    brand: 'Apple',
    category: 'Watch',
    content: {
      en: 'The Apple Watch Ultra 4 is the most rugged and feature-packed smartwatch ever made. With a titanium case, sapphire crystal display, and advanced health sensors, it\'s built for the most extreme conditions.',
      fa: 'اپل واچ اولترا ۴ مقاوم‌ترین و پرامکانات‌ترین ساعت هوشمند ساخته شده است. با بدنه تیتانیومی، نمایشگر کریستال یاقوت و سنسورهای پیشرفته سلامتی، برای سخت‌ترین شرایط ساخته شده است.'
    },
    excerpt: {
      en: 'The ultimate smartwatch for adventurers and athletes.',
      fa: 'نهایی‌ترین ساعت هوشمند برای ماجراجویان و ورزشکاران.'
    },
    cover: '/assets/watch/Apple_Watch_Ultra_4_2025.png',
    tags: ['Apple Watch', 'Ultra', 'Adventure', 'Titanium'],
    publishDate: '2025-01-15',
    readTime: 8,
    active: true,
    featured: true
  },
  {
    slug: 'apple-watch-ultra-3',
    title: { 
      en: 'Apple Watch Ultra 3: The Ultimate Sports Smartwatch', 
      fa: 'اپل واچ اولترا ۳: ساعت هوشمند نهایی ورزشی' 
    },
    brand: 'Apple',
    category: 'Watch',
    content: {
      en: 'The Apple Watch Ultra 3 is the ultimate smartwatch for sports enthusiasts. Featuring advanced fitness tracking, GPS, and a durable design, it\'s perfect for athletes of all levels.',
      fa: 'اپل واچ اولترا ۳ نهایی‌ترین ساعت هوشمند برای علاقه‌مندان به ورزش است. با ردیابی پیشرفته تناسب اندام، GPS و طراحی مقاوم، برای ورزشکاران در تمام سطوح عالی است.'
    },
    excerpt: {
      en: 'The ultimate sports smartwatch with advanced fitness tracking.',
      fa: 'نهایی‌ترین ساعت هوشمند ورزشی با ردیابی پیشرفته تناسب اندام.'
    },
    cover: '/assets/watch/Apple_Watch_Ultra_3_2025.png',
    tags: ['Apple Watch', 'Ultra', 'Sports', 'Fitness'],
    publishDate: '2025-01-10',
    readTime: 7,
    active: true,
    featured: true
  },
  {
    slug: 'apple-watch-series-12',
    title: { 
      en: 'Apple Watch Series 12: The Perfect Balance of Style and Function', 
      fa: 'اپل واچ سری ۱۲: تعادل کامل بین سبک و عملکرد' 
    },
    brand: 'Apple',
    category: 'Watch',
    content: {
      en: 'The Apple Watch Series 12 offers the perfect balance of style and function. With a stunning always-on display, comprehensive health features, and a sleek design, it\'s the ideal everyday companion.',
      fa: 'اپل واچ سری ۱۲ تعادل کامل بین سبک و عملکرد را ارائه می‌دهد. با نمایشگر خیره‌کننده همیشه روشن، ویژگی‌های جامع سلامتی و طراحی زیبا، همراه ایده‌آل روزمره است.'
    },
    excerpt: {
      en: 'The perfect balance of style and function for everyday use.',
      fa: 'تعادل کامل بین سبک و عملکرد برای استفاده روزمره.'
    },
    cover: '/assets/watch/Apple_Watch_Series_12_2025.png',
    tags: ['Apple Watch', 'Series 12', 'Lifestyle', 'Health'],
    publishDate: '2025-01-05',
    readTime: 6,
    active: true,
    featured: true
  },
  {
    slug: 'apple-watch-se-3',
    title: { 
      en: 'Apple Watch SE 3: The Best Budget Apple Smartwatch', 
      fa: 'اپل واچ SE ۳: بهترین ساعت هوشمند اقتصادی اپل' 
    },
    brand: 'Apple',
    category: 'Watch',
    content: {
      en: 'The Apple Watch SE 3 is the best budget smartwatch from Apple. It offers all the essential features you need at an affordable price, making it perfect for first-time smartwatch users.',
      fa: 'اپل واچ SE ۳ بهترین ساعت هوشمند اقتصادی از اپل است. تمام ویژگی‌های ضروری مورد نیاز شما را با قیمتی مناسب ارائه می‌دهد و برای کاربران جدید ساعت هوشمند عالی است.'
    },
    excerpt: {
      en: 'The best budget smartwatch with essential features.',
      fa: 'بهترین ساعت هوشمند اقتصادی با ویژگی‌های ضروری.'
    },
    cover: '/assets/watch/Apple_Watch_SE_3rd_Gen_2025.png',
    tags: ['Apple Watch', 'SE', 'Budget', 'Essential'],
    publishDate: '2025-01-01',
    readTime: 5,
    active: true,
    featured: true
  }
];

async function seedWatchArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    let added = 0;
    for (const article of watchArticles) {
      const existing = await Article.findOne({ slug: article.slug });
      if (!existing) {
        await Article.create(article);
        console.log('✅ اضافه شد:', article.slug);
        added++;
      } else {
        console.log('⏩ موجود است:', article.slug);
      }
    }
    
    console.log(`\n✅ ${added} مقاله جدید اضافه شد`);
    console.log(`📚 مجموع مقالات: ${await Article.countDocuments()}`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

seedWatchArticles();
