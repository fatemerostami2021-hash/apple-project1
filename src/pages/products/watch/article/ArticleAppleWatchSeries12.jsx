// src/pages/products/watch/article/ArticleAppleWatchSeries12.jsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaApple, FaStar, FaHeartbeat, FaBatteryFull, FaMicrochip } from "react-icons/fa";
import { HiOutlineChip, HiOutlineRss, HiOutlineClock } from "react-icons/hi";

// ✅ اصلاح مسیر - از 3 سطح به 4 سطح
import watchS12 from "../../../../assets/watch/Apple_Watch_Series_12_TBD_2026.png";
import watchS11 from "../../../../assets/watch/Apple_Watch_Series_11_2025.png";
import watchS10 from "../../../../assets/watch/Apple_Watch_Series_10_2024.png";

const ArticleAppleWatchSeries12 = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const lang = i18n.language;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relatedArticles = [
    { slug: "apple-watch-ultra-4", name: "Apple Watch Ultra 4", year: 2026, path: "/apple-products/watch/article/" },
    { slug: "apple-watch-ultra-3", name: "Apple Watch Ultra 3", year: 2025, path: "/apple-products/watch/article/" },
    { slug: "apple-watch-se-3", name: "Apple Watch SE 3", year: 2025, path: "/apple-products/watch/article/" },
  ];

  const specifications = [
    { label: { fa: "تراشه", en: "Chip" }, value: "S10 SIP" },
    { label: { fa: "نمایشگر", en: "Display" }, value: "Always-On LTPO OLED, 2000 nits" },
    { label: { fa: "عمر باتری", en: "Battery Life" }, value: "24 ساعت / 24 hours" },
    { label: { fa: "مقاومت در برابر آب", en: "Water Resistance" }, value: "50m / WR50" },
    { label: { fa: "حافظه داخلی", en: "Storage" }, value: "64GB" },
    { label: { fa: "سیستم عامل", en: "OS" }, value: "watchOS 11" },
  ];

  const seriesComparison = [
    { model: "Series 12", chip: "S10 SIP", display: "Always-On LTPO", battery: "24h", price: "$599" },
    { model: "Series 11", chip: "S9 SIP", display: "Always-On Retina", battery: "20h", price: "$499" },
    { model: "Series 10", chip: "S8 SIP", display: "Always-On Retina", battery: "18h", price: "$449" },
  ];

  const healthFeatures = [
    { name: { fa: "نوار قلب (ECG)", en: "ECG" }, icon: FaHeartbeat, color: "text-red-500" },
    { name: { fa: "اکسیژن خون", en: "Blood Oxygen" }, icon: FaBatteryFull, color: "text-blue-500" },
    { name: { fa: "دمای بدن", en: "Body Temperature" }, icon: FaMicrochip, color: "text-orange-500" },
    { name: { fa: "ردیابی خواب", en: "Sleep Tracking" }, icon: HiOutlineClock, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8" dir={isRtl ? "rtl" : "ltr"}>
      <Helmet>
        <title>{isRtl ? "بررسی اپل واچ سری ۱۲ | جدیدترین نسل ساعت هوشمند اپل" : "Apple Watch Series 12 Review | Latest Generation Apple Smartwatch"}</title>
        <meta name="description" content={isRtl ? "بررسی کامل اپل واچ سری ۱۲ با نمایشگر بزرگتر، تراشه S10 و قابلیت‌های پیشرفته سلامتی" : "Complete review of Apple Watch Series 12 with larger display, S10 chip, and advanced health features"} />
        <meta name="keywords" content={isRtl ? "اپل واچ سری ۱۲, Apple Watch Series 12, ساعت هوشمند اپل, بررسی" : "Apple Watch Series 12, smartwatch, Apple review"} />
        <meta property="og:image" content={watchS12} />
        <link rel="canonical" href="https://yourdomain.com/apple-products/watch/article/apple-watch-series-12" />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="max-w-5xl mx-auto mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
        <Link to="/" className="hover:text-amber-600 transition-colors">🏠 {isRtl ? "خانه" : "Home"}</Link>
        <span>/</span>
        <Link to="/apple-products/watch" className="hover:text-amber-600 transition-colors">
          {isRtl ? "اپل واچ" : "Apple Watch"}
        </Link>
        <span>/</span>
        <span className="text-amber-600 dark:text-amber-400">{isRtl ? "اپل واچ سری ۱۲" : "Apple Watch Series 12"}</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8"
            >
              <img src={watchS12} alt="Apple Watch Series 12" className="w-full max-w-md mx-auto object-contain drop-shadow-2xl" />
            </motion.div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <FaApple className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Apple • 2026</span>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span className="text-sm text-amber-600 dark:text-amber-400 font-bold">⭐ 4.9</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
                {isRtl ? "بررسی تخصصی اپل واچ سری ۱۲" : "Apple Watch Series 12 In-Depth Review"}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {isRtl ? "جدیدترین نسل ساعت هوشمند اپل با نمایشگر بزرگتر و تراشه S10" : "The latest generation Apple smartwatch with larger display and S10 chip"}
              </p>
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
                  { id: "comparison", label: isRtl ? "مقایسه" : "Comparison" },
                  { id: "verdict", label: isRtl ? "نتیجه" : "Verdict" },
                ].map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="text-gray-600 dark:text-gray-400 hover:text-amber-600">
                    • {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Introduction */}
            <section id="intro">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "✨ مقدمه" : "✨ Introduction"}
              </h2>
              <div className="mt-4 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  {isRtl 
                    ? "اپل واچ سری ۱۲ در سال ۲۰۲۶ معرفی شد و با نمایشگر بزرگتر، تراشه قدرتمندتر S10 و قابلیت‌های پیشرفته سلامتی، تجربه‌ای بی‌نظیر را ارائه می‌دهد. این ساعت با صفحه نمایش ۱.۹ اینچی و حاشیه‌های باریک‌تر، فضای بیشتری برای نمایش اطلاعات فراهم کرده است."
                    : "The Apple Watch Series 12 was introduced in 2026, offering an unparalleled experience with a larger display, more powerful S10 chip, and advanced health features. With a 1.9-inch display and thinner bezels, it provides more space for displaying information."}
                </p>
              </div>
            </section>

            {/* Design */}
            <section id="design">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "🎨 طراحی و کیفیت ساخت" : "🎨 Design & Build Quality"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {isRtl
                  ? "سری ۱۲ با طراحی باریک‌تر و حاشیه‌های کوچک‌تر، ظاهری مدرن‌تر دارد. بدنه از آلومینیوم درجه یک ساخته شده و در رنگ‌های متنوعی عرضه می‌شود."
                  : "The Series 12 features a slimmer design and smaller bezels, giving it a more modern look. The body is made from premium aluminum and comes in a variety of colors."}
              </p>
            </section>

            {/* Display */}
            <section id="display">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "📱 نمایشگر Always-On LTPO" : "📱 Always-On LTPO Display"}
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {isRtl
                    ? "نمایشگر ۱.۹ اینچی LTPO با نرخ نوسازی ۱-۶۰ هرتز و روشنایی ۲۰۰۰ نیت، تجربه‌ای روان و واضح را در هر شرایط نوری ارائه می‌دهد. صفحه نمایش همیشه روشن (Always-On) بدون مصرف زیاد باتری کار می‌کند."
                    : "The 1.9-inch LTPO display with 1-60Hz refresh rate and 2000 nits brightness delivers a smooth and clear experience in any lighting condition. The always-on display works without consuming much battery."}
                </p>
              </div>
            </section>

            {/* Performance */}
            <section id="performance">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "⚡ تراشه S10 و عملکرد" : "⚡ S10 Chip & Performance"}
              </h2>
              <div className="flex items-center gap-4 p-4 bg-gray-100/50 dark:bg-white/5 rounded-xl">
                <HiOutlineChip className="w-12 h-12 text-amber-500" />
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">S10 SIP</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {isRtl ? "۲۰٪ سریعتر از نسل قبل | مصرف انرژی ۱۵٪ کمتر" : "20% faster than previous gen | 15% less power consumption"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {isRtl
                  ? "تراشه S10 عملکرد روان و سریعی را در اجرای برنامه‌ها، اپلیکیشن‌های سلامت و بازی‌ها ارائه می‌دهد. قابلیت‌های هوش مصنوعی روی دستگاه بهبود یافته و سرعت پردازش داده‌های سلامتی افزایش یافته است."
                  : "The S10 chip delivers smooth and fast performance in running apps, health applications, and games. On-device AI capabilities have been improved, and health data processing speed has increased."}
              </p>
            </section>

            {/* Battery */}
            <section id="battery">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "🔋 باتری و شارژ" : "🔋 Battery & Charging"}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-black/30 rounded-xl p-4 text-center">
                  <FaBatteryFull className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">24</p>
                  <p className="text-xs text-gray-500">{isRtl ? "ساعت" : "Hours"}</p>
                </div>
                <div className="bg-white/50 dark:bg-black/30 rounded-xl p-4 text-center">
                  <HiOutlineClock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white">45</p>
                  <p className="text-xs text-gray-500">{isRtl ? "دقیقه تا 80%" : "Min to 80%"}</p>
                </div>
              </div>
            </section>

            {/* Health Features */}
            <section id="health">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "❤️ قابلیت‌های سلامتی" : "❤️ Health Features"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {healthFeatures.map((feature, idx) => (
                  <div key={idx} className="bg-gray-100/50 dark:bg-white/5 rounded-xl p-4 text-center hover:scale-105 transition-transform">
                    <feature.icon className={`w-6 h-6 ${feature.color} mx-auto mb-2`} />
                    <p className="text-xs font-semibold text-gray-800 dark:text-white">{feature.name[lang]}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "📊 مقایسه با نسل‌های قبل" : "📊 Comparison with Previous Generations"}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-amber-500">
                      <th className="py-3 text-left">{isRtl ? "مدل" : "Model"}</th>
                      <th className="py-3 text-left">Chip</th>
                      <th className="py-3 text-left">{isRtl ? "نمایشگر" : "Display"}</th>
                      <th className="py-3 text-left">{isRtl ? "باتری" : "Battery"}</th>
                      <th className="py-3 text-left">{isRtl ? "قیمت" : "Price"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seriesComparison.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 font-semibold text-gray-900 dark:text-white">{item.model}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">{item.chip}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">{item.display}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">{item.battery}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Specifications Table */}
            <section id="specs">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "📊 مشخصات فنی کامل" : "📊 Full Specifications"}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {specifications.map((spec, idx) => (
                      <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 font-semibold text-gray-700 dark:text-gray-300 w-1/3">{spec.label[lang]}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Final Verdict */}
            <section id="verdict" className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaStar className="text-yellow-300" />
                {isRtl ? "نتیجه نهایی" : "Final Verdict"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2">✅ {isRtl ? "نقاط قوت" : "Pros"}</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• {isRtl ? "نمایشگر بزرگتر و حاشیه‌های باریک‌تر" : "Larger display with thinner bezels"}</li>
                    <li>• {isRtl ? "تراشه S10 سریع و کم‌مصرف" : "Fast and efficient S10 chip"}</li>
                    <li>• {isRtl ? "قابلیت‌های کامل سلامتی" : "Comprehensive health features"}</li>
                    <li>• {isRtl ? "عمر باتری 24 ساعته" : "24-hour battery life"}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">❌ {isRtl ? "نقاط ضعف" : "Cons"}</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• {isRtl ? "قیمت نسبتاً بالا" : "Relatively high price"}</li>
                    <li>• {isRtl ? "بدون تغییرات انقلابی در طراحی" : "No revolutionary design changes"}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-bold">{isRtl ? "امتیاز نهایی:" : "Final Score:"} <span className="text-3xl">9.3/10</span></p>
                <div className="flex justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-300 w-5 h-5" />
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-5 text-center border border-amber-200 dark:border-amber-800">
              <FaApple className="w-10 h-10 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
              <p className="text-4xl font-black text-amber-600">9.3</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{isRtl ? "امتیاز نشریه" : "Editor's Score"}</p>
              <div className="flex justify-center gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 w-4 h-4" />
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-2xl p-5 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HiOutlineRss className="text-amber-500" />
                {isRtl ? "مقالات مرتبط" : "Related Articles"}
              </h3>
              <div className="space-y-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`${article.path}${article.slug}`}
                    className="block p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-600">
                      {article.name}
                    </span>
                    <span className="text-xs text-gray-400 block">{article.year}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleAppleWatchSeries12;