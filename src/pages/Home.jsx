import React, { useState, useEffect } from "react";
import HeroSlider from "../components/home/HeroSlider";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import productsData from "../data/products.json";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import FloatingGoldText from "../animations/FloatingGoldText";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import SamsungCard from "../components/samsung/SamsungCard.jsx";
import samsungProducts from "../data/samsungProducts";

import "../components/samsung/SamsungCard.css";
import "../components/product/SamsungProductModal.css";
import BrandWaveSlider from "../components/BrandWaveSlider";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Home = () => {
  const { t, i18n } = useTranslation();

  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const isRTL = i18n.language === "fa";

  // فیلتر کردن محصولات برای بخش اپل
  const appleProducts = productsData.filter(
    (p) => p.brand.toLowerCase() === "apple"
  );

  // تابع کمکی برای نمایش متن بر اساس زبان (جلوگیری از خطای React Child)
  const getLangText = (data) => {
    if (!data) return "";
    return data[i18n.language] || data.en || "";
  };

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProducts(productsData);
    } else {
      const filtered = productsData.filter(
        (p) =>
          p.brand.toLowerCase() === activeFilter.toLowerCase() ||
          p.category.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [activeFilter, i18n.language]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      {/* HERO */}
      <HeroSlider />

      {/* FILTER */}
      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* FEATURED SWIPER SECTION */}
      <section className="py-6 w-full">
        <div className="w-full px-6">
          <h2
            className="
            text-3xl font-black text-center mb-4
            transition-all duration-300 cursor-default
            text-neutral-900 hover:text-neutral-600
            dark:text-[#D4AF37] dark:hover:text-amber-400
            dark:drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]
            "
          >
            {t("home.featured_products")}
          </h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1.2}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
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
              <SwiperSlide key={p.id}>
                <ProductCard product={p} onQuickView={setSelectedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

     <BrandWaveSlider />
     
{/* APPLE PRODUCTS SHOWCASE SECTION */}
<section className="relative w-full py-24 overflow-hidden">
  <FloatingGoldText />
 <div className="relative z-10">
    {/* content */}
  </div>

<div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

    {/* LEFT SIDE */}
    <div className="relative z-10">

      {/* HEADER */}
      <div className="mb-12 max-w-xl">
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          src="/images/apple-logo.png"
          className="w-14 h-14 mb-6 dark:invert opacity-90"
          alt="Apple"
        />

        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          {isRTL ? "دنیای محصولات اپل" : "The Apple Experience"}
        </h2>

        <p className="text-neutral-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
          {isRTL
            ? "منتخبی از محبوب‌ترین محصولات اپل با طراحی مینیمال و عملکرد فوق‌العاده."
            : "Explore Apple's most iconic devices with premium design and incredible performance."}
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* PRODUCT 1 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          onClick={() => setSelectedProduct(appleProducts[0])}
          className="group cursor-pointer rounded-3xl p-5 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:shadow-2xl transition-all duration-300"
        >
          <div className="h-44 flex items-center justify-center mb-4">
            <img
              src="/images/iphone17-pro.png"
              alt="iPhone 17 Pro"
              className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
            iPhone 17 Pro
          </h3>

          <p className="text-xs text-neutral-600 dark:text-gray-400 line-clamp-2 mb-4">
            {isRTL
              ? "آیفون نسل جدید با طراحی حرفه‌ای و عملکرد فوق‌العاده."
              : "Next-generation iPhone with premium design and exceptional performance."}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-900 dark:text-white">
              $999
            </span>

            <button className="px-3 py-1.5 text-xs rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black">
              {isRTL ? "مشاهده" : "View"}
            </button>
          </div>
        </motion.div>

        {/* PRODUCT 2 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          onClick={() => setSelectedProduct(appleProducts[1])}
          className="group cursor-pointer rounded-3xl p-5 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:shadow-2xl transition-all duration-300"
        >
          <div className="h-44 flex items-center justify-center mb-4">
            <img
              src="/images/iphone17-pro-max.png"
              alt="iPhone 17 Pro Max"
              className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
            iPhone 17 Pro Max
          </h3>

          <p className="text-xs text-neutral-600 dark:text-gray-400 line-clamp-2 mb-4">
            {isRTL
              ? "بزرگ‌ترین و قدرتمندترین آیفون اپل."
              : "The largest and most powerful iPhone ever."}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-900 dark:text-white">
              $1399
            </span>

            <button className="px-3 py-1.5 text-xs rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black">
              {isRTL ? "مشاهده" : "View"}
            </button>
          </div>
        </motion.div>

        {/* PRODUCT 3 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          onClick={() => setSelectedProduct(appleProducts[2])}
          className="group cursor-pointer rounded-3xl p-5 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:shadow-2xl transition-all duration-300"
        >
          <div className="h-44 flex items-center justify-center mb-4">
            <img
              src="/images/iphone-17-pro-max-black.png"
              alt="iPhone 17 Pro Max Black"
              className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
            iPhone 17 Pro Max Black
          </h3>

          <p className="text-xs text-neutral-600 dark:text-gray-400 line-clamp-2 mb-4">
            {isRTL
              ? "نسخه مشکی پریمیوم با طراحی خاص."
              : "Premium black edition with a stunning finish."}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-900 dark:text-white">
              $1449
            </span>

            <button className="px-3 py-1.5 text-xs rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black">
              {isRTL ? "مشاهده" : "View"}
            </button>
          </div>
        </motion.div>

        {/* PRODUCT 4 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          onClick={() => setSelectedProduct(appleProducts[3])}
          className="group cursor-pointer rounded-3xl p-5 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:shadow-2xl transition-all duration-300"
        >
          <div className="h-44 flex items-center justify-center mb-4">
            <img
              src="/images/apple-watch-ultra.png"
              alt="Apple Watch Ultra"
              className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
            Apple Watch Ultra
          </h3>

          <p className="text-xs text-neutral-600 dark:text-gray-400 line-clamp-2 mb-4">
            {isRTL
              ? "ساعت هوشمند حرفه‌ای اپل برای ورزش و سلامت."
              : "Professional Apple smartwatch for fitness and health."}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-900 dark:text-white">
              $299
            </span>

            <button className="px-3 py-1.5 text-xs rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black">
              {isRTL ? "مشاهده" : "View"}
            </button>
          </div>
        </motion.div>

        {/* PRODUCT 5 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          onClick={() => setSelectedProduct(appleProducts[4])}
          className="group cursor-pointer rounded-3xl p-5 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:shadow-2xl transition-all duration-300"
        >
          <div className="h-44 flex items-center justify-center mb-4">
            <img
              src="/images/mac-pro-m4.png"
              alt="Mac Pro M4"
              className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
            Mac Pro M4
          </h3>

          <p className="text-xs text-neutral-600 dark:text-gray-400 line-clamp-2 mb-4">
            {isRTL
              ? "قدرت بی‌نظیر برای کارهای حرفه‌ای و سنگین."
              : "Extreme performance for professional workflows."}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-900 dark:text-white">
              $1299
            </span>

            <button className="px-3 py-1.5 text-xs rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black">
              {isRTL ? "مشاهده" : "View"}
            </button>
          </div>
        </motion.div>

        {/* PRODUCT 6 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          onClick={() => setSelectedProduct(appleProducts[5])}
          className="group cursor-pointer rounded-3xl p-5 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:shadow-2xl transition-all duration-300"
        >
          <div className="h-44 flex items-center justify-center mb-4">
            <img
              src="/images/imac-24-silver.png"
              alt="iMac 24 Silver"
              className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
            iMac 24 Silver
          </h3>

          <p className="text-xs text-neutral-600 dark:text-gray-400 line-clamp-2 mb-4">
            {isRTL
              ? "آی‌مک مینیمال با نمایشگر فوق‌العاده."
              : "Minimal all‑in‑one desktop with a stunning display."}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-900 dark:text-white">
              $1599
            </span>

            <button className="px-3 py-1.5 text-xs rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black">
              {isRTL ? "مشاهده" : "View"}
            </button>
          </div>
        </motion.div>

      </div>
    </div>

    {/* RIGHT SIDE HERO IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative flex justify-center lg:justify-end"
    >
      <div className="absolute w-[600px] h-[600px] bg-neutral-300/20 dark:bg-white/10 blur-3xl rounded-full"></div>

      <img
        src="/images/apple-products-main.png"
        alt="Apple Products"
        className="relative w-full max-w-3xl xl:max-w-4xl object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
      />
    </motion.div>

  </div>
</section>
{/* ================================= */}
{/* SAMSUNG ECOSYSTEM SECTION */}
{/* ================================= */}

<section className="samsung-ecosystem-section">

  {/* BG EFFECT */}
  <div className="samsung-bg-glow"></div>

  {/* ================================= */}
  {/* HERO */}
  {/* ================================= */}

  <div className="samsung-hero-content">

    {/* LEFT CONTENT */}
    <div className="samsung-hero-text">

      <img
        src="/images/samsung-pic/samsung-logo.png"
        alt="Samsung"
        className="samsung-logo"
      />

      <span className="samsung-mini">
        {isRTL ? "اکوسیستم Galaxy AI" : "Galaxy AI Ecosystem"}
      </span>
<h2
  className="samsung-heading"
  onMouseMove={(e) => {

    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.target.style.setProperty('--x', `${x}px`);
    e.target.style.setProperty('--y', `${y}px`);

  }}
>
  {isRTL
    ? "قدرت واقعی Galaxy در اتصال آن است"
    : "The Power of Galaxy is Connection"}
</h2>


      <p className="samsung-description">
        {isRTL
          ? "گوشی، تبلت، ساعت و Galaxy Buds در یک اکوسیستم هوشمند کنار هم کار می‌کنند تا تجربه‌ای سریع‌تر، ساده‌تر و یکپارچه‌تر از فناوری سامسونگ داشته باشید."
          : "Your phone, tablet, watch and Galaxy Buds work together in one intelligent ecosystem to create a faster, simpler and more connected Samsung experience."}
      </p>

      <div className="samsung-hero-buttons">

        <button className="samsung-primary-btn">
          {isRTL ? "مشاهده محصولات" : "Explore Devices"}
        </button>

        <button className="samsung-secondary-btn">
          Galaxy AI
        </button>

      </div>

    </div>

    {/* RIGHT IMAGE */}
    <div className="samsung-hero-image-wrap">

      <img
        src="/images/samsung-pic/samsung-products-main.png"
        alt="Samsung Galaxy Ecosystem"
        className="samsung-hero-image"
      />

    </div>

  </div>

  {/* ================================= */}
  {/* PRODUCTS GRID */}
  {/* ================================= */}

  <div className="samsung-products-wrapper">

    <div className="samsung-grid">

      {samsungProducts.map((product) => (
        <SamsungCard
          key={product.id}
          product={product}
          isRTL={isRTL}
          onOpen={setSelectedProduct}
        />
      ))}

    </div>

  </div>

</section>






      {/* QUICK VIEW */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Home;
