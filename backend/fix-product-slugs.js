import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema, 'products');

async function fixSlugs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // پیدا کردن محصولات بدون slug
    const products = await Product.find({ slug: { $exists: false } });
    console.log('📦 محصولات بدون slug:', products.length);

    if (products.length === 0) {
      console.log('✅ همه محصولات slug دارند!');
      await mongoose.disconnect();
      return;
    }

    for (const product of products) {
      // ساخت slug از نام انگلیسی
      const nameEn = product.name?.en || product.name || 'product';
      const slug = nameEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      await Product.updateOne(
        { _id: product._id },
        { $set: { slug } }
      );
      console.log('✅ اصلاح شد:', slug, 'برای', nameEn);
    }

    console.log(`\n✅ ${products.length} محصول به‌روزرسانی شد`);

    // چک نهایی
    const count = await Product.countDocuments({ slug: { $exists: true } });
    console.log('📊 تعداد محصولات با slug:', count);

    await mongoose.disconnect();
    console.log('✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
  }
}

fixSlugs();
