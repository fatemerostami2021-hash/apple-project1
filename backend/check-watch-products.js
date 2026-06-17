import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

async function checkWatchProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // جستجوی تمام محصولات Apple Watch
    const watchProducts = await Product.find({
      $or: [
        { brand: 'Apple', category: 'Watch' },
        { name: { $regex: 'Watch', $options: 'i' } },
        { slug: { $regex: 'watch', $options: 'i' } }
      ]
    }, 'slug name brand category thumbnail');

    console.log('⌚ محصولات Apple Watch در دیتابیس:');
    console.log('');

    if (watchProducts.length === 0) {
      console.log('❌ هیچ محصول Apple Watch در دیتابیس وجود ندارد!');
    } else {
      watchProducts.forEach((p, i) => {
        console.log(`  ${i+1}. ${p.name?.en || p.name || 'بدون نام'}`);
        console.log(`     slug: ${p.slug}`);
        console.log(`     brand: ${p.brand}`);
        console.log(`     category: ${p.category}`);
        console.log(`     thumbnail: ${p.thumbnail || '❌ خالی'}`);
        console.log('');
      });
    }

    console.log(`📊 تعداد کل: ${watchProducts.length} محصول`);

    // همچنین چک کن چند محصول اپل در کل داری
    const appleCount = await Product.countDocuments({ brand: 'Apple' });
    console.log(`\n🍎 تعداد کل محصولات اپل: ${appleCount}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

checkWatchProducts();
