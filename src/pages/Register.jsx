// src/pages/Register.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaApple, FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaGoogle, FaGithub, FaUser, FaPhone, FaCheckCircle,
  FaShieldAlt, FaArrowLeft, FaArrowRight, FaServer, FaCloud,
  FaNetworkWired, FaExternalLinkAlt, FaInfoCircle, FaUserEdit,
  FaAward, FaCertificate, FaHandshake, FaWhatsapp, FaTelegram,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

// ==================== اطلاعات ادمین برای دریافت اطلاعات ====================
const ADMIN_EMAIL = "rostamifatemeh.963@gmail.com";
const ADMIN_PHONE = "+989177892994";
const ADMIN_WHATSAPP = "https://wa.me/989177892994";
const ADMIN_TELEGRAM = "https://t.me/fitness_mindset";

// ==================== تابع ارسال اطلاعات به ایمیل ====================
const sendRegistrationNotification = async (userData) => {
  const { name, email, phone, bio, password } = userData;
  const timestamp = new Date().toLocaleString("fa-IR");
  
  // ساخت قالب ایمیل
  const emailSubject = `📋 ثبت نام جدید - ${name}`;
  const emailBody = `
📋 *اطلاعات ثبت نام جدید* 📋

━━━━━━━━━━━━━━━━━━━━━

👤 *نام و نام خانوادگی:* 
   ${name}

📧 *ایمیل:* 
   ${email}

📱 *شماره موبایل:* 
   ${phone || "❌ وارد نشده"}

📝 *درباره کاربر:* 
   ${bio || "❌ وارد نشده"}

🔐 *رمز عبور:* 
   ${password}

━━━━━━━━━━━━━━━━━━━━━

🕐 *زمان ثبت نام:* 
   ${timestamp}

🌐 *آیپی:* 
   کاربر از طریق سایت ثبت نام کرده است

━━━━━━━━━━━━━━━━━━━━━

✅ این اطلاعات به صورت خودکار ارسال شده است.
  `;

  // روش 1: باز کردن پنجره ایمیل (نیاز به تأیید کاربر)
  const mailtoLink = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  
  // روش 2: ذخیره در localStorage برای دسترسی بعدی
  const registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
  registrations.push({ ...userData, timestamp: new Date().toISOString() });
  localStorage.setItem("registrations", JSON.stringify(registrations));
  
  // روش 3: ذخیره در console (برای دیباگ)
  console.log("📋 اطلاعات ثبت نام جدید:");
  console.log("━━━━━━━━━━━━━━━━━━━━━");
  console.log(`نام: ${name}`);
  console.log(`ایمیل: ${email}`);
  console.log(`تلفن: ${phone || "ندارد"}`);
  console.log(`درباره: ${bio || "ندارد"}`);
  console.log(`رمز: ${password}`);
  console.log(`زمان: ${timestamp}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━");
  console.log(`تعداد کل ثبت نام‌ها: ${registrations.length}`);
  
  // باز کردن پنجره ایمیل (کاربر باید ارسال را تأیید کند)
  window.open(mailtoLink, "_blank");
  
  return true;
};

// ==================== لینک‌های معتبر با توضیحات کامل ====================
const trustedLinks = [
  {
    id: 1, 
    name: "Limoowp", 
    url: "https://limoowp.com/",
    icon: <FaServer className="text-amber-500 text-2xl" />,
    category: "Hosting & CMS", 
    color: "from-blue-500 to-cyan-500",
    description: "پلتفرم قدرتمند مدیریت محتوا و هاستینگ حرفه‌ای با بالاترین سرعت و امنیت",
    fullDescription: "لیمو دبلیوپی یک پلتفرم جامع برای مدیریت محتوا و هاستینگ است که با استفاده از آخرین فناوری‌های روز دنیا ساخته شده. این سرویس امنیت بالا، سرعت فوق‌العاده و پشتیبانی ۲۴ ساعته را برای کاربران فراهم می‌کند.",
    features: ["🚀 هاستینگ ابری", "🔒 امنیت پیشرفته", "📊 مدیریت محتوا", "⚡ پشتیبانی ۲۴/۷"],
  },
  {
    id: 2, 
    name: "Samanehha", 
    url: "https://www.samanehha.com/",
    icon: <FaCloud className="text-amber-500 text-2xl" />,
    category: "Cloud Solutions", 
    color: "from-purple-500 to-pink-500",
    description: "سیستم‌های ابری و راهکارهای سازمانی برای کسب و کارهای مدرن",
    fullDescription: "سامانه‌ها یک پلتفرم ابری پیشرفته است که راهکارهای سازمانی مدرن را برای کسب و کارهای ایرانی فراهم می‌کند. با استفاده از این سرویس، می‌توانید زیرساخت فناوری اطلاعات خود را به صورت امن و مقیاس‌پذیر مدیریت کنید.",
    features: ["☁️ ابر اختصاصی", "💾 ذخیره‌سازی امن", "🔄 پشتیبانی ۲۴/۷", "📈 مقیاس‌پذیر"],
  },
  {
    id: 3, 
    name: "Enamad", 
    url: "https://enamad.ir/",
    icon: <FaShieldAlt className="text-amber-500 text-2xl" />,
    category: "Trust Seal", 
    color: "from-green-500 to-emerald-500",
    description: "نماد اعتماد الکترونیکی - تضمین امنیت اطلاعات و حریم خصوصی کاربران",
    fullDescription: "اینماد نماد اعتماد الکترونیکی است که توسط مرکز توسعه تجارت الکترونیکی وزارت صنعت، معدن و تجارت صادر می‌شود. داشتن این نماد نشان‌دهنده پایبندی به قوانین تجارت الکترونیکی و حریم خصوصی کاربران است.",
    features: ["✅ گواهی SSL", "🔐 حریم خصوصی", "📜 تأیید رسمی", "🛡️ امنیت اطلاعات"],
  },
  {
    id: 4, 
    name: "IranServer", 
    url: "https://hub.iranserver.com/",
    icon: <FaServer className="text-amber-500 text-2xl" />,
    category: "Data Center", 
    color: "from-orange-500 to-red-500",
    description: "هاستینگ قدرتمند و سرورهای ابری ایران با بالاترین سطح دسترسی",
    fullDescription: "ایران سرور یکی از معتبرترین ارائه‌دهندگان خدمات هاستینگ و سرورهای ابری در ایران است. با استفاده از دیتاسنترهای پیشرفته و پهنای باند اختصاصی، بالاترین سطح دسترسی و پایداری را برای وب‌سایت‌ها فراهم می‌کند.",
    features: ["🖥️ سرور اختصاصی", "🌐 پهنای باند بالا", "💎 داده‌های محلی", "🔧 پشتیبانی تخصصی"],
  },
  {
    id: 5, 
    name: "NIC", 
    url: "https://new.nic.ir/",
    icon: <FaNetworkWired className="text-amber-500 text-2xl" />,
    category: "Domain Registry", 
    color: "from-indigo-500 to-purple-500",
    description: "مرکز ثبت دامنه‌های ایران - مدیریت و ثبت دامنه‌های ir",
    fullDescription: "مرکز ثبت دامنه ایران (NIC) تنها مرجع رسمی ثبت دامنه‌های با پسوند .ir است. این مرکز با ارائه خدمات ثبت، تمدید و مدیریت دامنه، نقش کلیدی در فضای مجازی ایران ایفا می‌کند.",
    features: ["🌍 ثبت دامنه", "🔧 مدیریت DNS", "✅ تأیید هویت", "📝 تمدید آسان"],
  },
];

// ==================== Particle Field ====================
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const count = 55;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.1 + 0.3,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      o: Math.random() * 0.45 + 0.08,
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217,119,6,${p.o})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 95) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(217,119,6,${0.07 * (1 - d / 95)})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}

// ==================== Password Strength ====================
function StrengthBar({ password, isRtl }) {
  const score = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 && /[A-Z]/.test(password) ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password) ? 4 : 3;
  const labels = isRtl ? ["", "ضعیف", "متوسط", "قوی", "عالی"] : ["", "Weak", "Fair", "Strong", "Excellent"];
  const colors = ["", "bg-red-500", "bg-amber-400", "bg-green-400", "bg-emerald-500"];
  if (!password) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= score ? colors[score] : "bg-gray-200 dark:bg-white/10"}`} />
        ))}
      </div>
      <p className={`text-[10px] font-extrabold ${score === 1 ? "text-red-400" : score === 2 ? "text-amber-400" : "text-green-400"}`}>
        {labels[score]}
      </p>
    </motion.div>
  );
}

// ==================== Cinema Input ====================
function CinemaInput({ label, icon: Icon, type, value, onChange, placeholder, required, children, hint }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const hasContent = focused || filled || value?.length > 0;
  return (
    <div>
      <div className="relative group">
        <label className={`absolute z-10 transition-all duration-300 pointer-events-none font-extrabold tracking-wide ${hasContent ? "-top-2.5 left-3 text-[10px] text-amber-500" : "top-3.5 left-10 text-sm text-gray-400"}`}>
          {label}
        </label>
        <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${focused ? "border-amber-500 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" : "border-white/20 dark:border-white/10 hover:border-white/40"} bg-white/10 dark:bg-black/20 backdrop-blur-sm`}>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"><Icon size={15} /></span>
          <input type={type} value={value} onChange={(e) => { onChange(e); setFilled(e.target.value.length > 0); }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} placeholder={focused ? placeholder : ""} className="w-full pl-9 pr-10 pt-5 pb-2 bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none font-medium" />
          {children && <span className="absolute right-3 top-1/2 -translate-y-1/2 z-10">{children}</span>}
          <motion.span className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" animate={{ width: focused ? "100%" : "0%" }} transition={{ duration: 0.3 }} />
        </div>
        {hint}
      </div>
    </div>
  );
}

// ==================== Cinema Textarea ====================
function CinemaTextarea({ label, icon: Icon, value, onChange, placeholder, rows = 3, maxLength, length, setLength }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const hasContent = focused || filled || value?.length > 0;
  return (
    <div>
      <div className="relative group">
        <label className={`absolute z-10 transition-all duration-300 pointer-events-none font-extrabold tracking-wide ${hasContent ? "-top-2.5 left-3 text-[10px] text-amber-500" : "top-3.5 left-10 text-sm text-gray-400"}`}>
          {label}
        </label>
        <div className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${focused ? "border-amber-500 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" : "border-white/20 dark:border-white/10 hover:border-white/40"} bg-white/10 dark:bg-black/20 backdrop-blur-sm`}>
          <span className="absolute left-3 top-3 text-gray-400 z-10"><Icon size={15} /></span>
          <textarea rows={rows} value={value} onChange={(e) => { onChange(e); setFilled(e.target.value.length > 0); if (setLength) setLength(e.target.value.length); }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} maxLength={maxLength} placeholder={focused ? placeholder : ""} className="w-full pl-9 pr-3 pt-5 pb-2 bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none resize-none font-medium" />
        </div>
      </div>
    </div>
  );
}

// ==================== Step Dots ====================
function StepDots({ current, total }) {
  return (
    <div className="flex items-center gap-1.5 justify-center mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div key={i} animate={{ width: i === current ? 20 : 8, opacity: i <= current ? 1 : 0.3 }} className={`h-1.5 rounded-full ${i <= current ? "bg-amber-500" : "bg-gray-300 dark:bg-white/20"}`} transition={{ duration: 0.3 }} />
      ))}
    </div>
  );
}

// ==================== Main Register ====================
export default function Register() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bioLength, setBioLength] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", bio: "", password: "", confirmPassword: "",
  });

  const maxBioLength = 300;
  const set = (field) => (e) => setFormData((p) => ({ ...p, [field]: e.target.value }));
  const passwordsMatch = formData.confirmPassword.length === 0 || formData.password === formData.confirmPassword;

  const nextStep = async (e) => {
    e.preventDefault();
    if (step === 0) { setStep(1); return; }
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) return;
      if (!agreed) return;
      setIsLoading(true);
      
      // ارسال اطلاعات به ایمیل ادمین
      await sendRegistrationNotification(formData);
      
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 1800);
    }
  };

  const backStep = () => { if (step > 0) setStep(step - 1); };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <Helmet>
        <title>{isRtl ? "ثبت نام | تک‌کرانچ" : "Register | TechCrunch"}</title>
      </Helmet>

      <ParticleField />
      <div className="pointer-events-none absolute top-0 right-1/3 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[90px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ==================== LEFT SIDE - REGISTER FORM ==================== */}
          <div className="flex-1 max-w-md mx-auto lg:mx-0">
            <div className="text-center mb-6">
              <motion.div animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/30 backdrop-blur-xl mb-3 shadow-lg shadow-amber-500/10">
                <FaApple className="text-amber-500" size={26} />
              </motion.div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-500/70">TechCrunch</p>
            </div>

            <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="relative bg-white/70 dark:bg-[#0c0c0e]/80 backdrop-blur-2xl rounded-3xl border border-white/50 dark:border-white/[0.08] shadow-2xl shadow-black/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] via-transparent to-sky-500/[0.03] pointer-events-none" />
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
              <div className="relative p-8 md:p-10">
                <StepDots current={step} total={3} />

                <AnimatePresence mode="wait">
                  {/* STEP 0: Personal Info */}
                  {step === 0 && (
                    <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                      <div className="mb-7">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1">{isRtl ? "اطلاعات شخصی" : "Personal info"}<span className="text-amber-500">.</span></h2>
                        <p className="text-sm text-gray-400 dark:text-gray-500">{isRtl ? "مرحله ۱ از ۲ — اطلاعات پایه" : "Step 1 of 2 — Basic info"}</p>
                      </div>
                      <form onSubmit={nextStep} className="space-y-4">
                        <CinemaInput label={isRtl ? "نام و نام خانوادگی" : "Full name"} icon={FaUser} type="text" value={formData.name} onChange={set("name")} placeholder={isRtl ? "فاطمه رستمی" : "Jane Smith"} required />
                        <CinemaInput label={isRtl ? "آدرس ایمیل" : "Email address"} icon={FaEnvelope} type="email" value={formData.email} onChange={set("email")} placeholder="you@example.com" required />
                        <CinemaInput label={isRtl ? "شماره موبایل (اختیاری)" : "Phone (optional)"} icon={FaPhone} type="tel" value={formData.phone} onChange={set("phone")} placeholder={isRtl ? "۰۹۱۲ XXX XXXX" : "+1 (555) 000-0000"} />
                        <CinemaTextarea label={isRtl ? "درباره خودتان" : "About you"} icon={FaUserEdit} value={formData.bio} onChange={set("bio")} placeholder={isRtl ? "مهارت‌ها، علایق، تخصص..." : "Skills, interests, expertise..."} rows={3} maxLength={maxBioLength} length={bioLength} setLength={setBioLength} />
                        <div className="flex justify-end"><p className={`text-[9px] font-extrabold ${bioLength >= maxBioLength ? "text-red-500" : "text-gray-400"}`}>{bioLength}/{maxBioLength}</p></div>
                        <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm tracking-wide overflow-hidden group shadow-lg shadow-amber-500/25 mt-2 flex items-center justify-center gap-2">
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                          <span className="relative">{isRtl ? "مرحله بعد" : "Continue"}</span>
                          <svg className="w-4 h-4 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isRtl ? "M19 12H5m7-7l7 7-7 7" : "M13 7l5 5m0 0l-5 5m5-5H6"} /></svg>
                        </motion.button>
                        <div className="relative my-4 flex items-center gap-3"><div className="flex-1 h-px bg-gray-200 dark:bg-white/10" /><span className="text-[11px] text-gray-400 uppercase tracking-widest font-extrabold">{isRtl ? "یا" : "or"}</span><div className="flex-1 h-px bg-gray-200 dark:bg-white/10" /></div>
                        <div className="grid grid-cols-2 gap-3">
                          <a href="mailto:rostamifatemeh.963@gmail.com" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-white/50 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm font-extrabold hover:border-amber-400/50 transition-all duration-200"><FaGoogle className="text-red-400" size={15} /> Google</a>
                          <a href="https://github.com/rostamifatemeh963" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-white/50 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm font-extrabold hover:border-amber-400/50 transition-all duration-200"><FaGithub size={15} /> GitHub</a>
                        </div>
                      </form>
                      <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400 font-medium">{isRtl ? "قبلاً ثبت نام کرده‌اید؟" : "Already have an account?"} <Link to="/login" className="text-amber-600 dark:text-amber-400 font-black hover:text-amber-500 transition-colors">{isRtl ? "ورود" : "Sign in"}</Link></p>
                    </motion.div>
                  )}

                  {/* STEP 1: Security */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                      <div className="mb-7">
                        <button onClick={backStep} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-amber-500 transition-colors mb-3 font-extrabold">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isRtl ? "M19 12H5m7-7l-7 7 7 7" : "M15 19l-7-7 7-7"} /></svg>
                          {isRtl ? "مرحله قبل" : "Back"}
                        </button>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1">{isRtl ? "رمز عبور" : "Security"}<span className="text-amber-500">.</span></h2>
                        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">{isRtl ? "مرحله ۲ از ۲ — رمز قوی انتخاب کنید" : "Step 2 of 2 — Choose a strong password"}</p>
                      </div>
                      <form onSubmit={nextStep} className="space-y-4">
                        <CinemaInput label={isRtl ? "رمز عبور" : "Password"} icon={FaLock} type={showPassword ? "text" : "password"} value={formData.password} onChange={set("password")} placeholder={isRtl ? "حداقل ۸ کاراکتر" : "Min. 8 characters"} required hint={<StrengthBar password={formData.password} isRtl={isRtl} />}>
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-amber-500 transition-colors">{showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}</button>
                        </CinemaInput>
                        <CinemaInput label={isRtl ? "تکرار رمز عبور" : "Confirm password"} icon={FaLock} type={showConfirm ? "text" : "password"} value={formData.confirmPassword} onChange={set("confirmPassword")} placeholder="••••••••" required>
                          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-amber-500 transition-colors">{showConfirm ? <FaEyeSlash size={14} /> : <FaEye size={14} />}</button>
                        </CinemaInput>
                        <AnimatePresence>{formData.confirmPassword.length > 0 && !passwordsMatch && (<motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[11px] text-red-400 font-extrabold mt-1.5 flex items-center gap-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>{isRtl ? "رمزها مطابقت ندارند" : "Passwords don't match"}</motion.p>)}</AnimatePresence>
                        <label className="flex items-start gap-3 cursor-pointer group pt-1">
                          <div onClick={() => setAgreed(!agreed)} className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border transition-all duration-200 flex items-center justify-center ${agreed ? "bg-amber-500 border-amber-500" : "border-gray-300 dark:border-white/20 group-hover:border-amber-400"}`}>{agreed && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}</div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{isRtl ? <>با <span className="text-amber-500 font-black">شرایط خدمات</span> و <span className="text-amber-500 font-black">سیاست حریم خصوصی</span> موافقم</> : <>I agree to the <span className="text-amber-500 font-black">Terms of Service</span> and <span className="text-amber-500 font-black">Privacy Policy</span></>}</span>
                        </label>
                        <motion.button type="submit" disabled={isLoading || !agreed || !passwordsMatch} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm tracking-wide overflow-hidden group shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                          <span className="relative flex items-center gap-2">{isLoading ? <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg> : <>{isRtl ? "ایجاد حساب" : "Create account"}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>}</span>
                        </motion.button>
                      </form>
                    </motion.div>
                  )}

                  {/* STEP 2: Success */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="text-center py-6">
                      <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }} className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </motion.div>
                      <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-2xl font-black text-gray-900 dark:text-white mb-2">{isRtl ? "حساب ایجاد شد!" : "Account created!"}</motion.h3>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="text-sm text-gray-400 mb-4 font-medium">{isRtl ? `خوش آمدید ${formData.name}!` : `Welcome ${formData.name}!`}</motion.p>
                      
                      {/* بخش اطلاع رسانی ارسال اطلاعات */}
                      <div className="bg-amber-500/10 rounded-xl p-4 mb-6 text-center border border-amber-500/30">
                        <p className="text-xs text-gray-300 mb-2">📋 اطلاعات ثبت نام شما به آدرس زیر ارسال شد:</p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <a href={`mailto:${ADMIN_EMAIL}`} className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/10 px-3 py-1 rounded-full">
                            <FaEnvelope size={12} /> {ADMIN_EMAIL}
                          </a>
                          <a href={ADMIN_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 transition-colors bg-green-500/10 px-3 py-1 rounded-full">
                            <FaWhatsapp size={12} /> واتساپ
                          </a>
                          <a href={ADMIN_TELEGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1 rounded-full">
                            <FaTelegram size={12} /> تلگرام
                          </a>
                        </div>
                      </div>
                      
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                        <Link to="/login" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow duration-300">{isRtl ? "ورود به حساب" : "Sign in now"}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ==================== RIGHT SIDE - TRUSTED LINKS GALLERY ==================== */}
          <div className="flex-1 space-y-6">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="bg-gradient-to-r from-amber-500/15 to-amber-600/15 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/30 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <FaHandshake className="text-amber-500 text-xl" />
                <h3 className="text-xl font-black text-gray-900 dark:text-white">{isRtl ? "✨ خوش آمدید به تک‌کرانچ" : "✨ Welcome to TechCrunch"}</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                {isRtl
                  ? "با ثبت نام در تک‌کرانچ، به خانواده بزرگ ما بپیوندید. از تخفیف‌های ویژه، جدیدترین محصولات اپل و سامسونگ و پشتیبانی ۲۴ ساعته بهره‌مند شوید. تجربه خریدی امن، سریع و حرفه‌ای در انتظار شماست."
                  : "Join the TechCrunch family by signing up. Enjoy special discounts, latest Apple & Samsung products, and 24/7 support. A secure, fast and professional shopping experience awaits you."}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-white/10 shadow-lg">
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-amber-500/20">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                  <FaCertificate className="text-amber-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">{isRtl ? "مورد اعتماد مراجع رسمی" : "Trusted by Official Authorities"}</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{isRtl ? "گواهی‌های رسمی و اعتماد الکترونیکی" : "Official certificates & e-trust"}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed font-medium">
                {isRtl
                  ? "ما برای امنیت و اعتبار شما، با معتبرترین مراکز رسمی کشور همکاری می‌کنیم. تمامی اطلاعات شما با بالاترین استانداردهای امنیتی محافظت می‌شود و ما متعهد به حفظ حریم خصوصی شما هستیم."
                  : "We collaborate with the most trusted official authorities to ensure your security and credibility. All your information is protected with the highest security standards and we are committed to protecting your privacy."}
              </p>
              
              <div className="space-y-4">
                {trustedLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="group block relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="relative p-4 flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        {link.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="text-lg font-black text-gray-900 dark:text-white">{link.name}</p>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-600 dark:text-amber-400 font-extrabold tracking-wide">
                            {link.category}
                          </span>
                          <FaExternalLinkAlt className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm font-extrabold text-gray-800 dark:text-gray-200 mb-1 leading-snug">
                          {link.description}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-2 font-medium">
                          {link.fullDescription}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {link.features.map((feature, idx) => (
                            <span key={idx} className="text-[9px] font-extrabold bg-white/60 dark:bg-white/10 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-400">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <motion.div
                        animate={{ x: hoveredLink === link.id ? 5 : 0 }}
                        className="text-amber-500 text-sm font-extrabold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {isRtl ? "مشاهده →" : "Visit →"}
                      </motion.div>
                    </div>
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-white/10 text-center">
                <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400">
                  <FaAward className="text-amber-500" size={12} />
                  <span className="font-extrabold">{isRtl ? "دارای گواهی‌های رسمی از مراجع ذی‌صلاح" : "Official certificates from competent authorities"}</span>
                  <FaShieldAlt className="text-amber-500" size={12} />
                  <span className="font-extrabold">{isRtl ? "تضمین امنیت اطلاعات" : "Information security guarantee"}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}