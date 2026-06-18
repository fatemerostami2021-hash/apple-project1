import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FilterBar = ({ activeFilter, setActiveFilter }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ دریافت دسته‌بندی‌ها از API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/products/categories`);
        console.log('✅ Categories fetched:', res.data);
        
        if (res.data?.categories) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.error('❌ Error fetching categories:', error);
        // ✅ اگر API خطا داد، از دسته‌بندی‌های پیش‌فرض استفاده کن
        setCategories(['All', 'Smartphones', 'Tablets', 'Laptops', 'Wearables', 'Accessories']);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ فیلترهای پیش‌فرض + دسته‌بندی‌های دریافتی
  const defaultFilters = [
    { id: "All", label: t("filters.all") || (isRTL ? "همه" : "All") },
    { id: "Apple", label: "Apple" },
    { id: "Samsung", label: "Samsung" },
  ];

  // ✅ اضافه کردن دسته‌بندی‌های دریافتی
  const categoryFilters = categories.map(cat => ({
    id: cat,
    label: cat
  }));

  // ✅ ترکیب فیلترها
  const allFilters = [...defaultFilters, ...categoryFilters];

  // ✅ حذف موارد تکراری
  const uniqueFilters = allFilters.filter(
    (filter, index, self) => self.findIndex(f => f.id === filter.id) === index
  );

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap justify-center gap-3 my-8 px-4 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div
        className="
          flex flex-wrap gap-2 p-2 rounded-full
          backdrop-blur-md
          border
          bg-white/60 border-neutral-200
          dark:bg-neutral-900/60 dark:border-neutral-700
          shadow-sm transition-all
        "
      >
        {uniqueFilters.map((filter) => {
          const isActive = activeFilter === filter.id;

          return (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-4 md:px-6 py-1.5 md:py-2 rounded-full font-semibold text-xs md:text-sm
                transition-all duration-300 whitespace-nowrap
                ${
                  isActive
                    ? "bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-[#D4AF37] hover:bg-amber-500/10"
                }
              `}
            >
              {filter.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
