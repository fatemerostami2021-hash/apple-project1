import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { 
  HiOutlineShoppingCart, HiOutlineEye, HiOutlineSearch, 
  HiOutlineX, HiOutlineSparkles, HiOutlineArrowRight,
  HiOutlineHeart
} from 'react-icons/hi';
import { useCart } from '../../hooks/useCart';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ============================================================
// دسته‌بندی‌های لوازم جانبی با آیکون
// ============================================================
const categories = [
  { id: 'all', label: { en: 'All Accessories', fa: 'همه لوازم جانبی' }, icon: '🔌' },
  { id: 'chargers', label: { en: 'Chargers', fa: 'شارژرها' }, icon: '⚡' },
  { id: 'cables', label: { en: 'Cables', fa: 'کابل‌ها' }, icon: '🔗' },
  { id: 'cases', label: { en: 'Cases & Covers', fa: 'قاب و کاور' }, icon: '📱' },
  { id: 'wireless', label: { en: 'Wireless Chargers', fa: 'شارژر بی‌سیم' }, icon: '📡' },
  { id: 'car', label: { en: 'Car Accessories', fa: 'لوازم خودرو' }, icon: '🚗' },
  { id: 'camera', label: { en: 'Camera Accessories', fa: 'لوازم دوربین' }, icon: '📷' },
  { id: 'package', label: { en: 'Packages', fa: 'بسته‌ها' }, icon: '📦' },
];

// ============================================================
// کامپوننت: AccessoriesHero
// ============================================================
const AccessoriesHero = ({ isRTL }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-amber-500/20 via-blue-500/10 to-purple-500/5 dark:from-amber-500/10 dark:via-blue-500/5 dark:to-purple-500/5 border border-gray-200 dark:border-gray-800 shadow-2xl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-400/20"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 relative z-10">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center md:justify-start gap-3 mb-3"
          >
            <span className="text-4xl animate-bounce">🔌</span>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] bg-amber-500/20 px-3 py-1 rounded-full">
              Accessories
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white"
          >
            {isRTL ? 'لوازم جانبی' : 'Accessories'}
            <span className="block text-amber-500 text-2xl md:text-3xl mt-2">
              {isRTL ? '✨ کیفیت را تجربه کنید' : '✨ Experience Quality'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-300 mt-4 max-w-lg text-lg"
          >
            {isRTL 
              ? 'همه چیز برای محافظت، شارژ و اتصال دستگاه‌های شما در یک جایگاه حرفه‌ای'
              : 'Everything to protect, charge and connect your devices in one professional place'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3 mt-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-sm font-bold border border-amber-500/20">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {isRTL ? '۱۲ محصول' : '12 Products'}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {isRTL ? '۸ دسته‌بندی' : '8 Categories'}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex-shrink-0 flex gap-3 md:gap-4 text-6xl md:text-7xl"
        >
          <span className="hover:scale-110 transition-transform duration-300 cursor-default">📱</span>
          <span className="hover:scale-110 transition-transform duration-300 cursor-default delay-100">🔋</span>
          <span className="hover:scale-110 transition-transform duration-300 cursor-default delay-200">🎧</span>
          <span className="hover:scale-110 transition-transform duration-300 cursor-default delay-300">⌚</span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </motion.div>
  );
};

// ============================================================
// کامپوننت: ProductCard
// ============================================================
const ProductCard = ({ product, isRTL, onView, onAddToCart, isAdded, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[isRTL ? 'fa' : 'en'] || data.en || '';
  };

  const hasArticle = Boolean(product.articleSlug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-amber-400/60 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10"
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-purple-500/0 transition-all duration-700 ${isHovered ? 'from-amber-500/10 via-amber-500/5 to-purple-500/10' : ''}`} />

      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <motion.div
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center h-40 md:h-48 p-4"
        >
          <img
            src={product.thumbnail || '/images/placeholder.png'}
            alt={getLangText(product.name)}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
            onError={(e) => e.target.src = '/images/placeholder.png'}
          />
        </motion.div>

        {hasArticle && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 text-[8px] font-bold text-amber-500 bg-amber-500/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-amber-500/30">
              📄 {isRTL ? 'مقاله' : 'Article'}
            </span>
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <HiOutlineHeart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
        </button>

        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => onView(product)}
            className="px-6 py-2.5 bg-white/90 dark:bg-black/80 text-black dark:text-white rounded-xl text-sm font-bold backdrop-blur-sm hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          >
            <HiOutlineEye size={16} />
            {isRTL ? 'مشاهده سریع' : 'Quick View'}
          </button>
        </div>
      </div>

      <div className="p-4 relative z-10">
        <div className={isRTL ? "text-right" : "text-left"}>
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {product.brand || 'Accessory'}
          </span>
          
          <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[40px] mt-1 group-hover:text-amber-500 transition-colors">
            {getLangText(product.name)}
          </h3>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-black text-amber-500 dark:text-amber-400">
              {product.price?.toLocaleString()}
              <span className="text-[10px] font-normal text-gray-400 mr-1">
                {isRTL ? 'تومان' : 'Toman'}
              </span>
            </span>
            {product.discount > 0 && (
              <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">
                {product.discount}% {isRTL ? 'تخفیف' : 'OFF'}
              </span>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onView(product)}
              className="flex-1 px-3 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-xs font-bold flex items-center justify-center gap-1.5 group/btn shadow-md hover:shadow-lg"
            >
              <HiOutlineEye size={14} className="group-hover/btn:scale-110 transition-transform" />
              {isRTL ? 'مشاهده' : 'View'}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => onAddToCart(product, e)}
              className={`flex-1 px-3 py-2.5 rounded-xl transition-all duration-300 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg ${
                isAdded
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'bg-gradient-to-r from-gray-800 to-gray-900 dark:from-amber-500 dark:to-amber-600 text-white dark:text-black hover:from-gray-700 hover:to-gray-800 dark:hover:from-amber-600 dark:hover:to-amber-700'
              }`}
            >
              {isAdded ? (
                <span>✓ {isRTL ? 'افزوده شد' : 'Added'}</span>
              ) : (
                <>
                  <HiOutlineShoppingCart size={14} />
                  {isRTL ? 'خرید' : 'Buy'}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// کامپوننت اصلی: AccessoriesPage
// ============================================================
const AccessoriesPage = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { add } = useCart();
  const isRTL = i18n.language === 'fa';
  const lang = i18n.language === 'fa' ? 'fa' : 'en';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedToCart, setAddedToCart] = useState({});
  const [viewMode, setViewMode] = useState('grid');

  // ✅ خواندن category از URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      // بررسی اینکه دسته‌بندی معتبر است
      const validCategory = categories.find(c => c.id === category);
      if (validCategory) {
        setActiveCategory(category);
      }
    }
  }, [location.search]);

  // دریافت محصولات
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`, {
          params: { category: 'Accessory' }
        });
        const data = res.data.products || res.data || [];
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching accessories:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // فیلتر محصولات
  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (activeCategory !== 'all') {
      result = result.filter(p => 
        p.subCategory?.toLowerCase() === activeCategory ||
        p.category?.toLowerCase() === activeCategory
      );
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name?.en?.toLowerCase().includes(term) ||
        p.name?.fa?.toLowerCase().includes(term) ||
        p.slug?.toLowerCase().includes(term)
      );
    }
    
    return result;
  }, [products, activeCategory, searchTerm]);

  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[lang] || data.en || '';
  };

  const handleViewProduct = (product) => {
    const slug = product.slug || product._id;
    if (product.articleSlug) {
      navigate(`/articles/${product.articleSlug}`);
    } else {
      navigate(`/product/${slug}`);
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    add(product, 1);
    const key = product._id || product.id;
    setAddedToCart(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setAddedToCart(prev => ({ ...prev, [key]: false })), 2000);
  };

  const clearFilter = () => {
    setActiveCategory('all');
    setSearchTerm('');
    navigate('/accessories', { replace: true });
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      navigate('/accessories', { replace: true });
    } else {
      navigate(`/accessories?category=${categoryId}`, { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-transparent py-6 md:py-10">
      <Helmet>
        <title>Accessories | Apple World</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <AccessoriesHero isRTL={isRTL} />

        {/* ===== Stats Bar ===== */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {isRTL ? 'کل محصولات:' : 'Total:'}
              <span className="font-bold text-amber-500 ml-1">{products.length}</span>
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {isRTL ? 'نمایش:' : 'Showing:'}
              <span className="font-bold text-amber-500 ml-1">{filteredProducts.length}</span>
            </span>
            {activeCategory !== 'all' && (
              <span className="text-gray-500 dark:text-gray-400">
                {isRTL ? 'دسته:' : 'Category:'}
                <span className="font-bold text-amber-500 ml-1">
                  {categories.find(c => c.id === activeCategory)?.label[lang]}
                </span>
              </span>
            )}
          </div>
          
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-black'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {isRTL ? 'شبکه' : 'Grid'}
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'list'
                  ? 'bg-amber-500 text-black'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {isRTL ? 'لیست' : 'List'}
            </button>
          </div>
        </div>

        {/* ===== Search ===== */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative group">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isRTL ? 'جستجو در لوازم جانبی...' : 'Search accessories...'}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-800 focus:border-amber-500 focus:outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 shadow-lg hover:shadow-xl"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <HiOutlineX size={20} />
              </button>
            )}
          </div>
        </div>

        {/* ===== Category Tabs ===== */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilter}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-105'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-500/20 hover:text-amber-500'
            }`}
          >
            <HiOutlineSparkles size={16} />
            {isRTL ? 'همه' : 'All'}
          </motion.button>
          
          {categories.filter(c => c.id !== 'all').map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-105'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-500/20 hover:text-amber-500'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label[lang]}
            </motion.button>
          ))}
        </div>

        {/* ===== Products ===== */}
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                🔌
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                {isRTL ? 'لوازم جانبی یافت نشد' : 'No accessories found'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {isRTL ? 'سعی کنید فیلترهای خود را تغییر دهید' : 'Try changing your filters'}
              </p>
              {(activeCategory !== 'all' || searchTerm) && (
                <button
                  onClick={clearFilter}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black rounded-full font-bold hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
                >
                  <HiOutlineArrowRight className={isRTL ? 'rotate-180' : ''} />
                  {isRTL ? 'پاک کردن فیلترها' : 'Clear filters'}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-4 md:gap-5 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  isRTL={isRTL}
                  onView={handleViewProduct}
                  onAddToCart={handleAddToCart}
                  isAdded={addedToCart[product._id || product.id]}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 text-center text-xs text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-6"
          >
            {isRTL ? 'نمایش' : 'Showing'} <span className="font-bold text-amber-500">{filteredProducts.length}</span>
            {' '}{isRTL ? 'از' : 'of'} <span className="font-bold text-amber-500">{products.length}</span>
            {' '}{isRTL ? 'محصول' : 'products'}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default AccessoriesPage;
