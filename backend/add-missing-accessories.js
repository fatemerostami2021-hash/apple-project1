import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

const newAccessories = [
  {
    name: {
      en: 'Tempered Glass Screen Protector',
      fa: 'محافظ صفحه شیشه‌ای سکوریت'
    },
    slug: 'tempered-glass-screen-protector',
    brand: 'Apple',
    category: 'Accessory',
    subCategory: 'protection',
    price: 120000,
    thumbnail: '/assets/accesseries/accessory-cover3.png',
    images: ['/assets/accesseries/accessory-cover3.png'],
    description: {
      en: 'Premium tempered glass screen protector with 9H hardness.',
      fa: 'محافظ صفحه شیشه‌ای سکوریت با سختی ۹H.'
    },
    inStock: true,
    tags: ['protection', 'screen', 'glass']
  },
  {
    name: {
      en: 'Premium Wireless Earbuds',
      fa: 'ایرپاد بی‌سیم ممتاز'
    },
    slug: 'premium-wireless-earbuds',
    brand: 'Apple',
    category: 'Accessory',
    subCategory: 'audio',
    price: 450000,
    thumbnail: '/assets/airpod/apple-airpod.png',
    images: ['/assets/airpod/apple-airpod.png'],
    description: {
      en: 'High-quality wireless earbuds with noise cancellation.',
      fa: 'ایرپاد بی‌سیم با کیفیت بالا با حذف نویز.'
    },
    inStock: true,
    tags: ['audio', 'wireless', 'earbuds']
  }
];

async function addAccessories() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    for (const data of newAccessories) {
      const existing = await Product.findOne({ slug: data.slug });
      if (existing) {
        console.log(`⏩ ${data.slug} - از قبل وجود دارد`);
        continue;
      }
      await new Product(data).save();
      console.log(`✅ ${data.slug} - اضافه شد`);
    }

    await mongoose.disconnect();
    console.log('✅ عملیات کامل شد!');
  } catch (error) {
    console.error('❌ خطا:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

addAccessories();
