// src/components/layout/FloatingSocialButtons.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaCommentDots,
  FaTimes,
  FaHeadset,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { SiWebpack } from "react-icons/si";

// اطلاعات تماس
const CONTACT_INFO = {
  whatsapp: "https://wa.me/989177892994",
  telegram: "https://t.me/fitness_mindset",
  instagram: "https://www.instagram.com/fateme.rosttamii",
  linkedin: "https://www.linkedin.com/in/fatemeh-rostami",
  github: "https://github.com/rostamifatemeh963",
  email: "rostamifatemeh.963@gmail.com",
  phone: "+989177892994",
  bale: "https://ble.ir/00989177892994",
  rubika: "https://web.rubika.ir/",
};

/* ==================== Rubika Icon ==================== */
/*
  آیکون روبیکا:
  - زمینه سبز فیروزه‌ای
  - فرم حباب/دایره با گوشه خاص
  - تیک سفید ضخیم وسط
*/
const RubikaIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-sm"
  >
    {/* Bubble background */}
    <path
      d="M4 8C4 5.8 5.8 4 8 4H35C49.4 4 61 15.6 61 30V34C61 48.4 49.4 60 35 60H8C5.8 60 4 58.2 4 56V8Z"
      fill="#12C7A3"
    />
    {/* Small top-left chat-like corner shape */}
    <path
      d="M4 8C4 5.8 5.8 4 8 4H18C12.5 8 8 13 4 19V8Z"
      fill="#10BFA0"
      opacity="0.9"
    />
    {/* White Checkmark */}
    <path
      d="M20 32.5L29 41.5L46 23.5"
      stroke="white"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ==================== Bale Icon ==================== */
/*
  آیکون بله (پیام‌رسان Bale)
  - زمینه آبی
  - حباب چت با دم
  - علامت سفید
*/
const BaleIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-sm"
  >
    {/* Blue rounded chat bubble */}
    <rect x="5" y="5" width="54" height="54" rx="16" fill="#1DA1F2" />
    {/* Chat tail */}
    <path d="M18 50L14 60L28 54" fill="#1DA1F2" />
    {/* Persian-like abstract white mark */}
    <path
      d="M21 34C21 25.5 27.2 19 35.4 19C43.3 19 49 24.7 49 32.3C49 40.3 42.9 46 34.7 46H23"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="33" cy="32" r="4" fill="white" />
  </svg>
);

/* ==================== Webpack Icon ==================== */
const WebpackIcon = ({ size = 22 }) => (
  <div style={{ width: size, height: size }} className="flex items-center justify-center">
    <SiWebpack className="w-full h-full text-[#8ED6FB]" />
  </div>
);

export default function FloatingSocialButtons() {
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // افکت دنبال کننده موس برای چت
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // کانال‌های چت پشتیبانی
  const chatChannels = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={22} />,
      url: CONTACT_INFO.whatsapp,
      color: "from-green-500 to-green-600",
      username: "+98 917 789 2994",
    },
    {
      name: "Telegram",
      icon: <FaTelegram size={22} />,
      url: CONTACT_INFO.telegram,
      color: "from-blue-500 to-blue-600",
      username: "@fitness_mindset",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={22} />,
      url: CONTACT_INFO.instagram,
      color: "from-pink-500 to-orange-500",
      username: "@fateme.rosttamii",
    },
    {
      name: "Bale",
      icon: <BaleIcon size={24} />,
      url: CONTACT_INFO.bale,
      color: "from-sky-500 to-blue-600",
      username: "09177892994",
    },
    {
      name: "Rubika",
      icon: <RubikaIcon size={24} />,
      url: CONTACT_INFO.rubika,
      color: "from-teal-400 to-teal-600",
      username: "Rubika",
    },
    {
      name: "Email",
      icon: <FaEnvelope size={22} />,
      url: `mailto:${CONTACT_INFO.email}`,
      color: "from-red-500 to-red-600",
      username: CONTACT_INFO.email,
    },
    {
      name: "Phone",
      icon: <FaPhone size={22} />,
      url: `tel:${CONTACT_INFO.phone}`,
      color: "from-purple-500 to-purple-600",
      username: CONTACT_INFO.phone,
    },
  ];

  // شبکه‌های اجتماعی (سایدبار چپ)
  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram size={20} />,
      url: CONTACT_INFO.instagram,
      color: "hover:text-pink-500",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={20} />,
      url: CONTACT_INFO.whatsapp,
      color: "hover:text-green-500",
    },
    {
      name: "Telegram",
      icon: <FaTelegram size={20} />,
      url: CONTACT_INFO.telegram,
      color: "hover:text-blue-500",
    },
    {
      name: "Bale",
      icon: <BaleIcon size={22} />,
      url: CONTACT_INFO.bale,
      color: "hover:text-sky-500",
    },
    {
      name: "Rubika",
      icon: <RubikaIcon size={22} />,
      url: CONTACT_INFO.rubika,
      color: "hover:text-teal-500",
    },
    {
      name: "Webpack",
      icon: <WebpackIcon size={22} />,
      url: "https://webpack.js.org/",
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      url: CONTACT_INFO.linkedin,
      color: "hover:text-blue-700",
    },
    {
      name: "GitHub",
      icon: <FaGithub size={20} />,
      url: CONTACT_INFO.github,
      color: "hover:text-gray-700",
    },
  ];

  return (
    <>
      {/* ==================== FLOATING SUPPORT BUTTON (چت پشتیبانی) ==================== */}
      <AnimatePresence>
        {!showSupport && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setShowSupport(true)}
            className="fixed bottom-6 right-6 z-50 group"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-300">
                <FaHeadset className="text-white text-2xl" />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 animate-pulse" />
              </div>
            </div>
            <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              پشتیبانی ۲۴/۷
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ==================== PANEL SUPPORT (پنل چت پشتیبانی) ==================== */}
      <AnimatePresence>
        {showSupport && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-80"
          >
            <div 
              className="absolute inset-0 rounded-2xl opacity-50 pointer-events-none"
              style={{
                background: `radial-gradient(circle 100px at ${mousePosition.x - (window.innerWidth - 350)}px ${mousePosition.y - 100}px, rgba(212,175,55,0.15), transparent 80%)`
              }}
            />
            
            <div className="bg-white/95 dark:bg-[#1A1D24]/95 backdrop-blur-xl rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <FaCommentDots className="text-white text-sm" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-sm">پشتیبانی آنلاین</h3>
                    <p className="text-white/70 text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      آنلاین - پاسخ فوری
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSupport(false)}
                  className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <FaTimes className="text-white text-sm" />
                </button>
              </div>
              
              {/* Body */}
              <div className="p-4 space-y-2">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  از طریق پیامرسان‌های زیر با پشتیبانی در ارتباط باشید:
                </p>
                {chatChannels.map((channel, idx) => (
                  <a
                    key={idx}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-100/50 dark:bg-white/5 hover:bg-gradient-to-r hover:from-amber-500/10 hover:to-amber-600/10 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${channel.color} flex items-center justify-center text-white shadow-md`}>
                      {channel.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-amber-500 transition-colors">
                        {channel.name}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">{channel.username}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </a>
                ))}
              </div>
              
              {/* Footer */}
              <div className="px-4 py-3 bg-gray-100/50 dark:bg-white/5 border-t border-gray-200 dark:border-white/10 text-center">
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  پاسخگویی ۲۴ ساعته، ۷ روز هفته
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== FLOATING SOCIAL BUTTONS (سایدبار چپ) ==================== */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {/* دکمه اصلی اجتماعی */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => setIsSocialOpen(!isSocialOpen)}
          className="relative group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
            {isSocialOpen ? <FaTimes className="text-white text-xl" /> : <HiOutlineSparkles className="text-white text-xl" />}
          </div>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {isSocialOpen ? "بستن" : "شبکه‌های اجتماعی"}
          </span>
        </motion.button>

        {/* لینک‌های اجتماعی */}
        <AnimatePresence>
          {isSocialOpen && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2"
            >
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 400 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className={`w-10 h-10 rounded-full bg-white/90 dark:bg-[#1A1D24] border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-all duration-300 ${social.color}`}>
                    {typeof social.icon === "function" ? <social.icon /> : social.icon}
                  </div>
                  <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-900/90 text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}