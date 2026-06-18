import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate, Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineSparkles, HiOutlineEye, HiOutlineArrowRight } from "react-icons/hi";

import HeroBackground from "../../animations/HeroBackground";
import WaveCircleText from "../../animations/WaveCircleText";
import { useTheme } from "../../store/theme";
import { fadeIn } from "../../animations/variants";
import { useSlides } from "../../hooks/useSlides";
import { articleMap } from "../product/articleMap";

// کامپوننت TypingText
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
      <span className="inline-block w-[3px] h-10 bg-amber-400 animate-pulse ml-1" />
    </span>
  );
};

const HeroSlider = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const darkMode = theme === "dark";
  const currentLang = i18n.resolvedLanguage || i18n.language || "fa";
  const isRTL = currentLang.startsWith("fa");

  const { slides: slidesFromDB, loading } = useSlides();
  const [slides, setSlides] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const frame = useRef();
  const swiperRef = useRef(null);
  const progressInterval = useRef(null);
  const autoplayDelay = 5000;

  // تنظیم اسلایدها از دیتابیس با لینک‌های صحیح
  useEffect(() => {
    if (slidesFromDB && slidesFromDB.length > 0) {
      const formattedSlides = slidesFromDB.map((slide, index) => {
        // دریافت اسلاگ صحیح مقاله از articleMap
        let articleSlug = slide.articleSlug || '';
        
        // اگر مقاله‌ای تنظیم نشده، از نقشه استفاده کن
        if (!articleSlug) {
          const productSlug = slide.productId?.slug || slide.productId || '';
          articleSlug = articleMap[productSlug] || '';
        }
        
        // اگر هنوز مقاله‌ای نیست، از عنوان اسلاید استفاده کن
        if (!articleSlug) {
          const title = slide.title?.en || slide.title || '';
          // تبدیل عنوان به اسلاگ
          articleSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        }

        return {
          id: slide._id || `slide-${index}`,
          brand: slide.brand || 'Apple',
          title: isRTL ? slide.title?.fa : slide.title?.en,
          subtitle: isRTL ? slide.subtitle?.fa : slide.subtitle?.en,
          description: isRTL ? slide.description?.fa : slide.description?.en,
          image: slide.image || '/images/placeholder.png',
          articleSlug: articleSlug,
          productId: slide.productId?._id || slide.productId || null,
          buttonText: {
            en: slide.buttonText?.en || 'Buy Now',
            fa: slide.buttonText?.fa || 'خرید'
          },
          order: slide.order || index,
          active: slide.active !== false
        };
      });
      
      const sorted = formattedSlides
        .filter(s => s.active)
        .sort((a, b) => a.order - b.order);
      
      setSlides(sorted);
    } else {
      // اسلایدهای پیش‌فرض
      setSlides([
        {
          id: 'default-1',
          brand: 'Apple',
          title: isRTL ? 'آیفون ۱۷ پرو مکس' : 'iPhone 17 Pro Max',
          subtitle: isRTL ? 'قدرتمندترین آیفون تاریخ' : 'The most powerful iPhone ever',
          image: '/assets/iphone/iphone-17-pro-max.png',
          buttonText: { en: 'Buy Now', fa: 'خرید' },
          articleSlug: 'iphone-17-pro-max'
        },
        {
          id: 'default-2',
          brand: 'Samsung',
          title: isRTL ? 'گلکسی اس۲۴ اولترا' : 'Galaxy S24 Ultra',
          subtitle: isRTL ? 'بهترین تجربه گلکسی' : 'The ultimate Galaxy experience',
          image: '/assets/galexy-series-s/galaxy-s24-ultra.png',
          buttonText: { en: 'Buy Now', fa: 'خرید' },
          articleSlug: 'galaxy-s24-ultra-ai-revolution'
        }
      ]);
    }
  }, [slidesFromDB, isRTL]);

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

  const handleMove = useCallback((e) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouse({ x, y });
    });
  }, []);

  const getButtonText = (slide) => {
    if (!slide?.buttonText) return isRTL ? "خرید" : "Buy Now";
    return isRTL ? slide.buttonText.fa : slide.buttonText.en;
  };

  const handleViewArticle = (articleSlug) => {
    if (articleSlug) {
      navigate(`/articles/${articleSlug}`);
    }
  };

  const handleBuy = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    } else {
      navigate('/products');
    }
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

  if (loading || slides.length === 0) {
    return (
      <div className="w-full h-[580px] md:h-[760px] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl font-black text-gray-600 dark:text-gray-400">
          ⏳ {isRTL ? "در حال بارگذاری..." : "Loading..."}
        </div>
      </div>
    );
  }

  const getTypingTexts = (slide) => {
    const title = slide.title;
    return [title, title, title, title, title];
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full h-[580px] md:h-[760px] overflow-hidden group"
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
        speed={1200}
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
                relative flex items-center justify-between h-full w-full px-6 lg:px-28 gap-10 overflow-hidden
                ${isRTL ? "flex-row-reverse text-right" : "flex-row text-left"}
              `}
            >
              <motion.div
                variants={fadeIn(isRTL ? "left" : "right", 0.3)}
                initial="hidden"
                animate="show"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="hero-card relative z-30 w-full md:w-[52%] lg:w-[40%] p-8 md:p-12"
              >
                <div className="flex items-center gap-3 mb-4">
                  <HiOutlineSparkles className="text-amber-400 text-sm" />
                  <p className="hero-brand text-[11px] font-extrabold tracking-[0.25em] uppercase">
                    {slide.brand}
                  </p>
                </div>

                <div className="min-h-[140px] md:min-h-[160px]">
                  <TypingText
                    texts={getTypingTexts(slide)}
                    className="hero-title text-4xl md:text-6xl lg:text-7xl font-black tracking-tight
                               bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 
                               bg-clip-text text-transparent
                               drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                  />
                </div>

                <p className="hero-subtitle mt-4 text-base md:text-lg lg:text-xl font-bold opacity-90">
                  {slide.subtitle}
                </p>

                {slide.description && (
                  <p className="text-sm text-gray-400 mt-2 opacity-70 font-medium">
                    {slide.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    onClick={() => handleBuy(slide.productId)}
                    className="hero-btn px-8 py-4 rounded-full text-sm font-black tracking-wide transition-all duration-300 group flex items-center gap-2"
                  >
                    <span>{getButtonText(slide)}</span>
                    <HiOutlineShoppingBag className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {slide.articleSlug && (
                    <button
                      onClick={() => handleViewArticle(slide.articleSlug)}
                      className="px-7 py-4 rounded-full text-sm font-black tracking-wide transition-all duration-300 
                                 bg-transparent border-2 border-amber-500/50 text-amber-400 
                                 hover:bg-amber-500 hover:text-black hover:border-amber-500
                                 flex items-center gap-2 group"
                    >
                      <HiOutlineEye className="w-5 h-5 group-hover:scale-110 transition" />
                      <span>{isRTL ? 'مشاهده مقاله' : 'View Article'}</span>
                      <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </button>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: isRTL ? 50 : -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`
                  relative w-full md:w-[60%] h-full flex items-center perspective-[2000px] z-10
                  ${isRTL ? "justify-start" : "justify-end"}
                `}
              >
                <div
                  className="absolute w-[45%] h-[45%] blur-[90px] opacity-30 pointer-events-none"
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
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: mouse.x * 0.3, 
                    rotateX: -mouse.y * 0.3 
                  }}
                  src={slide.image}
                  alt={slide.title}
                  draggable={false}
                  className="hero-product-image relative w-[88%] md:w-[92%] lg:w-[95%] max-h-[92%] object-contain select-none will-change-transform drop-shadow-[0_60px_120px_rgba(0,0,0,0.35)]"
                  style={{
                    transform: `translateZ(0) translate3d(${mouse.x * 0.8}px, ${mouse.y * 0.8}px, 0)`,
                  }}
                  onError={(e) => {
                    e.target.src = '/images/placeholder.png';
                  }}
                />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="hero-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40
                   w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20
                   flex items-center justify-center text-white hover:text-amber-400 hover:bg-black/60
                   hover:border-amber-400/50 hover:scale-110 transition-all duration-300 opacity-0
                   group-hover:opacity-100 focus:opacity-100"
        aria-label={isRTL ? "بعدی" : "Previous"}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
        </svg>
      </button>
      
      <button
        className="hero-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40
                   w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20
                   flex items-center justify-center text-white hover:text-amber-400 hover:bg-black/60
                   hover:border-amber-400/50 hover:scale-110 transition-all duration-300 opacity-0
                   group-hover:opacity-100 focus:opacity-100"
        aria-label={isRTL ? "قبلی" : "Next"}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
        </svg>
      </button>

      <div className="hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30" />

      <div className="absolute bottom-8 right-8 z-30 hidden lg:block">
        <div className="bg-black/40 backdrop-blur-md rounded-full px-5 py-2.5">
          <span className="text-white text-sm font-mono font-bold">
            {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <style>{`
        .hero-card {
          border-radius: 28px;
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        html.dark .hero-card {
          background: rgba(20,20,20,0.4);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .hero-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }
        .hero-brand {
          letter-spacing: .4em;
          font-weight: 900;
          text-transform: uppercase;
          opacity: .8;
          color: #fbbf24;
        }
        .hero-subtitle {
          line-height: 1.8;
          opacity: .9;
          max-width: 40ch;
        }
        .hero-btn {
          background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
          color: white;
          box-shadow: 0 12px 35px rgba(0,0,0,.4);
          font-weight: 900;
        }
        .hero-btn:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 20px 50px rgba(0,0,0,.5);
        }
        html.dark .hero-btn {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: black;
        }
        .hero-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #888;
          opacity: .5;
          transition: all .3s ease;
          margin: 0 !important;
          cursor: pointer;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          width: 32px;
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
            padding: 24px;
          }
          .hero-title {
            font-size: 2rem !important;
          }
          .hero-subtitle {
            max-width: 100%;
            font-size: 0.9rem !important;
          }
          .hero-btn {
            padding: 10px 20px;
            font-size: 12px;
          }
        }
        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.5rem !important;
          }
          .hero-card {
            padding: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
