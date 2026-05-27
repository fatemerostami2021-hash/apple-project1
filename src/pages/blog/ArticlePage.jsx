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
  HiOutlineTag,
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
import { articlesData } from "../../data/articlesData";
import ArticleContent from "../../components/article/ArticleContent";

// ─────────────────────────────────────────────
// ShareButtons
// ─────────────────────────────────────────────
function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [url]);

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-bold
                   text-gray-600 dark:text-white/70
                   bg-white/80 dark:bg-white/10
                   backdrop-blur-sm
                   border border-gray-200 dark:border-white/15
                   px-3 py-1.5 rounded-full
                   hover:bg-yellow-50 dark:hover:bg-yellow-500/20
                   hover:border-yellow-300 dark:hover:border-yellow-400/40
                   hover:text-yellow-600 dark:hover:text-yellow-300
                   transition-all duration-200"
      >
        𝕏
      </a>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-bold
                   text-gray-600 dark:text-white/70
                   bg-white/80 dark:bg-white/10
                   backdrop-blur-sm
                   border border-gray-200 dark:border-white/15
                   px-3 py-1.5 rounded-full
                   hover:bg-yellow-50 dark:hover:bg-yellow-500/20
                   hover:border-yellow-300 dark:hover:border-yellow-400/40
                   hover:text-yellow-600 dark:hover:text-yellow-300
                   transition-all duration-200"
      >
        TG
      </a>
      <button
        onClick={copy}
        className="flex items-center gap-1.5 text-xs font-bold
                   text-gray-600 dark:text-white/70
                   bg-white/80 dark:bg-white/10
                   backdrop-blur-sm
                   border border-gray-200 dark:border-white/15
                   px-3 py-1.5 rounded-full
                   hover:bg-gray-200 dark:hover:bg-white/20
                   hover:text-gray-900 dark:hover:text-white
                   transition-all duration-200"
      >
        <HiOutlineShare size={12} />
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// ReadingProgressBar
// ─────────────────────────────────────────────
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-200 dark:bg-white/10">
      <div
        className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// FloatingTableOfContents - Glass Card
// ─────────────────────────────────────────────
function FloatingTableOfContents({ content, isRtl }) {
  const [active, setActive] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  const headings = useMemo(() => {
    const matches = [...(content?.matchAll(/^#{1,3} (.+)$/gm) ?? [])];
    return matches.map((m) => ({
      text: m[1],
      id: m[1].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      level: m[0].match(/^#+/)[0].length,
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
    
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  if (headings.length < 3 || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-32 right-6 z-40 w-64 hidden xl:block"
      style={{ [isRtl ? "left" : "right"]: "auto", [isRtl ? "right" : "left"]: "auto" }}
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
// HeroSlider - Full Width 70vh
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
    if (!isVideo) {
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
          className="absolute bottom-6 right-6 z-30
                     w-10 h-10 rounded-full flex items-center justify-center
                     bg-black/50 backdrop-blur-md
                     border border-white/30
                     text-white hover:bg-black/70
                     hover:scale-110 hover:border-yellow-400
                     transition-all duration-300"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <HiVolumeOff size={18} /> : <HiVolumeUp size={18} />}
        </button>
      )}

      {media.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30
                       w-12 h-12 rounded-full flex items-center justify-center
                       bg-black/40 backdrop-blur-md
                       border border-white/20 text-white
                       hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600
                       hover:border-yellow-400/60
                       hover:scale-110
                       transition-all duration-300
                       group"
            aria-label="Previous"
          >
            <HiOutlineChevronLeft size={22} className="group-hover:scale-110 transition-transform duration-300" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30
                       w-12 h-12 rounded-full flex items-center justify-center
                       bg-black/40 backdrop-blur-md
                       border border-white/20 text-white
                       hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600
                       hover:border-yellow-400/60
                       hover:scale-110
                       transition-all duration-300
                       group"
            aria-label="Next"
          >
            <HiOutlineChevronRight size={22} className="group-hover:scale-110 transition-transform duration-300" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => { clearInterval(timerRef.current); setIndex(i); }}
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
// VideoSection - ویدیوی اصلی + ویدیوهای مرتبط
// ─────────────────────────────────────────────
function VideoSection({ isRtl }) {
  const [activeVideo, setActiveVideo] = useState({
    id: "yojtBfY8_lU",
    title: "iPhone 17 Pro Max Review | بررسی آیفون 17 پرو مکس اپل",
    channel: "TechZone",
  });

  const relatedVideos = [
    {
      id: "FOxBhUit5Qw",
      title: "Samsung Galaxy S26 Ultra vs S25 Ultra vs S24 Ultra",
      channel: "TechZone",
      duration: "12:34",
      views: "12K بازدید • ۳ ماه پیش",
    },
    {
      id: "mzv1iCIB5lI",
      title: "Samsung Galaxy S26 Ultra vs iPhone 17 Pro Max",
      channel: "Geekerwan",
      duration: "15:21",
      views: "28K بازدید • ۲ ماه پیش",
    },
    {
      id: "bnhcpynsGsQ",
      title: "iPhone 17 Pro Max vs Samsung Galaxy S26 Ultra Camera Test",
      channel: "Hayls World",
      duration: "18:45",
      views: "99K بازدید • ۲ ماه پیش",
    },
    {
      id: "WXNXK1eWG4o",
      title: "iPhone 17 Pro Max Unboxing & Full Review",
      channel: "Tech with Benefits",
      duration: "22:10",
      views: "8.5K بازدید • ۲ ماه پیش",
    },
  ];

  const handleVideoChange = (video) => {
    setActiveVideo(video);
    const videoSection = document.getElementById("video-section");
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getYouTubeEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&color=white&iv_load_policy=3&wmode=transparent`;
  };

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
          <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-yellow-500"></div>
          <span className="text-xs font-black uppercase tracking-widest text-yellow-500">
            {isRtl ? "ویدیوهای مرتبط" : "WATCH & LEARN"}
          </span>
          <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-yellow-500"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {isRtl ? "ویدیوی بررسی تخصصی" : "Video Review"}
        </h2>
        <div className="mx-auto mt-3 w-16 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/60 dark:bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="relative w-full aspect-video bg-black">
              <iframe
                key={activeVideo.id}
                src={getYouTubeEmbedUrl(activeVideo.id)}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {activeVideo.title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-white/50">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 15l5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                  </svg>
                  {activeVideo.channel}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/30"></span>
                <span>{isRtl ? "پخش خودکار" : "Auto-play enabled"}</span>
              </div>
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
              {relatedVideos.map((video, idx) => (
                <motion.button
                  key={video.id}
                  onClick={() => handleVideoChange(video)}
                  initial={{ opacity: 0, x: -20 }}
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
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-black/70 text-white px-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold text-gray-800 dark:text-white/90 line-clamp-2 mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors ${
                        activeVideo.id === video.id ? "text-yellow-600 dark:text-yellow-400" : ""
                      }`}>
                        {video.title}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-white/30">
                        {video.channel}
                      </p>
                      <p className="text-[9px] text-gray-400 dark:text-white/25 mt-0.5">
                        {video.views}
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
// Comments Section - داینامیک و تعاملی
// ─────────────────────────────────────────────
function CommentsSection({ isRtl }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "مهدی کریمی",
      avatar: "م",
      date: "۲ روز پیش",
      text: "مقاله فوق‌العاده بود! واقعاً استفاده کردم.",
      likes: 12,
      replies: [],
    },
    {
      id: 2,
      author: "سارا حسینی",
      avatar: "س",
      date: "۵ روز پیش",
      text: "خیلی مفید بود. ممنون از تیم فیت‌زون",
      likes: 8,
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [commentLikes, setCommentLikes] = useState({});

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      author: "شما",
      avatar: "ش",
      date: "همین الان",
      text: newComment,
      likes: 0,
      replies: [],
    };
    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  const handleLikeComment = (commentId) => {
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
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
            ش
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isRtl ? "نظر خود را بنویسید..." : "Write your comment..."}
              rows="3"
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/15 focus:border-yellow-400 focus:outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/30 resize-none"
            />
            <div className="flex justify-end mt-2 gap-2">
              <button
                onClick={handleAddComment}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
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
                <span className="text-xs text-gray-400 dark:text-white/30">{comment.date}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {comment.text}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className={`flex items-center gap-1 text-xs transition-all duration-200 ${
                    commentLikes[comment.id]
                      ? "text-yellow-500"
                      : "text-gray-400 hover:text-yellow-500"
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
// Sidebar - با Glass Card و آمار داینامیک
// ─────────────────────────────────────────────
function Sidebar({ article, relatedArticles, views, commentsCount, isRtl, lang }) {
  const [likeCount, setLikeCount] = useState(article?.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="space-y-6">
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
            <p className="text-lg font-bold text-gray-900 dark:text-white">42</p>
            <p className="text-[10px] text-gray-500 dark:text-white/40">{isRtl ? "مقالات" : "Articles"}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">1.2k</p>
            <p className="text-[10px] text-gray-500 dark:text-white/40">{isRtl ? "دنبال‌کننده" : "Followers"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/30 dark:border-white/10 shadow-xl">
        <div className="flex justify-around">
          <div className="text-center group cursor-pointer">
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-all duration-300">
              <HiOutlineEye className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">{views?.toLocaleString() || 0}</p>
            <p className="text-[10px] text-gray-500 dark:text-white/40">{isRtl ? "بازدید" : "Views"}</p>
          </div>
          <div className="text-center group cursor-pointer" onClick={handleLike}>
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-all duration-300">
              <HiOutlineHeart className={`w-5 h-5 ${liked ? "text-yellow-500 fill-yellow-500" : "text-yellow-500"} transition-all`} />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">{likeCount.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 dark:text-white/40">{isRtl ? "لایک" : "Likes"}</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-all duration-300">
              <HiOutlineChatAlt2 className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">{commentsCount || 0}</p>
            <p className="text-[10px] text-gray-500 dark:text-white/40">{isRtl ? "نظر" : "Comments"}</p>
          </div>
        </div>
      </div>

      {relatedArticles?.length > 0 && (
        <div className="bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/30 dark:border-white/10 shadow-xl">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <HiOutlineUserGroup className="text-yellow-500" />
            {isRtl ? "مطالب مرتبط" : "Related Reads"}
          </h4>
          <div className="space-y-3">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to={`/blog/${rel.slug}`}
                className="group flex gap-3 items-start hover:bg-white/30 dark:hover:bg-white/5 p-2 rounded-xl transition-all duration-300"
              >
                <img
                  src={rel.cover}
                  alt={rel.title[lang]}
                  className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 dark:text-white/90 line-clamp-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    {rel.title[lang]}
                  </p>
                  <span className="text-[10px] text-gray-400 dark:text-white/30">{rel.readTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// ArticlePage
// ─────────────────────────────────────────────
export default function ArticlePage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRtl = lang === "fa";

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  const article = useMemo(() => articlesData.find((a) => a.slug === slug), [slug]);
  
  const [views, setViews] = useState(() => {
    const saved = localStorage.getItem(`views_${slug}`);
    if (saved) return parseInt(saved);
    const initial = Math.floor(Math.random() * 5000) + 1000;
    localStorage.setItem(`views_${slug}`, initial);
    return initial;
  });

  const [liked, setLiked] = useState(() =>
    JSON.parse(localStorage.getItem(`like_${slug}`) ?? "false")
  );
  const [bookmarked, setBookmarked] = useState(() =>
    JSON.parse(localStorage.getItem(`bookmark_${slug}`) ?? "false")
  );
  const [likeCount, setLikeCount] = useState(() => {
    const saved = localStorage.getItem(`likeCount_${slug}`);
    if (saved) return parseInt(saved);
    return article?.likes || 0;
  });

  const toggleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
      localStorage.setItem(`likeCount_${slug}`, likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
      localStorage.setItem(`likeCount_${slug}`, likeCount + 1);
    }
    setLiked(!liked);
    localStorage.setItem(`like_${slug}`, !liked);
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    localStorage.setItem(`bookmark_${slug}`, !bookmarked);
  };

  const relatedArticles = useMemo(
    () => articlesData.filter((a) => a.slug !== slug && a.brand === article?.brand).slice(0, 4),
    [slug, article]
  );

  useEffect(() => {
    if (article) {
      const newViews = views + 1;
      setViews(newViews);
      localStorage.setItem(`views_${slug}`, newViews);
    }
  }, [slug, article]);

  if (!article)
    return <div className="text-center py-20 text-gray-500">Article not found</div>;

  const pageUrl = `https://yourdomain.com/blog/${slug}`;

  const mediaItems = useMemo(() => {
    if (article.media && article.media.length >= 3) {
      return article.media.slice(0, 3);
    }
    
    if (article.media && article.media.length > 0) {
      const result = [...article.media];
      while (result.length < 3) {
        result.push({ type: "image", src: article.cover, alt: article.title[lang] });
      }
      return result;
    }
    
    return [
      { type: "image", src: article.cover, alt: article.title[lang] },
      { type: "image", src: article.cover, alt: article.title[lang] },
      { type: "image", src: article.cover, alt: article.title[lang] },
    ];
  }, [article, lang]);

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
      </Helmet>

      <FloatingTableOfContents content={article.content[lang]} isRtl={isRtl} />

      <div className="fixed top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 opacity-60 z-50"></div>

      {/* HERO */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <HeroSlider media={mediaItems} brand={article.brand} isRtl={isRtl} />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
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
              style={{ fontFamily: "'Inter', 'Poppins', system-ui, sans-serif" }}
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

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute top-6 left-0 right-0 flex justify-between items-start px-6 md:px-12 z-30"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/blog"
              className="group flex items-center gap-2 text-sm font-bold
                         text-white
                         bg-black/40 backdrop-blur-md
                         border border-white/20
                         px-5 py-2.5 rounded-full transition-all duration-300
                         hover:bg-black/60
                         hover:border-yellow-400/50
                         hover:shadow-lg hover:shadow-yellow-500/20"
            >
              {isRtl ? (
                <HiOutlineArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              ) : (
                <HiOutlineArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              )}
              <span>{isRtl ? "بازگشت به بلاگ" : "Back to Blog"}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 2-COLUMN LAYOUT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Column */}
          <div className="lg:w-2/3 xl:w-3/4">
            <div className="flex justify-center mb-8 lg:mb-10">
              <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 mb-6 text-sm text-gray-500 dark:text-white/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-xs font-bold">
                  {(article.author ?? "T")[0]}
                </div>
                <span className="text-gray-800 dark:text-white/80 font-medium">{article.author ?? "Tech Team"}</span>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1">
                <HiOutlineCalendar size={14} />
                {article.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <HiOutlineClock size={14} />
                {article.readTime} {isRtl ? "دقیقه" : "min read"}
              </span>
              <span>•</span>
              <button
                onClick={toggleLike}
                className={`flex items-center gap-1 transition-all duration-200 ${
                  liked ? "text-yellow-500" : "hover:text-yellow-500"
                }`}
              >
                {liked ? <HiHeart size={14} className="fill-yellow-500" /> : <HiOutlineHeart size={14} />}
                {likeCount.toLocaleString()}
              </button>
              <button
                onClick={toggleBookmark}
                className={`flex items-center gap-1 transition-all duration-200 ${
                  bookmarked ? "text-yellow-500" : "hover:text-yellow-500"
                }`}
              >
                {bookmarked ? <HiBookmark size={14} className="fill-yellow-500" /> : <HiOutlineBookmark size={14} />}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags?.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-gray-600 dark:text-white/70 bg-white/60 dark:bg-white/10 px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/15 hover:border-yellow-400/50 hover:text-yellow-600 transition-all duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mb-8">
              <ShareButtons url={pageUrl} title={article.title[lang]} />
            </div>

            <div className="bg-white/50 dark:bg-black/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/30 dark:border-white/10 shadow-xl">
              <div className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-h1:text-4xl prose-h1:font-black prose-h1:tracking-tight prose-h1:mb-6
                prose-h2:text-3xl prose-h2:font-extrabold prose-h2:tracking-tight 
                prose-h2:text-yellow-600 dark:prose-h2:text-yellow-400 
                prose-h2:mt-14 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-yellow-500/30
                prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-10 prose-h3:mb-4 
                prose-h3:text-gray-800 dark:prose-h3:text-gray-200
                prose-h3:before:content-['◆'] prose-h3:before:text-yellow-500 prose-h3:before:inline-block prose-h3:before:ml-3 prose-h3:before:text-sm
                prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-8 prose-h4:mb-3
                prose-h4:text-gray-700 dark:prose-h4:text-gray-300
                prose-p:text-gray-800 dark:prose-p:text-gray-200 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-p:mb-5
                prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:underline prose-a:transition-all
                prose-strong:text-yellow-600 dark:prose-strong:text-yellow-400 prose-strong:font-extrabold
                prose-li:text-gray-800 dark:prose-li:text-gray-200 prose-li:my-1
                prose-ul:my-4 prose-ul:space-y-1
                prose-ol:my-4 prose-ol:space-y-1
                prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-th:p-3 prose-th:bg-gray-50 dark:prose-th:bg-white/5
                prose-td:border prose-td:border-gray-300 prose-td:p-3
                dark:prose-th:border-gray-700 dark:prose-td:border-gray-700
                prose-blockquote:border-r-4 prose-blockquote:border-r-yellow-400 prose-blockquote:pr-5 prose-blockquote:italic 
                prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:font-medium
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                prose-code:bg-gray-100 dark:prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-yellow-600 prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-200 prose-pre:rounded-xl
                first:prose-p:mt-0">
                <ArticleContent content={article.content[lang]} isRtl={isRtl} />
              </div>
            </div>

            {/* Video Section - اضافه شده در جای درست */}
            <VideoSection isRtl={isRtl} />

            <CommentsSection isRtl={isRtl} />

            <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-white/10 flex justify-between items-center">
              <Link
                to="/blog"
                className="group flex items-center gap-2 text-sm font-semibold
                           text-gray-600 dark:text-white/60
                           hover:text-yellow-600 dark:hover:text-yellow-400
                           transition-all duration-300 hover:gap-3"
              >
                {isRtl ? (
                  <HiOutlineArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                ) : (
                  <HiOutlineArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                )}
                {isRtl ? "بازگشت به بلاگ" : "Back to Blog"}
              </Link>
              <span className="text-xs text-gray-400 dark:text-white/30 font-mono">{article.publishDate}</span>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-24">
              <Sidebar 
                article={article} 
                relatedArticles={relatedArticles.slice(0, 3)} 
                views={views}
                commentsCount={0}
                isRtl={isRtl} 
                lang={lang} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
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
              <div className="mx-auto mt-4 w-16 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArticles.map((rel, idx) => (
                <motion.div
                  key={rel.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="group block rounded-2xl overflow-hidden
                               bg-white/60 dark:bg-black/30 backdrop-blur-md
                               border border-gray-200/50 dark:border-white/10
                               hover:border-yellow-400/50
                               transition-all duration-300
                               hover:shadow-2xl hover:shadow-yellow-500/10
                               hover:-translate-y-2"
                  >
                    <div className="overflow-hidden h-44">
                      <img
                        src={rel.cover}
                        alt={rel.title[lang]}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white/90 line-clamp-2 leading-snug mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                        {rel.title[lang]}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/40">
                        <HiOutlineClock size={11} />
                        <span>{rel.readTime} {isRtl ? "دقیقه" : "min"}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/20"></span>
                        <span>{rel.likes} likes</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(234, 179, 8, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(234, 179, 8, 0.8);
        }
      `}</style>
    </>
  );
}