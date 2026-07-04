import { useState, useCallback } from "react";
import { HiOutlineEye, HiHeart } from "react-icons/hi";
import { motion } from "framer-motion";
import { getMainVideo, getRelatedVideos } from "../../constants/ArticleData";
import { useComments, useLike } from "../../hooks/useArticlePage";
import { useTheme } from "../../store/theme";

/* ── CinematicGallery ────────────────────────────────────── */
export function CinematicGallery({ images, isRtl }) {
  const [lightbox, setLightbox] = useState(null);

  const close = useCallback(() => setLightbox(null), []);

  if (!images?.length) return null;

  return (
    <div className="my-10">
      <h3 className="text-xl font-bold mb-4 text-amber-500 flex items-center gap-2">
        <span className="w-1 h-6 bg-amber-500 rounded-full" aria-hidden="true" />
        {isRtl ? "گالری تصاویر" : "Image Gallery"}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="relative group overflow-hidden rounded-xl aspect-video focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            onClick={() => setLightbox(img)}
            aria-label={`تصویر ${idx + 1}`}
          >
            <img
              src={img}
              alt={`gallery ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-lg" aria-hidden="true">🔍</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="تصویر بزرگ"
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl shadow-amber-500/20"
          />
          <button
            className="absolute top-4 right-4 text-white text-xl bg-black/60 rounded-full w-10 h-10 hover:bg-amber-500 hover:text-black transition flex items-center justify-center"
            onClick={close}
            aria-label="بستن"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

// ✅ VideoSection اصلاح شده - فقط از mainVideo props استفاده می‌کند
export function VideoSection({ slug, isRtl, mainVideo }) {
  // اگر mainVideo وجود ندارد یا id آن خالی است، چیزی نمایش نده
  if (!mainVideo || !mainVideo.id) {
    return null;
  }

  // فقط از mainVideo props استفاده کن، نه از getMainVideo
  const [active, setActive] = useState(mainVideo);
  const relatedVideos = []; // ویدیوهای مرتبط فعلاً خالی

  return (
    <div className="my-10">
      <h3 className="text-xl font-bold mb-4 text-amber-500 flex items-center gap-2">
        <span className="w-1 h-6 bg-amber-500 rounded-full" aria-hidden="true" />
        {isRtl ? "ویدیو بررسی" : "Video Review"}
      </h3>

      <div className="grid grid-cols-1 gap-4">
        <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-xl shadow-amber-500/10">
          <iframe
            src={`https://www.youtube.com/embed/${active.id}?rel=0`}
            title={active.title || 'Video'}
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        {active.title && (
          <p className="font-semibold mt-2 text-white">{active.title}</p>
        )}
        {active.duration && (
          <p className="text-sm text-gray-400">{active.duration}</p>
        )}
      </div>
    </div>
  );
}

/* ── CommentsSection ─────────────────────────────────────── */
export function CommentsSection({ articleSlug, isRtl }) {
  const { comments, loading, submitting, addComment } = useComments(articleSlug);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await addComment({ author, text });
    if (ok) {
      setText("");
      setFeedback("success");
      setTimeout(() => setFeedback(null), 3000);
    } else {
      setFeedback("error");
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="my-10 pt-6 border-t border-gray-800">
      <h3 className="text-xl font-bold mb-6 text-white">
        💬 {isRtl ? "نظرات" : "Comments"}{" "}
        <span className="text-gray-500 font-normal text-base">({comments.length})</span>
      </h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 rounded-xl bg-gray-900/50 border border-gray-800 space-y-2">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder={isRtl ? "نام شما (اختیاری)" : "Your name (optional)"}
          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900/80 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition text-sm"
          maxLength={60}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isRtl ? "نظر خود را بنویسید..." : "Write your comment..."}
          rows={3}
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900/80 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition text-sm resize-none"
          maxLength={1000}
        />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={submitting || !text.trim()}
            className="px-5 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "..." : isRtl ? "ارسال" : "Send"}
          </button>
          {feedback === "success" && (
            <span className="text-green-400 text-sm">✓ {isRtl ? "ارسال شد" : "Sent!"}</span>
          )}
          {feedback === "error" && (
            <span className="text-red-400 text-sm">⚠ {isRtl ? "خطا در ارسال" : "Failed"}</span>
          )}
        </div>
      </form>

      {/* List */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 bg-gray-900/50 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center text-gray-600 text-sm py-8">
          {isRtl ? "اولین نفری باشید که نظر می‌دهید" : "Be the first to comment"}
        </p>
      ) : (
        <div className="space-y-2">
          {comments.map((c) => (
            <div key={c._id} className="p-3 rounded-lg bg-gray-900/50 border border-gray-800/50">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white text-sm">{c.author}</span>
                <span className="text-xs text-gray-600">
                  {new Date(c.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Sidebar ─────────────────────────────────────────────── */
export function Sidebar({ article, activeId, views, isRtl }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { liked, count, toggle } = useLike(article?.slug, article?.likes || 0);
  const [sections, setSections] = useState([]);

  useState(() => {
    if (!article?.content?.fa) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.content.fa, "text/html");
    setSections(
      Array.from(doc.querySelectorAll("h2, h3")).map((h, idx) => ({
        id: `sec-${idx}`,
        title: h.textContent,
      }))
    );
  });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ===== توکن‌های شیشه‌ای — بدون بک‌گراند صاف، فقط بلور + مرز ظریف، سازگار با تم روشن/تیره =====
  const glass = isDark
    ? "border border-white/10 bg-white/[0.045] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]"
    : "border border-black/[0.06] bg-white/55 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)]";
  const textPrimary = isDark ? "text-white" : "text-zinc-900";
  const textMuted = isDark ? "text-zinc-400" : "text-zinc-500";

  return (
    <aside className="lg:sticky lg:top-24 space-y-4 w-full lg:w-72 flex-shrink-0">
      {/* Author */}
      <div className={`relative overflow-hidden text-center p-5 rounded-2xl backdrop-blur-2xl backdrop-saturate-150 ${glass}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-black text-xl font-black shadow-[0_6px_20px_rgba(245,158,11,0.35)] ring-2 ring-amber-500/20">
          {(article?.author?.[0] || "T").toUpperCase()}
        </div>
        <h4 className={`mt-3 font-bold text-sm ${textPrimary}`}>{article?.author || "Tech Team"}</h4>
        <p className={`mt-0.5 text-[11px] font-medium tracking-wide uppercase ${textMuted}`}>
          {isRtl ? "نویسنده" : "Author"}
        </p>
      </div>

      {/* Stats */}
      <div
        className={`flex divide-x rtl:divide-x-reverse ${
          isDark ? "divide-white/10" : "divide-black/[0.06]"
        } rounded-2xl backdrop-blur-2xl backdrop-saturate-150 overflow-hidden ${glass}`}
      >
        <div className="flex-1 text-center py-3.5">
          <HiOutlineEye className="w-5 h-5 mx-auto text-amber-500" aria-hidden="true" />
          <p className={`font-bold mt-1 text-sm ${textPrimary}`}>{views}</p>
          <p className={`text-[10px] ${textMuted}`}>{isRtl ? "بازدید" : "Views"}</p>
        </div>
        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.85 }}
          className="flex-1 text-center py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset"
          aria-label={liked ? "Unlike" : "Like"}
        >
          <motion.div animate={liked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.35 }}>
            <HiHeart
              className={`w-5 h-5 mx-auto ${liked ? "text-amber-500 fill-amber-500" : "text-amber-500/70"}`}
              aria-hidden="true"
            />
          </motion.div>
          <p className={`font-bold mt-1 text-sm ${textPrimary}`}>{count}</p>
          <p className={`text-[10px] ${textMuted}`}>{isRtl ? "لایک" : "Likes"}</p>
        </motion.button>
      </div>

      {/* Table of contents */}
      {sections.length > 0 && (
        <nav
          className={`p-4 rounded-2xl backdrop-blur-2xl backdrop-saturate-150 ${glass}`}
          aria-label="فهرست مطالب"
        >
          <p className="text-[11px] font-bold text-amber-500 mb-3 uppercase tracking-[0.15em]">
            {isRtl ? "فهرست مطالب" : "Contents"}
          </p>
          <div className="max-h-[280px] overflow-y-auto custom-scrollbar space-y-0.5">
            {sections.map((s) => {
              const active = activeId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`relative w-full text-left rtl:text-right px-3 py-2 text-xs rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 ${
                    active
                      ? `font-bold text-amber-500 ${isDark ? "bg-amber-500/10" : "bg-amber-500/[0.08]"} pl-4 rtl:pl-3 rtl:pr-4`
                      : `${textMuted} ${
                          isDark
                            ? "hover:text-white hover:bg-white/5"
                            : "hover:text-zinc-900 hover:bg-black/[0.03]"
                        }`
                  }`}
                >
                  {active && (
                    <span className="absolute left-1 rtl:left-auto rtl:right-1 top-1/2 -translate-y-1/2 w-[3px] h-3.5 bg-amber-500 rounded-full" />
                  )}
                  {s.title}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Tags */}
      {article?.tags?.length > 0 && (
        <div className={`p-4 rounded-2xl backdrop-blur-2xl backdrop-saturate-150 ${glass}`}>
          <div className="flex flex-wrap gap-1.5" role="list" aria-label="تگ‌ها">
            {article.tags.slice(0, 8).map((t) => (
              <span
                key={t}
                role="listitem"
                className={`text-[10px] px-2.5 py-1 rounded-full border transition cursor-default ${
                  isDark
                    ? "text-zinc-400 border-white/10 hover:border-amber-500/60 hover:text-amber-500"
                    : "text-zinc-500 border-black/[0.08] hover:border-amber-500/60 hover:text-amber-500"
                }`}
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}