require('dotenv').config();
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  slug: String,
  content: { fa: String, en: String }
});
const Article = mongoose.model('Article', articleSchema);

// ============================================
// محتوای کامل ژورنالی برای هر 13 مقاله
// ============================================

const fullContents = {
  // 1. iPhone 17 Pro Max
  "iphone-17-pro-max": {
    fa: `# آیفون ۱۷ پرو مکس: عصر جدیدی از قدرت و هوش مصنوعی

## چکیده اجرایی

اپل در رویداد پاییزی ۲۰۲۵ از آیفون ۱۷ پرو مکس رونمایی کرد. دستگاهی که نه تنها قدرتمندترین تراشه تاریخ موبایل را در خود جای داده، بلکه با قابلیت‌های پیشرفته Apple Intelligence، تجربه کاربری را به سطح کاملاً جدیدی ارتقا داده است.

## فصل اول: طراحی و مهندسی بدنه

### ۱. فریم تیتانیومی
آیفون ۱۷ پرو مکس از فریم تیتانیومی درجه ۵ استفاده می‌کند. تیتانیوم فلزی است که ۴۰٪ سبک‌تر از فولاد ضدزنگ و در عین حال دو برابر مقاوم‌تر است.

### ۲. وزن و ارگونومی
وزن دستگاه ۲۲۱ گرم (۸ گرم سبک‌تر از نسل قبل)

### ۳. رنگ‌بندی
- **Desert Titanium** (تیتانیوم بیابانی) - رنگ اصلی سال
- **Natural Titanium** (تیتانیوم طبیعی)
- **White Titanium** (تیتانیوم سفید)
- **Black Titanium** (تیتانیوم مشکی)

## فصل دوم: نمایشگر

| پارامتر | مقدار |
|---------|-------|
| اندازه | ۶.۹ اینچ |
| رزولوشن | ۱۴۹۲ × ۳۲۲۴ پیکسل |
| نرخ نوسازی | ۱-۱۲۰ هرتز ProMotion |
| روشنایی پیک | ۳۰۰۰ نیت |

## فصل سوم: تراشه A18 Pro

| بخش | بهبود |
|-----|-------|
| CPU | ۲۰٪ سریع‌تر |
| GPU | ۳۰٪ سریع‌تر |
| Neural Engine | ۲۵٪ سریع‌تر |

## فصل چهارم: سیستم دوربین

### دوربین اصلی
- سنسور ۴۸ مگاپیکسل
- دیافراگم f/1.68

### دوربین تله‌فوتو
- زوم اپتیکال ۵ برابر

### دوربین فوق عریض
- سنسور ۴۸ مگاپیکسل

## فصل پنجم: Apple Intelligence

۱. **Siri پیشرفته** - درک طبیعی مکالمه
۲. **Writing Tools** - ابزارهای نوشتاری هوشمند
۳. **Image Playground** - تولید تصویر با هوش مصنوعی
۴. **Genmoji** - ساخت ایموجی سفارشی

## فصل ششم: باتری

| مشخصات | مقدار |
|--------|-------|
| ظرفیت | ۴,۷۶۰ میلی‌آمپر ساعت |
| شارژ سیمی | ۳۵ وات |
| عمر ویدئو | ۳۳ ساعت |

## نتیجه‌گیری

**امتیاز: ۹.۲ از ۱۰**

**نقاط قوت:** قدرتمندترین تراشه، دوربین عالی، نمایشگر بی‌نظیر
**نقاط ضعف:** قیمت بالا، شارژ نسبتاً کند`,
    en: `# iPhone 17 Pro Max: New Era of Power and AI

## Executive Summary

Apple unveiled the iPhone 17 Pro Max with A18 Pro chip and Apple Intelligence.

## Design

Titanium frame, 221g weight. Colors: Desert, Natural, White, Black Titanium.

## Display

6.9-inch, 3000 nits, 120Hz ProMotion.

## A18 Pro Chip

20% faster CPU, 30% faster GPU, 25% faster Neural Engine.

## Camera

48MP main, 5x optical zoom, 48MP ultra-wide.

## Apple Intelligence

Advanced Siri, Writing Tools, Image Playground, Genmoji.

## Battery

4,760 mAh, 35W charging, 33h video.

## Verdict

**Score: 9.2/10**`
  },

  // 2. iPhone 16 Pro Max
  "iphone-16-pro-max": {
    fa: `# آیفون ۱۶ پرو مکس: تعادل قدرت و طراحی

## مقدمه

آیفون ۱۶ پرو مکس با تراشه A17 Pro، نمایشگر ۶.۹ اینچی و دوربین پیشرفته، پلی است بین نسل‌های قبلی و آینده.

## طراحی

فریم تیتانیومی با وزن ۲۲۵ گرم. رنگ‌های موجود: Black Titanium، White Titanium، Natural Titanium، Blue Titanium.

## نمایشگر

۶.۹ اینچ Super Retina XDR با ProMotion و روشنایی ۲۰۰۰ نیت.

## تراشه A17 Pro

CPU ۶ هسته‌ای با ۱۹ میلیارد ترانزیستور. پشتیبانی از USB 3 با سرعت ۱۰ گیگابیت بر ثانیه.

## دوربین

دوربین اصلی ۴۸ مگاپیکسل با زوم ۵ برابری. قابلیت ضبط ProRes و Log.

## نتیجه‌گیری

امتیاز: ۸.۸ از ۱۰`,
    en: `# iPhone 16 Pro Max: Balance of Power and Design

## Introduction

iPhone 16 Pro Max features A17 Pro chip, 6.9-inch display.

## Design

Titanium frame, 225g.

## Display

6.9-inch Super Retina XDR, 2000 nits.

## A17 Pro

6-core CPU, 19B transistors, USB 3 (10Gbps).

## Camera

48MP main, 5x zoom, ProRes recording.

## Verdict

Score: 8.8/10`
  },

  // 3. iPhone 15 Pro Max
  "iphone-15-pro-max": {
    fa: `# آیفون ۱۵ پرو مکس: آغاز عصر تیتانیوم

## مقدمه

آیفون ۱۵ پرو مکس اولین گوشی اپل با فریم تیتانیومی و پورت USB-C است.

## طراحی

وزن ۲۲۱ گرم (سبک‌ترین پرو مکس تا آن تاریخ). دکمه Action Button به جای کلید سایلنت.

## تراشه A17 Pro

اولین تراشه ۳ نانومتری صنعت موبایل.

## دوربین

زوم اپتیکال ۵ برابری با لنز پریسکوپی.

## نتیجه‌گیری

امتیاز: ۸.۵ از ۱۰`,
    en: `# iPhone 15 Pro Max: Dawn of Titanium Era

## Introduction

First iPhone with titanium frame and USB-C port.

## Design

221g weight, Action Button replaces mute switch.

## A17 Pro

First 3nm chip in mobile industry.

## Camera

5x optical zoom with periscope lens.

## Verdict

Score: 8.5/10`
  },

  // 4. iPhone 14 Pro Max
  "iphone-14-pro-max": {
    fa: `# آیفون ۱۴ پرو مکس: تولد Dynamic Island

## مقدمه

آیفون ۱۴ پرو مکس با معرفی Dynamic Island، تحولی در طراحی ناچ ایجاد کرد.

## طراحی

فریم فولاد ضدزنگ با وزن ۲۴۰ گرم. رنگ Deep Purple جدید.

## نمایشگر

اولین نمایشگر با Always-On Display در تاریخ آیفون.

## دوربین

سنسور ۴۸ مگاپیکسلی برای اولین بار در آیفون.

## نتیجه‌گیری

امتیاز: ۷.۵ از ۱۰`,
    en: `# iPhone 14 Pro Max: Birth of Dynamic Island

## Introduction

Introduced Dynamic Island, replacing the notch.

## Design

Stainless steel frame, 240g.

## Display

First iPhone with Always-On Display.

## Camera

First 48MP sensor in iPhone.

## Verdict

Score: 7.5/10`
  },

  // 5. iPhone 13 Pro Max
  "iphone-13-pro-max": {
    fa: `# آیفون ۱۳ پرو مکس: پادشاه باتری

## مقدمه

آیفون ۱۳ پرو مکس با عمر باتری استثنایی، استاندارد جدیدی تعریف کرد.

## طراحی

ناچ ۲۰٪ کوچک‌تر. رنگ جدید Sierra Blue.

## نمایشگر

اولین نمایشگر ۱۲۰ هرتز ProMotion در آیفون.

## باتری

بهترین عمر باتری تاریخ آیفون تا آن زمان.

## نتیجه‌گیری

امتیاز: ۸.۲ از ۱۰`,
    en: `# iPhone 13 Pro Max: Battery King

## Introduction

Set new standards with exceptional battery life.

## Design

20% smaller notch, Sierra Blue color.

## Display

First 120Hz ProMotion display on iPhone.

## Battery

Best iPhone battery life at the time.

## Verdict

Score: 8.2/10`
  },

  // 6. iPhone 12 Pro Max
  "iphone-12-pro-max": {
    fa: `# آیفون ۱۲ پرو مکس: آغاز عصر 5G و MagSafe

## مقدمه

آیفون ۱۲ پرو مکس اولین آیفون با پشتیبانی از 5G و سیستم MagSafe است.

## طراحی

طراحی لبه تخت (صاف) مانند آیفون ۴. بازگشت به ریشه‌ها.

## تراشه A14 Bionic

اولین تراشه ۵ نانومتری صنعت موبایل.

## نتیجه‌گیری

امتیاز: ۷.۸ از ۱۰`,
    en: `# iPhone 12 Pro Max: Dawn of 5G and MagSafe

## Introduction

First iPhone with 5G and MagSafe system.

## Design

Flat-edge design like iPhone 4.

## A14 Bionic

First 5nm chip in mobile industry.

## Verdict

Score: 7.8/10`
  },

  // 7. iPhone vs Samsung Camera Battle
  "iphone-vs-samsung-camera-battle-2025": {
    fa: `# جنگ دوربین ۲۰۲۵: اپل در برابر سامسونگ

## چکیده

در این مقاله جامع، دوربین‌های آیفون ۱۷ پرو مکس و گلکسی S24 اولترا را در شرایط مختلف مقایسه می‌کنیم.

## بخش اول: دوربین اصلی

| ویژگی | iPhone 17 Pro Max | Galaxy S24 Ultra |
|-------|-------------------|------------------|
| مگاپیکسل | ۴۸ | ۲۰۰ |
| دیافراگم | f/1.68 | f/1.7 |
| سنسور | ۱/۱.۲۸ اینچ | ۱/۱.۳ اینچ |

## بخش دوم: نور کم

آیفون در نور کم جزئیات بیشتری حفظ می‌کند اما سامسونگ نویز کمتری دارد.

## بخش سوم: زوم

سامسونگ با زوم ۱۰۰ برابری در زوم دیجیتال برتر است اما آیفون در زوم اپتیکال ۵ برابر کیفیت بهتری دارد.

## بخش چهارم: فیلمبرداری

آیفون در فیلمبرداری، به خصوص در حالت سینمایی، برتری آشکاری دارد.

## نتیجه‌گیری

اگر فیلمبردار هستید: آیفون. اگر عکاس هستید و زوم بالا می‌خواهید: سامسونگ.`,
    en: `# Camera Battle 2025: Apple vs Samsung

## Main Camera Comparison

| Feature | iPhone 17 Pro Max | Galaxy S24 Ultra |
|---------|-------------------|------------------|
| Megapixels | 48 | 200 |
| Aperture | f/1.68 | f/1.7 |

## Low Light

iPhone preserves more details; Samsung has less noise.

## Zoom

Samsung wins at digital zoom (100x); iPhone at optical (5x).

## Video

iPhone dominates, especially Cinematic Mode.

## Verdict

For video: iPhone. For photos and zoom: Samsung.`
  },

  // 8. iPhone Evolution Comparison
  "iphone-14-to-17-evolution-comparison": {
    fa: `# مقایسه تحلیلی آیفون ۱۴ تا آیفون ۱۷

## جدول مقایسه کامل

| ویژگی | iPhone 14 PM | iPhone 15 PM | iPhone 16 PM | iPhone 17 PM |
|-------|--------------|--------------|--------------|--------------|
| تراشه | A16 | A17 Pro | A17 Pro | A18 Pro |
| رم | ۶GB | ۸GB | ۸GB | ۸GB |
| زوم | ۳x | ۵x | ۵x | ۵x |
| فریم | فولاد | تیتانیوم | تیتانیوم | تیتانیوم |
| وزن | ۲۴۰g | ۲۲۱g | ۲۲۵g | ۲۲۱g |
| USB-C | ❌ | ✅ | ✅ | ✅ |
| Apple Intel. | ❌ | محدود | محدود | کامل |

## تحلیل هر نسل

**iPhone 14 Pro Max:** شروع عصر Dynamic Island
**iPhone 15 Pro Max:** انقلاب تیتانیوم و USB-C
**iPhone 16 Pro Max:** تکامل و بلوغ
**iPhone 17 Pro Max:** اوج با Apple Intelligence

## نتیجه‌گیری

بزرگترین جهش: ۱۴→۱۵ (تیتانیوم، USB-C، زوم ۵x)
امتیازات: ۱۴PM=۷.۵, ۱۵PM=۸.۵, ۱۶PM=۸.۸, ۱۷PM=۹.۲`,
    en: `# iPhone 14 to 17 Evolution Comparison

## Complete Comparison Table

| Feature | iPhone 14 PM | iPhone 15 PM | iPhone 16 PM | iPhone 17 PM |
|---------|--------------|--------------|--------------|--------------|
| Chip | A16 | A17 Pro | A17 Pro | A18 Pro |
| RAM | 6GB | 8GB | 8GB | 8GB |
| Zoom | 3x | 5x | 5x | 5x |
| Frame | Steel | Titanium | Titanium | Titanium |

## Scores

14PM=7.5, 15PM=8.5, 16PM=8.8, 17PM=9.2/10`
  },

  // 9. Galaxy S24 Ultra
  "galaxy-s24-ultra-ai-revolution": {
    fa: `# گلکسی S24 اولترا: انقلاب هوش مصنوعی سامسونگ

## Galaxy AI: قلب تپنده دستگاه

### ۱. ترجمه زنده تماس
تماس با ۱۳ زبان مختلف با ترجمه لحظه‌ای

### ۲. Circle to Search
دایره کشیدن برای جستجوی هر چیزی

### ۳. ویرایش جادویی عکس
حذف اشیاء، جابجایی سوژه، تولید پس‌زمینه

## مشخصات فنی

| بخش | مشخصات |
|-----|--------|
| تراشه | Snapdragon 8 Gen 4 |
| رم | ۱۲ گیگابایت |
| نمایشگر | ۶.۸ اینچ Dynamic AMOLED 2X |
| دوربین اصلی | ۲۰۰ مگاپیکسل |

## نتیجه‌گیری

امتیاز: ۹ از ۱۰`,
    en: `# Galaxy S24 Ultra: Samsung's AI Revolution

## Galaxy AI Features

1. Live Call Translation (13 languages)
2. Circle to Search
3. Magic Photo Editing

## Specs

- Snapdragon 8 Gen 4
- 12GB RAM
- 200MP camera

## Verdict

Score: 9/10`
  },

  // 10. S24 Plus vs iPhone 15 Pro Max
  "s24-plus-vs-iphone-15-pro-max-comparison": {
    fa: `# نبرد ارزش خرید: S24 پلاس یا آیفون ۱۵ پرو مکس؟

## مقایسه قیمت و ارزش

| ویژگی | S24 Plus | iPhone 15 Pro Max |
|-------|----------|-------------------|
| قیمت | ۹۹۹ دلار | ۱,۱۹۹ دلار |
| رم | ۱۲ گیگابایت | ۸ گیگابایت |
| دوربین اصلی | ۵۰ مگاپیکسل | ۴۸ مگاپیکسل |

## نتیجه‌گیری

برای ارزش خرید: S24 Plus. برای اکوسیستم اپل: iPhone 15 Pro Max.`,
    en: `# Value Battle: S24 Plus vs iPhone 15 Pro Max

## Price Comparison

| Feature | S24 Plus | iPhone 15 Pro Max |
|---------|----------|-------------------|
| Price | $999 | $1,199 |
| RAM | 12GB | 8GB |

## Verdict

Best value: S24 Plus. Best ecosystem: iPhone.`
  },

  // 11. Galaxy AI Tips for Creators
  "5-galaxy-ai-tips-content-creators": {
    fa: `# ۵ ترفند Galaxy AI برای تولیدکنندگان محتوا

## ۱. حذف مزاحم‌های پس‌زمینه
با یک ضربه، افراد اضافی را از عکس حذف کنید.

## ۲. ساخت استیکر اختصاصی
از هر عکسی استیکر بسازید.

## ۳. ترجمه متن در لحظه
متون را در دوربین زنده ترجمه کنید.

## ۴. ویرایش پرتره پس از عکاسی
نور و فوکوس را پس از عکاسی تنظیم کنید.

## ۵. تبدیل صدا به متن
جلسات و مصاحبه‌ها را خودکار تایپ کنید.

## نتیجه‌گیری
Galaxy AI یک ابزار قدرتمند برای کریتورهاست.`,
    en: `# 5 Galaxy AI Tips for Content Creators

1. Remove photobombers
2. Create custom stickers
3. Real-time text translation
4. Post-capture portrait editing
5. Voice to text transcription

## Verdict

Galaxy AI is a powerful tool for creators.`
  },

  // 12. Z Flip 6
  "z-flip-6-style-durability-review": {
    fa: `# Z Flip 6: چرا نسل جدید عاشق این گوشی تاشو شده؟

## طراحی و استایل

Z Flip 6 یک گوشی مد روز است که توجه همه را جلب می‌کند.

## دوام

۴۰۰ هزار بار تا شدن (بیش از ۱۰ سال استفاده روزانه)

## دوربین سلفی خلاقانه

با تا شدن گوشی، از دوربین اصلی برای سلفی استفاده کنید.

## مشخصات

| بخش | مشخصات |
|-----|--------|
| نمایشگر اصلی | ۶.۷ اینچ Dynamic AMOLED |
| نمایشگر کاور | ۳.۴ اینچ Super AMOLED |
| تراشه | Snapdragon 8 Gen 4 |

## نتیجه‌گیری

امتیاز: ۸.۵ از ۱۰`,
    en: `# Z Flip 6: Why Gen Z Loves This Foldable

## Design

Fashion-forward foldable phone.

## Durability

400,000 folds (10+ years)

## Creative Selfies

Use main camera for selfies.

## Specs

- 6.7-inch main display
- 3.4-inch cover display

## Verdict

Score: 8.5/10`
  },

  // 13. Tab S10 Ultra vs iPad Pro
  "tab-s10-ultra-vs-ipad-pro-m4": {
    fa: `# تبلت برای ادیت ویدیو: تب S10 اولترا یا آیپد پرو M4؟

## مقایسه کامل

| ویژگی | Tab S10 Ultra | iPad Pro M4 |
|-------|---------------|-------------|
| نمایشگر | ۱۴.۶ اینچ Dynamic AMOLED | ۱۳ اینچ Ultra Retina XDR |
| قلم | S Pen (رایگان) | Apple Pencil Pro |
| نرم‌افزار | اندروید ۱۵ | iPadOS 18 |
| قیمت | ۱,۱۹۹ دلار | ۱,۲۹۹ دلار |

## نتیجه‌گیری

برای ادیت ویدیو در اندروید: Tab S10 Ultra. برای اکوسیستم اپل: iPad Pro M4.`,
    en: `# Tablet for Video Editing: Tab S10 Ultra vs iPad Pro M4

## Comparison

| Feature | Tab S10 Ultra | iPad Pro M4 |
|---------|---------------|-------------|
| Display | 14.6" AMOLED | 13" XDR |
| Stylus | S Pen (free) | Apple Pencil |

## Verdict

Android editing: Tab S10 Ultra. Apple ecosystem: iPad Pro.`
  }
};

async function updateAllArticles() {
  try {
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected successfully\n');

    let updated = 0;
    let notFound = [];

    for (const [slug, content] of Object.entries(fullContents)) {
      const article = await Article.findOne({ slug });
      if (article) {
        article.content = content;
        await article.save();
        console.log(`✅ Updated: ${slug}`);
        updated++;
      } else {
        console.log(`❌ Not found: ${slug}`);
        notFound.push(slug);
      }
    }

    console.log(`\n📊 Summary: ${updated} articles updated successfully`);
    if (notFound.length > 0) {
      console.log(`⚠️ Not found: ${notFound.join(', ')}`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateAllArticles();
