import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

await mongoose.connect(process.env.MONGODB_URI);

const products = await Product.find({ category: 'Accessory' });

console.log('📦 محصولات لوازم جانبی:', products.length);
console.log('─────────────────────────────────');

let withArticle = 0;
let withoutArticle = 0;

products.forEach((p, i) => {
  const hasArticle = p.articleSlug ? '✅' : '❌';
  if (p.articleSlug) withArticle++;
  else withoutArticle++;
  
  console.log(`  ${i+1}. ${p.name?.en || p.name} ${hasArticle}`);
  if (p.articleSlug) {
    console.log(`     → ${p.articleSlug}`);
  }
});

console.log(`\n📊 خلاصه:`);
console.log(`  ✅ با مقاله: ${withArticle}`);
console.log(`  ❌ بدون مقاله: ${withoutArticle}`);

await mongoose.disconnect();
