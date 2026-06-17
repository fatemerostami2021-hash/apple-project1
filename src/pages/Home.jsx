import React, { useState, useEffect } from "react";
import HeroSlider from "../components/home/HeroSlider";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import FloatingGoldText from "../animations/FloatingGoldText";
import { HiOutlineShoppingCart, HiOutlineEye, HiOutlineCheck } from "react-icons/hi";

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

const Home = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});

  const { add } = useCart();

  const { products: allProducts, loading, error } = useProducts();
  const { products: appleProducts, loading: appleLoading } = useProducts("Apple");
  const { products: samsungProducts, loading: samsungLoading } = useProducts("Samsung");

  const [filteredProducts, setFilteredProducts] = useState([]);

  const getLangText = (data) => {
    if (!data) return "";
    if (typeof data === 'string') return data;
    return data[i18n.language] || data.en || "";
  };

  useEffect(() => {
    if (!allProducts || !allProducts.length) {
      setFilteredProducts([]);
      return;
    }

    if (activeFilter === "All") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (p) =>
          (p.brand && p.brand.toLowerCase() === activeFilter.toLowerCase()) ||
          (p.category && p.category.toLowerCase() === activeFilter.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [activeFilter, allProducts]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    add(product, 1);
    setAddedToCart(prev => ({ ...prev, [product._id || product.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product._id || product.id]: false }));
    }, 2000);
  };

  if (loading || appleLoading || samsungLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8F5FF] dark:bg-transparent">
        <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
          ⏳ {isRTL ? "در حال بارگذاری..." : "Loading..."}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F5FF] dark:bg-transparent gap-4">
        <div className="text-2xl font-bold text-red-500">
          ❌ {isRTL ? "خطا در بارگذاری محصولات" : "Error loading products"}
        </div>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C5A027] transition font-bold"
        >
          {isRTL ? "تلاش مجدد" : "Retry"}
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isRTL ? "rtl" : "ltr"}`}>
      
      <HeroSlider />
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <section className="py-6 w-full">
        <div className="w-full px-6">
          <h2 className="text-3xl font-black text-center mb-4 transition-all duration-300 cursor-default text-neutral-900 hover:text-neutral-600 dark:text-[#D4AF37] dark:hover:text-amber-400 dark:drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            {t("home.featured_products") || (isRTL ? "محصولات ویژه" : "Featured Products")}
          </h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1.2}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={1000}
            loop={true}
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
        </div>
      </section>

      <BrandWaveSlider />
     
      {/* ============================================================ */}
      {/* APPLE PRODUCTS SHOWCASE - نسخه حرفه‌ای */}
      {/* ============================================================ */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-neutral-900">
        <FloatingGoldText />
        
        <div className="container mx-auto px-4 md:px-6">
          
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src="/images/apple-logo.png"
                className="w-10 h-10 dark:invert opacity-90"
                alt="Apple"
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white">
                {isRTL ? "دنیای محصولات اپل" : "The Apple Experience"}
              </h2>
            </div>
            <p className="text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              {isRTL
                ? "منتخبی از محبوب‌ترین محصولات اپل با طراحی مینیمال و عملکرد فوق‌العاده."
                : "Explore Apple's most iconic devices with premium design and incredible performance."}
            </p>
            <div className="w-20 h-1 bg-[#D4AF37] rounded-full mx-auto mt-4" />
          </motion.div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {appleProducts && appleProducts.length > 0 ? (
              appleProducts.slice(0, 10).map((product, index) => {
                const isAdded = addedToCart[product._id || product.id];
                return (
                  <motion.div
                    key={product._id || index}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative bg-white dark:bg-neutral-900/80 border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="flex items-center justify-center h-36 md:h-40 mb-3 bg-gray-50 dark:bg-neutral-800/50 rounded-xl overflow-hidden">
                      <img
                        src={product.thumbnail || '/images/placeholder.png'}
                        alt={getLangText(product.name)}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.src = '/images/placeholder.png'; }}
                      />
                    </div>

                    {/* Info */}
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[40px]">
                        {getLangText(product.name)}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[32px]">
                        {getLangText(product.description)}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-lg font-black text-[#D4AF37]">
                          {product.price?.toLocaleString()} 
                          <span className="text-xs font-normal text-gray-400 mr-1">{isRTL ? 'تومان' : 'Toman'}</span>
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="mt-3 flex gap-2">
                        {/* دکمه مشاهده مقاله */}
                        <button
                          onClick={() => window.location.href = `/product/${product.slug || product._id}`}
                          className="flex-1 px-3 py-2 bg-[#D4AF37] text-black rounded-xl hover:bg-[#C5A027] transition text-xs font-bold flex items-center justify-center gap-1"
                        >
                          <HiOutlineEye size={14} />
                          {isRTL ? 'مشاهده' : 'View'}
                        </button>

                        {/* دکمه خرید */}
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`flex-1 px-3 py-2 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1 ${
                            isAdded 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-900 dark:bg-[#D4AF37] text-white dark:text-black hover:opacity-90'
                          }`}
                        >
                          {isAdded ? (
                            <><HiOutlineCheck size={14} /> {isRTL ? 'افزوده شد' : 'Added'}</>
                          ) : (
                            <><HiOutlineShoppingCart size={14} /> {isRTL ? 'خرید' : 'Buy'}</>
                          )}
                        </button>
                      </div>

                      {/* Brand Badge */}
                      <span className="inline-block mt-2 text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
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

          {/* دکمه مشاهده همه */}
          {appleProducts && appleProducts.length > 10 && (
            <div className="text-center mt-10">
              <button
                onClick={() => window.location.href = '/products?brand=Apple'}
                className="px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition font-bold text-sm"
              >
                {isRTL ? 'مشاهده همه محصولات اپل →' : 'View All Apple Products →'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SAMSUNG ECOSYSTEM SECTION */}
      {/* ============================================================ */}
      <section className="samsung-ecosystem-section">
        <div className="samsung-bg-glow"></div>

        <div className="samsung-hero-content">
          <div className="samsung-hero-text">
            <img src="/images/samsung-pic/samsung-logo.png" alt="Samsung" className="samsung-logo" />
            <span className="samsung-mini">
              {isRTL ? "اکوسیستم Galaxy AI" : "Galaxy AI Ecosystem"}
            </span>
            <h2 className="samsung-heading">
              {isRTL
                ? "قدرت واقعی Galaxy در اتصال آن است"
                : "The Power of Galaxy is Connection"}
            </h2>
            <p className="samsung-description">
              {isRTL
                ? "گوشی، تبلت، ساعت و Galaxy Buds در یک اکوسیستم هوشمند کنار هم کار می‌کنند."
                : "Your phone, tablet, watch and Galaxy Buds work together in one intelligent ecosystem."}
            </p>
            <div className="samsung-hero-buttons">
              <button className="samsung-primary-btn">
                {isRTL ? "مشاهده محصولات" : "Explore Devices"}
              </button>
              <button className="samsung-secondary-btn">Galaxy AI</button>
            </div>
          </div>
          <div className="samsung-hero-image-wrap">
            <img
              src="/images/samsung-pic/samsung-products-main.png"
              alt="Samsung Galaxy Ecosystem"
              className="samsung-hero-image"
            />
          </div>
        </div>

        <div className="samsung-products-wrapper">
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
        </div>
      </section>

      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Home;
