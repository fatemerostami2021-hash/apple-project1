import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { HiOutlineClock, HiOutlineCalendar, HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { iphoneArticles } from "../../data/iphoneArticles";
import { fadeUp, staggerContainer } from "../../utils/motionVariants";
export default function ArticlePage() {
  const { slug } = useParams();
  const { i18n, t } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRtl = lang === "fa";

  const article = useMemo(() => iphoneArticles.find((a) => a.slug === slug), [slug]);

  if (!article) return <div className="text-center py-20">Article not found</div>;

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="bg-white dark:bg-zinc-950 transition-colors duration-300">
      <Helmet>
        <title>{article.title[lang]} | Tech Magazine</title>
      </Helmet>

      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={article.cover}
          alt={article.title[lang]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-32 relative z-10 pb-20">
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/20 dark:border-zinc-800 shadow-2xl"
        >
          <div className="flex gap-4 text-sm text-blue-600 dark:text-blue-400 font-semibold mb-4 uppercase tracking-wider">
            {article.brand || "Tech"}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white leading-[1.1] mb-6">
            {article.title[lang]}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-zinc-500 dark:text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><HiOutlineCalendar /> {article.publishDate}</span>
            <span className="flex items-center gap-2"><HiOutlineClock /> {article.readTime} min read</span>
          </div>
        </motion.div>

        {/* --- CONTENT --- */}
        <article className="prose prose-lg dark:prose-invert prose-zinc mt-12 max-w-none leading-relaxed">
          {article.content[lang]}
        </article>

        {/* --- FOOTER --- */}
        <div className="mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <Link to="/blog" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition">
            {isRtl ? <HiOutlineArrowRight /> : <HiOutlineArrowLeft />}
            {isRtl ? "بازگشت" : "Back to Blog"}
          </Link>
      
          
        </div>
      </div>
    </main>
  );
}
