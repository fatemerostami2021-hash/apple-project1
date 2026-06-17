import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HiOutlineClock, HiOutlineEye, HiOutlineArrowRight, HiOutlineSparkles } from "react-icons/hi";
import { GiSwapBag } from "react-icons/gi";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PLACEHOLDER = "/images/placeholder.png";

export default function BlogPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRTL = lang === "fa";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandFilter, setBrandFilter] = useState("All");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/articles`);
        setArticles(res.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // ✅ مقالات مقایسه — بر اساس category یا tags
  const comparisonArticles = useMemo(() => {
    return articles.filter(a =>
      a.category?.toLowerCase() === "comparison" || a.tags?.includes("Comparison")
    );
  }, [articles]);

  const featuredArticle = useMemo(() => {
    if (articles.length === 0) return null;
    return [...articles].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))[0];
  }, [articles]);

  // ✅ Fix: فیلتر برند به‌جای حذف مقایسه‌ها، گزینه "Comparison" رو هم پشتیبانی می‌کند
  const filtered = useMemo(() => {
    if (brandFilter === "All") return articles;
    if (brandFilter === "Comparison") return comparisonArticles;
    return articles.filter(a => a.brand?.toLowerCase() === brandFilter.toLowerCase());
  }, [articles, brandFilter, comparisonArticles]);

  const getLang = useCallback((v) => {
    if (!v) return "";
    return typeof v === "object" ? (v[lang] || v.en || "") : v;
  }, [lang]);

  const brands = ["All", "Apple", "Samsung", "Comparison"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-neutral-400 dark:text-neutral-500">
            {isRTL ? "در حال بارگذاری..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent gap-4">
        <p className="text-5xl">📡</p>
        <p className="text-neutral-500 dark:text-neutral-400">{isRTL ? "خطا در بارگذاری مقالات" : "Failed to load articles"}</p>
        <button onClick={() => window.location.reload()}
          className="px-5 py-2 bg-amber-500 text-black rounded-full text-sm font-bold hover:opacity-80 transition">
          {isRTL ? "تلاش مجدد" : "Retry"}
        </button>
      </div>
    );
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-transparent transition-colors">

      {/* ════════════════════ HERO ════════════════════ */}
      {featuredArticle && (
        <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={featuredArticle.cover || PLACEHOLDER}
              alt={getLang(featuredArticle.title)}
              className="w-full h-full object-cover scale-105"
              onError={e => { e.currentTarget.src = PLACEHOLDER; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
          </div>

          {/* Ambient glow — amber theme فقط */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/20 blur-3xl rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-300/10 blur-3xl rounded-full" />
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div className="max-w-2xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 backdrop-blur-sm border border-amber-500/30 mb-4">
                  <HiOutlineSparkles className="text-amber-400" size={15} />
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {isRTL ? "جدیدترین مقاله" : "Latest Article"}
                  </span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                  {getLang(featuredArticle.title)}
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="text-base md:text-lg text-white/75 max-w-xl mb-6 line-clamp-2">
                  {getLang(featuredArticle.excerpt)}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center gap-4">
                  <Link to={`/blog/${featuredArticle.slug}`}
                    className="px-7 py-3 bg-amber-500 text-black rounded-full font-bold hover:bg-amber-400 transition-all flex items-center gap-2 group">
                    {isRTL ? "مطالعه مقاله" : "Read Article"}
                    <HiOutlineArrowRight size={15} className={`group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180" : ""}`} />
                  </Link>

                  {comparisonArticles.length > 0 && (
                    <Link to={`/blog/${comparisonArticles[0]?.slug}`}
                      className="px-7 py-3 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white font-bold hover:bg-white/20 transition flex items-center gap-2">
                      <GiSwapBag size={16} />
                      {isRTL ? "مقایسه محصولات" : "Compare Products"}
                    </Link>
                  )}

                  <span className="text-sm text-white/60 flex items-center gap-2">
                    <span>{featuredArticle.brand}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime} {isRTL ? "دقیقه" : "min"}</span>
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 rounded-full bg-white/60" />
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════ MAIN CONTENT ════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ───── Articles Grid ───── */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
                  {isRTL ? "همه مقالات" : "All Articles"}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {articles.length} {isRTL ? "مقاله تخصصی" : "expert articles"}
                </p>
              </div>
            </div>

            {/* Brand Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {brands.map(b => (
                <button key={b} onClick={() => setBrandFilter(b)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                    brandFilter === b
                      ? "bg-amber-500 text-black scale-105 shadow-lg"
                      : "border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-amber-500 hover:text-amber-500"
                  }`}>
                  {b === "Comparison" && <GiSwapBag size={13} />}
                  {b === "All" ? (isRTL ? "همه" : "All") : b}
                  {b === "Comparison" && comparisonArticles.length > 0 && (
                    <span className="text-[10px] opacity-70">({comparisonArticles.length})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Articles Grid — کاورهای چندبعدی */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <p className="text-neutral-500 dark:text-neutral-400">{isRTL ? "مقاله‌ای یافت نشد" : "No articles found"}</p>
                </div>
              ) : (
                filtered.map((article, idx) => {
                  const isComparison = article.category?.toLowerCase() === "comparison" || article.tags?.includes("Comparison");
                  return (
                    <motion.article key={article._id || article.slug}
                      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
                      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
                    >
                      <Link to={`/blog/${article.slug}`} aria-label={getLang(article.title)}>
                        {/* Cover — لایه‌های چندبعدی */}
                        <div className="h-48 overflow-hidden relative">
                          <img src={article.cover || PLACEHOLDER} alt={getLang(article.title)}
                            className="h-48 w-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                            onError={e => { e.currentTarget.src = PLACEHOLDER; }} />

                          {/* Glass shine layer */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          {/* Bottom gradient depth */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                          {isComparison && (
                            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center gap-1 shadow-lg">
                              <GiSwapBag size={12} />
                              {isRTL ? "مقایسه" : "Comparison"}
                            </div>
                          )}

                          <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                            {article.brand}
                          </span>
                        </div>

                        <div className="p-5">
                          <h2 className="font-bold text-lg text-neutral-900 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors leading-snug">
                            {getLang(article.title)}
                          </h2>
                          <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                            <span className="flex items-center gap-1"><HiOutlineClock size={12} />{article.readTime} {isRTL ? "دقیقه" : "min"}</span>
                            <span className="flex items-center gap-1"><HiOutlineEye size={12} />{article.views || 0}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })
              )}
            </div>
          </div>

          {/* ───── Sidebar ───── */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">

              {comparisonArticles.length > 0 && (
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-sm font-black text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    <GiSwapBag className="text-amber-500" size={16} />
                    {isRTL ? "مقایسه‌های داغ" : "Hot Comparisons"}
                  </h3>
                  <div className="space-y-3">
                    {comparisonArticles.slice(0, 4).map(article => (
                      <Link key={article._id || article.slug} to={`/blog/${article.slug}`}
                        className="block p-3 rounded-xl bg-white dark:bg-neutral-800 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all group">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                          {getLang(article.title)}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                          {article.brand} • {article.readTime} {isRTL ? "دقیقه" : "min"}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-black text-neutral-900 dark:text-white mb-4">
                  {isRTL ? "دسته‌بندی‌ها" : "Categories"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map(b => (
                    <button key={b} onClick={() => setBrandFilter(b)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        brandFilter === b
                          ? "bg-amber-500 text-black"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-amber-500/20"
                      }`}>
                      {b === "All" ? (isRTL ? "همه" : "All") : b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-2xl p-6 border border-amber-500/20">
                <h3 className="text-sm font-black text-neutral-900 dark:text-white mb-3">
                  {isRTL ? "آمار سریع" : "Quick Stats"}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white/60 dark:bg-white/5 rounded-xl">
                    <p className="text-2xl font-black text-amber-500">{articles.length}</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{isRTL ? "مقاله" : "Articles"}</p>
                  </div>
                  <div className="text-center p-3 bg-white/60 dark:bg-white/5 rounded-xl">
                    <p className="text-2xl font-black text-amber-500">{comparisonArticles.length}</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{isRTL ? "مقایسه" : "Comparisons"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}