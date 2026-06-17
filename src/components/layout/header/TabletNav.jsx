import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";

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

export default function TabletNav() {
  const { t } = useTranslation();
  const items = getHeaderNavigation(navigationConfig);

  const [openId, setOpenId] = useState(null);

  return (
    <nav className="hidden md:flex lg:hidden flex-col gap-3 px-6 py-4 bg-white dark:bg-zinc-900 shadow-md">
      {items.map((item) => {
        const Icon = iconMap[item.id] || iconMap.default;

        return (
          <div key={item.id} className="border-b border-gray-200 dark:border-zinc-800 pb-3">
            {item.type === "link" && (
              <Link
                to={item.path}
                className="
                  flex items-center gap-3
                  text-lg font-semibold
                  text-gray-900 dark:text-white
                  hover:text-yellow-500
                "
              >
                <Icon size={20} />
                {t(item.labelKey)}
              </Link>
            )}

            {item.type === "mega" && (
              <div>
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="
                    w-full flex items-center justify-between
                    text-lg font-semibold
                    text-gray-900 dark:text-white
                  "
                >
                  <span className="flex items-center gap-3">
                    <Icon size={20} />
                    {t(item.labelKey)}
                  </span>

                  <span
                    className={`
                      transition-transform duration-300
                      ${openId === item.id ? "rotate-180" : ""}
                    `}
                  >
                    ▾
                  </span>
                </button>

                {openId === item.id && (
                  <div className="ps-7 mt-3 flex flex-col gap-2 animate-[fadeInUp_0.25s_ease]">
                    {item.children.map((child) => {
                      const CIcon = iconMap[child.id] || iconMap.default;
                      return (
                        <Link
                          key={child.id}
                          to={child.path}
                          className="
                            flex items-center gap-3
                            text-[15px]
                            text-gray-700 dark:text-gray-300
                            hover:text-yellow-500
                          "
                        >
                          <CIcon size={17} />
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
  );
}
