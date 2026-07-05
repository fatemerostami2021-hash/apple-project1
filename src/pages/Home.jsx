import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/home/HeroSlider";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import FloatingGoldText from "../animations/FloatingGoldText";
import { HiOutlineShoppingCart, HiOutlineEye, HiOutlineCheck, HiOutlineArrowRight } from "react-icons/hi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import SamsungCard from "../components/samsung/SamsungCard.jsx";
import "../components/samsung/SamsungCard.css";
import "../components/product/SamsungProductModal.css";
import BrandWaveSlider from "../components/BrandWaveSlider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { getLangText, getProductName } from "../utils/helpers";

// ═══════════════════════════════════════════════════════════
// 🔥 هوک تشخیص موبایل بهبود یافته
// ═══════════════════════════════════════════════════════════
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      setScreenWidth(window.innerWidth);
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    updateSize();
    
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, [breakpoint]);
  
  return { isMobile, screenWidth };
};

// ═══════════════════════════════════════════════════════════
// 🦴 اسکلتون بهبود یافته (کوچکتر در موبایل)
// ═══════════════════════════════════════════════════════════
function ProductCardSkeleton({ compact = false }) {
  if (compact) {
    return (
      <div className="rounded-xl p-2 bg-neutral-100 dark:bg-neutral-900/60 animate-pulse">
        <div className="h-20 sm:h-24 mb-2 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800 mb-1.5" />
        <div className="h-5 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }
  return (
    <div className="rounded-2xl p-3 sm:p-4 bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 animate-pulse">
      <div className="h-32 sm:h-36 md:h-40 mb-3 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-3.5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800 mb-2" />
      <div className="h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800 mb-3" />
      <div className="h-8 w-full rounded-xl bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
}

function SectionSkeleton({ count = 5, compact = false }) {
  const gridClass = compact 
    ? "grid grid-cols-2 gap-2"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5";
  
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} compact={compact} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 🎯 کامپوننت اصلی
// ═══════════════════════════════════════════════════════════
const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRTL = lang === "fa";
  const { isMobile, screenWidth } = useIsMobile();

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});

  const { add } = useCart();

  const { products: allProducts, loading: allLoading, error: allError } = useProducts();
  const { products: appleProducts, loading: appleLoading } = useProducts("Apple");
  const { products: samsungProducts, loading: samsungLoading } = useProducts("Samsung");

  // محدود کردن تعداد محصولات در موبایل برای عملکرد بهتر
  const maxAppleProducts = isMobile ? 4 : 10;
  const maxSamsungProducts = isMobile ? 3 : 8;
  const maxFeaturedProducts = isMobile ? 4 : 12;

  const filteredProducts = useMemo(() => {
    if (!allProducts?.length) return [];
    if (activeFilter === "All") return allProducts;
    return allProducts.filter(p =>
      (p.brand && p.brand.toLowerCase() === activeFilter.toLowerCase()) ||
      (p.category && p.category.toLowerCase() === activeFilter.toLowerCase())
    );
  }, [activeFilter, allProducts]);

  const handleAddToCart = useCallback((product, e) => {
    e?.stopPropagation();
    add(product, 1);
    const key = product._id || product.id;
    setAddedToCart(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [key]: false }));
    }, 2000);
  }, [add]);

  const handleViewProduct = useCallback((product) => {
    const slug = product.slug || product._id || product.id;
    const articleSlug = product.article || product.articleSlug;
    const hasArticle = articleSlug && typeof articleSlug === "string" && articleSlug.trim();
    
    if (hasArticle) {
      navigate(`/articles/${articleSlug.trim()}`);
    } else {
      navigate(`/product/${slug}`);
    }
  }, [navigate]);

  // تنظیمات Swiper بر اساس عرض صفحه (بهینه‌سازی موبایل)
  const getSwiperConfig = () => {
    if (screenWidth < 360) {
      return { slidesPerView: 1, spaceBetween: 6, pagination: true, navigation: false, autoplay: false };
    } else if (screenWidth < 480) {
      return { slidesPerView: 1, spaceBetween: 8, pagination: true, navigation: false, autoplay: false };
    } else if (screenWidth < 640) {
      return { slidesPerView: 1.5, spaceBetween: 10, pagination: true, navigation: false, autoplay: false };
    } else if (screenWidth < 768) {
      return { slidesPerView: 2, spaceBetween: 12, pagination: true, navigation: false, autoplay: true };
    } else if (screenWidth < 1024) {
      return { slidesPerView: 2.5, spaceBetween: 16, pagination: true, navigation: true, autoplay: true };
    } else if (screenWidth < 1280) {
      return { slidesPerView: 3, spaceBetween: 20, pagination: false, navigation: true, autoplay: true };
    } else {
      return { slidesPerView: 4, spaceBetween: 24, pagination: false, navigation: true, autoplay: true };
    }
  };

  const swiperConfig = getSwiperConfig();

  const getGridCols = () => {
    if (screenWidth < 360) return "grid-cols-1";
    if (screenWidth < 480) return "grid-cols-2";
    if (screenWidth < 640) return "grid-cols-2";
    if (screenWidth < 768) return "grid-cols-2";
    if (screenWidth < 1024) return "grid-cols-3";
    if (screenWidth < 1280) return "grid-cols-4";
    return "grid-cols-5";
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 bg-transparent ${isRTL ? "rtl" : "ltr"}`}
      style={{ 
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <HeroSlider />
      
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* ════════════════════ Featured Swiper ════════════════════ */}
      <section className="py-3 sm:py-6 w-full">
        <div className="w-full px-2 sm:px-4 md:px-6">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-center mb-3 sm:mb-4 transition-colors duration-300 text-neutral-900 dark:text-amber-400">
            {t("home.featured_products") || (isRTL ? "محصولات ویژه" : "Featured Products")}
          </h2>

          {allLoading ? (
            <div className="pb-6 sm:pb-10">
              <SectionSkeleton count={isMobile ? 2 : 4} compact={isMobile} />
            </div>
          ) : allError ? (
            <div className="text-center py-6 sm:py-10 text-neutral-500 dark:text-neutral-400 text-sm">
              {isRTL ? "محصولات ویژه قابل بارگذاری نیستند" : "Featured products unavailable"}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-6 sm:py-10 text-neutral-500 dark:text-neutral-400 text-sm">
              {isRTL ? "محصولی یافت نشد" : "No products found"}
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={swiperConfig.spaceBetween}
              slidesPerView={swiperConfig.slidesPerView}
              navigation={swiperConfig.navigation}
              pagination={swiperConfig.pagination ? { 
                clickable: true,
                dynamicBullets: isMobile,
                bulletClass: 'swiper-pagination-bullet !bg-amber-500/50',
                bulletActiveClass: '!bg-amber-500'
              } : false}
              autoplay={swiperConfig.autoplay && filteredProducts.length > swiperConfig.slidesPerView ? { 
                delay: isMobile ? 5000 : 4000, 
                disableOnInteraction: false 
              } : false}
              speed={isMobile ? 300 : 600}
              loop={filteredProducts.length > swiperConfig.slidesPerView}
              loopAdditionalSlides={swiperConfig.slidesPerView}
              watchSlidesProgress
              className="pb-6 sm:pb-10"
            >
              {filteredProducts.slice(0, maxFeaturedProducts).map((p) => (
                <SwiperSlide key={p._id || p.id} className="h-auto">
                  <div className={`${isMobile ? 'px-0.5' : 'px-2'} h-full`}>
                    <ProductCard product={p} onQuickView={setSelectedProduct} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

   

      {/* ════════════════════ Apple Showcase ════════════════════ */}
      <section className="relative w-full py-4 sm:py-12 md:py-20 overflow-hidden bg-transparent transition-colors duration-300">
        
        <div className="relative w-full h-[150px] sm:h-[260px] md:h-[340px] lg:h-[420px] overflow-hidden mb-4 sm:mb-10 md:mb-14 rounded-xl sm:rounded-2xl md:rounded-3xl">
          <img
            src="/images/apple-hero-product-home.png"
            alt="Apple Vision Pro"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
            <div className="px-3 sm:px-8 md:px-12 lg:px-16 max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-base sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight"
              >
                Shop Apple Vision Pro
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[10px] sm:text-sm md:text-base lg:text-lg text-white/80 mt-1 sm:mt-2 md:mt-3 max-w-lg"
              >
                {isRTL
                  ? "دنیای جدیدی از واقعیت افزوده را با Apple Vision Pro تجربه کنید."
                  : "Experience a new world of augmented reality with Apple Vision Pro."}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                onClick={() => navigate("/products?brand=Apple")}
                className="mt-1 sm:mt-3 md:mt-4 px-3 sm:px-6 md:px-8 py-1 sm:py-2.5 md:py-3 bg-[#D4AF37] text-black rounded-full font-bold text-[10px] sm:text-sm md:text-base hover:bg-[#C5A027] transition-all shadow-lg shadow-[#D4AF37]/30 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                {isRTL ? "مشاهده محصولات" : "Explore Products"}
              </motion.button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-16 md:h-20 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent" />
        </div>

        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 10 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.2 : 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-3 sm:mb-8 md:mb-12"
          >
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-3 mb-1 sm:mb-4">
              <span className="text-[8px] sm:text-sm font-bold text-amber-500 tracking-[0.15em] sm:tracking-[0.3em] uppercase bg-amber-500/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                {isRTL ? "اکوسیستم کامل" : "Complete Ecosystem"}
              </span>
            </div>

            <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-6xl font-black text-neutral-900 dark:text-white leading-tight">
              {isRTL ? (
                <>
                  <span className="text-amber-500">دنیای</span> محصولات اپل
                </>
              ) : (
                <>
                  The <span className="text-amber-500">Apple</span> Experience
                </>
              )}
            </h2>
            <p className="text-xs sm:text-base md:text-lg lg:text-xl font-extrabold text-neutral-700 dark:text-gray-200 max-w-2xl mx-auto mt-1 sm:mt-3 leading-relaxed tracking-wide">
              {isRTL ? (
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                  از آیفون تا مک، هر آنچه برای تجربه‌ای بی‌نظیر نیاز دارید
                </span>
              ) : (
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                  From iPhone to Mac, everything you need for an unparalleled experience
                </span>
              )}
            </p>
            <div className="w-8 sm:w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto mt-2 sm:mt-4" />
          </motion.div>

          {appleLoading ? (
            <SectionSkeleton count={maxAppleProducts} compact={isMobile} />
          ) : (
            <div className={`grid ${getGridCols()} gap-1.5 sm:gap-4 md:gap-5`}>
              {appleProducts && appleProducts.length > 0 ? (
                appleProducts.slice(0, maxAppleProducts).map((product, index) => {
                  const isAdded = addedToCart[product._id || product.id];
                  const articleSlug = product.article || product.articleSlug;
                  const hasArticle = articleSlug && typeof articleSlug === "string" && articleSlug.trim();
                  const productName = getProductName(product, lang);

                  return (
                    <motion.div
                      key={product._id || index}
                      initial={{ opacity: 0, y: isMobile ? 5 : 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: isMobile ? 0.15 : 0.45, delay: isMobile ? 0 : Math.min(index * 0.05, 0.3) }}
                      viewport={{ once: true }}
                      whileHover={isMobile ? undefined : { y: -5 }}
                      className="group relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-gray-200 dark:border-neutral-800 rounded-xl sm:rounded-2xl p-1.5 sm:p-3 md:p-4 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-center h-20 sm:h-36 md:h-40 mb-1.5 sm:mb-3 bg-gray-50 dark:bg-neutral-800/50 rounded-lg sm:rounded-xl overflow-hidden">
                        <img
                          src={product.thumbnail || "/images/placeholder.png"}
                          alt={productName}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.src = "/images/placeholder.png"; }}
                        />
                      </div>

                      <div className={isRTL ? "text-right" : "text-left"}>
                        <h3 className="text-[10px] sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[24px] sm:min-h-[40px]">
                          {productName}
                        </h3>
                        
                        <p className="mt-0.5 sm:mt-1 text-[8px] sm:text-xs text-gray-500 dark:text-gray-400 line-clamp-1 sm:line-clamp-2">
                          {getLangText(product.description, lang)}
                        </p>

                        <div className="mt-1 sm:mt-3 flex items-center justify-between">
                          <span className="text-[10px] sm:text-lg font-black text-amber-500 dark:text-amber-400">
                            {product.price?.toLocaleString()}
                            <span className="text-[7px] sm:text-xs font-normal text-gray-400 mr-0.5 sm:mr-1">
                              {isRTL ? "تومان" : "Toman"}
                            </span>
                          </span>
                        </div>

                        <div className="mt-1.5 sm:mt-3 flex gap-1 sm:gap-2">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="flex-1 px-1 sm:px-3 py-1 sm:py-2 bg-amber-500 text-black rounded-lg sm:rounded-xl hover:bg-amber-600 transition text-[8px] sm:text-xs font-bold flex items-center justify-center gap-0.5 sm:gap-1"
                          >
                            <HiOutlineEye size={10} className="hidden sm:block" />
                            {hasArticle ? (isRTL ? "مقاله" : "Article") : (isRTL ? "مشاهده" : "View")}
                          </button>

                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            className={`flex-1 px-1 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl transition text-[8px] sm:text-xs font-bold flex items-center justify-center gap-0.5 sm:gap-1 ${
                              isAdded
                                ? "bg-green-500 text-white"
                                : "bg-gray-900 dark:bg-amber-500 text-white dark:text-black hover:opacity-90"
                            }`}
                          >
                            {isAdded ? (
                              <><HiOutlineCheck size={10} /> {isRTL ? "افزوده" : "Added"}</>
                            ) : (
                              <><HiOutlineShoppingCart size={10} /> {isRTL ? "خرید" : "Buy"}</>
                            )}
                          </button>
                        </div>

                        {hasArticle && (
                          <span className="inline-block mt-1 text-[7px] sm:text-[9px] font-bold text-amber-500 bg-amber-500/10 px-1 py-0.5 rounded-full">
                            📄 {isRTL ? "مقاله" : "Article"}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10 sm:py-20">
                  {isRTL ? "محصولات اپل یافت نشد" : "No Apple products found"}
                </div>
              )}
            </div>
          )}

          {appleProducts && appleProducts.length > maxAppleProducts && (
            <div className="text-center mt-4 sm:mt-10">
              <button
                onClick={() => navigate("/products?brand=Apple")}
                className="px-3 sm:px-8 py-1.5 sm:py-3 border-2 border-amber-500 text-amber-500 dark:text-amber-400 rounded-full hover:bg-amber-500 hover:text-black transition font-bold text-[10px] sm:text-sm"
              >
                {isRTL ? "همه محصولات اپل" : "All Apple Products"}
                <HiOutlineArrowRight className={`inline ml-1 ${isRTL ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════ Samsung Ecosystem ════════════════════ */}
      <section className="relative overflow-hidden px-2 sm:px-6 py-6 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.03),transparent_60%)]" />

        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-4 sm:gap-8 text-center lg:flex-row lg:items-center lg:gap-12 lg:text-right rtl:lg:text-right ltr:lg:text-left">
          <div className="flex-1 w-full">
            <img
              src="/images/samsung-pic/samsung-logo.png"
              alt="Samsung"
              loading="lazy"
              className="mx-auto lg:mx-0 mb-2 sm:mb-5 w-8 sm:w-20 opacity-95"
            />
            <span className="mb-1 sm:mb-3 inline-block text-[8px] sm:text-sm tracking-[0.5px] sm:tracking-[3px] uppercase text-neutral-500 dark:text-neutral-400">
              {isRTL ? "اکوسیستم Galaxy AI" : "Galaxy AI Ecosystem"}
            </span>
            <h2 className="mb-2 sm:mb-4 text-base sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              {isRTL ? "قدرت واقعی Galaxy در اتصال آن است" : "The Power of Galaxy is Connection"}
            </h2>
            <p className="text-[10px] sm:text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
              {isRTL
                ? "گوشی، تبلت، ساعت و Galaxy Buds در یک اکوسیستم هوشمند."
                : "Your phone, tablet, watch and Galaxy Buds work together."}
            </p>
            <div className="mt-2 sm:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-3 lg:justify-start">
              <button
                onClick={() => navigate("/products?brand=Samsung")}
                className="rounded-full bg-blue-600 px-3 sm:px-6 py-1 sm:py-3 text-[10px] sm:text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {isRTL ? "مشاهده محصولات" : "Explore Devices"}
              </button>
              <button className="rounded-full border-2 border-blue-500 px-3 sm:px-6 py-1 sm:py-3 text-[10px] sm:text-sm font-bold text-blue-500 transition hover:bg-blue-500 hover:text-white">
                Galaxy AI
              </button>
            </div>
          </div>

          <div className="flex flex-1 w-full items-center justify-center">
            <img
              src="/images/samsung-pic/samsung-products-main.png"
              alt="Samsung Galaxy Ecosystem"
              loading="lazy"
              className="w-full max-w-[150px] sm:max-w-[360px] lg:max-w-[420px] h-auto object-contain"
            />
          </div>
        </div>

        <div className="relative mx-auto mt-4 sm:mt-14 max-w-[1200px]">
          {samsungLoading ? (
            <div className={`grid ${getGridCols()} gap-1.5 sm:gap-6`}>
              {Array.from({ length: maxSamsungProducts }).map((_, i) => (
                <ProductCardSkeleton key={i} compact={isMobile} />
              ))}
            </div>
          ) : (
            <div className={`grid ${getGridCols()} gap-1.5 sm:gap-6`}>
              {samsungProducts && samsungProducts.length > 0 ? (
                samsungProducts.slice(0, maxSamsungProducts).map((product) => (
                  <SamsungCard key={product._id || product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
                  {isRTL ? "محصولات سامسونگ یافت نشد" : "No Samsung products found"}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
 <BrandWaveSlider />
      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default Home;