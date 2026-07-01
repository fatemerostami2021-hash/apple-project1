import mongoose from 'mongoose';

mongoose.set('autoIndex', false);

const LOCAL_URI = 'mongodb://localhost:27017/apple-db';
const ATLAS_URI = 'mongodb+srv://rostamifatemeh963_db_user:fatemeh2994@cluster0.logyt0s.mongodb.net/apple_store';

async function migrate() {
  try {
    console.log('🔌 اتصال به لوکال...');
    const local = await mongoose.createConnection(LOCAL_URI);
    console.log('✅ اتصال به لوکال برقرار شد');

    console.log('🔌 اتصال به Atlas...');
    const atlas = await mongoose.createConnection(ATLAS_URI);
    console.log('✅ اتصال به Atlas برقرار شد');

    // دریافت مقالات از لوکال — استفاده از db
    const docs = await local.db.collection('articles').find({}).toArray();
    console.log('📰 مقالات در لوکال:', docs.length);

    // حذف فیلد id از هر سند
    const cleanDocs = docs.map(d => {
      const { id, _id, ...rest } = d;
      return rest;
    });

    // حذف ایندکس id_1 قبل از insert
    try {
      await atlas.db.collection('articles').dropIndex('id_1');
      console.log('🗑️  ایندکس id_1 حذف شد');
    } catch (e) {
      console.log('⚠️ ایندکس id_1 وجود ندارد');
    }

    // پاک کردن مقالات موجود در Atlas
    await atlas.db.collection('articles').deleteMany({});
    console.log('🗑️  مقالات قبلی Atlas حذف شد');

    // درج مقالات جدید
    const result = await atlas.db.collection('articles').insertMany(cleanDocs);
    console.log('✅', result.insertedCount, 'مقاله به Atlas منتقل شد');

    await mongoose.disconnect();
    console.log('🎉 مهاجرت کامل شد!');
    process.exit(0);
  } catch (err) {
    console.error('❌ خطا:', err.message);
    process.exit(1);
  }
}

migrate();
