import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { useTheme } from "@/store/theme";

import { navigationConfig } from "../../../config/navigation/navigation.config";
import { getHeaderNavigation } from "../../../config/navigation/navigation.helpers";
import MegaMenuPanel from "./MegaMenuPanel";

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
  apple: Smartphone,
  samsung: Smartphone,
  accessories: Shield,
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

export default function DesktopNav() {
  const { t } = useTranslation();
  const [hoverId, setHoverId] = useState(null);
  const hoverTimeout = useRef(null);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const headerItems = getHeaderNavigation(navigationConfig);

  const handleEnter = (id) => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHoverId(id);
    }, 80);
  };

  const handleLeave = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHoverId(null);
    }, 120);
  };

  return (
    <nav
      className={`hidden lg:flex items-center gap-10 text-[15px] font-semibold relative ${
        isDark ? "text-white" : "text-black"
      }`}
    >
      {headerItems.map((item) => {
        const Icon = iconMap[item.id] || iconMap.default;

        return (
          <div
            key={item.id}
            className="relative group"
            onMouseEnter={() => handleEnter(item.id)}
            onMouseLeave={handleLeave}
          >
            {item.type === "link" && (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition font-bold ${
                    isActive
                      ? "text-yellow-500"
                      : isDark
                      ? "text-white hover:text-yellow-400"
                      : "text-black hover:text-yellow-500"
                  }`
                }
              >
                <Icon size={16} className="shrink-0" />
                <span>{t(item.labelKey)}</span>
              </NavLink>
            )}

            {item.type === "mega" && (
              <>
                <button
                  type="button"
                  className={`relative flex items-center gap-2 bg-transparent border-0 transition font-bold ${
                    hoverId === item.id
                      ? "text-yellow-500"
                      : isDark
                      ? "text-white hover:text-yellow-400"
                      : "text-black hover:text-yellow-500"
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{t(item.labelKey)}</span>

                  {/* arrow indicator */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-2 w-2 h-2 rotate-45 bg-yellow-500 transition-all duration-200 ${
                      hoverId === item.id
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-50"
                    }`}
                  />
                </button>

                {hoverId === item.id && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-[70] w-screen max-w-[1100px] pointer-events-none"
                    onMouseEnter={() => handleEnter(item.id)}
                    onMouseLeave={handleLeave}
                  >
                    <div className="pointer-events-auto animate-[megaFade_0.22s_ease-out]">
                      <MegaMenuPanel items={item.children} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
