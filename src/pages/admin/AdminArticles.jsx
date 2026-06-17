import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaNewspaper,
  FaFilter, FaSortAmountDown, FaSortAmountUp, FaCalendarAlt
} from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminArticles() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBrand, setFilterBrand] = useState('All');

  const getToken = () => localStorage.getItem('adminToken');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/articles`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm(isRTL ? 'آیا از حذف این مقاله مطمئن هستید؟' : 'Are you sure?')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/articles/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) fetchArticles();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getLang = (data) => {
    if (!data) return '';
    return typeof data === 'object' ? (data[i18n.language] || data.en || '') : data;
  };

  // فیلتر و مرتب‌سازی
  const filteredArticles = articles
    .filter(a => {
      const matchSearch = getLang(a.title).toLowerCase().includes(search.toLowerCase()) ||
        a.slug?.toLowerCase().includes(search.toLowerCase());
      const matchBrand = filterBrand === 'All' || a.brand === filterBrand;
      return matchSearch && matchBrand;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || b.publishDate) - new Date(a.createdAt || a.publishDate);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt || a.publishDate) - new Date(b.createdAt || b.publishDate);
      } else if (sortBy === 'title') {
        return getLang(a.title).localeCompare(getLang(b.title));
      }
      return 0;
    });

  const brands = ['All', 'Apple', 'Samsung'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">{isRTL ? 'در حال بارگذاری...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xl">
              <FaNewspaper />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
                {isRTL ? 'مدیریت مقالات' : 'Articles Management'}
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {articles.length} {isRTL ? 'مقاله' : 'articles'} • {isRTL ? 'آخرین بروزرسانی' : 'Last updated'}: {new Date().toLocaleDateString('fa-IR')}
              </p>
            </div>
          </div>
          <Link
            to="/admin/articles/new"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#D4AF37] text-black rounded-xl hover:bg-[#C5A027] transition flex items-center justify-center gap-2 text-sm font-bold shadow-lg hover:shadow-xl"
          >
            <FaPlus size={14} /> {isRTL ? 'مقاله جدید' : 'New Article'}
          </Link>
        </div>

        {/* ===== SEARCH & FILTERS ===== */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRTL ? 'جستجوی مقاله بر اساس عنوان یا اسلاگ...' : 'Search by title or slug...'}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 focus:border-[#D4AF37] focus:outline-none transition text-gray-900 dark:text-white placeholder-gray-400 text-sm"
            />
          </div>

          {/* Filter Brand */}
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="px-4 py-3 pr-10 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 focus:border-[#D4AF37] focus:outline-none text-gray-900 dark:text-white text-sm appearance-none"
              >
                {brands.map(b => (
                  <option key={b} value={b}>
                    {b === 'All' ? (isRTL ? 'همه برندها' : 'All Brands') : b}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 pr-10 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 focus:border-[#D4AF37] focus:outline-none text-gray-900 dark:text-white text-sm appearance-none"
              >
                <option value="newest">{isRTL ? 'جدیدترین' : 'Newest'}</option>
                <option value="oldest">{isRTL ? 'قدیمی‌ترین' : 'Oldest'}</option>
                <option value="title">{isRTL ? 'بر اساس عنوان' : 'By Title'}</option>
              </select>
              <FaSortAmountDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* ===== STATS BAR ===== */}
        <div className="flex flex-wrap gap-3 text-xs md:text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {articles.filter(a => a.active !== false).length} {isRTL ? 'فعال' : 'Active'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            {articles.filter(a => a.active === false).length} {isRTL ? 'غیرفعال' : 'Inactive'}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt size={12} className="text-[#D4AF37]" />
            {filteredArticles.length} {isRTL ? 'نمایش داده شده' : 'displayed'}
          </span>
        </div>

        {/* ===== ARTICLES LIST ===== */}
        <div className="grid grid-cols-1 gap-3">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-lg font-medium">{isRTL ? 'مقاله‌ای یافت نشد' : 'No articles found'}</p>
              <p className="text-sm mt-1">{isRTL ? 'سعی کنید جستجوی خود را تغییر دهید' : 'Try changing your search'}</p>
              <Link to="/admin/articles/new" className="text-[#D4AF37] hover:text-[#C5A027] mt-4 inline-block font-bold">
                {isRTL ? 'اولین مقاله را اضافه کنید →' : 'Add your first article →'}
              </Link>
            </div>
          ) : (
            filteredArticles.map((article, idx) => {
              const isActive = article.active !== false;
              return (
                <motion.div
                  key={article.slug || article._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-5 hover:border-[#D4AF37]/40 transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    {/* LEFT */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] md:text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-bold">
                          {article.brand || 'Apple'}
                        </span>
                        <span className="text-[10px] md:text-xs text-gray-400">
                          {article.category || 'Review'}
                        </span>
                        <span className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1">
                          <FaCalendarAlt size={10} />
                          {article.publishDate ? new Date(article.publishDate).toLocaleDateString('fa-IR') : ''}
                        </span>
                        <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium ${
                          isActive 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {isActive ? (isRTL ? 'فعال' : 'Active') : (isRTL ? 'غیرفعال' : 'Inactive')}
                        </span>
                        <span className="text-[10px] md:text-xs text-gray-400 flex items-center gap-1">
                          <HiOutlineSparkles size={10} className="text-[#D4AF37]" />
                          {article.views || 0} {isRTL ? 'بازدید' : 'views'}
                        </span>
                      </div>

                      <Link to={`/admin/articles/edit/${article.slug}`}>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white hover:text-[#D4AF37] transition line-clamp-2">
                          {getLang(article.title)}
                        </h3>
                      </Link>

                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                        {isRTL ? 'اسلاگ:' : 'Slug:'} <span className="font-mono">{article.slug}</span>
                      </p>

                      {article.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {article.tags.slice(0, 5).map(tag => (
                            <span key={tag} className="text-[8px] md:text-[9px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                          ))}
                          {article.tags.length > 5 && (
                            <span className="text-[8px] md:text-[9px] text-gray-400">+{article.tags.length - 5}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* RIGHT - ACTIONS */}
                    <div className="flex gap-1.5 flex-shrink-0 self-start">
                      <Link
                        to={`/blog/${article.slug}`}
                        target="_blank"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
                        title={isRTL ? 'مشاهده در سایت' : 'View on site'}
                      >
                        <FaEye size={15} />
                      </Link>
                      <Link
                        to={`/admin/articles/edit/${article.slug}`}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 transition"
                        title={isRTL ? 'ویرایش' : 'Edit'}
                      >
                        <FaEdit size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.slug)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition"
                        title={isRTL ? 'حذف' : 'Delete'}
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* ===== FOOTER STATS ===== */}
        {filteredArticles.length > 0 && (
          <div className="text-center text-xs text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-800">
            {isRTL ? 'نمایش' : 'Showing'} {filteredArticles.length} {isRTL ? 'از' : 'of'} {articles.length} {isRTL ? 'مقاله' : 'articles'}
          </div>
        )}
      </div>
    </div>
  );
}
