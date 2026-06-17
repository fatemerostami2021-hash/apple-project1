import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

const appleProducts = [
  {
    name: { en: 'iPhone 17 Pro Max', fa: 'آیفون ۱۷ پرو مکس' },
    slug: 'iphone-17-pro-max',
    brand: 'Apple',
    category: 'Phone',
    price: 85000000,
    thumbnail: '/assets/iphone/iphone-17-pro-max.png',
    inStock: true,
    description: { 
      en: 'The most powerful iPhone ever with A17 Pro chip and titanium design.', 
      fa: 'قدرتمندترین آیفون تاریخ با تراشه A17 Pro و طراحی تیتانیومی.' 
    },
    tags: ['iPhone', 'Apple', 'Pro Max'],
    featured: true
  },
  {
    name: { en: 'iPhone 17 Pro', fa: 'آیفون ۱۷ پرو' },
    slug: 'iphone-17-pro',
    brand: 'Apple',
    category: 'Phone',
    price: 70000000,
    thumbnail: '/assets/iphone/iphone-17-pro.png',
    inStock: true,
    description: { 
      en: 'Professional performance in a compact design.', 
      fa: 'عملکرد حرفه‌ای در طراحی جمع‌وجور.' 
    },
    tags: ['iPhone', 'Apple', 'Pro']
  },
  {
    name: { en: 'iPhone 17', fa: 'آیفون ۱۷' },
    slug: 'iphone-17',
    brand: 'Apple',
    category: 'Phone',
    price: 55000000,
    thumbnail: '/assets/iphone/iphone-17.png',
    inStock: true,
    description: { 
      en: 'The perfect balance of performance and value.', 
      fa: 'تعادل کامل بین عملکرد و ارزش.' 
    },
    tags: ['iPhone', 'Apple']
  },
  {
    name: { en: 'iPhone 16 Pro Max', fa: 'آیفون ۱۶ پرو مکس' },
    slug: 'iphone-16-pro-max',
    brand: 'Apple',
    category: 'Phone',
    price: 65000000,
    thumbnail: '/assets/iphone/iphone-16-pro-max.png',
    inStock: true,
    description: { 
      en: 'Big screen, big performance.', 
      fa: 'صفحه بزرگ، عملکرد بزرگ.' 
    },
    tags: ['iPhone', 'Apple', 'Pro Max']
  },
  {
    name: { en: 'iPhone 16', fa: 'آیفون ۱۶' },
    slug: 'iphone-16',
    brand: 'Apple',
    category: 'Phone',
    price: 45000000,
    thumbnail: '/assets/iphone/iphone-16.png',
    inStock: true,
    description: { 
      en: 'The latest iPhone with innovative features.', 
      fa: 'جدیدترین آیفون با ویژگی‌های نوآورانه.' 
    },
    tags: ['iPhone', 'Apple']
  },
  {
    name: { en: 'MacBook Pro M4', fa: 'مک‌بوک پرو M4' },
    slug: 'macbook-pro-m4',
    brand: 'Apple',
    category: 'Laptop',
    price: 120000000,
    thumbnail: '/assets/iphone/mac-pro-m4.png',
    inStock: true,
    description: { 
      en: 'The most powerful MacBook ever with M4 chip.', 
      fa: 'قدرتمندترین مک‌بوک تاریخ با تراشه M4.' 
    },
    tags: ['MacBook', 'Apple', 'Pro', 'M4']
  },
  {
    name: { en: 'MacBook Air M3', fa: 'مک‌بوک ایر M3' },
    slug: 'macbook-air-m3',
    brand: 'Apple',
    category: 'Laptop',
    price: 75000000,
    thumbnail: '/assets/macbook/macbook-air-m3.png',
    inStock: true,
    description: { 
      en: 'Ultra-thin, ultra-fast with M3 chip.', 
      fa: 'فوق‌نازک، فوق‌سریع با تراشه M3.' 
    },
    tags: ['MacBook', 'Apple', 'Air', 'M3']
  },
  {
    name: { en: 'iPad Pro M4', fa: 'آیپد پرو M4' },
    slug: 'ipad-pro-m4',
    brand: 'Apple',
    category: 'Tablet',
    price: 55000000,
    thumbnail: '/assets/ipad/ipad_pro.png',
    inStock: true,
    description: { 
      en: 'The ultimate tablet experience with M4 chip.', 
      fa: 'نهایی‌ترین تجربه تبلت با تراشه M4.' 
    },
    tags: ['iPad', 'Apple', 'Pro', 'M4']
  },
  {
    name: { en: 'iPad Air', fa: 'آیپد ایر' },
    slug: 'ipad-air',
    brand: 'Apple',
    category: 'Tablet',
    price: 35000000,
    thumbnail: '/assets/ipad/ipad-air.png',
    inStock: true,
    description: { 
      en: 'Powerful and portable.', 
      fa: 'قدرتمند و قابل حمل.' 
    },
    tags: ['iPad', 'Apple', 'Air']
  },
  {
    name: { en: 'AirPods Pro 3', fa: 'ایرپادز پرو ۳' },
    slug: 'airpods-pro-3',
    brand: 'Apple',
    category: 'Accessory',
    price: 15000000,
    thumbnail: '/assets/airpod/airpod-pro.png',
    inStock: true,
    description: { 
      en: 'The best wireless earbuds with noise cancellation.', 
      fa: 'بهترین ایربادز بی‌سیم با حذف نویز.' 
    },
    tags: ['AirPods', 'Apple', 'Pro']
  },
  {
    name: { en: 'AirPods Max', fa: 'ایرپادز مکس' },
    slug: 'airpods-max',
    brand: 'Apple',
    category: 'Accessory',
    price: 22000000,
    thumbnail: '/assets/airpod/airpod-max.png',
    inStock: true,
    description: { 
      en: 'Premium over-ear headphones with exceptional sound.', 
      fa: 'هدفون روی گوشی ممتاز با صدای استثنایی.' 
    },
    tags: ['AirPods', 'Apple', 'Max']
  },
  {
    name: { en: 'Apple Watch Ultra 3', fa: 'اپل واچ اولترا ۳' },
    slug: 'apple-watch-ultra-3',
    brand: 'Apple',
    category: 'Watch',
    price: 38000000,
    thumbnail: '/assets/watch/Apple_Watch_Ultra_3_2025.png',
    inStock: true,
    description: { 
      en: 'The ultimate sports and adventure smartwatch.', 
      fa: 'نهایی‌ترین ساعت هوشمند ورزشی و ماجراجویی.' 
    },
    tags: ['Apple Watch', 'Apple', 'Ultra']
  },
  {
    name: { en: 'Apple Watch Series 10', fa: 'اپل واچ سری ۱۰' },
    slug: 'apple-watch-series-10',
    brand: 'Apple',
    category: 'Watch',
    price: 25000000,
    thumbnail: '/assets/watch/Apple_Watch_Series_10_2024.png',
    inStock: true,
    description: { 
      en: 'The perfect everyday smartwatch.', 
      fa: 'ساعت هوشمند ایده‌آل روزمره.' 
    },
    tags: ['Apple Watch', 'Apple', 'Series 10']
  },
  {
    name: { en: 'Apple Watch SE 3', fa: 'اپل واچ SE ۳' },
    slug: 'apple-watch-se-3',
    brand: 'Apple',
    category: 'Watch',
    price: 15000000,
    thumbnail: '/assets/watch/Apple_Watch_SE_3rd_Gen_2025.png',
    inStock: true,
    description: { 
      en: 'The best value Apple Watch with essential features.', 
      fa: 'بهترین ارزش اپل واچ با ویژگی‌های ضروری.' 
    },
    tags: ['Apple Watch', 'Apple', 'SE']
  }
];

async function seedAppleProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    let added = 0;
    for (const product of appleProducts) {
      const existing = await Product.findOne({ slug: product.slug });
      if (!existing) {
        await Product.create(product);
        console.log('✅ اضافه شد:', product.slug);
        added++;
      } else {
        console.log('⏩ موجود است:', product.slug);
      }
    }
    
    console.log(`\n✅ ${added} محصول جدید اضافه شد`);
    console.log(`🍎 مجموع محصولات اپل: ${await Product.countDocuments({ brand: 'Apple' })}`);
    console.log(`📦 مجموع کل محصولات: ${await Product.countDocuments()}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

seedAppleProducts();
