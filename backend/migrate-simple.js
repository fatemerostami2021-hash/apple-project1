const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const Article = require('./models/Article');

// خواندن فایل articlesData.js به صورت متن
const articlesDataContent = fs.readFileSync('../src/data/articlesData.js', 'utf8');

// استخراج آرایه articlesData با استفاده از eval (فقط برای migrate)
const articlesDataMatch = articlesDataContent.match(/export const articlesData = (\[[\s\S]*?\]);/);
if (!articlesDataMatch) {
  console.error('❌ Could not find articlesData array');
  process.exit(1);
}

// حذف import عکس‌ها و جایگزینی با string ساده
let cleanData = articlesDataMatch[1];
// replace image imports with placeholder strings
cleanData = cleanData.replace(/import\s+\w+\s+from\s+['"][^'"]+['"]\s*;?\n?/g, '');
// replace variable references with placeholder strings
cleanData = cleanData.replace(/\bip\d+pm\b|\biphone\d+\b|\bheroEndframe\b|\bs\d+Ultra\b|\bs\d+Plus\b|\bzFlip6\b|\bzFold6\b|\btabS10Ultra\b/g, '"/images/placeholder.jpg"');

let articlesData;
try {
  // استفاده از Function به جای eval (ایمن‌تر)
  const getData = new Function('return ' + cleanData);
  articlesData = getData();
} catch (error) {
  console.error('❌ Error parsing data:', error.message);
  process.exit(1);
}

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing articles
    await Article.deleteMany({});
    console.log('🗑️ Cleared existing articles');
    
    // Insert all articles
    const result = await Article.insertMany(articlesData);
    console.log(`✅ ${result.length} articles migrated successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

migrate();