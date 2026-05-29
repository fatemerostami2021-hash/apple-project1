// src/pages/products/watch/article/ArticleAppleWatchSE3.jsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FaApple, FaStar } from "react-icons/fa";
import { HiOutlineRss } from "react-icons/hi";

// ✅ اصلاح مسیر - از 3 سطح به 4 سطح
import watchSE3 from "../../../../assets/watch/Apple_Watch_SE_3rd_Gen_2025.png";
import watchSE2 from "../../../../assets/watch/Apple_Watch_SE_2nd_Gen_2022.png";
import watchSE1 from "../../../../assets/watch/Apple_Watch_SE_1st_Gen_2020.png";

const ArticleAppleWatchSE3 = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const lang = i18n.language;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relatedArticles = [
    { slug: "apple-watch-ultra-4", name: "Apple Watch Ultra 4", year: 2026, path: "/apple-products/watch/article/" },
    { slug: "apple-watch-ultra-3", name: "Apple Watch Ultra 3", year: 2025, path: "/apple-products/watch/article/" },
    { slug: "apple-watch-series-12", name: "Apple Watch Series 12", year: 2026, path: "/apple-products/watch/article/" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8" dir={isRtl ? "rtl" : "ltr"}>
      <Helmet>
        <title>{isRtl ? "بررسی اپل واچ SE ۳" : "Apple Watch SE 3 Review"}</title>
      </Helmet>

      {/* Breadcrumb */}
      <nav className="max-w-5xl mx-auto mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
        <Link to="/" className="hover:text-amber-600 transition-colors">🏠 {isRtl ? "خانه" : "Home"}</Link>
        <span>/</span>
        <Link to="/apple-products/watch" className="hover:text-amber-600 transition-colors">
          {isRtl ? "اپل واچ" : "Apple Watch"}
        </Link>
        <span>/</span>
        <span className="text-amber-600 dark:text-amber-400">{isRtl ? "اپل واچ SE ۳" : "Apple Watch SE 3"}</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8">
              <img src={watchSE3} alt="Apple Watch SE 3" className="w-full max-w-md mx-auto object-contain drop-shadow-2xl" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <FaApple className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Apple • 2025</span>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span className="text-sm text-amber-600 dark:text-amber-400 font-bold">⭐ 4.5</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
                {isRtl ? "بررسی تخصصی اپل واچ SE ۳" : "Apple Watch SE 3 In-Depth Review"}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {isRtl ? "بهترین ساعت هوشمند اقتصادی اپل" : "The Best Budget Apple Smartwatch"}
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
                  { id: "features", label: isRtl ? "ویژگی‌ها" : "Features" },
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
              <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                {isRtl
                  ? "اپل واچ SE ۳ در سال ۲۰۲۵ معرفی شد و با قیمت مناسب و قابلیت‌های ضروری، بهترین گزینه برای کاربرانی است که به دنبال یک ساعت هوشمند مقرون به صرفه هستند."
                  : "The Apple Watch SE 3 was introduced in 2025, offering an affordable price and essential features, making it the best option for users seeking a budget-friendly smartwatch."}
              </p>
            </section>

            {/* Features */}
            <section id="features">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "✨ ویژگی‌های برجسته" : "✨ Key Features"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-100/50 dark:bg-white/5 rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300">✅ {isRtl ? "تراشه S8 SIP" : "S8 SIP chip"}</p>
                </div>
                <div className="bg-gray-100/50 dark:bg-white/5 rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300">✅ {isRtl ? "نمایشگر Retina LTPO" : "Retina LTPO display"}</p>
                </div>
                <div className="bg-gray-100/50 dark:bg-white/5 rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300">✅ {isRtl ? "تشخیص تصادف" : "Crash detection"}</p>
                </div>
                <div className="bg-gray-100/50 dark:bg-white/5 rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300">✅ {isRtl ? "سنسور اکسیژن خون" : "Blood oxygen sensor"}</p>
                </div>
              </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-amber-500 inline-block pb-1">
                {isRtl ? "📊 مقایسه نسل‌ها" : "📊 Generations Comparison"}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-amber-500">
                      <th className="py-3 text-left">{isRtl ? "مدل" : "Model"}</th>
                      <th className="py-3 text-left">{isRtl ? "تراشه" : "Chip"}</th>
                      <th className="py-3 text-left">{isRtl ? "سال" : "Year"}</th>
                      <th className="py-3 text-left">{isRtl ? "قیمت" : "Price"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 font-semibold">SE 3</td>
                      <td className="py-3">S8 SIP</td>
                      <td className="py-3">2025</td>
                      <td className="py-3">$279</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 font-semibold">SE 2</td>
                      <td className="py-3">S6 SIP</td>
                      <td className="py-3">2022</td>
                      <td className="py-3">$249</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 font-semibold">SE 1</td>
                      <td className="py-3">S5 SIP</td>
                      <td className="py-3">2020</td>
                      <td className="py-3">$279</td>
                    </tr>
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
              <p className="text-center text-lg mb-4">
                {isRtl
                  ? "اپل واچ SE ۳ بهترین انتخاب برای کاربرانی است که می‌خواهند وارد اکوسیستم اپل واچ شوند بدون اینکه هزینه زیادی کنند."
                  : "The Apple Watch SE 3 is the best choice for users who want to enter the Apple Watch ecosystem without spending too much."}
              </p>
              <div className="text-center">
                <p className="text-lg font-bold">{isRtl ? "امتیاز نهایی:" : "Final Score:"} <span className="text-3xl">8.7/10</span></p>
                <div className="flex justify-center gap-1 mt-2">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-300 w-5 h-5" />
                  ))}
                  <FaStar className="text-yellow-300/50 w-5 h-5" />
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-5 text-center border border-amber-200 dark:border-amber-800">
              <FaApple className="w-10 h-10 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
              <p className="text-4xl font-black text-amber-600">8.7</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{isRtl ? "امتیاز نشریه" : "Editor's Score"}</p>
              <div className="flex justify-center gap-0.5 mt-2">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 w-4 h-4" />
                ))}
                <FaStar className="text-yellow-500/50 w-4 h-4" />
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

export default ArticleAppleWatchSE3;