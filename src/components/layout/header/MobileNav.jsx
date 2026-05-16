import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { navigationConfig } from "@/config/navigation/navigation.config";
import { getMobileNavigation } from "@/config/navigation/navigation.helpers";

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

export default function MobileNav({ close }) {
  const { t } = useTranslation();
  const items = getMobileNavigation(navigationConfig);

  return (
    <nav
      className="
        md:hidden
        px-6 py-6
        flex flex-col gap-5
        bg-white dark:bg-zinc-900
        border-t border-gray-200 dark:border-zinc-800
        animate-[fadeInUp_0.25s_ease]
      "
    >
      {items.map((item) => {
        const Icon = iconMap[item.id] || iconMap.default;

        return (
          <div
            key={item.id}
            className="border-b border-gray-200 dark:border-zinc-800 pb-4 last:border-none"
          >
            {item.type === "link" && (
              <Link
                to={item.path}
                onClick={close}
                className="
                  flex items-center gap-3
                  py-1
                  text-[16px]
                  text-gray-900 dark:text-white
                  font-semibold
                  hover:text-yellow-500
                  transition-all
                "
              >
                <Icon
                  size={22}
                  className="text-gray-600 dark:text-gray-300"
                />
                <span>{t(item.labelKey)}</span>
              </Link>
            )}

            {item.type === "mega" && (
              <details className="group">
                <summary
                  className="
                    list-none
                    flex items-center justify-between
                    cursor-pointer
                    py-1
                    text-[16px]
                    font-semibold
                    text-gray-900 dark:text-white
                  "
                >
                  <div className="flex items-center gap-3">
                    <Icon size={22} className="text-gray-600 dark:text-gray-300" />
                    <span>{t(item.labelKey)}</span>
                  </div>

                  <span
                    className="
                      inline-flex items-center justify-center
                      w-6 h-6 rounded-full
                      text-[12px]
                      border border-gray-300 dark:border-zinc-600
                      text-gray-600 dark:text-gray-300
                      transition-transform duration-300
                      group-open:rotate-180
                    "
                  >
                    ▾
                  </span>
                </summary>

                <div
                  className="
                    mt-3 ps-8
                    border-s border-gray-300 dark:border-zinc-700
                    flex flex-col gap-2
                    animate-[fadeInUp_0.25s_ease]
                  "
                >
                  {item.children?.map((child) => {
                    const ChildIcon = iconMap[child.id] || iconMap.default;

                    return (
                      <Link
                        key={child.id}
                        to={child.path}
                        onClick={close}
                        className="
                          flex items-center gap-3
                          py-1
                          text-[15px]
                          text-gray-700 dark:text-gray-300
                          hover:text-yellow-500
                          transition-all
                        "
                      >
                        <ChildIcon size={18} />
                        <span>{t(child.labelKey)}</span>
                      </Link>
                    );
                  })}
                </div>
              </details>
            )}
          </div>
        );
      })}
    </nav>
  );
}
