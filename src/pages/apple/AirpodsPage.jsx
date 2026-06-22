import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  HiOutlinePlay,
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineShoppingCart,
  HiOutlineNewspaper,
  HiOutlinePause,
} from "react-icons/hi";
import { useCart } from "../../hooks/useCart";

const airpodsModels = [
  {
    id: "airpods-max",
    slug: "airpods-max",
    name: { en: "AirPods Max", fa: "ایرپاد مکس" },
    tagline: {
      en: "The ultimate over-ear headphones",
      fa: "هدفون روی گوشی نهایی",
    },
    price: 22000000,
    priceDisplay: "$549",
    colors: ["#D4AF37", "#2D2D2D", "#FFFFFF", "#4A6FA5", "#FF6B6B"],
    image: "/assets/airpod/airpod-max.png",
    gallery: [
      "/assets/airpod/airpod-max.png",
      "/assets/airpod/headphone-apple.png",
      "/assets/airpod/apple-airpod.png",
    ],
    features: [
      { en: "High-fidelity audio", fa: "صدای با کیفیت بالا" },
      { en: "Active Noise Cancellation", fa: "حذف نویز فعال" },
      { en: "Spatial Audio with Dolby Atmos", fa: "صدای فضایی با دالبی اتموس" },
      { en: "Up to 20 hours battery", fa: "تا ۲۰ ساعت باتری" },
    ],
    description: {
      en: "AirPods Max deliver exceptional sound quality with high-fidelity audio, active noise cancellation, and a premium design.",
      fa: "ایرپاد مکس کیفیت صدای استثنایی، حذف نویز فعال و طراحی ممتاز را ارائه می‌دهد.",
    },
    articleSlug: "airpods-max-review",
    videoId: "JeIKquUHjs0",
  },
  {
    id: "airpods-pro-3",
    slug: "airpods-pro-3",
    name: { en: "AirPods Pro 3", fa: "ایرپاد پرو ۳" },
    tagline: {
      en: "The best in-ear experience",
      fa: "بهترین تجربه درون گوشی",
    },
    price: 15000000,
    priceDisplay: "$249",
    colors: ["#FFFFFF", "#2D2D2D"],
    image: "/assets/airpod/apple-airpod.png",
    gallery: ["/assets/airpod/apple-airpod.png", "/assets/airpod/headphone-apple.png"],
    features: [
      { en: "Adaptive Audio", fa: "صدای تطبیقی" },
      { en: "Active Noise Cancellation", fa: "حذف نویز فعال" },
      { en: "H2 chip for better sound", fa: "تراشه H2 برای صدای بهتر" },
      { en: "Up to 6 hours battery", fa: "تا ۶ ساعت باتری" },
    ],
    description: {
      en: "AirPods Pro 3 feature the H2 chip for improved sound quality and adaptive audio for a personalized listening experience.",
      fa: "ایرپاد پرو ۳ با تراشه H2، کیفیت صدای بهتر و تجربه شنیداری شخصی‌سازی‌شده ارائه می‌دهد.",
    },
    articleSlug: "airpods-pro-review",
    videoId: "JeIKquUHjs0",
  },
];

// ============================================================
// کامپوننت: ThreeDHeadphone
// ============================================================
const ThreeDHeadphone = ({ image, alt = "AirPods", className = "" }) => {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxRotation = 15;

    setRotation({
      y: ((pointerX - centerX) / centerX) * maxRotation,
      x: ((centerY - pointerY) / centerY) * maxRotation,
    });
  };

  const resetRotation = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={resetRotation}
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovering ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative [perspective:1000px] ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <img
          src={image}
          alt={alt}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="h-full w-full select-none object-contain drop-shadow-2xl"
          style={{
            filter: isHovering
              ? "drop-shadow(0 30px 60px rgba(212,175,55,0.3))"
              : "drop-shadow(0 20px 40px rgba(0,0,0,0.2))",
          }}
        />

        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 -z-10"
            >
              <div className="absolute inset-0 animate-pulse rounded-full bg-amber-500/20 blur-3xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ============================================================
// کامپوننت: AirPodsHero
// ============================================================
const AirPodsHero = ({ isRTL, onBuyNow, onWatchVideo }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent">
        <div className="absolute left-1/4 top-1/3 h-[600px] w-[600px] animate-pulse rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-blue-500/5 blur-2xl delay-1000" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-500/5 to-amber-400/5 blur-3xl" />
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={isRTL ? "text-right" : "text-left"}
          >
            <span className="mb-4 inline-block rounded-full bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              {isRTL ? "صدای محض" : "Pure Sound"}
            </span>

            <h1 className="text-5xl font-black leading-tight text-neutral-900 dark:text-white md:text-7xl lg:text-8xl">
              {isRTL ? "ایرپاد" : "AirPods"}
              <span className="block text-amber-500">{isRTL ? "مکس" : "Max"}</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-xl">
              {isRTL
                ? "صدای با کیفیت بالا با حذف نویز فعال و طراحی ممتاز."
                : "High-fidelity audio with active noise cancellation and premium design."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onBuyNow}
                className="group flex items-center gap-2 rounded-full bg-amber-500 px-8 py-4 font-bold text-black shadow-lg transition hover:bg-amber-600 hover:shadow-amber-500/25"
              >
                {isRTL ? "خرید کنید" : "Buy Now"}
                <HiOutlineArrowRight className={`transition group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
              </button>

              <button
                onClick={onWatchVideo}
                className="flex items-center gap-2 rounded-full border-2 border-amber-500 px-8 py-4 font-bold text-amber-500 transition hover:bg-amber-500 hover:text-black"
              >
                <HiOutlinePlay size={18} />
                {isRTL ? "مشاهده ویدیو" : "Watch Video"}
              </button>
            </div>

            <div className="mt-12 flex gap-8 text-sm text-neutral-500 dark:text-neutral-400">
              <div>
                <span className="block text-2xl font-black text-neutral-900 dark:text-white">20h</span>
                {isRTL ? "باتری" : "Battery"}
              </div>
              <div>
                <span className="block text-2xl font-black text-neutral-900 dark:text-white">ANC</span>
                {isRTL ? "حذف نویز" : "Noise Cancel"}
              </div>
              <div>
                <span className="block text-2xl font-black text-neutral-900 dark:text-white">Dolby</span>
                {isRTL ? "اتموس" : "Atmos"}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <ThreeDHeadphone image="/assets/airpod/airpod-max.png" alt="AirPods Max" className="h-full w-full" />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-6 -top-6 rounded-full bg-amber-500 px-4 py-2 text-xs font-black text-black shadow-lg"
              >
                ⭐ 4.9
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -left-6 rounded-full bg-black px-4 py-2 text-xs font-black text-white shadow-lg dark:bg-white dark:text-black"
              >
                {isRTL ? "جدید" : "NEW"}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400"
      >
        <div className="mx-auto h-10 w-0.5 animate-pulse bg-amber-500/50" />
        <span className="mt-2 block text-xs uppercase tracking-widest">{isRTL ? "اسکرول کنید" : "Scroll"}</span>
      </motion.div>
    </section>
  );
};

// ============================================================
// کامپوننت: AirPodsModelSection
// ============================================================
const AirPodsModelSection = ({ model, index, isRTL, onAddToCart, onViewArticle }) => {
  const [selectedColor, setSelectedColor] = useState(model.colors[0]);
  const [selectedImage, setSelectedImage] = useState(model.image);
  const [isAdded, setIsAdded] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  const handleAdd = () => {
    onAddToCart(model);
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, y }}
      className={`py-20 ${index % 2 === 0 ? "bg-white/10 dark:bg-black/10" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={index % 2 !== 0 ? "lg:order-2" : ""}
          >
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <ThreeDHeadphone
                image={selectedImage}
                alt={model.name[isRTL ? "fa" : "en"]}
                className="h-full w-full"
              />
            </div>

            {model.gallery.length > 1 && (
              <div className="mt-6 flex justify-center gap-3">
                {model.gallery.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition hover:scale-105 ${
                      selectedImage === image ? "border-amber-500" : "border-transparent"
                    }`}
                    aria-label="Change product image"
                  >
                    <img src={image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={`${isRTL ? "text-right" : "text-left"} ${index % 2 !== 0 ? "lg:order-1" : ""}`}
          >
            <span className="inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-amber-500">
              {isRTL ? "محصول ویژه" : "Featured"}
            </span>

            <h2 className="mt-4 text-3xl font-black text-neutral-900 dark:text-white md:text-4xl">
              {model.name[isRTL ? "fa" : "en"]}
            </h2>

            <p className="mt-2 text-lg font-bold text-amber-500">
              {model.tagline[isRTL ? "fa" : "en"]}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {model.description[isRTL ? "fa" : "en"]}
            </p>

            <ul className="mt-6 space-y-3">
              {model.features.map((feature) => (
                <motion.li
                  key={feature.en}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300 ${
                    isRTL ? "flex-row-reverse justify-start" : ""
                  }`}
                >
                  <HiOutlineCheck className="shrink-0 text-amber-500" size={18} />
                  <span>{feature[isRTL ? "fa" : "en"]}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6">
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                {isRTL ? "رنگ‌ها" : "Colors"}
              </span>

              <div className={`mt-2 flex gap-2 ${isRTL ? "justify-end" : "justify-start"}`}>
                {model.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`h-8 w-8 rounded-full border-2 transition ${
                      selectedColor === color
                        ? "scale-110 border-amber-500 shadow-lg shadow-amber-500/25"
                        : "border-neutral-300 hover:scale-105 dark:border-neutral-700"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-3xl font-black text-amber-500">
                {model.price.toLocaleString("fa-IR")} {isRTL ? "تومان" : "Toman"}
              </span>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold transition ${
                  isAdded
                    ? "bg-green-500 text-white"
                    : "bg-amber-500 text-black hover:bg-amber-600"
                }`}
              >
                {isAdded ? (
                  <>
                    <HiOutlineCheck size={18} />
                    {isRTL ? "اضافه شد" : "Added"}
                  </>
                ) : (
                  <>
                    <HiOutlineShoppingCart size={18} />
                    {isRTL ? "افزودن به سبد" : "Add to Cart"}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onViewArticle(model)}
                className="flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-bold transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
              >
                <HiOutlineNewspaper size={18} />
                {isRTL ? "مشاهده مقاله" : "Read Article"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================
// کامپوننت: VideoSection (با ویدیوی واقعی)
// ============================================================
const VideoSection = ({ isRTL, videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section id="video-section" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white">
            {isRTL ? "تجربه صوتی فضایی" : "Spatial Audio Experience"}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            {isRTL
              ? "صدای فراگیر با دالبی اتموس را با ایرپاد تجربه کنید"
              : "Experience immersive sound with Dolby Atmos on AirPods"}
          </p>
        </motion.div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black/90">
          {!isPlaying ? (
            <div
              className="relative w-full h-full cursor-pointer group"
              onClick={handlePlay}
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-40"
                onError={(e) => {
                  e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center hover:scale-110 transition shadow-2xl shadow-amber-500/30 group-hover:shadow-amber-500/50">
                  <HiOutlinePlay size={40} className="text-black ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-bold tracking-widest">
                {isRTL ? "برای پخش کلیک کنید" : "Click to play"}
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`}
              title="AirPods Pro 3 Review"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// کامپوننت اصلی: AirpodsPage
// ============================================================
export default function AirpodsPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { add } = useCart();
  const isRTL = i18n.language === "fa";

  const handleBuyNow = () => {
    navigate("/cart");
  };

  const handleAddToCart = (product) => {
    add({
      _id: product.id,
      name: product.name,
      price: product.price,
      thumbnail: product.image,
    }, 1);
  };

  const handleViewArticle = (product) => {
    if (product.articleSlug) {
      navigate(`/articles/${product.articleSlug}`);
    }
  };

  const handleWatchVideo = () => {
    const videoSection = document.getElementById("video-section");
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className={`min-h-screen bg-transparent ${isRTL ? "font-vazir" : "font-sans"}`}>
      <Helmet>
        <title>AirPods | Apple World</title>
        <meta name="description" content="Experience the ultimate sound with AirPods Max and AirPods Pro 3" />
      </Helmet>

      {/* ===== Hero ===== */}
      <AirPodsHero
        isRTL={isRTL}
        onBuyNow={handleBuyNow}
        onWatchVideo={handleWatchVideo}
      />

      {/* ===== Model Sections ===== */}
      <section className="max-w-[1400px] mx-auto">
        {airpodsModels.map((model, index) => (
          <AirPodsModelSection
            key={model.id}
            model={model}
            index={index}
            isRTL={isRTL}
            onAddToCart={handleAddToCart}
            onViewArticle={handleViewArticle}
          />
        ))}
      </section>

      {/* ===== Video Section (با ویدیوی واقعی) ===== */}
      <VideoSection isRTL={isRTL} videoId={airpodsModels[0].videoId} />

      {/* ===== Footer ===== */}
      <footer className="py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/assets/airpod/apple-airpod.png" alt="AirPods" className="h-8 w-auto" />
              <span className="text-lg font-black text-neutral-900 dark:text-white">
                {isRTL ? "ایرپاد" : "AirPods"}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <a href="#" className="hover:text-amber-500 transition">{isRTL ? "مشخصات" : "Specs"}</a>
              <a href="#" className="hover:text-amber-500 transition">{isRTL ? "راهنما" : "Guide"}</a>
              <a href="#" className="hover:text-amber-500 transition">{isRTL ? "پشتیبانی" : "Support"}</a>
              <a href="#" className="hover:text-amber-500 transition">{isRTL ? "مقایسه" : "Compare"}</a>
            </div>

            <div className="text-sm text-neutral-500 dark:text-neutral-500">
              © 2026 {isRTL ? "اپل ورلد" : "Apple World"}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
