import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade, Thumbs } from "swiper/modules";
import Typed from "typed.js";
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
  HiOutlineChatAlt2,
  HiOutlineEye,
} from "react-icons/hi";
import ArticleContent from "../../components/article/ArticleContent";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// ================== تصاویر هیرو ==================
const ALL_HERO_IMAGES = [
  "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
  "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png",
  "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png",
  "/assets/hero-articlepage/us-galaxy-s26-ultra-s948-sm-s948uzvaxaa-550993899.avif",
  "/assets/hero-articlepage/us-galaxy-s25-s938-536276-sm-s938uzbfxaa-548617513.avif",
  "/assets/hero-articlepage/us-galaxy-z-fold7-f966-sm-f966udbaxaa-547827740.avif",
  "/assets/hero-articlepage/us-galaxy-book6-pro-16-inch-np960xjge-np960xjg-ka1us-551616681.avif",
  "/assets/hero-articlepage/nav_imac_24_832584093.png",
  "/assets/hero-articlepage/nav_mba_ea12e0d5b.png",
  "/assets/hero-articlepage/GNB_L1_Mobile_Galaxy-Watches_ultra.webp",
  "/assets/hero-articlepage/GNB_Mobile_L1_08_88x88.webp",
  "/assets/hero-articlepage/GNB-Mobile-Accesories-88x88.webp",
  "/assets/hero-articlepage/S85TH40inch.webp",
];

const ARTICLE_HERO_IMAGES = {
  "iphone-17-pro-max": [
    "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
    "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png",
  ],
  "iphone-16-pro-max": ["/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png"],
  "galaxy-s24-ultra-ai-revolution": [
    "/assets/hero-articlepage/us-galaxy-s26-ultra-s948-sm-s948uzvaxaa-550993899.avif",
    "/assets/hero-articlepage/us-galaxy-s25-s938-536276-sm-s938uzbfxaa-548617513.avif",
  ],
  "z-flip-6-style-durability-review": ["/assets/hero-articlepage/us-galaxy-z-fold7-f966-sm-f966udbaxaa-547827740.avif"],
  "tab-s10-ultra-vs-ipad-pro-m4": ["/assets/hero-articlepage/us-galaxy-book6-pro-16-inch-np960xjge-np960xjg-ka1us-551616681.avif"],
};

function getHeroImages(slug) {
  const specific = ARTICLE_HERO_IMAGES[slug] || [];
  const rest = ALL_HERO_IMAGES.filter(img => !specific.includes(img));
  const shuffled = [...rest].sort(() => Math.random() - 0.5);
  return [...specific, ...shuffled.slice(0, Math.max(0, 6 - specific.length))];
}

// ================== تایپینگ هایلایت شده ==================
function HighlightTyping() {
  const el = useRef(null);
  const { i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  
  const texts = lang === "fa" 
    ? ["تک‌کرانچ", "تحلیل عمیق", "تخصصی‌ترین مرجع"]
    : ["TechCrunch", "Deep Analysis", "Expert Reviews"];

  useEffect(() => {
    if (!el.current) return;
    const typed = new Typed(el.current, {
      strings: texts,
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 2500,
      loop: true,
      cursorChar: "|",
    });
    return () => typed.destroy();
  }, [texts]);

  return <span ref={el} className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent font-black" />;
}

// ================== هیرو اسلایدر ==================
function HeroSlider({ images }) {
  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        speed={1000}
        className="w-full h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} alt={`hero ${idx}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="absolute bottom-12 left-0 right-0 text-center z-20 px-4">
        <div className="text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl">
          <HighlightTyping />
        </div>
      </div>
    </div>
  );
}

// ================== لودینگ ==================
function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="w-16 h-16 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">در حال بارگذاری...</p>
      </div>
    </div>
  );
}

// ================== اشتراک‌گذاری ==================
function ShareButtons({ url, title, isRtl }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [url]);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs text-gray-500">{isRtl ? "اشتراک‌گذاری:" : "Share:"}</span>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-500 transition">𝕏</a>
      <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-500 transition">TG</a>
      <button onClick={copy} className="text-gray-600 hover:text-amber-500 transition text-sm">{copied ? "✓" : "کپی لینک"}</button>
    </div>
  );
}

// ================== نوار پیشرفت ==================
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gray-200 dark:bg-gray-800">
      <div className="h-full bg-amber-500 transition-all duration-100" style={{ width: `${progress}%` }} />
    </div>
  );
}

// ================== ویدیوها ==================
const RELATED_VIDEOS = [
  { id: "yojtBfY8_lU", title: "iPhone 17 Pro Max Full Review", duration: "12:34" },
  { id: "dQw4w9WgXcQ", title: "Samsung Galaxy S24 Ultra vs iPhone 17", duration: "15:21" },
  { id: "9bZkp7q19f0", title: "Top 10 iOS 19 Features", duration: "8:45" },
];

function VideoSection() {
  const [activeVideo, setActiveVideo] = useState(RELATED_VIDEOS[0]);

  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold mb-4">ویدیوهای مرتبط</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0`}
              title={activeVideo.title}
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="font-semibold mt-2">{activeVideo.title}</p>
        </div>
        <div className="space-y-3">
          {RELATED_VIDEOS.map(video => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className={`w-full flex gap-3 p-2 rounded-lg transition text-left ${activeVideo.id === video.id ? "bg-amber-500/10 border border-amber-500/30" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              <img src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} alt={video.title} className="w-28 h-16 rounded object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2">{video.title}</p>
                <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================== نظرات ==================
function CommentsSection({ isRtl, articleSlug }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`comments_${articleSlug}`);
    if (saved) setComments(JSON.parse(saved));
    else setComments([
      { id: 1, author: "مهدی کریمی", date: "۲ روز پیش", text: "مقاله عالی بود! ممنون.", likes: 12 },
      { id: 2, author: "سارا حسینی", date: "۵ روز پیش", text: "بسیار مفید و کاربردی.", likes: 8 },
    ]);
  }, [articleSlug]);

  const handleAdd = () => {
    if (!newComment.trim()) return;
    const newObj = { id: Date.now(), author: isRtl ? "شما" : "You", date: "همین الان", text: newComment, likes: 0 };
    setComments([newObj, ...comments]);
    localStorage.setItem(`comments_${articleSlug}`, JSON.stringify([newObj, ...comments]));
    setNewComment("");
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold mb-6">{isRtl ? "نظرات" : "Comments"} ({comments.length})</h3>
      <div className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={isRtl ? "نظر خود را بنویسید..." : "Write your comment..."}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <button onClick={handleAdd} className="mt-2 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition">
          {isRtl ? "ارسال" : "Send"}
        </button>
      </div>
      <div className="space-y-4">
        {comments.map(c => (
          <div key={c.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
            <p className="font-semibold text-sm">{c.author} <span className="text-gray-400 text-xs ml-2">• {c.date}</span></p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ================== سایدبار ==================
function Sidebar({ article, views, isRtl }) {
  const [likeCount, setLikeCount] = useState(article?.likes || 0);
  const [liked, setLiked] = useState(false);

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      <div className="text-center p-5 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-amber-500/30">
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-amber-500/30">
          {(article?.author?.[0] || "T")}
        </div>
        <h4 className="mt-2 font-bold text-sm text-white">{article?.author || "Tech Team"}</h4>
      </div>
      
      <div className="flex justify-around p-4 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-amber-500/20">
        <div className="text-center">
          <HiOutlineEye className="w-5 h-5 mx-auto text-amber-500" />
          <p className="font-bold mt-1 text-white">{views || 0}</p>
          <p className="text-[10px] text-gray-400">{isRtl ? "بازدید" : "Views"}</p>
        </div>
        <button onClick={() => setLiked(!liked)} className="text-center">
          {liked ? <HiHeart className="w-5 h-5 mx-auto text-amber-500 fill-amber-500" /> : <HiOutlineHeart className="w-5 h-5 mx-auto text-amber-500" />}
          <p className="font-bold mt-1 text-white">{liked ? likeCount + 1 : likeCount}</p>
          <p className="text-[10px] text-gray-400">{isRtl ? "لایک" : "Likes"}</p>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {article?.tags?.slice(0, 8).map(tag => (
          <span key={tag} className="text-[10px] text-gray-400 border border-gray-600 px-2 py-0.5 rounded-full hover:border-amber-500 hover:text-amber-400 transition">#{tag}</span>
        ))}
      </div>
    </div>
  );
}

// ================== گالری ==================
function ImageGallery({ images }) {
  if (!images || images.length === 0) return null;
  
  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold mb-4 text-amber-400">گالری تصاویر</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.slice(0, 8).map((img, idx) => (
          <img key={idx} src={img} alt={`gallery ${idx}`} className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition hover:scale-105 duration-300 border border-amber-500/30" />
        ))}
      </div>
    </div>
  );
}

// ================== استایل گلاسی و طلایی ==================
const glassmorphismStyle = `
  .article-content {
    font-size: 1.05rem;
    line-height: 1.8;
    color: #f1f5f9;
    background: rgba(15, 25, 35, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 28px;
    padding: 2rem;
    border: 1px solid rgba(245, 158, 11, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(245, 158, 11, 0.1);
    transition: all 0.3s ease;
  }
  
  .article-content h1 {
    font-size: 2.8rem;
    font-weight: 900;
    font-stretch: expanded;
    margin: 0 0 1.5rem 0;
    background: linear-gradient(135deg, #ffffff 0%, #f59e0b 40%, #ffedd5 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
    letter-spacing: -0.02em;
  }
  
  .article-content h2 {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 2rem 0 1rem;
    color: #f59e0b;
    border-left: 5px solid #f59e0b;
    padding-left: 1rem;
    letter-spacing: -0.01em;
  }
  
  .article-content h3 {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 1.5rem 0 0.75rem;
    color: #fbbf24;
  }
  
  .article-content p {
    margin-bottom: 1.2rem;
    color: #e2e8f0;
    font-weight: 400;
    text-align: justify;
  }
  
  .article-content strong, .article-content b {
    color: #f59e0b;
    font-weight: 800;
    text-shadow: 0 0 3px rgba(245, 158, 11, 0.4);
  }
  
  .article-content ul, .article-content ol {
    background: rgba(245, 158, 11, 0.05);
    border-radius: 20px;
    padding: 1rem 1.8rem;
    margin: 1.2rem 0;
  }
  
  .article-content li {
    margin: 0.6rem 0;
    color: #cbd5e1;
  }
  
  .article-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.8rem 0;
    background: rgba(15, 25, 35, 0.6);
    backdrop-filter: blur(8px);
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }
  
  .article-content th {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
    font-weight: 800;
    padding: 14px;
    text-align: center;
    font-size: 0.95rem;
  }
  
  .article-content td {
    border: 1px solid rgba(245, 158, 11, 0.2);
    padding: 12px;
    color: #e2e8f0;
    text-align: center;
  }
  
  .article-content a {
    color: #fbbf24;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .article-content a:hover {
    color: #f59e0b;
    text-decoration: underline;
  }
  
  .article-content blockquote {
    border-right: 4px solid #f59e0b;
    background: rgba(245, 158, 11, 0.1);
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 16px;
    font-style: italic;
    color: #cbd5e1;
  }
  
  @media (max-width: 768px) {
    .article-content {
      font-size: 0.95rem;
      padding: 1.2rem;
      border-radius: 20px;
    }
    .article-content h1 { font-size: 1.8rem; }
    .article-content h2 { font-size: 1.4rem; }
    .article-content h3 { font-size: 1.2rem; }
  }
`;

// ================== کامپوننت اصلی ==================
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
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/articles/${slug}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setArticle(data);
        setLikeCount(data.likes || 0);
        const savedViews = localStorage.getItem(`views_${slug}`);
        const newViews = savedViews ? parseInt(savedViews) + 1 : 1;
        setViews(newViews);
        localStorage.setItem(`views_${slug}`, newViews);
        setLiked(localStorage.getItem(`like_${slug}`) === "true");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) return <LoadingSkeleton />;
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{isRtl ? "مقاله یافت نشد" : "Article Not Found"}</h1>
          <Link to="/blog" className="text-amber-500 hover:text-amber-400 transition">{isRtl ? "بازگشت" : "Back"}</Link>
        </div>
      </div>
    );
  }

  const heroImages = getHeroImages(slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" dir={isRtl ? "rtl" : "ltr"}>
      <ReadingProgressBar />

      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <HeroSlider images={heroImages} />
        
        <motion.div style={{ opacity: heroOpacity }} className="absolute top-4 left-0 right-0 px-4 z-30">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-amber-400 transition">
            {isRtl ? <HiOutlineArrowRight size={14} /> : <HiOutlineArrowLeft size={14} />}
            <span>{isRtl ? "بازگشت" : "Back"}</span>
          </Link>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 md:pb-12 lg:pb-16 px-4 bg-gradient-to-t from-gray-950 via-transparent to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">{article.brand}</span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-lg">
              {article.title?.[lang]}
            </h1>
            <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs md:text-sm text-white/60">
              <span className="flex items-center gap-1"><HiOutlineCalendar size={12} />{article.publishDate?.slice(0, 10)}</span>
              <span className="flex items-center gap-1"><HiOutlineClock size={12} />{article.readTime} {isRtl ? "دقیقه" : "min"}</span>
              <span className="flex items-center gap-1"><HiOutlineEye size={12} />{views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-800">
              <div className="flex flex-wrap gap-2">
                {article.tags?.slice(0, 5).map(tag => (
                  <span key={tag} className="text-[10px] font-medium text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full hover:bg-amber-500/20 hover:text-amber-400 transition">#{tag}</span>
                ))}
              </div>
              <ShareButtons url={window.location.href} title={article.title?.[lang]} isRtl={isRtl} />
            </div>

            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
              <ArticleContent content={article.content?.[lang]} isRtl={isRtl} />
            </div>

            <ImageGallery images={heroImages} />
            <VideoSection />
            <CommentsSection isRtl={isRtl} articleSlug={slug} />

            <div className="mt-8 pt-6 border-t border-gray-800">
              <Link to="/blog" className="text-sm text-gray-500 hover:text-amber-500 transition">
                {isRtl ? "← بازگشت به بلاگ" : "← Back to Blog"}
              </Link>
            </div>
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <Sidebar article={article} views={views} isRtl={isRtl} />
          </div>
        </div>
      </div>

      <style>{`
        .swiper-pagination-bullet { background: rgba(245,158,11,0.6) !important; }
        .swiper-pagination-bullet-active { background: #f59e0b !important; }
        .swiper-button-next, .swiper-button-prev { color: #f59e0b !important; opacity: 0.5; }
        .swiper-button-next:hover, .swiper-button-prev:hover { opacity: 1; }
        @media (max-width: 640px) {
          .swiper-button-next, .swiper-button-prev { display: none !important; }
        }
        ${glassmorphismStyle}
      `}</style>
    </div>
  );
}