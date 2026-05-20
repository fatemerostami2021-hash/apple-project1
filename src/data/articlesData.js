// src/data/articlesData.js

// ========== Assets آیفون (مسیرهای فعلی تو) ==========
import ip17pm from "../assets/iphone/iphone-17-pro-max.png";
import ip16pm from "../assets/iphone/iphone-16-pro-max.png";
import ip15pm from "../assets/iphone/iphone-15-pro-max.png";
import ip14pm from "../assets/iphone/iphone-14-pro-max.png";
import ip13pm from "../assets/iphone/iphone-13-pro-max.png";
import ip12pm from "../assets/iphone/iphone-12-pro-max.png";

// ========== Assets سامسونگ (مسیرها رو با پروژه خودت تطابق بده) ==========
// اگه این فایل‌ها رو نداری، می‌تونی از همون assets آیفون استفاده کنی یا خالی بذاری
// پیشنهاد می‌کنم این فایل‌ها رو در src/assets/samsung/ قرار بدی
import s24Ultra from "../assets/samsung/galaxy-s24-ultra.png";
import s24Plus from "../assets/samsung/galaxy-s24-plus.png";
import s24 from "../assets/samsung/galaxy-s24.png";
import zFlip6 from "../assets/samsung/galaxy-z-flip6.png";
import zFold6 from "../assets/samsung/galaxy-z-fold6.png";
import tabS10Ultra from "../assets/samsung/galaxy-tab-s10-ultra.png";

// ========== اگر asset سامسونگ نداری، از این استفاده کن (Fallback) ==========
// import s24Ultra from "../assets/iphone/iphone-15-pro-max.png";
// import s24Plus from "../assets/iphone/iphone-16-pro-max.png";

// ========== مقالات ==========
export const articlesData = [
  // ========== مقالات آیفون ==========
  {
    id: "iphone-17-pro-max",
    brand: "Apple",
    slug: "iphone-17-pro-max",
    cover: ip17pm,
    title: {
      fa: "آیفون ۱۷ پرو مکس: انقلابی در قدرت و تجربه کاربری",
      en: "iPhone 17 Pro Max: A Revolution in Power and User Experience",
    },
    excerpt: {
      fa: "نگاهی عمیق به آیفون ۱۷ پرو مکس با پردازنده نسل آینده A18 و سیستم دوربین حرفه‌ای ۴۸ مگاپیکسلی. قدرتمندترین آیفون تاریخ!",
      en: "An in-depth look at the iPhone 17 Pro Max with next-gen A18 processor and pro 48MP camera system. The most powerful iPhone ever!",
    },
    content: {
      fa: `
## آیفون ۱۷ پرو مکس: اوج مهندسی اپل

آیفون ۱۷ پرو مکس با تراشه A18 Bionic عملکردی فوق‌العاده سریع و بهینه ارائه می‌دهد. این تراشه با معماری ۲ نانومتری، ۳۰٪ سریعتر از نسل قبل و ۲۰٪ کم‌مصرف‌تر است.

### نمایشگر
نمایشگر ۶.۹ اینچی LTPO Super Retina XDR با نرخ نوسازی ۱۲۰ هرتز و روشنایی ۳۰۰۰ نیت در فضای باز تجربه‌ای بی‌نظیر فراهم می‌کند.

### دوربین
سیستم دوربین چهارگانه:
- اصلی ۴۸ مگاپیکسل با گشودگی دیافراگم f/1.6
- اولترا واید ۴۸ مگاپیکسل با زاویه ۱۲۰ درجه
- تله‌فوتو ۱۲ مگاپیکسل با زوم اپتیکال ۶ برابر
- Lidar اسکنر پیشرفته

### باتری و شارژ
باتری ۵۰۰۰ میلی‌آمپر ساعتی با شارژ سریع ۳۵ واتی (۵۰٪ در ۲۰ دقیقه)

### قیمت
قیمت پایه: ۱۲۹۹ دلار
`,
      en: `
## iPhone 17 Pro Max: The Peak of Apple Engineering

The iPhone 17 Pro Max features the A18 Bionic chip for ultra-fast and efficient performance...

### Display
6.9-inch LTPO Super Retina XDR with 120Hz ProMotion and 3000 nits peak brightness.

### Camera
Quad-camera system: 48MP main, 48MP ultrawide, 12MP telephoto with 6x optical zoom, and advanced LiDAR scanner.

### Battery & Charging
5000mAh battery with 35W fast charging (50% in 20 minutes).

### Price
Starting at $1299
`,
    },
    readTime: 6,
    likes: 342,
    isTrending: true,
    publishDate: "2025-02-10",
    tags: ["آیفون", "پرو مکس", "A18", "دوربین"],
  },
  {
    id: "iphone-16-pro-max",
    brand: "Apple",
    slug: "iphone-16-pro-max",
    cover: ip16pm,
    title: {
      fa: "آیفون ۱۶ پرو مکس: تعادل قدرت و طراحی",
      en: "iPhone 16 Pro Max: Balance of Power and Design",
    },
    excerpt: {
      fa: "ترکیبی از عملکرد قدرتمند تراشه A17 Pro، طراحی مدرن تیتانیومی و دوربین پیشرفته ۴۸ مگاپیکسلی.",
      en: "A blend of powerful A17 Pro performance, modern titanium design, and advanced 48MP camera.",
    },
    content: {
      fa: "متن کامل مقاله آیفون ۱۶ پرو مکس...",
      en: "Full article content for iPhone 16 Pro Max...",
    },
    readTime: 5,
    likes: 278,
    isTrending: true,
    publishDate: "2025-02-05",
    tags: ["آیفون", "پرو مکس", "A17 Pro", "تیتانیوم"],
  },
  {
    id: "iphone-15-pro-max",
    brand: "Apple",
    slug: "iphone-15-pro-max",
    cover: ip15pm,
    title: {
      fa: "آیفون ۱۵ پرو مکس: آغاز عصر تیتانیوم",
      en: "iPhone 15 Pro Max: The Beginning of Titanium Era",
    },
    excerpt: {
      fa: "سبک‌تر، مقاوم‌تر و مجهز به USB-C. بررسی کامل تغییرات انقلابی این نسل و مقایسه با نسل قبل.",
      en: "Lighter, stronger, and equipped with USB-C. A complete review of this generation's revolutionary changes.",
    },
    content: {
      fa: "متن کامل مقاله آیفون ۱۵ پرو مکس...",
      en: "Full article content for iPhone 15 Pro Max...",
    },
    readTime: 5,
    likes: 421,
    isTrending: true,
    publishDate: "2025-01-28",
    tags: ["آیفون", "تیتانیوم", "USB-C"],
  },
  {
    id: "iphone-14-pro-max",
    brand: "Apple",
    slug: "iphone-14-pro-max",
    cover: ip14pm,
    title: {
      fa: "آیفون ۱۴ پرو مکس: معرفی Dynamic Island",
      en: "iPhone 14 Pro Max: Introducing Dynamic Island",
    },
    excerpt: {
      fa: "نوآوری در نمایشگر با Dynamic Island و دوربین ۴۸ مگاپیکسلی. چرا هنوز هم ارزش خرید دارد؟",
      en: "Innovation in display with Dynamic Island and 48MP camera. Why is it still worth buying?",
    },
    content: {
      fa: "متن کامل مقاله آیفون ۱۴ پرو مکس...",
      en: "Full article content for iPhone 14 Pro Max...",
    },
    readTime: 4,
    likes: 198,
    isTrending: false,
    publishDate: "2025-01-20",
    tags: ["آیفون", "Dynamic Island", "دوربین ۴۸ مگاپیکسل"],
  },
  {
    id: "iphone-13-pro-max",
    brand: "Apple",
    slug: "iphone-13-pro-max",
    cover: ip13pm,
    title: {
      fa: "آیفون ۱۳ پرو مکس: افسانه باتری",
      en: "iPhone 13 Pro Max: The Battery Legend",
    },
    excerpt: {
      fa: "عمر باتری فوق‌العاده و نمایشگر ProMotion 120 هرتزی. هنوز هم بهترین انتخاب برای گیمینگ؟",
      en: "Exceptional battery life and 120Hz ProMotion display. Still the best choice for gaming?",
    },
    content: {
      fa: "متن کامل مقاله آیفون ۱۳ پرو مکس...",
      en: "Full article content for iPhone 13 Pro Max...",
    },
    readTime: 4,
    likes: 312,
    isTrending: false,
    publishDate: "2025-01-15",
    tags: ["آیفون", "باتری", "گیمینگ", "ProMotion"],
  },
  {
    id: "iphone-12-pro-max",
    brand: "Apple",
    slug: "iphone-12-pro-max",
    cover: ip12pm,
    title: {
      fa: "آیفون ۱۲ پرو مکس: آغاز طراحی مدرن",
      en: "iPhone 12 Pro Max: The Start of Modern Design",
    },
    excerpt: {
      fa: "بازگشت به لبه‌های تخت، پشتیبانی از 5G و نمایشگر OLED. آیا در ۲۰۲۵ همچنان ارزش خرید دارد؟",
      en: "Return to flat edges, 5G support, and OLED display. Is it still worth it in 2025?",
    },
    content: {
      fa: "متن کامل مقاله آیفون ۱۲ پرو مکس...",
      en: "Full article content for iPhone 12 Pro Max...",
    },
    readTime: 4,
    likes: 156,
    isTrending: false,
    publishDate: "2025-01-10",
    tags: ["آیفون", "طراحی مدرن", "5G", "OLED"],
  },

  // ========== مقالات سامسونگ ==========
  {
    id: "s24-ultra-ai-revolution",
    brand: "Samsung",
    slug: "galaxy-s24-ultra-ai-revolution",
    cover: s24Ultra,
    title: {
      fa: "گلکسی S24 اولترا: انقلاب هوش مصنوعی در جیب تو",
      en: "Galaxy S24 Ultra: The AI Revolution in Your Pocket",
    },
    excerpt: {
      fa: "از ترجمه زنده تماس تا ویرایش جادویی عکس؛ ۱۰ قابلیت Galaxy AI که دنیای گوشی هوشمند را تغییر می‌دهند.",
      en: "From live call translation to magic photo editing: 10 Galaxy AI features changing the smartphone world.",
    },
    content: {
      fa: `
## Galaxy AI: نسل جدید هوشمندی

گلکسی S24 اولترا اولین گوشی سامسونگ است که به طور کامل بر پایه هوش مصنوعی طراحی شده.

### ۱۰ قابلیت شگفت‌انگیز Galaxy AI:

1. **ترجمه زنده تماس:** هنگام تماس با فردی به زبان دیگر، ترجمه همزمان صدا و متن
2. **ویرایش جادویی عکس:** حذف یا جابجایی اشیاء در عکس با پرکردن هوشمند پس‌زمینه
3. **خلاصه‌سازی هوشمند:** تبدیل یک صفحه متن به چند نکته کلیدی
4. **تولید استیکر اختصاصی:** از عکس خودت استیکر بساز
5. **ترجمه دایرکت اینستاگرام:** بدون خروج از اپ، پیام‌ها را ترجمه کن
6. **تبدیل سلفی به نقاشی:** تغییر سبک به انیمه، آبرنگ یا مدادی
7. **نویزگیری هوشمند در تماس:** حذف صدای پس‌زمینه در مکالمات
8. **پاسخ‌گویی هوشمند به ایمیل:** پیشنهاد پاسخ بر اساس متن ایمیل
9. **رونوشت خودکار جلسات:** تبدیل صدای جلسه به متن با تشخیص گویندگان
10. **جستجوی دایره‌ای:** با دور زدن هر چیزی روی صفحه، آن را جستجو کن

### سخت‌افزار:
- نمایشگر ۶.۸ اینچی Dynamic AMOLED 2X، ۱۲۰Hz، ۲۶۰۰ nits
- دوربین ۲۰۰ مگاپیکسلی اصلی با زوم اپتیکال ۵ برابر و زوم دیجیتال ۱۰۰ برابر
- باتری ۵۰۰۰ میلی‌آمپر با شارژ ۴۵ وات
- قلم S Pen یکپارچه
`,
      en: "Full Galaxy S24 Ultra review with AI features...",
    },
    readTime: 7,
    likes: 567,
    isTrending: true,
    publishDate: "2025-02-14",
    tags: ["سامسونگ", "هوش مصنوعی", "Galaxy AI", "S24 Ultra", "S Pen"],
  },
  {
    id: "s24-plus-vs-iphone-15-pro-max",
    brand: "Samsung",
    slug: "s24-plus-vs-iphone-15-pro-max-comparison",
    cover: s24Plus,
    title: {
      fa: "نبرد ارزش خرید: S24 پلاس یا آیفون ۱۵ پرو مکس؟",
      en: "Value Battle: S24 Plus or iPhone 15 Pro Max?",
    },
    excerpt: {
      fa: "مقایسه کامل نمایشگر، باتری، دوربین و قیمت. کدام برای نسل جدید به‌صرفه‌تر است؟",
      en: "Complete comparison of display, battery, camera, and price. Which is more cost-effective for the new generation?",
    },
    content: {
      fa: `
## مقایسه مشخصات فنی

| ویژگی | S24 Plus | iPhone 15 Pro Max |
|-------|----------|-------------------|
| نمایشگر | ۶.۷ اینچ Dynamic AMOLED 2X، ۱۲۰Hz، ۲۶۰۰ nits | ۶.۷ اینچ Super Retina XDR، ۱۲۰Hz، ۲۰۰۰ nits |
| پردازنده | Snapdragon 8 Gen 3 | A17 Pro |
| رم | ۱۲ گیگابایت | ۸ گیگابایت |
| حافظه داخلی | ۲۵۶/۵۱۲ گیگ/۱ ترابایت | ۲۵۶/۵۱۲ گیگ/۱ ترابایت |
| باتری | ۴۹۰۰ میلی‌آمپر | ۴۴۴۱ میلی‌آمپر |
| شارژ سریع | ۴۵ وات | ۲۷ وات |
| دوربین اصلی | ۵۰ مگاپیکسل | ۴۸ مگاپیکسل |
| زوم اپتیکال | ۳ برابر | ۵ برابر |
| فوق‌عریض | ۱۲ مگاپیکسل | ۱۲ مگاپیکسل |
| هوش مصنوعی | Galaxy AI (کامل) | Apple Intelligence (در حال توسعه) |
| قلم | ندارد | ندارد |
| قیمت پایه | ~۱۰۰۰ دلار | ~۱۲۰۰ دلار |

## نتیجه نهایی برای نسل Z:
- **تولید محتوای ویدیویی** ← آیفون ۱۵ پرو مکس (ثبات رنگ و کیفیت بهتر)
- **هوش مصنوعی و نمایشگر روشن‌تر** ← S24 Plus
- **باتری و شارژ سریع‌تر** ← S24 Plus
- **ارزش خرید به ازای هر دلار** ← S24 Plus
- **اکوسیستم و امنیت** ← آیفون ۱۵ پرو مکس
`,
      en: "Full comparison between S24 Plus and iPhone 15 Pro Max...",
    },
    readTime: 6,
    likes: 432,
    isTrending: true,
    publishDate: "2025-02-12",
    tags: ["مقایسه", "ارزش خرید", "سامسونگ", "اپل"],
  },
  {
    id: "galaxy-ai-tips-for-creators",
    brand: "Samsung",
    slug: "5-galaxy-ai-tips-content-creators",
    cover: s24,
    title: {
      fa: "۵ ترفند Galaxy AI که محتوای اینستاگرام تو را حرفه‌ای می‌کند",
      en: "5 Galaxy AI Tips That Make Your Instagram Content Professional",
    },
    excerpt: {
      fa: "از حذف مزاحم‌های پس‌زمینه تا ساخت استیکر اختصاصی؛ ترفندهایی که هیچ آیفونی ندارد!",
      en: "From removing photobombers to creating custom stickers; tricks no iPhone has!",
    },
    content: {
      fa: `
## ۵ ترفند هوش مصنوعی سامسونگ برای کریتورها

### ۱. ویرایش جادویی عکس (Generative Edit)
انگشت دیگران رو از عکس گروهی حذف کن، یا یک شی رو جابجا کن - هوش مصنوعی جای خالی رو پر می‌کنه.

### ۲. ترجمه زنده در دایرکت اینستاگرام
بدون خروج از اپ، پیام‌های خارجی رو ترجمه کن.

### ۳. ساخت استیکر از سلفی
عکس خودت رو به استیکر انیمیشنی تبدیل کن و برای استوری استفاده کن.

### ۴. خلاصه‌سازی مقالات طولانی
هر لینکی رو برات خلاصه می‌کنه - دیگه نیازی به خوندن کل مقاله نیست.

### ۵. تغییر سبک نقاشی
سلفی رو به انیمه، آبرنگ یا طرح مدادی تبدیل کن - محتوای منحصربه‌فرد برای اینستاگرام.

✨ نکته حرفه‌ای: همه این قابلیت‌ها به صورت آفلاین هم کار می‌کنند!
`,
      en: "5 detailed AI tips for content creators...",
    },
    readTime: 4,
    likes: 389,
    isTrending: true,
    publishDate: "2025-02-10",
    tags: ["آموزش", "هوش مصنوعی", "اینستاگرام", "ترفند", "کریتور"],
  },
  {
    id: "z-flip6-genz-style",
    brand: "Samsung",
    slug: "z-flip-6-style-durability-review",
    cover: zFlip6,
    title: {
      fa: "Z Flip 6: چرا نسل جدید عاشق این گوشی تاشو شده؟",
      en: "Z Flip 6: Why the New Generation Loves This Foldable?",
    },
    excerpt: {
      fa: "بررسی استایل، دوام ۴۰۰ هزار بار تا شدن، دوربین سلفی خلاقانه و مقایسه با Z Fold 6.",
      en: "Style review, 400k fold durability, creative selfie camera, and comparison with Z Fold 6.",
    },
    content: {
      fa: `
## Z Flip 6: تلفیق استایل و فناوری

### نقاط قوت:
- **طراحی فشرده و شیک:** وقتی تا می‌شود نصف گوشی‌های معمولی
- **FlexCam:** عکس سلفی با دوربین اصلی ۵۰ مگاپیکسلی
- **نمایشگر کاور ۳.۴ اینچی:** پاسخ به پیام بدون باز کردن گوشی
- **دوام ۴۰۰,۰۰۰ بار تا شدن:** حدود ۱۰ سال استفاده روزمره
- **مقاومت در برابر آب IP48**

### نقاط ضعف:
- باتری ۳۷۰۰ میلی‌آمپر (یک روز کاری)
- قیمت بالاتر نسبت به گوشی‌های معمولی

### جمع‌بندی:
اگر استایل و نوآوری برایت مهم‌تر از باتری و قیمت است، Z Flip 6 انتخاب عالی‌ای است.
`,
      en: "Z Flip 6 full review...",
    },
    readTime: 5,
    likes: 234,
    isTrending: false,
    publishDate: "2025-02-05",
    tags: ["تاشو", "سبک زندگی", "سامسونگ", "Z Flip 6"],
  },
  {
    id: "tab-s10-ultra-vs-ipad-pro",
    brand: "Samsung",
    slug: "tab-s10-ultra-vs-ipad-pro-m4",
    cover: tabS10Ultra,
    title: {
      fa: "تبلت برای ادیت ویدیو: تب S10 اولترا یا آیپد پرو M4؟",
      en: "Tablet for Video Editing: Tab S10 Ultra or iPad Pro M4?",
    },
    excerpt: {
      fa: "مقایسه قلم، نرم‌افزار، نمایشگر و قیمت برای تولیدکنندگان محتوای حرفه‌ای.",
      en: "Comparison of stylus, software, display, and price for professional content creators.",
    },
    content: {
      fa: `
## مقایسه تبلت‌های حرفه‌ای

| ویژگی | Tab S10 Ultra | iPad Pro M4 |
|-------|---------------|-------------|
| نمایشگر | ۱۴.۶ اینچ Dynamic AMOLED 2X، ۱۲۰Hz | ۱۳ اینچ Ultra Retina XDR، ۱۲۰Hz |
| پردازنده | MediaTek Dimensity 9300+ | Apple M4 |
| قلم | S Pen (رایگان) | Apple Pencil Pro (۱۷۹ دلار جداگانه) |
| نرم‌افزار ادیت | LumaFusion، CapCut | Final Cut Pro، LumaFusion |
| قیمت پایه | ~۱۲۰۰ دلار | ~۱۳۰۰ دلار + قلم |

### نتیجه:
- **ادیت ویدیو با Final Cut Pro** ← حتما iPad Pro
- **کار با اندروید و قلم رایگان** ← Tab S10 Ultra
- **بهترین ارزش خرید** ← Tab S10 Ultra
`,
      en: "Tablet comparison...",
    },
    readTime: 6,
    likes: 287,
    isTrending: false,
    publishDate: "2025-02-01",
    tags: ["تبلت", "ادیت ویدیو", "سامسونگ", "اپل", "مقایسه"],
  },

  // ========== مقالات ویژه مقایسه‌ای ==========
  {
    id: "iphone-vs-samsung-best-camera-2025",
    brand: "Comparison",
    slug: "iphone-vs-samsung-camera-battle-2025",
    cover: ip15pm,
    title: {
      fa: "جنگ دوربین ۲۰۲۵: اپل در برابر سامسونگ - کدام برای تولید محتوا بهتر است؟",
      en: "Camera Battle 2025: Apple vs Samsung - Which is Better for Content Creation?",
    },
    excerpt: {
      fa: "تست ویدیو در نور کم، لرزشگیر، رنگ‌ها و زوم. هر آنچه باید قبل از خرید بدانی!",
      en: "Low-light video test, stabilization, colors, and zoom. Everything you need to know before buying!",
    },
    content: {
      fa: `
## نتایج تست دوربین در شرایط مختلف

| سناریو | برنده | دلیل |
|--------|-------|------|
| ویدیو در نور روز | اپل | دقت رنگ طبیعی‌تر و داینامیک رنج بهتر |
| ویدیو در شب | سامسونگ | جزئیات بیشتر در سایه‌ها و نویز کمتر |
| لرزشگیر حین حرکت | اپل | سینماتیک‌تر و روان‌تر (Action Mode) |
| عکاسی پرتره | مساوی | هر دو عالی با تشخیص لبه دقیق |
| زوم ۱۰ برابری | سامسونگ | دوربین ۱۰ برابر اپتیکال واقعی |
| عکاسی در نور کم | سامسونگ | Nightography پیشرفته |
| ضبط صدا | اپل | میکروفون‌های استودیویی با قابلیت Voice Isolation |
| عکاسی ماکرو | اپل | فوکوس خودکار بهتر روی فاصله نزدیک |

## جمع‌بندی نهایی برای تولیدکنندگان محتوا:

📱 **اگر ریلز اینستاگرام و تیک‌تاک تولید می‌کنی** ← اپل (سرعت آپلود و بهینه‌سازی بهتر)

🎥 **اگر ویدیوهای یوتیوب بلند ضبط می‌کنی** ← سامسونگ (باتری بهتر + قابلیت ضبط مستقیم روی SSD)

📸 **اگر عکاس حرفه‌ای هستی** ← هر دو عالی، اما زوم سامسونگ بهتر است

🎬 **اگر در نور کم فیلمبرداری می‌کنی** ← سامسونگ
`,
      en: "Full camera comparison results...",
    },
    readTime: 7,
    likes: 678,
    isTrending: true,
    publishDate: "2025-02-13",
    tags: ["دوربین", "تولید محتوا", "مقایسه نهایی", "اپل", "سامسونگ"],
  },
];

// ========== توابع کمکی ==========

// گرفتن همه مقالات
export default articlesData;

// گرفتن مقاله بر اساس اسلاگ (برای صفحه جزئیات)
export const getArticleBySlug = (slug) => {
  return articlesData.find(article => article.slug === slug);
};

// گرفتن مقالات ترند
export const getTrendingArticles = () => {
  return articlesData.filter(article => article.isTrending).sort((a, b) => b.likes - a.likes);
};

// گرفتن مقالات یک برند خاص
export const getArticlesByBrand = (brand) => {
  if (brand === "all") return articlesData;
  return articlesData.filter(article => article.brand === brand);
};

// گرفتن مقالات مرتبط با یک مدل خاص
export const getRelatedArticles = (currentSlug, brand, limit = 3) => {
  return articlesData
    .filter(article => article.slug !== currentSlug && article.brand === brand)
    .slice(0, limit);
};