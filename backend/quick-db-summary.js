import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function summary() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apple-store';
    console.log(`🔗 اتصال به: ${uri}\n`);
    
    await mongoose.connect(uri);
    console.log('✅ اتصال برقرار شد!\n');

    // بررسی وجود مدل‌ها
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📂 کالکشن‌های موجود:');
    collections.forEach(c => console.log(`   - ${c.name}`));

    // شمارش هر کالکشن
    console.log('\n📊 تعداد رکوردها:');
    for (const collection of collections) {
      const count = await mongoose.connection.db.collection(collection.name).countDocuments();
      console.log(`   ${collection.name}: ${count}`);
    }

    await mongoose.disconnect();
    console.log('\n✅ بررسی کامل شد!');

  } catch (error) {
    console.error('❌ خطا:', error.message);
    process.exit(1);
  }
}

summary();
