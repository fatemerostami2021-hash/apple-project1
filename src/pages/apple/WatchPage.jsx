// src/pages/apple/WatchPage.jsx

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Swiper برای اسلایدر هیرو
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Icons
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineChip,
  HiOutlineDeviceMobile,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { FaApple, FaHeartbeat, FaBatteryFull, FaYoutube } from "react-icons/fa";

// Assets - Watch Images
import watchUltra4 from "../../assets/watch/apple-watch-ultra4.png";
import watchUltra3 from "../../assets/watch/Apple_Watch_Ultra_3_2025.png";
import watchUltra2 from "../../assets/watch/Apple_Watch_Ultra_2_2023.png";
import watchUltra1 from "../../assets/watch/Apple_Watch_Ultra_1st_Gen_2022.png";
import watchS12 from "../../assets/watch/Apple_Watch_Series_12_TBD_2026.png";
import watchS11 from "../../assets/watch/Apple_Watch_Series_11_2025.png";
import watchS10 from "../../assets/watch/Apple_Watch_Series_10_2024.png";
import watchS9 from "../../assets/watch/Apple_Watch_Series_9_2023.png";
import watchS8 from "../../assets/watch/Apple_Watch_Series_8_2022.png";
import watchS7 from "../../assets/watch/Apple_Watch_Series_7_2021.png";
import watchS6 from "../../assets/watch/Apple_Watch_Series_6_2020.png";
import watchS5 from "../../assets/watch/Apple_Watch_Series_5_2019.png";
import watchS4 from "../../assets/watch/Apple_Watch_Series_4_2018.png";
import watchSE3 from "../../assets/watch/Apple_Watch_SE_3rd_Gen_2025.png";
import watchSE2 from "../../assets/watch/Apple_Watch_SE_2nd_Gen_2022.png";
import watchSE1 from "../../assets/watch/Apple_Watch_SE_1st_Gen_2020.png";

// Hero Slider Images
const heroSliderImages = [
  { id: 1, src: watchUltra4, alt: "Apple Watch Ultra 4" },
  { id: 2, src: watchUltra3, alt: "Apple Watch Ultra 3" },
  { id: 3, src: watchS12, alt: "Apple Watch Series 12" },
  { id: 4, src: watchS11, alt: "Apple Watch Series 11" },
  { id: 5, src: watchUltra2, alt: "Apple Watch Ultra 2" },
];

// ویدیوهای یوتیوب
const relatedVideos = [
  {
    id: "video1",
    title: "Apple Watch Ultra 4 - Full Review",
    channel: "TechZone",
    videoId: "xn9gSLXmFeE",
    thumbnail: "https://img.youtube.com/vi/xn9gSLXmFeE/mqdefault.jpg",
    duration: "12:34",
    views: "125K",
  },
  {
    id: "video2",
    title: "Apple Watch Series 10 vs Ultra 4 Comparison",
    channel: "GearLab",
    videoId: "tXs7oE5gYpo",
    thumbnail: "https://img.youtube.com/vi/tXs7oE5gYpo/mqdefault.jpg",
    duration: "15:21",
    views: "89K",
  },
  {
    id: "video3",
    title: "Apple Watch SE 3 - Best Budget Smartwatch?",
    channel: "BudgetTech",
    videoId: "Tg_qkgmww-s",
    thumbnail: "https://img.youtube.com/vi/Tg_qkgmww-s/mqdefault.jpg",
    duration: "10:45",
    views: "67K",
  },
];

// مدل‌های اپل واچ
const watchModels = [
  {
    id: "ultra-4",
    slug: "apple-watch-ultra-4",
    series: "Ultra",
    generation: 4,
    name: "Apple Watch Ultra 4",
    year: 2026,
    img: watchUltra4,
    price: "999",
    oldPrice: "1199",
    rating: 5.0,
    pop: "98%",
    colors: ["#2c2c2c", "#8B7355", "#4A4A4A", "#D4AF37"],
    battery: "48 ساعت",
    chip: "S11 SIP",
    waterResistance: "100m",
    features: ["خودکار‌شناسی عمق تا 60 متر", "دماسنج آب پیشرفته", "GPS دو فرکانسه نسل دوم", "آژیر 92 دسی‌بلی", "نمایشگر 3500 نیت", "اندازه‌گیری قند خون"],
    health: ["ECG", "خون‌اکسیژن", "دمای بدن", "ردیابی خواب", "قند خون"],
    gallery: [watchUltra4, watchUltra3, watchUltra2],
    description: {
      fa: "اپل واچ اولترا ۴ قدرتمندترین ساعت هوشمند اپل با تراشه S11 و نمایشگر 3500 نیت.",
      en: "Apple Watch Ultra 4 is the most powerful Apple smartwatch with S11 chip."
    }
  },
  {
    id: "ultra-3",
    slug: "apple-watch-ultra-3",
    series: "Ultra",
    generation: 3,
    name: "Apple Watch Ultra 3",
    year: 2025,
    img: watchUltra3,
    price: "899",
    oldPrice: "999",
    rating: 4.9,
    pop: "95%",
    colors: ["#2c2c2c", "#8B7355", "#4A4A4A"],
    battery: "36 ساعت",
    chip: "S10 SIP",
    waterResistance: "100m",
    features: ["خودکار‌شناسی عمق", "دماسنج آب", "GPS دو فرکانسه", "آژیر 86 دسی‌بلی", "نمایشگر 3000 نیت"],
    health: ["ECG", "خون‌اکسیژن", "دمای بدن", "ردیابی خواب"],
    gallery: [watchUltra3, watchUltra2, watchUltra1],
    description: {
      fa: "اپل واچ اولترا ۳ قدرتمندترین و مقاوم‌ترین ساعت هوشمند اپل.",
      en: "The Apple Watch Ultra 3 is the most powerful and rugged Apple smartwatch."
    }
  },
  {
    id: "ultra-2",
    slug: "apple-watch-ultra-2",
    series: "Ultra",
    generation: 2,
    name: "Apple Watch Ultra 2",
    year: 2023,
    img: watchUltra2,
    price: "799",
    oldPrice: "899",
    rating: 4.8,
    pop: "90%",
    colors: ["#2c2c2c", "#8B7355"],
    battery: "36 ساعت",
    chip: "S9 SIP",
    waterResistance: "100m",
    features: ["GPS دو فرکانسه", "آژیر 86 دسی‌بلی", "عملیات دو انگشت"],
    health: ["ECG", "خون‌اکسیژن", "دمای بدن", "ردیابی خواب"],
    gallery: [watchUltra2, watchUltra1, watchUltra3],
    description: {
      fa: "اپل واچ اولترا ۲ با بهبود عملکرد و قابلیت‌های جدید.",
      en: "The Apple Watch Ultra 2 redefines professional smartwatch standards."
    }
  },
  {
    id: "ultra-1",
    slug: "apple-watch-ultra-1",
    series: "Ultra",
    generation: 1,
    name: "Apple Watch Ultra",
    year: 2022,
    img: watchUltra1,
    price: "699",
    oldPrice: "799",
    rating: 4.7,
    pop: "85%",
    colors: ["#2c2c2c"],
    battery: "36 ساعت",
    chip: "S8 SIP",
    waterResistance: "100m",
    features: ["GPS دو فرکانسه", "آژیر 86 دسی‌بلی"],
    health: ["ECG", "خون‌اکسیژن", "دمای بدن"],
    gallery: [watchUltra1, watchUltra2],
    description: {
      fa: "اپل واچ اولترا اولین ساعت حرفه‌ای اپل.",
      en: "The Apple Watch Ultra is Apple's first professional smartwatch."
    }
  },
  {
    id: "series-12",
    slug: "apple-watch-series-12",
    series: "Series",
    generation: 12,
    name: "Apple Watch Series 12",
    year: 2026,
    img: watchS12,
    price: "599",
    oldPrice: "699",
    rating: 4.9,
    pop: "92%",
    colors: ["#2c2c2c", "#f5f5f7", "#D4AF37", "#3B82F6", "#E53E3E"],
    battery: "24 ساعت",
    chip: "S10 SIP",
    waterResistance: "50m",
    features: ["صفحه نمایش بزرگتر", "تراشه جدید S10", "شارژ سریع‌تر"],
    health: ["ECG", "خون‌اکسیژن", "دمای بدن", "ردیابی خواب"],
    gallery: [watchS12, watchS11, watchS10],
    description: { fa: "اپل واچ سری ۱۲ جدیدترین نسل از ساعت‌های هوشمند اپل.", en: "The Apple Watch Series 12 is the latest generation." }
  },
  {
    id: "series-11",
    slug: "apple-watch-series-11",
    series: "Series",
    generation: 11,
    name: "Apple Watch Series 11",
    year: 2025,
    img: watchS11,
    price: "499",
    oldPrice: "599",
    rating: 4.8,
    pop: "88%",
    colors: ["#2c2c2c", "#f5f5f7", "#3B82F6", "#E53E3E"],
    battery: "20 ساعت",
    chip: "S9 SIP",
    waterResistance: "50m",
    features: ["عملیات دو انگشت", "تراشه جدید S9"],
    health: ["ECG", "خون‌اکسیژن", "دمای بدن", "ردیابی خواب"],
    gallery: [watchS11, watchS10, watchS12],
    description: { fa: "اپل واچ سری ۱۱ با قابلیت عملیات دو انگشت.", en: "Apple Watch Series 11 with double-tap gesture." }
  },
  {
    id: "series-10",
    slug: "apple-watch-series-10",
    series: "Series",
    generation: 10,
    name: "Apple Watch Series 10",
    year: 2024,
    img: watchS10,
    price: "449",
    oldPrice: "529",
    rating: 4.7,
    pop: "85%",
    colors: ["#2c2c2c", "#f5f5f7", "#3B82F6"],
    battery: "18 ساعت",
    chip: "S8 SIP",
    waterResistance: "50m",
    features: ["صفحه نمایش بزرگتر", "شارژ سریع"],
    health: ["ECG", "خون‌اکسیژن", "دمای بدن", "ردیابی خواب"],
    gallery: [watchS10, watchS9, watchS11],
    description: { fa: "اپل واچ سری ۱۰ با صفحه نمایش بزرگتر.", en: "Apple Watch Series 10 with larger display." }
  },
  {
    id: "series-9",
    slug: "apple-watch-series-9",
    series: "Series",
    generation: 9,
    name: "Apple Watch Series 9",
    year: 2023,
    img: watchS9,
    price: "399",
    oldPrice: "499",
    rating: 4.6,
    pop: "82%",
    colors: ["#2c2c2c", "#f5f5f7", "#E53E3E"],
    battery: "18 ساعت",
    chip: "S7 SIP",
    waterResistance: "50m",
    features: ["صفحه نمایش همیشه روشن", "تشخیص تصادف"],
    health: ["ECG", "خون‌اکسیژن", "ردیابی خواب"],
    gallery: [watchS9, watchS8, watchS10],
    description: { fa: "اپل واچ سری ۹ با قابلیت‌های کامل سلامتی.", en: "Apple Watch Series 9 with comprehensive health features." }
  },
  {
    id: "se-3",
    slug: "apple-watch-se-3",
    series: "SE",
    generation: 3,
    name: "Apple Watch SE 3",
    year: 2025,
    img: watchSE3,
    price: "279",
    oldPrice: "329",
    rating: 4.5,
    pop: "80%",
    colors: ["#2c2c2c", "#f5f5f7", "#E53E3E"],
    battery: "18 ساعت",
    chip: "S8 SIP",
    waterResistance: "50m",
    features: ["تشخیص تصادف", "صفحه نمایش بزرگتر"],
    health: ["خون‌اکسیژن", "ردیابی خواب"],
    gallery: [watchSE3, watchSE2, watchSE1],
    description: { fa: "اپل واچ SE 3 با قیمت مناسب.", en: "Apple Watch SE 3 with affordable price." }
  }
];

const sortedModels = [...watchModels].sort((a, b) => {
  const seriesOrder = { Ultra: 3, Series: 2, SE: 1 };
  if (seriesOrder[a.series] !== seriesOrder[b.series]) return seriesOrder[b.series] - seriesOrder[a.series];
  return b.generation - a.generation;
});

const groupedModels = {
  Ultra: sortedModels.filter(m => m.series === "Ultra"),
  Series: sortedModels.filter(m => m.series === "Series"),
  SE: sortedModels.filter(m => m.series === "SE")
};

// Hero Slider Component
const HeroSlider = () => {
  return (
    <div className="relative w-full max-w-[500px] lg:max-w-[550px] mx-auto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        className="rounded-3xl overflow-hidden"
      >
        {heroSliderImages.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <button className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-amber-500 transition-all duration-300 z-10">
        <HiOutlineChevronLeft size={20} />
      </button>
      <button className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-amber-500 transition-all duration-300 z-10">
        <HiOutlineChevronRight size={20} />
      </button>
    </div>
  );
};

const VideoCard = ({ video, isActive, onClick }) => (
  <div onClick={onClick} className={`cursor-pointer rounded-xl overflow-hidden bg-white/10 dark:bg-black/30 backdrop-blur-md border transition-all duration-300 ${isActive ? "border-amber-500 shadow-lg shadow-amber-500/20" : "border-gray-200 dark:border-white/10 hover:border-amber-500/50"}`}>
    <div className="flex gap-3 p-3">
      <img src={video.thumbnail} alt={video.title} className="w-24 h-16 rounded-lg object-cover" />
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">{video.title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <FaYoutube className="text-red-500 text-[10px]" />
          <span className="text-[10px] text-gray-500 dark:text-gray-400">{video.channel}</span>
        </div>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">{video.views} بازدید</span>
      </div>
    </div>
  </div>
);

export default function WatchPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [activeImages, setActiveImages] = useState({});
  const [selectedSeries, setSelectedSeries] = useState("Ultra");
  const [activeMainVideo, setActiveMainVideo] = useState(relatedVideos[0]);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 15 },
    breakpoints: { "(max-width:1024px)": { slides: { perView: 3 } }, "(max-width:768px)": { slides: { perView: 2 } }, "(max-width:480px)": { slides: { perView: 1 } } },
  });

  const handleGalleryClick = (modelName, img) => setActiveImages(prev => ({ ...prev, [modelName]: img }));
  const currentModels = groupedModels[selectedSeries] || [];

  return (
    <main className={`min-h-screen overflow-x-hidden ${isRtl ? 'font-vazir' : 'font-sans'}`}>
      <Helmet>
        <title>Apple Watch | Evolution of Smartwatch</title>
        <meta name="description" content="بررسی و مقایسه نسل‌های مختلف اپل واچ از سری ۴ تا اولترا ۴" />
        <meta name="keywords" content="Apple Watch, Ultra 4, Series 12, Watch SE" />
      </Helmet>

      {/* ==================== NAVIGATION LINKS ==================== */}
      <div className="bg-white/50 dark:bg-black/30 backdrop-blur-md border-b border-gray-200 dark:border-white/10 py-3">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap justify-center gap-6 text-sm">
          <Link 
            to="/apple-products/iphone" 
            className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
          >
            {isRtl ? "صفحه آیفون" : "iPhone Page"}
          </Link>
          <Link 
            to="/blog" 
            className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
          >
            {isRtl ? "صفحه مقالات" : "Blog Page"}
          </Link>
          {/* ✅ لینک مقاله اپل واچ حذف شد - دیگر در هدر مقالات نیست */}
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[30vh] flex items-center justify-center px-6 py-8 overflow-hidden">
        <div className="max-w-[1400px] w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 z-10">
          
          {/* سمت چپ */}
          <div className={`flex-1 text-center lg:text-left ${isRtl ? 'lg:text-right' : 'lg:text-left'} space-y-4`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-full px-3 py-1.5 border border-gray-200 dark:border-white/20 shadow-md"
            >
              <span className="text-amber-600 dark:text-amber-400 font-extrabold text-xs tracking-wider">NEW GENERATION</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Apple
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                Watch Ultra 4
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed mx-auto lg:mx-0 font-medium"
            >
              {isRtl ? "قدرتمندترین ساعت هوشمند اپل. با تراشه S11، نمایشگر 3500 نیت و عمر باتری 48 ساعته" : "The most powerful Apple smartwatch. With S11 chip, 3500-nit display, and 48-hour battery life"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <Link to="/product/apple-watch-ultra-4" className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-sm hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md shadow-amber-500/30 hover:scale-105">
                {isRtl ? "خرید اپل واچ اولترا ۴" : "Buy Apple Watch Ultra 4"}
              </Link>
              {/* ✅ لینک بررسی تخصصی به مسیر جدید تغییر کرد */}
              <Link to="/apple-products/watch/article/apple-watch-ultra-4" className="px-6 py-2 rounded-full bg-white/60 dark:bg-white/10 text-gray-800 dark:text-white font-extrabold text-sm border border-gray-300 dark:border-white/20 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/20 hover:border-amber-500/50 transition-all duration-300 hover:scale-105">
                {isRtl ? "بررسی تخصصی" : "Read Review"}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2"
            >
              {[
                { label: "S11 Chip", value: "S11" },
                { label: "Brightness", value: "3500 nits" },
                { label: "Battery", value: "48 hours" },
              ].map((item) => (
                <div key={item.label} className="bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-xl px-3 py-1 border border-gray-200 dark:border-white/20 shadow-sm">
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold text-sm">{item.value}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* سمت راست - اسلایدر */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 100 }}
            className="flex-1"
          >
            <HeroSlider />
          </motion.div>
        </div>
      </section>

      {/* SERIES FILTER */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl py-3 border-b border-gray-200 dark:border-white/10 shadow-md">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-center gap-3 flex-wrap">
          {[
            { id: "Ultra", label: "Ultra Series", icon: "🏔️", color: "from-amber-500 to-orange-500" },
            { id: "Series", label: "Series", icon: "⌚", color: "from-blue-500 to-cyan-500" },
            { id: "SE", label: "SE Series", icon: "✨", color: "from-emerald-500 to-green-500" },
          ].map((series) => (
            <button
              key={series.id}
              onClick={() => setSelectedSeries(series.id)}
              className={`px-5 py-1.5 rounded-full font-extrabold transition-all duration-300 flex items-center gap-2 text-xs ${
                selectedSeries === series.id ? `bg-gradient-to-r ${series.color} text-white shadow-md scale-105` : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-200 dark:border-white/20"
              }`}
            >
              <span>{series.icon}</span>
              <span>{series.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS LOOP */}
      <section id="models" className="max-w-[1400px] mx-auto px-6 py-12 space-y-24">
        {currentModels.map((m) => {
          const activeImage = activeImages[m.name] || m.img;
          return (
            <article key={m.id} className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT SIDE - Media */}
              <div className="lg:col-span-5 sticky top-24">
                <div className="relative bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-gray-200 dark:border-white/10 shadow-md">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={activeImage}
                      alt={m.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="w-full h-[280px] object-contain drop-shadow-xl"
                    />
                  </AnimatePresence>
                  
                  <div className="absolute -top-2 -right-2 flex gap-1">
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-0.5 rounded-full text-[9px] font-extrabold shadow-md">
                      {m.series} {m.generation}
                    </span>
                    {m.year >= 2025 && (
                      <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-2 py-0.5 rounded-full text-[9px] font-extrabold shadow-md">
                        جدید
                      </span>
                    )}
                  </div>
                </div>

                {m.gallery.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {m.gallery.map((img, index) => (
                      <motion.img
                        key={index}
                        src={img}
                        whileHover={{ y: -2 }}
                        onClick={() => handleGalleryClick(m.name, img)}
                        className={`w-14 h-14 rounded-lg object-contain cursor-pointer transition-all duration-300 border p-1 ${
                          activeImage === img ? "border-amber-500 scale-105 shadow-md shadow-amber-500/30 bg-amber-50 dark:bg-amber-500/10" : "border-gray-200 dark:border-white/20 opacity-60 hover:opacity-100"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT SIDE - Content */}
              <div className="lg:col-span-7 space-y-5">
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-gray-200 dark:border-white/10 shadow-md">
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">{m.name}</h2>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{m.year}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(m.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-800 dark:text-white">{m.rating}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">• {m.pop} رضایت</span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-black text-gray-900 dark:text-white">${m.price}</span>
                      {m.oldPrice && <span className="text-xs text-gray-400 line-through">${m.oldPrice}</span>}
                    </div>

                    <div className="flex gap-2 mb-4">
                      {m.colors.map(color => (
                        <div key={color} style={{backgroundColor: color}} className="w-8 h-8 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-125 transition-transform" />
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Link to={`/product/${m.slug}`} className="px-5 py-1.5 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 dark:from-amber-500 dark:to-amber-600 text-white font-extrabold text-xs hover:scale-105 transition-all duration-300 shadow-sm">
                        مشاهده و خرید
                      </Link>
                      {/* ✅ لینک بررسی تخصصی هر محصول به مسیر جدید تغییر کرد */}
                      <Link to={`/apple-products/watch/article/${m.slug}`} className="px-5 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white font-extrabold text-xs border border-gray-300 dark:border-white/20 hover:border-amber-500/50 hover:scale-105 transition-all duration-300">
                        بررسی تخصصی
                      </Link>
                    </div>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                      <HiOutlineChip className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <div>
                        <p className="text-[8px] font-bold text-gray-400 uppercase">تراشه</p>
                        <p className="text-[10px] font-extrabold text-gray-900 dark:text-white">{m.chip}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                      <FaBatteryFull className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <div>
                        <p className="text-[8px] font-bold text-gray-400 uppercase">باتری</p>
                        <p className="text-[10px] font-extrabold text-gray-900 dark:text-white">{m.battery}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mt-3">
                    {isRtl ? m.description.fa : m.description.en}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* VIDEO SECTION */}
      <section className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">ویدیوهای بررسی</h2>
          <div className="mx-auto mt-2 w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">تماشای ویدیوهای بررسی تخصصی اپل واچ</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-md">
              <div className="relative aspect-video">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${activeMainVideo.videoId}?autoplay=0&rel=0`} title={activeMainVideo.title} allowFullScreen />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{activeMainVideo.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <FaYoutube className="text-red-500" />
                  <span>{activeMainVideo.channel}</span>
                  <span>•</span>
                  <span>{activeMainVideo.views} بازدید</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">ویدیوهای مرتبط</h3>
            {relatedVideos.map((video) => (
              <VideoCard key={video.id} video={video} isActive={activeMainVideo.id === video.id} onClick={() => setActiveMainVideo(video)} />
            ))}
          </div>
        </div>
      </section>

      {/* SIMILAR PRODUCTS SLIDER */}
      <section className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">مدل‌های دیگر</h2>
          <div className="mx-auto mt-2 w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {currentModels.map((model) => (
            <div key={model.id} className="keen-slider__slide px-2">
              {/* ✅ اسلایدر محصولات به مسیر جدید لینک شد */}
              <Link to={`/apple-products/watch/article/${model.slug}`} className="block">
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-xl p-3 text-center border border-gray-200 dark:border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm">
                  <img src={model.img} className="h-20 mx-auto object-contain mb-2" alt={model.name} />
                  <p className="text-xs font-extrabold text-gray-900 dark:text-white mb-0.5">{model.name}</p>
                  <p className="text-amber-600 dark:text-amber-400 font-bold text-[11px]">${model.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FOOTER LINKS ==================== */}
      <section className="border-t border-gray-200 dark:border-white/10 py-8 mt-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link 
              to="/apple-products/iphone" 
              className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {isRtl ? "صفحه آیفون" : "iPhone Page"}
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {isRtl ? "صفحه مقالات" : "Blog Page"}
            </Link>
            {/* ✅ لینک مقاله اپل واچ در فوتر نیز حذف شد */}
          </div>
        </div>
      </section>

      {/* FOOTER BRANDING */}
      <section className="py-12 text-center">
        <FaApple className="text-gray-200 dark:text-gray-800 text-[10vw] mx-auto opacity-30" />
      </section>
    </main>
  );
}