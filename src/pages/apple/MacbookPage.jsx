import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Laptop, Cpu, Battery, Star, ArrowRight, ChevronDown, BookOpen } from "lucide-react";
import axios from "axios";

const macbookAir = "/assets/macbook/macboo-air-m3--.png";
const macbookPro = "/assets/iphone/mac-pro-m4.png";

const MACBOOK_MODELS = [
  { 
    id: "macbook-pro-m4", name: "MacBook Pro M4", nameFa: "مک‌بوک پرو M4",
    chip: "M4 Pro", display: "14″/16″ Liquid Retina XDR", camera: "12MP",
    battery: "22h", price: "$1,999",
    img: macbookPro, year: "2024",
    articleLink: "/blog/macbook-pro-m4-review",
    rating: 4.9, reviews: 5234,
    tag: "Most Powerful",
    tagFa: "قدرتمندترین",
  },
  { 
    id: "macbook-air-m3", name: "MacBook Air M3", nameFa: "مک‌بوک ایر M3",
    chip: "M3", display: "13″/15″ Liquid Retina", camera: "1080p",
    battery: "18h", price: "$1,099",
    img: macbookAir, year: "2024",
    articleLink: "/blog/macbook-air-m3-review",
    rating: 4.8, reviews: 4123,
    tag: "Perfect Balance",
    tagFa: "تعادل کامل",
  },
];

export default function MacbookPage() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [selectedModel, setSelectedModel] = useState(MACBOOK_MODELS[0]);
  
  const getText = (en, fa) => isRtl ? fa : en;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-4">
            💻 {getText("MacBook", "مک‌بوک")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {getText(
              "Discover the perfect MacBook for work, creativity, and productivity.",
              "مک‌بوک مناسب برای کار، خلاقیت و بهره‌وری را پیدا کنید."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {MACBOOK_MODELS.map((model) => (
            <motion.div
              key={model.id}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 shadow-2xl transition-all duration-500 ${
                selectedModel.id === model.id ? `ring-2 ring-amber-500` : ''
              }`}
              onClick={() => setSelectedModel(model)}
            >
              <div className="relative p-6 text-center">
                <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                  <img src={model.img} alt={model.name} className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">{getText(model.name, model.nameFa)}</h3>
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

        {/* Selected Model Details */}
        <div className="mt-12 relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/50 dark:bg-black/40 border border-white/70 dark:border-white/15 shadow-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <img src={selectedModel.img} alt={selectedModel.name} className="w-full max-h-[400px] object-contain drop-shadow-2xl" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white">{getText(selectedModel.name, selectedModel.nameFa)}</h3>
              <div className="flex items-center gap-1 text-amber-500 mt-2">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="text-sm font-bold">{selectedModel.rating}</span>
                <span className="text-xs text-gray-400">({selectedModel.reviews})</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
                  <p className="text-xs text-gray-500">{getText("Chip", "تراشه")}</p>
                  <p className="font-black">{selectedModel.chip}</p>
                </div>
                <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
                  <p className="text-xs text-gray-500">{getText("Display", "نمایشگر")}</p>
                  <p className="font-black">{selectedModel.display}</p>
                </div>
                <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
                  <p className="text-xs text-gray-500">{getText("Camera", "دوربین")}</p>
                  <p className="font-black">{selectedModel.camera}</p>
                </div>
                <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
                  <p className="text-xs text-gray-500">{getText("Battery", "باتری")}</p>
                  <p className="font-black">{selectedModel.battery}</p>
                </div>
              </div>
              <Link to={selectedModel.articleLink} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black hover:shadow-xl transition-all mt-4">
                {getText("Read Review", "مطالعه بررسی")} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
