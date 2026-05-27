// HeroSlider.jsx - نسخه اصلاح شده با اضافه شدن useNavigate

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // اضافه کردن import

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineSparkles } from "react-icons/hi";

import { heroSlides } from "../../data/heroSlides";
import HeroBackground from "../../animations/HeroBackground";
import WaveCircleText from "../../animations/WaveCircleText";
import { useTheme } from "../../store/theme";
import { fadeIn } from "../../animations/variants";

const HeroSlider = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate(); // اضافه کردن useNavigate

  const darkMode = theme === "dark";
  const currentLang = i18n.resolvedLanguage || i18n.language || "fa";
  const isRTL = currentLang.startsWith("fa");

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [slides, setSlides] = useState(heroSlides);
  const [progress, setProgress] = useState(0);
  
  const frame = useRef();
  const swiperRef = useRef(null);
  const progressInterval = useRef(null);
  const autoplayDelay = 4000; // کاهش به 4 ثانیه برای سرعت بیشتر

  // Progress bar animation
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

  // بازسازی اسلایدها هنگام تغییر زبان با انیمیشن
  useEffect(() => {
    setSlides([...heroSlides]);
    
    // افکت حرکت عکس‌ها هنگام تغییر زبان
    const images = document.querySelectorAll('.hero-product-image');
    images.forEach(img => {
      img.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      img.style.transform = isRTL ? 'translateX(20px)' : 'translateX(-20px)';
      setTimeout(() => {
        img.style.transform = 'translateX(0)';
      }, 50);
    });
  }, [currentLang, isRTL]);

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

  // اصلاح تابع handleNavigation
  const handleNavigation = (id) => {
    if (!id) return;
    console.log("Navigating to product:", id); // برای دیباگ
    navigate(`/product/${id}`);
  };

  // تغییر جهت Swiper هنگام تغییر زبان
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.changeDirection(isRTL ? "rtl" : "ltr");
      swiper.update();
    }
  }, [isRTL]);

  // مدیریت progress bar با autoplay
  useEffect(() => {
    if (!isHovering) {
      startProgress();
    } else {
      stopProgress();
    }
    return () => stopProgress();
  }, [activeIndex, isHovering, startProgress, stopProgress]);

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="
        relative
        w-full
        h-[580px]
        md:h-[760px]
        overflow-hidden
        group
      "
    >
      <HeroBackground darkMode={darkMode} />
      <WaveCircleText darkMode={darkMode} />

      {/* Progress Bar - در بالای صفحه */}
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
                relative
                flex
                items-center
                justify-between
                h-full
                w-full
                px-6
                lg:px-28
                gap-10
                overflow-hidden
                ${isRTL ? "flex-row-reverse text-right" : "flex-row text-left"}
              `}
            >
              {/* TEXT SIDE */}
              <motion.div
                variants={fadeIn(isRTL ? "left" : "right", 0.3)}
                initial="hidden"
                animate="show"
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                }}
                className="
                  hero-card
                  relative
                  z-30
                  w-full
                  md:w-[52%]
                  lg:w-[40%]
                  p-8
                  md:p-12
                "
              >
                {/* Brand Badge with Icon */}
                <div className="flex items-center gap-2 mb-3">
                  <HiOutlineSparkles className="text-yellow-400 text-xs" />
                  <p className="hero-brand text-[10px] md:text-xs">
                    {slide.brand}
                  </p>
                </div>

                <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <p className="hero-subtitle mt-5 text-sm md:text-base lg:text-lg">
                  {slide.subtitle}
                </p>

                <button
                  onClick={() => handleNavigation(slide.id)}
                  className="
                    hero-btn
                    mt-8
                    px-8
                    py-3.5
                    rounded-full
                    text-sm
                    font-bold
                    tracking-wide
                    transition-all
                    duration-300
                    group
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span>{getButtonText(slide)}</span>
                  <HiOutlineShoppingBag className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* IMAGE SIDE */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  x: isRTL ? 50 : -50,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  relative
                  w-full
                  md:w-[60%]
                  h-full
                  flex
                  items-center
                  perspective-[2000px]
                  z-10
                  ${isRTL ? "justify-start" : "justify-end"}
                `}
              >
                {/* Enhanced GLOW with gradient */}
                <div
                  className="
                    absolute
                    w-[45%]
                    h-[45%]
                    blur-[90px]
                    opacity-30
                    pointer-events-none
                  "
                  style={{
                    background: `radial-gradient(
                      circle at ${50 + mouse.x}% ${50 + mouse.y}%,
                      ${darkMode ? "rgba(255,255,255,.9)" : "#3b82f6"},
                      ${darkMode ? "rgba(212,175,55,0.3)" : "transparent"} 70%
                    )`,
                  }}
                />

                {/* PRODUCT IMAGE با انیمیشن حرکت هنگام تغییر زبان */}
                <motion.img
                  key={`${slide.id}-${currentLang}`}
                  initial={{
                    scale: 0.85,
                    opacity: 0,
                    x: isRTL ? 100 : -100,
                  }}
                  animate={{
                    scale: 1.03,
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    scale: 0.85,
                    opacity: 0,
                    x: isRTL ? -100 : 100,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: mouse.x * 0.3,
                    rotateX: -mouse.y * 0.3,
                  }}
                  src={slide.image}
                  alt={slide.title}
                  draggable={false}
                  className="
                    hero-product-image
                    relative
                    w-[88%]
                    md:w-[92%]
                    lg:w-[95%]
                    max-h-[92%]
                    object-contain
                    select-none
                    will-change-transform
                    drop-shadow-[0_60px_120px_rgba(0,0,0,0.35)]
                  "
                  style={{
                    transform: `
                      translateZ(0)
                      translate3d(
                        ${mouse.x * 0.8}px,
                        ${mouse.y * 0.8}px,
                        0
                      )
                    `,
                  }}
                />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="hero-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40
                   w-10 h-10 md:w-12 md:h-12 rounded-full
                   bg-black/40 backdrop-blur-md
                   border border-white/20
                   flex items-center justify-center
                   text-white hover:text-yellow-400
                   hover:bg-black/60 hover:border-yellow-400/50
                   hover:scale-110
                   transition-all duration-300
                   opacity-0 group-hover:opacity-100
                   focus:opacity-100"
        aria-label={isRTL ? "بعدی" : "Previous"}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
        </svg>
      </button>
      
      <button
        className="hero-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40
                   w-10 h-10 md:w-12 md:h-12 rounded-full
                   bg-black/40 backdrop-blur-md
                   border border-white/20
                   flex items-center justify-center
                   text-white hover:text-yellow-400
                   hover:bg-black/60 hover:border-yellow-400/50
                   hover:scale-110
                   transition-all duration-300
                   opacity-0 group-hover:opacity-100
                   focus:opacity-100"
        aria-label={isRTL ? "قبلی" : "Next"}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
        </svg>
      </button>

      {/* Pagination Container */}
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

        .hero-title {
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -.02em;
        }

        html.dark .hero-title {
          background: linear-gradient(90deg, #fff, #d1d5db);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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

        .hero-pagination {
          display: flex;
          gap: 8px;
          bottom: 24px;
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

        /* Hide default Swiper navigation */
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }

        /* Swiper container fixes */
        .swiper {
          overflow: visible !important;
        }

        .swiper-slide {
          height: auto !important;
        }

        /* انیمیشن حرکت عکس هنگام تغییر زبان */
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1.03);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1.03);
          }
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
          .hero-pagination {
            bottom: 16px;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.5rem;
          }
          .hero-card {
            padding: 20px;
          }
          .hero-btn {
            padding: 8px 20px;
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;