import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Tablet, Cpu, Camera, Battery, Award, Clock, Eye, 
  Star, Users, BookOpen, Pen, Layers, ArrowRight, ChevronDown
} from "lucide-react";
import axios from "axios";

// ========== تصاویر با مسیر مستقیم ==========
const ipadAir = "/assets/ipad/ipad-air.png";
const ipadPro = "/assets/ipad/ipad-pro.png";
const appleIpadPro = "/assets/ipad/apple-ipad-pro.png";

const GOLD = "#D4AF37";

// ========== مدل‌های آیپد ==========
const IPAD_MODELS = [
  { 
    id: "ipad-pro-m4", name: "iPad Pro M4", nameFa: "آیپد پرو M4",
    chip: "M4", display: "13″ Ultra Retina XDR", camera: "12MP + LiDAR",
    battery: "10h", storage: "256GB-2TB", price: "$1,099",
    img: ipadPro, year: "2024",
    articleLink: "/blog/ipad-pro-m4-review",
    colors: ["#000", "#555", "#E8E8E8", GOLD],
    rating: 4.9, reviews: 4231,
    tag: "Most Advanced",
    tagFa: "پیشرفته‌ترین",
    description: "The most powerful iPad with M4 chip and Ultra Retina XDR display",
    descriptionFa: "قدرتمندترین آیپد با تراشه M4 و نمایشگر Ultra Retina XDR"
  },
  { 
    id: "ipad-air", name: "iPad Air", nameFa: "آیپد ایر",
    chip: "M2", display: "11″/13″ Liquid Retina", camera: "12MP",
    battery: "10h", storage: "128GB-1TB", price: "$599",
    img: ipadAir, year: "2024",
    articleLink: "/blog/ipad-air-review",
    colors: ["#000", "#555", "#E8E8E8", "#FF2D55", "#4A90D9"],
    rating: 4.7, reviews: 3156,
    tag: "Perfect Balance",
    tagFa: "تعادل کامل",
    description: "The perfect balance of power and portability with M2 chip",
    descriptionFa: "تعادل کامل بین قدرت و قابلیت حمل با تراشه M2"
  },
  { 
    id: "ipad-10th", name: "iPad 10th Gen", nameFa: "آیپد نسل دهم",
    chip: "A14 Bionic", display: "10.9″ Liquid Retina", camera: "12MP",
    battery: "10h", storage: "64GB-256GB", price: "$349",
    img: appleIpadPro, year: "2022",
    articleLink: "/blog/ipad-10th-gen-review",
    colors: ["#000", "#E8E8E8", "#FF2D55", "#4A90D9", "#FF6B6B"],
    rating: 4.5, reviews: 2156,
    tag: "Best Value",
    tagFa: "مقرون‌به‌صرفه",
    description: "Great value with excellent performance and affordable price",
    descriptionFa: "بهترین ارزش با عملکرد عالی و قیمت مناسب"
  },
];

export default function IpadPage() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [selectedModel, setSelectedModel] = useState(IPAD_MODELS[0]);
  
  const getText = (en, fa) => isRtl ? fa : en;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* ===== HEADER ===== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-4 border border-white/20">
            <Tablet className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black tracking-wider text-white/80 uppercase">APPLE · 2022–2024</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-4">
            iPad <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Collection</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {getText(
              "Discover the perfect iPad for creativity, productivity, and entertainment.",
              "آیپد مناسب برای خلاقیت، بهره‌وری و سرگرمی را پیدا کنید."
            )}
          </p>
        </div>

        {/* ===== MODELS GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IPAD_MODELS.map((model) => (
            <motion.div
              key={model.id}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 shadow-2xl transition-all duration-500 ${
                selectedModel.id === model.id ? `ring-2 ring-amber-500 shadow-amber-500/30` : ''
              }`}
              onClick={() => setSelectedModel(model)}
            >
              <div className="relative p-6 text-center">
                <div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center transform-gpu transition-all duration-500 group-hover:scale-110">
                  <img src={model.img} alt={model.name} className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">{getText(model.name, model.nameFa)}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{model.year}</p>
                <div className="mt-3 flex justify-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 font-bold">
                    {isRtl ? model.tagFa : model.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== SELECTED MODEL DETAILS ===== */}
        <div className="mt-12 relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/50 dark:bg-black/40 border border-white/70 dark:border-white/15 shadow-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <img src={selectedModel.img} alt={selectedModel.name} className="w-full max-h-[400px] object-contain drop-shadow-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white">{getText(selectedModel.name, selectedModel.nameFa)}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-green-500/20 text-green-700 border border-green-500/30">{selectedModel.year}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{selectedModel.rating}</span>
                  <span className="text-xs text-gray-400">({selectedModel.reviews})</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {isRtl ? selectedModel.descriptionFa : selectedModel.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{getText("Chip", "تراشه")}</p>
                  <p className="font-black text-gray-900 dark:text-white">{selectedModel.chip}</p>
                </div>
                <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{getText("Display", "نمایشگر")}</p>
                  <p className="font-black text-gray-900 dark:text-white">{selectedModel.display}</p>
                </div>
                <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{getText("Camera", "دوربین")}</p>
                  <p className="font-black text-gray-900 dark:text-white">{selectedModel.camera}</p>
                </div>
                <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{getText("Battery", "باتری")}</p>
                  <p className="font-black text-gray-900 dark:text-white">{selectedModel.battery}</p>
                </div>
              </div>
              <Link to={selectedModel.articleLink} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black hover:shadow-xl transition-all">
                {getText("Read Full Review", "مطالعه بررسی کامل")} →
              </Link>
            </div>
          </div>
        </div>

        {/* ===== FEATURES ===== */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Cpu className="w-6 h-6" />, label: getText("Powerful Chips", "تراشه‌های قدرتمند"), desc: getText("M4 / M2 / A14", "M4 / M2 / A14") },
            { icon: <Pen className="w-6 h-6" />, label: getText("Apple Pencil", "اپل پنسیل"), desc: getText("Precision & Creativity", "دقت و خلاقیت") },
            { icon: <Layers className="w-6 h-6" />, label: getText("Liquid Retina", "لیکوید رتینا"), desc: getText("Stunning Display", "نمایشگر خیره‌کننده") },
            { icon: <Battery className="w-6 h-6" />, label: getText("All-Day Battery", "باتری تمام روز"), desc: getText("Up to 10 hours", "تا ۱۰ ساعت") },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 shadow-xl transition-all duration-300 p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-3 text-amber-500">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">{item.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
