// src/pages/Cart.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaApple,
  FaShoppingBag,
  FaCreditCard,
  FaPaypal,
  FaGooglePay,
  FaGift,
  FaTruck,
  FaShieldAlt,
  FaArrowLeft,
  FaArrowRight,
  FaHeadset,
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaNewspaper,
  FaHome,
  FaUserCircle,
  FaCommentDots,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

// تصاویر واقعی محصولات
import iphone17ProMax from "../assets/iphone/iphone-17-pro-max.png";
import watchUltra4 from "../assets/watch/apple-watch-ultra4.png";

// تصویر Hero سینمایی بزرگ
import heroImage from "../assets/cart-hero/cart-store.png";

// تصاویر جایگزین برای محصولات دیگر
const airpodsImg = "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400";
const macbookImg = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400";

// داده‌های نمونه برای سبد خرید با تصاویر واقعی
const initialCartItems = [
  {
    id: 1,
    name: "iPhone 17 Pro Max",
    nameFa: "آیفون ۱۷ پرو مکس",
    price: 1299,
    quantity: 1,
    image: iphone17ProMax,
    color: "Natural Titanium",
    colorFa: "تیتانیوم طبیعی",
    storage: "512GB",
    rating: 5,
  },
  {
    id: 2,
    name: "Apple Watch Ultra 4",
    nameFa: "اپل واچ اولترا ۴",
    price: 999,
    quantity: 1,
    image: watchUltra4,
    color: "Black Titanium",
    colorFa: "تیتانیوم مشکی",
    storage: "64GB",
    rating: 5,
  },
  {
    id: 3,
    name: "AirPods Pro 3",
    nameFa: "ایرپادز پرو ۳",
    price: 249,
    quantity: 2,
    image: airpodsImg,
    color: "White",
    colorFa: "سفید",
    storage: null,
    rating: 4.8,
  },
];

// لینک‌های سریع
const quickLinks = [
  { name: "Home", nameFa: "خانه", icon: <FaHome />, path: "/" },
  { name: "Blog", nameFa: "مقالات", icon: <FaNewspaper />, path: "/blog" },
  { name: "About", nameFa: "درباره ما", icon: <FaUserCircle />, path: "/about" },
  { name: "Contact", nameFa: "تماس با ما", icon: <FaHeadset />, path: "/contact" },
];

// اطلاعات تماس
const contactInfo = {
  email: "fatimarostami963369@gmail.com",
  phone: "+989177892994",
  whatsapp: "https://wa.me/989177892994",
  telegram: "https://t.me/fitness_mindset",
  instagram: "https://www.instagram.com/fateme.rosttamii",
  linkedin: "https://www.linkedin.com/in/fatemeh-rostami",
  github: "https://github.com/rostamifatemeh963",
  address: "Tehran, Iran",
  hours: "Sat - Thu: 9 AM - 6 PM",
};

// مقالات محبوب
const popularArticles = [
  { title: "iPhone 17 Pro Max Review", titleFa: "بررسی آیفون ۱۷ پرو مکس", slug: "iphone-17-pro-max" },
  { title: "Galaxy S24 Ultra AI", titleFa: "هوش مصنوعی گلکسی S24 اولترا", slug: "galaxy-s24-ultra-ai-revolution" },
  { title: "Apple vs Samsung Camera", titleFa: "مقایسه دوربین اپل و سامسونگ", slug: "iphone-vs-samsung-camera-battle-2025" },
];

export default function Cart() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);

  // افکت سینمایی - دنبال کردن موس
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // محاسبات
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 29;
  const tax = subtotal * 0.09;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const increaseQuantity = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "techcrunch10") {
      setPromoApplied(true);
    } else {
      alert(isRtl ? "کد تخفیف نامعتبر است" : "Invalid promo code");
    }
  };

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(isRtl ? "در حال انتقال به درگاه پرداخت..." : "Redirecting to payment gateway...");
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // شبکه‌های اجتماعی
  const socialLinks = [
    { icon: <FaWhatsapp />, url: contactInfo.whatsapp, color: "hover:text-green-500", name: "WhatsApp" },
    { icon: <FaTelegram />, url: contactInfo.telegram, color: "hover:text-blue-500", name: "Telegram" },
    { icon: <FaInstagram />, url: contactInfo.instagram, color: "hover:text-pink-500", name: "Instagram" },
    { icon: <FaLinkedin />, url: contactInfo.linkedin, color: "hover:text-blue-700", name: "LinkedIn" },
    { icon: <FaGithub />, url: contactInfo.github, color: "hover:text-gray-700", name: "GitHub" },
  ];

  // کانال‌های چت آنلاین
  const chatChannels = [
    { name: "WhatsApp", icon: <FaWhatsapp size={24} />, url: contactInfo.whatsapp, color: "from-green-500 to-green-600" },
    { name: "Telegram", icon: <FaTelegram size={24} />, url: contactInfo.telegram, color: "from-blue-500 to-blue-600" },
    { name: "Instagram", icon: <FaInstagram size={24} />, url: contactInfo.instagram, color: "from-pink-500 to-orange-500" },
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{isRtl ? "سبد خرید | تک‌کرانچ" : "Shopping Cart | TechCrunch"}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        
        {/* Hero Image Banner - سینمایی بزرگ با افکت پیشرفته */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl group"
        >
          {/* افکت دنبال کننده موس پیشرفته */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.35), transparent 70%)`
            }}
          />
          
          <div className="relative h-64 md:h-96 lg:h-[550px] w-full">
            <img
              src={heroImage}
              alt="Apple Store"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            
            {/* گرادیانت‌های چندلایه */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-12 lg:px-16 text-left text-white">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/30 backdrop-blur-sm flex items-center justify-center border border-amber-500/30">
                      <FaApple className="w-7 h-7 text-amber-400" />
                    </div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 tracking-tight leading-tight">
                    {isRtl ? "سبد خرید" : "Shopping Cart"}
                    <span className="block text-amber-400 text-2xl md:text-3xl lg:text-4xl mt-2">
                      {isRtl ? "محصولات منتخب شما" : "Your Selected Items"}
                    </span>
                  </h2>
                  <p className="text-base md:text-lg text-white/80 max-w-md mb-6 leading-relaxed">
                    {isRtl
                      ? "مرور کنید، مقایسه کنید و سفارش خود را با اطمینان کامل نهایی سازید"
                      : "Browse, compare and finalize your order with complete confidence"}
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-0.5 bg-amber-400 rounded-full" />
                      <span className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                        {cartItems.length} {isRtl ? "محصول" : "Items"} • ${total.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* افکت نور پردازی سینمایی */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/25 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          {/* خطوط نورانی */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/10 shadow-2xl"
          >
            <div className="text-9xl mb-6">🛒</div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
              {isRtl ? "سبد خرید خالی است" : "Your cart is empty"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {isRtl 
                ? "به نظر می‌رسد هنوز محصولی به سبد خرید اضافه نکرده‌اید. فروشگاه ما را کاوش کنید!" 
                : "Looks like you haven't added any items yet. Explore our store!"}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black rounded-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105"
            >
              {isRtl ? <FaArrowRight /> : <FaArrowLeft />}
              {isRtl ? "شروع خرید" : "Start Shopping"}
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* ==================== LEFT SIDE - CART ITEMS ==================== */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <FaShoppingBag className="text-amber-500" />
                  {isRtl ? "محصولات" : "Products"} ({cartItems.length})
                </h2>
                <button 
                  onClick={() => setCartItems([])}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors font-medium"
                >
                  {isRtl ? "حذف همه" : "Clear all"}
                </button>
              </div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      layout
                      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border transition-all duration-300 ${
                        hoveredItem === item.id 
                          ? "border-amber-500/70 shadow-2xl shadow-amber-500/20 scale-[1.01]" 
                          : "border-white/40 dark:border-white/10 hover:border-amber-500/50"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex-shrink-0 relative group">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                                {isRtl ? item.nameFa : item.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {item.color && (
                                  <span className="px-2 py-0.5 rounded-full bg-white/50 dark:bg-white/5 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    {isRtl ? item.colorFa : item.color}
                                  </span>
                                )}
                                {item.storage && (
                                  <span className="px-2 py-0.5 rounded-full bg-white/50 dark:bg-white/5 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    {item.storage}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 mt-2">
                                {[...Array(5)].map((_, i) => (
                                  i < Math.floor(item.rating) ? (
                                    <FaStar key={i} className="text-amber-400 text-xs" />
                                  ) : (
                                    <FaRegStar key={i} className="text-gray-300 dark:text-gray-600 text-xs" />
                                  )
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">${item.price}</p>
                              <p className="text-xs text-gray-400">{isRtl ? "هر عدد" : "each"}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => decreaseQuantity(item.id)}
                                className={`w-8 h-8 rounded-xl bg-white/60 dark:bg-white/10 border border-gray-200 dark:border-white/15 flex items-center justify-center transition-all duration-300 ${
                                  hoveredItem === item.id ? "bg-amber-500 text-white border-amber-500" : "hover:bg-amber-500 hover:text-white"
                                }`}
                              >
                                <FaMinus size={12} />
                              </button>
                              <span className="w-10 text-center font-black text-gray-900 dark:text-white text-lg">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseQuantity(item.id)}
                                className={`w-8 h-8 rounded-xl bg-white/60 dark:bg-white/10 border border-gray-200 dark:border-white/15 flex items-center justify-center transition-all duration-300 ${
                                  hoveredItem === item.id ? "bg-amber-500 text-white border-amber-500" : "hover:bg-amber-500 hover:text-white"
                                }`}
                              >
                                <FaPlus size={12} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
                            >
                              <FaTrashAlt size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* ==================== RIGHT SIDE - ALL INFO PANELS ==================== */}
            <div className="lg:w-96 flex-shrink-0">
              <div className="sticky top-24 space-y-5">
                
                {/* Order Summary Card - طراحی جدید */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-white/10 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-200 dark:border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <HiOutlineSparkles className="text-white text-sm" />
                    </div>
                    <h2 className="text-lg font-black text-gray-900 dark:text-white">
                      {isRtl ? "خلاصه سفارش" : "Order Summary"}
                    </h2>
                  </div>

                  <div className="space-y-3 pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">{isRtl ? "جمع کل" : "Subtotal"}</span>
                      <span className="font-bold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">{isRtl ? "حمل و نقل" : "Shipping"}</span>
                      <span className={`font-bold ${shipping === 0 ? "text-green-500" : "text-gray-900 dark:text-white"}`}>
                        {shipping === 0 ? (isRtl ? "رایگان" : "Free") : `$${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">{isRtl ? "مالیات (۹٪)" : "Tax (9%)"}</span>
                      <span className="font-bold text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between items-center text-green-500">
                        <span>{isRtl ? "تخفیف (۱۰٪)" : "Discount (10%)"}</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center py-4 border-t border-gray-200 dark:border-white/10">
                    <span className="text-lg font-black text-gray-900 dark:text-white">{isRtl ? "مجموع" : "Total"}</span>
                    <span className="text-2xl font-black text-amber-600 dark:text-amber-400">${total.toFixed(2)}</span>
                  </div>

                  {/* Promo Code */}
                  <div className="flex gap-2 mb-6">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder={isRtl ? "کد تخفیف" : "Promo code"}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/15 focus:border-amber-500 focus:outline-none text-sm font-medium"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoApplied}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isRtl ? "اعمال" : "Apply"}
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="flex justify-center gap-4 mb-6 py-3 border-y border-gray-200 dark:border-white/10">
                    <FaCreditCard className="text-gray-400 text-2xl hover:text-amber-500 transition-colors cursor-pointer" />
                    <FaPaypal className="text-gray-400 text-2xl hover:text-amber-500 transition-colors cursor-pointer" />
                    <FaGooglePay className="text-gray-400 text-2xl hover:text-amber-500 transition-colors cursor-pointer" />
                    <FaApple className="text-gray-400 text-2xl hover:text-amber-500 transition-colors cursor-pointer" />
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm uppercase tracking-wider hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaShoppingBag size={16} />
                        {isRtl ? "پرداخت" : "Checkout"}
                      </>
                    )}
                  </button>

                  {/* Free Shipping Info */}
                  <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                      <FaTruck className="animate-pulse" />
                      <span className="font-bold">
                        {subtotal >= 1000 
                          ? (isRtl ? "ارسال رایگان!" : "Free Shipping!")
                          : (isRtl 
                              ? `${(1000 - subtotal).toFixed(0)} دلار تا ارسال رایگان` 
                              : `${(1000 - subtotal).toFixed(0)} more for free shipping`)}
                      </span>
                    </div>
                  </div>

                  {/* Secure Checkout */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <FaShieldAlt size={12} />
                    <span>{isRtl ? "پرداخت امن تضمین شده" : "Secure checkout guaranteed"}</span>
                  </div>
                </motion.div>

                {/* Live Chat Support Card - طراحی جدید */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-xl rounded-2xl p-5 border border-amber-500/30 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                        <FaCommentDots className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-gray-900 dark:text-white">
                          {isRtl ? "پشتیبانی ۲۴/۷" : "24/7 Support"}
                        </h3>
                        <p className="text-[11px] text-green-600 dark:text-green-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          {isRtl ? "آنلاین - پاسخ فوری" : "Online - Instant reply"}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isChatOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-amber-500 text-sm font-bold"
                    >
                      ▼
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isChatOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-amber-500/20 space-y-2">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {isRtl
                              ? "از طریق پیامرسان‌های زیر با ما در ارتباط باشید:"
                              : "Connect with us via messengers:"}
                          </p>
                          {chatChannels.map((channel, idx) => (
                            <a
                              key={idx}
                              href={channel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-white/5 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-amber-600/20 transition-all duration-300 group"
                            >
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${channel.color} flex items-center justify-center text-white shadow-md`}>
                                {channel.icon}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-amber-500 transition-colors">
                                  {channel.name}
                                </p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                  {isRtl ? "پاسخگویی فوری" : "Instant response"}
                                </p>
                              </div>
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Special Offer Card - طراحی جدید */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-xl rounded-2xl p-5 border border-amber-500/30 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <FaGift className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-base font-black text-gray-900 dark:text-white mb-1">
                    {isRtl ? "کد تخفیف ویژه" : "Special Discount"}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3">
                    {isRtl
                      ? "با کد TECHCRUNCH10 از ۱۰٪ تخفیف بهره‌مند شوید"
                      : "Get 10% off with code: TECHCRUNCH10"}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30">
                    <code className="text-xs font-black text-amber-600 dark:text-amber-400 tracking-wider">
                      TECHCRUNCH10
                    </code>
                    <button 
                      onClick={() => navigator.clipboard.writeText("TECHCRUNCH10")}
                      className="text-amber-500 hover:text-amber-600 transition-colors text-xs"
                    >
                      📋
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Shopping Link - طراحی جدید */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 text-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-amber-500 transition-all duration-300 group"
            >
              {isRtl ? (
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              ) : (
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              )}
              <span className="font-medium">{isRtl ? "ادامه خرید" : "Continue Shopping"}</span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}