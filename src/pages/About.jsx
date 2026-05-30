// src/pages/About.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaReact,
  FaJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaNodeJs,
  FaExternalLinkAlt,
  FaEnvelope,
  FaDownload,
  FaCodeBranch,
  FaUserFriends,
  FaTrophy,
  FaLaptopCode,
  FaCode,
  FaDatabase,
  FaServer,
  FaCloud,
  FaFigma,
  FaAws,
  FaAngular,
  FaVuejs,
  FaPhp,
  FaJava,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiRedux,
  SiDocker,
  SiGraphql,
  SiPostgresql,
  SiJquery,
  SiWebpack,
} from "react-icons/si";
import { HiOutlineSparkles, HiOutlineChevronRight, HiOutlineQuestionMarkCircle } from "react-icons/hi";

// تصویر پروفایل
import profileImg from "/images/about-pic/fatemeh-developer.png";

// ==================== متغیرهای ثابت (خارج از کامپوننت) ====================

// لیست اسکیل‌ها برای جداکننده موجی
const skillNames = [
  "React.js", "JavaScript", "Next.js", "TypeScript", "Tailwind CSS", 
  "Node.js", "MongoDB", "PostgreSQL", "Git", "Docker", "GraphQL", "Redux"
];

// سوالات متداول
const faqs = [
  {
    q: "چگونه می‌توانم با شما همکاری کنم؟",
    a: "شما می‌توانید از طریق ایمیل یا فرم تماس با من در ارتباط باشید. پس از بررسی درخواست شما، جلسه مشاوره رایگان برای بررسی نیازهای پروژه برگزار می‌کنیم."
  },
  {
    q: "هزینه توسعه پروژه چقدر است؟",
    a: "هزینه پروژه بستگی به پیچیدگی، زمان توسعه و تکنولوژی‌های مورد نیاز دارد. لطفاً با من تماس بگیرید تا پس از بررسی نیازهای شما، قیمت دقیق را اعلام کنم."
  },
  {
    q: "چه تکنولوژی‌هایی را برای پروژه پیشنهاد می‌دهید؟",
    a: "بسته به نوع پروژه، React/Next.js برای فرانت‌اند، Node.js/Python برای بک‌اند، و MongoDB/PostgreSQL برای دیتابیس پیشنهاد می‌شود. همچنین از Tailwind CSS برای طراحی سریع و زیبا استفاده می‌کنم."
  },
  {
    q: "آیا پشتیبانی پس از تحویل پروژه دارید؟",
    a: "بله، تا ۳ ماه پس از تحویل پروژه، پشتیبانی رایگان برای رفع باگ‌ها و مشکلات احتمالی ارائه می‌شود. همچنین قراردادهای پشتیبانی بلندمدت نیز قابل تنظیم است."
  },
  {
    q: "مدت زمان توسعه یک پروژه معمولی چقدر است؟",
    a: "بسته به پیچیدگی پروژه، یک وب‌سایت شرکتی ۲-۴ هفته، فروشگاه آنلاین ۴-۸ هفته، و اپلیکیشن پیچیده ۲-۴ ماه زمان می‌برد."
  }
];

// داده‌های مهارت‌ها
const skillsData = [
  { name: "React.js", level: 92, icon: <FaReact className="text-[#61DAFB]" size={40} />, color: "from-[#61DAFB] to-blue-500", bgColor: "bg-[#61DAFB]/10" },
  { name: "JavaScript", level: 90, icon: <FaJs className="text-[#F7DF1E]" size={40} />, color: "from-[#F7DF1E] to-yellow-600", bgColor: "bg-[#F7DF1E]/10" },
  { name: "Next.js", level: 80, icon: <SiNextdotjs className="text-white dark:text-gray-200" size={38} />, color: "from-gray-700 to-gray-900", bgColor: "bg-gray-700/10" },
  { name: "TypeScript", level: 78, icon: <SiTypescript className="text-[#3178C6]" size={38} />, color: "from-[#3178C6] to-blue-700", bgColor: "bg-[#3178C6]/10" },
  { name: "Tailwind CSS", level: 88, icon: <SiTailwindcss className="text-[#06B6D4]" size={40} />, color: "from-[#06B6D4] to-cyan-600", bgColor: "bg-[#06B6D4]/10" },
  { name: "Node.js", level: 75, icon: <FaNodeJs className="text-[#339933]" size={40} />, color: "from-[#339933] to-green-600", bgColor: "bg-[#339933]/10" },
  { name: "MongoDB", level: 72, icon: <SiMongodb className="text-[#47A248]" size={38} />, color: "from-[#47A248] to-emerald-600", bgColor: "bg-[#47A248]/10" },
  { name: "PostgreSQL", level: 70, icon: <SiPostgresql className="text-[#4169E1]" size={38} />, color: "from-[#4169E1] to-indigo-600", bgColor: "bg-[#4169E1]/10" },
  { name: "Git & GitHub", level: 85, icon: <FaGitAlt className="text-[#F05032]" size={40} />, color: "from-[#F05032] to-orange-600", bgColor: "bg-[#F05032]/10" },
  { name: "Docker", level: 65, icon: <SiDocker className="text-[#2496ED]" size={38} />, color: "from-[#2496ED] to-blue-600", bgColor: "bg-[#2496ED]/10" },
  { name: "GraphQL", level: 68, icon: <SiGraphql className="text-[#E10098]" size={38} />, color: "from-[#E10098] to-pink-600", bgColor: "bg-[#E10098]/10" },
  { name: "Redux", level: 82, icon: <SiRedux className="text-[#764ABC]" size={38} />, color: "from-[#764ABC] to-purple-600", bgColor: "bg-[#764ABC]/10" },
];

// پروژه‌ها
const projects = [
  { title: "E-Commerce Platform", description: "پلتفرم فروشگاهی کامل", tech: ["React", "Node.js", "MongoDB", "Tailwind"], link: "#", github: "#" },
  { title: "AI Chat Application", description: "چت‌بات هوشمند", tech: ["Next.js", "TypeScript", "Tailwind", "OpenAI"], link: "#", github: "#" },
  { title: "Task Management System", description: "سیستم مدیریت تسک", tech: ["React", "Redux", "DnD Kit", "Firebase"], link: "#", github: "#" },
  { title: "Analytics Dashboard", description: "داشبورد تحلیلی", tech: ["React", "Chart.js", "Node.js", "PostgreSQL"], link: "#", github: "#" },
];

// جملات انگیزشی برای مارکی
const MOTTO_FA = [
  "همیشه در مسیر رشد",
  "هر روز یک قدم جلوتر",
  "یادگیری بی‌وقفه، پیشرفت پیوسته",
  "از ایده تا محصول؛ با دقت و عشق",
  "ثبات، قدرت پنهان موفقیت است",
  "کیفیت اتفاقی نیست؛ انتخاب است",
  "کوچک شروع کن، بزرگ بساز",
  "تمرکز کن؛ نتیجه خودش می‌آید",
  "اشتباه کن، اصلاح کن، قوی‌تر برگرد",
  "پشتکار، از استعداد جلو می‌زند",
  "پیشرفت مهم‌تر از بی‌نقص بودن است",
  "هر نسخه بهتر از نسخه قبل",
  "مسئله را بفهم؛ بعد راه‌حل را بساز",
  "ساده‌سازی یعنی حرفه‌ای شدن",
  "کمتر حرف، بیشتر ساختن",
  "به جزئیات احترام بگذار",
  "با نظم کار کن، با خلاقیت بدرخش",
  "صبر کن؛ اما هرگز متوقف نشو",
  "هر چالش، یک فرصت برای بهتر شدن است",
  "بهترین زمان شروع، همین حالاست",
];


export default function About() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [hexGlow, setHexGlow] = useState(false);

  const stats = [
    { value: "5+", label: isRtl ? "سال تجربه" : "Years Experience", icon: <FaCodeBranch />, color: "gold" },
    { value: "45+", label: isRtl ? "پروژه تکمیل شده" : "Projects Completed", icon: <FaLaptopCode />, color: "silver" },
    { value: "25+", label: isRtl ? "مشتری راضی" : "Happy Clients", icon: <FaUserFriends />, color: "sky" },
    { value: "12", label: isRtl ? "تکنولوژی تخصصی" : "Tech Stack", icon: <FaTrophy />, color: "gold" },
  ];

  const tools = [
    { name: "VS Code", icon: <FaCode className="text-[#007ACC]" size={32} />, url: "https://code.visualstudio.com/" },
    { name: "GitHub", icon: <FaGithub className="text-gray-700 dark:text-gray-300" size={32} />, url: "https://github.com" },
    { name: "Vercel", icon: <SiVercel className="text-black dark:text-white" size={30} />, url: "https://vercel.com" },
    { name: "Netlify", icon: <SiNetlify className="text-[#00C7B7]" size={32} />, url: "https://netlify.com" },
    { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" size={32} />, url: "https://firebase.google.com" },
    { name: "Docker", icon: <SiDocker className="text-[#2496ED]" size={32} />, url: "https://docker.com" },
    { name: "AWS", icon: <FaAws className="text-[#FF9900]" size={32} />, url: "https://aws.amazon.com" },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" size={32} />, url: "https://figma.com" },
  ];

  // تایپینگ تیترها
  const typingTitles = [
    "Full-Stack Developer",
    "React & Next.js Expert",
    "API Designer",
    "UI/UX Enthusiast"
  ];
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = typingTitles[typingIndex];
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypingText(currentTitle.substring(0, typingText.length - 1));
        if (typingText.length === 0) {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % typingTitles.length);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypingText(currentTitle.substring(0, typingText.length + 1));
        if (typingText.length === currentTitle.length) {
          setIsDeleting(true);
        }
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, typingIndex]);

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-transparent">
      <Helmet>
        <title>{isRtl ? "فاطمه رستمی | توسعه‌دهنده فول‌استک" : "Fatemeh Rostami | Full-Stack Developer"}</title>
      </Helmet>

      {/* Hero Section - با تصویر شش‌ضلعی */}
      <section className="relative overflow-hidden py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Side - Text with Glass Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/40 dark:border-white/20 shadow-2xl">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/30 to-amber-600/30 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    {isRtl ? "توسعه‌دهنده فول‌استک" : "Full-Stack Developer"}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                  {isRtl ? "فاطمه رستمی" : "Fatemeh Rostami"}
                </h1>
                
                {/* Typing Effect - Extra Bold */}
                <div className="h-16 mb-4">
                  <div className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-black">
                    <span className="inline-block mr-2 text-amber-500">✦</span>
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                      {typingText}
                    </span>
                    <span className="inline-block w-1 h-6 bg-amber-500 rounded animate-pulse ml-1 align-middle" />
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                  {isRtl 
                    ? "من یک توسعه‌دهنده فول‌استک هستم که هم در فرانت‌اند و هم در بک‌اند با تمرکز روی کیفیت، سرعت و تجربه کاربری کار می‌کنم."
                    : "I'm a Full-Stack developer working on both frontend and backend with focus on quality, speed, and user experience."}
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                    <FaDownload size={14} />
                    {isRtl ? "دانلود رزومه" : "Download Resume"}
                  </button>
                  <button className="px-6 py-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 font-black rounded-xl hover:border-amber-500/50 hover:text-amber-600 transition-all duration-300">
                    {isRtl ? "مشاهده پروژه‌ها" : "View Projects"}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Hexagon Image with Golden Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex-1 flex justify-center"
            >
              <Link to="/" className="block group">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400 to-amber-600 blur-2xl transition-all duration-500 ${hexGlow ? "opacity-80 scale-110" : "opacity-30 scale-100"}`} />
                  
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden rounded-3xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-amber-500/50"
                       style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)" }}>
                    <img
                      src={profileImg}
                      alt="Fatemeh Rostami"
                      className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                      onMouseEnter={() => setHexGlow(true)}
                      onMouseLeave={() => setHexGlow(false)}
                    />
                    <div className="absolute inset-0 border-2 border-amber-500/50 rounded-3xl pointer-events-none" />
                  </div>
                  
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-bold text-amber-500 bg-amber-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {isRtl ? "کلیک کنید ←" : "Click →"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg hover:shadow-amber-500/20 hover:border-amber-500/50 transition-all duration-300"
            >
              <div className={`text-3xl mb-2 ${
                stat.color === "gold" ? "text-amber-500" : 
                stat.color === "silver" ? "text-gray-400" : "text-sky-500"
              }`}>
                {stat.icon}
              </div>
              <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Me Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/40 dark:border-white/10 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full" />
            {isRtl ? "درباره من" : "About Me"}
          </h2>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>من فاطمه رستمی یک توسعه‌دهنده فول‌استک هستم که هم در فرانت‌اند و هم در بک‌اند با تمرکز روی کیفیت، سرعت و تجربه کاربری کار می‌کنم.</p>
            <p>در بخش فرانت‌اند، طراحی و پیاده‌سازی رابط‌های مدرن، ریسپانسیو و مقیاس‌پذیر را انجام می‌دهم و تلاش می‌کنم خروجی نهایی هم از نظر ظاهری حرفه‌ای باشد و هم از نظر فنی تمیز و قابل توسعه. برای من جزئیات UI/UX، بهینه‌سازی عملکرد و ساخت کامپوننت‌های قابل استفاده مجدد اهمیت بالایی دارد.</p>
            <p>در بخش بک‌اند، روی طراحی APIهای استاندارد، معماری قابل اطمینان، مدیریت دیتابیس و پیاده‌سازی منطق‌های تجاری تمرکز دارم. هدفم این است که سیستم‌هایی بسازم که امن، پایدار و قابل توسعه باشند؛ از احراز هویت و سطح دسترسی گرفته تا بهینه‌سازی کوئری‌ها و ساختار داده‌ها.</p>
            <p className="font-semibold text-amber-600 dark:text-amber-400">در مجموع، رویکرد کاری من این است که محصول نهایی فقط «کار نکند»، بلکه قابل نگهداری، قابل ارتقاء و آماده رشد باشد.</p>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
            {isRtl ? "مهارت‌های تخصصی" : "Technical Skills"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillsData.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              onMouseEnter={() => setHoveredSkill(idx)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`${skill.bgColor} backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg cursor-pointer`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center">{skill.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">{skill.name}</h3>
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-white/20 rounded-full overflow-hidden mt-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.03 }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WAVE DIVIDER WITH SKILL NAMES */}
      <div className="relative py-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10" />
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-skills whitespace-nowrap">
            {/* Copy 1 */}
            <div className="flex items-center gap-6 py-3 pr-6">
              {[...skillNames, ...skillNames].map((skill, idx) => (
                <span key={`s1-${idx}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-full border border-amber-500/30 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm font-black text-gray-800 dark:text-white whitespace-nowrap">{skill}</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                </span>
              ))}
            </div>
            {/* Copy 2 */}
            <div className="flex items-center gap-6 py-3 pr-6" aria-hidden="true">
              {[...skillNames, ...skillNames].map((skill, idx) => (
                <span key={`s2-${idx}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-full border border-amber-500/30 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm font-black text-gray-800 dark:text-white whitespace-nowrap">{skill}</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
            {isRtl ? "پروژه‌های اخیر" : "Recent Projects"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/40 dark:border-white/10 hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">{project.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={project.link} className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">Live Demo →</a>
                <a href={project.github} className="text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors">GitHub →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
            {isRtl ? "ابزارها" : "Tools"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {tools.map((tool, idx) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-2 p-4 bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/40 dark:border-white/10 hover:border-amber-500/50 transition-all duration-300 min-w-[85px]"
            >
              <div className="w-14 h-14 flex items-center justify-center">{tool.icon}</div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{tool.name}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3 flex items-center justify-center gap-2">
            <HiOutlineQuestionMarkCircle className="text-amber-500" />
            {isRtl ? "سوالات متداول" : "FAQ"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto" />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/40 dark:border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-amber-500/5 transition-colors"
              >
                <span className="font-black text-gray-900 dark:text-white">{faq.q}</span>
                <motion.span
                  animate={{ rotate: openFaq === idx ? 180 : 0 }}
                  className="text-amber-500 text-xl"
                >
                  ▼
                </motion.span>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openFaq === idx ? "auto" : 0, opacity: openFaq === idx ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-200 dark:border-white/10 pt-3">
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NON-STOP MARQUEE SECTION - بسیار آهسته */}
      <div className="relative py-8 overflow-hidden border-t border-b border-amber-500/30 my-8">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/8 via-transparent to-amber-500/8" />
        
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-motto whitespace-nowrap">
            
            {/* Copy 1 - جملات فارسی */}
            <div className="flex items-center gap-12 py-4 pr-12">
              {MOTTO_FA.map((text, i) => (
                <span key={`m1-${i}`} className="inline-flex items-center gap-3 text-xl md:text-2xl font-black">
                  <span className="text-amber-500 text-2xl drop-shadow-md">✦</span>
                  <span className="text-gray-900 dark:text-white font-black drop-shadow-sm">{text}</span>
                  <span className="text-amber-500 text-2xl drop-shadow-md">✦</span>
                </span>
              ))}
            </div>
            
            {/* Copy 2 - تکرار برای ایجاد لوپ پیوسته */}
            <div className="flex items-center gap-12 py-4 pr-12" aria-hidden="true">
              {MOTTO_FA.map((text, i) => (
                <span key={`m2-${i}`} className="inline-flex items-center gap-3 text-xl md:text-2xl font-black">
                  <span className="text-amber-500 text-2xl drop-shadow-md">✦</span>
                  <span className="text-gray-900 dark:text-white font-black drop-shadow-sm">{text}</span>
                  <span className="text-amber-500 text-2xl drop-shadow-md">✦</span>
                </span>
              ))}
            </div>
            
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-center text-white shadow-xl"
        >
          <HiOutlineSparkles className="w-10 h-10 mx-auto mb-3 opacity-80" />
          <h2 className="text-2xl md:text-3xl font-black mb-2">
            {isRtl ? "بیایید با هم کار کنیم!" : "Let's Work Together!"}
          </h2>
          <p className="text-white/90 max-w-md mx-auto mb-5 text-sm">
            {isRtl ? "آیا پروژه‌ای در ذهن دارید؟ من اینجا هستم تا ایده‌هایتان را به واقعیت تبدیل کنم." : "Have a project in mind? I'm here to bring your ideas to life."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:fatemeh.rostami@example.com" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-amber-600 font-black rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-sm">
              <FaEnvelope />{isRtl ? "ارسال ایمیل" : "Send Email"}
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-black rounded-xl hover:bg-white/30 transition-all duration-300 text-sm">
              <HiOutlineChevronRight />{isRtl ? "مشاهده گیت‌هاب" : "View GitHub"}
            </a>
          </div>
        </motion.div>
      </section>

      {/* اضافه کردن انیمیشن‌های CSS */}
      <style jsx>{`
        @keyframes marquee-skills {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marquee-motto {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-skills {
          animation: marquee-skills 45s linear infinite;
        }
        
        .animate-motto {
          animation: marquee-motto 35s linear infinite;
          will-change: transform;
        }
        
        @media (max-width: 768px) {
          .animate-skills {
            animation-duration: 25s;
          }
          .animate-motto {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
}