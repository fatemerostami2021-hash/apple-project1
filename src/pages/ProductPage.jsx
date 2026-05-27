// src/pages/ProductPage.jsx - نسخه کامل با کادرهای گلاسی طلایی
import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../store/theme";

// انیمیشن‌های اختصاصی این صفحه
import StarryBackground from "../components/StarryBackground";
import BrandBubbles from "../components/BrandBubbles";

// Icons
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineShare,
  HiOutlineShoppingBag,
  HiOutlineStar,
  HiOutlineCheck,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineCreditCard,
  HiOutlineClock,
  HiOutlineCamera,
  HiOutlineDeviceMobile,
  HiOutlineChip,
} from "react-icons/hi";
import { FaApple, FaAndroid, FaYoutube, FaPlay } from "react-icons/fa";

// اطلاعات کامل محصولات
const productsData = {
  "s24-ultra": {
    id: "s24-ultra",
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    tagline: "هوش مصنوعی در دستان شما",
    price: 1299,
    oldPrice: 1499,
    discount: 13,
    rating: 4.9,
    reviews: 2150,
    colors: [
      { name: "Titanium Gray", code: "#6B7280" },
      { name: "Titanium Black", code: "#1F2937" },
      { name: "Titanium Violet", code: "#8B5CF6" },
      { name: "Titanium Yellow", code: "#FBBF24" },
    ],
    storage: ["256GB", "512GB", "1TB"],
    specifications: [
      { icon: HiOutlineChip, label: "پردازنده", value: "Snapdragon 8 Gen 3" },
      { icon: HiOutlineCamera, label: "دوربین", value: "200MP" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "5000mAh" },
      { icon: HiOutlineClock, label: "شارژ", value: "45W" },
    ],
    features: ["دوربین 200 مگاپیکسلی", "قلم S Pen", "Galaxy AI", "نمایشگر 2600 نیت"],
    whatsInBox: ["گوشی", "کابل USB-C", "S Pen", "دفترچه"],
    images: [
      "/images/hero-slider-home/hero-1.png",
      "/images/hero-slider-home/hero-6.png",
      "/images/hero-slider-home/hero-12.png",
    ],
  },
  "apple-eco": {
    id: "apple-eco",
    brand: "Apple",
    name: "اکوسیستم اپل",
    tagline: "هماهنگی بی‌نظیر بین دستگاه‌ها",
    price: 2499,
    oldPrice: 2999,
    discount: 16,
    rating: 4.8,
    reviews: 890,
    colors: [
      { name: "Space Gray", code: "#4B5563" },
      { name: "Silver", code: "#E5E7EB" },
    ],
    storage: ["512GB", "1TB", "2TB"],
    specifications: [
      { icon: HiOutlineChip, label: "تراشه", value: "M3 / A17 Pro" },
      { icon: HiOutlineCamera, label: "دوربین", value: "سیستم یکپارچه" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "هماهنگ" },
      { icon: HiOutlineClock, label: "همگام‌سازی", value: "iCloud" },
    ],
    features: ["Handoff", "Universal Clipboard", "AirDrop", "Sidecar", "iCloud"],
    whatsInBox: ["iPhone", "MacBook", "iPad", "Apple Watch", "AirPods"],
    images: ["/images/hero-slider-home/hero-2.png", "/images/hero-slider-home/hero-11.png"],
  },
  "watch-s9": {
    id: "watch-s9",
    brand: "Apple",
    name: "Apple Watch Series 9",
    tagline: "باهوش‌تر، درخشان‌تر، قدرتمندتر",
    price: 399,
    oldPrice: 449,
    discount: 11,
    rating: 4.8,
    reviews: 2100,
    colors: [
      { name: "Midnight", code: "#1A202C" },
      { name: "Starlight", code: "#FEF3C7" },
      { name: "Silver", code: "#E5E7EB" },
      { name: "Product RED", code: "#E53E3E" },
    ],
    storage: ["41mm", "45mm"],
    specifications: [
      { icon: HiOutlineChip, label: "تراشه", value: "S9 SIP" },
      { icon: HiOutlineCamera, label: "دوربین", value: "ندارد" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "18 ساعت" },
      { icon: HiOutlineClock, label: "شارژ", value: "USB-C" },
    ],
    features: ["Double Tap", "Always-On Display", "ECG", "خون‌اکسیژن"],
    whatsInBox: ["Apple Watch", "بند", "کابل شارژ مغناطیسی", "دفترچه"],
    images: ["/images/hero-slider-home/hero-3.png"],
  },
  "iphone-13-red": {
    id: "iphone-13-red",
    brand: "Apple",
    name: "iPhone 13 Product Red",
    tagline: "رنگ خاص، قدرت بی‌پایان",
    price: 699,
    oldPrice: 899,
    discount: 22,
    rating: 4.7,
    reviews: 1800,
    colors: [
      { name: "Product RED", code: "#E53E3E" },
      { name: "Midnight", code: "#1A202C" },
      { name: "Starlight", code: "#FEF3C7" },
    ],
    storage: ["128GB", "256GB", "512GB"],
    specifications: [
      { icon: HiOutlineChip, label: "تراشه", value: "A15 Bionic" },
      { icon: HiOutlineCamera, label: "دوربین", value: "12MP" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "3227mAh" },
      { icon: HiOutlineClock, label: "شارژ", value: "20W" },
    ],
    features: ["رنگ قرمز خاص", "تراشه A15", "دوربین دوگانه", "5G"],
    whatsInBox: ["iPhone 13", "کابل USB-C", "دفترچه", "برچسب"],
    images: ["/images/hero-slider-home/hero-4.png"],
  },
  "iphone-15-pro": {
    id: "iphone-15-pro",
    brand: "Apple",
    name: "iPhone 15 Pro",
    tagline: "ساخته شده از تیتانیوم",
    price: 1099,
    oldPrice: 1299,
    discount: 15,
    rating: 4.9,
    reviews: 3200,
    colors: [
      { name: "Natural Titanium", code: "#8B8589" },
      { name: "Blue Titanium", code: "#3B82F6" },
      { name: "White Titanium", code: "#F3F4F6" },
      { name: "Black Titanium", code: "#1F2937" },
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    specifications: [
      { icon: HiOutlineChip, label: "تراشه", value: "A17 Pro" },
      { icon: HiOutlineCamera, label: "دوربین", value: "48MP" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "3274mAh" },
      { icon: HiOutlineClock, label: "شارژ", value: "27W" },
    ],
    features: ["فریم تیتانیومی", "دکمه Action", "USB-C", "Dynamic Island"],
    whatsInBox: ["iPhone 15 Pro", "کابل USB-C", "دفترچه", "برچسب"],
    images: ["/images/hero-slider-home/hero-5.png"],
  },
  "samsung-flagship": {
    id: "samsung-flagship",
    brand: "Samsung",
    name: "Samsung Galaxy S24 Series",
    tagline: "خانواده اس ۲۴، اوج تکنولوژی",
    price: 999,
    oldPrice: 1199,
    discount: 16,
    rating: 4.8,
    reviews: 1800,
    colors: [
      { name: "Titanium Gray", code: "#6B7280" },
      { name: "Titanium Black", code: "#1F2937" },
      { name: "Titanium Violet", code: "#8B5CF6" },
    ],
    storage: ["128GB", "256GB", "512GB"],
    specifications: [
      { icon: HiOutlineChip, label: "پردازنده", value: "Snapdragon 8 Gen 3" },
      { icon: HiOutlineCamera, label: "دوربین", value: "200MP" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "4900mAh" },
      { icon: HiOutlineClock, label: "شارژ", value: "45W" },
    ],
    features: ["Galaxy AI", "دوربین حرفه‌ای", "نمایشگر 120Hz", "باتری قوی"],
    whatsInBox: ["گوشی", "کابل USB-C", "دفترچه", "ابزار سیم‌کارت"],
    images: ["/images/hero-slider-home/hero-6.png", "/images/hero-slider-home/hero-12.png"],
  },
  "macbook-pro": {
    id: "macbook-pro",
    brand: "Apple",
    name: "MacBook Pro M3",
    tagline: "قدرت حرفه‌ای‌ها",
    price: 1999,
    oldPrice: 2499,
    discount: 20,
    rating: 4.9,
    reviews: 950,
    colors: [
      { name: "Space Gray", code: "#4B5563" },
      { name: "Silver", code: "#E5E7EB" },
    ],
    storage: ["512GB", "1TB", "2TB"],
    specifications: [
      { icon: HiOutlineChip, label: "تراشه", value: "M3 Pro" },
      { icon: HiOutlineCamera, label: "دوربین", value: "1080p" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "22 ساعت" },
      { icon: HiOutlineClock, label: "شارژ", value: "MagSafe" },
    ],
    features: ["تراشه M3 Pro", "نمایشگر XDR", "باتری 22 ساعت", "6 اسپیکر"],
    whatsInBox: ["MacBook Pro", "کابل MagSafe", "آداپتور", "دفترچه"],
    images: ["/images/hero-slider-home/hero-7.png"],
  },
  "ipad-pro-m2": {
    id: "ipad-pro-m2",
    brand: "Apple",
    name: "iPad Pro M2",
    tagline: "تبلتی که جای کامپیوتر را می‌گیرد",
    price: 999,
    oldPrice: 1199,
    discount: 16,
    rating: 4.8,
    reviews: 1200,
    colors: [
      { name: "Space Gray", code: "#4B5563" },
      { name: "Silver", code: "#E5E7EB" },
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    specifications: [
      { icon: HiOutlineChip, label: "تراشه", value: "M2" },
      { icon: HiOutlineCamera, label: "دوربین", value: "12MP" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "10 ساعت" },
      { icon: HiOutlineClock, label: "شارژ", value: "20W" },
    ],
    features: ["تراشه M2", "Apple Pencil hover", "LiDAR", "5G"],
    whatsInBox: ["iPad Pro", "کابل USB-C", "آداپتور", "دفترچه"],
    images: ["/images/hero-slider-home/hero-8.png", "/images/hero-slider-home/hero-13.png"],
  },
  "iphone-17-concept-1": {
    id: "iphone-17-concept-1",
    brand: "Concept",
    name: "iPhone 17 Pro Max (Concept)",
    tagline: "رندر مفهومی از آینده اپل",
    price: 1499,
    rating: 4.5,
    reviews: 450,
    colors: [
      { name: "Orange Metallic", code: "#FF8C00" },
      { name: "Space Black", code: "#1A1A1A" },
    ],
    storage: ["256GB", "512GB", "1TB"],
    specifications: [
      { icon: HiOutlineChip, label: "پردازنده", value: "A18 Bionic" },
      { icon: HiOutlineCamera, label: "دوربین", value: "48MP + 48MP" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "5000mAh" },
      { icon: HiOutlineClock, label: "شارژ", value: "35W" },
    ],
    features: ["طراحی جدید", "دوربین زیر نمایشگر", "USB-C", "باتری بزرگ"],
    whatsInBox: ["گوشی", "کابل USB-C", "دفترچه"],
    images: ["/images/hero-slider-home/hero-9.png"],
  },
  "iphone-17-concept-2": {
    id: "iphone-17-concept-2",
    brand: "Concept",
    name: "iPhone 17 Pro Max Dual-View",
    tagline: "نمای نزدیک از طراحی آینده",
    price: 1599,
    rating: 4.6,
    reviews: 320,
    colors: [
      { name: "Titanium Orange", code: "#D97A00" },
      { name: "Deep Purple", code: "#6B21A5" },
    ],
    storage: ["512GB", "1TB"],
    specifications: [
      { icon: HiOutlineChip, label: "پردازنده", value: "A18 Bionic Pro" },
      { icon: HiOutlineCamera, label: "دوربین", value: "48MP Quad" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "5200mAh" },
      { icon: HiOutlineClock, label: "شارژ", value: "40W" },
    ],
    features: ["ماژول دوربین دایره‌ای", "طراحی یکپارچه", "Titanium Frame"],
    whatsInBox: ["گوشی", "کابل USB-C", "کیس محافظ", "دفترچه"],
    images: ["/images/hero-slider-home/hero-10.png"],
  },
  "apple-full-eco": {
    id: "apple-full-eco",
    brand: "Apple",
    name: "Full Apple Studio Setup",
    tagline: "ست کامل محصولات اپل برای میز کار حرفه‌ای",
    price: 4999,
    oldPrice: 5999,
    discount: 16,
    rating: 4.9,
    reviews: 280,
    colors: [
      { name: "Silver", code: "#E5E7EB" },
      { name: "Space Gray", code: "#4B5563" },
    ],
    storage: ["1TB", "2TB"],
    specifications: [
      { icon: HiOutlineChip, label: "تراشه", value: "M2 Ultra" },
      { icon: HiOutlineCamera, label: "دوربین", value: "Studio Display" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "برق شهری" },
      { icon: HiOutlineClock, label: "شارژ", value: "USB-C" },
    ],
    features: ["Mac Studio", "Studio Display", "Magic Keyboard", "Magic Mouse"],
    whatsInBox: ["Mac Studio", "Studio Display", "Magic Keyboard", "Magic Mouse", "کابل‌ها"],
    images: ["/images/hero-slider-home/hero-11.png"],
  },
  "s24-family": {
    id: "s24-family",
    brand: "Samsung",
    name: "Galaxy S24 Series Family",
    tagline: "انتخاب بین بهترین‌ها",
    price: 799,
    oldPrice: 999,
    discount: 20,
    rating: 4.7,
    reviews: 1500,
    colors: [
      { name: "Titanium Gray", code: "#6B7280" },
      { name: "Titanium Black", code: "#1F2937" },
      { name: "Titanium Yellow", code: "#FBBF24" },
    ],
    storage: ["128GB", "256GB", "512GB"],
    specifications: [
      { icon: HiOutlineChip, label: "پردازنده", value: "Snapdragon 8 Gen 3" },
      { icon: HiOutlineCamera, label: "دوربین", value: "50MP + 12MP" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "4000mAh" },
      { icon: HiOutlineClock, label: "شارژ", value: "25W" },
    ],
    features: ["Galaxy AI", "نمایشگر 120Hz", "طراحی باریک", "باتری مناسب"],
    whatsInBox: ["Galaxy S24", "کابل USB-C", "دفترچه", "ابزار سیم‌کارت"],
    images: ["/images/hero-slider-home/hero-12.png"],
  },
  "ipad-pro-creative": {
    id: "ipad-pro-creative",
    brand: "Apple",
    name: "iPad Pro Creative Edition",
    tagline: "ابزاری برای هنرمندان و طراحان دیجیتال",
    price: 1299,
    oldPrice: 1499,
    discount: 13,
    rating: 4.9,
    reviews: 890,
    colors: [
      { name: "Space Gray", code: "#4B5563" },
      { name: "Silver", code: "#E5E7EB" },
    ],
    storage: ["512GB", "1TB", "2TB"],
    specifications: [
      { icon: HiOutlineChip, label: "تراشه", value: "M2" },
      { icon: HiOutlineCamera, label: "دوربین", value: "12MP + LiDAR" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "10 ساعت" },
      { icon: HiOutlineClock, label: "شارژ", value: "USB-C" },
    ],
    features: ["Apple Pencil Hover", "ProMotion 120Hz", "LiDAR Scanner", "پشتیبانی از Final Cut"],
    whatsInBox: ["iPad Pro", "کابل USB-C", "آداپتور 20W", "دفترچه"],
    images: ["/images/hero-slider-home/hero-13.png"],
  },
  "watch-collection": {
    id: "watch-collection",
    brand: "Apple",
    name: "Apple Watch Collection",
    tagline: "تنوعی از بندها و مدل‌های اپل واچ",
    price: 299,
    oldPrice: 399,
    discount: 25,
    rating: 4.7,
    reviews: 2100,
    colors: [
      { name: "Midnight", code: "#1A202C" },
      { name: "Starlight", code: "#FEF3C7" },
      { name: "Product RED", code: "#E53E3E" },
      { name: "Blue", code: "#3B82F6" },
    ],
    storage: ["40mm", "44mm"],
    specifications: [
      { icon: HiOutlineChip, label: "تراشه", value: "S8 SIP" },
      { icon: HiOutlineCamera, label: "دوربین", value: "ندارد" },
      { icon: HiOutlineDeviceMobile, label: "باتری", value: "18 ساعت" },
      { icon: HiOutlineClock, label: "شارژ", value: "USB-C" },
    ],
    features: ["Always-On Display", "ECG", "خون‌اکسیژن", "ضد آب"],
    whatsInBox: ["Apple Watch", "بند انتخابی", "کابل شارژ", "دفترچه"],
    images: ["/images/hero-slider-home/hero-14.png"],
  },
};

// تابع دریافت محصول با هندل کردن idهای مختلف
const getProductById = (id) => {
  if (!id) return null;
  if (productsData[id]) return productsData[id];
  const possibleIds = Object.keys(productsData);
  for (const pid of possibleIds) {
    if (pid.includes(id) || id.includes(pid)) {
      return productsData[pid];
    }
  }
  return null;
};

// ویدیوهای مرتبط
const relatedVideos = [
  {
    id: "video1",
    title: "iPhone 17 Pro Max Review - The Ultimate Smartphone?",
    channel: "Marques Brownlee",
    url: "https://youtu.be/yojtBfY8_lU",
    thumbnail: "https://img.youtube.com/vi/yojtBfY8_lU/mqdefault.jpg",
    duration: "18:24",
    views: "2.3M",
    type: "foreign",
  },
  {
    id: "video2",
    title: "Samsung Galaxy S25 Ultra vs iPhone 17 Pro Max Camera Test",
    channel: "Mrwhosetheboss",
    url: "https://youtu.be/mzv1iCIB5lI",
    thumbnail: "https://img.youtube.com/vi/mzv1iCIB5lI/mqdefault.jpg",
    duration: "15:42",
    views: "1.8M",
    type: "foreign",
  },
  {
    id: "video3",
    title: "بررسی تخصصی آیفون ۱۷ پرو مکس | قدرتمندترین آیفون تاریخ",
    channel: "دیجیاتو",
    url: "https://youtu.be/bnhcpynsGsQ",
    thumbnail: "https://img.youtube.com/vi/bnhcpynsGsQ/mqdefault.jpg",
    duration: "25:18",
    views: "156K",
    type: "persian",
  },
  {
    id: "video4",
    title: "مقایسه گلکسی S24 اولترا با آیفون ۱۵ پرو مکس",
    channel: "زومیت",
    url: "https://youtu.be/BEhP9Ek68ZQ",
    thumbnail: "https://img.youtube.com/vi/BEhP9Ek68ZQ/mqdefault.jpg",
    duration: "19:35",
    views: "98K",
    type: "persian",
  },
];

// کامپوننت ProductGallery
const ProductGallery = React.memo(({ images, title }) => {
  const [activeImage, setActiveImage] = useState(0);
  
  if (!images || images.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center text-white">
          <span>تصویری موجود نیست</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 shadow-xl shadow-yellow-500/10">
        <img
          src={images[activeImage]}
          alt={title}
          className="w-full h-[400px] md:h-[500px] object-contain p-8 transition-all duration-500"
          loading="eager"
          onError={(e) => { e.target.src = "/images/placeholder.png"; }}
        />
        <div className="absolute inset-0 rounded-3xl border-2 border-yellow-400/0 group-hover:border-yellow-400/50 transition-all duration-500 pointer-events-none" />
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-3 mt-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                activeImage === idx
                  ? "ring-2 ring-yellow-500 scale-105 shadow-lg shadow-yellow-500/30"
                  : "ring-1 ring-yellow-500/30 opacity-70 hover:opacity-100"
              }`}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${idx + 1}`} 
                className="w-full h-full object-cover" 
                loading="lazy"
                onError={(e) => { e.target.src = "/images/placeholder.png"; }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

ProductGallery.displayName = 'ProductGallery';

// کامپوننت SpecCard
const SpecCard = React.memo(({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-yellow-500/30 hover:border-yellow-500/70 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/30 transition-all duration-300">
      <Icon className="w-6 h-6 text-yellow-400" />
    </div>
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-extrabold text-white">{value}</p>
    </div>
  </div>
));

SpecCard.displayName = 'SpecCard';

// کامپوننت VideoCard
const VideoCard = React.memo(({ video }) => {
  const openVideo = useCallback(() => {
    window.open(video.url, "_blank", "noopener,noreferrer");
  }, [video.url]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer rounded-xl overflow-hidden bg-black/40 backdrop-blur-md border border-yellow-500/30 hover:border-yellow-500/70 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
      onClick={openVideo}
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = "https://img.youtube.com/vi/default/mqdefault.jpg"; }}
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
            <FaPlay className="w-5 h-5 text-black ml-0.5" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono border border-yellow-500/30">
          {video.duration}
        </span>
        {video.type === "persian" && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">فارسی</span>
        )}
      </div>
      <div className="p-3">
        <h4 className="text-xs font-bold text-white line-clamp-2 mb-1 group-hover:text-yellow-400 transition-colors">
          {video.title}
        </h4>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <FaYoutube className="text-red-500 text-[10px]" />
            <span className="text-[9px] text-gray-400">{video.channel}</span>
          </div>
          <span className="text-[9px] text-gray-400">{video.views}</span>
        </div>
      </div>
    </motion.div>
  );
});

VideoCard.displayName = 'VideoCard';

// کامپوننت اصلی ProductPage
const ProductPage = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isRTL = i18n.language === "fa";

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [activeVideoTab, setActiveVideoTab] = useState("all");

  const product = getProductById(id);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setSelectedStorage(product.storage?.[0] || null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product, id]);

  const handleBuyNow = useCallback(() => {
    navigate("/products");
  }, [navigate]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const filteredVideos = activeVideoTab === "all" 
    ? relatedVideos 
    : relatedVideos.filter(v => v.type === activeVideoTab);

  if (!product) {
    return (
      <>
        <StarryBackground />
        <BrandBubbles />
        <div className="min-h-screen flex items-center justify-center bg-black relative z-10">
          <div className="text-center bg-black/80 backdrop-blur-md p-8 rounded-2xl border border-yellow-500/50 shadow-xl shadow-yellow-500/20">
            <h1 className="text-2xl font-black text-white mb-4">
              {isRTL ? "محصول یافت نشد" : "Product Not Found"}
            </h1>
            <p className="text-gray-400 mb-6">
              {isRTL 
                ? "متأسفیم، محصول مورد نظر شما یافت نشد." 
                : "Sorry, the product you're looking for was not found."}
            </p>
            <button 
              onClick={() => navigate("/")} 
              className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-500/30"
            >
              {isRTL ? "بازگشت به صفحه اصلی" : "Back to Home"}
            </button>
          </div>
        </div>
      </>
    );
  }

  const productName = product.name;
  const productTagline = product.tagline;
  const relatedProductsList = Object.values(productsData).filter(p => p.id !== product.id).slice(0, 4);

  return (
    <>
      <StarryBackground />
      <BrandBubbles />
      
      <div className="min-h-screen bg-transparent pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
            <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors font-medium">
              {isRTL ? "خانه" : "Home"}
            </Link>
            <span className="text-yellow-500/50">/</span>
            {/* <Link to="/products" className="text-gray-400 hover:text-yellow-400 transition-colors font-medium">
              {isRTL ? "محصولات" : "Products"}
            </Link> */}
            <span className="text-yellow-500/50">/</span>
            <span className="text-yellow-400 font-bold">{productName}</span>
          </nav>

          {/* Main Content - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div className="bg-black/30 backdrop-blur-md rounded-3xl p-4 border border-yellow-500/30 shadow-xl shadow-yellow-500/10">
              <ProductGallery images={product.images} title={productName} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                <div className="flex items-center gap-2 mb-3">
                  {product.brand === "Apple" ? (
                    <FaApple className="w-5 h-5 text-gray-300" />
                  ) : (
                    <FaAndroid className="w-5 h-5 text-green-400" />
                  )}
                  <span className="text-sm font-semibold text-gray-400">{product.brand}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                  {productName}
                </h1>
                <p className="text-gray-300 font-medium">{productTagline}</p>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <HiOutlineStar key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.reviews} نظر)</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">${product.price}</span>
                  {product.oldPrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">${product.oldPrice}</span>
                      <span className="bg-red-500/20 text-red-400 text-sm font-bold px-2 py-1 rounded-full border border-red-500/30">
                        {product.discount}% تخفیف
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Storage Selector */}
              {product.storage?.length > 0 && (
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                  <h3 className="text-sm font-bold text-gray-300 mb-3">
                    حافظه داخلی: <span className="text-yellow-400">{selectedStorage}</span>
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.storage.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedStorage(size)}
                        className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                          selectedStorage === size
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/30 scale-105"
                            : "bg-white/10 text-white hover:bg-white/20 border border-yellow-500/30 hover:border-yellow-500/60"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors?.length > 0 && (
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                  <h3 className="text-sm font-bold text-gray-300 mb-3">
                    رنگ: <span className="text-yellow-400">{selectedColor?.name}</span>
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative transition-all duration-300 ${
                          selectedColor?.name === color.name ? "scale-110" : "hover:scale-105"
                        }`}
                      >
                        <div
                          className="w-12 h-12 rounded-full shadow-md transition-all duration-300 ring-2 ring-yellow-500/50"
                          style={{ backgroundColor: color.code }}
                        />
                        {selectedColor?.name === color.name && (
                          <div className="absolute -inset-1 rounded-full border-2 border-yellow-400 animate-pulse" />
                        )}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-black/90 text-white text-xs font-bold px-2 py-1 rounded-full border border-yellow-500/30 z-10">
                          {color.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                <h3 className="text-sm font-bold text-gray-300 mb-3">تعداد</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-white/10 text-white font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 border border-yellow-500/30"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-white w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-white/10 text-white font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 border border-yellow-500/30"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-extrabold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/30 transform hover:-translate-y-0.5"
                >
                  <HiOutlineShoppingBag className="w-5 h-5" />
                  مشاهده همه محصولات
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                    isLiked 
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/30 border-red-400" 
                      : "bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 border-yellow-500/30 hover:border-red-500/50"
                  }`}
                >
                  {isLiked ? <HiHeart className="w-6 h-6 fill-white" /> : <HiOutlineHeart className="w-6 h-6" />}
                </button>
                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="w-14 h-14 rounded-2xl bg-white/10 text-white hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300 flex items-center justify-center border border-yellow-500/30 hover:border-blue-500/50"
                  >
                    <HiOutlineShare className="w-6 h-6" />
                  </button>
                  {showShareTooltip && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 text-white text-xs font-bold rounded-full whitespace-nowrap border border-yellow-500/50 shadow-lg">
                      لینک کپی شد!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">مشخصات فنی</h2>
              <div className="mx-auto mt-3 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/30"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.specifications.map((spec, idx) => (
                <SpecCard key={idx} icon={spec.icon} label={spec.label} value={spec.value} />
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-16"
          >
            <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-yellow-500/30 shadow-xl shadow-yellow-500/10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">ویژگی‌های برجسته</h2>
                <div className="mx-auto mt-3 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/30"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-yellow-500/30">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <HiOutlineCheck className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="text-gray-200 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">محصولات مشابه</h2>
              <div className="mx-auto mt-3 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/30"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProductsList.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={`/product/${relProduct.id}`}
                  className="group bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-yellow-500/30 hover:border-yellow-500/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/20"
                >
                  <div className="overflow-hidden rounded-xl h-32">
                    <img
                      src={relProduct.images[0]}
                      alt={relProduct.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-white mt-3 text-center group-hover:text-yellow-400 transition-colors">
                    {relProduct.name}
                  </h3>
                  <p className="text-xs text-gray-400 text-center mt-1 font-medium">${relProduct.price}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Video Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">ویدیوهای بررسی</h2>
              <div className="mx-auto mt-3 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/30"></div>
              <p className="text-sm text-gray-400 mt-3">ویدیوهای بررسی تخصصی در یوتیوب</p>
            </div>

            <div className="flex justify-center gap-3 mb-6">
              {[
                { id: "all", label: "همه" },
                { id: "foreign", label: "خارجی" },
                { id: "persian", label: "فارسی" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveVideoTab(tab.id)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeVideoTab === tab.id
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/30"
                      : "bg-white/10 text-white hover:bg-white/20 border border-yellow-500/30"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </motion.div>

          {/* What's in the Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 mb-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">داخل جعبه</h2>
              <div className="mx-auto mt-3 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/30"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {product.whatsInBox.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-black/30 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-500/70 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 min-w-[100px]">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
                    <HiOutlineCheck className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-xs font-semibold text-center text-white">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProductPage);