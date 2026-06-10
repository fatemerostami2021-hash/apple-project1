import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apple-store')
  .then(async () => {
    const samsung = await Product.find({ brand: 'Samsung' });
    console.log('Samsung products in DB:');
    console.log(`Total: ${samsung.length} products\n`);
    samsung.forEach(p => {
      console.log(`  📱 ${p.name?.en}`);
      console.log(`     description: ${p.description ? '✅ has description' : '❌ missing'}`);
      console.log(`     thumbnail: ${p.thumbnail || '❌ missing'}\n`);
    });
    process.exit();
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
