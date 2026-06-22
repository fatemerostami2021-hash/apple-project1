import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

async function addArticleSlug() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // اضافه کردن articleSlug به محصول
    const result = await Product.updateOne(
      { slug: 'samsung-galaxy-s26-ultra-case' },
      { 
        $set: { 
          articleSlug: 'samsung-galaxy-s26-ultra-case-review'
        } 
      }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ articleSlug به محصول اضافه شد');
    } else {
      console.log('⚠️ محصول پیدا نشد یا قبلاً articleSlug داشت');
    }

    // بررسی مجدد
    const product = await Product.findOne({ slug: 'samsung-galaxy-s26-ultra-case' });
    console.log('📰 articleSlug:', product?.articleSlug || '❌ ندارد');

    await mongoose.disconnect();
    console.log('✅ عملیات کامل شد!');
  } catch (error) {
    console.error('❌ خطا:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

addArticleSlug();
