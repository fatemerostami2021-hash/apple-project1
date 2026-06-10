// src/components/layout/header/TabletNav.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaApple, FaTimes } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

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

export default function TabletNav({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const items = getHeaderNavigation(navigationConfig);
  const [openId, setOpenId] = useState(null);
  const isRtl = i18n.language === "fa";

  // قفل کردن اسکرول هنگام باز بودن منو
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // بستن منو با ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* اوورلی تیره */}
      <div
        className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* سایدبار منو */}
      <div
        className={`
          fixed top-0 bottom-0 w-80 bg-white dark:bg-zinc-900 shadow-2xl z-[201]
          flex flex-col transition-all duration-300 ease-out
          ${isRtl ? "left-0" : "right-0"}
        `}
      >
        {/* هدر منو */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <FaApple size={24} className="text-yellow-500" />
            <span className="text-lg font-bold">{t("header.menu") || "منو"}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* لیست منو با اسکرول */}
        <nav className="flex-1 overflow-y-auto p-4">
          {items.map((item) => {
            const Icon = iconMap[item.id] || iconMap.default;

            return (
              <div key={item.id} className="border-b border-gray-100 dark:border-zinc-800 last:border-0">
                {item.type === "link" && (
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center gap-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:text-yellow-500 transition-colors"
                  >
                    <Icon size={20} />
                    {t(item.labelKey)}
                  </Link>
                )}

                {item.type === "mega" && (
                  <div>
                    <button
                      onClick={() => setOpenId(openId === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between py-3 text-base font-medium text-gray-900 dark:text-white hover:text-yellow-500 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={20} />
                        {t(item.labelKey)}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          openId === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openId === item.id && (
                      <div className="ps-7 pb-3 flex flex-col gap-2 animate-[fadeIn_0.2s_ease]">
                        {item.children.map((child) => {
                          const CIcon = iconMap[child.id] || iconMap.default;
                          return (
                            <Link
                              key={child.id}
                              to={child.path}
                              onClick={onClose}
                              className="flex items-center gap-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors"
                            >
                              <CIcon size={16} />
                              {t(child.labelKey)}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* فوتر منو */}
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>© 2024 TechCrunch</span>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>v1.0.0</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}