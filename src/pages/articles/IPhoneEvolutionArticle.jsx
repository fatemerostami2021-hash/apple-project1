import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, X, ChevronLeft, ChevronRight, ChevronDown, 
  Smartphone, Cpu, Camera, Battery, Award, Clock, Eye, 
  Sparkles, TrendingUp, Zap, Shield, Star, Users, 
  Heart, BookOpen 
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#D4AF37";
const GOLD_HOVER = "#C5A027";

// ایمپورت عکس‌ها
import heroImage from "../../assets/iphone/iphone18-promax-hero.png";
import iphone14 from "../../assets/iphone/iphone-14.png";
import iphone14Pro from "../../assets/iphone/iphone-14-pro.png";
import iphone14ProMax from "../../assets/iphone/iphone-14-pro-max.png";
import iphone15 from "../../assets/iphone/iphone-15.png";
import iphone15Pro from "../../assets/iphone/iphone-15-pro.png";
import iphone15ProMax from "../../assets/iphone/iphone-15-pro-max.png";
import iphone16 from "../../assets/iphone/iphone-16.png";
import iphone16Pro from "../../assets/iphone/iphone-16-pro.png";
import iphone16ProMax from "../../assets/iphone/iphone-16-pro-max.png";
import iphone17 from "../../assets/iphone/iphone-17.png";
import iphone17Pro from "../../assets/iphone/iphone-17-pro.png";
import iphone17ProMax from "../../assets/iphone/iphone-17-pro-max.png";

const GENERATIONS = [
  { 
    id: 14, name: "iPhone 14", nameFa: "آیفون ۱۴", slug: "iphone-14-pro-max",
    chip: "A15 Bionic", process: "5nm", ram: "6GB", camera: "12MP", zoom: "2x", 
    body: "Aluminum", bodyFa: "آلومینیوم", display: "6.1″ OLED", refresh: "60Hz", 
    usb: "Lightning", ai: false, dynamicIsland: false, price: "$799", year: "2022",
    img: iphone14, imgPro: iphone14Pro, imgProMax: iphone14ProMax,
    articleLink: "/blog/iphone-14-pro-max",
    colors: ["#000", "#555", GOLD, "#E8E8E8", "#FF2D55"],
    rating: 4.5, reviews: 2847, battery: "20h", waterproof: "IP68",
  },
  { 
    id: 15, name: "iPhone 15", nameFa: "آیفون ۱۵", slug: "iphone-15-pro-max",
    chip: "A16 Bionic", process: "4nm", ram: "6GB", camera: "48MP", zoom: "2x", 
    body: "Aluminum/Titanium", bodyFa: "آلومینیوم/تیتانیوم", display: "6.1″ OLED", refresh: "60Hz", 
    usb: "USB-C 2.0", ai: false, dynamicIsland: true, price: "$799", year: "2023",
    img: iphone15, imgPro: iphone15Pro, imgProMax: iphone15ProMax,
    articleLink: "/blog/iphone-15-pro-max",
    colors: ["#000", "#555", GOLD, "#E8E8E8", "#FF2D55", "#A8C8D4"],
    rating: 4.6, reviews: 3241, battery: "22h", waterproof: "IP68",
  },
  { 
    id: 16, name: "iPhone 16", nameFa: "آیفون ۱۶", slug: "iphone-16-pro-max",
    chip: "A18", process: "3nm", ram: "8GB", camera: "48MP", zoom: "2x", 
    body: "Aluminum/Titanium", bodyFa: "آلومینیوم/تیتانیوم", display: "6.1″ OLED", refresh: "60Hz", 
    usb: "USB-C 3.0", ai: true, dynamicIsland: true, price: "$799", year: "2024",
    img: iphone16, imgPro: iphone16Pro, imgProMax: iphone16ProMax,
    articleLink: "/blog/iphone-16-pro-max",
    colors: ["#000", "#555", GOLD, "#E8E8E8", "#FF2D55", "#A8C8D4", "#4A90D9"],
    rating: 4.7, reviews: 4156, battery: "24h", waterproof: "IP68",
  },
  { 
    id: 17, name: "iPhone 17", nameFa: "آیفون ۱۷", slug: "iphone-17-pro-max",
    chip: "A19", process: "3nm (2nd gen)", ram: "8GB", camera: "48MP", zoom: "3x", 
    body: "Titanium", bodyFa: "تیتانیوم", display: "6.1″ OLED", refresh: "120Hz", 
    usb: "USB-C 3.0", ai: true, dynamicIsland: true, price: "$799", year: "2025",
    img: iphone17, imgPro: iphone17Pro, imgProMax: iphone17ProMax,
    articleLink: "/blog/iphone-17-pro-max",
    colors: ["#000", "#555", GOLD, "#E8E8E8", "#FF2D55", "#A8C8D4", "#4A90D9", "#FF6B6B"],
    rating: 4.9, reviews: 5238, battery: "26h", waterproof: "IP69",
  },
];

const relatedVideos = [
  { id: 1, title: "iPhone 17 Pro Max Full Review", titleFa: "بررسی کامل آیفون ۱۷ پرو مکس", duration: "15:23", views: "1.2M", videoId: "tQdPRHdrCUI", articleLink: "/blog/iphone-17-pro-max" },
  { id: 2, title: "iPhone 17 vs Samsung S25 Ultra", titleFa: "مقایسه آیفون ۱۷ و سامسونگ S25 اولترا", duration: "18:45", views: "892K", videoId: "DX0HzqxrjEQ", articleLink: "/blog/galaxy-s24-ultra-ai-revolution" },
  { id: 3, title: "iPhone 16 Pro Max Camera Test", titleFa: "تست دوربین آیفون ۱۶ پرو مکس", duration: "12:10", views: "2.1M", videoId: "hDZrB9V-UTk", articleLink: "/blog/iphone-16-pro-max" },
  { id: 4, title: "iOS 19 and Apple Intelligence", titleFa: "iOS 19 و Apple Intelligence", duration: "22:30", views: "1.5M", videoId: "-rdqBWYwFTo", articleLink: "/blog/iphone-17-pro-max#apple-intelligence" },
];

const typingTexts = [
  "iPhone 14 · A15 Bionic",
  "iPhone 15 · 48MP Camera",
  "iPhone 16 · Apple Intelligence",
  "iPhone 17 · ProMotion 120Hz",
];

export default function IPhoneEvolutionArticle() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  
  const [selectedGen, setSelectedGen] = useState(GENERATIONS[3]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1247);
  
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);
  
  const addSection = (el) => { if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el); };
  
  useEffect(() => {
    const currentFullText = typingTexts[typingIndex];
    let timeout;
    if (isDeleting) {
      timeout = setTimeout(() => {
        setTypingText(currentFullText.substring(0, typingText.length - 1));
      }, 50);
      if (typingText === "") {
        setIsDeleting(false);
        setTypingIndex((prev) => (prev + 1) % typingTexts.length);
      }
    } else {
      timeout = setTimeout(() => {
        setTypingText(currentFullText.substring(0, typingText.length + 1));
      }, 100);
      if (typingText === currentFullText) {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    }
    return () => clearTimeout(timeout);
  }, [typingText, typingIndex, isDeleting]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
        });
      });
    });
    return () => ctx.revert();
  }, []);
  
  const openVideo = (video) => {
    setActiveVideo(video);
    setShowVideoModal(true);
  };
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  const getText = (en, fa) => isRtl ? fa : en;
  const allImages = GENERATIONS.flatMap(gen => [gen.img, gen.imgPro, gen.imgProMax].filter(Boolean));
  
  return (
    <article dir={isRtl ? "rtl" : "ltr"} className="w-full bg-transparent">
      
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="iPhone Evolution Hero" className="w-full h-full object-cover object-center scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              animate={{ y: [0, -100, 0], opacity: [0, 1, 0], x: [0, Math.random() * 30 - 15, 0] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
              style={{ left: `${Math.random() * 100}%`, top: `${20 + Math.random() * 60}%` }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-black tracking-wider text-white uppercase">APPLE · 2022–2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight tracking-tight">
              iPhone <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Evolution</span>
            </h1>
            
            <div className="h-16 mb-6">
              <p className="text-xl md:text-2xl text-gray-200 font-semibold">
                {getText("Latest:", "جدیدترین:")}{" "}
                <span className="text-amber-400 font-mono border-r-2 border-amber-400 pr-1 font-bold">{typingText}</span>
              </p>
            </div>
            
            <p className="text-base md:text-lg text-gray-200 max-w-xl leading-relaxed mb-8 font-medium">
              {getText(
                "From iPhone 14 to iPhone 17 — A comprehensive analysis of Apple's flagship evolution in chip technology, camera systems, and artificial intelligence.",
                "از آیفون ۱۴ تا آیفون ۱۷ — تحلیل جامع تکامل پرچم‌دار اپل در فناوری تراشه، سیستم دوربین و هوش مصنوعی"
              )}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 font-medium">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{getText("18 min read", "۱۸ دقیقه مطالعه")}</div>
              <div className="flex items-center gap-2"><Eye className="w-4 h-4" />{getText("Comprehensive Analysis", "تحلیل جامع")}</div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4" />{getText("4 Generations", "۴ نسل")}</div>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#explore" className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold hover:shadow-xl transition-all shadow-lg flex items-center gap-2">
                {getText("Explore the Lineup", "مشاهده محصولات")} <ChevronRight className="w-4 h-4" />
              </a>
              <button onClick={() => openVideo(relatedVideos[0])} className="px-6 py-3 rounded-full bg-white/15 backdrop-blur-md text-white font-bold hover:bg-white/25 transition-all border border-white/30 flex items-center gap-2">
                <Play className="w-4 h-4" /> {getText("Watch Video", "تماشای ویدیو")}
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/40 flex justify-center">
            <ChevronDown className="w-4 h-4 text-white/70 mt-2" />
          </div>
        </div>
      </section>
      
      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* ===== Explore the Lineup (با لینک به بخش) ===== */}
        <section id="explore" ref={addSection} className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-gray-900 dark:text-white tracking-tight">
              <span className="text-amber-500">✦</span> {getText("Explore the Lineup", "مشاهده محصولات")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              {getText("Compare every generation side by side", "مقایسه همه نسل‌ها در کنار هم")}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {GENERATIONS.map((gen) => (
              <motion.div
                key={gen.id}
                whileHover={{ y: -12, scale: 1.03 }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 shadow-2xl transition-all duration-500 ${
                  selectedGen.id === gen.id ? `ring-2 ring-amber-500 shadow-amber-500/30` : ''
                }`}
                onClick={() => { setSelectedGen(gen); window.scrollTo({ top: 800, behavior: "smooth" }); }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 dark:from-white/10 dark:via-transparent dark:to-white/5" />
                <div className="relative p-6 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    <img src={gen.imgProMax} alt={gen.name} className="w-full h-full object-contain drop-shadow-2xl" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{getText(gen.name, gen.nameFa)}</h3>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{gen.year}</p>
                  <div className="mt-3 flex justify-center gap-2">
                    {gen.ai && <Sparkles className="w-4 h-4 text-amber-500" />}
                    {gen.dynamicIsland && <Shield className="w-4 h-4 text-green-500" />}
                    {gen.rating >= 4.8 && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                  </div>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold bg-amber-500/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-amber-700 dark:text-amber-300">
                      {getText("View Details", "جزئیات")} →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* ===== 3D Gallery ===== */}
        <section ref={addSection} className="mb-24 py-12 rounded-3xl bg-gradient-to-br from-white/40 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-sm border border-white/50 dark:border-white/5">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-2 text-gray-900 dark:text-white tracking-tight">
              {getText("360° Gallery", "گالری سه‌بعدی")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {getText("Experience every detail", "هر جزئیات را تجربه کنید")}
            </p>
          </div>
          
          <div className="relative px-4">
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2}
              coverflowEffect={{ rotate: 25, stretch: 0, depth: 180, modifier: 1.5, slideShadows: true }}
              navigation={{ nextEl: ".swiper-button-next-custom", prevEl: ".swiper-button-prev-custom" }}
              pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
              className="py-12"
            >
              {allImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-900/50 backdrop-blur-md p-6 shadow-2xl shadow-black/30 border border-white/60 dark:border-white/15 transform transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 rounded-2xl shadow-inner shadow-black/25 dark:shadow-white/10 pointer-events-none" />
                    <img src={img} alt={`iPhone ${idx}`} className="w-full h-64 object-contain drop-shadow-xl" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className="flex justify-center gap-4 mt-8">
              <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all">
                <ChevronLeft size={24} />
              </button>
              <div className="swiper-pagination-custom !relative !w-auto flex gap-2 items-center" />
              <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>
        
        {/* ===== Stats ===== */}
        <section ref={addSection} className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "4", label: getText("Generations", "نسل"), icon: <Smartphone className="w-6 h-6" />, color: "from-blue-500 to-blue-600" },
              { value: "103%", label: getText("CPU Growth", "رشد CPU"), icon: <Cpu className="w-6 h-6" />, color: "from-purple-500 to-purple-600" },
              { value: "437%", label: getText("GPU Growth", "رشد GPU"), icon: <TrendingUp className="w-6 h-6" />, color: "from-pink-500 to-pink-600" },
              { value: "2.5x", label: getText("AI Performance", "عملکرد AI"), icon: <Zap className="w-6 h-6" />, color: "from-amber-500 to-amber-600" },
            ].map((stat, idx) => (
              <motion.div key={idx} whileHover={{ y: -6, scale: 1.02 }} className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 shadow-xl transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl shadow-inner shadow-white/20 dark:shadow-black/30" />
                <div className="relative p-6 text-center">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-md text-white`}>
                    {stat.icon}
                  </div>
                  <p className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-300 mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* ===== Selected Model ===== */}
        <section ref={addSection} className="mb-20">
          <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/50 dark:bg-black/40 border border-white/70 dark:border-white/15 shadow-2xl">
            <div className="absolute inset-0 rounded-3xl shadow-inner shadow-white/30 dark:shadow-black/40" />
            <div className="relative grid md:grid-cols-2 gap-8 p-8">
              <div className="flex items-center justify-center">
                <img src={selectedGen.imgProMax} alt={selectedGen.name} className="w-full max-h-[400px] object-contain drop-shadow-2xl transform transition-all duration-500 hover:scale-105" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{getText(selectedGen.name, selectedGen.nameFa)}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-green-500/20 text-green-700 dark:text-green-300 backdrop-blur-sm border border-green-500/30">{selectedGen.year}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{selectedGen.rating}</span>
                    <span className="text-xs text-gray-400">({selectedGen.reviews})</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3"><p className="text-xs font-bold text-gray-500 dark:text-gray-400">{getText("Chip", "تراشه")}</p><p className="font-black text-gray-900 dark:text-white">{selectedGen.chip}</p></div>
                  <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3"><p className="text-xs font-bold text-gray-500 dark:text-gray-400">{getText("Display", "نمایشگر")}</p><p className="font-black text-gray-900 dark:text-white">{selectedGen.display}, {selectedGen.refresh}</p></div>
                  <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3"><p className="text-xs font-bold text-gray-500 dark:text-gray-400">{getText("Camera", "دوربین")}</p><p className="font-black text-gray-900 dark:text-white">{selectedGen.camera}</p></div>
                  <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3"><p className="text-xs font-bold text-gray-500 dark:text-gray-400">{getText("Battery", "باتری")}</p><p className="font-black text-gray-900 dark:text-white">{selectedGen.battery}</p></div>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  {selectedGen.colors.map((color, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white/30 shadow-md" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <Link to={selectedGen.articleLink} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black hover:shadow-xl transition-all">
                  {getText("Read Full Review", "مطالعه بررسی کامل")} →
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* ===== Video ===== */}
        <section id="video" ref={addSection} className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-gray-900 dark:text-white tracking-tight">{getText("Watch the Evolution", "تکامل را ببینید")}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              {getText("The complete video analysis of iPhone evolution from 2022 to 2025", "تحلیل ویدیویی کامل تکامل آیفون از ۲۰۲۲ تا ۲۰۲۵")}
            </p>
          </div>
          
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => openVideo(relatedVideos[0])}>
            <img src={`https://img.youtube.com/vi/${relatedVideos[0].videoId}/maxresdefault.jpg`} alt="Main Video" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                <Play className="w-12 h-12 text-amber-500 ml-1.5" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl md:text-2xl font-bold">{getText(relatedVideos[0].title, relatedVideos[0].titleFa)}</h3>
              <p className="text-sm text-gray-200 font-medium">{relatedVideos[0].views} {getText("views", "بازدید")}</p>
            </div>
          </div>
        </section>
        
        {/* ===== Related Videos ===== */}
        <section ref={addSection} className="mb-20">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-gray-900 dark:text-white tracking-tight">{getText("More Videos", "ویدیوهای بیشتر")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedVideos.slice(1).map((video) => (
              <div key={video.id} className="group cursor-pointer rounded-xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" onClick={() => openVideo(video)}>
                <div className="relative aspect-video">
                  <img src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} alt={getText(video.title, video.titleFa)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"><Play className="w-5 h-5 text-amber-500 ml-0.5" /></div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">{video.duration}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-black line-clamp-2 hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-gray-900 dark:text-white">{getText(video.title, video.titleFa)}</h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{video.views} {getText("views", "بازدید")}</p>
                  <Link to={video.articleLink} onClick={(e) => e.stopPropagation()} className="inline-block mt-3 text-xs font-bold text-amber-500 dark:text-amber-400 hover:underline">
                    {getText("Read full article →", "مطالعه مقاله کامل ←")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* ===== Comparison Table ===== */}
        <section ref={addSection} className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900 dark:text-white tracking-tight">{getText("Specifications Comparison", "مقایسه مشخصات فنی")}</h2>
          <div className="overflow-x-auto rounded-2xl backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 shadow-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/50 dark:bg-white/5 border-b border-white/40 dark:border-white/10">
                  <th className="px-6 py-4 text-start font-black text-gray-900 dark:text-white">{getText("Specification", "مشخصه")}</th>
                  {GENERATIONS.map(gen => <th key={gen.id} className="px-6 py-4 text-start font-black text-gray-900 dark:text-white">{getText(gen.name, gen.nameFa)}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: getText("Year", "سال"), key: "year" },
                  { label: getText("Chip", "تراشه"), key: "chip" },
                  { label: getText("Process", "فرآیند"), key: "process" },
                  { label: "RAM", key: "ram" },
                  { label: getText("Display", "نمایشگر"), key: "display" },
                  { label: getText("Refresh Rate", "نرخ تازه‌سازی"), key: "refresh" },
                  { label: getText("Main Camera", "دوربین اصلی"), key: "camera" },
                  { label: getText("Optical Zoom", "زوم اپتیکال"), key: "zoom" },
                  { label: getText("Port", "پورت"), key: "usb" },
                  { label: "Apple Intelligence", key: "ai" },
                  { label: "Dynamic Island", key: "dynamicIsland" },
                  { label: getText("Water Resistance", "مقاومت در برابر آب"), key: "waterproof" },
                  { label: getText("Battery Life", "عمر باتری"), key: "battery" },
                ].map((row, idx) => (
                  <tr key={idx} className="border-t border-white/30 dark:border-white/5 hover:bg-white/30 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-black text-gray-800 dark:text-gray-200">{row.label}</td>
                    {GENERATIONS.map(gen => {
                      let value = gen[row.key];
                      if (row.key === "ai") value = value ? "✅" : "❌";
                      if (row.key === "dynamicIsland") value = value ? "✅" : "❌";
                      return <td key={gen.id} className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">{value}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        
        {/* ===== Final CTA ===== */}
        <section ref={addSection}>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500/90 via-amber-600/90 to-yellow-600/90 backdrop-blur-sm p-10 md:p-14 text-white text-center shadow-2xl">
            <div className="absolute inset-0 rounded-3xl shadow-inner shadow-white/30" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">{getText("Ready to Choose?", "آماده انتخاب هستید؟")}</h2>
              <p className="text-lg text-amber-100 max-w-2xl mx-auto mb-8 font-medium">
                {getText("Compare all models and find the perfect iPhone for your needs", "همه مدل‌ها را مقایسه کنید و آیفون مناسب خود را پیدا کنید")}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {GENERATIONS.map(gen => (
                  <Link key={gen.id} to={gen.articleLink} className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-sm font-bold backdrop-blur-sm border border-white/30">
                    {getText(gen.name, gen.nameFa)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* ===== Video Modal ===== */}
      <AnimatePresence>
        {showVideoModal && activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button onClick={() => setShowVideoModal(false)} className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"><X size={32} /></button>
            <div className="w-full max-w-5xl aspect-video">
              <iframe className="w-full h-full rounded-2xl" src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`} title={activeVideo.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center text-white text-sm">
              <Link to={activeVideo.articleLink} onClick={() => setShowVideoModal(false)} className="text-amber-400 hover:underline font-bold">
                {getText("Read full article", "مطالعه مقاله کامل")} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 8px; height: 8px; background: #94a3b8; opacity: 0.5; border-radius: 50%;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          width: 24px; border-radius: 12px; background: #D4AF37; opacity: 1;
        }
        .swiper-button-prev-custom, .swiper-button-next-custom {
          transition: all 0.3s ease;
        }
        .swiper-button-prev-custom:hover, .swiper-button-next-custom:hover {
          background: #D4AF37 !important; color: black !important;
        }
      `}</style>
    </article>
  );
}
