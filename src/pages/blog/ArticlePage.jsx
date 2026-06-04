import { useState, useEffect, useMemo, useRef, useCallback } from "react";
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
// ShareButtons
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
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-white/70 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/15 px-3 py-1.5 rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-500/20 transition-all duration-200">𝕏</a>
      <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-white/70 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/15 px-3 py-1.5 rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-500/20 transition-all duration-200">TG</a>
      <button onClick={copy} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-white/70 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/15 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-200"><HiOutlineShare size={12} />{copied ? (isRtl ? "کپی شد!" : "Copied!") : (isRtl ? "کپی لینک" : "Copy link")}</button>
    </div>
  );
}

// ─────────────────────────────────────────────
// ReadingProgressBar
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
  return <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-200 dark:bg-white/10"><div className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 transition-all duration-100" style={{ width: `${progress}%` }} /></div>;
}

// ─────────────────────────────────────────────
// FloatingTableOfContents
// ─────────────────────────────────────────────
function FloatingTableOfContents({ content, isRtl }) {
  const [active, setActive] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  const headings = useMemo(() => {
    if (!content) return [];
    const regex = /<h2>(.*?)<\/h2>/g;
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push({ text: match[1], id: match[1].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") });
    }
    return matches;
  }, [content]);

  useEffect(() => {
    if (!headings.length) return;
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings.length]);

  if (headings.length < 2 || !isVisible) return null;

  return (
    <motion.div initial={{ opacity: 0, x: isRtl ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} className={`fixed top-32 z-40 w-64 hidden xl:block ${isRtl ? 'left-6' : 'right-6'}`}>
      <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-white/10 shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-yellow-400/60 mb-3">{isRtl ? "در این مقاله" : "IN THIS ARTICLE"}</p>
        <ul className="space-y-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {headings.map(({ text, id }) => (
            <li key={id}><a href={`#${id}`} className="text-xs transition-all duration-300 hover:text-yellow-600 dark:hover:text-yellow-400 block py-1 text-gray-600 dark:text-white/60">{text}</a></li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// HeroSlider
// ─────────────────────────────────────────────
function HeroSlider({ media, brand, isRtl }) {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const current = media?.[index];
  const isVideo = current?.type === "video";

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (!isVideo && media?.length > 1) {
      timerRef.current = setInterval(() => setIndex((i) => (i + 1) % media.length), 5000);
    }
  }, [isVideo, media?.length]);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);
  useEffect(() => { if (videoRef.current) videoRef.current.muted = muted; }, [muted, index]);

  const go = (dir) => { clearInterval(timerRef.current); setIndex((i) => (i + dir + media.length) % media.length); startTimer(); };
  if (!media?.length) return null;

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.8 }} className="absolute inset-0">
          {isVideo ? (
            <video ref={videoRef} src={current.src} poster={current.poster} autoPlay loop muted={muted} playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={current.src} alt={current.alt ?? brand} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </motion.div>
      </AnimatePresence>
      {media.length > 1 && (
        <>
          <button onClick={() => go(-1)} className={`absolute ${isRtl ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-yellow-500 transition-all`}>{isRtl ? <HiOutlineChevronRight size={22} /> : <HiOutlineChevronLeft size={22} />}</button>
          <button onClick={() => go(1)} className={`absolute ${isRtl ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-yellow-500 transition-all`}>{isRtl ? <HiOutlineChevronLeft size={22} /> : <HiOutlineChevronRight size={22} />}</button>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// VideoSection
// ─────────────────────────────────────────────
function VideoSection({ isRtl, articleVideos = [] }) {
  const defaultVideos = [
    { id: "yojtBfY8_lU", title: "iPhone 17 Pro Max Review", channel: "TechZone", duration: "12:34" },
    { id: "FOxBhUit5Qw", title: "Samsung Galaxy S26 Ultra vs S25 Ultra", channel: "TechZone", duration: "15:21" },
  ];
  const [activeVideo, setActiveVideo] = useState(null);
  const videos = articleVideos?.length > 0 ? articleVideos : defaultVideos;
  
  useEffect(() => { if (videos.length > 0 && !activeVideo) setActiveVideo(videos[0]); }, [videos]);
  if (!activeVideo) return null;
  
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16 mb-12">
      <div className="text-center mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-yellow-500">{isRtl ? "ویدیوهای مرتبط" : "WATCH & LEARN"}</span>
        <h2 className="text-2xl md:text-3xl font-bold">{isRtl ? "ویدیوی بررسی تخصصی" : "Video Review"}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/60 dark:bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden">
            <div className="relative w-full aspect-video bg-black">
              <iframe src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`} title={activeVideo.title} frameBorder="0" allowFullScreen className="absolute inset-0 w-full h-full" />
            </div>
            <div className="p-5"><h3 className="text-xl font-bold">{activeVideo.title}</h3></div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white/60 dark:bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden">
            <div className="p-4 border-b"><h4 className="font-bold">{isRtl ? "بیشتر ویدیوها" : "More Videos"}</h4></div>
            {videos.map((video) => (
              <button key={video.id} onClick={() => setActiveVideo(video)} className={`w-full text-left p-4 hover:bg-white/30 transition-all ${activeVideo.id === video.id ? "bg-yellow-500/10 border-l-4 border-l-yellow-500" : ""}`}>
                <div className="flex gap-3">
                  <img src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} alt={video.title} className="w-28 h-16 rounded-lg object-cover" />
                  <div><p className="text-sm font-semibold line-clamp-2">{video.title}</p><p className="text-[10px] text-gray-400">{video.channel}</p></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// CommentsSection
// ─────────────────────────────────────────────
function CommentsSection({ isRtl, articleSlug }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  
  useEffect(() => {
    const saved = localStorage.getItem(`comments_${articleSlug}`);
    if (saved) setComments(JSON.parse(saved));
    else setComments([
      { id: 1, author: "مهدی کریمی", avatar: "م", date: "۲ روز پیش", text: "مقاله فوق‌العاده بود! واقعاً استفاده کردم.", likes: 12 },
      { id: 2, author: "سارا حسینی", avatar: "س", date: "۵ روز پیش", text: "خیلی مفید بود. ممنون از تیم تک‌کرانچ", likes: 8 },
    ]);
  }, [articleSlug]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj = { id: Date.now(), author: isRtl ? "شما" : "You", avatar: isRtl ? "ش" : "Y", date: isRtl ? "همین الان" : "Just now", text: newComment, likes: 0 };
    const updated = [newCommentObj, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${articleSlug}`, JSON.stringify(updated));
    setNewComment("");
  };

  return (
    <div className="mt-12 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><HiOutlineChatAlt2 className="text-yellow-500" />{isRtl ? "نظرات کاربران" : "Comments"} ({comments.length})</h3>
      <div className="flex gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">{isRtl ? "ش" : "Y"}</div>
        <div className="flex-1">
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={isRtl ? "نظر خود را بنویسید..." : "Write your comment..."} rows={3} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border" />
          <div className="flex justify-end mt-2"><button onClick={handleAddComment} className="px-4 py-2 bg-yellow-500 text-white rounded-xl">{isRtl ? "ارسال نظر" : "Send"}</button></div>
        </div>
      </div>
      {comments.map(c => <div key={c.id} className="flex gap-3 p-4 border-b"><div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-white">{c.avatar}</div><div><p className="font-semibold text-sm">{c.author} • <span className="text-xs text-gray-400">{c.date}</span></p><p className="text-sm mt-1">{c.text}</p><button className="flex items-center gap-1 text-xs text-gray-400 mt-1"><HiOutlineHeart size={12} /> {c.likes}</button></div></div>)}
    </div>
  );
}

// ─────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────
function Sidebar({ article, relatedArticles, views, commentsCount, isRtl, lang }) {
  const [likeCount, setLikeCount] = useState(article?.likes || 0);
  const [liked, setLiked] = useState(false);
  const handleLike = () => { setLikeCount(liked ? likeCount - 1 : likeCount + 1); setLiked(!liked); };
  const authorStats = { articles: 42, followers: 1200 };

  return (
    <div className="space-y-6">
      <div className="bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-2xl p-5 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-2xl font-bold">{(article?.author ?? "T")[0]}</div>
        <h4 className="mt-3 font-bold">{article?.author ?? "Tech Team"}</h4>
        <p className="text-xs text-gray-500 mt-1">{isRtl ? "نویسنده و تحلیلگر ارشد" : "Senior Writer & Analyst"}</p>
        <div className="flex justify-center gap-4 mt-4 pt-3 border-t"><div className="text-center"><p className="text-lg font-bold">{authorStats.articles}</p><p className="text-[10px] text-gray-500">{isRtl ? "مقالات" : "Articles"}</p></div><div className="text-center"><p className="text-lg font-bold">{authorStats.followers.toLocaleString()}</p><p className="text-[10px] text-gray-500">{isRtl ? "دنبال‌کننده" : "Followers"}</p></div></div>
      </div>
      <div className="bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-2xl p-5">
        <div className="flex justify-around">
          <div className="text-center"><HiOutlineEye className="w-5 h-5 mx-auto text-yellow-500" /><p className="text-lg font-bold mt-2">{views?.toLocaleString() || 0}</p><p className="text-[10px] text-gray-500">{isRtl ? "بازدید" : "Views"}</p></div>
          <div className="text-center cursor-pointer" onClick={handleLike}><HiOutlineHeart className={`w-5 h-5 mx-auto ${liked ? "text-yellow-500 fill-yellow-500" : "text-yellow-500"}`} /><p className="text-lg font-bold mt-2">{likeCount.toLocaleString()}</p><p className="text-[10px] text-gray-500">{isRtl ? "لایک" : "Likes"}</p></div>
          <div className="text-center"><HiOutlineChatAlt2 className="w-5 h-5 mx-auto text-yellow-500" /><p className="text-lg font-bold mt-2">{commentsCount || 0}</p><p className="text-[10px] text-gray-500">{isRtl ? "نظر" : "Comments"}</p></div>
        </div>
      </div>
      {relatedArticles?.length > 0 && (
        <div className="bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-2xl p-5">
          <h4 className="font-bold mb-4 flex items-center gap-2"><HiOutlineUserGroup className="text-yellow-500" />{isRtl ? "مطالب مرتبط" : "Related Reads"}</h4>
          {relatedArticles.map((rel) => {
            const badge = getArticleBadge(rel, isRtl);
            return (
              <Link key={rel.slug} to={getArticlePath(rel)} className="flex gap-3 items-start p-2 hover:bg-white/30 rounded-xl transition-all">
                <img src={rel.cover} alt={rel.title?.[lang]} className="w-12 h-12 rounded-lg object-cover" />
                <div><p className="text-xs font-semibold line-clamp-2">{rel.title?.[lang]}</p><div className="flex gap-2 mt-1"><span className="text-[10px] text-gray-400">{rel.readTime} min read</span>{badge && <span className={`text-[8px] ${badge.className} px-1.5 py-0.5 rounded-full`}>{badge.text}</span>}</div></div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// ArticlePage اصلی - با API
// ─────────────────────────────────────────────
export default function ArticlePage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRtl = lang === "fa";
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  // دریافت مقاله از API
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/articles/${slug}`);
        if (!res.ok) throw new Error("Article not found");
        const data = await res.json();
        setArticle(data);
        setLikeCount(data.likes || 0);
        
        const savedViews = localStorage.getItem(`views_${slug}`);
        const newViews = savedViews ? parseInt(savedViews) + 1 : 1;
        setViews(newViews);
        localStorage.setItem(`views_${slug}`, newViews);
        
        setLiked(localStorage.getItem(`like_${slug}`) === "true");
        setBookmarked(localStorage.getItem(`bookmark_${slug}`) === "true");
        
        setRelatedArticles([]);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  const toggleLike = () => {
    const newCount = liked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newCount);
    setLiked(!liked);
    localStorage.setItem(`like_${slug}`, !liked);
    localStorage.setItem(`likeCount_${slug}`, newCount);
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    localStorage.setItem(`bookmark_${slug}`, !bookmarked);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">در حال بارگذاری...</div>;
  if (!article) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">{isRtl ? "مقاله یافت نشد" : "Article Not Found"}</h1><Link to="/blog" className="text-yellow-500">{isRtl ? "بازگشت به بلاگ" : "Back to Blog"}</Link></div></div>;

  const pageUrl = `https://yourdomain.com/blog/${slug}`;
  const mediaItems = article.media?.length ? article.media.slice(0, 3) : [{ type: "image", src: article.cover, alt: article.title?.[lang] }];

  return (
    <>
      <ReadingProgressBar />
      <Helmet><title>{article.title?.[lang]} | Tech Magazine</title></Helmet>
      <FloatingTableOfContents content={article.content?.[lang]} isRtl={isRtl} />

      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <HeroSlider media={mediaItems} brand={article.brand} isRtl={isRtl} />
        <div className="absolute top-6 left-0 right-0 flex justify-between px-6 z-30">
          <Link to="/blog" className="flex items-center gap-2 text-sm font-bold text-white bg-black/40 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full">
            {isRtl ? <HiOutlineArrowRight size={15} /> : <HiOutlineArrowLeft size={15} />}
            <span>{isRtl ? "بازگشت به بلاگ" : "Back to Blog"}</span>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-16 px-6 bg-gradient-to-t from-black/90 to-transparent">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold mb-4">{article.brand}</span>
            <h1 className="text-4xl md:text-6xl font-black text-white">{article.title?.[lang]}</h1>
            <p className="mt-4 text-gray-200 max-w-3xl">{article.excerpt?.[lang]}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="flex items-center gap-1"><HiOutlineCalendar size={14} />{article.publishDate?.slice(0, 10)}</span>
              <span className="flex items-center gap-1"><HiOutlineClock size={14} />{article.readTime} {isRtl ? "دقیقه" : "min read"}</span>
              <button onClick={toggleLike} className={`flex items-center gap-1 ${liked ? "text-yellow-500" : "hover:text-yellow-500"}`}>{liked ? <HiHeart className="fill-yellow-500" /> : <HiOutlineHeart />}{likeCount.toLocaleString()}</button>
              <button onClick={toggleBookmark} className={bookmarked ? "text-yellow-500" : "hover:text-yellow-500"}>{bookmarked ? <HiBookmark className="fill-yellow-500" /> : <HiOutlineBookmark />}</button>
            </div>

            <div className="mb-8"><ShareButtons url={pageUrl} title={article.title?.[lang]} isRtl={isRtl} /></div>

            <div className="bg-white/50 dark:bg-black/30 backdrop-blur-md rounded-2xl p-6 md:p-8">
              <ArticleContent content={article.content?.[lang]} isRtl={isRtl} />
            </div>

            <VideoSection isRtl={isRtl} articleVideos={article.relatedVideos || []} />
            <CommentsSection isRtl={isRtl} articleSlug={slug} />

            <div className="mt-8 pt-6 border-t flex justify-between">
              <Link to="/blog" className="flex items-center gap-2 text-sm hover:text-yellow-600">
                {isRtl ? <HiOutlineArrowRight size={16} /> : <HiOutlineArrowLeft size={16} />}
                {isRtl ? "بازگشت به بلاگ" : "Back to Blog"}
              </Link>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <Sidebar article={article} relatedArticles={relatedArticles} views={views} commentsCount={0} isRtl={isRtl} lang={lang} />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; }.custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 10px; }.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(234,179,8,0.5); border-radius: 10px; }`}</style>
    </>
  );
}