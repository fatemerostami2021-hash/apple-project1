import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

await mongoose.connect(process.env.MONGODB_URI);

// محصولات لوازم جانبی با subCategory
const products = await Product.find({ category: 'Accessory' });

console.log('📦 محصولات لوازم جانبی با دسته‌بندی:');
console.log('─────────────────────────────────');

// گروه‌بندی بر اساس subCategory
const groups = {};
products.forEach(p => {
  const sub = p.subCategory || 'نامشخص';
  if (!groups[sub]) groups[sub] = [];
  groups[sub].push(p);
});

Object.keys(groups).forEach(sub => {
  console.log(`\n📂 ${sub}: ${groups[sub].length} محصول`);
  groups[sub].forEach((p, i) => {
    console.log(`  ${i+1}. ${p.name?.en || p.name}`);
  });
});

await mongoose.disconnect();
