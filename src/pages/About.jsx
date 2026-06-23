import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaExternalLinkAlt,
  FaCode,
  FaChevronRight,
  FaShoppingBag,
  FaUsers,
  FaMicrochip,
  FaGlobe,
  FaMobileAlt,
  FaPaintBrush,
  FaCloud,
  FaShieldAlt,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaServer,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiTypescript } from "react-icons/si";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ============================================================
// SKELETON
// ============================================================
function AboutSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-6 animate-pulse">
      <div className="h-12 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded-xl mx-auto" />
      <div className="h-5 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
      <div className="h-5 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-36 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// کامپوننت اصلی
// ============================================================
export default function About() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const lang = isRtl ? "fa" : "en";

  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let dead = false;
    axios
      .get(`${API_URL}/api/about`)
      .then((res) => {
        if (!dead) setAbout(res.data);
      })
      .catch((err) => {
        if (!dead) setError(err.message);
      })
      .finally(() => {
        if (!dead) setLoading(false);
      });
    return () => { dead = true; };
  }, []);

  const gl = (v) => {
    if (!v) return "";
    return typeof v === "object" ? v[lang] || v.en || v.fa || "" : v;
  };

  // ============================================================
  // تایپینگ داینامیک
  // ============================================================
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingWords = [
    "Apple Store",
    "Premium E-Commerce",
    "Full-Stack Experience",
    "Modern Shopping",
  ];

  useEffect(() => {
    const currentWord = typingWords[typingIndex % typingWords.length];
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypingText(currentWord.substring(0, typingText.length - 1));
        if (typingText.length === 0) {
          setIsDeleting(false);
          setTypingIndex((prev) => prev + 1);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypingText(currentWord.substring(0, typingText.length + 1));
        if (typingText.length === currentWord.length) {
          setIsDeleting(true);
        }
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, typingIndex]);

  // ============================================================
  // آمار فروشگاه
  // ============================================================
  const storeStats = [
    { value: "31+", label: isRtl ? "محصولات برتر" : "Premium Products", icon: <FaShoppingBag className="text-amber-500" size={28} /> },
    { value: "42", label: isRtl ? "مقالات تخصصی" : "Expert Articles", icon: <FaStar className="text-amber-500" size={28} /> },
    { value: "14", label: isRtl ? "اسلاید هیرو" : "Hero Slides", icon: <FaMobileAlt className="text-amber-500" size={28} /> },
    { value: "2", label: isRtl ? "برندهای معروف" : "Top Brands", icon: <FaUsers className="text-amber-500" size={28} /> },
  ];

  // ============================================================
  // تکنولوژی‌ها با لینک به سایت اصلی
  // ============================================================
  const techIcons = [
    { icon: <FaReact className="text-[#61DAFB]" size={36} />, name: "React", url: "https://react.dev/" },
    { icon: <SiTypescript className="text-[#3178C6]" size={34} />, name: "TypeScript", url: "https://www.typescriptlang.org/" },
    { icon: <SiTailwindcss className="text-[#06B6D4]" size={36} />, name: "Tailwind CSS", url: "https://tailwindcss.com/" },
    { icon: <FaNodeJs className="text-[#339933]" size={36} />, name: "Node.js", url: "https://nodejs.org/" },
    { icon: <SiExpress className="text-gray-500 dark:text-gray-400" size={36} />, name: "Express", url: "https://expressjs.com/" },
    { icon: <SiMongodb className="text-[#47A248]" size={34} />, name: "MongoDB", url: "https://www.mongodb.com/" },
    { icon: <FaDatabase className="text-[#F7DF1E]" size={34} />, name: "Mongoose", url: "https://mongoosejs.com/" },
    { icon: <FaServer className="text-[#FF6C37]" size={34} />, name: "REST API", url: "https://restfulapi.net/" },
  ];

  // ============================================================
  // ویژگی‌ها (از دیتابیس)
  // ============================================================
  const defaultFeatures = [
    {
      icon: "🛒",
      title: isRtl ? "سبد خرید کامل" : "Full Shopping Cart",
      description: isRtl ? "افزودن، حذف و مدیریت سفارش‌ها" : "Add, remove and manage orders"
    },
    {
      icon: "🌐",
      title: isRtl ? "دو زبانه (فارسی/انگلیسی)" : "Bilingual (FA/EN)",
      description: isRtl ? "پشتیبانی کامل از راست‌چین و چپ‌چین" : "Full RTL/LTR support"
    },
    {
      icon: "🌓",
      title: isRtl ? "تم تیره و روشن" : "Dark / Light Theme",
      description: isRtl ? "تم کهکشانی و روشن با طراحی مدرن" : "Galaxy dark & clean light mode"
    },
    {
      icon: "⚙️",
      title: isRtl ? "پنل مدیریت" : "Admin Panel",
      description: isRtl ? "مدیریت کامل محصولات و محتوا" : "Full product & content management"
    },
  ];

  const features = about?.features?.length > 0 ? about.features : defaultFeatures;

  if (loading) return <AboutSkeleton />;

  if (error || !about) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-6xl">📡</p>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg font-bold">
          {isRtl ? "خطا در بارگذاری اطلاعات" : "Failed to load content"}
        </p>
      </div>
    );
  }

  // ============================================================
  // متن جدید فروشگاه
  // ============================================================
  const storeStory = isRtl 
    ? `در دنیایی که فناوری هر روز مرزهای تازه‌ای را جابه‌جا می‌کند، ما تلاش کرده‌ایم فضایی خلق کنیم که انتخاب و خرید محصولات دیجیتال به تجربه‌ای ساده، مطمئن و لذت‌بخش تبدیل شود. فروشگاه ما با تمرکز بر محصولات برتر اپل و سامسونگ، بستری مدرن و کاربرپسند را فراهم کرده است تا کاربران بتوانند به جدیدترین فناوری‌ها، بررسی‌های تخصصی و اطلاعات کاربردی دسترسی داشته باشند.

ما باور داریم که یک فروشگاه آنلاین تنها محلی برای خرید نیست؛ بلکه پلی میان نوآوری و نیازهای روزمره کاربران است. به همین دلیل با طراحی حرفه‌ای، محتوای تخصصی و تجربه‌ای روان در تمامی دستگاه‌ها، تلاش می‌کنیم بهترین همراه شما در مسیر انتخاب محصولات دیجیتال باشیم.`
    : `In a world where technology pushes boundaries every day, we've created a space where choosing and purchasing digital products becomes a simple, reliable, and enjoyable experience. Our store focuses on premium Apple and Samsung products, providing a modern and user-friendly platform for users to access the latest technologies, expert reviews, and practical information.

We believe that an online store is not just a place to buy; it's a bridge between innovation and users' everyday needs. That's why with professional design, specialized content, and a smooth experience across all devices, we strive to be your best companion in choosing digital products.`;

  const storeMission = isRtl
    ? `ایجاد تجربه‌ای هوشمند، سریع و الهام‌بخش برای کاربران؛ تجربه‌ای که در آن فناوری، زیبایی و سادگی در کنار یکدیگر قرار می‌گیرند تا خرید آنلاین به کاری آسان و مطمئن تبدیل شود.`
    : `Creating a smart, fast, and inspiring experience for users; an experience where technology, beauty, and simplicity come together to make online shopping easy and reliable.`;

  const storyParagraphs = storeStory.split('\n');

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-transparent">
      <Helmet>
        <title>{isRtl ? "درباره فروشگاه | اپل استور" : "About Store | Apple Store"}</title>
        <meta name="description" content={storeStory.substring(0, 150)} />
      </Helmet>

      {/* ============================================================
          HERO — با متن جدید روی کاور شیشه‌ای
          ============================================================ */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-[0.15em]">
                {isRtl ? "✨ فروشگاه اپل استور" : "✨ Apple Store"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-4 leading-tight"
            >
              {isRtl ? (
                <span>درباره <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">فروشگاه</span> ما</span>
              ) : (
                <span>About <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Our Store</span></span>
              )}
            </motion.h1>

            {/* Typing Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
                  {typingText}
                </span>
                <span className="inline-block w-1 h-8 md:h-12 bg-amber-500 rounded animate-pulse" />
              </div>
            </motion.div>

            {/* ============================================================
                کاور شیشه‌ای با متن جدید — Extra Bold
                ============================================================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative max-w-4xl mx-auto p-8 md:p-10 rounded-2xl backdrop-blur-xl bg-white/30 dark:bg-black/20 border border-white/40 dark:border-white/10 shadow-2xl shadow-amber-500/10"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5" />
              
              <div className="relative z-10 space-y-6 text-center">
                <p className="text-base md:text-xl font-black leading-relaxed text-gray-800 dark:text-gray-100">
                  {storyParagraphs.map((paragraph, idx) => (
                    <span key={idx}>
                      {paragraph}
                      {idx < storyParagraphs.length - 1 && <><br /><br /></>}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center justify-center gap-3"
            >
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-500 rounded-full" />
              <span className="text-amber-500 text-2xl">✦</span>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-500 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {storeStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="text-center p-5 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg hover:shadow-amber-500/20 hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================
          MISSION
          ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl p-8 md:p-10 text-center border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <p className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em] mb-3">
              {isRtl ? "🎯 ماموریت ما" : "🎯 Our Mission"}
            </p>
            <p className="text-lg md:text-xl font-black text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              {storeMission}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ============================================================
          FEATURES
          ============================================================ */}
      {features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
              {isRtl ? "✨ ویژگی‌های کلیدی" : "✨ Key Features"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.slice(0, 4).map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/40 dark:border-white/10 hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {f.icon || "✨"}
                </div>
                <h3 className="text-base font-black text-gray-900 dark:text-white mb-2">
                  {gl(f.title)}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {gl(f.description)}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================
          TECH STACK — با لینک به سایت اصلی
          ============================================================ */}
      {about.techStack?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
              {isRtl ? "🛠️ ساخته شده با" : "🛠️ Built With"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {about.techStack.map((tech) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="px-5 py-2.5 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 text-neutral-700 dark:text-neutral-300 text-sm font-black hover:border-amber-500/50 hover:shadow-md transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {techIcons.map((tech, idx) => (
              <motion.a
                key={idx}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4, scale: 1.1 }}
                className="flex flex-col items-center gap-1 p-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-white/40 dark:border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-300 min-w-[70px] cursor-pointer"
              >
                {tech.icon}
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{tech.name}</span>
                <FaExternalLinkAlt className="text-[8px] text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================
          CREATOR
          ============================================================ */}
      {about.creator?.name && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-2xl p-8 md:p-10 text-center bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl shadow-amber-500/20"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80 mb-2">
              {isRtl ? "👨‍💻 ساخته شده توسط" : "👨‍💻 Crafted by"}
            </p>
            <h3 className="text-2xl md:text-4xl font-black mb-1">
              {about.creator.name}
            </h3>
            {gl(about.creator.role) && (
              <p className="text-white/90 font-bold text-sm md:text-base mb-5">
                {gl(about.creator.role)}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              {about.creator.portfolioUrl && (
                <a
                  href={about.creator.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-amber-600 font-black rounded-xl hover:bg-neutral-100 transition-all duration-300 text-sm hover:scale-105"
                >
                  {isRtl ? "مشاهده پورتفولیو" : "View Portfolio"}
                  <FaExternalLinkAlt size={15} />
                </a>
              )}
              {about.creator.githubUrl && (
                <a
                  href={about.creator.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-black rounded-xl hover:bg-white/30 transition-all duration-300 text-sm hover:scale-105"
                >
                  <FaGithub size={15} />
                  GitHub
                </a>
              )}
              {about.creator.linkedinUrl && (
                <a
                  href={about.creator.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-black rounded-xl hover:bg-white/30 transition-all duration-300 text-sm hover:scale-105"
                >
                  <FaLinkedin size={15} />
                  LinkedIn
                </a>
              )}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
