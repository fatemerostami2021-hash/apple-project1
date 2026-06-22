import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

const allAccessories = [
  // ============================================================
  // 1. قاب و کاور (Cases & Covers)
  // ============================================================
  {
    name: {
      en: 'Samsung Galaxy S26 Ultra Case',
      fa: 'قاب سامسونگ گلکسی S26 اولترا'
    },
    slug: 'samsung-galaxy-s26-ultra-case',
    brand: 'Samsung',
    category: 'Accessory',
    subCategory: 'cases',
    price: 200000,
    thumbnail: '/assets/accesseries/us-galaxy-s26ultra-es948-e.png',
    images: ['/assets/accesseries/us-galaxy-s26ultra-es948-e.png'],
    description: {
      en: 'Premium protective case for Samsung Galaxy S26 Ultra.',
      fa: 'قاب محافظ باکیفیت برای سامسونگ گلکسی S26 اولترا.'
    },
    inStock: true,
    tags: ['samsung', 'case', 'protection', 'galaxy-s26']
  },
  {
    name: {
      en: 'Accessories & Cases Set',
      fa: 'مجموعه لوازم جانبی و قاب'
    },
    slug: 'accessories-cases-set',
    brand: 'Apple',
    category: 'Accessory',
    subCategory: 'cases',
    price: 280000,
    thumbnail: '/assets/accesseries/accessories-and-cases.png',
    images: ['/assets/accesseries/accessories-and-cases.png'],
    description: {
      en: 'Complete set of accessories and cases for your device.',
      fa: 'مجموعه کامل لوازم جانبی و قاب برای دستگاه شما.'
    },
    inStock: true,
    tags: ['apple', 'case', 'set', 'accessory']
  },
  {
    name: {
      en: 'Premium Cover Case',
      fa: 'قاب کاور ممتاز'
    },
    slug: 'premium-cover-case',
    brand: 'Apple',
    category: 'Accessory',
    subCategory: 'cases',
    price: 180000,
    thumbnail: '/assets/accesseries/accessory-cover3.png',
    images: [
      '/assets/accesseries/accessory-cover3.png',
      '/assets/accesseries/accessory-cover4.png'
    ],
    description: {
      en: 'Premium quality cover case with excellent protection.',
      fa: 'قاب کاور با کیفیت ممتاز با محافظت عالی.'
    },
    inStock: true,
    tags: ['apple', 'case', 'cover', 'protection']
  },

  // ============================================================
  // 2. شارژرها (Chargers)
  // ============================================================
  {
    name: {
      en: 'Baseus 18W Mirror Lake Charger',
      fa: 'شارژر Baseus 18W Mirror Lake'
    },
    slug: 'baseus-18w-mirror-lake',
    brand: 'Baseus',
    category: 'Accessory',
    subCategory: 'chargers',
    price: 180000,
    thumbnail: '/assets/accesseries/Baseus-CCJMHA-18W-Mirror-Lake-8.png',
    images: ['/assets/accesseries/Baseus-CCJMHA-18W-Mirror-Lake-8.png'],
    description: {
      en: 'Fast charger with 18W output, compatible with all devices.',
      fa: 'شارژر سریع با خروجی ۱۸ وات، سازگار با تمام دستگاه‌ها.'
    },
    inStock: true,
    tags: ['charger', 'fast-charging', 'baseus']
  },
  {
    name: {
      en: 'McDodo GaN Mini Fast Travel Charger 65W',
      fa: 'شارژر مسافرتی GaN McDodo 65W'
    },
    slug: 'mcdodo-gan-65w',
    brand: 'McDodo',
    category: 'Accessory',
    subCategory: 'chargers',
    price: 350000,
    thumbnail: '/assets/accesseries/McDodo-Ch-0171-GaN-Mini-Fast-Traver-Charger-65W-lianclassic.com_.png',
    images: ['/assets/accesseries/McDodo-Ch-0171-GaN-Mini-Fast-Traver-Charger-65W-lianclassic.com_.png'],
    description: {
      en: 'GaN fast charger with 65W output, perfect for travel.',
      fa: 'شارژر سریع GaN با خروجی ۶۵ وات، عالی برای سفر.'
    },
    inStock: true,
    tags: ['charger', 'gan', 'travel', 'fast-charging']
  },
  {
    name: {
      en: 'Fast Charging Kit',
      fa: 'کیت شارژ سریع'
    },
    slug: 'fast-charging-kit',
    brand: 'SCOMMRCL',
    category: 'Accessory',
    subCategory: 'chargers',
    price: 380000,
    thumbnail: '/assets/accesseries/fast-charging1.png',
    images: ['/assets/accesseries/fast-charging1.png'],
    description: {
      en: 'Complete fast charging kit with GaN technology.',
      fa: 'کیت کامل شارژ سریع با فناوری GaN.'
    },
    inStock: true,
    tags: ['charger', 'fast-charging', 'kit', 'gan']
  },

  // ============================================================
  // 3. شارژر بی‌سیم (Wireless Chargers)
  // ============================================================
  {
    name: {
      en: 'Wireless Charger Classic',
      fa: 'شارژر بی‌سیم کلاسیک'
    },
    slug: 'wireless-charger-classic',
    brand: 'SCOMMRCL',
    category: 'Accessory',
    subCategory: 'wireless',
    price: 220000,
    thumbnail: '/assets/accesseries/WIRELESS-CHARGER-classic.png',
    images: [
      '/assets/accesseries/WIRELESS-CHARGER-classic.png',
      '/assets/accesseries/WIRELESS-CHARGER-classic-5.png',
      '/assets/accesseries/WIRELESS-CHARGER-classic-6.png'
    ],
    description: {
      en: 'Wireless charger with classic design, compatible with all Qi devices.',
      fa: 'شارژر بی‌سیم با طراحی کلاسیک، سازگار با تمام دستگاه‌های Qi.'
    },
    inStock: true,
    tags: ['wireless', 'charger', 'qi', 'classic']
  },

  // ============================================================
  // 4. کابل‌ها (Cables)
  // ============================================================
  {
    name: {
      en: 'Brave BDC-52 Cable C to C 100W',
      fa: 'کابل Brave BDC-52 C to C 100W'
    },
    slug: 'brave-bdc-52-cable',
    brand: 'Brave',
    category: 'Accessory',
    subCategory: 'cables',
    price: 150000,
    thumbnail: '/assets/accesseries/Brave-BDC-52-Cable-C-To-C-100W.png',
    images: ['/assets/accesseries/Brave-BDC-52-Cable-C-To-C-100W.png'],
    description: {
      en: 'USB-C to USB-C cable with 100W power delivery.',
      fa: 'کابل USB-C به USB-C با توان ۱۰۰ وات.'
    },
    inStock: true,
    tags: ['cable', 'usb-c', '100w', 'brave']
  },

  // ============================================================
  // 5. لوازم خودرو (Car Accessories)
  // ============================================================
  {
    name: {
      en: 'Yesido C175 Car Holder',
      fa: 'جاگوشی ماشین Yesido C175'
    },
    slug: 'yesido-c175-car-holder',
    brand: 'Yesido',
    category: 'Accessory',
    subCategory: 'car',
    price: 250000,
    thumbnail: '/assets/accesseries/Yesido-C175-Car-Holder-8-1.png',
    images: ['/assets/accesseries/Yesido-C175-Car-Holder-8-1.png'],
    description: {
      en: 'Car holder with wireless charging, compatible with all smartphones.',
      fa: 'جاگوشی ماشین با شارژ بی‌سیم، سازگار با تمام گوشی‌های هوشمند.'
    },
    inStock: true,
    tags: ['car', 'holder', 'wireless', 'yesido']
  },

  // ============================================================
  // 6. لوازم دوربین (Camera Accessories)
  // ============================================================
  {
    name: {
      en: 'Camera Accessory Kit',
      fa: 'کیت لوازم جانبی دوربین'
    },
    slug: 'camera-accessory-kit',
    brand: 'Apple',
    category: 'Accessory',
    subCategory: 'camera',
    price: 450000,
    thumbnail: '/assets/accesseries/camera-accessory.png',
    images: ['/assets/accesseries/camera-accessory.png'],
    description: {
      en: 'Professional camera accessory kit for iPhone.',
      fa: 'کیت لوازم جانبی دوربین حرفه‌ای برای آیفون.'
    },
    inStock: true,
    tags: ['camera', 'iphone', 'kit', 'professional']
  },

  // ============================================================
  // 7. بسته‌ها (Packages)
  // ============================================================
  {
    name: {
      en: 'Samsung Accessory Package',
      fa: 'بسته لوازم جانبی سامسونگ'
    },
    slug: 'samsung-accessory-package',
    brand: 'Samsung',
    category: 'Accessory',
    subCategory: 'package',
    price: 300000,
    thumbnail: '/assets/accesseries/samsung-accessory-package.png',
    images: [
      '/assets/accesseries/samsung-accessory-package.png',
      '/assets/accesseries/samsung-accessoriy1.png',
      '/assets/accesseries/galaxy-accessory.png',
      '/assets/accesseries/galaxy-accessory2.png'
    ],
    description: {
      en: 'Complete accessory package for Samsung devices.',
      fa: 'بسته کامل لوازم جانبی برای دستگاه‌های سامسونگ.'
    },
    inStock: true,
    tags: ['samsung', 'package', 'accessory', 'galaxy']
  },
  {
    name: {
      en: 'SCOMMRCL Premium Accessory',
      fa: 'لوازم جانبی ممتاز SCOMMRCL'
    },
    slug: 'scommrcl-premium-accessory',
    brand: 'SCOMMRCL',
    category: 'Accessory',
    subCategory: 'package',
    price: 320000,
    thumbnail: '/assets/accesseries/SCOMMRCL-118-Bach_Scom_Only_Colo.png',
    images: ['/assets/accesseries/SCOMMRCL-118-Bach_Scom_Only_Colo.png'],
    description: {
      en: 'Premium accessory package with elegant design.',
      fa: 'بسته لوازم جانبی ممتاز با طراحی شیک.'
    },
    inStock: true,
    tags: ['scommrcl', 'package', 'premium', 'accessory']
  }
];

async function seedAllAccessories() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // حذف لوازم جانبی قبلی
    const deleted = await Product.deleteMany({ category: 'Accessory' });
    console.log(`🗑️ ${deleted.deletedCount} لوازم جانبی قبلی حذف شدند`);

    // اضافه کردن لوازم جانبی جدید
    const result = await Product.insertMany(allAccessories);
    console.log(`✅ ${result.length} لوازم جانبی به دیتابیس اضافه شدند`);

    // نمایش لیست اضافه شده‌ها
    console.log('\n📦 لیست لوازم جانبی اضافه شده:');
    result.forEach((p, i) => {
      console.log(`  ${i+1}. ${p.name?.en} (${p.subCategory}) - ${p.price.toLocaleString()} تومان`);
    });

    await mongoose.disconnect();
    console.log('\n✅ عملیات کامل شد!');
  } catch (error) {
    console.error('❌ خطا:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedAllAccessories();
