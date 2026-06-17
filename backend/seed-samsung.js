import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

const samsungProducts = [
  // ===== سری S =====
  {
    name: { en: 'Galaxy S24', fa: 'گلکسی اس۲۴' },
    slug: 'galaxy-s24',
    brand: 'Samsung',
    category: 'Phone',
    price: 75000000,
    thumbnail: '/assets/galexy-series-s/galaxy-s24.png',
    inStock: true,
    description: { en: 'Compact flagship', fa: 'پرچمدار جمع‌وجور' }
  },
  {
    name: { en: 'Galaxy S24 Plus', fa: 'گلکسی اس۲۴ پلاس' },
    slug: 'galaxy-s24-plus',
    brand: 'Samsung',
    category: 'Phone',
    price: 95000000,
    thumbnail: '/assets/galexy-series-s/galaxy-s24-plus.png',
    inStock: true
  },
  {
    name: { en: 'Galaxy S24 Ultra', fa: 'گلکسی اس۲۴ اولترا' },
    slug: 'galaxy-s24-ultra',
    brand: 'Samsung',
    category: 'Phone',
    price: 120000000,
    thumbnail: '/assets/galexy-series-s/galaxy-s24-ultra.png',
    inStock: true,
    description: { en: 'The ultimate Galaxy', fa: 'بهترین گلکسی' }
  },
  {
    name: { en: 'Galaxy S25 Ultra', fa: 'گلکسی اس۲۵ اولترا' },
    slug: 'galaxy-s25-ultra',
    brand: 'Samsung',
    category: 'Phone',
    price: 135000000,
    thumbnail: '/assets/galexy-series-s/galaxy-s-25-ultra.png',
    inStock: true
  },
  {
    name: { en: 'Galaxy S26', fa: 'گلکسی اس۲۶' },
    slug: 'galaxy-s26',
    brand: 'Samsung',
    category: 'Phone',
    price: 100000000,
    thumbnail: '/assets/galexy-series-s/galaxy-s-26.png',
    inStock: true
  },
  // ===== سری Z =====
  {
    name: { en: 'Galaxy Z Fold 6', fa: 'گلکسی زد فولد ۶' },
    slug: 'galaxy-z-fold-6',
    brand: 'Samsung',
    category: 'Phone',
    price: 150000000,
    thumbnail: '/assets/galexy-series-s/galaxy-z-fold6.png',
    inStock: true,
    description: { en: 'Foldable flagship', fa: 'پرچمدار تاشو' }
  },
  {
    name: { en: 'Galaxy Z Flip 6', fa: 'گلکسی زد فلیپ ۶' },
    slug: 'galaxy-z-flip-6',
    brand: 'Samsung',
    category: 'Phone',
    price: 110000000,
    thumbnail: '/assets/galexy-series-s/galaxy-z-flip6.png',
    inStock: true
  },
  {
    name: { en: 'Galaxy Z Modelle', fa: 'گلکسی زد مدل' },
    slug: 'galaxy-z-modelle',
    brand: 'Samsung',
    category: 'Phone',
    price: 90000000,
    thumbnail: '/assets/galexy-series-s/galaxy-z-modelle.png',
    inStock: true
  },
  // ===== سری Tab =====
  {
    name: { en: 'Galaxy Tab S10 Ultra', fa: 'گلکسی تب اس۱۰ اولترا' },
    slug: 'galaxy-tab-s10-ultra',
    brand: 'Samsung',
    category: 'Tablet',
    price: 85000000,
    thumbnail: '/assets/galexy-series-s/galaxy-tab-s10-ultra.png',
    inStock: true
  },
  {
    name: { en: 'Galaxy Tab S4', fa: 'گلکسی تب اس۴' },
    slug: 'galaxy-tab-s4',
    brand: 'Samsung',
    category: 'Tablet',
    price: 45000000,
    thumbnail: '/assets/galexy-series-s/galaxy-tab-s4.png',
    inStock: true
  },
  {
    name: { en: 'Galaxy Tab Pro', fa: 'گلکسی تب پرو' },
    slug: 'galaxy-tab-pro',
    brand: 'Samsung',
    category: 'Tablet',
    price: 55000000,
    thumbnail: '/assets/galexy-series-s/galaxy-tab-pr0.png',
    inStock: true
  },
  // ===== سری A =====
  {
    name: { en: 'Galaxy A Series', fa: 'گلکسی ای' },
    slug: 'galaxy-a-series',
    brand: 'Samsung',
    category: 'Phone',
    price: 35000000,
    thumbnail: '/assets/galexy-series-s/galaxy-A.png',
    inStock: true
  },
  // ===== سری Note =====
  {
    name: { en: 'Galaxy Note', fa: 'گلکسی نوت' },
    slug: 'galaxy-note',
    brand: 'Samsung',
    category: 'Phone',
    price: 80000000,
    thumbnail: '/assets/galexy-series-s/galaxy-note.png',
    inStock: true
  },
  {
    name: { en: 'Galaxy Note Collection', fa: 'مجموعه گلکسی نوت' },
    slug: 'galaxy-note-collection',
    brand: 'Samsung',
    category: 'Phone',
    price: 90000000,
    thumbnail: '/assets/galexy-series-s/galaxy-note-collection.png',
    inStock: true
  },
  // ===== سری M =====
  {
    name: { en: 'Galaxy M17 5G', fa: 'گلکسی ام۱۷ ۵جی' },
    slug: 'galaxy-m17-5g',
    brand: 'Samsung',
    category: 'Phone',
    price: 40000000,
    thumbnail: '/assets/galexy-series-s/galaxy-m-17-5G.png',
    inStock: true
  },
  // ===== Galaxy Book =====
  {
    name: { en: 'Galaxy Book', fa: 'گلکسی بوک' },
    slug: 'galaxy-book',
    brand: 'Samsung',
    category: 'Laptop',
    price: 95000000,
    thumbnail: '/assets/galexy-series-s/galaxy-book.png',
    inStock: true
  },
  {
    name: { en: 'Galaxy Book 6', fa: 'گلکسی بوک ۶' },
    slug: 'galaxy-book-6',
    brand: 'Samsung',
    category: 'Laptop',
    price: 110000000,
    thumbnail: '/assets/galexy-series-s/galaxy-book-6.png',
    inStock: true
  }
];

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ متصل به دیتابیس');
  
  let added = 0;
  let skipped = 0;
  
  for (const product of samsungProducts) {
    const existing = await Product.findOne({ slug: product.slug });
    if (!existing) {
      await Product.create(product);
      console.log('✅ اضافه شد:', product.slug);
      added++;
    } else {
      console.log('⏩ موجود است:', product.slug);
      skipped++;
    }
  }
  
  console.log('\n📊 خلاصه:');
  console.log('✅ اضافه شده:', added);
  console.log('⏩ موجود:', skipped);
  console.log('📱 کل محصولات سامسونگ:', await Product.countDocuments({ brand: 'Samsung' }));
  console.log('📦 کل محصولات:', await Product.countDocuments());
  
} catch (error) {
  console.error('❌ خطا:', error.message);
} finally {
  await mongoose.disconnect();
  console.log('✅ اتصال قطع شد');
}
