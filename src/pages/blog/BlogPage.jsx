import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

import articlesData from "../../data/articlesData";
import BlogHero from "../../components/blog/BlogHero";
import BlogFilters from "../../components/blog/BlogFilters";
import ArticleCard from "../../components/blog/ArticleCard";
import { fadeUp, staggerContainer } from "../../utils/motionVariants";

/** ✅ کامپوننت تایپینگ اصلاح‌شده */
function TypingText({ text = "", speed = 100, delay = 2000, className }) {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // اطمینان از اینکه متن رشته است
    const safeText = text && typeof text === 'string' ? text : "";
    if (!safeText) return;

    let timeout;

    const tick = () => {
      setDisplayed((prev) => {
        const currentLength = prev.length;
        
        // اگر در حال تایپ هستیم
        if (!isDeleting) {
          if (currentLength < safeText.length) {
            return safeText.substring(0, currentLength + 1);
          } else {
            // رسیدیم به انتها، وقفه ایجاد کن و بعد شروع به حذف کن
            timeout = setTimeout(() => setIsDeleting(true), delay);
            return prev;
          }
        } 
        // اگر در حال حذف هستیم
        else {
          if (currentLength > 0) {
            return safeText.substring(0, currentLength - 1);
          } else {
            // تمام شد، دوباره از اول تایپ کن
            setIsDeleting(false);
            return "";
          }
        }
      });
    };

    const interval = setInterval(tick, isDeleting ? speed / 2 : speed);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, speed, delay, isDeleting]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse inline-block">|</span>
    </span>
  );
}

/** ✅ صفحه بلاگ نهایی */
export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRTL = lang === "fa";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const articlesRef = useRef(null);

  /** برندهای داینامیک */
  const brands = useMemo(() => {
    const raw = articlesData.map((a) => a?.brand).filter(Boolean);
    return ["all", ...new Set(raw)];
  }, []);

  /** فیلتر و مرتب‌سازی */
  const filteredArticles = useMemo(() => {
    let list = [...articlesData];

    if (selectedBrand !== "all") list = list.filter((a) => a.brand === selectedBrand);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((a) => {
        const title = a?.title?.[lang]?.toLowerCase() || "";
        const excerpt = a?.excerpt?.[lang]?.toLowerCase() || "";
        return title.includes(q) || excerpt.includes(q);
      });
    }

    switch (sortBy) {
      case "mostViewed":
        list.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "shortestRead":
        list.sort((a, b) => (a.readTime || 0) - (b.readTime || 0));
        break;
      default:
        list.sort(
          (a, b) =>
            new Date(b.publishDate || 0) - new Date(a.publishDate || 0)
        );
    }

    return list;
  }, [searchQuery, selectedBrand, sortBy, lang]);

  /** مقالات ترند */
  const trending = articlesData.filter((a) => a?.isTrending).slice(0, 3);

  /** برای اسکرول نرم بعد از تغییر فیلتر */
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    if (articlesRef.current) {
      articlesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

   return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen text-gray-900 dark:text-white">
      <BlogHero />

      <div className="max-w-7xl mx-auto px-6">
        <BlogFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery} // مستقیم پاس دادیم
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand} // مستقیم پاس دادیم
          sortBy={sortBy}
          setSortBy={setSortBy} // مستقیم پاس دادیم
          brands={brands}
        />

        {/* 🔥 بخش Trendining */}
        {trending.length > 0 && !searchQuery && selectedBrand === "all" && (
          <section
            className="mb-20 rounded-3xl p-8"
            style={{
              background: "linear-gradient(135deg, #b8860b 0%, #000000cc 90%)",
              backdropFilter: "blur(15px)",
              boxShadow: "0 0 40px rgba(184,134,11,0.8)",
            }}
          >
<motion.h2
  initial={{ x: -50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 60, damping: 12 }}
  className="text-4xl font-extrabold mb-12 select-none"
>
  {/* استفاده مستقیم از کلید ترجمه */}
  <TypingText
    text={t("blog.trending")} 
    className="bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-500 bg-clip-text text-transparent font-extrabold"
    speed={120}
  />
</motion.h2>



            <div className="grid md:grid-cols-3 gap-8">
              {trending.map((article) => (
                <Link key={article.id} to={`/blog/${article.slug}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="group relative overflow-hidden rounded-3xl border border-yellow-800 
                               shadow-lg shadow-yellow-900/50 cursor-pointer bg-black bg-opacity-70 
                               backdrop-filter backdrop-blur-md transition-all duration-300 flex flex-col"
                  >
                    <motion.img
                      src={article.cover}
                      alt={article.title?.[lang] || ""}
                      className="h-64 w-full object-contain rounded-t-3xl border-b border-yellow-800 
                                 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
                      draggable={false}
                      loading="lazy"
                    />

                    <div className="p-6 flex flex-col flex-grow">
                    <motion.h3
  className="font-extrabold text-2xl line-clamp-2 flex items-center gap-3 text-[#1a237e]"
  // ... سایر پراپ ها
>
  <FiFileText className="text-yellow-600 text-3xl" />
  <TypingText
    // استفاده از || برای جلوگیری از undefined
    text={article.title?.[lang] || "Untitled Article"}
    className="text-[#1a237e]"
    speed={50}
  />
</motion.h3>


                      <motion.p
                        className="text-[#283593] opacity-90 mt-3 text-sm line-clamp-3 flex-grow"
                        initial={{ opacity: 0.85 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {article.excerpt?.[lang]}
                      </motion.p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* اگر مقاله‌ای نبود */}
        {filteredArticles.length === 0 && (
          <p className="text-center opacity-60 text-lg mt-6">
            {t("blog.noArticles")}
          </p>
        )}

    {/* 🔽 لیست مقالات */}
<section id="articles-list" ref={articlesRef} className="pb-20">
  <motion.div
    layout
    variants={staggerContainer}
    initial="hidden"
    animate="show"
    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
  >
    {filteredArticles.map((article) => (
      <motion.div
        key={article.id}
        layout
        variants={fadeUp}
      >
        <ArticleCard article={article} lang={lang} />
      </motion.div>
    ))}
  </motion.div>
</section>

      </div>
    </div>
  );
}
