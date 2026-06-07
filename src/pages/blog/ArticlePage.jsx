import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Typed from "typed.js";
import {
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineHeart,
  HiHeart,
  HiOutlineShare,
  HiOutlineEye,
} from "react-icons/hi";
import ArticleContent from "../../components/article/ArticleContent";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ================== ویدیوهای پیش‌فرض ==================
const RELATED_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "بررسی تخصصی آیفون ۱۸ پرو مکس", duration: "15:24" },
  { id: "9bZkp7q19f0", title: "مقایسه گلکسی S24 با آیفون ۱۵ پرو", duration: "12:18" },
  { id: "kJQP7kiw5Fk", title: "تکنولوژی‌های جدید ۲۰۲۵", duration: "8:45" },
  { id: "OPf0YbXqDm0", title: "آینده گوشی‌های تاشو", duration: "10:32" },
];

// ================== تصاویر هیرو جدید ==================
const ALL_HERO_IMAGES = [
  "/assets/hero-articlepage/iphone-18-promax.png",
  "/assets/hero-articlepage/iphone18-promax-hero.png",
  "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png",
  "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png",
  "/assets/hero-articlepage/download.jpg",
  "/assets/hero-articlepage/galaxy-s24.png",
  "/assets/hero-articlepage/galaxy-s24-plus.png",
  "/assets/hero-articlepage/GNB_Mobile_L1_08_88x88.webp",
  "/assets/hero-articlepage/hero-endframe.png",
  "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
  "/assets/hero-articlepage/iphone-12.png",
  "/assets/hero-articlepage/iphone-12-pro.png",
  "/assets/hero-articlepage/iphone-14-pro-max.png",
  "/assets/hero-articlepage/iphone-15.png",
  "/assets/hero-articlepage/iphone-15-pro.png",
];

const ARTICLE_HERO_IMAGES = {
  "iphone-17-pro-max": [
    "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
    "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png",
  ],
  "iphone-18-pro-max": [
    "/assets/hero-articlepage/iphone-18-promax.png",
    "/assets/hero-articlepage/iphone18-promax-hero.png",
  ],
  "iphone-16-pro-max": ["/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png"],
  "galaxy-s24-ultra-ai-revolution": [
    "/assets/hero-articlepage/galaxy-s24.png",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
  "iphone-15-pro-max": [
    "/assets/hero-articlepage/iphone-15-pro.png",
    "/assets/hero-articlepage/iphone-15.png",
  ],
  "iphone-14-pro-max": ["/assets/hero-articlepage/iphone-14-pro-max.png"],
  "iphone-12-pro-max": [
    "/assets/hero-articlepage/iphone-12-pro.png",
    "/assets/hero-articlepage/iphone-12.png",
  ],
};

function getHeroImages(slug) {
  const specific = ARTICLE_HERO_IMAGES[slug] || [];
  const rest = ALL_HERO_IMAGES.filter(img => !specific.includes(img));
  const shuffled = [...rest].sort(() => Math.random() - 0.5);
  return [...specific, ...shuffled.slice(0, Math.max(0, 4 - specific.length))];
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

// ================== هیرو اسلایدر بهینه ==================
function HeroSlider({ images }) {
  const [loadedImages, setLoadedImages] = useState({});
  const { i18n } = useTranslation();

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation
        loop
        speed={1000}
        className="w-full h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="relative">
            {!loadedImages[idx] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            
            <img 
              src={img} 
              alt={`hero ${idx + 1}`} 
              className={`w-full h-full transition-all duration-700 ${
                loadedImages[idx] ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{ 
                objectFit: "cover",
                objectPosition: "center 40%",
                filter: "brightness(0.9) contrast(1.1) saturate(1.15)"
              }}
              loading={idx === 0 ? "eager" : "lazy"}
              onLoad={() => handleImageLoad(idx)}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20">
        <div className="swiper-button-prev-custom w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-amber-500 transition-all duration-300 cursor-pointer">
          <HiOutlineArrowLeft size={18} />
        </div>
      </div>
      <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20">
        <div className="swiper-button-next-custom w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-amber-500 transition-all duration-300 cursor-pointer">
          <HiOutlineArrowRight size={18} />
        </div>
      </div>
      
      <div className="absolute top-20 md:top-28 left-0 right-0 text-center z-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-2xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-2xl">
            <HighlightTyping />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ================== لودینگ سریع ==================
function LoadingSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500/50 border-b-transparent border-l-transparent animate-spin" />
        </div>
        <p className="mt-4 text-amber-500 text-sm font-medium">در حال بارگذاری...</p>
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
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-gray-500">{isRtl ? "اشتراک‌گذاری:" : "Share:"}</span>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-500 transition text-sm">𝕏</a>
      <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-500 transition text-sm">TG</a>
      <button onClick={copy} className="text-gray-500 hover:text-amber-500 transition text-sm">{copied ? "✓" : "Copy"}</button>
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
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-800">
      <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-100" style={{ width: `${progress}%` }} />
    </div>
  );
}

// ================== گالری داینامیک ==================
function ImageGallery({ images, title }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  
  if (!images || images.length === 0) return null;
  
  return (
    <>
      <div className="mt-12">
        <h3 className="text-lg font-bold mb-4 text-amber-400">
          {lang === "fa" ? "گالری تصاویر" : "Image Gallery"} {title}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.slice(0, 12).map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img} 
                alt={`gallery ${idx + 1}`} 
                className="w-full h-32 object-cover transition-all duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
        {images.length > 12 && (
          <p className="text-center text-gray-500 text-sm mt-3">
            + {images.length - 12} {lang === "fa" ? "تصویر دیگر" : "more images"}
          </p>
        )}
      </div>

      {/* مودال بزرگنمایی */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] p-4">
            <img 
              src={selectedImage} 
              alt="Full size" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-amber-500 transition"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ================== ویدیوهای داینامیک ==================
function VideoSection({ videos }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  
  // اگر ویدیوی اختصاصی برای مقاله نبود، از پیش‌فرض استفاده کن
  const videoList = videos?.length > 0 ? videos : RELATED_VIDEOS;
  
  // تنظیم ویدیوی فعال در اولین رندر
  useEffect(() => {
    if (videoList.length > 0 && !activeVideo) {
      setActiveVideo(videoList[0]);
    }
  }, [videoList, activeVideo]);

  if (!videoList.length) return null;

  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold mb-4 text-amber-400">
        {lang === "fa" ? "ویدیوهای مرتبط" : "Related Videos"}
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-lg shadow-amber-500/20">
            {activeVideo && (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0&autoplay=0`}
                title={activeVideo.title}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full"
              />
            )}
          </div>
          <p className="font-semibold mt-3 text-white">{activeVideo?.title}</p>
          <p className="text-sm text-gray-400 mt-1">{activeVideo?.duration}</p>
        </div>
        <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
          {videoList.map((video, idx) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveVideo(video)}
              className={`w-full flex gap-3 p-2 rounded-lg transition-all text-left group ${
                activeVideo?.id === video.id 
                  ? "bg-gradient-to-r from-amber-500/20 to-transparent border-r-2 border-amber-500" 
                  : "hover:bg-gray-800/50"
              }`}
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                  alt={video.title} 
                  className="w-28 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-300 line-clamp-2 group-hover:text-amber-400 transition">
                  {video.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f59e0b;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

// ================== سایدبار کامل ==================
function Sidebar({ article, views, isRtl, onLikeUpdate }) {
  const [likeCount, setLikeCount] = useState(article?.likes || 0);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked_${article?.slug}`);
    if (likedStatus === 'true') setLiked(true);
  }, [article?.slug]);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const endpoint = liked ? 'unlike' : 'like';
      const res = await fetch(`http://localhost:5000/api/articles/${article?.slug}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setLikeCount(data.likes);
        setLiked(!liked);
        localStorage.setItem(`liked_${article?.slug}`, (!liked).toString());
        if (onLikeUpdate) onLikeUpdate(data.likes);
      }
    } catch (error) {
      console.error('Error liking article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-5">
      {/* نویسنده */}
      <div className="text-center p-4 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-amber-500/20">
        <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold">
          {(article?.author?.[0] || "T").toUpperCase()}
        </div>
        <h4 className="mt-2 font-bold text-sm text-white">{article?.author || "Tech Team"}</h4>
        <p className="text-[10px] text-gray-500 mt-1">{isRtl ? "نویسنده" : "Author"}</p>
      </div>
      
      {/* آمار (بازدید + لایک) */}
      <div className="flex justify-around p-3 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-amber-500/20">
        <div className="text-center">
          <HiOutlineEye className="w-5 h-5 mx-auto text-amber-500" />
          <p className="font-bold mt-1 text-white text-sm">{views?.toLocaleString() || 0}</p>
          <p className="text-[10px] text-gray-400">{isRtl ? "بازدید" : "Views"}</p>
        </div>
        
        <button 
          onClick={handleLike} 
          disabled={isLoading} 
          className="text-center transition-transform hover:scale-110 disabled:opacity-50"
        >
          {liked ? 
            <HiHeart className="w-5 h-5 mx-auto text-amber-500 fill-amber-500" /> : 
            <HiOutlineHeart className="w-5 h-5 mx-auto text-amber-500" />
          }
          <p className="font-bold mt-1 text-white text-sm">{likeCount?.toLocaleString() || 0}</p>
          <p className="text-[10px] text-gray-400">{isRtl ? "لایک" : "Likes"}</p>
        </button>
      </div>

      {/* تگ‌ها */}
      <div className="flex flex-wrap gap-1.5">
        {article?.tags?.slice(0, 6).map(tag => (
          <span 
            key={tag} 
            className="text-[9px] text-gray-400 border border-gray-600 px-2 py-0.5 rounded-full hover:border-amber-500 hover:text-amber-400 transition cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* اطلاعات اضافی */}
      <div className="text-center p-3 rounded-xl bg-gray-800/20 border border-gray-700/50">
        <p className="text-[10px] text-gray-500">
          {isRtl ? "تاریخ انتشار:" : "Published:"} {article?.publishDate?.slice(0, 10)}
        </p>
        <p className="text-[10px] text-gray-500 mt-1">
          {isRtl ? "زمان مطالعه:" : "Read time:"} {article?.readTime} {isRtl ? "دقیقه" : "min"}
        </p>
      </div>
    </div>
  );
}

// ================== استایل گلاسی ==================
const glassmorphismStyle = `
  .swiper-pagination-bullet {
    background: rgba(255,255,255,0.5) !important;
    opacity: 0.7;
  }
  .swiper-pagination-bullet-active {
    background: #f59e0b !important;
    width: 24px !important;
    border-radius: 12px !important;
  }
  .swiper-button-prev-custom, .swiper-button-next-custom {
    backdrop-filter: blur(8px);
  }
  .swiper-button-prev-custom:hover, .swiper-button-next-custom:hover {
    background: #f59e0b !important;
    box-shadow: 0 0 15px rgba(245,158,11,0.5);
  }
  .article-content {
    font-size: 1rem;
    line-height: 1.75;
    color: #e2e8f0;
    background: rgba(15,25,35,0.4);
    backdrop-filter: blur(12px);
    border-radius: 24px;
    padding: 1.5rem;
    border: 1px solid rgba(245,158,11,0.2);
  }
  .article-content h1 {
    font-size: 2.2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #fff, #f59e0b);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    margin-bottom: 1rem;
  }
  .article-content h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f59e0b;
    border-right: 4px solid #f59e0b;
    padding-right: 1rem;
    margin: 1.5rem 0 1rem;
  }
  .article-content p {
    margin-bottom: 1rem;
    text-align: justify;
  }
  .article-content strong {
    color: #f59e0b;
  }
  .article-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    background: rgba(0,0,0,0.3);
    border-radius: 16px;
    overflow: hidden;
  }
  .article-content th {
    background: #f59e0b;
    color: #000;
    padding: 10px;
    font-weight: 700;
  }
  .article-content td {
    border: 1px solid rgba(245,158,11,0.2);
    padding: 8px;
  }
  @media (max-width: 768px) {
    .article-content { padding: 1rem; }
    .article-content h1 { font-size: 1.6rem; }
    .article-content h2 { font-size: 1.3rem; }
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
  const [articleLikes, setArticleLikes] = useState(0);
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
        setArticleLikes(data.likes || 0);
        
        const savedViews = localStorage.getItem(`views_${slug}`);
        const newViews = savedViews ? parseInt(savedViews) + 1 : 1;
        setViews(newViews);
        localStorage.setItem(`views_${slug}`, newViews);
        
        await fetch(`http://localhost:5000/api/articles/${slug}/view`, { method: 'POST' }).catch(() => {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  const handleLikeUpdate = (newLikes) => {
    setArticleLikes(newLikes);
    setArticle(prev => ({ ...prev, likes: newLikes }));
  };

  if (loading) return <LoadingSkeleton />;
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">{isRtl ? "مقاله یافت نشد" : "Article Not Found"}</h1>
          <Link to="/blog" className="text-amber-500 hover:text-amber-400 transition">
            {isRtl ? "بازگشت به بلاگ" : "Back to Blog"}
          </Link>
        </div>
      </div>
    );
  }

  const heroImages = getHeroImages(slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" dir={isRtl ? "rtl" : "ltr"}>
      <ReadingProgressBar />

      {/* بخش هیرو */}
      <div className="relative w-full h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">
        <HeroSlider images={heroImages} />
        
        <motion.div style={{ opacity: heroOpacity }} className="absolute top-4 left-0 right-0 px-4 z-30">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-amber-400 transition">
            {isRtl ? <HiOutlineArrowRight size={14} /> : <HiOutlineArrowLeft size={14} />}
            <span>{isRtl ? "بازگشت" : "Back"}</span>
          </Link>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 md:pb-8 px-4 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">{article.brand}</span>
            <h1 className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
              {article.title?.[lang]}
            </h1>
            <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-white/50">
              <span className="flex items-center gap-1"><HiOutlineCalendar size={12} />{article.publishDate?.slice(0, 10)}</span>
              <span className="flex items-center gap-1"><HiOutlineClock size={12} />{article.readTime} {isRtl ? "دقیقه" : "min"}</span>
              <span className="flex items-center gap-1"><HiOutlineEye size={12} />{views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ستون اصلی */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-gray-800">
              <div className="flex flex-wrap gap-1.5">
                {article.tags?.slice(0, 4).map(tag => (
                  <span key={tag} className="text-[9px] font-medium text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              <ShareButtons url={window.location.href} title={article.title?.[lang]} isRtl={isRtl} />
            </div>

            {/* محتوای مقاله */}
            <div className="prose prose-sm md:prose-base max-w-none">
              <ArticleContent content={article.content?.[lang]} isRtl={isRtl} />
            </div>

            {/* گالری تصاویر */}
            {article?.gallery?.length > 0 && (
              <ImageGallery images={article.gallery} title={article.title?.[lang]} />
            )}

            {/* ویدیوهای مرتبط */}
            <VideoSection videos={article?.relatedVideos} />

            {/* لینک بازگشت */}
            <div className="mt-8 pt-5 border-t border-gray-800">
              <Link to="/blog" className="text-sm text-gray-500 hover:text-amber-500 transition">
                {isRtl ? "← بازگشت به بلاگ" : "← Back to Blog"}
              </Link>
            </div>
          </div>

          {/* سایدبار */}
          <div className="lg:w-72 flex-shrink-0">
            <Sidebar 
              article={{ ...article, likes: articleLikes }} 
              views={views} 
              isRtl={isRtl}
              onLikeUpdate={handleLikeUpdate}
            />
          </div>
        </div>
      </div>

      <style>{`
        ${glassmorphismStyle}
        .swiper-button-next, .swiper-button-prev { display: none !important; }
        @media (min-width: 768px) {
          .swiper-button-next, .swiper-button-prev { display: flex !important; }
        }
      `}</style>
    </div>
  );
}