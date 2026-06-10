import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

// نقشه مسیرهای صحیح عکس‌ها
const imageMap = {
  // iPhone ها
  'iPhone 17 Pro Max': '/assets/iphone/iphone-17-pro-max.png',
  'iPhone 17 Pro': '/assets/iphone/iphone-17-pro.png',
  'iPhone 16 Pro Max': '/assets/iphone/iphone-16-pro-max.png',
  'iPhone 16': '/assets/iphone/iphone-16.png',
  'iPhone 15 Pro Max': '/assets/iphone/iphone-15-pro-max.png',
  'iPhone 15 Pro': '/assets/iphone/iphone-15-pro.png',
  
  // Apple Watch
  'Apple Watch Ultra 3': '/images/apple-watch-ultra.png',
  'Apple Watch Series 10': '/images/apple-watch-ultra.png',
  'Apple Watch SE 3': '/images/apple-watch-ultra.png',
  
  // AirPods
  'AirPods Pro 3': '/images/airpods-pro-2.png',
  'AirPods 4': '/images/airpods-pro-2.png',
  
  // Samsung Phones
  'Galaxy S24 Ultra': '/assets/samsung/galaxy-s24-ultra.png',
  'Galaxy S24 Plus': '/assets/samsung/galaxy-s24-plus.png',
  'Galaxy S24': '/assets/samsung/galaxy-s24.png',
  'Galaxy Z Flip 6': '/assets/samsung/galaxy-z-flip6.png',
  'Galaxy Z Fold 6': '/assets/samsung/galaxy-z-fold6.png',
  
  // Samsung Watch
  'Galaxy Watch 7': '/assets/samsung/galaxy-watch-ultra.png',
  'Galaxy Watch Ultra': '/assets/samsung/galaxy-watch-ultra.png',
  
  // Samsung Buds
  'Galaxy Buds 3 Pro': '/assets/samsung/galaxy-buds-3-pro.png',
  
  // Accessories
  'MagSafe Charger': '/images/magsafe.png',
};

async function fixImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apple-store');
    console.log('✅ Connected to MongoDB');
    
    let updated = 0;
    
    for (const [productName, imagePath] of Object.entries(imageMap)) {
      const result = await Product.updateOne(
        { 'name.en': productName },
        { $set: { thumbnail: imagePath, image: imagePath } }
      );
      if (result.modifiedCount > 0) {
        console.log(`✅ Updated: ${productName} → ${imagePath}`);
        updated++;
      }
    }
    
    console.log(`\n✅ Updated ${updated} products`);
    
    // نمایش محصولات برای بررسی
    const products = await Product.find({}, 'name.en thumbnail');
    console.log('\n📦 Current products in DB:');
    products.forEach(p => {
      console.log(`  - ${p.name.en}: ${p.thumbnail || '❌ no image'}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

fixImages();
