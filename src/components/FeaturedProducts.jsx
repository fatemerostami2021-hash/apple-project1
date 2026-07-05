import React, { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineSparkles } from "react-icons/hi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ProductCard from "./product/ProductCard";
import FeaturedBackground from "../animations/FeaturedBackground";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

// بیشترین slidesPerView بین همه‌ی breakpoint ها، برای تصمیم امن درباره‌ی loop
const BREAKPOINTS = {
  320: { slidesPerView: 1.3, spaceBetween: 12 },
  480: { slidesPerView: 2.1, spaceBetween: 16 },
  640: { slidesPerView: 2.4, spaceBetween: 20 },
  768: { slidesPerView: 3.1, spaceBetween: 24 },
  1024: { slidesPerView: 3.8, spaceBetween: 28 },
  1280: { slidesPerView: 4.2, spaceBetween: 32 },
};
const MAX_SLIDES_PER_VIEW = Math.max(
  ...Object.values(BREAKPOINTS).map((b) => b.slidesPerView)
);

export default function FeaturedProducts({
  products,
  darkMode = false,
  language = "en",
  title,
  subtitle,
  limit = 8,
  showNavigation = true,
  showPagination = true,
  className = ""
}) {
  const navigate = useNavigate();

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  // برای اطمینان از این‌که refs قبل از init آماده‌ن، یه re-render کوچیک بعد از mount می‌زنیم
  const [, forceRerender] = useState(0);

  const isFa = language === "fa";
  const isRTL = isFa;

  const stableProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.filter((p) => p.active !== false).slice(0, limit);
  }, [products, limit]);

  const slideCount = stableProducts.length;

  // ✅ loop فقط وقتی فعال میشه که تعداد اسلایدها به‌قدر کافی از بیشترین slidesPerView بیشتر باشه
  // (Swiper با loop + slidesPerView اعشاری و اسلاید کم گیر می‌کنه / می‌پره)
  const enableLoop = slideCount >= Math.ceil(MAX_SLIDES_PER_VIEW) * 2;

  const content = useMemo(
    () => ({
      title: title || (isFa ? "محصولات ویژه" : "Featured Products"),
      subtitle:
        subtitle || (isFa ? "انتخاب برترین‌ها برای شما" : "Top picks curated for you"),
      viewAll: isFa ? "مشاهده همه" : "View All",
      empty: isFa ? "محصولی یافت نشد" : "No products found"
    }),
    [isFa, title, subtitle]
  );

  if (stableProducts.length === 0) {
    return (
      <section className={`py-20 w-full ${className}`}>
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 dark:text-gray-400">
          {content.empty}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      dir={isRTL ? "rtl" : "ltr"}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className={`
        relative overflow-hidden py-16 md:py-24 w-full 
        bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 
        dark:from-neutral-950 dark:via-black dark:to-neutral-950 
        transition-colors duration-700 
        ${className}
      `}
    >
      <FeaturedBackground darkMode={darkMode} />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-14 gap-4"
        >
          <div className={`flex-1 ${isRTL ? "md:text-right" : "md:text-left"}`}>
            <div className="flex items-center gap-2 mb-2">
              <HiOutlineSparkles className="text-amber-500 text-lg" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-600 dark:text-amber-400">
                {isFa ? "منتخب" : "Curated"}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
              {content.title}
            </h2>

            <p className="mt-2 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
              {content.subtitle}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold tracking-wide hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-300 shadow-lg"
          >
            <span>{content.viewAll}</span>
            {isRTL ? (
              <HiOutlineArrowLeft className="w-4 h-4" />
            ) : (
              <HiOutlineArrowRight className="w-4 h-4" />
            )}
          </motion.button>
        </motion.div>

        {/* Swiper */}
        <motion.div variants={itemVariants} className="relative group">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.4}
            loop={enableLoop}
            grabCursor={true}
            watchSlidesProgress={true}
            // ✅ حالا واقعاً فعال میشن (قبلاً پاس داده نمی‌شدن)
            navigation={{
              prevEl: null,
              nextEl: null,
            }}
            pagination={{
              el: null,
              clickable: true,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.params.pagination.el = paginationRef.current;
            }}
            breakpoints={BREAKPOINTS}
            className="!pb-14 featured-swiper"
          >
            {stableProducts.map((product, index) => {
              const productId = product._id || product.id;
              return (
                <SwiperSlide key={productId || `product-${index}`} className="h-auto">
                  <div
                    className="h-full p-1 product-fade-item"
                    style={{ "--fade-delay": `${index * 60}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Buttons */}
          {showNavigation && slideCount > 2 && (
            <>
              <button
                ref={prevRef}
                className={`
                  absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-0 md:right-2" : "left-0 md:left-2"} 
                  z-20 w-10 h-10 md:w-11 md:h-11 rounded-full
                  bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md
                  border border-gray-200 dark:border-neutral-700
                  flex items-center justify-center
                  text-neutral-700 dark:text-neutral-200
                  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
                  hover:border-transparent
                  shadow-lg hover:shadow-xl
                  transition-all duration-300
                  opacity-0 group-hover:opacity-100
                  swiper-button-disabled:opacity-30
                `}
                aria-label="Previous"
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
                ref={nextRef}
                className={`
                  absolute top-1/2 -translate-y-1/2 ${isRTL ? "left-0 md:left-2" : "right-0 md:right-2"} 
                  z-20 w-10 h-10 md:w-11 md:h-11 rounded-full
                  bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md
                  border border-gray-200 dark:border-neutral-700
                  flex items-center justify-center
                  text-neutral-700 dark:text-neutral-200
                  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
                  hover:border-transparent
                  shadow-lg hover:shadow-xl
                  transition-all duration-300
                  opacity-0 group-hover:opacity-100
                `}
                aria-label="Next"
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
            </>
          )}

          {/* Pagination */}
          {showPagination && (
            <div
              ref={paginationRef}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-1.5 w-full"
            />
          )}
        </motion.div>

        {/* Mobile View All Button */}
        <motion.div variants={itemVariants} className="mt-8 flex md:hidden justify-center">
          <button
            onClick={() => navigate("/products")}
            className="w-full max-w-xs py-3.5 rounded-full bg-amber-500 text-black text-sm font-bold tracking-wide hover:bg-amber-400 transition-colors shadow-lg"
          >
            {content.viewAll}
          </button>
        </motion.div>
      </div>

      <style>{`
        .featured-swiper .swiper-slide {
          height: auto !important;
          display: flex;
          align-items: stretch;
        }

        /* فید شدن آیتم‌ها با mount شدن - مستقل از هر کلاس داخلی Swiper */
        .product-fade-item {
          animation: productFadeIn 0.5s ease both;
          animation-delay: var(--fade-delay, 0ms);
        }
        @keyframes productFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d4d4d4;
          opacity: 0.6;
          transition: all 0.3s ease;
        }
        html.dark .swiper-pagination-bullet {
          background: #525252;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 12px;
          background: #D4AF37 !important;
          opacity: 1;
        }
        @media (max-width: 480px) {
          .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
          }
          .swiper-pagination-bullet-active {
            width: 16px;
          }
        }
      `}</style>
    </motion.section>
  );
}