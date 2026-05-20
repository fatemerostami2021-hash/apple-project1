import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Parallax } from "swiper/modules";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// مسیرهای تصاویر (همانطور که بودند حفظ شدند)
import appleImg from "../../assets/article/apple-float.png";
import samsungImg from "../../assets/article/samsung-float.png";
import techImg from "../../assets/article/tech-news-article.png";

const BlogHero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const slides = [
    {
      id: "apple",
      title: t("appleTitle"),
      subtitle: t("appleSub"),
      image: appleImg,
      brand: "Apple",
      color: "from-blue-500/20"
    },
    {
      id: "samsung",
      title: t("samsungTitle"),
      subtitle: t("samsungSub"),
      image: samsungImg,
      brand: "Samsung",
      color: "from-purple-500/20"
    },
    {
      id: "tech",
      title: t("techTitle"),
      subtitle: t("techSub"),
      image: techImg,
      brand: "Tech News",
      color: "from-emerald-500/20"
    }
  ];

  return (
    <section className="relative w-full">
      <Swiper
        key={i18n.language}
        modules={[Autoplay, Pagination, EffectFade, Parallax]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        pagination={{ clickable: true }}
        dir={isRTL ? "rtl" : "ltr"}
        className="w-full h-[50vh]"
      >
    {slides.map((slide) => (
  <SwiperSlide key={slide.id} className="relative w-full h-full">
    <div className="relative max-w-[85rem] mx-auto grid lg:grid-cols-2 h-full items-center px-6 md:px-24">
{/* بخش متن و دکمه (ساختار سه بعدی) */}
<motion.div 
  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className={`flex flex-col ${isRTL ? "text-right" : "text-left"}`}
>
  {/* برند با افکت طلایی-سیلور */}
  <h3 className="h3-premium text-lg md:text-xl mb-6 uppercase tracking-[0.25em]">
    {slide.brand}
  </h3>

  {/* عنوان سه‌بعدی حرفه‌ای */}
<h1 
  className="text-zinc-900 dark:text-white text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6 
             transition-all duration-500
             hover:dark:text-transparent hover:dark:bg-clip-text 
             hover:dark:bg-gradient-to-r hover:dark:from-yellow-200 hover:dark:to-yellow-600
             drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
>
  {slide.title}
</h1>


  {/* توضیحات با استایل نرم و بولدتر */}
<p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-8 
              transition-colors duration-500
              hover:text-zinc-900 hover:dark:text-zinc-100
              drop-shadow-sm">
  {slide.subtitle}
</p>


  {/* دکمه انیمیشنی سه‌بعدی با طلایی subtle hover */}
  <motion.button
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 250, damping: 15 }}
    className="w-fit px-8 py-3 rounded-full font-semibold 
               bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 
               dark:from-white dark:via-zinc-200 dark:to-white 
               text-white dark:text-zinc-900 shadow-xl hover:shadow-2xl 
               hover:from-yellow-500 hover:to-amber-600 hover:text-black 
               transition-all duration-500 ease-in-out"
  >
    {t("readOurArticle")}
  </motion.button>
</motion.div>


      {/* بخش تصویر */}
      <div className="hidden lg:flex justify-center items-center">
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          src={slide.image}
          alt={slide.title}
          className="w-[400px] drop-shadow-2xl"
        />
      </div>
    </div>
  </SwiperSlide>
))}

      </Swiper>
      
      <style jsx global>{`
        /* فقط استایل pagination باقی می‌ماند که برای خوانایی روی هر پس‌زمینه‌ای باید contrast داشته باشد */
        .swiper-pagination-bullet { background: currentColor !important; opacity: 0.2; }
        .swiper-pagination-bullet-active { opacity: 0.6; width: 24px; border-radius: 10px; }
      `}</style>
    </section>
  );
};
export default BlogHero;
