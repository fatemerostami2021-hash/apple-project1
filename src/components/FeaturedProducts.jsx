import React, { useMemo, useRef, useState, useEffect } from "react";
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

// ✅ Breakpoints با تنظیمات بهینه
const BREAKPOINTS = {
  320: { slidesPerView: 1.2, spaceBetween: 12 },
  480: { slidesPerView: 1.8, spaceBetween: 16 },
  640: { slidesPerView: 2.2, spaceBetween: 20 },
  768: { slidesPerView: 2.8, spaceBetween: 24 },
  1024: { slidesPerView: 3.5, spaceBetween: 28 },
  1280: { slidesPerView: 4.0, spaceBetween: 32 },
};

// ✅ محاسبه بیشترین slidesPerView
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

  const [swiperKey, setSwiperKey] = useState(0);

  const isFa = language === "fa";
  const isRTL = isFa;

  // ✅ ریستارت Swiper با تغییر زبان
  useEffect(() => {
    const timer = setTimeout(() => {
      setSwiperKey(prev => prev + 1);
    }, 100);
    return () => clearTimeout(timer);
  }, [language]);

  const stableProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.filter((p) => p.active !== false).slice(0, limit);
  }, [products, limit]);

  const slideCount = stableProducts.length;

  // ✅ شرط loop: حداقل ۴ اسلاید و بیشتر از ۲ برابر slidesPerView
  const enableLoop = slideCount >= 4 && slideCount > MAX_SLIDES_PER_VIEW * 1.5;

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
            className="viewall-btn hidden md:flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300"
          >
            <span>{content.viewAll}</span>
            {isRTL ? (
              <HiOutlineArrowLeft className="w-4 h-4 viewall-arrow" />
            ) : (
              <HiOutlineArrowRight className="w-4 h-4 viewall-arrow" />
            )}
          </motion.button>
        </motion.div>

        {/* Swiper - با شرط loop اصلاح شده */}
        <motion.div variants={itemVariants} className="relative group">
          <Swiper
            key={swiperKey}
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.2} // ✅ کاهش برای loop بهتر
            loop={enableLoop}
            grabCursor={true}
            watchSlidesProgress={true}
            dir={isRTL ? "rtl" : "ltr"}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              el: paginationRef.current,
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
            className="viewall-btn-mobile w-full max-w-xs py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300"
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

        .viewall-btn {
          background: linear-gradient(135deg, #1a1a1a, #000000);
          color: #f6e27a;
          border: 1px solid rgba(212, 175, 55, 0.4);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .viewall-btn:hover {
          background: linear-gradient(135deg, #000000, #1a1a1a);
          border-color: rgba(212, 175, 55, 0.9);
          color: #ffe9a8;
          box-shadow: 0 6px 24px rgba(212, 175, 55, 0.25),
                      0 0 0 1px rgba(212, 175, 55, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
        .viewall-arrow {
          transition: transform 0.3s ease;
        }
        .viewall-btn:hover .viewall-arrow {
          transform: translateX(4px);
        }
        [dir="rtl"] .viewall-btn:hover .viewall-arrow {
          transform: translateX(-4px);
        }

        .viewall-btn-mobile {
          background: linear-gradient(135deg, #d4af37, #f6e27a, #d4af37);
          color: #111;
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
        }
        .viewall-btn-mobile:hover {
          background: linear-gradient(135deg, #c49f2f, #ecd66e, #c49f2f);
          box-shadow: 0 8px 26px rgba(212, 175, 55, 0.55);
        }
        .viewall-btn-mobile:active {
          transform: scale(0.97);
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