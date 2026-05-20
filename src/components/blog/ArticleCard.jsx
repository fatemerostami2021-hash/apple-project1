import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineClock, HiOutlineEye } from "react-icons/hi";
import { cardVariants, imageVariants, fadeUp } from "../../utils/motionVariants";

const difficultyColors = {
  Easy: `bg-zinc-100/70 text-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-700/80`,
  Medium: `bg-amber-50/80 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-100/60 dark:border-amber-700/70`,
  Hard: `bg-rose-50/85 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-100/60 dark:border-rose-700/70`,
  Pro: `bg-sky-50/90 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border border-sky-100/60 dark:border-sky-700/70`,
};

export default function ArticleCard({ article, lang, index = 0 }) {
  const title = article?.title?.[lang] || "Untitled";
  const excerpt = article?.excerpt?.[lang] || "No description available.";
  const difficulty = article?.difficulty || "Easy";
  const rating = article?.rating ?? 4.8;
  const commentsCount = article?.commentsCount ?? article?.comments?.length ?? 0;

  return (
    <Link to={`/blog/${article.slug}`} className="block h-full">
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate="show"
        whileHover="hover"
        className="
          group h-full overflow-hidden rounded-3xl border border-white/20 dark:border-white/10
          bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg shadow-lg
          hover:border-yellow-500/50 hover:shadow-[0_0_25px_-5px_rgba(234,179,8,0.3)]
          transition-all duration-500
        "
      >
        {/* IMAGE AREA - ارتفاع بیشتر */}
        <div className="relative h-64 w-full overflow-hidden">
          <motion.img
            variants={imageVariants}
            initial="rest"
            src={article.cover}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

          {article.brand && (
            <span className="absolute top-3 left-3 bg-white/90 dark:bg-black/60 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm text-gray-900 dark:text-white">
              {article.brand}
            </span>
          )}

          {article.isTrending && (
            <span className="absolute top-3 right-3 bg-rose-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
              Trending
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col gap-3">
          {/* META BADGES */}
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${difficultyColors[difficulty] || difficultyColors.Easy}`}>
              {difficulty}
            </span>
            <span className="text-[11px] font-medium bg-white/50 dark:bg-zinc-800/50 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full">⭐ {rating}</span>
            <span className="text-[11px] font-medium bg-white/50 dark:bg-zinc-800/50 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full">💬 {commentsCount}</span>
          </div>

          {/* TITLE - فشرده */}
          <h3 className="text-lg font-extrabold leading-snug text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* EXCERPT - فشرده */}
          <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
            {excerpt}
          </p>

          <hr className="border-gray-200/50 dark:border-zinc-700/50 my-1" />

          {/* META INFO */}
          <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 dark:text-gray-400">
            {article.readTime && <span className="flex items-center gap-1"><HiOutlineClock className="text-sky-500" /> {article.readTime} m</span>}
            {article.views && <span className="flex items-center gap-1"><HiOutlineEye className="text-sky-500" /> {article.views}</span>}
            {article.publishDate && <span>{new Date(article.publishDate).toLocaleDateString("fa-IR")}</span>}
          </div>

          {/* CTA */}
          <div className="mt-1 flex items-center gap-1 text-yellow-600 dark:text-yellow-500 font-bold text-xs">
            <span>مطالعه مقاله</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
