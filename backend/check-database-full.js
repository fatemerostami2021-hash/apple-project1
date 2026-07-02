import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// ============================================================
// 📦 مدل‌ها - با پسوند .js
// ============================================================
import Product from './models/Product.js';
import Article from './models/Article.js';
import Slide from './models/Slide.js';
import User from './models/User.js';
import Order from './models/Order.js';
import Comment from './models/Comment.js';

// ============================================================
// 🔍 تابع نمایش اطلاعات
// ============================================================
const printSection = (title, data) => {
  console.log('\n' + '='.repeat(70));
  console.log(`📌 ${title}`);
  console.log('='.repeat(70));
  console.log(data);
};

const printCount = (title, count) => {
  console.log(`   ${title}: ${count} مورد`);
};

// ============================================================
// 🚀 تابع اصلی
// ============================================================
async function checkDatabase() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apple-store';
    console.log(`🔗 اتصال به: ${uri}\n`);
    
    await mongoose.connect(uri);
    console.log('✅ اتصال به دیتابیس برقرار شد!\n');

    // ============================================================
    // 📊 محصولات
    // ============================================================
    const products = await Product.find().lean();
    const appleProducts = products.filter(p => p.brand === 'Apple');
    const samsungProducts = products.filter(p => p.brand === 'Samsung');
    
    console.log('📱 محصولات:');
    printCount('کل محصولات', products.length);
    printCount('محصولات اپل', appleProducts.length);
    printCount('محصولات سامسونگ', samsungProducts.length);
    
    const productsWithArticle = products.filter(p => p.articleSlug || p.article);
    printCount('محصولات دارای مقاله', productsWithArticle.length);
    printCount('محصولات بدون مقاله', products.length - productsWithArticle.length);
    
    console.log('\n📋 لیست محصولات:');
    products.forEach((p, i) => {
      const hasArticle = p.articleSlug || p.article ? '✅' : '❌';
      console.log(`   ${i+1}. ${p.title?.en || p.title || 'بدون نام'} (${p.brand}) ${hasArticle}`);
    });

    // ============================================================
    // 📰 مقالات
    // ============================================================
    const articles = await Article.find().lean();
    console.log('\n📰 مقالات:');
    printCount('کل مقالات', articles.length);
    
    const articlesWithProduct = articles.filter(a => a.productSlug || a.productId);
    printCount('مقالات دارای محصول', articlesWithProduct.length);
    
    console.log('\n📋 لیست مقالات:');
    articles.forEach((a, i) => {
      const hasProduct = a.productSlug || a.productId ? '✅' : '❌';
      console.log(`   ${i+1}. ${a.title?.en || a.title || 'بدون عنوان'} ${hasProduct}`);
    });

    // ============================================================
    // 🎠 اسلایدها
    // ============================================================
    const slides = await Slide.find().lean();
    console.log('\n🎠 اسلایدها:');
    printCount('کل اسلایدها', slides.length);
    printCount('اسلایدهای فعال', slides.filter(s => s.active).length);
    
    console.log('\n📋 لیست اسلایدها:');
    slides.forEach((s, i) => {
      const status = s.active ? '✅ فعال' : '❌ غیرفعال';
      console.log(`   ${i+1}. ${s.title?.en || s.title || 'بدون عنوان'} (${s.brand || 'بدون برند'}) - ${status}`);
    });

    // ============================================================
    // 👤 کاربران
    // ============================================================
    const users = await User.find().lean();
    console.log('\n👤 کاربران:');
    printCount('کل کاربران', users.length);
    
    const admins = users.filter(u => u.role === 'admin');
    printCount('ادمین‌ها', admins.length);
    printCount('کاربران عادی', users.filter(u => u.role === 'user').length);
    
    console.log('\n📋 لیست کاربران:');
    users.forEach((u, i) => {
      console.log(`   ${i+1}. ${u.username || u.email} (${u.role}) - ${u.email}`);
    });

    // ============================================================
    // 🛒 سفارشات
    // ============================================================
    const orders = await Order.find().lean();
    console.log('\n🛒 سفارشات:');
    printCount('کل سفارشات', orders.length);
    
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    console.log(`   💰 مجموع درآمد: $${totalRevenue.toLocaleString()}`);
    
    console.log('\n📋 لیست سفارشات:');
    orders.forEach((o, i) => {
      console.log(`   ${i+1}. سفارش #${o._id.toString().slice(-6)} - $${o.total?.toLocaleString() || 0} (${o.status || 'نامشخص'})`);
    });

    // ============================================================
    // 💬 نظرات
    // ============================================================
    const comments = await Comment.find().lean();
    console.log('\n💬 نظرات:');
    printCount('کل نظرات', comments.length);
    
    const approvedComments = comments.filter(c => c.status === 'approved');
    printCount('نظرات تایید شده', approvedComments.length);
    printCount('نظرات در انتظار تایید', comments.filter(c => c.status === 'pending').length);

    // ============================================================
    // 📊 خلاصه نهایی
    // ============================================================
    console.log('\n' + '='.repeat(70));
    console.log('📊 خلاصه نهایی دیتابیس');
    console.log('='.repeat(70));
    console.log(`
   📱 محصولات:      ${products.length}
   📰 مقالات:       ${articles.length}
   🎠 اسلایدها:     ${slides.length}
   👤 کاربران:      ${users.length}
   🛒 سفارشات:      ${orders.length}
   💬 نظرات:        ${comments.length}
   💰 مجموع درآمد:  $${totalRevenue.toLocaleString()}
    `);

    const connected = products.filter(p => p.articleSlug || p.article);
    const percent = products.length > 0 ? Math.round((connected.length / products.length) * 100) : 0;
    console.log(`🔗 اتصال محصولات به مقالات: ${connected.length} از ${products.length} محصول متصل هستند (${percent}%)`);

    await mongoose.disconnect();
    console.log('\n✅ بررسی کامل شد!');

  } catch (error) {
    console.error('❌ خطا:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// ============================================================
// 🚀 اجرا
// ============================================================
checkDatabase();
