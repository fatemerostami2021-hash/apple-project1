import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback, useRef } from "react";
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

  const currentLang =
    i18n.resolvedLanguage || i18n.language || "fa";

  const isRTL = currentLang.startsWith("fa");

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [swiperKey, setSwiperKey] = useState(0);

  const frame = useRef();

  useEffect(() => {
    setSwiperKey((prev) => prev + 1);
  }, [currentLang]);

  const handleMove = useCallback((e) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      const x =
        (e.clientX / window.innerWidth - 0.5) * 20;

      const y =
        (e.clientY / window.innerHeight - 0.5) * 20;

      setMouse({ x, y });
    });
  }, []);

  const getButtonText = (slide) => {
    if (!slide?.buttonText)
      return isRTL ? "خرید" : "Buy Now";

    return isRTL
      ? slide.buttonText.fa
      : slide.buttonText.en;
  };

  const handleNavigation = (id) => {
    if (!id) return;

    window.open(
      `/product/${id}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      onMouseMove={handleMove}
      className="
        relative
        w-full
        h-[580px]
        md:h-[760px]
        overflow-hidden
      "
    >
      <HeroBackground darkMode={darkMode} />

      <WaveCircleText darkMode={darkMode} />

      <Swiper
        key={`${swiperKey}-${isRTL}`}
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        speed={1000}
        dir={isRTL ? "rtl" : "ltr"}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
        }}
        className="w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
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
                ${
                  isRTL
                    ? "flex-row-reverse text-right"
                    : "flex-row text-left"
                }
              `}
            >
              {/* TEXT SIDE */}
              <motion.div
                variants={fadeIn(
                  isRTL ? "left" : "right",
                  0.3
                )}
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
                  onClick={() =>
                    handleNavigation(slide.id)
                  }
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
                  "
                >
                  {getButtonText(slide)}
                </button>
              </motion.div>

              {/* IMAGE SIDE */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
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
                  ${
                    isRTL
                      ? "justify-start"
                      : "justify-end"
                  }
                `}
              >
                {/* GLOW */}
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
                      circle at ${50 + mouse.x}% ${
                      50 + mouse.y
                    }%,
                      ${
                        darkMode
                          ? "rgba(255,255,255,.9)"
                          : "#3b82f6"
                      },
                      transparent 70%
                    )`,
                  }}
                />

                {/* PRODUCT IMAGE */}
                <motion.img
                  initial={{
                    scale: 0.85,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1.03,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
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

      <div
        className="
          hero-pagination
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          flex
          gap-3
          z-30
        "
      />

      <style>{`
.hero-card{
border-radius:26px;
backdrop-filter:blur(22px) saturate(160%);
-webkit-backdrop-filter:blur(22px) saturate(160%);
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.12);
box-shadow:
0 20px 60px rgba(0,0,0,0.35),
inset 0 1px 0 rgba(255,255,255,0.15);
transition:all .35s ease;
}

html.dark .hero-card{
background:rgba(20,20,20,0.35);
border:1px solid rgba(255,255,255,0.08);
}

.hero-card:hover{
transform:translateY(-6px) scale(1.01);
box-shadow:
0 35px 80px rgba(0,0,0,0.55);
}

.hero-brand{
letter-spacing:.35em;
font-weight:600;
text-transform:uppercase;
opacity:.7;
}

.hero-title{
font-weight:800;
line-height:1.05;
letter-spacing:-.02em;
}

html.dark .hero-title{
background:linear-gradient(
90deg,
#fff,
#d1d5db
);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.hero-subtitle{
line-height:1.8;
opacity:.82;
max-width:38ch;
}

.hero-btn{
background:black;
color:white;
box-shadow:
0 10px 30px rgba(0,0,0,.35);
}

.hero-btn:hover{
transform:translateY(-2px) scale(1.05);
}

html.dark .hero-btn{
background:white;
color:black;
}

.hero-pagination .swiper-pagination-bullet{
width:6px;
height:6px;
background:#888;
opacity:.3;
transition:all .4s ease;
}

.hero-pagination
.swiper-pagination-bullet-active{
width:32px;
border-radius:10px;
background:#000;
opacity:1;
}

html.dark
.hero-pagination
.swiper-pagination-bullet-active{
background:#fff;
}

@media (max-width:768px){

.hero-card{
width:100%;
padding:28px;
}

.hero-title{
font-size:2.2rem;
}

.hero-subtitle{
max-width:100%;
}

}

      `}</style>
    </section>
  );
};

export default HeroSlider;
