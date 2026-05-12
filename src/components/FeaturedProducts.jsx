import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ProductCard from "./ProductCard";
import FeaturedBackground from "../animations/FeaturedBackground";

export default function FeaturedProducts({ products, darkMode, language = "en" }) {
  if (!products || products.length === 0) return null;

  const content = {
    en: {
      title: "Featured Products",
      subtitle: "Experience the future of innovation.",
    },
    fa: {
      title: "محصولات ویژه",
      subtitle: "آینده نوآوری را تجربه کنید.",
    },
  };

  const t = content[language] || content.en;

  return (
    <section
      dir={language === "fa" ? "rtl" : "ltr"}
      className="relative overflow-hidden py-20 w-full bg-gray-50 dark:bg-black transition-colors duration-500"
    >
      <FeaturedBackground darkMode={darkMode} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6">
        <div className={`mb-12 ${language === "fa" ? "text-center md:text-right" : "text-center md:text-left"}`}>
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white transition-colors duration-300">
            {t.title}
          </h2>
          <p className="text-neutral-500 dark:text-neutral-300 mt-2 text-lg transition-colors duration-300">
            {t.subtitle}
          </p>
        </div>

        <Swiper
          className="!pb-12"
          spaceBetween={24}
          slidesPerView={1.2}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                darkMode={darkMode}
                language={language}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
