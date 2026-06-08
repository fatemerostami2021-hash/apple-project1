import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Typed from "typed.js";
import {
  HiOutlineClock, HiOutlineCalendar, HiOutlineArrowLeft,
  HiOutlineArrowRight, HiOutlineHeart, HiHeart,
  HiOutlineShare, HiOutlineEye,
} from "react-icons/hi";
import ArticleContent from "../../components/article/ArticleContent";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

/* ══════════════════════════════════════════════════════════
   ۱. تصاویر هیرو برای ۱۳ مقاله
══════════════════════════════════════════════════════════ */
const HERO_MAP = {
  "iphone-18-pro-max": ["/assets/hero-articlepage/iphone-18-promax.png", "/assets/hero-articlepage/iphone18-promax-hero.png"],
  "iphone-17-pro-max": ["/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg", "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png"],
  "iphone-16-pro-max": ["/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png"],
  "iphone-15-pro-max": ["/assets/hero-articlepage/iphone-15-pro.png"],
  "iphone-14-pro-max": ["/assets/hero-articlepage/iphone-14-pro-max.png"],
  "iphone-13-pro-max": ["/assets/hero-articlepage/iphone-12-pro.png"],
  "iphone-12-pro-max": ["/assets/hero-articlepage/iphone-12.png"],
  "galaxy-s24-ultra-ai-revolution": ["/assets/hero-articlepage/galaxy-s24.png", "/assets/hero-articlepage/galaxy-s24-plus.png"],
  "galaxy-s25-ultra": ["/assets/hero-articlepage/galaxy-s24.png"],
  "galaxy-z-fold-6": ["/assets/hero-articlepage/download.jpg"],
  "galaxy-z-flip-6": ["/assets/hero-articlepage/download.jpg"],
  "iphone-14-to-17-evolution-comparison": ["/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg"],
  "tab-s10-ultra-vs-ipad-pro-m4": ["/assets/hero-articlepage/galaxy-s24-plus.png"],
};

function getHeroImages(slug) {
  const specific = HERO_MAP[slug] || [];
  return specific.length ? specific : ["/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg"];
}

/* ══════════════════════════════════════════════════════════
   ۲. گالری تصاویر برای هر مقاله
══════════════════════════════════════════════════════════ */
const GALLERY_IMAGES = {
  "iphone-18-pro-max": [
    "/assets/hero-articlepage/iphone-18-promax.png",
    "/assets/hero-articlepage/iphone18-promax-hero.png",
  ],
  "iphone-17-pro-max": [
    "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
    "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png",
    "/assets/hero-articlepage/iphone-15-pro.png",
    "/assets/hero-articlepage/iphone-14-pro-max.png",
  ],
  "iphone-16-pro-max": [
    "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png",
    "/assets/hero-articlepage/hero-endframe.png",
    "/assets/hero-articlepage/iphone-12-pro.png",
  ],
  "iphone-15-pro-max": [
    "/assets/hero-articlepage/iphone-15-pro.png",
    "/assets/hero-articlepage/iphone-15.png",
  ],
  "iphone-14-pro-max": [
    "/assets/hero-articlepage/iphone-14-pro-max.png",
  ],
  "galaxy-s24-ultra-ai-revolution": [
    "/assets/hero-articlepage/galaxy-s24.png",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
};

function getGalleryImages(slug) {
  return GALLERY_IMAGES[slug] || [];
}

/* ══════════════════════════════════════════════════════════
   ۳. ویدیوهای اختصاصی
══════════════════════════════════════════════════════════ */
const VIDEO_MAIN = {
  "iphone-17-pro-max": { id: "tQdPRHdrCUI", title: "iPhone 17 Pro Max Full Review", duration: "14:30" },
  "iphone-16-pro-max": { id: "hDZrB9V-UTk", title: "iPhone 16 Pro Max Camera Test", duration: "11:20" },
  "galaxy-s24-ultra-ai-revolution": { id: "DX0HzqxrjEQ", title: "iPhone 17 vs Samsung S25 Ultra", duration: "15:10" },
};

const VIDEO_RELATED = {
  "iphone-17-pro-max": [
    { id: "DX0HzqxrjEQ", title: "iPhone 17 vs Samsung S25 Ultra", duration: "15:10" },
    { id: "hDZrB9V-UTk", title: "iPhone 16 Pro Max Camera Test", duration: "11:20" },
    { id: "-rdqBWYwFTo", title: "iOS 19 and Apple Intelligence", duration: "18:15" },
  ],
  "iphone-16-pro-max": [
    { id: "tQdPRHdrCUI", title: "iPhone 17 Pro Max Full Review", duration: "14:30" },
    { id: "DX0HzqxrjEQ", title: "iPhone 17 vs Samsung S25 Ultra", duration: "15:10" },
    { id: "-rdqBWYwFTo", title: "iOS 19 and Apple Intelligence", duration: "18:15" },
  ],
  "galaxy-s24-ultra-ai-revolution": [
    { id: "tQdPRHdrCUI", title: "iPhone 17 Pro Max Full Review", duration: "14:30" },
    { id: "hDZrB9V-UTk", title: "iPhone 16 Pro Max Camera Test", duration: "11:20" },
    { id: "-rdqBWYwFTo", title: "iOS 19 and Apple Intelligence", duration: "18:15" },
  ],
};

function getMainVideo(slug) {
  return VIDEO_MAIN[slug] || { id: "tQdPRHdrCUI", title: "iPhone 17 Pro Max Full Review", duration: "14:30" };
}

function getRelatedVideos(slug) {
  return VIDEO_RELATED[slug] || VIDEO_RELATED["iphone-17-pro-max"];
}

/* ══════════════════════════════════════════════════════════
   ۴. کامپوننت‌ها
══════════════════════════════════════════════════════════ */

function HighlightTyping({ lang }) {
  const el = useRef(null);
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
      loop: true 
    });
    return () => typed.destroy();
  }, [lang]);
  return <span ref={el} className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent font-black" />;
}

function ReadingProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setP(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent"><div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-75" style={{ width: `${p}%` }} /></div>;
}

function LoadingSkeleton() {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"><div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>;
}

function HeroSlider({ images, lang }) {
  return (
    <div className="relative w-full h-full">
      <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" autoplay={{ delay: 5000 }} pagination={{ clickable: true }} loop speed={1000} className="w-full h-full">
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} alt={`hero ${idx + 1}`} className="w-full h-full object-cover" style={{ filter: "brightness(0.85) contrast(1.05)" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-24 md:top-32 left-0 right-0 text-center z-20">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl"
        >
          <HighlightTyping lang={lang} />
        </motion.div>
      </div>
    </div>
  );
}

function ShareButtons({ url, title, isRtl }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{isRtl ? "اشتراک‌گذاری:" : "Share:"}</span>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" className="text-sm text-gray-500 hover:text-amber-500">𝕏</a>
      <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" className="text-sm text-gray-500 hover:text-amber-500">TG</a>
      <button onClick={copy} className="text-sm text-gray-500 hover:text-amber-500">{copied ? "✓" : "Copy"}</button>
    </div>
  );
}

function CinematicGallery({ images, isRtl }) {
  const [lightbox, setLightbox] = useState(null);
  if (!images?.length) return null;
  return (
    <div className="my-10">
      <h3 className="text-xl font-bold mb-4 text-amber-500 flex items-center gap-2"><span className="w-1 h-6 bg-amber-500 rounded-full"></span>{isRtl ? "گالری تصاویر" : "Image Gallery"}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
            className="relative group cursor-pointer overflow-hidden rounded-xl aspect-video" onClick={() => setLightbox(img)}>
            <img src={img} alt={`gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
              <span className="text-white text-sm">🔍</span>
            </div>
          </motion.div>
        ))}
      </div>
      {lightbox && <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}><img src={lightbox} alt="" className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl shadow-amber-500/20" /><button className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 hover:bg-amber-500 transition">✕</button></div>}
    </div>
  );
}

function VideoSection({ slug, isRtl }) {
  const mainVideo = getMainVideo(slug);
  const relatedVideos = getRelatedVideos(slug);
  const [active, setActive] = useState(mainVideo);
  return (
    <div className="my-10">
      <h3 className="text-xl font-bold mb-4 text-amber-500 flex items-center gap-2"><span className="w-1 h-6 bg-amber-500 rounded-full"></span>{isRtl ? "ویدیو بررسی" : "Video Review"}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-xl shadow-amber-500/10">
            <iframe src={`https://www.youtube.com/embed/${active.id}?rel=0`} title={active.title} allowFullScreen className="w-full h-full" />
          </div>
          <p className="font-semibold mt-2 text-white">{active.title}</p>
          <p className="text-sm text-gray-400">{active.duration}</p>
        </div>
        <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
          <p className="text-sm font-bold text-amber-400 mb-2">{isRtl ? "ویدیوهای مرتبط" : "Related Videos"}</p>
          {[mainVideo, ...relatedVideos].map(v => (
            <button key={v.id} onClick={() => setActive(v)} className={`w-full flex gap-3 p-2 rounded-lg transition-all ${active.id === v.id ? "bg-amber-500/20 border border-amber-500/30" : "hover:bg-gray-800/50"}`}>
              <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-24 h-14 rounded object-cover" />
              <div className="text-left"><p className="text-sm font-medium line-clamp-2">{v.title}</p><p className="text-xs text-gray-500">{v.duration}</p></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentsSection({ articleSlug, isRtl }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/api/comments/${articleSlug}`).then(res => res.json()).then(data => { setComments(data); setLoading(false); }).catch(() => setLoading(false));
  }, [articleSlug]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const res = await fetch("http://localhost:5000/api/comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ articleSlug, author: author.trim() || "کاربر", text: newComment.trim() }) });
    const data = await res.json();
    setComments([data, ...comments]);
    setNewComment("");
  };
  return (
    <div className="my-10 pt-6 border-t border-gray-800">
      <h3 className="text-xl font-bold mb-6 text-white">💬 {isRtl ? "نظرات" : "Comments"} ({comments.length})</h3>
      <form onSubmit={handleSubmit} className="mb-6 p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder={isRtl ? "نام شما" : "Your name"} className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-700 bg-gray-900/80 text-white focus:outline-none focus:border-amber-500" />
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={isRtl ? "نظر خود را بنویسید..." : "Write your comment..."} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900/80 text-white focus:outline-none focus:border-amber-500" />
        <button type="submit" className="mt-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-lg hover:from-amber-600 hover:to-amber-700 transition font-medium">{isRtl ? "ارسال" : "Send"}</button>
      </form>
      {loading ? <div className="text-center py-4 text-gray-500">Loading...</div> : comments.map(c => <div key={c._id} className="p-3 mb-2 rounded-lg bg-gray-900/50 backdrop-blur-sm"><p className="font-semibold text-white">{c.author} <span className="text-xs text-gray-500 ml-2">{new Date(c.createdAt).toLocaleDateString()}</span></p><p className="text-gray-300 text-sm">{c.text}</p></div>)}
    </div>
  );
}

function Sidebar({ article, activeId, views, isRtl, onLike }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article?.likes || 0);
  const toggleLike = async () => {
    const newCount = liked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newCount);
    setLiked(!liked);
    localStorage.setItem(`liked_${article?.slug}`, !liked);
    onLike?.(newCount);
    fetch(`http://localhost:5000/api/articles/${article?.slug}/${liked ? "unlike" : "like"}`, { method: "POST" }).catch(() => {});
  };
  const scrollToSection = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (!article?.content?.fa) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.content.fa, "text/html");
    setSections(Array.from(doc.querySelectorAll("h2, h3")).map((h, idx) => ({ id: `sec-${idx}`, title: h.innerText })));
  }, [article]);
  return (
    <aside className="lg:sticky lg:top-24 space-y-5 w-full lg:w-72">
      <div className="text-center p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-amber-500/20">
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white text-xl font-bold">{(article?.author?.[0] || "T").toUpperCase()}</div>
        <h4 className="mt-2 font-bold text-white">{article?.author || "Tech Team"}</h4>
      </div>
      <div className="flex justify-around p-3 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-amber-500/20">
        <div className="text-center"><HiOutlineEye className="w-5 h-5 mx-auto text-amber-500" /><p className="font-bold text-white mt-1">{views || 0}</p><p className="text-[10px] text-gray-400">{isRtl ? "بازدید" : "Views"}</p></div>
        <button onClick={toggleLike} className="text-center transition-transform hover:scale-110"><HiHeart className={`w-5 h-5 mx-auto ${liked ? "text-amber-500 fill-amber-500" : "text-amber-500"}`} /><p className="font-bold text-white mt-1">{likeCount}</p><p className="text-[10px] text-gray-400">{isRtl ? "لایک" : "Likes"}</p></button>
      </div>
      {sections.length > 0 && (
        <div className="p-3 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800">
          <p className="text-xs font-bold text-amber-500 mb-2 uppercase">{isRtl ? "فهرست مطالب" : "Contents"}</p>
          <nav className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {sections.map(s => (
              <button key={s.id} onClick={() => scrollToSection(s.id)} className={`w-full text-left px-2 py-1.5 text-sm rounded-lg transition-all ${activeId === s.id ? "text-amber-500 bg-amber-500/10 font-bold" : "text-gray-400 hover:text-white hover:bg-gray-800/50"}`}>
                {s.title}
              </button>
            ))}
          </nav>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">{article?.tags?.slice(0, 6).map(t => <span key={t} className="text-[9px] text-gray-400 border border-gray-600 px-2 py-0.5 rounded-full hover:border-amber-500 hover:text-amber-500 transition">#{t}</span>)}</div>
    </aside>
  );
}

/* ══════════════════════════════════════════════════════════
   ۵. AnimatedWave با لینک صفحه اصلی و گرادیانت طلایی
══════════════════════════════════════════════════════════ */
function AnimatedWave() {
  const waveRef = useRef(null);
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  
  useEffect(() => {
    const canvas = waveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    let time = 0;
    
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "#f59e0b");
      grad.addColorStop(0.3, "#fbbf24");
      grad.addColorStop(0.5, "#f59e0b");
      grad.addColorStop(0.7, "#fbbf24");
      grad.addColorStop(1, "#f59e0b");
      
      ctx.beginPath();
      for (let x = 0; x <= width; x += 15) {
        const y = height / 2 + Math.sin(x * 0.02 + time) * 6 + Math.sin(x * 0.05 + time * 1.3) * 3;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.35;
      ctx.fill();
      
      ctx.beginPath();
      for (let x = 0; x <= width; x += 15) {
        const y = height / 2 + 4 + Math.sin(x * 0.03 + time * 1.2) * 4 + Math.cos(x * 0.07 + time) * 2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.15;
      ctx.fill();
      ctx.globalAlpha = 1;
      
      time += 0.025;
      requestAnimationFrame(animate);
    };
    
    const anim = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", resize);
    };
  }, []);
  
  return (
    <div className="relative w-full mt-0">
      <canvas ref={waveRef} className="w-full h-16 block" style={{ marginTop: "-1px" }} />
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/">
            <div className="group relative px-6 py-2 md:px-8 md:py-2.5">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 backdrop-blur-sm group-hover:from-amber-500/20 group-hover:via-amber-500/30 group-hover:to-amber-500/20 transition-all duration-500" />
              <div className="absolute inset-0 rounded-full border border-amber-500/30 group-hover:border-amber-500/60 transition-all duration-300" />
              <div className="relative flex items-center gap-2 md:gap-3">
                <motion.span 
                  className="text-amber-400 text-sm md:text-base"
                  animate={{ x: isRtl ? [-3, 0, -3] : [3, 0, 3] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  
                </motion.span>
                <span className="text-xs md:text-sm font-medium tracking-wide text-amber-400/90 group-hover:text-amber-300 transition-colors duration-300">
                  {isRtl ? "بازگشت به صفحه اصلی" : "Back to Home"}
                </span>
                <motion.span 
                  className="text-amber-400 text-sm md:text-base"
                  animate={{ x: isRtl ? [-3, 0, -3] : [3, 0, 3] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  {isRtl ? "←" : "→"}
                </motion.span>
              </div>
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent animate-pulse" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ۶. استایل‌های حرفه‌ای
══════════════════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,700;14..32,800&display=swap');

.ap-wrap {
  background: radial-gradient(ellipse at 0% 0%, #0a0a0a 0%, #0f0f0f 50%, #050505 100%);
  color: #e2e8f0;
  font-family: 'Inter', 'IRANSans', Tahoma, sans-serif;
  position: relative;
}

.ap-wrap::before {
  content: '';
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 40%, rgba(245,158,11,0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(234,179,8,0.06) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
  animation: bgMove 20s ease-in-out infinite;
}

@keyframes bgMove {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(3%, 2%); }
}

.ap-article-content {
  background: rgba(15, 20, 30, 0.35);
  backdrop-filter: blur(12px);
  border-radius: 28px;
  padding: 2rem;
  border: 1px solid rgba(245, 158, 11, 0.25);
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
}

.ap-article-content h1 {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #f59e0b 50%, #ffedd5 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;
}

.ap-article-content h2 {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
  color: #f59e0b;
  border-left: 4px solid #f59e0b;
  padding-left: 1rem;
}

.ap-article-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
  color: #fbbf24;
}

.ap-article-content p {
  margin-bottom: 1.2rem;
  line-height: 1.85;
  color: #e2e8f0;
}

.ap-article-content strong {
  color: #f59e0b;
  font-weight: 800;
}

.ap-article-content ul, .ap-article-content ol {
  background: rgba(245,158,11,0.05);
  border-radius: 20px;
  padding: 1rem 1.8rem;
  margin: 1rem 0;
}

.ap-article-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(245,158,11,0.3);
}

.ap-article-content th {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #000;
  font-weight: 800;
  padding: 12px;
}

.ap-article-content td {
  border: 1px solid rgba(245,158,11,0.2);
  padding: 10px;
  color: #e2e8f0;
}

.ap-hero { position: relative; width: 100%; height: 65vh; min-height: 500px; overflow: hidden; }
.ap-hero-back-btn { position: absolute; top: 1.5rem; left: 1.5rem; z-index: 30; }
.ap-hero-back-btn a { color: rgba(255,255,255,.8); text-decoration: none; font-size: .85rem; backdrop-filter: blur(8px); background: rgba(0,0,0,0.3); padding: 0.5rem 1rem; border-radius: 2rem; transition: all 0.3s; }
.ap-hero-back-btn a:hover { background: #f59e0b; color: #000; }
.ap-hero-meta { position: absolute; bottom: 0; left: 0; right: 0; z-index: 20; padding: 2rem; background: linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 100%); }
.ap-hero-brand { font-size: .75rem; font-weight: 700; text-transform: uppercase; color: #f59e0b; letter-spacing: .1em; }
.ap-hero-title { font-size: clamp(1.5rem, 4vw, 2.8rem); font-weight: 900; color: #fff; line-height: 1.3; margin: .5rem 0; text-shadow: 0 2px 15px rgba(0,0,0,.5); }
.ap-hero-info { display: flex; gap: 1.2rem; font-size: .8rem; color: rgba(255,255,255,.6); }
.ap-body { max-width: 1000px; margin: 0 auto; padding: 2rem 1rem; }
.ap-cols { display: flex; flex-direction: column; gap: 2rem; }
@media(min-width: 900px) { .ap-cols { flex-direction: row; } .ap-main { flex: 1; } .ap-sidebar { width: 280px; flex-shrink: 0; } }
.ap-tags-row { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.5rem; }
.ap-tag-chip { font-size: .7rem; font-weight: 600; color: #f59e0b; border: 1px solid #f59e0b; padding: .2rem .8rem; border-radius: 2rem; transition: all 0.3s; }
.ap-tag-chip:hover { background: #f59e0b; color: #000; }
.ap-share-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,.1); }
.swiper-pagination-bullet { background: rgba(245,158,11,0.6) !important; }
.swiper-pagination-bullet-active { background: #f59e0b !important; width: 24px !important; border-radius: 12px !important; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; }
`;

/* ══════════════════════════════════════════════════════════
   ۷. کامپوننت اصلی
══════════════════════════════════════════════════════════ */
export default function ArticlePage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRtl = lang === "fa";
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);
  const [activeId, setActiveId] = useState("");
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 180], [1, 0]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/${slug}`).then(r => r.json()).then(data => {
      setArticle(data);
      const sv = localStorage.getItem(`views_${slug}`); const nv = sv ? parseInt(sv) + 1 : 1;
      setViews(nv); localStorage.setItem(`views_${slug}`, nv);
    }).finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); });
    }, { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" });
    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((h, idx) => { h.id = `sec-${idx}`; observer.observe(h); });
    return () => observer.disconnect();
  }, [article]);

  if (loading) return <LoadingSkeleton />;
  if (!article) return <div className="min-h-screen flex items-center justify-center"><p>مقاله یافت نشد</p><Link to="/blog" className="text-amber-500 ml-2">← بازگشت</Link></div>;

  const heroImages = getHeroImages(slug);
  const galleryImages = getGalleryImages(slug);

  return (
    <div className="ap-wrap" dir={isRtl ? "rtl" : "ltr"}>
      <style>{STYLES}</style>
      <ReadingProgressBar />
      <div className="ap-hero">
        <HeroSlider images={heroImages} lang={lang} />
        <motion.div style={{ opacity: heroOpacity }} className="ap-hero-back-btn">
          <Link to="/blog">{isRtl ? <HiOutlineArrowRight size={14} /> : <HiOutlineArrowLeft size={14} />} {isRtl ? "بازگشت" : "Back"}</Link>
        </motion.div>
        <div className="ap-hero-meta">
          <div className="ap-hero-brand">{article.brand}</div>
          <h1 className="ap-hero-title">{article.title?.[lang] || article.title}</h1>
          <div className="ap-hero-info">
            <span><HiOutlineCalendar size={12} className="inline mr-1" />{article.publishDate?.slice(0, 10)}</span>
            <span><HiOutlineClock size={12} className="inline mr-1" />{article.readTime} دقیقه</span>
            <span><HiOutlineEye size={12} className="inline mr-1" />{views}</span>
          </div>
        </div>
      </div>
      <div className="ap-body">
        <div className="ap-cols">
          <main className="ap-main">
            <div className="ap-share-row">
              <div className="ap-tags-row">{article.tags?.slice(0, 5).map(t => <span key={t} className="ap-tag-chip">#{t}</span>)}</div>
              <ShareButtons url={window.location.href} title={article.title?.[lang]} isRtl={isRtl} />
            </div>
            <div className="ap-article-content">
              <ArticleContent content={article.content?.[lang]} isRtl={isRtl} />
            </div>
            
            {galleryImages.length > 0 && <CinematicGallery images={galleryImages} isRtl={isRtl} />}
            
            <VideoSection slug={slug} isRtl={isRtl} />
            <CommentsSection articleSlug={slug} isRtl={isRtl} />
            
            <div className="mt-10 pt-4 text-center">
              <Link to="/blog" className="text-sm text-gray-500 hover:text-amber-500 transition inline-flex items-center gap-2">
                {isRtl ? (
                  <>
                    <HiOutlineArrowRight size={14} />
                    <span>بازگشت به بلاگ</span>
                  </>
                ) : (
                  <>
                    <HiOutlineArrowLeft size={14} />
                    <span>Back to Blog</span>
                  </>
                )}
              </Link>
            </div>
          </main>
          
          <Sidebar 
            article={article} 
            activeId={activeId} 
            views={views} 
            isRtl={isRtl} 
            onLike={(newLikes) => setArticle(prev => ({ ...prev, likes: newLikes }))} 
          />
        </div>
      </div>
      
      <AnimatedWave />
    </div>
  );
}