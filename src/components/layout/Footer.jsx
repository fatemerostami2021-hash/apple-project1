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

  const appleLinks = headerItems.find(i => i.id === "apple")?.children || [];
  const samsungLinks = headerItems.find(i => i.id === "samsung")?.children || [];

  const getLabel = (item) => {
    if (item.labelKey) return t(item.labelKey);
    if (typeof item.label === "object") return isRtl ? item.label.fa : item.label.en;
    return item.label || "";
  };

  // ===== اسکرول دقیق به بالای صفحه هنگام کلیک روی هر آیتم =====
  // چون بعضی لینک‌ها به مسیر یکسانی با query متفاوت اشاره می‌کنن (مثلاً /products?brand=Apple)
  // ری‌اکت روتر ممکنه اسکرول رو خودکار ریست نکنه، پس اینجا صریح انجامش می‌دیم.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

  // ===== محصولات اپل (لینک به صفحه اصلی محصولات) =====
  const appleProductLinks = [
    { path: "/products?brand=Apple", icon: <FaApple />, label: isRtl ? "آیفون" : "iPhone" },
    { path: "/products?brand=Apple", icon: <FaClock />, label: isRtl ? "اپل واچ" : "Apple Watch" },
    { path: "/products?brand=Apple", icon: <FaLaptop />, label: isRtl ? "مک‌بوک" : "MacBook" },
    { path: "/products?brand=Apple", icon: <FaTablet />, label: isRtl ? "آیپد" : "iPad" },
    { path: "/products?brand=Apple", icon: <FaHeadphones />, label: isRtl ? "ایرپادز" : "AirPods" },
  ];

  // ===== محصولات سامسونگ (لینک به صفحه اصلی محصولات) =====
  const samsungProductLinks = [
    { path: "/products?brand=Samsung", icon: <FaAndroid />, label: isRtl ? "گوشی‌های سامسونگ" : "Samsung Phones" },
    { path: "/products?brand=Samsung", icon: <FaTablet />, label: isRtl ? "تبلت‌های سامسونگ" : "Samsung Tablets" },
    { path: "/products?brand=Samsung", icon: <FaLaptop />, label: isRtl ? "لپ‌تاپ‌های سامسونگ" : "Samsung Laptops" },
  ];

  return (
    <footer
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative mt-auto border-t overflow-hidden transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#050505] text-zinc-400 border-zinc-800"
          : "bg-white text-zinc-600 border-zinc-200"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-amber-500/6 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-10 w-48 h-48 bg-sky-500/5 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">

          {/* ===== ستون ۱: برندینگ ===== */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 flex items-center justify-center shadow-[0_10px_30px_rgba(245,158,11,0.25)]">
                <FaApple className="text-white text-xl md:text-2xl" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
              </div>
              <div>
                <h2 className="text-base md:text-lg lg:text-xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
                  {d.brandName}
                </h2>
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.28em] text-amber-500 font-bold">
                  {isRtl ? d.taglineFa : d.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm leading-7 opacity-80 max-w-xs mb-4 hidden sm:block">
              {isRtl ? d.descriptionFa : d.description}
            </p>

            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
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
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center ${hover} transition-all duration-300`}
                >
                  <Icon className="text-sm md:text-[17px]" />
                </a>
              ))}
            </div>
          </div>

          {/* ===== ستون ۲: لینک‌های سریع ===== */}
          <div>
            <h3 className="mb-2 md:mb-4 text-[10px] md:text-xs font-black uppercase tracking-[0.18em] md:tracking-[0.22em] text-zinc-900 dark:text-white">
              {isRtl ? "دسترسی سریع" : "Quick Links"}
            </h3>
            <ul className="space-y-1.5 md:space-y-2.5">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    onClick={scrollToTop}
                    className="group inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm opacity-85 hover:opacity-100 hover:text-amber-500 transition-all duration-300"
                  >
                    <span className="text-amber-500/60 group-hover:text-amber-500 transition-all text-xs md:text-base">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== ستون ۳: محصولات اپل ===== */}
          <div>
            <h3 className="mb-2 md:mb-4 text-[10px] md:text-xs font-black uppercase tracking-[0.18em] md:tracking-[0.22em] text-zinc-900 dark:text-white flex items-center gap-1.5 md:gap-2">
              <FaApple className="text-amber-500 text-sm md:text-base" />
              {isRtl ? "محصولات اپل" : "Apple Products"}
            </h3>
            <ul className="space-y-1.5 md:space-y-2.5">
              {appleProductLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    onClick={scrollToTop}
                    className="group inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm opacity-85 hover:opacity-100 hover:text-amber-500 transition-all duration-300"
                  >
                    <span className="text-amber-500/60 group-hover:text-amber-500 transition-all text-xs md:text-base">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== ستون ۴: محصولات سامسونگ + تماس ===== */}
          <div>
            <h3 className="mb-2 md:mb-4 text-[10px] md:text-xs font-black uppercase tracking-[0.18em] md:tracking-[0.22em] text-zinc-900 dark:text-white flex items-center gap-1.5 md:gap-2">
              <FaAndroid className="text-amber-500 text-sm md:text-base" />
              {isRtl ? "محصولات سامسونگ" : "Samsung Products"}
            </h3>
            <ul className="space-y-1.5 md:space-y-2.5 mb-3 md:mb-6">
              {samsungProductLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    onClick={scrollToTop}
                    className="group inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm opacity-85 hover:opacity-100 hover:text-amber-500 transition-all duration-300"
                  >
                    <span className="text-amber-500/60 group-hover:text-amber-500 transition-all text-xs md:text-base">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-2 md:mb-4 text-[10px] md:text-xs font-black uppercase tracking-[0.18em] md:tracking-[0.22em] text-zinc-900 dark:text-white">
              {isRtl ? "ارتباط با ما" : "Contact"}
            </h3>
            <div className="space-y-2 md:space-y-3">
              {[
                { Icon: FaEnvelope, label: "Email", value: d.email, dir: "ltr" },
                { Icon: FaPhone, label: isRtl ? "تلفن" : "Phone", value: d.phone, dir: "ltr" },
                { Icon: FaMapMarkerAlt, label: isRtl ? "موقعیت" : "Location", value: isRtl ? d.locationFa : d.location, dir: "auto" },
              ].map(({ Icon, label, value, dir }) => (
                <div key={label} className="flex items-start gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0">
                    <Icon className="text-amber-500 text-xs md:text-sm" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-xs uppercase tracking-wider opacity-50 mb-0.5 md:mb-1">{label}</p>
                    <p className="text-xs md:text-sm break-all" dir={dir}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== ستون ۵: ساعت (در همه سایزها نمایش داده می‌شود) ===== */}
          <div className="flex flex-col items-center lg:items-end">
            <h3 className="mb-2 md:mb-4 text-[10px] md:text-xs font-black uppercase tracking-[0.18em] md:tracking-[0.22em] text-zinc-900 dark:text-white">
              {isRtl ? "زمان زنده" : "Live Time"}
            </h3>

            {/* ساعت آنالوگ کوچک در موبایل */}
            <div className="relative w-[80px] h-[92px] md:w-[120px] md:h-[138px] lg:w-[150px] lg:h-[172px] rounded-[1.5rem] md:rounded-[2.2rem] lg:rounded-[2.8rem] bg-gradient-to-br from-[#b9bec7] via-[#8b929d] to-[#d8dde5] dark:from-[#3f434b] dark:via-[#272a30] dark:to-[#5d6470] p-[3px] md:p-[4px] lg:p-[5px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] md:shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/20">
              <div className="relative w-full h-full rounded-[1.3rem] md:rounded-[2rem] lg:rounded-[2.45rem] bg-black overflow-hidden border-2 md:border-[3px] lg:border-[4px] border-[#0b0b0c]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.08),transparent_45%),radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_35%)]" />
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-[1.5px] h-[6px] md:w-[2px] md:h-[8px] lg:w-[2px] lg:h-[10px] origin-center rounded-full"
                    style={{
                      transform: `translate(-50%,-50%) rotate(${i * 30}deg) translateY(-28px) md:translateY(-40px) lg:translateY(-54px)`,
                      background: i % 3 === 0 ? "rgba(251,146,60,0.95)" : "rgba(255,255,255,0.35)"
                    }}
                  />
                ))}
                <div
                  className="absolute left-1/2 bottom-1/2 w-[3px] h-[20px] md:w-[3.5px] md:h-[28px] lg:w-[4px] lg:h-[34px] -translate-x-1/2 rounded-full bg-white origin-bottom z-20"
                  style={{ transform: `translateX(-50%) rotate(${hrDeg}deg)` }}
                />
                <div
                  className="absolute left-1/2 bottom-1/2 w-[2px] h-[28px] md:w-[2.5px] md:h-[38px] lg:w-[3px] lg:h-[48px] -translate-x-1/2 rounded-full bg-zinc-300 origin-bottom z-20"
                  style={{ transform: `translateX(-50%) rotate(${minDeg}deg)` }}
                />
                <div
                  className="absolute left-1/2 bottom-1/2 w-[1.5px] h-[32px] md:w-[1.8px] md:h-[44px] lg:w-[2px] lg:h-[56px] -translate-x-1/2 rounded-full bg-orange-500 origin-bottom z-30 shadow-[0_0_6px_rgba(249,115,22,0.6)] md:shadow-[0_0_10px_rgba(249,115,22,0.6)]"
                  style={{ transform: `translateX(-50%) rotate(${secDeg}deg)` }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full bg-black border border-orange-500 z-40" />
                <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[6px] md:text-[8px] lg:text-[10px] tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.25em] font-black text-orange-500 uppercase">
                  Ultra
                </div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center">
                  <div className="text-[7px] md:text-[9px] lg:text-[11px] font-bold text-white tracking-wide">
                    {time.toLocaleDateString(isRtl ? "fa-IR" : "en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
              </div>
            </div>

            {/* زمان دیجیتال */}
            <div className="mt-2 md:mt-4 lg:mt-6 text-center">
              <div className="text-[10px] md:text-sm lg:text-base font-black tracking-[0.12em] md:tracking-[0.15em] lg:tracking-[0.18em] text-zinc-900 dark:text-white">
                {digitalTime}
              </div>
              <div className="mt-0.5 md:mt-1 text-[8px] md:text-[10px] lg:text-[11px] uppercase tracking-[0.12em] md:tracking-[0.15em] lg:tracking-[0.18em] text-amber-500 font-bold">
                {digitalDate}
              </div>
              <p className="mt-1 md:mt-2 text-[7px] md:text-[9px] lg:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] lg:tracking-[0.3em] opacity-45 font-black">
                Apple Watch Ultra
              </p>
            </div>
          </div>
        </div>

        {/* ===== فوتر پایین ===== */}
        <div className="mt-4 md:mt-6 lg:mt-8 pt-3 md:pt-4 lg:pt-5 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3 lg:gap-4">
          <p className="text-[9px] md:text-[11px] opacity-60 text-center md:text-start">
            © {currentYear} {d.brandName} — {isRtl ? d.copyrightTextFa : d.copyrightText}
          </p>
          <div className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-black text-zinc-900 dark:text-white">
            <HiOutlineSparkles className="text-amber-500 text-xs md:text-sm" />
            <span>
              {isRtl ? `طراحی و توسعه ${d.designerNameFa}` : `Designed by ${d.designerName}`}
            </span>
            <HiOutlineSparkles className="text-amber-500 text-xs md:text-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}