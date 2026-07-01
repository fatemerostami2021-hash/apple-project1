import mongoose from 'mongoose';

const LOCAL_URI = 'mongodb://localhost:27017/apple-db';
const ATLAS_URI = 'mongodb+srv://rostamifatemeh963_db_user:fatemeh2994@cluster0.logyt0s.mongodb.net/apple_store';

async function migrate() {
  try {
    console.log('🔌 Connecting to local...');
    const localConn = await mongoose.createConnection(LOCAL_URI);
    console.log('✅ Local connected');

    console.log('🔌 Connecting to Atlas...');
    const atlasConn = await mongoose.createConnection(ATLAS_URI);
    console.log('✅ Atlas connected');

    // استفاده از connection.db
    const localDb = localConn.db;
    const atlasDb = atlasConn.db;

    // دریافت مقالات از لوکال
    const docs = await localDb.collection('articles').find({}).toArray();
    console.log(`📰 Found ${docs.length} articles in local`);

    if (docs.length === 0) {
      console.log('⚠️ No articles found, exiting');
      process.exit(0);
    }

    // حذف فیلد id از هر سند
    const cleanDocs = docs.map(d => {
      const { id, _id, ...rest } = d;
      return rest;
    });

    // حذف ایندکس‌های id_1 و slug_1
    try {
      await atlasDb.collection('articles').dropIndex('id_1');
      console.log('🗑️ Dropped id_1 index');
    } catch (e) {
      console.log('⚠️ id_1 index not found');
    }

    try {
      await atlasDb.collection('articles').dropIndex('slug_1');
      console.log('🗑️ Dropped slug_1 index');
    } catch (e) {
      console.log('⚠️ slug_1 index not found');
    }

    // پاک کردن مقالات موجود در Atlas
    await atlasDb.collection('articles').deleteMany({});
    console.log('🗑️ Cleared existing articles in Atlas');

    // درج همه مقالات
    const result = await atlasDb.collection('articles').insertMany(cleanDocs);
    console.log(`✅ ${result.insertedCount} articles migrated to Atlas`);

    // تأیید تعداد
    const count = await atlasDb.collection('articles').countDocuments();
    console.log(`📊 Atlas now has ${count} articles`);

    await mongoose.disconnect();
    console.log('🎉 Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

migrate();
