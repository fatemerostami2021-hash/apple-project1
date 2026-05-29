// src/pages/products/watch/article/ArticleAppleWatchUltra4.jsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaApple,
  FaHeartbeat,
  FaBatteryFull,
  FaCog,
  FaMobileAlt,
  FaClock,
  FaYoutube,
  FaExternalLinkAlt,
  FaStar,
  FaCheckCircle,
  FaNewspaper,
} from "react-icons/fa";
import { HiOutlineChip, HiOutlineClock, HiOutlineRss } from "react-icons/hi";

// ✅ اصلاح مسیر تصاویر - از 3 سطح به 4 سطح
import watchUltra4 from "../../../../assets/watch/apple-watch-ultra4.png";
import watchUltra3 from "../../../../assets/watch/Apple_Watch_Ultra_3_2025.png";
import watchS12 from "../../../../assets/watch/Apple_Watch_Series_12_TBD_2026.png";

const ArticleAppleWatchUltra4 = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const lang = i18n.language;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seoData = {
    title: {
      fa: "بررسی تخصصی اپل واچ اولترا ۴ | قدرتمندترین ساعت هوشمند اپل",
      en: "Apple Watch Ultra 4 Review | The Most Powerful Apple Smartwatch"
    },
    description: {
      fa: "بررسی کامل اپل واچ اولترا ۴ با تراشه S11، نمایشگر 3500 نیت، عمر باتری 48 ساعته و قابلیت اندازه‌گیری قند خون.",
      en: "Complete review of Apple Watch Ultra 4 with S11 chip, 3500-nit display, 48-hour battery life, and blood glucose monitoring."
    },
    keywords: {
      fa: "اپل واچ اولترا ۴, Apple Watch Ultra 4, ساعت هوشمند اپل, بررسی اپل واچ",
      en: "Apple Watch Ultra 4, smartwatch, Apple review"
    }
  };

  // لینک‌های مرتبط با مسیر جدید
  const relatedArticles = [
    { slug: "apple-watch-ultra-3", name: "Apple Watch Ultra 3", year: 2025, path: "/apple-products/watch/article/" },
    { slug: "apple-watch-series-12", name: "Apple Watch Series 12", year: 2026, path: "/apple-products/watch/article/" },
    { slug: "apple-watch-se-3", name: "Apple Watch SE 3", year: 2025, path: "/apple-products/watch/article/" },
  ];

  const externalVideos = [
    {
      id: "video1",
      title: "Apple Watch Ultra 4 - Full Review",
      channel: "TechZone",
      videoId: "xn9gSLXmFeE",
      url: "https://youtu.be/xn9gSLXmFeE",
      thumbnail: "https://img.youtube.com/vi/xn9gSLXmFeE/mqdefault.jpg",
    },
    {
      id: "video2",
      title: "Apple Watch Ultra 4 vs Garmin Epix Pro",
      channel: "GearLab",
      videoId: "tXs7oE5gYpo",
      url: "https://youtu.be/tXs7oE5gYpo",
      thumbnail: "https://img.youtube.com/vi/tXs7oE5gYpo/mqdefault.jpg",
    },
  ];

  const specifications = [
    { label: { fa: "تراشه", en: "Chip" }, value: "S11 SIP" },
    { label: { fa: "نمایشگر", en: "Display" }, value: "Always-On Retina LTPO 2.0, 3500 nits" },
    { label: { fa: "عمر باتری", en: "Battery Life" }, value: "48 ساعت / 48 hours" },
    { label: { fa: "مقاومت در برابر آب", en: "Water Resistance" }, value: "100m / WR100" },
    { label: { fa: "حافظه داخلی", en: "Storage" }, value: "64GB" },
    { label: { fa: "سیستم عامل", en: "OS" }, value: "watchOS 11" },
  ];

  const healthFeatures = [
    { name: { fa: "نوار قلب (ECG)", en: "ECG" }, icon: FaHeartbeat, color: "text-red-500" },
    { name: { fa: "اندازه‌گیری اکسیژن خون", en: "Blood Oxygen" }, icon: FaBatteryFull, color: "text-blue-500" },
    { name: { fa: "اندازه‌گیری قند خون", en: "Blood Glucose" }, icon: FaCog, color: "text-green-500" },
    { name: { fa: "دمای بدن", en: "Body Temperature" }, icon: FaMobileAlt, color: "text-orange-500" },
    { name: { fa: "ردیابی خواب", en: "Sleep Tracking" }, icon: FaClock, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8" dir={isRtl ? "rtl" : "ltr"}>
      <Helmet>
        <title>{seoData.title[lang]}</title>
        <meta name="description" content={seoData.description[lang]} />
        <meta name="keywords" content={seoData.keywords[lang]} />
        <meta property="og:image" content={watchUltra4} />
        <link rel="canonical" href={`https://yourdomain.com/apple-products/watch/article/apple-watch-ultra-4`} />
      </Helmet>

      {/* Breadcrumb با مسیر صحیح */}
      <nav className="max-w-5xl mx-auto mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
        <Link to="/" className="hover:text-amber-600 transition-colors">🏠 {isRtl ? "خانه" : "Home"}</Link>
        <span>/</span>
        <Link to="/apple-products/watch" className="hover:text-amber-600 transition-colors">
          {isRtl ? "اپل واچ" : "Apple Watch"}
        </Link>
        <span>/</span>
        <span className="text-amber-600 dark:text-amber-400">{isRtl ? "اپل واچ اولترا ۴" : "Apple Watch Ultra 4"}</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8">
              <img src={watchUltra4} alt="Apple Watch Ultra 4" className="w-full max-w-md mx-auto object-contain drop-shadow-2xl" />
            </motion.div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <FaApple className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Apple • 2026</span>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span className="text-sm text-amber-600 dark:text-amber-400 font-bold">⭐ 5.0</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
                {isRtl ? "بررسی تخصصی اپل واچ اولترا ۴" : "Apple Watch Ultra 4 In-Depth Review"}
              </h1>
            </div>

            {/* Table of Contents */}
            <div className="bg-gray-100/50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HiOutlineRss className="text-amber-500" />
                {isRtl ? "آنچه در این مقاله می‌خوانید:" : "What You'll Learn:"}
              </h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { id: "intro", label: isRtl ? "مقدمه" : "Introduction" },
                  { id: "design", label: isRtl ? "طراحی" : "Design" },
                  { id: "display", label: isRtl ? "نمایشگر" : "Display" },
                  { id: "performance", label: isRtl ? "عملکرد" : "Performance" },
                  { id: "battery", label: isRtl ? "باتری" : "Battery" },
                  { id: "health", label: isRtl ? "سلامتی" : "Health" },
                  { id: "verdict", label: isRtl ? "نتیجه" : "Verdict" },
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="text-gray-600 dark:text-gray-400 hover:text-amber-600">
                    • {item.label}
                  </a>
                ))}
              </div>
            </div>

            <section id="intro">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "✨ مقدمه" : "✨ Introduction"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                {isRtl 
                  ? "اپل واچ اولترا ۴ جدیدترین و پیشرفته‌ترین ساعت هوشمند اپل است که در سال ۲۰۲۶ معرفی شد. این ساعت با تراشه قدرتمند S11، نمایشگر 3500 نیتی و عمر باتری 48 ساعته، استانداردهای جدیدی در دنیای ساعت‌های هوشمند ایجاد کرده است."
                  : "The Apple Watch Ultra 4 is Apple's latest and most advanced smartwatch, introduced in 2026."}
              </p>
            </section>

            <section id="design">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "🎨 طراحی" : "🎨 Design"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {isRtl
                  ? "بدنه اپل واچ اولترا ۴ از تیتانیوم درجه یک ساخته شده که آن را فوق‌العاده مقاوم و در عین حال سبک می‌کند."
                  : "The Apple Watch Ultra 4 body is made from grade 5 titanium, making it extremely durable yet lightweight."}
              </p>
            </section>

            <section id="display">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "📱 نمایشگر" : "📱 Display"}
              </h2>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-6">
                <p className="text-gray-700 dark:text-gray-300">
                  {isRtl
                    ? "نمایشگر اپل واچ اولترا ۴ با روشنایی 3500 نیت، روشن‌ترین صفحه نمایش در بین ساعت‌های هوشمند است."
                    : "The Apple Watch Ultra 4 display with 3500 nits brightness is the brightest among all smartwatches."}
                </p>
              </div>
            </section>

            <section id="performance">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "⚡ تراشه S11" : "⚡ S11 Chip"}
              </h2>
              <div className="flex items-center gap-4 p-4 bg-gray-100/50 dark:bg-white/5 rounded-xl">
                <HiOutlineChip className="w-12 h-12 text-amber-500" />
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">S11 SIP</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {isRtl ? "30٪ سریعتر از نسل قبل" : "30% faster than previous gen"}
                  </p>
                </div>
              </div>
            </section>

            <section id="battery">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "🔋 باتری" : "🔋 Battery"}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-black/30 rounded-xl p-4 text-center">
                  <FaBatteryFull className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">48</p>
                  <p className="text-xs text-gray-500">{isRtl ? "ساعت" : "Hours"}</p>
                </div>
                <div className="bg-white/50 dark:bg-black/30 rounded-xl p-4 text-center">
                  <HiOutlineClock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">30</p>
                  <p className="text-xs text-gray-500">{isRtl ? "دقیقه تا 80%" : "Min to 80%"}</p>
                </div>
              </div>
            </section>

            <section id="health">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "❤️ سلامت" : "❤️ Health"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {healthFeatures.map((feature, idx) => (
                  <div key={idx} className="bg-gray-100/50 dark:bg-white/5 rounded-xl p-4 text-center">
                    <feature.icon className={`w-8 h-8 ${feature.color} mx-auto mb-2`} />
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{feature.name[lang]}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="verdict" className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaStar className="text-yellow-300" />
                {isRtl ? "نتیجه نهایی" : "Final Verdict"}
              </h2>
              <div className="text-center">
                <p className="text-lg font-bold">{isRtl ? "امتیاز نهایی:" : "Final Score:"} <span className="text-3xl">9.5/10</span></p>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-5 text-center">
              <p className="text-4xl font-black text-amber-600">9.5</p>
              <p className="text-sm">{isRtl ? "امتیاز نشریه" : "Editor's Score"}</p>
            </div>

            {/* Related Articles با مسیر جدید */}
            <div className="bg-white/50 dark:bg-black/30 rounded-2xl p-5 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaNewspaper className="text-amber-500" />
                {isRtl ? "مقالات مرتبط" : "Related Articles"}
              </h3>
              <div className="space-y-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`${article.path}${article.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-600">
                      {article.name}
                    </span>
                    <span className="text-xs text-gray-400">{article.year}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* External Videos */}
            <div className="bg-white/50 dark:bg-black/30 rounded-2xl p-5 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaYoutube className="text-red-500" />
                {isRtl ? "ویدیوها" : "Videos"}
              </h3>
              <div className="space-y-2">
                {externalVideos.map((video) => (
                  <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-sm">
                    <FaYoutube className="text-red-500" />
                    <span>{video.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleAppleWatchUltra4;