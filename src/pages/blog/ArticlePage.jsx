// src/pages/blog/ArticlePage.jsx
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineHeart,
  HiHeart,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlineShare,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiVolumeUp,
  HiVolumeOff,
  HiOutlineUserGroup,
  HiOutlineChatAlt2,
  HiOutlineEye,
} from "react-icons/hi";
import ArticleContent from "../../components/article/ArticleContent";
import { getArticleBySlug, getRelatedArticles, likeArticle, unlikeArticle } from "../../services/api";

// ─────────────────────────────────────────────
// تابع کمکی برای تعیین مسیر صحیح مقاله
// ─────────────────────────────────────────────
function getArticlePath(article) {
  if (article.customPath) return article.customPath;
  if (article.brand === "Apple Watch") return `/apple-products/watch/article/${article.slug}`;
  return `/blog/${article.slug}`;
}

// ─────────────────────────────────────────────
// تابع تشخیص نوع مقاله برای نمایش برچسب
// ─────────────────────────────────────────────
function getArticleBadge(article, isRtl) {
  if (article.brand === "Comparison") {
    return { text: isRtl ? "مقایسه" : "Comparison", className: "bg-blue-500/20 text-blue-600 dark:text-blue-400" };
  }
  if (article.brand === "Apple Watch") {
    return { text: isRtl ? "اپل واچ" : "Apple Watch", className: "bg-purple-500/20 text-purple-600 dark:text-purple-400" };
  }
  if (article.brand === "Samsung") {
    return { text: "Samsung", className: "bg-blue-500/20 text-blue-600 dark:text-blue-400" };
  }
  if (article.brand === "Apple") {
    return { text: "iPhone", className: "bg-gray-500/20 text-gray-600 dark:text-gray-400" };
  }
  return null;
}

// ─────────────────────────────────────────────
// ShareButtons - دکمه‌های اشتراک‌گذاری
// ─────────────────────────────────────────────
function ShareButtons({ url, title, isRtl }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [url]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-white/70 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/15 px-3 py-1.5 rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-500/20 hover:border-yellow-300 dark:hover:border-yellow-400/40 hover:text-yellow-600 dark:hover:text-yellow-300 transition-all duration-200">𝕏</a>
      <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-white/70 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/15 px-3 py-1.5 rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-500/20 hover:border-yellow-300 dark:hover:border-yellow-400/40 hover:text-yellow-600 dark:hover:text-yellow-300 transition-all duration-200">TG</a>
      <button onClick={copy} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-white/70 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/15 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white transition-all duration-200"><HiOutlineShare size={12} />{copied ? (isRtl ? "کپی شد!" : "Copied!") : (isRtl ? "کپی لینک" : "Copy link")}</button>
    </div>
  );
}

// ─────────────────────────────────────────────
// ReadingProgressBar - نوار پیشرفت مطالعه
// ─────────────────────────────────────────────
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = document.documentElement;
          const total = el.scrollHeight - el.clientHeight;
          setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-200 dark:bg-white/10">
      <div className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 transition-all duration-100" style={{ width: `${progress}%` }} />
    </div>
  );
}

// ─────────────────────────────────────────────
// FloatingTableOfContents - فهرست مطالب شناور
// ─────────────────────────────────────────────
function FloatingTableOfContents({ content, isRtl }) {
  const [active, setActive] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  const headings = useMemo(() => {
    const matches = [...(content?.matchAll(/^#{1,3} (.+)$/gm) ?? [])];
    return matches.map((m) => ({
      text: m[1],
      id: m[1].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      level: m[0].match(/^#+/)[0].length
    }));
  }, [content]);

  useEffect(() => {
    if (!headings.length) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  if (headings.length < 3 || !isVisible) return null;
  
  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`fixed top-32 z-40 w-64 hidden xl:block ${isRtl ? 'left-6' : 'right-6'}`}
    >
      <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-white/10 shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-yellow-400/60 mb-3">
          {isRtl ? "در این مقاله" : "IN THIS ARTICLE"}
        </p>
        <ul className="space-y-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {headings.map(({ text, id, level }) => (
            <li key={id} style={{ paddingInlineStart: `${(level - 1) * 12}px` }}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`text-xs transition-all duration-300 hover:text-yellow-600 dark:hover:text-yellow-400 block py-1 ${
                  active === id
                    ? "text-yellow-600 dark:text-yellow-400 font-semibold border-r-2 border-yellow-500 pr-2"
                    : "text-gray-600 dark:text-white/60"
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// HeroSlider - اسلایدر هدر
// ─────────────────────────────────────────────
function HeroSlider({ media, brand, isRtl }) {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const current = media[index];
  const isVideo = current?.type === "video";
  
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (!isVideo && media.length > 1) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % media.length);
      }, 5000);
    }
  }, [isVideo, media.length]);
  
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);
  
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, index]);
  
  const go = (dir) => {
    clearInterval(timerRef.current);
    setIndex((i) => (i + dir + media.length) % media.length);
    startTimer();
  };
  
  if (!media?.length) return null;
  
  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={current.src}
              poster={current.poster}
              autoPlay
              loop
              muted={muted}
              playsInline
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <img
              src={current.src}
              alt={current.alt ?? brand}
              className="w-full h-full object-cover object-center"
              onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </motion.div>
      </AnimatePresence>
      
      {media.length > 1 && (
        <div className="absolute top-6 right-6 z-30 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white/80 text-xs font-mono">
          {String(index + 1).padStart(2, '0')} / {String(media.length).padStart(2, '0')}
        </div>
      )}
      
      {isVideo && (
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute bottom-6 right-6 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/30 text-white hover:bg-black/70 hover:scale-110 hover:border-yellow-400 transition-all duration-300"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <HiVolumeOff size={18} /> : <HiVolumeUp size={18} />}
        </button>
      )}
      
      {media.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            className={`absolute ${isRtl ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:border-yellow-400/60 hover:scale-110 transition-all duration-300 group`}
            aria-label="Previous"
          >
            {isRtl ? <HiOutlineChevronRight size={22} className="group-hover:scale-110 transition-transform duration-300" /> : <HiOutlineChevronLeft size={22} className="group-hover:scale-110 transition-transform duration-300" />}
          </button>
          <button
            onClick={() => go(1)}
            className={`absolute ${isRtl ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:border-yellow-400/60 hover:scale-110 transition-all duration-300 group`}
            aria-label="Next"
          >
            {isRtl ? <HiOutlineChevronLeft size={22} className="group-hover:scale-110 transition-transform duration-300" /> : <HiOutlineChevronRight size={22} className="group-hover:scale-110 transition-transform duration-300" />}
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  clearInterval(timerRef.current);
                  setIndex(i);
                  startTimer();
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-10 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-[0_0_8px_#eab308]"
                    : "w-2 h-2 bg-white/40 hover:bg-yellow-400/70 hover:w-4"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// VideoSection - بخش ویدیوهای مرتبط
// ─────────────────────────────────────────────
function VideoSection({ isRtl, articleVideos = [] }) {
  const defaultVideos = [
    { id: "tQdPRHdrCUI", title: "iPhone 17 Pro Max Full Review", channel: "TechZone", duration: "15:23", views: "125K بازدید" },
    { id: "DX0HzqxrjEQ", title: "iPhone 17 vs Samsung S25 Ultra", channel: "TechZone", duration: "18:45", views: "892K بازدید" },
    { id: "hDZrB9V-UTk", title: "iPhone 16 Pro Max Camera Test", channel: "TechZone", duration: "12:10", views: "2.1M بازدید" },
    { id: "-rdqBWYwFTo", title: "iOS 19 and Apple Intelligence", channel: "TechZone", duration: "22:30", views: "1.5M بازدید" }
  ];
  
  const [activeVideo, setActiveVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videos = articleVideos.length > 0 ? articleVideos : defaultVideos;
  
  useEffect(() => {
    if (videos.length > 0 && !activeVideo) setActiveVideo(videos[0]);
  }, [videos]);
  
  const handleVideoChange = (video) => {
    setIsLoading(true);
    setActiveVideo(video);
    setTimeout(() => setIsLoading(false), 500);
  };
  
  if (!activeVideo) return null;
  
  return (
    <motion.div
      id="video-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mt-16 mb-12"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-yellow-500" />
          <span className="text-xs font-black uppercase tracking-widest text-yellow-500">
            {isRtl ? "ویدیوهای مرتبط" : "WATCH & LEARN"}
          </span>
          <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-yellow-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {isRtl ? "ویدیوی بررسی تخصصی" : "Video Review"}
        </h2>
        <div className="mx-auto mt-3 w-16 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/60 dark:bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-xl">
            <div className="relative w-full aspect-video bg-black">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <iframe
                key={activeVideo.id}
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {activeVideo.title}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white/60 dark:bg-black/30 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200/50 dark:border-white/10">
              <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 15l5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                </svg>
                {isRtl ? "بیشتر ویدیوها" : "More Videos"}
              </h4>
            </div>
            <div className="divide-y divide-gray-200/50 dark:divide-white/10">
              {videos.map((video, idx) => (
                <motion.button
                  key={video.id}
                  onClick={() => handleVideoChange(video)}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className={`w-full text-left p-4 hover:bg-white/30 dark:hover:bg-white/5 transition-all duration-300 group ${
                    activeVideo.id === video.id
                      ? "bg-yellow-500/10 dark:bg-yellow-500/5 border-l-4 border-l-yellow-500"
                      : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0 w-28 h-16 rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-black/70 text-white px-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white/90 line-clamp-2 mb-1">
                        {video.title}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-white/30">
                        {video.channel}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// CommentsSection - بخش نظرات کاربران
// ─────────────────────────────────────────────
function CommentsSection({ isRtl, articleSlug }) {
  const STORAGE_KEY = `comments_${articleSlug}`;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLikes, setCommentLikes] = useState({});
  
  useEffect(() => {
    const savedComments = localStorage.getItem(STORAGE_KEY);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      setComments([
        { id: 1, author: "مهدی کریمی", avatar: "م", date: "۲ روز پیش", text: "مقاله فوق‌العاده بود! واقعاً استفاده کردم.", likes: 12, replies: [] },
        { id: 2, author: "سارا حسینی", avatar: "س", date: "۵ روز پیش", text: "خیلی مفید بود. ممنون از تیم تک‌کرانچ", likes: 8, replies: [] }
      ]);
    }
  }, [STORAGE_KEY]);
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      author: isRtl ? "شما" : "You",
      avatar: isRtl ? "ش" : "Y",
      date: isRtl ? "همین الان" : "Just now",
      text: newComment,
      likes: 0,
      replies: []
    };
    const updatedComments = [newCommentObj, ...comments];
    setComments(updatedComments);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedComments));
    setNewComment("");
  };
  
  const handleLikeComment = (commentId) => {
    setCommentLikes((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };
  
  return (
    <div className="mt-12 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 dark:border-white/10 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <HiOutlineChatAlt2 className="text-yellow-500" />
        {isRtl ? "نظرات کاربران" : "Comments"} ({comments.length})
      </h3>
      
      <div className="mb-8">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold flex-shrink-0">
            {isRtl ? "ش" : "Y"}
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isRtl ? "نظر خود را بنویسید..." : "Write your comment..."}
              rows="3"
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/15 focus:border-yellow-400 focus:outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/30 resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md"
              >
                {isRtl ? "ارسال نظر" : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-5">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 p-4 rounded-xl bg-white/40 dark:bg-black/20 border border-gray-200/50 dark:border-white/5"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {comment.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold text-gray-800 dark:text-white text-sm">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-400 dark:text-white/30">•</span>
                <span className="text-xs text-gray-400 dark:text-white/30">
                  {comment.date}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {comment.text}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className={`flex items-center gap-1 text-xs transition-all ${
                    commentLikes[comment.id] ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
                  }`}
                >
                  <HiOutlineHeart size={14} />
                  <span>{comment.likes + (commentLikes[comment.id] ? 1 : 0)}</span>
                </button>
                <button className="text-xs text-gray-400 hover:text-yellow-500 transition-colors">
                  {isRtl ? "پاسخ" : "Reply"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sidebar - نوار کناری
// ─────────────────────────────────────────────
function Sidebar({ article, relatedArticles, views, commentsCount, isRtl, lang, onLike, liked: parentLiked }) {
  const [localLikeCount, setLocalLikeCount] = useState(article?.likes || 0);
  const [localLiked, setLocalLiked] = useState(parentLiked || false);
  const authorStats = { articles: 42, followers: 1200 };
  
  const handleLike = () => {
    const newLiked = !localLiked;
    setLocalLiked(newLiked);
    setLocalLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    if (onLike) onLike(newLiked);
  };
  
  return (
    <div className="space-y-6">
      {/* Author Card */}
      <div className="bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/30 dark:border-white/10 shadow-xl text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-yellow-200 dark:ring-yellow-500/30 shadow-lg">
          {(article?.author ?? "T")[0]}
        </div>
        <h4 className="mt-3 font-bold text-gray-900 dark:text-white">
          {article?.author ?? "Tech Team"}
        </h4>
        <p className="text-xs text-gray-500 dark:text-white/40 mt-1">
          {isRtl ? "نویسنده و تحلیلگر ارشد" : "Senior Writer & Analyst"}
        </p>
        <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-200/50 dark:border-white/10">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">{authorStats.articles}</p>
            <p className="text-[10px] text-gray-500 dark:text-white/40">{isRtl ? "مقالات" : "Articles"}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">{authorStats.followers.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 dark:text-white/40">{isRtl ? "دنبال‌کننده" : "Followers"}</p>
          </div>
        </div>
      </div>
      
      {/* Stats Card */}
      <div className="bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/30 dark:border-white/10 shadow-xl">
        <div className="flex justify-around">
          <div className="text-center group cursor-default">
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center">
              <HiOutlineEye className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
              {views?.toLocaleString() || 0}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-white/40">
              {isRtl ? "بازدید" : "Views"}
            </p>
          </div>
          <div className="text-center group cursor-pointer" onClick={handleLike}>
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-all duration-300">
              {localLiked ? (
                <HiHeart className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ) : (
                <HiOutlineHeart className="w-5 h-5 text-yellow-500" />
              )}
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
              {localLikeCount.toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-white/40">
              {isRtl ? "لایک" : "Likes"}
            </p>
          </div>
          <div className="text-center group cursor-default">
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center">
              <HiOutlineChatAlt2 className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
              {commentsCount || 0}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-white/40">
              {isRtl ? "نظر" : "Comments"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Related Articles */}
      {relatedArticles?.length > 0 && (
        <div className="bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/30 dark:border-white/10 shadow-xl">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <HiOutlineUserGroup className="text-yellow-500" />
            {isRtl ? "مطالب مرتبط" : "Related Reads"}
          </h4>
          <div className="space-y-3">
            {relatedArticles.map((rel) => {
              const articlePath = getArticlePath(rel);
              const badge = getArticleBadge(rel, isRtl);
              return (
                <Link
                  key={rel.slug}
                  to={articlePath}
                  className="group flex gap-3 items-start hover:bg-white/30 dark:hover:bg-white/5 p-2 rounded-xl transition-all duration-300"
                >
                  <img
                    src={rel.cover}
                    alt={rel.title[lang]}
                    className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 dark:text-white/90 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                      {rel.title[lang]}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] text-gray-400 dark:text-white/30">
                        {rel.readTime} min read
                      </span>
                      {badge && (
                        <span className={`text-[8px] ${badge.className} px-1.5 py-0.5 rounded-full`}>
                          {badge.text}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// ArticlePage اصلی
// ─────────────────────────────────────────────
export default function ArticlePage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRtl = lang === "fa";

  // ✅ همه Hooks باید قبل از هر return شرطی بیایند
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [views, setViews] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // ✅ useMemo برای mediaItems - باید قبل از return شرطی باشد
  const mediaItems = useMemo(() => {
    if (!article) {
      return [
        { type: "image", src: "/placeholder-image.jpg", alt: "Loading..." },
        { type: "image", src: "/placeholder-image.jpg", alt: "Loading..." },
        { type: "image", src: "/placeholder-image.jpg", alt: "Loading..." }
      ];
    }
    if (article.media && article.media.length >= 3) return article.media.slice(0, 3);
    if (article.media && article.media.length > 0) {
      const result = [...article.media];
      while (result.length < 3) result.push({ type: "image", src: article.cover, alt: article.title[lang] });
      return result;
    }
    return [
      { type: "image", src: article.cover, alt: article.title[lang] },
      { type: "image", src: article.cover, alt: article.title[lang] },
      { type: "image", src: article.cover, alt: article.title[lang] }
    ];
  }, [article, lang]);

  // دریافت مقاله از API
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getArticleBySlug(slug);
        setArticle(data);
        setLikeCount(data.likes || 0);
        
        // مدیریت بازدیدها
        const today = new Date().toDateString();
        const viewsKey = `views_${slug}`;
        const lastVisitKey = `last_visit_${slug}`;
        const lastVisit = localStorage.getItem(lastVisitKey);
        
        let newViews = data.views || 0;
        if (lastVisit !== today) {
          newViews += 1;
          localStorage.setItem(lastVisitKey, today);
          localStorage.setItem(viewsKey, newViews);
        } else {
          newViews = parseInt(localStorage.getItem(viewsKey)) || data.views || 0;
        }
        setViews(newViews);
        
        setLiked(localStorage.getItem(`like_${slug}`) === "true");
        setBookmarked(localStorage.getItem(`bookmark_${slug}`) === "true");
        
        // دریافت مقالات مرتبط از API
        try {
          const related = await getRelatedArticles(slug, 4);
          setRelatedArticles(related);
        } catch (err) {
          console.error("Error fetching related articles:", err);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  // تابع لایک کردن با API
  const handleLike = useCallback(async (isLiked) => {
    try {
      let newCount;
      if (isLiked) {
        newCount = await likeArticle(slug);
      } else {
        newCount = await unlikeArticle(slug);
      }
      setLikeCount(newCount);
      setLiked(isLiked);
      localStorage.setItem(`like_${slug}`, isLiked);
    } catch (error) {
      console.error("Error liking article:", error);
      const newCount = isLiked ? likeCount + 1 : likeCount - 1;
      setLikeCount(newCount);
      setLiked(isLiked);
      localStorage.setItem(`like_${slug}`, isLiked);
    }
  }, [slug, likeCount]);

  const handleBookmark = useCallback(() => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    localStorage.setItem(`bookmark_${slug}`, newBookmarked);
  }, [bookmarked, slug]);

  // pageUrl - باید بعد از بررسی اینکه article وجود دارد بیاید
  const pageUrl = article ? `https://yourdomain.com/blog/${slug}` : "";

  // ✅ شرط‌های return در انتها بعد از همه Hooks
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isRtl ? "مقاله یافت نشد" : "Article Not Found"}
          </h1>
          <Link to="/blog" className="text-yellow-500 hover:text-yellow-600">
            {isRtl ? "بازگشت به بلاگ" : "Back to Blog"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReadingProgressBar />
      
      <Helmet>
        <title>{article.title[lang]} | Tech Magazine</title>
        <meta name="description" content={article.excerpt[lang]} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={article.title[lang]} />
        <meta property="og:description" content={article.excerpt[lang]} />
        <meta property="og:image" content={article.cover} />
        <meta property="article:published_time" content={article.publishDate} />
        <html dir={isRtl ? "rtl" : "ltr"} lang={lang} />
      </Helmet>

      <FloatingTableOfContents content={article.content[lang]} isRtl={isRtl} />

      {/* HERO */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <HeroSlider media={mediaItems} brand={article.brand} isRtl={isRtl} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 z-20 pb-16 px-6 md:px-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        >
          <div className="max-w-5xl mx-auto">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold mb-4 shadow-[0_0_15px_rgba(234,179,8,0.5)]"
            >
              {article.brand}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-lg leading-tight tracking-tight"
            >
              {article.title[lang]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-4 text-base md:text-lg text-gray-200 max-w-3xl leading-relaxed"
            >
              {article.excerpt[lang]}
            </motion.p>
          </div>
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="absolute top-6 left-0 right-0 flex justify-between items-start px-6 md:px-12 z-30">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/blog" className="group flex items-center gap-2 text-sm font-bold text-white bg-black/40 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-black/60 hover:border-yellow-400/50">
              {isRtl ? <HiOutlineArrowRight size={15} className="group-hover:translate-x-0.5" /> : <HiOutlineArrowLeft size={15} className="group-hover:-translate-x-0.5" />}
              <span>{isRtl ? "بازگشت به بلاگ" : "Back to Blog"}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* MAIN CONTENT - ادامه کد به همین شکل */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 xl:w-3/4">
            <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 mb-6 text-sm text-gray-500 dark:text-white/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-xs font-bold">
                  {(article.author ?? "T")[0]}
                </div>
                <span className="text-gray-800 dark:text-white/80 font-medium">{article.author ?? "Tech Team"}</span>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1"><HiOutlineCalendar size={14} />{article.publishDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><HiOutlineClock size={14} />{article.readTime} {isRtl ? "دقیقه" : "min read"}</span>
              <span>•</span>
              <button onClick={() => handleLike(!liked)} className={`flex items-center gap-1 transition-all ${liked ? "text-yellow-500" : "hover:text-yellow-500"}`}>
                {liked ? <HiHeart size={14} className="fill-yellow-500" /> : <HiOutlineHeart size={14} />}
                {likeCount.toLocaleString()}
              </button>
              <button onClick={handleBookmark} className={`flex items-center gap-1 transition-all ${bookmarked ? "text-yellow-500" : "hover:text-yellow-500"}`}>
                {bookmarked ? <HiBookmark size={14} className="fill-yellow-500" /> : <HiOutlineBookmark size={14} />}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags?.slice(0, 5).map((tag) => (
                <span key={tag} className="text-[10px] font-bold text-gray-600 dark:text-white/70 bg-white/60 dark:bg-white/10 px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/15 hover:border-yellow-400/50 hover:text-yellow-600 transition-all duration-200">#{tag}</span>
              ))}
            </div>

            <div className="mb-8"><ShareButtons url={pageUrl} title={article.title[lang]} isRtl={isRtl} /></div>

            <div className="bg-white/50 dark:bg-black/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/30 dark:border-white/10 shadow-xl">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ArticleContent content={article.content[lang]} isRtl={isRtl} />
              </div>
            </div>

            <VideoSection isRtl={isRtl} articleVideos={article.relatedVideos || []} />
            <CommentsSection isRtl={isRtl} articleSlug={slug} />

            <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-white/10 flex justify-between items-center">
              <Link to="/blog" className="group flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-white/60 hover:text-yellow-600 transition-all duration-300 hover:gap-3">
                {isRtl ? <HiOutlineArrowRight size={16} className="group-hover:translate-x-1" /> : <HiOutlineArrowLeft size={16} className="group-hover:-translate-x-1" />}
                {isRtl ? "بازگشت به بلاگ" : "Back to Blog"}
              </Link>
              <span className="text-xs text-gray-400 dark:text-white/30 font-mono">{article.publishDate}</span>
            </div>
          </div>

          <div className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-24">
              <Sidebar
                article={article}
                relatedArticles={relatedArticles.slice(0, 3)}
                views={views}
                commentsCount={0}
                isRtl={isRtl}
                lang={lang}
                onLike={handleLike}
                liked={liked}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RELATED ARTICLES SECTION */}
      {relatedArticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 border-t border-gray-200/50 dark:border-white/10 pt-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                {isRtl ? "بیشتر بخوانید" : "More to Read"}
              </h2>
              <div className="mx-auto mt-4 w-16 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArticles.map((rel, idx) => {
                const articlePath = getArticlePath(rel);
                const badge = getArticleBadge(rel, isRtl);
                return (
                  <motion.div
                    key={rel.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <Link to={articlePath} className="group block rounded-2xl overflow-hidden bg-white/60 dark:bg-black/30 backdrop-blur-md border border-gray-200/50 dark:border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-2">
                      <div className="overflow-hidden h-44 relative">
                        <img
                          src={rel.cover}
                          alt={rel.title[lang]}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
                        />
                        {badge && (
                          <span className="absolute top-2 right-2 text-[8px] text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            {badge.text}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white/90 line-clamp-2 leading-snug mb-2 group-hover:text-yellow-600 transition-colors">
                          {rel.title[lang]}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/40">
                          <HiOutlineClock size={11} />
                          <span>{rel.readTime} {isRtl ? "دقیقه" : "min"}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/20" />
                          <span>{rel.likes?.toLocaleString() || 0} likes</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(234, 179, 8, 0.5); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(234, 179, 8, 0.8); }
      `}</style>
    </>
  );
}