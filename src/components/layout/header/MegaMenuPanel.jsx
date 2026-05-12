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
        w-[900px] p-6 rounded-xl shadow-xl z-50
        bg-white text-gray-900
        dark:bg-zinc-900 dark:text-white
        border border-gray-200 dark:border-zinc-700
      "
    >
      <div className="grid grid-cols-3 gap-6">

        {items?.map((child) => {
          const Icon = iconMap[child.id] || iconMap.default;

          return (
            <Link
              key={child.id}
              to={child.path}
              className="
                flex items-center gap-4 p-4 rounded-lg
                transition-colors
                hover:bg-gray-100 dark:hover:bg-zinc-800
              "
            >
              <Icon
                size={24}
                className="text-gray-700 dark:text-white"
              />

              <div className="flex flex-col">
                <span className="font-semibold text-[15px] text-gray-900 dark:text-white">
                  {t(child.labelKey)}
                </span>

                {child.viewProductsKey && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
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
