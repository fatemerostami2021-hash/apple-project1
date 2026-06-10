import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaApple,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaGlobe,
  FaShoppingBag,
  FaSearch,
  FaUser,
  FaArrowRight,
  FaSignOutAlt,
  FaUserPlus,
  FaShieldAlt,
} from "react-icons/fa";

import { useTheme } from "@/store/theme";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import TabletNav from "./TabletNav";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabletMenuOpen, setTabletMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showDesigner, setShowDesigner] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const searchInputRef = useRef(null);

  const isFa = i18n.language === "fa";
  const gold = "#d4af37";
  const isRtl = i18n.language === "fa";

  // دریافت اطلاعات کاربر از توکن
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      fetch(`${API_URL}/api/auth/me`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
            setIsAdmin(data.user.role === "admin");
          } else {
            localStorage.removeItem("user_token");
          }
        })
        .catch(() => localStorage.removeItem("user_token"));
    }
  }, []);

  const changeLang = () => {
    const next = isFa ? "en" : "fa";
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "fa" ? "rtl" : "ltr";
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAdmin(false);
    navigate("/");
  };

  // تابع جستجو از API
  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsSearching(term.length > 0);

    if (term.length === 0) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/articles`);
      const articles = await res.json();
      const filtered = articles.filter((article) => {
        const title = article.title?.[isFa ? "fa" : "en"]?.toLowerCase() || "";
        return title.includes(term.toLowerCase());
      });
      setSearchResults(filtered.slice(0, 8));
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchTerm("");
        setSearchResults([]);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [searchOpen]);

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl ${
          theme === "dark"
            ? "bg-black/95 text-white shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            : "bg-white/95 text-black shadow"
        }`}
      >
        <div className="w-full flex items-center justify-between px-8 py-4">
          
          {/* LOGO - LEFT */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDesigner(!showDesigner)}
                className="flex items-center gap-2 group transition-all"
                type="button"
              >
                <FaApple
                  size={30}
                  style={{ color: theme === "dark" ? gold : "#222" }}
                  className="group-hover:rotate-12 transition-transform"
                />
                {showDesigner && (
                  <span className="text-xs font-bold animate-fade-in text-yellow-500 whitespace-nowrap">
                    {t("header.designer")}
                  </span>
                )}
              </button>

              <Link to="/" className="hidden md:block">
                <span className={`text-lg font-bold tracking-tighter ${isFa ? "" : "uppercase"}`}>
                  {t("header.store")}
                </span>
              </Link>
            </div>
          </div>

          {/* DESKTOP NAV - CENTER */}
          <div className="flex-1 flex justify-center relative z-50">
            <DesktopNav />
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5 font-bold">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-yellow-500 transition"
              type="button"
            >
              <FaSearch size={22} />
            </button>

            <Link to="/cart" className="relative group flex items-center gap-1">
              <FaShoppingBag size={22} className="group-hover:text-yellow-500 transition" />
              <span className="hidden xl:block text-sm group-hover:text-yellow-500 transition">
                {t("header.cart")}
              </span>
            </Link>

            <button
              onClick={changeLang}
              className="relative flex items-center group"
              type="button"
            >
              <FaGlobe size={22} style={{ color: theme === "dark" ? gold : "#333" }} />
              <span className="absolute -bottom-5 text-[10px] opacity-0 group-hover:opacity-100 transition">
                {isFa ? "EN" : "FA"}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="hover:text-yellow-500 transition"
              type="button"
            >
              {theme === "dark" ? <FaSun size={22} /> : <FaMoon size={22} />}
            </button>

            {/* USER SECTION - با پشتیبانی کامل از دو زبان */}
            <div className="hidden md:flex items-center gap-3 text-sm">
              {user ? (
                <>
                  {/* دکمه ادمین - فقط برای کاربران ادمین */}
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 transition text-sm">
                      <FaShieldAlt size={14} />
                      <span>{isRtl ? "پنل مدیریت" : "Admin Panel"}</span>
                    </Link>
                  )}
                  <Link to="/profile" className="flex items-center gap-2 hover:text-yellow-500 transition">
                    <FaUser size={16} />
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-500 transition">
                    <FaSignOutAlt size={16} />
                    <span>{isRtl ? "خروج" : "Logout"}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center gap-2 hover:text-yellow-500 transition">
                    <FaUser size={16} />
                    <span>{isRtl ? "ورود" : "Login"}</span>
                  </Link>
                  <Link to="/register" className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-black hover:bg-amber-600 transition">
                    <FaUserPlus size={14} />
                    <span>{isRtl ? "ثبت نام" : "Register"}</span>
                  </Link>
                </>
              )}
            </div>

            {/* TABLET MENU BUTTON */}
            <button
              className="hidden md:flex lg:hidden text-3xl"
              onClick={() => setTabletMenuOpen(true)}
              type="button"
            >
              <FaBars />
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-3xl"
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      <TabletNav isOpen={tabletMenuOpen} onClose={() => setTabletMenuOpen(false)} />

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setSearchOpen(false);
              setSearchTerm("");
              setSearchResults([]);
            }}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`rounded-2xl overflow-hidden shadow-2xl ${
                theme === "dark" ? "bg-[#1A1D24] border border-white/10" : "bg-white border border-gray-200"
              }`}>
                <div className="p-4 border-b border-gray-200 dark:border-white/10">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder={isRtl ? "جستجوی محصولات، مقالات..." : "Search products, articles..."}
                      className={`w-full pl-12 pr-12 py-3 rounded-xl outline-none transition-all ${
                        theme === "dark" ? "bg-black/50 text-white placeholder-gray-500" : "bg-gray-100 text-black placeholder-gray-400"
                      }`}
                    />
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSearchResults([]);
                          searchInputRef.current?.focus();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                  {isSearching ? (
                    searchResults.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="text-5xl mb-3">🔍</div>
                        <p className="text-gray-500 dark:text-gray-400">
                          {isRtl ? "نتیجه‌ای برای جستجوی شما یافت نشد" : "No results found"}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="px-4 py-2 bg-gray-50 dark:bg-white/5">
                          <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                            {searchResults.length} {isRtl ? "نتیجه یافت شد" : "results found"}
                          </p>
                        </div>
                        {searchResults.map((result) => (
                          <Link
                            key={result.slug}
                            to={`/article/${result.slug}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchTerm("");
                              setSearchResults([]);
                            }}
                            className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 border-b border-gray-100 dark:border-white/5 last:border-0 group"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                              <img
                                src={result.cover}
                                alt={result.title?.[isFa ? "fa" : "en"]}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                                {result.title?.[isFa ? "fa" : "en"]}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                                  {result.brand}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {result.readTime} {isRtl ? "دقیقه" : "min"}
                                </span>
                              </div>
                            </div>
                            <FaArrowRight className={`text-gray-400 group-hover:text-amber-500 transition-all ${isRtl ? "rotate-180" : ""}`} size={14} />
                          </Link>
                        ))}
                      </div>
                    )
                  ) : (
                    <div className="p-8 text-center">
                      <div className="text-5xl mb-3">✨</div>
                      <p className="text-gray-500 dark:text-gray-400">
                        {isRtl ? "محصولات و مقالات را جستجو کنید..." : "Search products and articles..."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && <MobileNav close={() => setMobileOpen(false)} />}
    </>
  );
}
