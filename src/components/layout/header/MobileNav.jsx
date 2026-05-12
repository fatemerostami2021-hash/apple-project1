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
  Newspaper
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
    <div className="md:hidden px-6 py-5 flex flex-col gap-4 bg-white dark:bg-black">

      {items.map((item) => {
        const Icon = iconMap[item.id] || iconMap.default;

        return (
          <div
            key={item.id}
            className="border-b border-gray-200 dark:border-zinc-800 pb-3"
          >

            {/* SIMPLE LINK */}
            {item.type === "link" && (
              <Link
                to={item.path}
                onClick={close}
                className="flex items-center gap-3 text-lg text-gray-900 dark:text-white"
              >
                <Icon
                  size={22}
                  className="text-gray-700 dark:text-white"
                />
                {t(item.labelKey)}
              </Link>
            )}

            {/* MEGA MENU */}
            {item.type === "mega" && (
              <details className="group">
                <summary
                  className="
                    list-none
                    flex items-center gap-3
                    cursor-pointer text-lg
                    text-gray-900 dark:text-white
                  "
                >
                  <Icon
                    size={22}
                    className="text-gray-700 dark:text-white"
                  />
                  {t(item.labelKey)}
                </summary>

                <div className="mt-3 flex flex-col gap-3 pl-8">

                  {item.children?.map((child) => {
                    const ChildIcon =
                      iconMap[child.id] || iconMap.default;

                    return (
                      <Link
                        key={child.id}
                        to={child.path}
                        onClick={close}
                        className="
                          flex items-center gap-3
                          text-[15px]
                          text-gray-700 dark:text-white
                          hover:text-yellow-600
                          dark:hover:text-yellow-400
                          transition-colors
                        "
                      >
                        <ChildIcon
                          size={18}
                          className="text-gray-600 dark:text-white"
                        />

                        {t(child.labelKey)}
                      </Link>
                    );
                  })}

                </div>
              </details>
            )}

          </div>
        );
      })}
    </div>
  );
}
