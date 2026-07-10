import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineEye,
  HiOutlineArrowRight,
  HiPlay,
  HiPause,
} from "react-icons/hi";

import HeroBackground from "../../animations/HeroBackground";
import WaveCircleText from "../../animations/WaveCircleText";
import { useTheme } from "../../store/theme";
import { fadeIn } from "../../animations/variants";
import { useSlides } from "../../hooks/useSlides";
import { useCart } from "../../hooks/useCart.jsx";

// ============================================================
// 🎥 مسیر ویدیو - فقط یک بار در سطح ماژول محاسبه می‌شود
// (قبلاً new URL() داخل هر رندر کامپوننت اجرا می‌شد؛ چون همه
// اسلایدها یک ویدیوی یکسان دارند، یک‌بار محاسبه کافی است)
// ============================================================
const VIDEO_PATH = new URL(
  "/assets/video/iphon-18-google-flow.mp4",
  import.meta.url
).href;

// ============================================================
// 🎥 کامپوننت ویدیوی داخل کارت
//
// تغییرات کلیدی نسبت به نسخه قبلی:
// 1) دیگر IntersectionObserver مستقل نداریم. پخش/توقف ویدیو
//    مستقیماً از روی اسلاید فعال سوایپر (isActive) کنترل می‌شود.
//    قبلاً پخش خودکار وابسته به state داخلی «isPlaying» بود که
//    مقدار اولیه‌اش false بود، پس حتی وقتی اسلاید در viewport
//    قرار می‌گرفت هم پخش شروع نمی‌شد (باگ اصلی موبایل).
// 2) استراتژی «پنجره‌ی بارگذاری»: فقط ویدیوی اسلاید فعال +
//    یک اسلاید قبل/بعد واقعاً src می‌گیرد و لود می‌شود. بقیه‌ی
//    اسلایدها فقط یک placeholder سبک نشان می‌دهند. این باعث
//    می‌شود در بار اول به‌جای لود همزمان N ویدیو، فقط ۲ یا ۳
//    ویدیو بارگذاری شوند => سرعت لود صفحه به‌شدت بهتر می‌شود.
// 3) object-cover به object-contain تغییر کرد تا کل فریم ویدیو
//    (نه فقط بخش برش‌خورده‌ی وسط) در موبایل دیده شود.
// ============================================================
const FloatingVideo = ({ darkMode, isRTL, isActive, shouldLoad }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // پخش/توقف بر اساس فعال بودن اسلاید (نه IntersectionObserver)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isActive) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // اگر مرورگر پخش خودکار را رد کرد (نادر، چون muted است)
          // فقط نشانگر Play را نگه می‌داریم، کاربر می‌تواند بزند
        });
      }
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* noop */
      }
    }
  }, [isActive, shouldLoad]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => setError(err.message));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // ── اسلایدهایی که هنوز در «پنجره‌ی بارگذاری» نیستند: فقط پلیس‌هولدر سبک ──
  if (!shouldLoad) {
    return (
      <div className="w-full h-full rounded-xl md:rounded-2xl bg-gradient-to-br from-neutral-800/60 to-neutral-900/60 flex items-center justify-center">
        <HiPlay className="w-8 h-8 text-white/30" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full rounded-xl md:rounded-2xl bg-gradient-to-br from-red-500/20 to-amber-500/20 border border-red-500/30 flex items-center justify-center">
        <div className="text-center p-2">
          <svg
            className="w-8 h-8 md:w-12 md:h-12 text-red-400 mx-auto mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-[8px] md:text-[10px] text-white/70">
            Video Error
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative group/video bg-black">
      {/* ویدیو - object-contain به‌جای object-cover تا کل ویدیو دیده شود */}
      <video
        ref={videoRef}
        src={VIDEO_PATH}
        className="w-full h-full object-contain"
        loop
        muted={isMuted}
        playsInline
        preload={isActive ? "auto" : "metadata"}
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setError("Failed to load video")}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 md:gap-3">
        <button
          onClick={togglePlay}
          className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:text-amber-400 hover:border-amber-400/50 transition-all duration-300 hover:scale-110 z-10"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <HiPause className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <HiPlay className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:text-amber-400 hover:border-amber-400/50 transition-all duration-300 hover:scale-110 z-10"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
        <span className="text-[6px] md:text-[9px] font-bold uppercase px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white/70 tracking-wider">
          {isRTL ? "تبلیغ" : "Ad"}
        </span>
      </div>

      {!isPlaying && isActive && isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-amber-500/80 backdrop-blur-sm flex items-center justify-center animate-pulse">
            <HiPlay className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
          </div>
        </div>
      )}

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-8 h-8 md:w-12 md:h-12 border-3 border-white/20 border-t-amber-400 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

// ============================================================
// 📝 اسلایدهای پیش‌فرض - همیشه آماده، مستقل از دیتابیس
// ============================================================
const getDefaultSlides = (isRTL) => [
  {
    id: "default-1",
    brand: "Apple",
    title: isRTL ? "آیفون ۱۷ پرو مکس" : "iPhone 17 Pro Max",
    subtitle: isRTL ? "قدرتمندترین آیفون تاریخ" : "The most powerful iPhone ever",
    description: isRTL
      ? "تراشه A18 پرو · طراحی تیتانیوم · دوربین ۴۸ مگاپیکسل"
      : "A18 Pro chip · Titanium design · 48MP camera",
    image: "/assets/iphone/iphone-17-pro-max.png",
    price: 1299,
    buttonText: { en: "Buy Now", fa: "خرید" },
    articleSlug: "iphone-17-pro-max",
  },
  {
    id: "default-2",
    brand: "Samsung",
    title: isRTL ? "گلکسی اس۲۶ اولترا" : "Galaxy S26 Ultra",
    subtitle: isRTL ? "بهترین تجربه اندروید" : "The ultimate Android experience",
    description: isRTL
      ? "دوربین ۲۰۰ مگاپیکسل · هوش مصنوعی · قلم S Pen"
      : "200MP camera · AI features · S Pen included",
    image: "/assets/galexy-series-s/galaxy-s26-ultra.png",
    price: 1199,
    buttonText: { en: "Buy Now", fa: "خرید" },
    articleSlug: "galaxy-s26-ultra",
  },
];

// ============================================================
// 📝 کامپوننت TypingText
// ============================================================
const TypingText = ({ texts, className }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState(() => texts[0] || "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    let timeout;

    if (!isDeleting) {
      if (currentText.length < currentFullText.length) {
        const speed = isInitial ? 0 : 80;
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
          setIsInitial(false);
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 3000);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, isInitial]);

  return (
    <span className={className}>
      {currentText}
      <span className="inline-block w-[3px] h-6 md:h-10 bg-amber-400 animate-pulse ml-1 align-middle" />
    </span>
  );
};

// ============================================================
// 🏠 کامپوننت اصلی HeroSlider
// ============================================================
const HeroSlider = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const darkMode = theme === "dark";
  const currentLang = i18n.resolvedLanguage || i18n.language || "fa";
  const isRTL = currentLang.startsWith("fa");

  const { slides: slidesFromDB, loading } = useSlides();

  const [slides, setSlides] = useState(() => getDefaultSlides(isRTL));
  const [usingDefaults, setUsingDefaults] = useState(true);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);

  const frame = useRef();
  const swiperRef = useRef(null);
  const progressInterval = useRef(null);
  const autoplayDelay = 5000;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (!slidesFromDB || slidesFromDB.length === 0) return;

    const formatted = slidesFromDB.map((slide, index) => {
      let articleSlug = slide.articleSlug || "";

      if (!articleSlug) {
        const productSlug = slide.productId?.slug || slide.productId || "";
        articleSlug = slide.articleSlug || slide.article || productSlug || "";
      }

      if (!articleSlug) {
        const title = slide.title?.en || slide.title || "";
        articleSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }

      return {
        id: slide._id || `slide-${index}`,
        brand: slide.brand || "Apple",
        title: isRTL ? slide.title?.fa : slide.title?.en,
        subtitle: isRTL ? slide.subtitle?.fa : slide.subtitle?.en,
        description: isRTL ? slide.description?.fa : slide.description?.en,
        image: slide.image || "/images/placeholder.png",
        articleSlug: articleSlug,
        productId: slide.productId?._id || slide.productId || null,
        price: slide.price || 0,
        buttonText: {
          en: slide.buttonText?.en || "Buy Now",
          fa: slide.buttonText?.fa || "خرید",
        },
        order: slide.order || index,
        active: slide.active !== false,
      };
    });

    const sorted = formatted
      .filter((s) => s.active)
      .sort((a, b) => a.order - b.order);

    const seenImages = new Set();
    const uniqueSlides = sorted.filter((slide) => {
      const imageKey = slide.image;
      if (seenImages.has(imageKey)) return false;
      seenImages.add(imageKey);
      return true;
    });

    if (uniqueSlides.length > 0) {
      setSlides(uniqueSlides);
      setUsingDefaults(false);
    }
  }, [slidesFromDB, isRTL]);

  useEffect(() => {
    if (usingDefaults) {
      setSlides(getDefaultSlides(isRTL));
    }
  }, [isRTL, usingDefaults]);

  const startProgress = useCallback(() => {
    setProgress(0);
    if (progressInterval.current) clearInterval(progressInterval.current);

    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / autoplayDelay) * 100;
      if (newProgress >= 100) {
        clearInterval(progressInterval.current);
        setProgress(100);
      } else {
        setProgress(newProgress);
      }
    }, 16);
  }, []);

  const stopProgress = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
  }, []);

  const handleMove = useCallback(
    (e) => {
      if (isMobile) return;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMouse({ x, y });
      });
    },
    [isMobile]
  );

  const getButtonText = (slide) => {
    if (!slide?.buttonText) return isRTL ? "خرید" : "Buy Now";
    return isRTL ? slide.buttonText.fa : slide.buttonText.en;
  };

  const handleAddToCart = (slide) => {
    addToCart({
      id: slide.productId || slide.id,
      name: slide.title,
      price: slide.price || 0,
      image: slide.image,
      thumbnail: slide.image,
      qty: 1,
      brand: slide.brand,
    });
    navigate("/cart");
  };

  const handleViewArticle = (articleSlug) => {
    if (articleSlug) {
      navigate(`/articles/${articleSlug}`);
    }
  };

  const getTypingTexts = (slide) => {
    const title = slide.title;
    return [title, title, title, title, title];
  };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.changeDirection(isRTL ? "rtl" : "ltr");
      swiper.update();
    }
  }, [isRTL]);

  useEffect(() => {
    if (!isHovering) {
      startProgress();
    } else {
      stopProgress();
    }
    return () => stopProgress();
  }, [activeIndex, isHovering, startProgress, stopProgress]);

  // ── پنجره‌ی بارگذاری ویدیو: اسلاید فعال + همسایه‌های بلافصل ──
  // این مقدار تعیین می‌کند کدام اسلایدها واقعاً src ویدیو می‌گیرند.
  const shouldLoadVideo = useCallback(
    (idx) => {
      const n = slides.length;
      if (n === 0) return false;
      const prev = (activeIndex - 1 + n) % n;
      const next = (activeIndex + 1) % n;
      return idx === activeIndex || idx === prev || idx === next;
    },
    [activeIndex, slides.length]
  );

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full min-h-[420px] md:h-[680px] overflow-hidden group"
    >
      <HeroBackground darkMode={darkMode} />
      <WaveCircleText darkMode={darkMode} />

      <div className="absolute top-0 left-0 right-0 z-50 h-1 bg-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-r-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.016 }}
        />
      </div>

      <Swiper
        ref={swiperRef}
        key={`swiper-${currentLang}`}
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        speed={isMobile ? 600 : 1200}
        dir={isRTL ? "rtl" : "ltr"}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
          dynamicBullets: false,
        }}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          startProgress();
        }}
        onAutoplayStop={stopProgress}
        onAutoplayStart={startProgress}
        className="w-full h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={`${slide.id}-${currentLang}`}>
            <div
              className={`
                relative flex flex-col md:flex-row 
                items-center justify-center 
                h-full w-full 
                px-2 md:px-6 lg:px-20 
                gap-1 md:gap-6 
                py-2 md:py-0
                overflow-hidden
                ${isRTL ? "md:flex-row-reverse text-right" : "md:flex-row text-left"}
              `}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: isRTL ? 50 : -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`
                  relative w-full md:w-[55%] 
                  h-[50%] md:h-full 
                  flex items-center justify-center
                  perspective-[2000px] z-10
                  order-1 md:order-2
                  ${isRTL ? "md:justify-start" : "md:justify-end"}
                `}
              >
                <div
                  className="absolute w-[50%] h-[50%] blur-[90px] opacity-30 pointer-events-none"
                  style={{
                    background: `radial-gradient(
                      circle at ${50 + mouse.x}% ${50 + mouse.y}%,
                      ${darkMode ? "rgba(255,255,255,.9)" : "#3b82f6"},
                      ${darkMode ? "rgba(212,175,55,0.3)" : "transparent"} 70%
                    )`,
                  }}
                />

                <motion.img
                  key={`${slide.id}-${currentLang}`}
                  initial={{ scale: 0.85, opacity: 0, x: isRTL ? 100 : -100 }}
                  animate={{ scale: 1.03, opacity: 1, x: 0 }}
                  exit={{ scale: 0.85, opacity: 0, x: isRTL ? -100 : 100 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={
                    isMobile
                      ? {}
                      : { scale: 1.05, rotateY: mouse.x * 0.3, rotateX: -mouse.y * 0.3 }
                  }
                  src={slide.image}
                  alt={slide.title}
                  draggable={false}
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchpriority={idx === 0 ? "high" : "auto"}
                  decoding="async"
                  className="hero-product-image relative w-[92%] md:w-[88%] lg:w-[92%] max-h-[88%] md:max-h-[92%] object-contain select-none will-change-transform drop-shadow-[0_60px_120px_rgba(0,0,0,0.35)]"
                  style={{
                    transform: isMobile
                      ? `translateZ(0)`
                      : `translateZ(0) translate3d(${mouse.x * 0.8}px, ${mouse.y * 0.8}px, 0)`,
                  }}
                  onError={(e) => {
                    e.target.src = "/images/placeholder.png";
                  }}
                />
              </motion.div>

              <motion.div
                variants={fadeIn(isRTL ? "left" : "right", 0.3)}
                initial="hidden"
                animate="show"
                whileHover={isMobile ? {} : { y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="hero-card relative z-30 w-[95%] md:w-[48%] lg:w-[38%] p-2 md:p-5 lg:p-7 order-2 md:order-1"
              >
                {/* 🎥 ویدیو - فقط ۳ اسلاید نزدیک واقعاً بارگذاری می‌شوند */}
                <div className="w-full aspect-video rounded-lg md:rounded-xl overflow-hidden mb-2 md:mb-3 shadow-lg border border-white/10">
                  <FloatingVideo
                    darkMode={darkMode}
                    isRTL={isRTL}
                    isActive={idx === activeIndex}
                    shouldLoad={shouldLoadVideo(idx)}
                  />
                </div>

                <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                  <HiOutlineSparkles className="text-amber-400 text-[8px] md:text-sm flex-shrink-0" />
                  <p className="hero-brand text-[7px] md:text-[11px] font-extrabold tracking-[0.2em] md:tracking-[0.25em] uppercase truncate">
                    {slide.brand}
                  </p>
                </div>

                <div className="min-h-[28px] md:min-h-[80px] lg:min-h-[100px]">
                  <TypingText
                    texts={getTypingTexts(slide)}
                    className="hero-title text-base md:text-2xl lg:text-4xl font-black tracking-tight
                               bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 
                               bg-clip-text text-transparent
                               drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                  />
                </div>

                <p className="hero-subtitle mt-0.5 md:mt-2 text-[9px] md:text-base lg:text-lg font-bold opacity-90 line-clamp-1">
                  {slide.subtitle}
                </p>

                {slide.description && (
                  <p className="text-[7px] md:text-sm text-gray-400 mt-0.5 md:mt-1 opacity-70 font-medium line-clamp-1 md:line-clamp-2">
                    {slide.description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-1 md:gap-2 mt-2 md:mt-4">
                  <button
                    onClick={() => handleAddToCart(slide)}
                    className="hero-btn w-full sm:w-auto px-3 md:px-6 py-1.5 md:py-3 rounded-full text-[8px] md:text-sm font-black tracking-wide transition-all duration-300 group flex items-center justify-center gap-1 md:gap-2"
                  >
                    <span>{getButtonText(slide)}</span>
                    <HiOutlineShoppingBag className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </button>

                  {slide.articleSlug && (
                    <button
                      onClick={() => handleViewArticle(slide.articleSlug)}
                      className="w-full sm:w-auto px-3 md:px-5 py-1.5 md:py-3 rounded-full text-[8px] md:text-sm font-black tracking-wide transition-all duration-300 
                                 bg-transparent border-2 border-amber-500/50 text-amber-400 
                                 hover:bg-amber-500 hover:text-black hover:border-amber-500
                                 flex items-center justify-center gap-1 md:gap-2 group"
                    >
                      <HiOutlineEye className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition flex-shrink-0" />
                      <span className="whitespace-nowrap">
                        {isRTL ? "مشاهده مقاله" : "View Article"}
                      </span>
                      <HiOutlineArrowRight className="w-2 h-2 md:w-3 md:h-3 group-hover:translate-x-1 transition hidden sm:block flex-shrink-0" />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="hero-prev absolute left-1 md:left-6 top-1/2 -translate-y-1/2 z-40
                   w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20
                   flex items-center justify-center text-white hover:text-amber-400 hover:bg-black/60
                   hover:border-amber-400/50 hover:scale-110 transition-all duration-300 opacity-0
                   group-hover:opacity-100 focus:opacity-100"
        aria-label={isRTL ? "بعدی" : "Previous"}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
          />
        </svg>
      </button>

      <button
        className="hero-next absolute right-1 md:right-6 top-1/2 -translate-y-1/2 z-40
                   w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20
                   flex items-center justify-center text-white hover:text-amber-400 hover:bg-black/60
                   hover:border-amber-400/50 hover:scale-110 transition-all duration-300 opacity-0
                   group-hover:opacity-100 focus:opacity-100"
        aria-label={isRTL ? "قبلی" : "Next"}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </button>

      <div className="hero-pagination absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-30" />

      <div className="absolute bottom-3 md:bottom-6 right-2 md:right-6 z-30 hidden lg:block">
        <div className="bg-black/40 backdrop-blur-md rounded-full px-2 md:px-4 py-0.5 md:py-2">
          <span className="text-white text-[10px] md:text-sm font-mono font-bold">
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <style>{`
        .hero-card {
          border-radius: 16px;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: all .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        html.dark .hero-card {
          background: rgba(20,20,20,0.5);
          border: 1px solid rgba(255,255,255,0.06);
        }
        @media (min-width: 768px) {
          .hero-card {
            border-radius: 24px;
          }
          .hero-card:hover {
            transform: translateY(-8px) scale(1.01);
            box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          }
        }
        .hero-brand {
          letter-spacing: .4em;
          font-weight: 900;
          text-transform: uppercase;
          opacity: .8;
          color: #fbbf24;
        }
        .hero-subtitle {
          line-height: 1.4;
          opacity: .9;
          max-width: 100%;
        }
        .hero-btn {
          background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(0,0,0,.4);
          font-weight: 900;
        }
        .hero-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 15px 40px rgba(0,0,0,.5);
        }
        html.dark .hero-btn {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: black;
        }
        .hero-pagination .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #888;
          opacity: .5;
          transition: all .3s ease;
          margin: 0 !important;
          cursor: pointer;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 12px;
          background: #fbbf24;
          opacity: 1;
        }
        html.dark .hero-pagination .swiper-pagination-bullet-active {
          background: #fbbf24;
        }
        .swiper {
          overflow: visible !important;
        }
        .swiper-slide {
          height: auto !important;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-pulse {
          animation: blink 1s step-end infinite;
        }

        @media (max-width: 768px) {
          .hero-card {
            width: 100%;
            padding: 8px 10px !important;
            border-radius: 12px;
            transform: none !important;
            box-shadow: 0 8px 20px rgba(0,0,0,0.3) !important;
          }
          .hero-card:hover {
            transform: none !important;
          }
          .hero-title {
            font-size: 1rem !important;
            line-height: 1.2 !important;
          }
          .hero-subtitle {
            max-width: 100%;
            font-size: 0.65rem !important;
            line-height: 1.3 !important;
          }
          .hero-btn {
            padding: 4px 8px !important;
            font-size: 8px !important;
          }
          .hero-brand {
            letter-spacing: 0.15em;
            font-size: 7px !important;
          }
          .hero-product-image {
            width: 95% !important;
            max-height: 90% !important;
          }
        }
        @media (max-width: 480px) {
          .hero-title {
            font-size: 0.85rem !important;
          }
          .hero-card {
            padding: 6px 8px !important;
          }
          .hero-btn {
            padding: 3px 6px !important;
            font-size: 7px !important;
          }
          .hero-product-image {
            width: 96% !important;
            max-height: 92% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;