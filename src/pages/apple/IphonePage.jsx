import { useState } from "react";
import { useTranslation } from "react-i18next";
import AccordionItem from "../../components/accordion/AccordionItem";
import { useKeenSlider } from "keen-slider/react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";

// Assets
import logo from "../../assets/iphone/iphone-logo.png";
import ip17pm from "../../assets/iphone/iphone-17-pro-max.png";
import ip17p from "../../assets/iphone/iphone-17-pro.png";
import ip17 from "../../assets/iphone/iphone-17.png";
import ip16pm from "../../assets/iphone/iphone-16-pro-max.png";
import ip16p from "../../assets/iphone/iphone-16-pro.png";
import ip16 from "../../assets/iphone/iphone-16.png";
import ip15pm from "../../assets/iphone/iphone-15-pro-max.png";
import ip15p from "../../assets/iphone/iphone-15-pro.png";
import ip15 from "../../assets/iphone/iphone-15.png";
import ip14pm from "../../assets/iphone/iphone-14-pro-max.png";
import ip14p from "../../assets/iphone/iphone-14-pro.png";
import ip14 from "../../assets/iphone/iphone-14.png";
import ip13pm from "../../assets/iphone/iphone-13-pro-max.png";
import ip13p from "../../assets/iphone/iphone-13-pro.png";
import ip13 from "../../assets/iphone/iphone-13.png";
import ip12pm from "../../assets/iphone/iphone-12-pro-max.png";
import ip12p from "../../assets/iphone/iphone-12-pro.png";
import ip12 from "../../assets/iphone/iphone-12.png";
const models = [
  {
    id: 17,
    slug: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    img: ip17pm,
    price: "1199",
    rating: 4.9,
    pop: "98%",
    colors: ["#1d1d1f", "#d4af37", "#1d4ed8", "#38bdf8"],
    gallery: [ip17pm, ip17p, ip17],
    buyLink: "https://www.apple.com/shop/buy-iphone/iphone-17-pro-max",
    officialLink: "https://www.apple.com/iphone-17-pro-max/",
    description: {
      fa: "آیفون ۱۷ پرو مکس به عنوان جدیدترین و پیشرفته‌ترین پرچمدار شرکت اپل، استانداردهای صنعت موبایل را ارتقا بخشیده است. این گوشی با بدنه تیتانیومی فوق سبک و مقاوم، سیستم دوربین حرفه‌ای ۴۸ مگاپیکسلی با زوم اپتیکال ۵ برابری، پردازنده A19 Pro و قابلیت‌های هوشمند Apple Intelligence، تجربه‌ای بی‌نظیر از قدرت، خلاقیت و دقت را برای کاربران حرفه‌ای و علاقه‌مندان به فناوری ارائه می‌دهد. آیفون ۱۷ پرو مکس انتخابی ایده‌آل برای کسانی است که به دنبال بهترین عملکرد و نوآوری‌های روز دنیا هستند.",
      en: "The iPhone 17 Pro Max, as Apple's latest and most advanced flagship, has raised the standards of the mobile industry. With its ultra-light and durable titanium body, a professional 48MP camera system with 5x optical zoom, the A19 Pro processor, and Apple Intelligence capabilities, it offers an unparalleled experience of power, creativity, and precision for professionals and tech enthusiasts."
    }
  },
  {
    id: 16,
    slug: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    img: ip16pm,
    price: "1099",
    rating: 4.8,
    pop: "95%",
    colors: ["#1d1d1f", "#d4af37", "#1d4ed8", "#38bdf8"],
    gallery: [ip16pm, ip16p, ip16],
    buyLink: "https://www.apple.com/shop/buy-iphone/iphone-16-pro-max",
    officialLink: "https://www.apple.com/iphone-16-pro-max/",
    description: {
      fa: "آیفون ۱۶ پرو مکس با ترکیب هوشمندانه طراحی premium و فناوری‌های نوین، یکی از قدرتمندترین گوشی‌های هوشمند حال حاضر بازار است. مجهز به تراشه A18 Pro، نمایشگر Super Retina XDR با روشنایی بسیار بالا، سیستم دوربین سه‌گانه حرفه‌ای و باتری با دوام عالی، این مدل تجربه‌ای جامع از سرعت، کیفیت تصویر و خلاقیت عکاسی را برای کاربران فراهم می‌کند. آیفون ۱۶ پرو مکس انتخابی هوشمند برای کاربرانی است که عملکرد سطح بالا و طراحی خیره‌کننده را همزمان طلب می‌کنند.",
      en: "The iPhone 16 Pro Max, with its intelligent combination of premium design and modern technologies, is one of the most powerful smartphones on the market. Featuring the A18 Pro chip, a Super Retina XDR display with exceptional brightness, a professional triple-camera system, and excellent battery life, it offers a comprehensive experience of speed, image quality, and photographic creativity."
    }
  },
  {
    id: 15,
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    img: ip15pm,
    price: "999",
    rating: 4.7,
    pop: "92%",
    colors: ["#1d1d1f", "#d4af37", "#1d4ed8", "#38bdf8"],
    gallery: [ip15pm, ip15p, ip15],
    buyLink: "https://www.apple.com/shop/buy-iphone/iphone-15-pro-max",
    officialLink: "https://www.apple.com/iphone-15-pro-max/",
    description: {
      fa: "آیفون ۱۵ پرو مکس با فریم تیتانیومی سبک و مقاوم، نقطه عطفی در طراحی محصولات اپل به شمار می‌رود. این گوشی مجهز به دوربین اصلی ۴۸ مگاپیکسلی، پردازنده A17 Pro و نمایشگر باکیفیت Super Retina XDR، عملکردی روان، عمر باتری طولانی و قابلیت‌های عکاسی و فیلم‌برداری در سطح حرفه‌ای را ارائه می‌دهد. آیفون ۱۵ پرو مکس همچنان یکی از محبوب‌ترین و متعادل‌ترین گزینه‌ها در میان علاقه‌مندان به محصولات اپل است.",
      en: "The iPhone 15 Pro Max, with its lightweight and durable titanium frame, marks a milestone in Apple's product design. Equipped with a 48MP main camera, the A17 Pro processor, and a high-quality Super Retina XDR display, it delivers smooth performance, long battery life, and professional-grade photography and videography capabilities."
    }
  },
  {
    id: 14,
    slug: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    img: ip14pm,
    price: "899",
    rating: 4.7,
    pop: "88%",
    colors: ["#1d1d1f", "#d4af37", "#1d4ed8", "#38bdf8"],
    gallery: [ip14pm, ip14p, ip14],
    buyLink: "https://www.apple.com/shop/buy-iphone/iphone-14-pro-max",
    officialLink: "https://www.apple.com/iphone-14-pro-max/",
    description: {
      fa: "آیفون ۱۴ پرو مکس با معرفی Dynamic Island و دوربین پیشرفته، تحولی اساسی در تجربه کاربری ایجاد کرد. این مدل با طراحی کلاسیک و در عین حال مدرن، عملکرد قدرتمند و پایدار، کیفیت ساخت بالا و ویژگی‌های هوشمند، انتخابی مطمئن و پرطرفدار برای کاربران حرفه‌ای و روزمره به شمار می‌رود. آیفون ۱۴ پرو مکس همچنان پس از گذشت زمان، یکی از بهترین گزینه‌های بازار در رده پرچمداران است.",
      en: "The iPhone 14 Pro Max, with the introduction of the Dynamic Island and an advanced camera, brought a fundamental transformation to the user experience. With its classic yet modern design, powerful and stable performance, high build quality, and smart features, it remains a reliable and popular choice for both professional and everyday users."
    }
  },
  {
    id: 13,
    slug: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    img: ip13pm,
    price: "799",
    rating: 4.6,
    pop: "85%",
    colors: ["#1d1d1f", "#d4af37", "#1d4ed8", "#38bdf8"],
    gallery: [ip13pm, ip13p, ip13],
    buyLink: "https://www.apple.com/shop/buy-iphone/iphone-13-pro-max",
    officialLink: "https://www.apple.com/iphone-13-pro-max/",
    description: {
      fa: "آیفون ۱۳ پرو مکس یکی از موفق‌ترین مدل‌های تاریخ اپل محسوب می‌شود. با بهره‌گیری از باتری قدرتمند، نمایشگر ProMotion با نرخ نوسازی ۱۲۰ هرتز، دوربین سه‌گانه حرفه‌ای و عملکرد بسیار پایدار، این گوشی تجربه‌ای لذت‌بخش و قابل اعتماد را برای کاربران به ارمغان آورد. آیفون ۱۳ پرو مکس هنوز هم با وجود گذشت چند سال، گزینه‌ای بسیار مناسب برای کسانی است که به دنبال تعادل بین عملکرد، دوام و ارزش خرید هستند.",
      en: "The iPhone 13 Pro Max is considered one of Apple's most successful models. With its powerful battery, ProMotion display with a 120Hz refresh rate, professional triple-camera system, and highly stable performance, it delivered a delightful and reliable experience for users."
    }
  },
  {
    id: 12,
    slug: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    img: ip12pm,
    price: "699",
    rating: 4.5,
    pop: "80%",
    colors: ["#1d1d1f", "#d4af37", "#1d4ed8", "#38bdf8"],
    gallery: [ip12pm, ip12p, ip12],
    buyLink: "https://www.apple.com/shop/buy-iphone/iphone-12-pro-max",
    officialLink: "https://www.apple.com/iphone-12-pro-max/",
    description: {
      fa: "آیفون ۱۲ پرو مکس با معرفی طراحی مدرن با لبه‌های تخت، آغازگر نسل جدیدی از گوشی‌های هوشمند اپل بود. این مدل با دوربین پیشرفته، نمایشگر باکیفیت و عملکرد قدرتمند، استانداردهای طراحی و فناوری را در زمان خود ارتقا داد. آیفون ۱۲ پرو مکس همچنان با کیفیت ساخت بالا و عملکرد روان، انتخابی هوشمندانه برای کاربرانی است که به دنبال یک گوشی قابل اعتماد با طراحی iconic هستند.",
      en: "The iPhone 12 Pro Max, with its introduction of modern flat-edge design, marked the beginning of a new generation of Apple smartphones. With its advanced camera, high-quality display, and powerful performance, it raised the standards of design and technology at the time."
    }
  }
];
export default function IphonePage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const [activeImages, setActiveImages] = useState({});

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.3, spacing: 8 },
    breakpoints: {
      "(min-width:400px)": { slides: { perView: 1.8, spacing: 10 } },
      "(min-width:640px)": { slides: { perView: 2.5, spacing: 12 } },
      "(min-width:768px)": { slides: { perView: 3, spacing: 15 } },
      "(min-width:1024px)": { slides: { perView: 4, spacing: 15 } },
    },
  });

  const handleGalleryClick = (modelName, img) => {
    setActiveImages(prev => ({ ...prev, [modelName]: img }));
  };

  return (
    <main className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isRtl ? 'font-vazir' : 'font-sans'}`}>
      <Helmet>
        <title>iPhone Evolution | Apple World</title>
        <meta name="description" content="بررسی و مقایسه نسل‌های مختلف آیفون از سری ۱۲ تا ۱۷ پرو مکس" />
        <meta name="keywords" content="iPhone 17 Pro Max, iPhone 16, Apple, iOS, آیفون ۱۷" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[45vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1300px] w-full flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex-shrink-0"
          >
            <img 
              src={logo} 
              alt="Apple Brand Logo" 
              className="w-20 sm:w-28 md:w-40 lg:w-56 drop-shadow-[0_15px_40px_rgba(0,0,0,0.25)] dark:invert"
            />
          </motion.div>

          <div className={`text-center md:text-left ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
            <motion.h1
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight uppercase mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-500 dark:from-white dark:to-gray-500"
            >
              {t("iphonePage.hero.title1")} <br />
              <span className="text-blue-600 hover:text-blue-500 transition-colors duration-300">
                {t("iphonePage.hero.title2")}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="max-w-lg text-sm sm:text-lg md:text-xl font-bold opacity-85 leading-relaxed"
            >
              {t("iphonePage.hero.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* PRODUCTS LOOP */}
      <section id="models" className="max-w-[1400px] mx-auto px-3 sm:px-6 py-10 sm:py-16 md:py-20 space-y-12 sm:space-y-20 md:space-y-28 lg:space-y-36">
        {models.map((m) => {
          const activeImage = activeImages[m.name] || m.img;
          return (
            <article key={m.name} className="grid lg:grid-cols-12 gap-6 sm:gap-10 md:gap-12 items-start border-b pb-12 sm:pb-20 md:pb-24 border-gray-200 dark:border-gray-800">
              
              {/* LEFT - Media */}
              <div className="lg:col-span-5 lg:sticky lg:top-20 order-1 lg:order-none">
                <div className="relative group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={activeImage}
                      alt={m.name}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      className="w-[75%] sm:w-[80%] md:w-[85%] lg:w-[88%] mx-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-all duration-500"
                    />
                  </AnimatePresence>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-10 px-2 sm:px-4">
                  {m.gallery.map((img, index) => (
                    <motion.img
                      key={index}
                      src={img}
                      whileHover={{ y: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      alt={`${m.name} view ${index}`}
                      onClick={() => handleGalleryClick(m.name, img)}
                      className={`w-full h-16 sm:h-20 md:h-24 object-cover rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer transition-all ${
                        activeImage === img 
                          ? "ring-2 sm:ring-3 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/30 shadow-lg scale-105" 
                          : "opacity-60 grayscale hover:grayscale-0 hover:opacity-90 border border-gray-200 dark:border-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT - Content */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-8 order-2 lg:order-none">
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <Link to={`/iphone/${m.slug}`}>
                    <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-5 hover:text-blue-600 transition-colors">
                      {m.name}
                    </h2>
                  </Link>
                  
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <span className="text-lg sm:text-2xl md:text-3xl font-extrabold text-blue-600">
                      ${m.price}
                    </span>
                    <span className="text-xs sm:text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 sm:px-3 py-1 rounded-full font-bold">
                      ⭐ {m.rating}
                    </span>
                    <span className="text-xs sm:text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 sm:px-3 py-1 rounded-full font-bold">
                      🔥 {m.pop}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-5 sm:mb-6 leading-relaxed font-medium">
                    {isRtl ? m.description.fa : m.description.en}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6">
                    <Link
                      to="/cart"
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-white font-bold text-sm sm:text-base active:scale-95 transition-all shadow-lg"
                      style={{ backgroundColor: "#d4af37" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c9a227")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d4af37")}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {isRtl ? "خرید آنلاین" : "Buy Now"}
                    </Link>

                    <Link
                      to={`/iphone/${m.slug}`}
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-white font-bold text-sm sm:text-base active:scale-95 transition-all shadow-lg border-2"
                      style={{ backgroundColor: "#1d1d1f", borderColor: "#1d1d1f" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2d2d2f")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1d1d1f")}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {isRtl ? "مشاهده جزئیات" : "Read More"}
                    </Link>

                    <Link
                      to={`/iphone/compare?model=${encodeURIComponent(m.slug)}`}
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-white font-bold text-sm sm:text-base active:scale-95 transition-all shadow-lg"
                      style={{ background: "linear-gradient(to right, #1d4ed8, #38bdf8)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #1e3a8a, #0ea5e9)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #1d4ed8, #38bdf8)")}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      {isRtl ? "مقایسه" : "Compare"}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

{/* CTA SECTION */}
<section className="py-8 sm:py-10 md:py-14 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #38bdf8 50%, #d4af37 100%)" }}>
  <div className="max-w-[1200px] mx-auto text-center text-white">
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4">
      {isRtl ? "همه مدل‌ها را مقایسه کنید" : "Compare All Models"}
    </h2>
    <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-xl mx-auto mb-4 sm:mb-6 font-medium">
      {isRtl 
        ? "جدول مقایسه کامل تمام مدل‌های آیفون را مشاهده کنید" 
        : "View the complete comparison table of all iPhone models"}
    </p>
    
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
      <Link
        to="/iphone/compare"
        className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg"
        style={{ backgroundColor: "#38bdf8", color: "#1d1d1f" }}
      >
        {isRtl ? "مقایسه تمام مدل‌ها" : "Compare All Models"}
      </Link>
      
      <a
        href="https://www.apple.com/iphone/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg"
        style={{ backgroundColor: "#d4af37", color: "#1d1d1f" }}
      >
        {isRtl ? "مشاهده سایت اپل" : "Visit Apple Official"}
      </a>
    </div>
  </div>
</section>

{/* FOOTER */}
<section className="relative py-8 sm:py-10 md:py-14 overflow-hidden" style={{ backgroundColor: "#1d1d1f" }}>
  <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-[12vw] sm:text-[14vw] md:text-[16vw] font-black tracking-tight leading-none"
      style={{ color: "#d4af37" }}
    >
      APPLE IPHONE
    </motion.p>
    <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-medium" style={{ color: "#D3E3FD" }}>
      {isRtl ? "تمامی حقوق برای Apple Inc. محفوظ است" : "All rights reserved by Apple Inc."}
    </p>
    
    {/* خط تزئینی طلایی */}
    <div className="mt-4 sm:mt-5 mx-auto w-20 sm:w-28 h-1 rounded-full" style={{ backgroundColor: "#d4af37" }}></div>
  </div>
</section>
    </main>
  );
}
