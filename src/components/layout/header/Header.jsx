// src/components/layout/header/Header.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useTheme } from "@/store/theme";
import CartIcon from "../../ui/CartIcon";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import TabletNav from "./TabletNav";
import { articlesData } from "../../../data/articlesData";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showDesigner, setShowDesigner] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);

  const isFa = i18n.language === "fa";
  const gold = "#d4af37";
  const isRtl = i18n.language === "fa";

  // ✅ بررسی وضعیت لاگین و ادمین
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ بررسی توکن در localStorage
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
    
    // همچنین می‌تونی لاگین کاربر معمولی رو هم چک کنی
    const userToken = localStorage.getItem('userToken');
    setIsLoggedIn(!!userToken || !!token);
  }, []);

  const changeLang = () => {
    const next = isFa ? "en" : "fa";
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "fa" ? "rtl" : "ltr";
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsSearching(term.length > 0);

    if (term.length === 0) {
      setSearchResults([]);
      return;
    }

    const results = articlesData.filter((article) => {
      const title = article.title[isFa ? "fa" : "en"].toLowerCase();
      const excerpt = article.excerpt[isFa ? "fa" : "en"].toLowerCase();
      const searchQuery = term.toLowerCase();
      return title.includes(searchQuery) || excerpt.includes(searchQuery);
    });

    setSearchResults(results.slice(0, 8));
  };

  // ✅ خروج از ادمین
  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    window.location.href = '/';
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
          
          {/* ===== LOGO ===== */}
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

          {/* ===== NAV ===== */}
          <div className="flex-1 flex justify-center relative z-50">
            <DesktopNav />
            <TabletNav />
          </div>

          {/* ===== RIGHT ICONS ===== */}
          <div className="flex items-center gap-5 font-bold">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-yellow-500 transition"
              type="button"
            >
              <FaSearch size={22} />
            </button>

            <CartIcon />

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

            {/* ===== دکمه‌های کاربر ===== */}
            <div className="hidden md:flex items-center gap-3 text-sm">
              {isLoggedIn ? (
                <>
                  {/* ✅ اگر ادمین لاگین کرده، دکمه پنل مدیریت نشون بده */}
                  {isAdmin && (
                    <Link 
                      to="/admin/dashboard" 
                      className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 rounded-lg hover:bg-yellow-500/30 transition text-yellow-600 dark:text-yellow-400"
                    >
                      <FaUserCog size={14} />
                      <span className="text-xs font-bold">{isRtl ? "پنل مدیریت" : "Admin Panel"}</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={handleAdminLogout}
                    className="flex items-center gap-2 hover:text-red-500 transition text-gray-600 dark:text-gray-300"
                  >
                    <FaSignOutAlt size={14} />
                    <span>{isRtl ? "خروج" : "Logout"}</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center gap-2 hover:text-yellow-500 transition">
                  <FaUser size={16} />
                  <span>{t("header.login")}</span>
                </Link>
              )}
            </div>

            {/* ===== Mobile Menu Button ===== */}
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

      {/* ===== SEARCH MODAL ===== */}
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
              <div
                className={`rounded-2xl overflow-hidden shadow-2xl ${
                  theme === "dark"
                    ? "bg-[#1A1D24] border border-white/10"
                    : "bg-white border border-gray-200"
                }`}
              >
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
                        theme === "dark"
                          ? "bg-black/50 text-white placeholder-gray-500"
                          : "bg-gray-100 text-black placeholder-gray-400"
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
                            key={result.id}
                            to={`/blog/${result.slug}`}
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
                                alt={result.title[isFa ? "fa" : "en"]}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                                {result.title[isFa ? "fa" : "en"]}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                {result.excerpt[isFa ? "fa" : "en"]}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                                  {result.brand}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {result.readTime} {isRtl ? "دقیقه" : "min"}
                                </span>
                              </div>
                            </div>
                            <FaArrowRight
                              className={`text-gray-400 group-hover:text-amber-500 transition-all ${
                                isRtl ? "rotate-180" : ""
                              }`}
                              size={14}
                            />
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
                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {["iPhone", "Samsung", "Apple Watch", "AirPods", "Galaxy"].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => {
                              setSearchTerm(tag);
                              handleSearch({ target: { value: tag } });
                            }}
                            className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/10 hover:bg-amber-500 hover:text-white transition-all"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
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
