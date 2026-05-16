import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
} from "lucide-react";

const iconMap = {
  iphone: Smartphone,
  ipad: Tablet,
  macbook: Laptop,
  watch: Watch,
  airpods: Headphones,

  cases: Shield,
  chargers: BatteryCharging,
  protection: Shield,
  cables: Cable,
  audio: Speaker,

  "a-series": Smartphone,
  "s-series": Smartphone,
  "z-series": Smartphone,
  "m-series": Smartphone,
  "note-series": Smartphone,

  tablets: Tablet,
  laptops: Laptop,

  default: Smartphone,
};

export default function MegaMenuPanel({ items }) {
  const { t } = useTranslation();

  return (
    <div
      className="
        absolute
        top-full
        left-1/2
        -translate-x-1/2
        mt-4

        w-[95vw]
        max-w-[1100px]

        p-8
        rounded-2xl
        shadow-2xl
        z-50

        backdrop-blur-xl
        bg-white/90
        dark:bg-zinc-900/90

        border border-gray-200
        dark:border-zinc-700
      "
    >
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        {items?.map((child) => {
          const Icon = iconMap[child.id] || iconMap.default;

          return (
            <Link
              key={child.id}
              to={child.path}
              className="
                group
                flex items-center gap-4
                p-4 rounded-xl
                transition-all duration-300

                hover:bg-gray-100
                dark:hover:bg-zinc-800
              "
            >
              <Icon
                size={26}
                className="
                  text-gray-700
                  dark:text-white
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

              <div className="flex flex-col">

                <span
                  className="
                    relative
                    font-semibold
                    text-[15px]
                    text-gray-900
                    dark:text-white
                  "
                >
                  {t(child.labelKey)}

                  <span
                    className="
                      absolute
                      left-0
                      -bottom-1
                      h-[2px]
                      w-0
                      bg-yellow-500
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </span>

                {child.viewProductsKey && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t(child.viewProductsKey)}
                  </span>
                )}

              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
