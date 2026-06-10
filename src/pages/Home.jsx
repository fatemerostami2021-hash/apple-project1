import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import HeroSlider from "../components/home/HeroSlider";
import FilterBar from "../components/FilterBar";
import QuickViewModal from "../components/QuickViewModal";
import BrandWaveSlider from "../components/BrandWaveSlider";
import FloatingGoldText from "../animations/FloatingGoldText";
import { SEOHead } from "../components/seo/SEOHead";
import OptimizedImage from "../components/ui/OptimizedImage";
import { ProductGridSkeleton, ErrorMessage } from "../components/ui/Skeletons";

import { getProducts, getSamsungProducts } from "../api/index";
import productsDataFallback from "../data/products.json";
import samsungProductsFallback from "../data/samsungProducts";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../components/samsung/SamsungCard.css";
import "../components/product/SamsungProductModal.css";

// Lazy load components
const ProductCard = lazy(() => import("../components/product/ProductCard"));
const SamsungCard = lazy(() => import("../components/samsung/SamsungCard.jsx"));

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "fa";
  const lang = i18n.language;

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);
  const [samsungProducts, setSamsungProducts] = useState([]);
  const [samsungLoading, setSamsungLoading] = useState(true);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.95]);

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const productsData = await getProducts();
      console.log("Products loaded:", productsData);
      setProducts(Array.isArray(productsData) ? productsData : []);
    } catch (err) {
      console.error("API error:", err);
      setProducts(productsDataFallback);
      setProductsError("اتصال به سرور برقرار نشد — داده‌های آفلاین");
    } finally {
      setProductsLoading(false);
    }
  }, []);

  const fetchSamsung = useCallback(async () => {
    setSamsungLoading(true);
    try {
      const samsungData = await getSamsungProducts();
      console.log("Samsung loaded:", samsungData);
      setSamsungProducts(Array.isArray(samsungData) ? samsungData : []);
    } catch (err) {
      console.error("Samsung API error:", err);
      setSamsungProducts(samsungProductsFallback);
    } finally {
      setSamsungLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchSamsung();
  }, [fetchProducts, fetchSamsung]);

  const safeProducts = Array.isArray(products) ? products : [];
  
  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return safeProducts;
    return safeProducts.filter(
      (p) =>
        p.brand?.toLowerCase() === activeFilter.toLowerCase() ||
        p.category?.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [safeProducts, activeFilter]);

  const appleProducts = useMemo(() => {
    return safeProducts.filter((p) => p.brand?.toLowerCase() === "apple").slice(0, 6);
  }, [safeProducts]);

  const getLangText = useCallback(
    (data) => {
      if (!data) return "";
      return typeof data === "object" ? (data[lang] || data.en || "") : data;
    },
    [lang]
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isRTL ? "rtl" : "ltr"}`}>
      <SEOHead 
        title={isRTL ? "تک‌کرانچ | فروشگاه اپل و سامسونگ" : "TechCrunch | Apple & Samsung Store"}
        description={isRTL ? "فروشگاه تخصصی محصولات اپل و سامسونگ با بهترین قیمت‌ها" : "Specialized Apple and Samsung products store with best prices"}
        url="/"
        lang={lang}
      />

      <HeroSlider />
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      {/* FEATURED PRODUCTS SECTION */}
      <section className="py-12 w-full overflow-hidden">
        <div className="w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-[#D4AF37] mb-2">
              {t("home.featured_products")}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto rounded-full" />
          </motion.div>

          {productsError && !productsLoading && (
            <p className="text-center text-xs text-amber-500 mb-4">{productsError}</p>
          )}

          {productsLoading ? (
            <ProductGridSkeleton count={6} />
          ) : filteredProducts.length === 0 ? (
            <ErrorMessage message="محصولی یافت نشد" onRetry={fetchProducts} />
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={25}
              slidesPerView={1.2}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              speed={800}
              loop={filteredProducts.length > 3}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 25 },
                1280: { slidesPerView: 5, spaceBetween: 25 },
                1536: { slidesPerView: 6, spaceBetween: 30 },
              }}
              className="pb-12"
            >
              {filteredProducts.map((p) => (
                <SwiperSlide key={p.id || p._id}>
                  <Suspense fallback={<ProductGridSkeleton count={1} />}>
                    <ProductCard product={p} onQuickView={setSelectedProduct} enableLink={true} />
                  </Suspense>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      <BrandWaveSlider />

      {/* APPLE PRODUCTS SHOWCASE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-transparent via-neutral-50/50 to-transparent dark:via-neutral-900/20"
      >
        <FloatingGoldText />
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div variants={fadeInUp} className="relative z-10">
            <div className="mb-12">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                src="/images/apple-logo.png"
                className="w-14 h-14 mb-6 dark:invert opacity-90"
                alt="Apple"
              />
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                {isRTL ? "دنیای محصولات اپل" : "The Apple Experience"}
              </h2>
              <p className="text-neutral-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                {isRTL
                  ? "منتخبی از محبوب‌ترین محصولات اپل با طراحی مینیمال و عملکرد فوق‌العاده."
                  : "Explore Apple's most iconic devices with premium design and incredible performance."}
              </p>
            </div>

            {productsLoading ? (
              <ProductGridSkeleton count={6} />
            ) : (
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {appleProducts.map((product, idx) => (
                  <AppleProductCard
                    key={product.id || product._id || idx}
                    product={product}
                    isRTL={isRTL}
                    getLangText={getLangText}
                    delay={idx * 0.05}
                    onClick={() => product.slug && navigate(`/article/${product.slug}`)}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-amber-500/20 to-blue-500/20 blur-3xl rounded-full" />
            <OptimizedImage
              src="/images/apple-products-main.png"
              alt="Apple Products"
              priority
              className="relative w-full max-w-2xl drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* SAMSUNG ECOSYSTEM SECTION */}
      <section className="samsung-ecosystem-section relative overflow-hidden">
        <div className="samsung-bg-glow absolute inset-0 pointer-events-none" />
        
        <div className="samsung-hero-content">
          <div className="samsung-hero-text">
            <OptimizedImage
              src="/images/samsung-pic/samsung-logo.png"
              alt="Samsung"
              className="samsung-logo"
            />
            <span className="samsung-mini">
              {isRTL ? "اکوسیستم Galaxy AI" : "Galaxy AI Ecosystem"}
            </span>
            <h2 className="samsung-heading">
              {isRTL ? "قدرت واقعی Galaxy در اتصال آن است" : "The Power of Galaxy is Connection"}
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
            <OptimizedImage
              src="/images/samsung-pic/samsung-products-main.png"
              alt="Samsung Galaxy Ecosystem"
              className="samsung-hero-image"
              priority
            />
          </div>
        </div>

        <div className="samsung-products-wrapper">
          {samsungLoading ? (
            <div className="samsung-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="samsung-grid">
              {samsungProducts.map((product) => (
                <SamsungCard
                  key={product.id || product._id}
                  product={product}
                  isRTL={isRTL}
                  onOpen={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

// Apple Product Card Component
const AppleProductCard = ({ product, isRTL, getLangText, delay = 0, onClick }) => {
  const name = getLangText(product.name) || product.name || "";
  const thumb = product.thumbnail || product.image || "";
  const price = product.price ? `$${product.price.toLocaleString()}` : "";
  const desc = getLangText(product.description) || (isRTL ? "محصول اپل با طراحی مینیمال." : "Apple product with premium design.");

  return (
    <motion.div
      variants={fadeInUp}
      custom={delay}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl p-4 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300"
    >
      <div className="h-32 flex items-center justify-center mb-3 overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
        <OptimizedImage
          src={thumb}
          alt={name}
          className="h-28 w-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1 line-clamp-1">{name}</h3>
      <p className="text-xs text-neutral-500 dark:text-gray-400 line-clamp-2 mb-2">{desc}</p>
      <div className="flex items-center justify-between">
        <span className="font-bold text-neutral-900 dark:text-[#D4AF37] text-sm">{price}</span>
        <button className="px-3 py-1.5 text-xs rounded-full bg-neutral-900 text-white dark:bg-[#D4AF37] dark:text-black font-semibold hover:opacity-80 transition">
          {isRTL ? "مشاهده" : "View"}
        </button>
      </div>
    </motion.div>
  );
};

export default Home;
