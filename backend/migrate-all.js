const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: './backend/.env' });

// اتصال به مدل Article در بک‌اند
const Article = require('./models/Article');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // خواندن فایل articlesData اصلی از فرانت‌اند
    const articlesDataPath = path.join(__dirname, '..', 'src', 'data', 'articlesData.js');
    let fileContent = fs.readFileSync(articlesDataPath, 'utf8');

    // تکنیک: پیدا کردن محتوای آرایه اصلی با استفاده از regex
    // این روش import ها و متغیرهای عکس را نادیده می‌گیرد
    const match = fileContent.match(/export const articlesData = (\[[\s\S]*?\]);/);
    if (!match) {
      throw new Error('آرایه articlesData در فایل پیدا نشد.');
    }

    // تبدیل رشته آرایه به یک آبجکت قابل استفاده در جاوااسکریپت
    // هشدار: استفاده از ()new Function مشابه eval است اما در محیط امن اسکریپت نویسی ما بلامانع است.
    const getData = new Function('return ' + match[1]);
    let articlesData = getData();

    // پاک کردن دیتابیس قبل از درج اطلاعات جدید
    await Article.deleteMany({});
    console.log('🗑️ Database cleared.');

    // درج آرایه کامل مقالات در دیتابیس
    const result = await Article.insertMany(articlesData);
    console.log(`✅ Migration completed! ${result.length} articles added to database.`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
};

migrate();