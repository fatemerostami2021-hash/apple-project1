import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ProductCard from "./product/ProductCard";
import FeaturedBackground from "../animations/FeaturedBackground";

export default function FeaturedProducts({ 
  products, 
  darkMode = false, 
  language = "en",
  title,
  subtitle,
  limit = 8,
  className = ""
}) {
  const navigate = useNavigate();
  const isFa = language === "fa";

  // جلوگیری از رندر مجدد Swiper
  const stableProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.slice(0, limit);
  }, [products, limit]);

  if (!stableProducts || stableProducts.length === 0) {
    return null;
  }

  // متن‌های پیش‌فرض
  const defaultContent = {
    en: {
      title: "Featured Products",
      subtitle: "Experience the future of innovation."
    },
    fa: {
      title: "محصولات ویژه",
      subtitle: "آینده نوآوری را تجربه کنید."
    }
  };

  const t = {
    title: title || defaultContent[language]?.title || defaultContent.en.title,
    subtitle: subtitle || defaultContent[language]?.subtitle || defaultContent.en.subtitle
  };

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <section
      dir={isFa ? "rtl" : "ltr"}
      className={`relative overflow-hidden py-20 w-full bg-gray-50 dark:bg-black transition-colors duration-500 ${className}`}
    >
      <FeaturedBackground darkMode={darkMode} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`mb-12 ${isFa ? "text-center md:text-right" : "text-center md:text-left"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white transition-colors duration-300">
            {t.title}
          </h2>
          <p className="text-neutral-500 dark:text-neutral-300 mt-2 text-lg transition-colors duration-300">
            {t.subtitle}
          </p>
          <div className="w-20 h-1 bg-[#D4AF37] rounded-full mt-3 mx-auto md:mx-0" />
        </div>

        {/* Swiper */}
        <Swiper
          className="!pb-12"
          spaceBetween={24}
          slidesPerView={1.2}
          grabCursor={true}
          watchSlidesProgress={true}
          observer={true}
          observeParents={true}
          breakpoints={{
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
        >
          {stableProducts.map((product, index) => {
            const productId = product._id || product.id;
            return (
              <SwiperSlide 
                key={productId || `product-${index}`}
                className="cursor-pointer"
                onClick={() => handleProductClick(productId)}
              >
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* دکمه مشاهده همه */}
        {products.length > limit && (
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-2.5 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition-all text-sm font-bold"
            >
              {isFa ? "مشاهده همه محصولات →" : "View All Products →"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
