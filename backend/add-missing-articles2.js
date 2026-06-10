import mongoose from 'mongoose';
import Article from './models/Article.js';
import dotenv from 'dotenv';
dotenv.config();

const missingArticles = [
  {
    slug: '5-galaxy-ai-tips-content-creators',
    brand: 'Samsung',
    title: { 
      fa: '۵ ترفند هوش مصنوعی گلکسی برای تولیدکنندگان محتوا', 
      en: '5 Galaxy AI Tips for Content Creators' 
    },
    content: { 
      fa: `
        <h1>۵ ترفند هوش مصنوعی گلکسی برای تولیدکنندگان محتوا</h1>
        <p>سامسونگ با گلکسی S24 اولترا، قابلیت‌های هوش مصنوعی فوق‌العاده‌ای را ارائه داده که برای تولیدکنندگان محتوا بسیار کاربردی است.</p>
        
        <h2>۱. Circle to Search</h2>
        <p>با دایره کشیدن روی هر چیزی در صفحه، می‌توانید آن را جستجو کنید. برای پیدا کردن ایده‌های طراحی و محتوا عالی است.</p>
        
        <h2>۲. Generative Edit</h2>
        <p>ویرایش هوشمند عکس‌ها با هوش مصنوعی. حذف اشیاء ناخواسته، جابجایی سوژه و پر کردن پس‌زمینه به صورت هوشمند.</p>
        
        <h2>۳. Live Translate</h2>
        <p>ترجمه زنده تماس‌ها و پیام‌ها به ۱۳ زبان مختلف. برای همکاری با تولیدکنندگان بین‌المللی ایده‌آل است.</p>
        
        <h2>۴. Note Assist</h2>
        <p>خلاصه‌سازی خودکار یادداشت‌ها، قالب‌بندی هوشمند و ترجمه یک‌کلیک. برای پژوهش و تولید محتوا بسیار مفید.</p>
        
        <h2>۵. Transcript Assist</h2>
        <p>تبدیل خودکار فایل‌های صوتی به متن، خلاصه‌سازی و ترجمه. برای پادکست‌ها و مصاحبه‌ها عالی است.</p>
        
        <h3>نتیجه‌گیری</h3>
        <p>گلکسی S24 اولترا با این قابلیت‌ها، ابزاری قدرتمند برای تولیدکنندگان محتوا است.</p>
      `,
      en: `
        <h1>5 Galaxy AI Tips for Content Creators</h1>
        <p>Samsung's Galaxy S24 Ultra offers incredible AI features that are very useful for content creators.</p>
        
        <h2>1. Circle to Search</h2>
        <p>Circle anything on your screen to search for it. Perfect for finding design and content ideas.</p>
        
        <h2>2. Generative Edit</h2>
        <p>AI-powered photo editing. Remove unwanted objects, move subjects, and intelligently fill backgrounds.</p>
        
        <h2>3. Live Translate</h2>
        <p>Real-time translation of calls and messages into 13 languages. Ideal for collaborating with international creators.</p>
        
        <h2>4. Note Assist</h2>
        <p>Automatic note summarization, smart formatting, and one-click translation. Great for research and content production.</p>
        
        <h2>5. Transcript Assist</h2>
        <p>Automatic transcription of audio files to text, summarization, and translation. Perfect for podcasts and interviews.</p>
        
        <h3>Conclusion</h3>
        <p>The Galaxy S24 Ultra is a powerful tool for content creators with these AI capabilities.</p>
      `
    },
    cover: '/assets/hero-articlepage/galaxy-s24.png',
    gallery: ['/assets/hero-articlepage/galaxy-s24.png', '/assets/hero-articlepage/galaxy-s24-plus.png'],
    readTime: 8,
    tags: ['Samsung', 'Galaxy', 'AI', 'Content Creator'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'tab-s10-ultra-vs-ipad-pro-m4',
    brand: 'Samsung',
    title: { 
      fa: 'مقایسه تبلت S10 اولترا vs آیپد پرو M4', 
      en: 'Tab S10 Ultra vs iPad Pro M4 Comparison' 
    },
    content: { 
      fa: `
        <h1>مقایسه تبلت S10 اولترا vs آیپد پرو M4</h1>
        <p>رقابت سنگین بین دو غول تکنولوژی: سامسونگ و اپل.</p>
        
        <h2>مشخصات فنی مقایسه</h2>
        <table border="1">
          <tr><th>ویژگی</th><th>Tab S10 Ultra</th><th>iPad Pro M4</th></tr>
          <tr><td>پردازنده</td><td>MediaTek Dimensity 9300+</td><td>Apple M4</td></tr>
          <tr><td>رم</td><td>12/16 گیگابایت</td><td>8/16 گیگابایت</td></tr>
          <tr><td>نمایشگر</td><td>۱۴.۶ اینچ Dynamic AMOLED 2X</td><td>۱۳ اینچ Ultra Retina XDR</td></tr>
          <tr><td>نرخ بروزرسانی</td><td>۱۲۰ هرتز</td><td>۱۲۰ هرتز ProMotion</td></tr>
          <tr><td>قلم</td><td>S Pen (رایگان)</td><td>Apple Pencil Pro (جداگانه)</td></tr>
          <tr><td>قیمت پایه</td><td>$۱۱۹۹</td><td>$۱۲۹۹</td></tr>
        </table>
        
        <h2>کدام را بخریم؟</h2>
        <p>اگر طراح یا تولیدکننده محتوای حرفه‌ای هستید و به نرم‌افزارهای اختصاصی اپل نیاز دارید، iPad Pro M4 انتخاب بهتری است.</p>
        <p>اگر به دنبال ارزش خرید بالاتر، قلم رایگان و نمایشگر AMOLED هستید، Tab S10 Ultra گزینه عالی‌ای است.</p>
      `,
      en: `
        <h1>Tab S10 Ultra vs iPad Pro M4 Comparison</h1>
        <p>Heavyweight battle between two tech giants: Samsung and Apple.</p>
        
        <h2>Specifications Comparison</h2>
        <table border="1">
          <tr><th>Feature</th><th>Tab S10 Ultra</th><th>iPad Pro M4</th></tr>
          <tr><td>Processor</td><td>MediaTek Dimensity 9300+</td><td>Apple M4</td></tr>
          <tr><td>RAM</td><td>12/16GB</td><td>8/16GB</td></tr>
          <tr><td>Display</td><td>14.6" Dynamic AMOLED 2X</td><td>13" Ultra Retina XDR</td></tr>
          <tr><td>Refresh Rate</td><td>120Hz</td><td>120Hz ProMotion</td></tr>
          <tr><td>Stylus</td><td>S Pen (included)</td><td>Apple Pencil Pro (separate)</td></tr>
          <tr><td>Base Price</td><td>$1199</td><td>$1299</td></tr>
        </table>
        
        <h2>Which one to buy?</h2>
        <p>If you're a professional designer or content creator needing Apple-exclusive software, the iPad Pro M4 is better.</p>
        <p>If you want better value, included stylus, and an AMOLED display, the Tab S10 Ultra is an excellent choice.</p>
      `
    },
    cover: '/assets/hero-articlepage/galaxy-s24-plus.png',
    gallery: [],
    readTime: 10,
    tags: ['Samsung', 'Apple', 'Tablet', 'Comparison'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'galaxy-z-flip-6-style-durability-review',
    brand: 'Samsung',
    title: { 
      fa: 'گلکسی زد فلیپ ۶ - بررسی طراحی و دوام', 
      en: 'Galaxy Z Flip 6 - Style and Durability Review' 
    },
    content: { 
      fa: `
        <h1>گلکسی زد فلیپ ۶ - بررسی طراحی و دوام</h1>
        <p>سامسونگ گلکسی زد فلیپ ۶ با طراحی شیک و بهبود دوام، یکی از جذاب‌ترین گوشی‌های تاشوی بازار است.</p>
        
        <h2>طراحی</h2>
        <p>بدنه فلزی با لولا بهبود یافته، صفحه نمایش بیرونی بزرگتر ۳.۴ اینچی، وزن ۱۸۷ گرم.</p>
        
        <h2>دوام</h2>
        <p>استاندارد IP48 برای مقاومت در برابر گرد و غبار، لولای جدید با ۲۰۰٬۰۰۰ بار باز و بسته شدن.</p>
        
        <h2>قیمت</h2>
        <p>قیمت پایه: ۱۰۹۹ دلار</p>
      `,
      en: `
        <h1>Galaxy Z Flip 6 - Style and Durability Review</h1>
        <p>Samsung Galaxy Z Flip 6 with stylish design and improved durability is one of the most attractive foldable phones.</p>
        
        <h2>Design</h2>
        <p>Metal body with improved hinge, larger 3.4-inch cover display, 187g weight.</p>
        
        <h2>Durability</h2>
        <p>IP48 dust resistance rating, new hinge rated for 200,000 folds.</p>
        
        <h2>Price</h2>
        <p>Base price: $1099</p>
      `
    },
    cover: '/assets/hero-articlepage/download.jpg',
    gallery: [],
    readTime: 7,
    tags: ['Samsung', 'Galaxy', 'Foldable', 'Z Flip'],
    author: 'مدیر سایت',
    publishDate: new Date()
  },
  {
    slug: 'iphone-vs-samsung-camera-battle-2025',
    brand: 'Comparison',
    title: { 
      fa: 'جنگ دوربین: آیفون ۱۷ پرو مکس vs گلکسی S24 اولترا ۲۰۲۵', 
      en: 'Camera Battle: iPhone 17 Pro Max vs Galaxy S24 Ultra 2025' 
    },
    content: { 
      fa: `
        <h1>جنگ دوربین: آیفون ۱۷ پرو مکس vs گلکسی S24 اولترا</h1>
        <p>مقایسه دوربین دو پرچمدار ۲۰۲۵: اپل و سامسونگ.</p>
        
        <h2>مشخصات دوربین</h2>
        <table border="1">
          <tr><th>ویژگی</th><th>iPhone 17 Pro Max</th><th>Galaxy S24 Ultra</th></tr>
          <tr><td>اصلی</td><td>48MP f/1.78</td><td>200MP f/1.7</td></tr>
          <tr><td>اولتراواید</td><td>12MP f/2.2</td><td>12MP f/2.2</td></tr>
          <tr><td>تله‌فوتو</td><td>12MP (5x)</td><td>50MP (5x) + 10MP (10x)</td></tr>
          <tr><td>ویدیو</td><td>8K HDR</td><td>8K</td></tr>
        </table>
        
        <h3>نتیجه‌گیری</h3>
        <p>دوربین سامسونگ برای عکاسی با زوم بالا و جزئیات بیشتر بهتر است. دوربین آیفون برای رنگ‌های طبیعی و فیلمبرداری حرفه‌تری مناسب است.</p>
      `,
      en: `
        <h1>Camera Battle: iPhone 17 Pro Max vs Galaxy S24 Ultra 2025</h1>
        <p>Camera comparison of 2025 flagships: Apple vs Samsung.</p>
        
        <h2>Camera Specs</h2>
        <table border="1">
          <tr><th>Feature</th><th>iPhone 17 Pro Max</th><th>Galaxy S24 Ultra</th></tr>
          <tr><td>Main</td><td>48MP f/1.78</td><td>200MP f/1.7</td></tr>
          <tr><td>Ultrawide</td><td>12MP f/2.2</td><td>12MP f/2.2</td></tr>
          <tr><td>Telephoto</td><td>12MP (5x)</td><td>50MP (5x) + 10MP (10x)</td></tr>
          <tr><td>Video</td><td>8K HDR</td><td>8K</td></tr>
        </table>
        
        <h3>Conclusion</h3>
        <p>Samsung's camera is better for zoom photography and more details. iPhone is better for natural colors and professional video recording.</p>
      `
    },
    cover: '/assets/hero-articlepage/galaxy-s24-plus.png',
    gallery: [],
    readTime: 9,
    tags: ['iPhone', 'Samsung', 'Camera', 'Comparison'],
    author: 'مدیر سایت',
    publishDate: new Date()
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apple-store');
    console.log('✅ Connected to MongoDB');
    
    let added = 0;
    
    for (const article of missingArticles) {
      const existing = await Article.findOne({ slug: article.slug });
      if (!existing) {
        await Article.create(article);
        console.log(`✅ Added: ${article.slug}`);
        added++;
      } else {
        console.log(`⏩ Already exists: ${article.slug}`);
      }
    }
    
    console.log(`\n✅ Added ${added} new articles`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seed();
