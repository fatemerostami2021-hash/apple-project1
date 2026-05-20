import React from "react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";

export default function BlogFilters({
  searchQuery, setSearchQuery,
  selectedBrand, setSelectedBrand,
  sortBy, setSortBy,
  brands
}) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <div className="mb-10 p-6 bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl transition-all duration-300 hover:border-yellow-500/50 group">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <FiSearch className={`absolute top-1/2 -translate-y-1/2 text-zinc-400 ${isRTL ? "right-4" : "left-4"}`} />
          <input
            className={`w-full bg-zinc-100 dark:bg-zinc-800 rounded-2xl py-3 outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`}
            placeholder={t("blog.search")} // مطابقت با JSON شما
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

{/* Brands */}
<div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
  {brands.map((brand) => (
    <button
      key={brand}
      onClick={() => setSelectedBrand(brand)}
      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border border-transparent hover:border-yellow-500/50 ${
        selectedBrand === brand 
        ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20" 
        : "bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
      }`}
    >
      {/* 1. اگر all بود، از blog.all استفاده کن */}
      {/* 2. در غیر این صورت، از کلید lowercase استفاده کن */}
      {brand === "all" ? t("blog.all") : t(`brands.${brand.toLowerCase()}`)}
    </button>
  ))}
</div>


        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-zinc-100 dark:bg-zinc-800 rounded-xl px-4 py-3 outline-none cursor-pointer hover:border-yellow-500/50 border border-transparent transition-all"
        >
          <option value="newest">{t("blog.newest")}</option>
          <option value="mostViewed">{t("blog.mostViewed")}</option>
          <option value="shortestRead">{t("blog.shortestRead")}</option>
        </select>
      </div>
    </div>
  );
}
