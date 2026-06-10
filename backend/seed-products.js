import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

const products = [
  // Apple iPhones
  { name: { fa: "آیفون ۱۷ پرو مکس", en: "iPhone 17 Pro Max" }, brand: "Apple", category: "Smartphones", price: 1399, thumbnail: "/images/iphone17-pro-max.png", inStock: true },
  { name: { fa: "آیفون ۱۷ پرو", en: "iPhone 17 Pro" }, brand: "Apple", category: "Smartphones", price: 1099, thumbnail: "/images/iphone17-pro.png", inStock: true },
  { name: { fa: "آیفون ۱۶ پرو مکس", en: "iPhone 16 Pro Max" }, brand: "Apple", category: "Smartphones", price: 1199, thumbnail: "/images/iphone16-pro-max.png", inStock: true },
  { name: { fa: "آیفون ۱۶", en: "iPhone 16" }, brand: "Apple", category: "Smartphones", price: 799, thumbnail: "/images/iphone16.png", inStock: true },
  { name: { fa: "آیفون ۱۵ پرو مکس", en: "iPhone 15 Pro Max" }, brand: "Apple", category: "Smartphones", price: 999, thumbnail: "/images/iphone15-pro-max.png", inStock: true },
  
  // Apple Watches
  { name: { fa: "اپل واچ اولترا ۳", en: "Apple Watch Ultra 3" }, brand: "Apple", category: "Wearables", price: 799, thumbnail: "/images/apple-watch-ultra.png", inStock: true },
  { name: { fa: "اپل واچ سری ۱۰", en: "Apple Watch Series 10" }, brand: "Apple", category: "Wearables", price: 449, thumbnail: "/images/apple-watch-series10.png", inStock: true },
  { name: { fa: "اپل واچ SE 3", en: "Apple Watch SE 3" }, brand: "Apple", category: "Wearables", price: 249, thumbnail: "/images/apple-watch-se.png", inStock: true },
  
  // Apple Accessories
  { name: { fa: "ایرپادز پرو ۳", en: "AirPods Pro 3" }, brand: "Apple", category: "Accessories", price: 249, thumbnail: "/images/airpods-pro.png", inStock: true },
  { name: { fa: "ایرپادز ۴", en: "AirPods 4" }, brand: "Apple", category: "Accessories", price: 129, thumbnail: "/images/airpods-4.png", inStock: true },
  { name: { fa: "مگ سیف شارژر", en: "MagSafe Charger" }, brand: "Apple", category: "Accessories", price: 49, thumbnail: "/images/magsafe.png", inStock: true },
  
  // Samsung Phones
  { name: { fa: "گلکسی S24 اولترا", en: "Galaxy S24 Ultra" }, brand: "Samsung", category: "Smartphones", price: 1299, thumbnail: "/images/samsung/galaxy-s24-ultra.png", inStock: true },
  { name: { fa: "گلکسی S24 پلاس", en: "Galaxy S24 Plus" }, brand: "Samsung", category: "Smartphones", price: 999, thumbnail: "/images/samsung/galaxy-s24-plus.png", inStock: true },
  { name: { fa: "گلکسی S24", en: "Galaxy S24" }, brand: "Samsung", category: "Smartphones", price: 799, thumbnail: "/images/samsung/galaxy-s24.png", inStock: true },
  { name: { fa: "گلکسی زد فلیپ ۶", en: "Galaxy Z Flip 6" }, brand: "Samsung", category: "Smartphones", price: 1099, thumbnail: "/images/samsung/galaxy-z-flip-6.png", inStock: true },
  { name: { fa: "گلکسی زد فولد ۶", en: "Galaxy Z Fold 6" }, brand: "Samsung", category: "Smartphones", price: 1799, thumbnail: "/images/samsung/galaxy-z-fold-6.png", inStock: true },
  
  // Samsung Watches
  { name: { fa: "گلکسی واچ ۷", en: "Galaxy Watch 7" }, brand: "Samsung", category: "Wearables", price: 299, thumbnail: "/images/samsung/galaxy-watch-7.png", inStock: true },
  { name: { fa: "گلکسی واچ اولترا", en: "Galaxy Watch Ultra" }, brand: "Samsung", category: "Wearables", price: 649, thumbnail: "/images/samsung/galaxy-watch-ultra.png", inStock: true },
  
  // Samsung Accessories
  { name: { fa: "گلکسی بادز ۳ پرو", en: "Galaxy Buds 3 Pro" }, brand: "Samsung", category: "Accessories", price: 249, thumbnail: "/images/samsung/galaxy-buds-3-pro.png", inStock: true },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apple-store');
    console.log('✅ Connected to MongoDB');
    
    // حذف محصولات قبلی
    const deleted = await Product.deleteMany({});
    console.log(`🗑️ Deleted ${deleted.deletedCount} old products`);
    
    let added = 0;
    for (const product of products) {
      await Product.create(product);
      console.log(`✅ Added: ${product.name.en}`);
      added++;
    }
    
    console.log(`\n✅ Done! Added ${added} products.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seed();
