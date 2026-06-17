import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FilterBar = ({ activeFilter, setActiveFilter }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // فیلترهای پیش‌فرض (در صورت خطای API)
  const defaultFilters = [
    { id: 'All', label: { en: 'All', fa: 'همه' } },
    { id: 'Apple', label: { en: 'Apple', fa: 'اپل' } },
    { id: 'Samsung', label: { en: 'Samsung', fa: 'سامسونگ' } },
    { id: 'Phone', label: { en: 'Phone', fa: 'گوشی' } },
    { id: 'Tablet', label: { en: 'Tablet', fa: 'تبلت' } },
    { id: 'Laptop', label: { en: 'Laptop', fa: 'لپ‌تاپ' } },
    { id: 'Watch', label: { en: 'Watch', fa: 'ساعت' } },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/categories`);
        if (res.data && res.data.length > 0) {
          setCategories(res.data);
        } else {
          setCategories(defaultFilters);
        }
      } catch (error) {
        console.error('❌ Error fetching categories:', error);
        // استفاده از فیلترهای پیش‌فرض
        setCategories(defaultFilters);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getLabel = (label) => {
    if (!label) return '';
    return typeof label === 'object' ? (label[i18n.language] || label.en || '') : label;
  };

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap justify-center gap-3 my-8 px-4 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="flex flex-wrap gap-2 p-2 rounded-full backdrop-blur-md border bg-white/60 border-neutral-200 dark:bg-neutral-900/60 dark:border-neutral-700 shadow-sm transition-all">
        {categories.map((filter) => {
          const isActive = activeFilter === filter.id;
          const label = getLabel(filter.label);

          return (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-5 py-2 rounded-full font-semibold text-sm
                transition-all duration-300 whitespace-nowrap
                ${isActive
                  ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.45)] scale-105"
                  : "text-neutral-600 dark:text-neutral-300 hover:text-[#D4AF37] hover:scale-105"
                }
              `}
            >
              {label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
