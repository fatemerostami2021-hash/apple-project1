import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
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
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const headerItems = getHeaderNavigation(navigationConfig);

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
            className="relative"
            onMouseEnter={() => setHoverId(item.id)}
            onMouseLeave={() => setHoverId(null)}
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
                  className={`flex items-center gap-2 bg-transparent border-0 transition font-bold ${
                    hoverId === item.id
                      ? "text-yellow-500"
                      : isDark
                      ? "text-white hover:text-yellow-400"
                      : "text-black hover:text-yellow-500"
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{t(item.labelKey)}</span>
                </button>

                {hoverId === item.id && (
                  <div
                    className="absolute left-0 top-full z-[60] pt-4 mega-menu-animate"
                    onMouseEnter={() => setHoverId(item.id)}
                  >
                    <MegaMenuPanel items={item.children} />
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
