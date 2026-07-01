import { Link } from "react-router-dom";
import { useTheme } from "../../../store/theme";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import {
  FaApple, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaAndroid,
  FaHome, FaBox, FaNewspaper, FaInfoCircle,
  FaHeadphones, FaLaptop, FaTablet, FaClock
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { navigationConfig } from "../../../config/navigation/navigation.config";
import { getHeaderNavigation } from "../../../config/navigation/navigation.helpers";
import { useFooter } from "../../../hooks/useFooter";

export default function Footer() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const currentYear = new Date().getFullYear();
  const { footer: d } = useFooter();

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const headerItems = useMemo(
    () => getHeaderNavigation(navigationConfig),
    [i18n.language]
  );

  const getLabel = (item) => {
    if (item.labelKey) return t(item.labelKey);
    if (typeof item.label === "object") return isRtl ? item.label.fa : item.label.en;
    return item.label || "";
  };

  // ===== ساعت =====
  const sec = time.getSeconds();
  const min = time.getMinutes();
  const hr = time.getHours();
  const secDeg = sec * 6;
  const minDeg = min * 6 + sec * 0.1;
  const hrDeg = (hr % 12) * 30 + min * 0.5;

  const digitalTime = time.toLocaleTimeString(
    isRtl ? "fa-IR" : "en-US",
    { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }
  );
  const digitalDate = time.toLocaleDateString(
    isRtl ? "fa-IR" : "en-US",
    { weekday: "short", year: "numeric", month: "short", day: "numeric" }
  );

  // ===== لینک‌های سریع =====
  const quickLinks = [
    { path: "/", icon: <FaHome />, label: isRtl ? "خانه" : "Home" },
    { path: "/products", icon: <FaBox />, label: isRtl ? "محصولات" : "Products" },
    { path: "/blog", icon: <FaNewspaper />, label: isRtl ? "مقالات" : "Blog" },
    { path: "/about", icon: <FaInfoCircle />, label: isRtl ? "درباره ما" : "About" },
  ];

  // ===== محصولات اپل (لینک‌های اختصاصی و صحیح) =====
  const appleProductLinks = [
    { path: "/apple-products/iphone", icon: <FaApple />, label: isRtl ? "آیفون" : "iPhone" },
    { path: "/apple-products/watch", icon: <FaClock />, label: isRtl ? "اپل واچ" : "Apple Watch" },
    { path: "/apple-products/macbook", icon: <FaLaptop />, label: isRtl ? "مک‌بوک" : "MacBook" },
    { path: "/apple-products/ipad", icon: <FaTablet />, label: isRtl ? "آیپد" : "iPad" },
    { path: "/apple-products/airpods", icon: <FaHeadphones />, label: isRtl ? "ایرپادز" : "AirPods" },
  ];

  // ===== محصولات سامسونگ (لینک به صفحه اصلی سامسونگ با حفظ ساختار) =====
  const samsungProductLinks = [
    { path: "/samsung", icon: <FaAndroid />, label: isRtl ? "گوشی‌های سامسونگ" : "Samsung Phones" },
    { path: "/samsung", icon: <FaTablet />, label: isRtl ? "تبلت‌های سامسونگ" : "Samsung Tablets" },
    { path: "/samsung", icon: <FaLaptop />, label: isRtl ? "لپ‌تاپ‌های سامسونگ" : "Samsung Laptops" },
  ];

  // ===== کامپوننت ساعت (برای جلوگیری از تکرار کد) =====
  const ClockWidget = () => (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* ساعت آنالوگ */}
        <div className="relative w-[150px] h-[172px] rounded-[2.8rem] bg-gradient-to-br from-[#b9bec7] via-[#8b929d] to-[#d8dde5] dark:from-[#3f434b] dark:via-[#272a30] dark:to-[#5d6470] p-[5px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/20">
          <div className="absolute -left-[4px] top-[72px] w-[7px] h-[36px] rounded-r-md bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.45)]" />
          <div className="absolute -right-[4px] top-[58px] w-[7px] h-[24px] rounded-l-md bg-zinc-500 dark:bg-zinc-700" />
          <div className="absolute -right-[6px] top-[88px] w-[12px] h-[12px] rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 dark:from-zinc-500 dark:to-zinc-800 border border-white/10" />
          <div className="relative w-full h-full rounded-[2.45rem] bg-black overflow-hidden border-[4px] border-[#0b0b0c]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.08),transparent_45%),radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_35%)]" />
            {/* علامت‌های 12 ساعته */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-[2px] h-[10px] origin-center rounded-full"
                style={{
                  transform: `translate(-50%,-50%) rotate(${i * 30}deg) translateY(-54px)`,
                  background: i % 3 === 0 ? "rgba(251,146,60,0.95)" : "rgba(255,255,255,0.35)"
                }}
              />
            ))}
            {/* عقربه‌ها */}
            <div
              className="absolute left-1/2 bottom-1/2 w-[4px] h-[34px] -translate-x-1/2 rounded-full bg-white origin-bottom z-20"
              style={{ transform: `translateX(-50%) rotate(${hrDeg}deg)` }}
            />
            <div
              className="absolute left-1/2 bottom-1/2 w-[3px] h-[48px] -translate-x-1/2 rounded-full bg-zinc-300 origin-bottom z-20"
              style={{ transform: `translateX(-50%) rotate(${minDeg}deg)` }}
            />
            <div
              className="absolute left-1/2 bottom-1/2 w-[2px] h-[56px] -translate-x-1/2 rounded-full bg-orange-500 origin-bottom z-30 shadow-[0_0_10px_rgba(249,115,22,0.6)]"
              style={{ transform: `translateX(-50%) rotate(${secDeg}deg)` }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black border-2 border-orange-500 z-40" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] font-black text-orange-500 uppercase">
              Ultra
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
              <div className="text-[11px] font-bold text-white tracking-wide">
                {time.toLocaleDateString(isRtl ? "fa-IR" : "en-US", { month: "short", day: "numeric" })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ساعت دیجیتال */}
      <div className="mt-4 text-center">
        <div className="text-sm font-black tracking-[0.18em] text-zinc-900 dark:text-white">
          {digitalTime}
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-amber-500 font-bold">
          {digitalDate}
        </div>
      </div>
    </div>
  );

  return (
    <footer
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative mt-auto border-t overflow-hidden transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#050505] text-zinc-400 border-zinc-800"
          : "bg-white text-zinc-600 border-zinc-200"
      }`}
    >
      {/* افکت‌های پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-amber-500/6 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-10 w-48 h-48 bg-sky-500/5 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        
        {/* === لایه‌بندی ریسپانسیو === */}
        {/* موبایل: 2 ستون | تبلت: 2 ستون | دسکتاپ: 5 ستون */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">

          {/* --- ستون ۱: برندینگ --- */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 flex items-center justify-center shadow-[0_10px_30px_rgba(245,158,11,0.25)]">
                <FaApple className="text-white text-2xl" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
                  {d.brandName}
                </h2>
                <p className="text-[10px] uppercase tracking-[0.28em] text-amber-500 font-bold">
                  {isRtl ? d.taglineFa : d.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 opacity-80 max-w-xs mb-5">
              {isRtl ? d.descriptionFa : d.description}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              {[
                { key: "linkedin", Icon: FaLinkedin, hover: "hover:bg-[#0077B5] hover:border-[#0077B5] hover:text-white" },
                { key: "instagram", Icon: FaInstagram, hover: "hover:bg-gradient-to-br hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:text-white" },
                { key: "telegram", Icon: FaTelegram, hover: "hover:bg-[#229ED9] hover:border-[#229ED9] hover:text-white" },
                { key: "whatsapp", Icon: FaWhatsapp, hover: "hover:bg-[#25D366] hover:border-[#25D366] hover:text-white" },
              ].map(({ key, Icon, hover }) => (
                <a
                  key={key}
                  href={d.socialLinks?.[key] || "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={key}
                  className={`w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center ${hover} transition-all duration-300`}
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* --- ستون ۲: لینک‌های سریع --- */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-zinc-900 dark:text-white">
              {isRtl ? "دسترسی سریع" : "Quick Links"}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm opacity-85 hover:opacity-100 hover:text-amber-500 transition-all duration-300"
                  >
                    <span className="text-amber-500/60 group-hover:text-amber-500 transition-all">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ستون ۳: محصولات اپل --- */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-zinc-900 dark:text-white flex items-center gap-2">
              <FaApple className="text-amber-500" />
              {isRtl ? "اپل" : "Apple"}
            </h3>
            <ul className="space-y-2.5">
              {appleProductLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm opacity-85 hover:opacity-100 hover:text-amber-500 transition-all duration-300"
                  >
                    <span className="text-amber-500/60 group-hover:text-amber-500 transition-all">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ستون ۴: محصولات سامسونگ --- */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-zinc-900 dark:text-white flex items-center gap-2">
              <FaAndroid className="text-amber-500" />
              {isRtl ? "سامسونگ" : "Samsung"}
            </h3>
            <ul className="space-y-2.5 mb-6">
              {samsungProductLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm opacity-85 hover:opacity-100 hover:text-amber-500 transition-all duration-300"
                  >
                    <span className="text-amber-500/60 group-hover:text-amber-500 transition-all">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* اطلاعات تماس در موبایل برای صرفه‌جویی در فضا انتقال یافته یا در اینجا نگه داشته شده */}
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-zinc-900 dark:text-white">
              {isRtl ? "ارتباط" : "Contact"}
            </h3>
            <div className="space-y-3">
               {[
                { Icon: FaEnvelope, label: "Email", value: d.email, dir: "ltr" },
                { Icon: FaPhone, label: isRtl ? "تلفن" : "Phone", value: d.phone, dir: "ltr" },
              ].map(({ Icon, label, value, dir }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="text-amber-500 text-sm shrink-0" />
                  <p className="text-xs" dir={dir}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- ستون ۵: ساعت --- */}
          {/* --- ستون ۵: ساعت --- */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 flex flex-col items-center justify-center">
             {/* 
                On mobile (col-span-2), we center it. 
                We can scale it down slightly on mobile if needed, 
                but the grid layout handles the placement.
                The user asked for "minimal space in mobile".
                The ClockWidget is about 150px wide.
             */}
             <div className="transform scale-90 md:scale-100 origin-center">
                <ClockWidget />
             </div>
          </div>

        </div> {/* End of Grid */}

        {/* === Footer Bottom === */}
        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
             {/* Copyright */}
             <p className="text-xs opacity-70">
               © {currentYear} {d.brandName}. {isRtl ? "تمامی حقوق محفوظ است." : "All rights reserved."}
             </p>
             
             {/* Extra links or payment icons if any */}
             <div className="flex items-center gap-4">
                {/* Maybe a link to privacy policy or terms */}
                <Link to="/privacy" className="text-xs opacity-70 hover:opacity-100 hover:text-amber-500 transition-colors">
                   {isRtl ? "حریم خصوصی" : "Privacy Policy"}
                </Link>
                <Link to="/terms" className="text-xs opacity-70 hover:opacity-100 hover:text-amber-500 transition-colors">
                   {isRtl ? "قوانین" : "Terms of Service"}
                </Link>
             </div>
          </div>
        </div>

      </div> {/* End of Container */}
    </footer>
  );
}
