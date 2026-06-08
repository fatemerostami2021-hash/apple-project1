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
   ۱. MAP تصاویر هیرو — یک ورودی برای هر ۱۳ slug
══════════════════════════════════════════════════════════ */
const HERO_MAP = {
  /* ── Apple ── */
  "iphone-18-pro-max": [
    "/assets/hero-articlepage/iphone-18-promax.png",
    "/assets/hero-articlepage/iphone18-promax-hero.png",
  ],
  "iphone-17-pro-max": [
    "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
    "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png",
  ],
  "iphone-16-pro-max": [
    "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png",
    "/assets/hero-articlepage/hero-endframe.png",
  ],
  "iphone-15-pro-max": [
    "/assets/hero-articlepage/iphone-15-pro.png",
    "/assets/hero-articlepage/iphone-15.png",
  ],
  "iphone-14-pro-max": [
    "/assets/hero-articlepage/iphone-14-pro-max.png",
  ],
  "iphone-13-pro-max": [
    "/assets/hero-articlepage/iphone-12-pro.png",
    "/assets/hero-articlepage/iphone-12.png",
  ],
  "iphone-12-pro-max": [
    "/assets/hero-articlepage/iphone-12-pro.png",
    "/assets/hero-articlepage/iphone-12.png",
  ],
  /* ── Samsung ── */
  "galaxy-s25-ultra": [
    "/assets/hero-articlepage/galaxy-s24.png",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
  "galaxy-s24-ultra-ai-revolution": [
    "/assets/hero-articlepage/galaxy-s24.png",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
  "galaxy-s24-ultra": [
    "/assets/hero-articlepage/galaxy-s24.png",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
  "galaxy-s23-ultra": [
    "/assets/hero-articlepage/GNB_Mobile_L1_08_88x88.webp",
    "/assets/hero-articlepage/galaxy-s24.png",
  ],
  "galaxy-z-fold-6": [
    "/assets/hero-articlepage/download.jpg",
    "/assets/hero-articlepage/galaxy-s24-plus.png",
  ],
  "galaxy-z-flip-6": [
    "/assets/hero-articlepage/download.jpg",
    "/assets/hero-articlepage/GNB_Mobile_L1_08_88x88.webp",
  ],
};

/* Pool عمومی برای پر کردن اسلایدهای باقیمانده */
const HERO_POOL = [
  "/assets/hero-articlepage/nav_iphone_16__qsxcpuia0oam_large.png",
  "/assets/hero-articlepage/nav_iphone_17__bx67weh1ur5y_large.png",
  "/assets/hero-articlepage/hero-endframe.png",
  "/assets/hero-articlepage/iphone_17pro__t1j902iw6kya_large.jpg",
  "/assets/hero-articlepage/galaxy-s24.png",
  "/assets/hero-articlepage/iphone-15-pro.png",
];

function getHeroImages(slug) {
  const specific = HERO_MAP[slug] || [];
  const pool = HERO_POOL.filter(i => !specific.includes(i));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [...specific, ...shuffled].slice(0, 5);
}

/* ══════════════════════════════════════════════════════════
   ۲. ویدیوهای پیش‌فرض و اختصاصی هر مقاله
══════════════════════════════════════════════════════════ */
const DEFAULT_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "بررسی تخصصی آیفون ۱۸ پرو مکس", duration: "15:24" },
  { id: "9bZkp7q19f0", title: "مقایسه گلکسی S24 با آیفون ۱۵ پرو", duration: "12:18" },
  { id: "kJQP7kiw5Fk", title: "تکنولوژی‌های جدید ۲۰۲۵", duration: "8:45" },
  { id: "OPf0YbXqDm0", title: "آینده گوشی‌های تاشو", duration: "10:32" },
];

const ARTICLE_VIDEOS = {
  "iphone-18-pro-max": [
    { id: "dQw4w9WgXcQ", title: "بررسی آیفون ۱۸ پرو مکس — کامل‌ترین تست", duration: "18:30" },
    { id: "9bZkp7q19f0", title: "دوربین آیفون ۱۸ در برابر S25 Ultra", duration: "14:20" },
    { id: "kJQP7kiw5Fk", title: "A20 Bionic — تراشه‌ای که همه را شگفت‌زده کرد", duration: "9:10" },
  ],
  "iphone-17-pro-max": [
    { id: "ScMzIvxBSi4", title: "بررسی آیفون ۱۷ پرو مکس", duration: "16:55" },
    { id: "qHkbFjBgVmk", title: "تست باتری ۲۴ ساعته آیفون ۱۷", duration: "11:40" },
    { id: "OPf0YbXqDm0", title: "Camera Control در آیفون ۱۷", duration: "8:22" },
  ],
  "iphone-16-pro-max": [
    { id: "ScMzIvxBSi4", title: "بررسی دوربین آیفون ۱۶ پرو مکس", duration: "18:42" },
    { id: "qHkbFjBgVmk", title: "تست باتری ۲۷ ساعته", duration: "12:15" },
    { id: "jNQXAC9IVRw", title: "Apple Intelligence — هوش مصنوعی اپل", duration: "9:33" },
  ],
  "iphone-15-pro-max": [
    { id: "9bZkp7q19f0", title: "بررسی آیفون ۱۵ پرو مکس", duration: "15:10" },
    { id: "kJQP7kiw5Fk", title: "ProRes Video در آیفون ۱۵", duration: "10:45" },
    { id: "dQw4w9WgXcQ", title: "تیتانیوم — متریال انقلابی اپل", duration: "7:30" },
  ],
  "iphone-14-pro-max": [
    { id: "OPf0YbXqDm0", title: "Dynamic Island — خداحافظی با notch", duration: "13:00" },
    { id: "ScMzIvxBSi4", title: "A16 Bionic بنچمارک", duration: "9:50" },
    { id: "9bZkp7q19f0", title: "دوربین ۴۸ مگاپیکسلی اول اپل", duration: "11:20" },
  ],
  "iphone-13-pro-max": [
    { id: "kJQP7kiw5Fk", title: "ProMotion 120Hz — تجربه واقعی", duration: "10:30" },
    { id: "jNQXAC9IVRw", title: "دوربین Macro آیفون ۱۳ پرو", duration: "8:15" },
    { id: "dQw4w9WgXcQ", title: "تست باتری آیفون ۱۳ پرو مکس", duration: "14:22" },
  ],
  "iphone-12-pro-max": [
    { id: "qHkbFjBgVmk", title: "LiDAR Scanner — کاربردهای واقعی", duration: "9:40" },
    { id: "OPf0YbXqDm0", title: "5G روی آیفون ۱۲ — آیا ارزش دارد؟", duration: "12:00" },
    { id: "ScMzIvxBSi4", title: "Ceramic Shield — چقدر محکم است؟", duration: "7:55" },
  ],
  "galaxy-s25-ultra": [
    { id: "9bZkp7q19f0", title: "گلکسی S25 Ultra بررسی کامل", duration: "17:30" },
    { id: "kJQP7kiw5Fk", title: "Galaxy AI در S25 — همه قابلیت‌ها", duration: "13:10" },
    { id: "dQw4w9WgXcQ", title: "دوربین ۲۰۰ مگاپیکسلی S25 Ultra", duration: "15:45" },
  ],
  "galaxy-s24-ultra-ai-revolution": [
    { id: "jNQXAC9IVRw", title: "Galaxy AI — هوش مصنوعی سامسونگ", duration: "14:00" },
    { id: "qHkbFjBgVmk", title: "S24 Ultra در برابر آیفون ۱۵ پرو مکس", duration: "18:30" },
    { id: "OPf0YbXqDm0", title: "Snapdragon 8 Gen 3 بنچمارک", duration: "10:20" },
  ],
  "galaxy-s24-ultra": [
    { id: "ScMzIvxBSi4", title: "S24 Ultra — بررسی تخصصی S Pen", duration: "12:40" },
    { id: "9bZkp7q19f0", title: "دوربین S24 Ultra در شب", duration: "11:00" },
    { id: "kJQP7kiw5Fk", title: "One UI 6.1 ویژگی‌های جدید", duration: "9:15" },
  ],
  "galaxy-s23-ultra": [
    { id: "dQw4w9WgXcQ", title: "S23 Ultra — پادشاه اندروید 2023", duration: "16:20" },
    { id: "jNQXAC9IVRw", title: "زوم ۱۰۰x در S23 Ultra", duration: "8:50" },
    { id: "OPf0YbXqDm0", title: "Snapdragon 8 Gen 2 تست واقعی", duration: "13:30" },
  ],
  "galaxy-z-fold-6": [
    { id: "qHkbFjBgVmk", title: "Z Fold 6 — آینده گوشی‌های تاشو", duration: "15:00" },
    { id: "ScMzIvxBSi4", title: "Flex Mode در Z Fold 6", duration: "10:10" },
    { id: "9bZkp7q19f0", title: "مقایسه Z Fold 6 با Pixel Fold", duration: "14:25" },
  ],
  "galaxy-z-flip-6": [
    { id: "kJQP7kiw5Fk", title: "Z Flip 6 — مد و تکنولوژی", duration: "11:15" },
    { id: "dQw4w9WgXcQ", title: "FlexWindow در Z Flip 6", duration: "7:40" },
    { id: "jNQXAC9IVRw", title: "دوربین Z Flip 6 بررسی کامل", duration: "9:55" },
  ],
};

function getVideos(slug) {
  return ARTICLE_VIDEOS[slug] || DEFAULT_VIDEOS;
}

/* ══════════════════════════════════════════════════════════
   ۳. SUB-COMPONENTS
══════════════════════════════════════════════════════════ */

/* ── Typing Highlight ── */
function HighlightTyping({ lang }) {
  const el = useRef(null);
  const texts = lang === "fa"
    ? ["تک‌کرانچ", "تحلیل عمیق", "تخصصی‌ترین مرجع"]
    : ["TechCrunch", "Deep Analysis", "Expert Reviews"];

  useEffect(() => {
    if (!el.current) return;
    const typed = new Typed(el.current, {
      strings: texts, typeSpeed: 70, backSpeed: 40,
      backDelay: 2500, loop: true, cursorChar: "|",
    });
    return () => typed.destroy();
  }, [lang]);

  return (
    <span ref={el}
      className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent font-black" />
  );
}

/* ── Reading Progress Bar (fixed top) ── */
function ReadingProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setP(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-75 ease-linear"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

/* ── Loading Skeleton ── */
function LoadingSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "var(--bg-primary, #0a0a0a)" }}>
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500/50
            border-b-transparent border-l-transparent animate-spin" />
        </div>
        <p className="mt-4 text-amber-500 text-sm font-medium">در حال بارگذاری...</p>
      </div>
    </div>
  );
}

/* ── Hero Slider ── */
function HeroSlider({ images, lang }) {
  const [loaded, setLoaded] = useState({});
  return (
    <div className="relative w-full h-full">
      <Swiper modules={[Autoplay, EffectFade, Pagination]}
        effect="fade" autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop speed={1000} className="w-full h-full">
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            {!loaded[idx] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img src={img} alt={`hero ${idx + 1}`} loading={idx === 0 ? "eager" : "lazy"}
              onLoad={() => setLoaded(p => ({ ...p, [idx]: true }))}
              className={`w-full h-full transition-opacity duration-700 ${loaded[idx] ? "opacity-100" : "opacity-0"}`}
              style={{ objectFit: "cover", objectPosition: "center 40%",
                filter: "brightness(0.85) contrast(1.05) saturate(1.1)" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Typing overlay */}
      <div className="absolute top-20 md:top-28 left-0 right-0 text-center z-20 px-4 pointer-events-none">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <div className="text-2xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-2xl">
            <HighlightTyping lang={lang} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Share Buttons ── */
function ShareButtons({ url, title, isRtl }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, [url]);
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs" style={{ color: "var(--text-muted, #6b7280)" }}>
        {isRtl ? "اشتراک‌گذاری:" : "Share:"}
      </span>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank" rel="noopener noreferrer"
        className="text-sm transition-colors hover:text-amber-500" style={{ color: "var(--text-muted, #6b7280)" }}>𝕏</a>
      <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank" rel="noopener noreferrer"
        className="text-sm transition-colors hover:text-amber-500" style={{ color: "var(--text-muted, #6b7280)" }}>TG</a>
      <button onClick={copy}
        className="text-sm transition-colors hover:text-amber-500" style={{ color: "var(--text-muted, #6b7280)" }}>
        {copied ? "✓" : "Copy"}
      </button>
    </div>
  );
}

/* ── Cinematic Gallery ── */
function CinematicGallery({ images, isRtl }) {
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);
  if (!images?.length) return null;

  const open = i => { setLbIdx(i); setLbOpen(true); };
  const close = () => setLbOpen(false);
  const prev = () => setLbIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setLbIdx(i => (i + 1) % images.length);

  useEffect(() => {
    const h = e => {
      if (!lbOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") (isRtl ? next : prev)();
      if (e.key === "ArrowRight") (isRtl ? prev : next)();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lbOpen, isRtl]);

  return (
    <section className="ap-gallery" aria-label={isRtl ? "گالری تصاویر" : "Image Gallery"}>
      <h3 className="ap-section-label">{isRtl ? "گالری تصاویر" : "Image Gallery"}</h3>
      <div className="ap-gallery-grid">
        {images.slice(0, 9).map((img, idx) => (
          <motion.button key={idx}
            className={`ap-gitem ${idx === 0 ? "ap-gitem--feature" : ""}`}
            onClick={() => open(idx)}
            initial={{ opacity: 0, scale: .95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.04 }}
            aria-label={img.alt || `تصویر ${idx + 1}`}>
            <img src={img.src || img} alt={img.alt || ""} loading="lazy" className="ap-gitem-img" />
            <div className="ap-gitem-overlay">
              <span className="ap-gcaption">{img.caption || ""}</span>
              <span className="ap-gzoom">⊕</span>
            </div>
          </motion.button>
        ))}
        {images.length > 9 && (
          <div className="ap-gallery-more">+{images.length - 9}</div>
        )}
      </div>

      {lbOpen && (
        <div className="ap-lightbox" role="dialog" aria-modal="true" onClick={close}>
          <div className="ap-lb-inner" onClick={e => e.stopPropagation()}>
            <button className="ap-lb-close" onClick={close} aria-label="بستن">✕</button>
            <button className="ap-lb-nav ap-lb-prev" onClick={prev} aria-label="قبلی">‹</button>
            <img src={images[lbIdx].src || images[lbIdx]} alt={images[lbIdx].alt || ""} className="ap-lb-img" />
            {images[lbIdx].caption && <p className="ap-lb-cap">{images[lbIdx].caption}</p>}
            <button className="ap-lb-nav ap-lb-next" onClick={next} aria-label="بعدی">›</button>
            <div className="ap-lb-dots">
              {images.slice(0, 9).map((_, i) => (
                <button key={i} onClick={() => setLbIdx(i)}
                  className={`ap-dot ${i === lbIdx ? "ap-dot--on" : ""}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Animated Wave Divider ── */
function WaveDivider() {
  const svgRef = useRef(null);
  const rafRef = useRef(null);
  const phase = useRef(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const p1 = svg.querySelector("#wv1");
    const p2 = svg.querySelector("#wv2");
    const tick = () => {
      phase.current += 0.016;
      const ph = phase.current;
      const W = 1200;
      const a = [], b = [];
      for (let x = 0; x <= W; x += 6) {
        a.push(`${x},${44 + Math.sin(x / 155 + ph) * 17 + Math.sin(x / 75 + ph * 1.5) * 8}`);
        b.push(`${x},${56 + Math.sin(x / 120 + ph * .9 + 1.2) * 13 + Math.sin(x / 55 + ph * 1.7) * 6}`);
      }
      if (p1) p1.setAttribute("d", `M0,80 L${a.join(" L")} L${W},80 Z`);
      if (p2) p2.setAttribute("d", `M0,80 L${b.join(" L")} L${W},80 Z`);
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="ap-wave" aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wg1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity=".12" />
            <stop offset="50%" stopColor="#eab308" stopOpacity=".28" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity=".12" />
          </linearGradient>
          <linearGradient id="wg2" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity=".06" />
            <stop offset="50%" stopColor="#eab308" stopOpacity=".18" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity=".06" />
          </linearGradient>
        </defs>
        <path id="wv2" fill="url(#wg2)" />
        <path id="wv1" fill="url(#wg1)" />
      </svg>
    </div>
  );
}

/* ── Video Section ── */
function VideoSection({ slug, extraVideos, isRtl }) {
  const videos = [...(ARTICLE_VIDEOS[slug] || DEFAULT_VIDEOS), ...(extraVideos || [])];
  const [active, setActive] = useState(videos[0]);

  useEffect(() => { setActive(videos[0]); }, [slug]);

  return (
    <section className="ap-videos" aria-label={isRtl ? "ویدیوها" : "Videos"}>
      <h3 className="ap-section-label">{isRtl ? "ویدیوهای مرتبط" : "Related Videos"}</h3>
      <div className="ap-video-layout">
        {/* Player */}
        <div className="ap-player">
          <div className="ap-player-frame">
            {active && (
              <iframe key={active.id}
                src={`https://www.youtube.com/embed/${active.id}?rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="w-full h-full border-0" />
            )}
          </div>
          {active && (
            <div className="ap-player-meta">
              <p className="ap-player-title">{active.title}</p>
              <p className="ap-player-dur">{active.duration}</p>
            </div>
          )}
        </div>

        {/* Playlist */}
        <div className="ap-playlist">
          {videos.map((v, i) => (
            <motion.button key={v.id} onClick={() => setActive(v)}
              initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`ap-playlist-item ${active?.id === v.id ? "ap-playlist-item--on" : ""}`}>
              <div className="ap-playlist-thumb">
                <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} loading="lazy" />
                <div className="ap-playlist-play">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="ap-playlist-info">
                <p className="ap-playlist-name">{v.title}</p>
                <p className="ap-playlist-time">{v.duration}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Sidebar (sticky TOC + stats) ── */
function Sidebar({ article, sections, activeId, views, isRtl, onLike }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article?.likes || 0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`liked_${article?.slug}`);
    if (stored === "true") setLiked(true);
    setLikeCount(article?.likes || 0);
  }, [article?.slug, article?.likes]);

  const toggleLike = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const endpoint = liked ? "unlike" : "like";
      const res = await fetch(`http://localhost:5000/api/articles/${article?.slug}/${endpoint}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setLikeCount(data.likes);
        setLiked(l => !l);
        localStorage.setItem(`liked_${article?.slug}`, (!liked).toString());
        onLike?.(data.likes);
      }
    } catch { /* offline graceful */ } finally { setBusy(false); }
  };

  return (
    <aside className="ap-sidebar" aria-label={isRtl ? "فهرست مطالب" : "Table of Contents"}>
      <div className="ap-sidebar-inner">
        {/* Author */}
        <div className="ap-author-card">
          <div className="ap-author-avatar">
            {(article?.author?.[0] || "T").toUpperCase()}
          </div>
          <div>
            <p className="ap-author-name">{article?.author || "Tech Team"}</p>
            <p className="ap-author-label">{isRtl ? "نویسنده" : "Author"}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="ap-stats">
          <div className="ap-stat">
            <HiOutlineEye className="ap-stat-icon" />
            <span className="ap-stat-num">{(views || 0).toLocaleString()}</span>
            <span className="ap-stat-label">{isRtl ? "بازدید" : "Views"}</span>
          </div>
          <button className="ap-stat ap-stat--btn" onClick={toggleLike} disabled={busy} aria-label="Like">
            {liked
              ? <HiHeart className="ap-stat-icon ap-stat-icon--liked" />
              : <HiOutlineHeart className="ap-stat-icon" />}
            <span className="ap-stat-num">{likeCount.toLocaleString()}</span>
            <span className="ap-stat-label">{isRtl ? "لایک" : "Likes"}</span>
          </button>
        </div>

        {/* TOC */}
        <p className="ap-toc-head">{isRtl ? "فهرست مطالب" : "Contents"}</p>
        <nav>
          <ul className="ap-toc">
            {sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={`ap-toc-link ${activeId === s.id ? "ap-toc-link--on" : ""}`}
                  onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); }}>
                  <span className="ap-toc-dot" />
                  <span>{s.title?.[isRtl ? "fa" : "en"] || s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Read progress */}
        <p className="ap-toc-head" style={{ marginTop: "1rem" }}>{isRtl ? "پیشرفت مطالعه" : "Progress"}</p>
        <div className="ap-prog-track">
          <div className="ap-prog-bar" id="apProgBar" />
        </div>

        {/* Tags */}
        {article?.tags?.length > 0 && (
          <div className="ap-tags">
            {article.tags.slice(0, 6).map(t => (
              <span key={t} className="ap-tag">#{t}</span>
            ))}
          </div>
        )}

        {/* Date / readtime */}
        <div className="ap-meta-small">
          <span><HiOutlineCalendar className="inline me-1" size={11} />{article?.publishDate?.slice(0, 10)}</span>
          <span><HiOutlineClock className="inline me-1" size={11} />{article?.readTime} {isRtl ? "دقیقه" : "min"}</span>
        </div>
      </div>
    </aside>
  );
}

/* ══════════════════════════════════════════════════════════
   ۴. STYLES
══════════════════════════════════════════════════════════ */
const STYLES = `
/* ── base ── */
.ap-wrap { background: transparent; color: inherit; }
.ap-wrap *, .ap-wrap *::before, .ap-wrap *::after { box-sizing: border-box; }

/* ── hero ── */
.ap-hero { position: relative; width: 100%; height: 58vh; min-height: 340px; overflow: hidden; }
@media(min-width:768px){ .ap-hero { height: 62vh; } }
.ap-hero-back-btn { position: absolute; top: 1rem; z-index: 30; inset-inline-start: 1rem; }
.ap-hero-back-btn a {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .8rem; color: rgba(255,255,255,.75); text-decoration: none;
  transition: color .2s;
}
.ap-hero-back-btn a:hover { color: #f59e0b; }
.ap-hero-meta { position: absolute; bottom: 0; left: 0; right: 0; z-index: 20;
  padding: 1.5rem 1.5rem 1.8rem; background: linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 100%); }
.ap-hero-brand { display: inline-block; font-size: .7rem; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: #f59e0b; margin-bottom: .4rem; }
.ap-hero-title { font-size: clamp(1.2rem, 3.5vw, 2.4rem); font-weight: 800; color: #fff;
  line-height: 1.3; margin: 0 0 .5rem; text-shadow: 0 2px 12px rgba(0,0,0,.6); }
.ap-hero-info { display: flex; flex-wrap: wrap; gap: .8rem 1.4rem; font-size: .78rem;
  color: rgba(255,255,255,.55); }
.ap-hero-info svg { display: inline; vertical-align: middle; margin-inline-end: .25rem; }

/* ── layout ── */
.ap-body { max-width: 1180px; margin: 0 auto; padding: 2rem 1rem; }
.ap-cols { display: grid; grid-template-columns: 1fr 252px; gap: 2.4rem; align-items: start; }
@media(max-width:860px){ .ap-cols { grid-template-columns: 1fr; } .ap-sidebar { display: none !important; } }

/* ── article section ── */
.ap-article-section { margin-bottom: 2.6rem; scroll-margin-top: 96px; }
.ap-article-section h2 {
  font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 700; margin: 0 0 .9rem;
  position: relative; padding-inline-start: 1rem;
}
.ap-article-section h2::before {
  content: ""; position: absolute; inset-inline-start: 0; top: .12em;
  width: 4px; height: 1em; background: #f59e0b; border-radius: 2px;
}
.ap-article-section p { line-height: 1.9; font-size: 1rem; opacity: .87; }

/* ── tags ── */
.ap-tags-row { display: flex; flex-wrap: wrap; gap: .45rem; margin-bottom: 1.8rem; }
.ap-tag-chip {
  padding: .22rem .75rem; border-radius: 2rem;
  border: 1px solid #f59e0b; color: #f59e0b;
  font-size: .74rem; font-weight: 600; cursor: default; transition: background .2s, color .2s;
}
.ap-tag-chip:hover { background: #f59e0b; color: #000; }

/* ── share row ── */
.ap-share-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: .75rem; margin-bottom: 1.8rem; padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,.07); }

/* ── gallery ── */
.ap-gallery { margin-bottom: 3rem; }
.ap-section-label { font-size: 1.1rem; font-weight: 700; margin: 0 0 1rem;
  color: #f59e0b; letter-spacing: -.01em; }
.ap-gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 140px;
  gap: .6rem;
}
@media(max-width:560px){ .ap-gallery-grid { grid-template-columns: 1fr 1fr; } }
.ap-gitem { position: relative; border: none; padding: 0; cursor: pointer;
  border-radius: .65rem; overflow: hidden; background: transparent; }
.ap-gitem--feature { grid-column: span 2; grid-row: span 2; }
.ap-gitem-img { width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .45s cubic-bezier(.25,.46,.45,.94); }
.ap-gitem:hover .ap-gitem-img { transform: scale(1.07); }
.ap-gitem-overlay { position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.72) 0%, transparent 55%);
  opacity: 0; transition: opacity .28s; display: flex; align-items: flex-end;
  justify-content: space-between; padding: .65rem .8rem; }
.ap-gitem:hover .ap-gitem-overlay { opacity: 1; }
.ap-gcaption { color: #fff; font-size: .76rem; font-weight: 600; }
.ap-gzoom { color: #f59e0b; font-size: 1.3rem; line-height: 1; }
.ap-gallery-more { display: flex; align-items: center; justify-content: center;
  border-radius: .65rem; border: 1px dashed rgba(245,158,11,.3);
  color: #f59e0b; font-weight: 700; font-size: .9rem; }

/* ── lightbox ── */
.ap-lightbox { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,.94);
  display: flex; align-items: center; justify-content: center; animation: apFade .2s; }
@keyframes apFade { from { opacity: 0; } to { opacity: 1; } }
.ap-lb-inner { position: relative; display: flex; flex-direction: column;
  align-items: center; gap: .8rem; max-width: 92vw; }
.ap-lb-img { max-width: 90vw; max-height: 78vh; object-fit: contain; border-radius: .65rem; }
.ap-lb-cap { color: rgba(255,255,255,.65); font-size: .85rem; }
.ap-lb-close { position: absolute; top: -2.4rem; inset-inline-end: 0;
  background: rgba(255,255,255,.1); border: none; color: #fff; width: 34px; height: 34px;
  border-radius: 50%; cursor: pointer; font-size: 1rem; transition: background .2s; }
.ap-lb-close:hover { background: rgba(255,255,255,.25); }
.ap-lb-nav { position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); color: #fff;
  width: 42px; height: 42px; border-radius: 50%; cursor: pointer; font-size: 1.5rem;
  line-height: 1; transition: background .2s; }
.ap-lb-prev { inset-inline-end: calc(100% + .6rem); }
.ap-lb-next { inset-inline-start: calc(100% + .6rem); }
.ap-lb-nav:hover { background: rgba(245,158,11,.28); }
.ap-lb-dots { display: flex; gap: .35rem; flex-wrap: wrap; justify-content: center; }
.ap-dot { width: 7px; height: 7px; border-radius: 50%; border: none; padding: 0;
  background: rgba(255,255,255,.28); cursor: pointer; transition: background .2s; }
.ap-dot--on { background: #f59e0b; }

/* ── wave divider ── */
.ap-wave { width: 100%; height: 72px; margin: .5rem 0 2.5rem; overflow: hidden; }
.ap-wave svg { width: 100%; height: 100%; }

/* ── video ── */
.ap-videos { margin-bottom: 3rem; }
.ap-video-layout { display: grid; grid-template-columns: 1fr 280px; gap: 1.2rem; }
@media(max-width:700px){ .ap-video-layout { grid-template-columns: 1fr; } }
.ap-player-frame { aspect-ratio: 16/9; border-radius: .85rem; overflow: hidden;
  background: #000; box-shadow: 0 8px 32px rgba(0,0,0,.4); }
.ap-player-frame iframe { width: 100%; height: 100%; }
.ap-player-meta { margin-top: .75rem; }
.ap-player-title { font-size: .95rem; font-weight: 600; line-height: 1.4; }
.ap-player-dur { font-size: .78rem; opacity: .5; margin-top: .2rem; }
.ap-playlist { display: flex; flex-direction: column; gap: .5rem;
  max-height: 420px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #f59e0b transparent; }
.ap-playlist::-webkit-scrollbar { width: 3px; }
.ap-playlist::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 2px; }
.ap-playlist-item { display: flex; gap: .7rem; padding: .5rem .6rem; border-radius: .6rem;
  border: 1px solid transparent; cursor: pointer; text-align: start; background: transparent;
  transition: background .2s, border-color .2s; }
.ap-playlist-item:hover { background: rgba(245,158,11,.07); }
.ap-playlist-item--on { background: rgba(245,158,11,.12); border-color: rgba(245,158,11,.35); }
.ap-playlist-thumb { position: relative; flex-shrink: 0; width: 96px; }
.ap-playlist-thumb img { width: 100%; aspect-ratio: 16/9; object-fit: cover;
  border-radius: .45rem; display: block; }
.ap-playlist-play { position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; background: rgba(0,0,0,.45); border-radius: .45rem;
  opacity: 0; transition: opacity .2s; }
.ap-playlist-item:hover .ap-playlist-play { opacity: 1; }
.ap-playlist-info { flex: 1; min-width: 0; }
.ap-playlist-name { font-size: .82rem; font-weight: 500; line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  transition: color .2s; }
.ap-playlist-item--on .ap-playlist-name, .ap-playlist-item:hover .ap-playlist-name { color: #f59e0b; }
.ap-playlist-time { font-size: .72rem; opacity: .45; margin-top: .2rem; }

/* ── sidebar ── */
.ap-sidebar { position: sticky; top: 88px; max-height: calc(100vh - 108px);
  overflow-y: auto; scrollbar-width: thin; scrollbar-color: #f59e0b transparent; }
.ap-sidebar::-webkit-scrollbar { width: 3px; }
.ap-sidebar::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 2px; }
.ap-sidebar-inner { padding: 1.1rem; border-radius: 1rem;
  border: 1px solid rgba(245,158,11,.18);
  background: rgba(245,158,11,.03); backdrop-filter: blur(10px); }
.ap-author-card { display: flex; align-items: center; gap: .7rem; margin-bottom: 1rem;
  padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,.06); }
.ap-author-avatar { width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #f59e0b, #eab308); display: flex; align-items: center;
  justify-content: center; color: #000; font-weight: 800; font-size: .95rem; }
.ap-author-name { font-size: .85rem; font-weight: 600; }
.ap-author-label { font-size: .7rem; opacity: .45; margin-top: .1rem; }
.ap-stats { display: flex; justify-content: space-around; margin-bottom: 1rem;
  padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,.06); }
.ap-stat { display: flex; flex-direction: column; align-items: center; gap: .2rem;
  background: transparent; border: none; cursor: default; transition: transform .2s; }
.ap-stat--btn { cursor: pointer; }
.ap-stat--btn:hover { transform: scale(1.1); }
.ap-stat-icon { width: 18px; height: 18px; color: #f59e0b; }
.ap-stat-icon--liked { fill: #f59e0b; }
.ap-stat-num { font-size: .82rem; font-weight: 700; }
.ap-stat-label { font-size: .64rem; opacity: .45; }
.ap-toc-head { font-size: .68rem; letter-spacing: .1em; text-transform: uppercase;
  color: #f59e0b; font-weight: 700; margin: 0 0 .6rem; }
.ap-toc { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .05rem; }
.ap-toc-link { display: flex; align-items: center; gap: .5rem; padding: .38rem .5rem;
  border-radius: .45rem; text-decoration: none; color: inherit; font-size: .82rem;
  opacity: .6; transition: opacity .18s, background .18s; }
.ap-toc-link:hover { opacity: 1; background: rgba(245,158,11,.08); }
.ap-toc-link--on { opacity: 1; color: #f59e0b; font-weight: 600; }
.ap-toc-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0;
  transition: transform .18s; }
.ap-toc-link--on .ap-toc-dot { transform: scale(1.7); }
.ap-prog-track { height: 4px; border-radius: 2px; overflow: hidden; margin-bottom: 1rem;
  background: rgba(245,158,11,.12); }
.ap-prog-bar { height: 100%; background: #f59e0b; border-radius: 2px; width: 0%; transition: width .12s; }
.ap-tags { display: flex; flex-wrap: wrap; gap: .35rem; margin-top: .5rem; }
.ap-tag { font-size: .68rem; color: rgba(245,158,11,.8); border: 1px solid rgba(245,158,11,.25);
  padding: .15rem .55rem; border-radius: 2rem; transition: border-color .2s, color .2s; cursor: default; }
.ap-tag:hover { color: #f59e0b; border-color: rgba(245,158,11,.6); }
.ap-meta-small { margin-top: .75rem; display: flex; flex-direction: column; gap: .3rem;
  font-size: .68rem; opacity: .4; }

/* ── swiper overrides ── */
.swiper-pagination-bullet { background: rgba(255,255,255,.45) !important; opacity: .8; }
.swiper-pagination-bullet-active {
  background: #f59e0b !important; width: 22px !important; border-radius: 10px !important;
}
`;

/* ══════════════════════════════════════════════════════════
   ۵. MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function ArticlePage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRtl = lang === "fa";

  const [article, setArticle]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [views, setViews]       = useState(0);
  const [activeId, setActiveId] = useState("");

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 180], [1, 0]);

  /* ── fetch ── */
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/articles/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => {
        setArticle(data);
        const sv = localStorage.getItem(`views_${slug}`);
        const nv = sv ? parseInt(sv) + 1 : 1;
        setViews(nv);
        localStorage.setItem(`views_${slug}`, nv);
        fetch(`http://localhost:5000/api/articles/${slug}/view`, { method: "POST" }).catch(() => {});
      })
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  /* ── scroll tracking ── */
  useEffect(() => {
    if (!article) return;
    const sections = article.content?.[lang]
      ? [] // ArticleContent handles its own sections
      : (article.sections || []);

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0;
      const bar = document.getElementById("apProgBar");
      if (bar) bar.style.width = pct + "%";

      // find active section
      const allSecs = document.querySelectorAll("[data-section-id]");
      let found = "";
      allSecs.forEach(el => {
        if (el.getBoundingClientRect().top <= 130) found = el.dataset.sectionId;
      });
      if (found) setActiveId(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [article, lang]);

  /* ── render ── */
  if (loading) return <LoadingSkeleton />;

  if (!article) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary, #0f0f0f)" }}>
      <div className="text-center">
        <p className="text-xl font-bold mb-3 text-white">{isRtl ? "مقاله یافت نشد" : "Article not found"}</p>
        <Link to="/blog" className="text-amber-500 hover:text-amber-400 transition text-sm">
          {isRtl ? "← بازگشت به بلاگ" : "← Back to Blog"}
        </Link>
      </div>
    </div>
  );

  const heroImages = getHeroImages(slug);
  // Build sections list for sidebar TOC from article data
  const tocSections = (article.sections || []).map(s => ({
    id: s.id,
    title: typeof s.title === "object" ? s.title : { fa: s.title, en: s.title },
  }));

  return (
    <div className="ap-wrap min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      <style>{STYLES}</style>
      <ReadingProgressBar />

      {/* ══ HERO ══ */}
      <div className="ap-hero">
        <HeroSlider images={heroImages} lang={lang} />

        {/* Back link */}
        <motion.div style={{ opacity: heroOpacity }} className="ap-hero-back-btn">
          <Link to="/blog">
            {isRtl ? <HiOutlineArrowRight size={13} /> : <HiOutlineArrowLeft size={13} />}
            <span style={{ marginInlineStart: ".3rem" }}>{isRtl ? "بازگشت" : "Back"}</span>
          </Link>
        </motion.div>

        {/* Article meta overlay */}
        <div className="ap-hero-meta">
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <span className="ap-hero-brand">{article.brand}</span>
            <h1 className="ap-hero-title" itemProp="headline">
              {article.title?.[lang] || article.title}
            </h1>
            <div className="ap-hero-info">
              <span><HiOutlineCalendar size={12} />{article.publishDate?.slice(0, 10)}</span>
              <span><HiOutlineClock size={12} />{article.readTime} {isRtl ? "دقیقه" : "min"}</span>
              <span><HiOutlineEye size={12} />{views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div className="ap-body">
        <div className="ap-cols">

          {/* ── Main Content ── */}
          <main itemScope itemType="https://schema.org/TechArticle">
            {/* Tags + Share */}
            <div className="ap-share-row">
              <div className="ap-tags-row">
                {article.tags?.slice(0, 5).map(t => (
                  <span key={t} className="ap-tag-chip" itemProp="keywords">{t}</span>
                ))}
              </div>
              <ShareButtons
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={article.title?.[lang] || article.title}
                isRtl={isRtl}
              />
            </div>

            {/* Article body */}
            <div itemProp="articleBody">
              <ArticleContent content={article.content?.[lang]} isRtl={isRtl} />
            </div>

            {/* Gallery */}
            {article.gallery?.length > 0 && (
              <CinematicGallery images={article.gallery} isRtl={isRtl} />
            )}

            {/* Wave */}
            <WaveDivider />

            {/* Videos */}
            <VideoSection
              slug={slug}
              extraVideos={article.relatedVideos}
              isRtl={isRtl}
            />

            {/* Back to blog */}
            <div style={{ marginTop: "2.5rem", paddingTop: "1.2rem", borderTop: "1px solid rgba(255,255,255,.07)" }}>
              <Link to="/blog" style={{ fontSize: ".85rem", color: "#f59e0b", textDecoration: "none" }}>
                {isRtl ? "← بازگشت به بلاگ" : "← Back to Blog"}
              </Link>
            </div>
          </main>

          {/* ── Sidebar ── */}
          <Sidebar
            article={article}
            sections={tocSections}
            activeId={activeId}
            views={views}
            isRtl={isRtl}
            onLike={newLikes => setArticle(a => ({ ...a, likes: newLikes }))}
          />
        </div>
      </div>
    </div>
  );
}