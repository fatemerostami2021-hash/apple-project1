import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

/* ══════════════════════════════════════════════
   FilterBar — بهینه‌شده با React.memo و useCallback
══════════════════════════════════════════════ */
const FilterBar = React.memo(({ activeFilter, setActiveFilter }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const filters = [
    { id: "All",         label: t("filters.all") },
    { id: "Apple",       label: t("filters.apple") },
    { id: "Samsung",     label: t("filters.samsung") },
    { id: "Smartphones", label: t("filters.phone") },
    { id: "Wearables",   label: t("filters.watch") },
    { id: "Accessories", label: t("filters.accessories") },
  ];

  const handleClick = useCallback(
    (id) => setActiveFilter(id),
    [setActiveFilter]
  );

  return (
    <div className={`flex flex-wrap justify-center gap-3 my-8 px-4 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="flex flex-wrap gap-2 p-2 rounded-full backdrop-blur-md border
        bg-white/60 border-neutral-200 dark:bg-neutral-900/60 dark:border-neutral-700 shadow-sm">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <motion.button
              key={filter.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(filter.id)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                isActive
                  ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.45)] scale-105"
                  : "text-neutral-600 dark:text-neutral-300 hover:text-[#D4AF37] hover:scale-105"
              }`}
              aria-pressed={isActive}
            >
              {filter.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});

FilterBar.displayName = "FilterBar";
export default FilterBar;
