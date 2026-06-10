import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HiOutlineClock, HiOutlineCalendar, HiOutlineEye } from "react-icons/hi";
import OptimizedImage from "../components/ui/OptimizedImage";
import { SEOHead } from "../components/seo/SEOHead";
import { useFetch } from "../hooks/useFetch";
import { getArticles } from "../api/index";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function BlogPage() {
  const { i18n } = useTranslation();
  const lang  = i18n.language === "fa" ? "fa" : "en";
  const isRTL = lang === "fa";

  const [brandFilter, setBrandFilter] = useState("All");
  const { data: raw, loading, error, refetch } = useFetch(getArticles, {}, { fallback: [] });

  const articles = Array.isArray(raw) ? raw : [];

  const filtered = useMemo(() => {
    if (brandFilter === "All") return articles;
    return articles.filter(a => a.brand?.toLowerCase() === brandFilter.toLowerCase());
  }, [articles, brandFilter]);

  const getLang = useCallback(v => {
    if (!v) return "";
    return typeof v === "object" ? (v[lang] || v.en || "") : v;
  }, [lang]);

  const brands = ["All", "Apple", "Samsung", "Comparison"];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <SEOHead
        title={isRTL ? "مقالات و بررسی‌ها" : "Articles & Reviews"}
        description={isRTL ? "بررسی جدیدترین محصولات اپل و سامسونگ" : "Latest Apple and Samsung product reviews"}
        url="/blog"
        lang={lang}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4"
          >
            {isRTL ? "مقالات تخصصی" : "Tech Reviews"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto"
          >
            {isRTL ? "بررسی، مقایسه و راهنمای خرید جدیدترین گجت‌ها" : "In-depth reviews, comparisons, and buying guides"}
          </motion.p>
        </div>

        {/* Brand Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {brands.map(b => (
            <button 
              key={b} 
              onClick={() => setBrandFilter(b)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                brandFilter === b 
                  ? "bg-[#D4AF37] text-black scale-105 shadow-lg" 
                  : "border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }`}
            >
              {b === "All" ? (isRTL ? "همه" : "All") : b}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 animate-pulse">
                <div className="h-48 bg-neutral-200 dark:bg-neutral-700" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4" />
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-neutral-500 mb-4">{isRTL ? "خطا در بارگذاری مقالات" : "Failed to load articles"}</p>
            <button 
              onClick={refetch} 
              className="px-5 py-2 bg-[#D4AF37] text-black rounded-full text-sm font-bold hover:opacity-80 transition"
            >
              {isRTL ? "تلاش مجدد" : "Retry"}
            </button>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-neutral-500">{isRTL ? "مقاله‌ای یافت نشد" : "No articles found"}</p>
              </div>
            ) : (
              filtered.map((article, idx) => (
                <motion.article 
                  key={article._id || article.slug} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-300"
                >
                  <Link to={`/article/${article.slug}`} aria-label={getLang(article.title)}>
                    <div className="h-48 overflow-hidden relative">
                      <OptimizedImage 
                        src={article.cover} 
                        alt={getLang(article.title)}
                        className="h-48 w-full group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">{article.brand}</span>
                      <h2 className="font-bold text-lg text-neutral-900 dark:text-white mt-2 mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                        {getLang(article.title)}
                      </h2>
                      <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="flex items-center gap-1">
                          <HiOutlineClock size={12} /> {article.readTime} {isRTL ? "دقیقه" : "min"}
                        </span>
                        <span className="flex items-center gap-1">
                          <HiOutlineEye size={12} /> {article.views || 0}
                        </span>
                        {article.publishDate && (
                          <span className="flex items-center gap-1">
                            <HiOutlineCalendar size={12} />
                            {new Date(article.publishDate).toLocaleDateString(lang === "fa" ? "fa-IR" : "en-US")}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {article.tags?.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[9px] bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded-full">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
