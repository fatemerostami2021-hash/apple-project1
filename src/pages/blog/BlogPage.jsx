// src/pages/blog/BlogPage.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineSearch,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineHeart,
  HiOutlineFire,
  HiOutlineTrendingUp,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineSparkles,
  HiOutlineAcademicCap,
} from "react-icons/hi";
import { FaApple } from "react-icons/fa";
import { SiSamsung } from "react-icons/si";
import { articlesData } from "../../data/articlesData";

// تایپینگ پیشرفته با افکت حرفه‌ای
function AdvancedTypewriter({ texts, isRtl }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const textIndex = loopNum % texts.length;

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, loopNum]);

  return (
    <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent font-black min-w-[360px]">
      {displayText}
      <span className="inline-block w-0.5 h-7 bg-amber-500 rounded animate-pulse ml-1 align-middle" />
    </span>
  );
}

export default function BlogPage() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const lang = isRtl ? "fa" : "en";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const articlesPerPage = 9;

  // تیترهای تایپینگ
  const typingTitles = useMemo(() => [
    isRtl ? "بررسی آیفون ۱۷ پرو مکس" : "iPhone 17 Pro Max Review",
    isRtl ? "مقایسه گلکسی S24 اولترا" : "Galaxy S24 Ultra Comparison",
    isRtl ? "تکنولوژی‌های جدید اپل" : "Latest Apple Technologies",
    isRtl ? "هوش مصنوعی در سامسونگ" : "AI in Samsung Devices",
    isRtl ? "مقالات تخصصی تک‌کرانچ" : "TechCrunch Expert Articles",
  ], [isRtl]);

  // تگ‌های داغ
  const allTags = useMemo(() => {
    const tags = new Set();
    articlesData.forEach(article => {
      article.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // فیلتر مقالات
  const filteredArticles = useMemo(() => {
    let filtered = [...articlesData];
    
    if (selectedBrand !== "all") {
      filtered = filtered.filter(article => article.brand === selectedBrand);
    }
    
    if (searchTerm.trim()) {
      filtered = filtered.filter(article =>
        article.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt[lang].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedTag !== "all") {
      filtered = filtered.filter(article => article.tags?.includes(selectedTag));
    }
    
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
        break;
      case "mostLiked":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "mostRead":
        filtered.sort((a, b) => b.readTime - a.readTime);
        break;
      default: break;
    }
    return filtered;
  }, [selectedBrand, searchTerm, selectedTag, sortBy, lang]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand, searchTerm, selectedTag, sortBy]);

  const trendingArticles = useMemo(() => {
    return [...articlesData].sort((a, b) => b.likes - a.likes).slice(0, 3);
  }, []);

  const stats = useMemo(() => {
    const totalArticles = articlesData.length;
    const totalLikes = articlesData.reduce((sum, a) => sum + a.likes, 0);
    const totalReadTime = articlesData.reduce((sum, a) => sum + a.readTime, 0);
    const brands = [...new Set(articlesData.map(a => a.brand))];
    return { totalArticles, totalLikes, totalReadTime, brands: brands.length };
  }, []);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  const brandFilters = [
    { id: "all", name: isRtl ? "همه برندها" : "All Brands", icon: null },
    { id: "Apple", name: "Apple", icon: <FaApple size={13} /> },
    { id: "Samsung", name: "Samsung", icon: <SiSamsung size={13} /> },
    { id: "Comparison", name: isRtl ? "مقایسه‌ای" : "Comparison", icon: <HiOutlineAcademicCap size={13} /> },
  ];

  const sortOptions = [
    { id: "newest", name: isRtl ? "جدیدترین" : "Newest First" },
    { id: "oldest", name: isRtl ? "قدیمی‌ترین" : "Oldest First" },
    { id: "mostLiked", name: isRtl ? "محبوب‌ترین" : "Most Liked" },
    { id: "mostRead", name: isRtl ? "طولانی‌ترین" : "Longest Read" },
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-transparent transition-colors duration-300">
      <Helmet>
        <title>{isRtl ? "مقالات تخصصی | تک‌کرانچ" : "Expert Articles | TechCrunch"}</title>
        <meta name="description" content={isRtl 
          ? "مقالات تخصصی بررسی آیفون و سامسونگ - آخرین تکنولوژی‌ها و مقایسه‌های حرفه‌ای" 
          : "Professional iPhone and Samsung reviews - Latest technology and expert comparisons"} />
      </Helmet>

      {/* ────────────────────────────────────────────── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-300/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge - Silver Glass */}
            <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl px-5 py-2 rounded-full mb-6 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <HiOutlineSparkles className="text-amber-600 dark:text-amber-400 animate-pulse" size={16} />
              <span className="text-xs font-black text-gray-700 dark:text-white/80 uppercase tracking-wider">
                {isRtl ? "بیش از ۵۰ مقاله تخصصی" : "50+ Expert Articles"}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
              {isRtl ? "مقالات" : "Articles"}
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent ml-3">
                {isRtl ? "تخصصی" : "Hub"}
              </span>
            </h1>

            {/* Typing Effect - Silver Glass Card */}
            <div className="inline-block bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 mb-6 border border-white/30 dark:border-white/10 shadow-lg">
              <div className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-bold">
                <span className="inline-block mr-2">
                  {isRtl ? " آخرین بررسی‌ها:" : " Latest reviews:"}
                </span>
                <AdvancedTypewriter texts={typingTitles} isRtl={isRtl} />
              </div>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
              {isRtl 
                ? "بررسی‌های عمیق، مقایسه‌های حرفه‌ای و آخرین اخبار دنیای تکنولوژی"
                : "In-depth reviews, professional comparisons, and the latest tech news"}
            </p>
          </motion.div>

          {/* Stats Bar - Silver Glass Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12"
          >
            {[
              { value: stats.totalArticles, label: isRtl ? "مقاله تخصصی" : "Expert Articles" },
              { value: stats.totalLikes.toLocaleString(), label: isRtl ? "لایک کاربران" : "User Likes" },
              { value: stats.totalReadTime, label: isRtl ? "دقیقه مطالعه" : "Minutes Read" },
              { value: stats.brands, label: isRtl ? "برند برتر" : "Top Brands" },
            ].map((stat, idx) => (
              <div key={idx} className="group relative bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-3xl md:text-4xl font-black text-amber-600 dark:text-amber-400">{stat.value}</p>
                <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── MAIN CONTENT ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ───────────────────── SIDEBAR - Silver Glass Filters ───────────────────── */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-5">
              
              {/* Search */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-white/10 shadow-lg">
                <div className="relative">
                  <HiOutlineSearch className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRtl ? "right-3" : "left-3"}`} size={17} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={isRtl ? "جستجوی مقالات..." : "Search articles..."}
                    className={`w-full py-2.5 rounded-xl bg-white/50 dark:bg-black/20 border border-white/30 dark:border-white/10 focus:border-amber-400 focus:outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/30 text-sm font-medium ${isRtl ? "pr-9 pl-3" : "pl-9 pr-3"}`}
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-white/10 shadow-lg">
                <h3 className="font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <span className="w-1 h-4 bg-amber-500 rounded-full" />
                  {isRtl ? "برند" : "Brand"}
                </h3>
                <div className="space-y-1.5">
                  {brandFilters.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                        selectedBrand === brand.id
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                          : "hover:bg-white/40 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {brand.icon && <span>{brand.icon}</span>}
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-white/10 shadow-lg">
                <h3 className="font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <HiOutlineTrendingUp className="text-amber-500" size={16} />
                  {isRtl ? "مرتب‌سازی" : "Sort By"}
                </h3>
                <div className="space-y-1.5">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`w-full text-start px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                        sortBy === option.id
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                          : "hover:bg-white/40 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Tags */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-white/10 shadow-lg">
                <h3 className="font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <HiOutlineFire className="text-amber-500" size={16} />
                  {isRtl ? "تگ‌های داغ" : "Trending Tags"}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {["all", ...allTags.slice(0, 10)].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all duration-200 ${
                        selectedTag === tag
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm"
                          : "bg-white/40 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/20"
                      }`}
                    >
                      {tag === "all" ? (isRtl ? "همه" : "All") : `#${tag}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Articles */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-white/10 shadow-lg">
                <h3 className="font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <HiOutlineTrendingUp className="text-amber-500" size={16} />
                  {isRtl ? "مقالات داغ" : "Trending"}
                </h3>
                <div className="space-y-2">
                  {trendingArticles.map((article, idx) => (
                    <Link
                      key={article.id}
                      to={`/blog/${article.slug}`}
                      className="flex items-center gap-2.5 group hover:bg-white/40 dark:hover:bg-white/10 p-1.5 rounded-xl transition-all duration-200"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-black text-xs shadow-md flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-gray-800 dark:text-gray-200 group-hover:text-amber-600 transition-colors line-clamp-1">
                          {article.title[lang]}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 mt-0.5">
                          <HiOutlineHeart size={9} />
                          {article.likes.toLocaleString()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ───────────────────── ARTICLES GRID ───────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-5">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                {isRtl
                  ? `نمایش ${paginatedArticles.length} از ${filteredArticles.length} مقاله`
                  : `Showing ${paginatedArticles.length} of ${filteredArticles.length} articles`}
              </p>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-20 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/10">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-bold">
                  {isRtl ? "مقاله‌ای یافت نشد" : "No articles found"}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedBrand("all");
                    setSelectedTag("all");
                  }}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm font-black hover:shadow-xl transition-all duration-300"
                >
                  {isRtl ? "پاک کردن فیلترها" : "Clear filters"}
                </button>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      variants={itemVariants}
                      layout
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <Link
                        to={`/blog/${article.slug}`}
                        className="group flex flex-col bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/40 dark:border-white/10 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1.5 h-full"
                      >
                        {/* Cover Image */}
                        <div className="relative overflow-hidden h-48 flex-shrink-0">
                          <img
                            src={article.cover}
                            alt={article.title[lang]}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute top-2.5 end-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                            {article.brand}
                          </div>
                          {article.isTrending && (
                            <div className="absolute top-2.5 start-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                              <HiOutlineFire size={9} />
                              {isRtl ? "داغ" : "Trending"}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2.5">
                            <span className="flex items-center gap-1">
                              <HiOutlineCalendar size={11} />
                              {new Date(article.publishDate).toLocaleDateString(isRtl ? "fa-IR" : "en-US")}
                            </span>
                            <span className="flex items-center gap-1">
                              <HiOutlineClock size={11} />
                              {article.readTime} {isRtl ? "دقیقه" : "min"}
                            </span>
                            <span className="flex items-center gap-1">
                              <HiOutlineHeart size={11} />
                              {article.likes.toLocaleString()}
                            </span>
                          </div>
                          <h3 className="text-base font-black text-gray-900 dark:text-white mb-1.5 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
                            {article.title[lang]}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-xs font-medium line-clamp-2 mb-3 leading-relaxed flex-1">
                            {article.excerpt[lang]}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {article.tags?.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] font-bold text-gray-400 dark:text-gray-500 bg-white/60 dark:bg-white/10 px-2 py-0.5 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination - Silver Glass */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-200 font-black"
                >
                  {isRtl ? <HiOutlineChevronRight size={16} /> : <HiOutlineChevronLeft size={16} />}
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-xl text-sm transition-all duration-200 font-black ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                          : "bg-white/60 dark:bg-white/5 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 border border-white/40 dark:border-white/10"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-200 font-black"
                >
                  {isRtl ? <HiOutlineChevronLeft size={16} /> : <HiOutlineChevronRight size={16} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── NEWSLETTER ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
            {isRtl ? "خبرنامه تک‌کرانچ" : "TechCrunch Newsletter"}
          </h2>
          <p className="text-white/90 max-w-md mx-auto mb-6 text-sm font-medium">
            {isRtl
              ? "اولین نفری باشید که از جدیدترین مقالات و بررسی‌ها مطلع می‌شوید"
              : "Be the first to know about the latest articles and reviews"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder={isRtl ? "ایمیل شما" : "Your email"}
              className="flex-1 px-5 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm font-medium"
            />
            <button
              onClick={handleSubscribe}
              className="px-6 py-3 bg-white text-amber-600 font-black rounded-xl hover:bg-gray-100 transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {subscribed
                ? (isRtl ? "✓ ثبت شد!" : "✓ Subscribed!")
                : (isRtl ? "عضویت" : "Subscribe")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}