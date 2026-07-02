import fetch from 'node-fetch';

async function checkAPI() {
  try {
    // ۱. بررسی API عمومی
    const publicRes = await fetch('http://localhost:5000/api/articles');
    const publicData = await publicRes.json();
    console.log(`📰 API عمومی: ${publicData.data?.length || 0} مقاله`);
    
    // ۲. بررسی API ادمین (نیاز به توکن)
    const adminRes = await fetch('http://localhost:5000/api/admin/articles', {
      headers: {
        'Authorization': 'Bearer fatemeh963' // توکن پیش‌فرض
      }
    });
    const adminData = await adminRes.json();
    console.log(`🔐 API ادمین: ${adminData.data?.length || 0} مقاله`);
    
    // ۳. نمایش نمونه
    if (publicData.data && publicData.data.length > 0) {
      console.log('\n📋 نمونه مقاله:');
      const sample = publicData.data[0];
      console.log(`   عنوان: ${sample.title?.en || sample.title}`);
      console.log(`   اسلاگ: ${sample.slug}`);
      console.log(`   برند: ${sample.brand}`);
    }
  } catch (error) {
    console.error('❌ خطا:', error.message);
  }
}

checkAPI();
