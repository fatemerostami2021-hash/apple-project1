import { useState, useCallback, useEffect } from "react";
import { HiOutlineEye, HiHeart } from "react-icons/hi";
import { motion } from "framer-motion";
import { getMainVideo, getRelatedVideos } from "../../constants/ArticleData";
import { useComments, useLike } from "../../hooks/useArticlePage";
import { API_BASE } from "../../constants/ArticleData";

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

/* ── VideoSection ────────────────────────────────────────── */
export function VideoSection({ slug, isRtl }) {
  const mainVideo = getMainVideo(slug);
  const relatedVideos = getRelatedVideos(slug);
  const [active, setActive] = useState(mainVideo);

  const allVideos = [mainVideo, ...relatedVideos];

  return (
    <div className="my-10">
      <h3 className="text-xl font-bold mb-4 text-amber-500 flex items-center gap-2">
        <span className="w-1 h-6 bg-amber-500 rounded-full" aria-hidden="true" />
        {isRtl ? "ویدیو بررسی" : "Video Review"}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-xl shadow-amber-500/10">
            <iframe
              src={`https://www.youtube.com/embed/${active.id}?rel=0`}
              title={active.title}
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="font-semibold mt-2 text-white">{active.title}</p>
          <p className="text-sm text-gray-400">{active.duration}</p>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
          <p className="text-sm font-bold text-amber-400 mb-2">
            {isRtl ? "ویدیوهای مرتبط" : "Related Videos"}
          </p>
          {allVideos.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v)}
              className={`w-full flex gap-3 p-2 rounded-lg transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                active.id === v.id
                  ? "bg-amber-500/20 border border-amber-500/30"
                  : "hover:bg-gray-800/50"
              }`}
            >
              <img
                src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                alt={v.title}
                loading="lazy"
                className="w-24 h-14 rounded object-cover flex-shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-white line-clamp-2">{v.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{v.duration}</p>
              </div>
            </button>
          ))}
        </div>
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
  const { liked, count, toggle } = useLike(article?.slug, article?.likes || 0);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!article?.content?.fa) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.content.fa, "text/html");
    setSections(
      Array.from(doc.querySelectorAll("h2, h3")).map((h, idx) => ({
        id: `sec-${idx}`,
        title: h.textContent,
      }))
    );
  }, [article]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="lg:sticky lg:top-24 space-y-5 w-full lg:w-72 flex-shrink-0">
      <div className="text-center p-4 rounded-xl bg-gray-900/50 border border-amber-500/20">
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-black text-xl font-black">
          {(article?.author?.[0] || "T").toUpperCase()}
        </div>
        <h4 className="mt-2 font-bold text-white text-sm">{article?.author || "Tech Team"}</h4>
      </div>

      <div className="flex justify-around p-3 rounded-xl bg-gray-900/50 border border-amber-500/20">
        <div className="text-center">
          <HiOutlineEye className="w-5 h-5 mx-auto text-amber-500" aria-hidden="true" />
          <p className="font-bold text-white mt-1 text-sm">{views}</p>
          <p className="text-[10px] text-gray-400">{isRtl ? "بازدید" : "Views"}</p>
        </div>
        <button
          onClick={toggle}
          className="text-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          aria-label={liked ? "Unlike" : "Like"}
        >
          <HiHeart
            className={`w-5 h-5 mx-auto ${liked ? "text-amber-500 fill-amber-500" : "text-amber-500"}`}
            aria-hidden="true"
          />
          <p className="font-bold text-white mt-1 text-sm">{count}</p>
          <p className="text-[10px] text-gray-400">{isRtl ? "لایک" : "Likes"}</p>
        </button>
      </div>

      {sections.length > 0 && (
        <nav className="p-3 rounded-xl bg-gray-900/30 border border-gray-800" aria-label="فهرست مطالب">
          <p className="text-xs font-bold text-amber-500 mb-2 uppercase tracking-wider">
            {isRtl ? "فهرست" : "Contents"}
          </p>
          <div className="max-h-[280px] overflow-y-auto custom-scrollbar space-y-0.5">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-2 py-1.5 text-xs rounded-lg transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 ${
                  activeId === s.id
                    ? "text-amber-500 bg-amber-500/10 font-bold"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </nav>
      )}

      {article?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="تگ‌ها">
          {article.tags.slice(0, 8).map((t) => (
            <span
              key={t}
              role="listitem"
              className="text-[10px] text-gray-400 border border-gray-700 px-2 py-0.5 rounded-full hover:border-amber-500 hover:text-amber-500 transition cursor-default"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </aside>
  );
}
