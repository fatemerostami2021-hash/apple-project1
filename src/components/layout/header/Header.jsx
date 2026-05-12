import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaApple,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaGlobe,
  FaShoppingBag,
  FaSearch,
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
  FaLinkedin,
  FaCommentDots,
} from "react-icons/fa";

import { useTheme } from "@/store/theme";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showDesigner, setShowDesigner] = useState(false);

  const isFa = i18n.language === "fa";
  const gold = "#d4af37";

  const changeLang = () => {
    const next = isFa ? "en" : "fa";
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "fa" ? "rtl" : "ltr";
  };

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
          {/* سمت چپ: لوگو + Store + social */}
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
                <span
                  className={`text-lg font-bold tracking-tighter ${
                    isFa ? "" : "uppercase"
                  }`}
                >
                  {t("header.store")}
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-xl">
              <a
                href="#"
                className="hover:text-pink-500 transition-transform hover:scale-110"
                aria-label={t("header.social.instagram")}
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="hover:text-green-500 transition-transform hover:scale-110"
                aria-label={t("header.social.whatsapp")}
              >
                <FaWhatsapp />
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition-transform hover:scale-110"
                aria-label={t("header.social.telegram")}
              >
                <FaTelegram />
              </a>
              <a
                href="#"
                className="hover:text-blue-700 transition-transform hover:scale-110"
                aria-label={t("header.social.linkedin")}
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* منوی وسط */}
          <div className="flex-1 flex justify-center">
            <DesktopNav />
          </div>

          {/* سمت راست */}
          <div className="flex items-center gap-5 font-bold">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-yellow-500 transition"
              type="button"
            >
              <FaSearch size={22} />
            </button>

            <Link to="/cart" className="relative group flex items-center gap-1">
              <FaShoppingBag
                size={22}
                className="group-hover:text-yellow-500 transition"
              />
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

            <div className="hidden md:flex items-center gap-3 text-sm">
              <Link to="/login" className="hover:text-yellow-500 transition">
                {t("header.login")}
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 text-black px-4 py-1.5 rounded-full hover:bg-yellow-600 transition"
              >
                {t("header.register")}
              </Link>
            </div>

            <a
              href="https://ble.ir/00989177892994"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-green-500 hover:text-green-400 transition transform hover:scale-110"
              title={t("header.social.bale")}
            >
              <FaCommentDots size={25} />
              <span className="hidden lg:block text-xs font-black">
                {t("header.social.bale")}
              </span>
            </a>

            <button
              className="md:hidden text-3xl"
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            searchOpen
              ? "max-h-20 opacity-100 border-t border-gray-700/30"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full max-w-3xl mx-auto py-3 px-6">
            <input
              type="text"
              placeholder={t("header.search")}
              className={`w-full px-6 py-2 rounded-full outline-none font-bold shadow-inner ${
                theme === "dark" ? "bg-zinc-800 text-white" : "bg-gray-100 text-black"
              }`}
            />
          </div>
        </div>
      </header>

      {mobileOpen && <MobileNav close={() => setMobileOpen(false)} />}
    </>
  );
}
