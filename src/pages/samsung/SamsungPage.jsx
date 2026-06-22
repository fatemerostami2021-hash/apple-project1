import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { 
  HiOutlineShoppingCart, HiOutlineEye, HiOutlineArrowRight, 
  HiOutlineX, HiOutlineSearch, HiOutlineFilter
} from 'react-icons/hi';
import { useCart } from '../../hooks/useCart';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ============================================================
// داده‌های سری‌ها (بر اساس محصولات موجود در دیتابیس)
// ============================================================
const seriesData = [
  {
    id: 's-series',
    name: { en: 'Galaxy S Series', fa: 'سری گلکسی S' },
    description: { en: 'Premium flagship smartphones', fa: 'پرچمداران برتر سامسونگ' },
    image: '/assets/samsung-megamenu/galaxy-s-samsung.png',
    color: '#D4AF37',
    slug: 'galaxy-s',
    filter: (product) => 
      product.slug?.includes('galaxy-s') || 
      product.name?.en?.includes('Galaxy S')
  },
  {
    id: 'z-series',
    name: { en: 'Galaxy Z Series', fa: 'سری گلکسی Z' },
    description: { en: 'Foldable innovation', fa: 'نوآوری تاشو' },
    image: '/assets/samsung-megamenu/galaxy-zfold.png',
    color: '#6C5CE7',
    slug: 'galaxy-z',
    filter: (product) => 
      product.slug?.includes('galaxy-z') || 
      product.name?.en?.includes('Galaxy Z')
  },
  {
    id: 'a-series',
    name: { en: 'Galaxy A Series', fa: 'سری گلکسی A' },
    description: { en: 'Awesome for everyone', fa: 'عالی برای همه' },
    image: '/assets/samsung-megamenu/Galaxy-A37-5G.png',
    color: '#00B894',
    slug: 'galaxy-a',
    filter: (product) => 
      product.slug?.includes('galaxy-a') || 
      product.name?.en?.includes('Galaxy A')
  },
  {
    id: 'm-series',
    name: { en: 'Galaxy M Series', fa: 'سری گلکسی M' },
    description: { en: 'Monster performance', fa: 'عملکرد هیولایی' },
    image: '/assets/samsung-megamenu/galaxy-m34-5g.png',
    color: '#0984E3',
    slug: 'galaxy-m',
    filter: (product) => 
      product.slug?.includes('galaxy-m') || 
      product.name?.en?.includes('Galaxy M')
  },
  {
    id: 'note-series',
    name: { en: 'Galaxy Note Series', fa: 'سری گلکسی نوت' },
    description: { en: 'Productivity powerhouse', fa: 'نیروگاه بهره‌وری' },
    image: '/assets/samsung-megamenu/galaxy-note-samsung.png',
    color: '#6C5CE7',
    slug: 'galaxy-note',
    filter: (product) => 
      product.slug?.includes('galaxy-note') || 
      product.name?.en?.includes('Galaxy Note')
  },
  {
    id: 'tablets',
    name: { en: 'Galaxy Tablets', fa: 'تبلت‌های گلکسی' },
    description: { en: 'Tablets for every need', fa: 'تبلت برای هر نیازی' },
    image: '/assets/samsung-megamenu/galaxy-tab10.png',
    color: '#FDCB6E',
    slug: 'galaxy-tab',
    filter: (product) => 
      product.category === 'Tablet' || 
      product.slug?.includes('galaxy-tab')
  },
  {
    id: 'laptops',
    name: { en: 'Galaxy Laptops', fa: 'لپ‌تاپ‌های گلکسی' },
    description: { en: 'Powerful and portable', fa: 'قدرتمند و قابل حمل' },
    image: '/assets/samsung-megamenu/samsung-laptop.png',
    color: '#636E72',
    slug: 'galaxy-book',
    filter: (product) => 
      product.category === 'Laptop' || 
      product.slug?.includes('galaxy-book')
  }
];

// ============================================================
// کامپوننت: SamsungHero
// ============================================================
const SamsungHero = ({ isRTL }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-r from-amber-500/10 to-purple-500/10 dark:from-amber-500/5 dark:to-purple-500/5 border border-gray-200 dark:border-gray-800"
    >
      <div className="flex flex-col md:flex-row items-center p-6 md:p-10 gap-6">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <img 
              src="/images/samsung-pic/samsung-logo.png" 
              alt="Samsung" 
              className="h-8 w-auto dark:brightness-90"
            />
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Ecosystem</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">
            {isRTL ? 'اکوسیستم سامسونگ' : 'Samsung Ecosystem'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
            {isRTL 
              ? 'از گوشی تا تبلت و لپ‌تاپ، همه چیز در یک اکوسیستم هوشمند' 
              : 'From phones to tablets and laptops, everything in one intelligent ecosystem'}
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {isRTL ? '۱۷ محصول' : '17 Products'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              {isRTL ? '۱۰ مقاله' : '10 Articles'}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <img 
            src="/images/samsung-pic/samsung-products-main.png" 
            alt="Samsung Products" 
            className="h-32 md:h-40 w-auto object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// کامپوننت: ProductCard
// ============================================================
const ProductCard = ({ product, isRTL, onView, onAddToCart, isAdded }) => {
  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[isRTL ? 'fa' : 'en'] || data.en || '';
  };

  const hasArticle = Boolean(product.articleSlug);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-800 hover:border-amber-400/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="flex items-center justify-center h-32 md:h-40 mb-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden">
        <img
          src={product.thumbnail || '/images/placeholder.png'}
          alt={getLangText(product.name)}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
          onError={(e) => e.target.src = '/images/placeholder.png'}
        />
      </div>

      {/* Info */}
      <div className={isRTL ? "text-right" : "text-left"}>
        <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {product.brand}
        </span>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[40px] mt-1">
          {getLangText(product.name)}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-black text-amber-500 dark:text-amber-400">
            {product.price?.toLocaleString()}
            <span className="text-[10px] font-normal text-gray-400 mr-1">
              {isRTL ? 'تومان' : 'Toman'}
            </span>
          </span>
          {hasArticle && (
            <span className="text-[8px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              📄
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onView(product)}
            className="flex-1 px-3 py-2 bg-amber-500 text-black rounded-xl hover:bg-amber-600 transition text-xs font-bold flex items-center justify-center gap-1 group/btn"
          >
            <HiOutlineEye size={14} className="group-hover/btn:scale-110 transition" />
            {isRTL ? 'مشاهده' : 'View'}
          </button>

          <button
            onClick={(e) => onAddToCart(product, e)}
            className={`flex-1 px-3 py-2 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1 ${
              isAdded
                ? 'bg-green-500 text-white'
                : 'bg-gray-900 dark:bg-amber-500 text-white dark:text-black hover:opacity-90'
            }`}
          >
            {isAdded ? '✓' : <HiOutlineShoppingCart size={14} />}
            {isAdded ? (isRTL ? 'افزوده شد' : 'Added') : (isRTL ? 'خرید' : 'Buy')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// کامپوننت اصلی: SamsungPage
// ============================================================
const SamsungPage = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { add } = useCart();
  const isRTL = i18n.language === 'fa';
  const lang = i18n.language === 'fa' ? 'fa' : 'en';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSeries, setActiveSeries] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [addedToCart, setAddedToCart] = useState({});

  // دریافت سری از URL (مثلاً ?series=s-series)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const seriesId = params.get('series');
    if (seriesId) {
      const found = seriesData.find(s => s.id === seriesId);
      if (found) setActiveSeries(found);
    }
  }, [location.search]);

  // دریافت محصولات سامسونگ از API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`, {
          params: { brand: 'Samsung' }
        });
        const data = res.data.products || res.data || [];
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching Samsung products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // فیلتر محصولات بر اساس سری فعال و جستجو
  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (activeSeries) {
      result = result.filter(activeSeries.filter);
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
  }, [products, activeSeries, searchTerm]);

  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[lang] || data.en || '';
  };

  const handleViewProduct = (product) => {
    const slug = product.slug || product._id;
    // اگر مقاله مرتبط دارد، به مقاله برو
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

  const handleSelectSeries = (series) => {
    setActiveSeries(series);
    navigate(`?series=${series.id}`, { replace: true });
  };

  const clearFilter = () => {
    setActiveSeries(null);
    setSearchTerm('');
    navigate('?', { replace: true });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-transparent py-6 md:py-10">
      <Helmet>
        <title>Samsung | Apple World</title>
        <meta name="description" content="Explore Samsung Galaxy ecosystem - phones, tablets, laptops and more" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* ===== Hero ===== */}
        <SamsungHero isRTL={isRTL} />

        {/* ===== Search Bar ===== */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isRTL ? 'جستجو در محصولات...' : 'Search products...'}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 focus:border-amber-500 focus:outline-none transition text-gray-900 dark:text-white placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <HiOutlineX size={20} />
              </button>
            )}
          </div>
        </div>

        {/* ===== Series Tabs (مگامنو) ===== */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={clearFilter}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
              !activeSeries
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-500/20'
            }`}
          >
            {isRTL ? 'همه' : 'All'}
          </button>
          
          {seriesData.map((series) => (
            <button
              key={series.id}
              onClick={() => handleSelectSeries(series)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-2 ${
                activeSeries?.id === series.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-500/20'
              }`}
            >
              <img src={series.image} alt="" className="w-5 h-5 object-contain" />
              {series.name[lang]}
            </button>
          ))}
        </div>

        {/* ===== Products Grid ===== */}
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">📱</div>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                {isRTL ? 'محصولی یافت نشد' : 'No products found'}
              </p>
              {(activeSeries || searchTerm) && (
                <button
                  onClick={clearFilter}
                  className="mt-4 text-amber-500 hover:text-amber-600 font-bold"
                >
                  {isRTL ? 'پاک کردن فیلترها' : 'Clear filters'}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={activeSeries?.id || 'all'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5"
            >
              {filteredProducts.map((product, index) => {
                const key = product._id || product.id;
                const isAdded = addedToCart[key];

                return (
                  <ProductCard
                    key={key}
                    product={product}
                    isRTL={isRTL}
                    onView={handleViewProduct}
                    onAddToCart={handleAddToCart}
                    isAdded={isAdded}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== Footer Stats ===== */}
        {filteredProducts.length > 0 && (
          <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4">
            {isRTL ? 'نمایش' : 'Showing'} {filteredProducts.length} {isRTL ? 'از' : 'of'} {products.length} {isRTL ? 'محصول' : 'products'}
            {activeSeries && ` • ${activeSeries.name[lang]}`}
          </div>
        )}
      </div>
    </main>
  );
};

export default SamsungPage;
