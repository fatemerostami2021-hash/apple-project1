import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/home/HeroSlider";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
import { articleMap } from "../components/product/articleMap";
import { getLangText, getProductName } from "../utils/helpers";

/* ════════════════════════════════════════
   Skeleton
════════════════════════════════════════ */
function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl p-4 bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 animate-pulse">
      <div className="h-36 md:h-40 mb-3 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-3.5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800 mb-2" />
      <div className="h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800 mb-3" />
      <div className="h-8 w-full rounded-xl bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
}

function SectionSkeleton({ count = 5 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );
}

/* ════════════════════════════════════════
   Home
════════════════════════════════════════ */
const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRTL = lang === "fa";

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});

  const { add } = useCart();

  const { products: allProducts, loading: allLoading, error: allError } = useProducts();
  const { products: appleProducts, loading: appleLoading } = useProducts("Apple");
  const { products: samsungProducts, loading: samsungLoading } = useProducts("Samsung");

  const filteredProducts = useMemo(() => {
    if (!allProducts?.length) return [];
    if (activeFilter === "All") return allProducts;
    return allProducts.filter(p =>
      (p.brand && p.brand.toLowerCase() === activeFilter.toLowerCase()) ||
      (p.category && p.category.toLowerCase() === activeFilter.toLowerCase())
    );
  }, [activeFilter, allProducts]);

  const handleAddToCart = useCallback((product, e) => {
    e.stopPropagation();
    add(product, 1);
    const key = product._id || product.id;
    setAddedToCart(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [key]: false }));
    }, 2000);
  }, [add]);

  const handleViewProduct = useCallback((product) => {
    const slug = product.slug || product._id || product.id;
    const articleSlug = articleMap[slug] || slug;
    
    if (articleSlug && articleSlug !== slug) {
      navigate(`/articles/${articleSlug}`);
    } else {
      navigate(`/product/${slug}`);
    }
  }, [navigate]);

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-transparent ${isRTL ? "rtl" : "ltr"}`}>

      <HeroSlider />
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* ════════════════════ Featured Swiper ════════════════════ */}
      <section className="py-6 w-full">
        <div className="w-full px-6">
          <h2 className="text-3xl font-black text-center mb-4 transition-colors duration-300 text-neutral-900 dark:text-amber-400">
            {t("home.featured_products") || (isRTL ? "محصولات ویژه" : "Featured Products")}
          </h2>

          {allLoading ? (
            <div className="pb-10"><SectionSkeleton count={6} /></div>
          ) : allError ? (
            <div className="text-center py-10 text-neutral-500 dark:text-neutral-400 text-sm">
              {isRTL ? "محصولات ویژه قابل بارگذاری نیستند" : "Featured products unavailable"}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 dark:text-neutral-400 text-sm">
              {isRTL ? "محصولی یافت نشد" : "No products found"}
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={1.2}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              speed={1000}
              loop={filteredProducts.length > 6}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 6 },
              }}
              className="pb-10"
            >
              {filteredProducts.map((p) => (
                <SwiperSlide key={p._id || p.id}>
                  <ProductCard product={p} onQuickView={setSelectedProduct} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      <BrandWaveSlider />

      {/* ════════════════════ Apple Showcase ════════════════════ */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-transparent transition-colors duration-300">
        <FloatingGoldText />

        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            {/* لوگوی بزرگتر اپل */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="/images/apple-logo.png" 
                className="w-16 h-16 md:w-20 md:h-20 dark:invert opacity-95" 
                alt="Apple" 
              />
              <div className="h-10 w-px bg-amber-500/30" />
              <span className="text-sm font-bold text-amber-500 tracking-[0.3em] uppercase">
                {isRTL ? "اکوسیستم کامل" : "Complete Ecosystem"}
              </span>
            </div>

            {/* عنوان بزرگتر و برندینگ قوی‌تر */}
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-neutral-900 dark:text-white leading-tight">
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
            
            {/* زیرنویس برندینگ */}
            <p className="text-lg md:text-xl text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 font-light tracking-wide">
              {isRTL
                ? "از آیفون تا مک، هر آنچه برای تجربه‌ای بی‌نظیر نیاز دارید"
                : "From iPhone to Mac, everything you need for an unparalleled experience"}
            </p>
            
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto mt-6" />
          </motion.div>

          {appleLoading ? (
            <SectionSkeleton count={10} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {appleProducts && appleProducts.length > 0 ? (
                appleProducts.slice(0, 10).map((product, index) => {
                  const isAdded = addedToCart[product._id || product.id];
                  const productSlug = product.slug || product._id || product.id;
                  const articleSlug = articleMap[productSlug] || productSlug;
                  const hasArticle = articleSlug !== productSlug;
                  const productName = getProductName(product, lang);

                  return (
                    <motion.div
                      key={product._id || index}
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:border-amber-400/50 dark:hover:border-amber-500/50 transition-all duration-300 overflow-hidden"
                    >
                      {/* Product Image */}
                      <div className="flex items-center justify-center h-36 md:h-40 mb-3 bg-gray-50 dark:bg-neutral-800/50 rounded-xl overflow-hidden">
                        <img
                          src={product.thumbnail || "/images/placeholder.png"}
                          alt={productName}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { e.currentTarget.src = "/images/placeholder.png"; }}
                        />
                      </div>

                      <div className={isRTL ? "text-right" : "text-left"}>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[40px]">
                          {productName}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[32px]">
                          {getLangText(product.description, lang)}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-lg font-black text-amber-500 dark:text-amber-400">
                            {product.price?.toLocaleString()}
                            <span className="text-xs font-normal text-gray-400 mr-1">{isRTL ? "تومان" : "Toman"}</span>
                          </span>
                        </div>

                        {/* ===== دکمه‌ها ===== */}
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="flex-1 px-3 py-2 bg-amber-500 text-black rounded-xl hover:bg-amber-600 transition text-xs font-bold flex items-center justify-center gap-1 group"
                            title={hasArticle ? (isRTL ? "مشاهده مقاله" : "View Article") : (isRTL ? "مشاهده محصول" : "View Product")}
                          >
                            <HiOutlineEye size={14} className="group-hover:scale-110 transition" />
                            {hasArticle ? (isRTL ? "مقاله" : "Article") : (isRTL ? "مشاهده" : "View")}
                            {hasArticle && <HiOutlineArrowRight size={12} className="group-hover:translate-x-1 transition" />}
                          </button>

                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            className={`flex-1 px-3 py-2 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1 ${
                              isAdded
                                ? "bg-green-500 text-white"
                                : "bg-gray-900 dark:bg-amber-500 text-white dark:text-black hover:opacity-90"
                            }`}
                          >
                            {isAdded ? (
                              <><HiOutlineCheck size={14} /> {isRTL ? "افزوده شد" : "Added"}</>
                            ) : (
                              <><HiOutlineShoppingCart size={14} /> {isRTL ? "خرید" : "Buy"}</>
                            )}
                          </button>
                        </div>

                        {/* Badge مقاله */}
                        {hasArticle && (
                          <span className="inline-block mt-2 text-[8px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                            📄 {isRTL ? "مقاله دارد" : "Has Article"}
                          </span>
                        )}

                        <span className="inline-block mt-1 text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider ml-2">
                          {product.brand}
                        </span>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-20">
                  {isRTL ? "محصولات اپل یافت نشد" : "No Apple products found"}
                </div>
              )}
            </div>
          )}

          {appleProducts && appleProducts.length > 10 && (
            <div className="text-center mt-10">
              <button
                onClick={() => navigate("/products?brand=Apple")}
                className="px-8 py-3 border-2 border-amber-500 text-amber-500 dark:text-amber-400 rounded-full hover:bg-amber-500 hover:text-black transition font-bold text-sm group"
              >
                {isRTL ? "مشاهده همه محصولات اپل" : "View All Apple Products"}
                <HiOutlineArrowRight className={`inline ml-2 group-hover:translate-x-1 transition ${isRTL ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════ Samsung Ecosystem ════════════════════ */}
      <section className="samsung-ecosystem-section">
        <div className="samsung-bg-glow" />

        <div className="samsung-hero-content">
          <div className="samsung-hero-text">
            <img src="/images/samsung-pic/samsung-logo.png" alt="Samsung" className="samsung-logo" />
            <span className="samsung-mini">{isRTL ? "اکوسیستم Galaxy AI" : "Galaxy AI Ecosystem"}</span>
            <h2 className="samsung-heading">
              {isRTL ? "قدرت واقعی Galaxy در اتصال آن است" : "The Power of Galaxy is Connection"}
            </h2>
            <p className="samsung-description">
              {isRTL
                ? "گوشی، تبلت، ساعت و Galaxy Buds در یک اکوسیستم هوشمند کنار هم کار می‌کنند."
                : "Your phone, tablet, watch and Galaxy Buds work together in one intelligent ecosystem."}
            </p>
            <div className="samsung-hero-buttons">
              <button onClick={() => navigate("/products?brand=Samsung")} className="samsung-primary-btn">
                {isRTL ? "مشاهده محصولات" : "Explore Devices"}
              </button>
              <button className="samsung-secondary-btn">Galaxy AI</button>
            </div>
          </div>
          <div className="samsung-hero-image-wrap">
            <img
              src="/images/samsung-pic/samsung-products-main.png"
              alt="Samsung Galaxy Ecosystem"
              loading="lazy"
              className="samsung-hero-image"
            />
          </div>
        </div>

        <div className="samsung-products-wrapper">
          {samsungLoading ? (
            <div className="samsung-grid">
              {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="samsung-grid">
              {samsungProducts && samsungProducts.length > 0 ? (
                samsungProducts.slice(0, 8).map((product) => (
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

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default Home;
