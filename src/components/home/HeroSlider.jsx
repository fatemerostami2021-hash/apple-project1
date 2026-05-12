import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

import { heroSlides } from "../../data/heroSlides";
import HeroBackground from "../../animations/HeroBackground";
import WaveCircleText from "../../animations/WaveCircleText";
import { useTheme } from "../../store/theme";
import { fadeIn } from "../../animations/variants";

const HeroSlider = () => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  const darkMode = theme === "dark";
  const currentLang = i18n.resolvedLanguage || i18n.language || "fa";
  const isRTL = currentLang.startsWith("fa");

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [swiperKey, setSwiperKey] = useState(0);

  useEffect(() => {
    setSwiperKey((prev) => prev + 1);
  }, [currentLang]);

  const handleMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMouse({ x, y });
  }, []);

  const getButtonText = (slide) => {
    if (!slide?.buttonText) return isRTL ? "خرید" : "Buy Now";
    return isRTL ? slide.buttonText.fa : slide.buttonText.en;
  };

  const handleNavigation = (id) => {
    if (!id) return;
    window.open(`/product/${id}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      onMouseMove={handleMove}
      className="relative w-full h-[550px] md:h-[720px] overflow-hidden bg-transparent"
    >
      {/* Background animation */}
<HeroBackground darkMode={darkMode} />

{/* Circular text animation - both themes */}
<WaveCircleText darkMode={darkMode} />


      <Swiper
        key={swiperKey}
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        speed={1200}
        dir={isRTL ? "rtl" : "ltr"}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        className="w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative flex items-center h-full w-full px-6 lg:px-28 ${
                isRTL ? "flex-row-reverse text-right" : "flex-row text-left"
              }`}
            >
              {/* Product info card */}
              <motion.div
                variants={fadeIn(isRTL ? "left" : "right", 0.3)}
                initial="hidden"
                animate="show"
              className="hero-card gold-card z-20 w-[92%] sm:w-[58%] lg:w-[40%] p-8 md:p-12"

              >
                <p className="hero-brand text-[10px] md:text-xs mb-3">
                  {slide.brand}
                </p>

                <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <p className="hero-subtitle mt-5 text-sm md:text-base lg:text-lg">
                  {slide.subtitle}
                </p>

                <button
                  onClick={() => handleNavigation(slide.id)}
                  className="
                    mt-8 px-8 py-3.5
                    rounded-full text-sm font-bold tracking-wide
                    bg-black text-white
                    dark:bg-white dark:text-black
                    hover:scale-105 active:scale-95
                    transition-all duration-300
                    shadow-lg
                  "
                >
                  {getButtonText(slide)}
                </button>
              </motion.div>

              {/* Product image */}
              <div className="absolute inset-0 md:relative md:w-[65%] h-full flex items-center justify-center perspective-[2000px]">
                <div
                  className="absolute w-[50%] h-[50%] blur-[150px] opacity-30 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${50 + mouse.x}% ${
                      50 + mouse.y
                    }%, ${darkMode ? "white" : "#3b82f6"}, transparent 70%)`,
                  }}
                />

                <motion.img
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1.08, opacity: 1 }}
                  transition={{ duration: 1 }}
                  src={slide.image}
                  alt={slide.title}
                  draggable={false}
                  className="
                    relative
                    w-[90%] md:w-[95%]
                    max-h-[95%]
                    object-contain
                    select-none
                    drop-shadow-[0_60px_120px_rgba(0,0,0,0.35)]
                  "
                  style={{
                    transform: `
                      rotateY(${mouse.x * 0.5}deg)
                      rotateX(${-mouse.y * 0.5}deg)
                      translate3d(${mouse.x * 0.8}px, ${mouse.y * 0.8}px, 0)
                    `,
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30" />

      <style>{`
        .hero-pagination .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #888;
          opacity: 0.3;
          transition: all 0.4s ease;
        }

        .hero-pagination .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 10px;
          background: #000;
          opacity: 1;
        }

        html.dark .hero-pagination .swiper-pagination-bullet-active {
          background: #fff;
        }

        @media (max-width: 768px) {
          .hero-pagination .swiper-pagination-bullet-active {
            width: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
