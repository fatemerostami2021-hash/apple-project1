import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { navigationConfig } from "@/config/navigation/navigation.config";
import { getHeaderNavigation } from "@/config/navigation/navigation.helpers";

import {
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Headphones,
  Cable,
  BatteryCharging,
  Shield,
  Speaker,
  Home,
  Info,
  Newspaper,
  Menu,
  X,
} from "lucide-react";

const iconMap = {
  home: Home,
  articles: Newspaper,
  about: Info,
  iphone: Smartphone,
  ipad: Tablet,
  macbook: Laptop,
  watch: Watch,
  airpods: Headphones,
  "a-series": Smartphone,
  "s-series": Smartphone,
  "z-series": Smartphone,
  "m-series": Smartphone,
  "note-series": Smartphone,
  tablets: Tablet,
  laptops: Laptop,
  cases: Shield,
  chargers: BatteryCharging,
  protection: Shield,
  cables: Cable,
  audio: Speaker,
  default: Smartphone,
};

export default function TabletNav() {
  const { t } = useTranslation();
  const items = getHeaderNavigation(navigationConfig);

  const [isOpen, setIsOpen] = useState(false);
  const [openId, setOpenId] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleSubmenu = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      {/* ===== دکمه همبرگر (فقط در تبلت) ===== */}
      <button
        onClick={toggleMenu}
        className="
          hidden md:flex lg:hidden
          items-center justify-center
          w-10 h-10
          text-gray-800 dark:text-white
          hover:text-yellow-500
          transition-colors
          relative
        "
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* ===== منوی کشویی همبرگری ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* بک‌دراپ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="
                fixed inset-0 z-40
                bg-black/50 backdrop-blur-sm
                hidden md:block lg:hidden
              "
              onClick={closeMenu}
            />

            {/* منو */}
            <motion.nav
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="
                fixed top-0 left-0 z-50
                w-[320px] max-w-[85vw]
                h-screen
                overflow-y-auto
                bg-white dark:bg-zinc-900
                shadow-2xl
                hidden md:block lg:hidden
                border-r border-gray-200 dark:border-zinc-800
              "
            >
              {/* هدر منو */}
              <div className="
                sticky top-0 z-10
                flex items-center justify-between
                px-5 py-4
                bg-white dark:bg-zinc-900
                border-b border-gray-200 dark:border-zinc-800
              ">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("header.menu") || "منو"}
                </span>
                <button
                  onClick={closeMenu}
                  className="
                    p-1
                    text-gray-600 dark:text-gray-300
                    hover:text-yellow-500
                    transition-colors
                  "
                >
                  <X size={24} />
                </button>
              </div>

              {/* لیست آیتم‌ها */}
              <div className="px-4 py-3 space-y-2">
                {items.map((item) => {
                  const Icon = iconMap[item.id] || iconMap.default;

                  return (
                    <div
                      key={item.id}
                      className="
                        border-b border-gray-100 dark:border-zinc-800
                        pb-2 last:border-none
                      "
                    >
                      {item.type === "link" && (
                        <Link
                          to={item.path}
                          onClick={closeMenu}
                          className="
                            flex items-center gap-3
                            py-2.5 px-3
                            rounded-xl
                            text-[15px] font-semibold
                            text-gray-800 dark:text-white
                            hover:bg-yellow-500/10 hover:text-yellow-500
                            transition-all
                          "
                        >
                          <Icon size={20} className="text-gray-500 dark:text-gray-400" />
                          <span>{t(item.labelKey)}</span>
                        </Link>
                      )}

                      {item.type === "mega" && (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(item.id)}
                            className="
                              w-full
                              flex items-center justify-between
                              py-2.5 px-3
                              rounded-xl
                              text-[15px] font-semibold
                              text-gray-800 dark:text-white
                              hover:bg-yellow-500/10 hover:text-yellow-500
                              transition-all
                              group
                            "
                          >
                            <span className="flex items-center gap-3">
                              <Icon size={20} className="text-gray-500 dark:text-gray-400 group-hover:text-yellow-500" />
                              <span>{t(item.labelKey)}</span>
                            </span>

                            <span
                              className={`
                                text-gray-400
                                transition-transform duration-300
                                ${openId === item.id ? "rotate-180" : ""}
                              `}
                            >
                              ▾
                            </span>
                          </button>

                          {/* زیرمجموعه‌ها */}
                          <AnimatePresence>
                            {openId === item.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="ps-8 pt-1 pb-2 space-y-1">
                                  {item.children.map((child) => {
                                    const CIcon = iconMap[child.id] || iconMap.default;
                                    return (
                                      <Link
                                        key={child.id}
                                        to={child.path}
                                        onClick={closeMenu}
                                        className="
                                          flex items-center gap-3
                                          py-2 px-3
                                          rounded-lg
                                          text-[14px]
                                          text-gray-600 dark:text-gray-300
                                          hover:bg-yellow-500/10 hover:text-yellow-500
                                          transition-all
                                        "
                                      >
                                        <CIcon size={16} className="text-gray-400" />
                                        <span>{t(child.labelKey)}</span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}