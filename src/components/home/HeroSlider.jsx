import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate, Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineSparkles, HiOutlineEye } from "react-icons/hi";

import HeroBackground from "../../animations/HeroBackground";
import WaveCircleText from "../../animations/WaveCircleText";
import { useTheme } from "../../store/theme";
import { fadeIn } from "../../animations/variants";
import { useSlides } from "../../hooks/useSlides";

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
        }, 2500);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length - 1));
        }, 40);
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
      <span className="inline-block w-[2px] h-8 bg-yellow-400 animate-pulse ml-1" />
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

  // ✅ استفاده از useSlides برای دریافت از دیتابیس
  const { slides: slidesFromDB, loading } = useSlides();
  const [slides, setSlides] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const frame = useRef();
  const swiperRef = useRef(null);
  const progressInterval = useRef(null);
  const autoplayDelay = 4000;

  // تنظیم اسلایدها از دیتابیس
  useEffect(() => {
    if (slidesFromDB && slidesFromDB.length > 0) {
      // تبدیل به فرمت مورد نیاز
      const formattedSlides = slidesFromDB.map((slide, index) => ({
        id: slide._id || `slide-${index}`,
        brand: slide.brand || 'Apple',
        title: isRTL ? slide.title?.fa : slide.title?.en,
        subtitle: isRTL ? slide.subtitle?.fa : slide.subtitle?.en,
        description: isRTL ? slide.description?.fa : slide.description?.en,
        image: slide.image || '/images/placeholder.png',
        articleSlug: slide.articleSlug || '',
        productId: slide.productId?._id || slide.productId || null,
        buttonText: {
          en: slide.buttonText?.en || 'Buy Now',
          fa: slide.buttonText?.fa || 'خرید'
        },
        order: slide.order || index,
        active: slide.active !== false
      }));
      
      // مرتب‌سازی بر اساس order
      const sorted = formattedSlides
        .filter(s => s.active)
        .sort((a, b) => a.order - b.order);
      
      setSlides(sorted);
    } else {
      // اسلایدهای پیش‌فرض اگر دیتابیس خالی بود
      setSlides([
        {
          id: 'default-1',
          brand: 'Apple',
          title: isRTL ? 'آیفون ۱۷ پرو مکس' : 'iPhone 17 Pro Max',
          subtitle: isRTL ? 'قدرتمندترین آیفون تاریخ' : 'The most powerful iPhone ever',
          image: '/assets/iphone/iphone-17-pro-max.png',
          buttonText: { en: 'Buy Now', fa: 'خرید' },
          articleSlug: 'iphone-17-pro-max-review'
        },
        {
          id: 'default-2',
          brand: 'Samsung',
          title: isRTL ? 'گلکسی اس۲۴ اولترا' : 'Galaxy S24 Ultra',
          subtitle: isRTL ? 'بهترین تجربه گلکسی' : 'The ultimate Galaxy experience',
          image: '/assets/galexy-series-s/galaxy-s24-ultra.png',
          buttonText: { en: 'Buy Now', fa: 'خرید' },
          articleSlug: 'galaxy-s24-ultra-review'
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
        <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
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

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 h-1 bg-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-r-full"
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
              {/* TEXT SIDE */}
              <motion.div
                variants={fadeIn(isRTL ? "left" : "right", 0.3)}
                initial="hidden"
                animate="show"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="hero-card relative z-30 w-full md:w-[52%] lg:w-[40%] p-8 md:p-12"
              >
                <div className="flex items-center gap-2 mb-3">
                  <HiOutlineSparkles className="text-yellow-400 text-xs" />
                  <p className="hero-brand text-[10px] md:text-xs">{slide.brand}</p>
                </div>

                <div className="min-h-[120px] md:min-h-[140px]">
                  <TypingText
                    texts={getTypingTexts(slide)}
                    className="hero-title text-3xl md:text-5xl lg:text-6xl font-black tracking-tight
                               bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 
                               bg-clip-text text-transparent
                               drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                  />
                </div>

                <p className="hero-subtitle mt-5 text-sm md:text-base lg:text-lg">
                  {slide.subtitle}
                </p>

                {slide.description && (
                  <p className="text-xs text-gray-400 mt-2 opacity-70">
                    {slide.description}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {/* دکمه خرید */}
                  <button
                    onClick={() => handleBuy(slide.productId)}
                    className="hero-btn px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 group flex items-center gap-2"
                  >
                    <span>{getButtonText(slide)}</span>
                    <HiOutlineShoppingBag className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* دکمه مشاهده مقاله */}
                  {slide.articleSlug && (
                    <button
                      onClick={() => handleViewArticle(slide.articleSlug)}
                      className="px-6 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 
                                 bg-transparent border-2 border-yellow-500/50 text-yellow-400 
                                 hover:bg-yellow-500 hover:text-black hover:border-yellow-500
                                 flex items-center gap-2"
                    >
                      <HiOutlineEye className="w-4 h-4" />
                      <span>{isRTL ? 'مشاهده مقاله' : 'View Article'}</span>
                    </button>
                  )}
                </div>
              </motion.div>

              {/* IMAGE SIDE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: isRTL ? 50 : -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`
                  relative w-full md:w-[60%] h-full flex items-center perspective-[2000px] z-10
                  ${isRTL ? "justify-start" : "justify-end"}
                `}
              >
                {/* Glow Effect */}
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

      {/* Navigation Buttons */}
      <button
        className="hero-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40
                   w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20
                   flex items-center justify-center text-white hover:text-yellow-400 hover:bg-black/60
                   hover:border-yellow-400/50 hover:scale-110 transition-all duration-300 opacity-0
                   group-hover:opacity-100 focus:opacity-100"
        aria-label={isRTL ? "بعدی" : "Previous"}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
        </svg>
      </button>
      
      <button
        className="hero-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40
                   w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20
                   flex items-center justify-center text-white hover:text-yellow-400 hover:bg-black/60
                   hover:border-yellow-400/50 hover:scale-110 transition-all duration-300 opacity-0
                   group-hover:opacity-100 focus:opacity-100"
        aria-label={isRTL ? "قبلی" : "Next"}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
        </svg>
      </button>

      {/* Pagination */}
      <div className="hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30" />

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-30 hidden lg:block">
        <div className="bg-black/40 backdrop-blur-md rounded-full px-4 py-2">
          <span className="text-white text-sm font-mono">
            {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <style>{`
        .hero-card {
          border-radius: 26px;
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all .35s ease;
        }
        html.dark .hero-card {
          background: rgba(20,20,20,0.35);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .hero-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 35px 80px rgba(0,0,0,0.55);
        }
        .hero-brand {
          letter-spacing: .35em;
          font-weight: 600;
          text-transform: uppercase;
          opacity: .7;
        }
        .hero-subtitle {
          line-height: 1.8;
          opacity: .82;
          max-width: 38ch;
        }
        .hero-btn {
          background: black;
          color: white;
          box-shadow: 0 10px 30px rgba(0,0,0,.35);
        }
        .hero-btn:hover {
          transform: translateY(-2px) scale(1.05);
        }
        html.dark .hero-btn {
          background: white;
          color: black;
        }
        .hero-pagination .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #888;
          opacity: .4;
          transition: all .3s ease;
          margin: 0 !important;
          cursor: pointer;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 10px;
          background: #000;
          opacity: 1;
        }
        html.dark .hero-pagination .swiper-pagination-bullet-active {
          background: #fff;
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
            font-size: 1.8rem;
          }
          .hero-subtitle {
            max-width: 100%;
            font-size: 0.85rem;
          }
          .hero-btn {
            padding: 8px 16px;
            font-size: 12px;
          }
        }
        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.5rem;
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
