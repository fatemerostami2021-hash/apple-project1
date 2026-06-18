import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiOutlineShoppingCart, HiOutlineEye, HiOutlineCheck, HiOutlineArrowRight, HiOutlineNewspaper } from 'react-icons/hi';
import { useCart } from '../hooks/useCart';
import { articleMap } from '../components/product/articleMap';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SamsungProducts = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { add } = useCart();
  const isRTL = i18n.language === 'fa';
  const lang = i18n.language === 'fa' ? 'fa' : 'en';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products?brand=Samsung`);
      setProducts(res.data.products || res.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[lang] || data.en || data.fa || '';
  };

  const handleAddToCart = useCallback((product, e) => {
    e.stopPropagation();
    add(product, 1);
    const key = product._id || product.id;
    setAddedToCart(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [key]: false }));
    }, 2000);
  }, [add]);

  const handleViewProduct = useCallback((product) => {
    const slug = product.slug || product._id || product.id;
    const articleSlug = articleMap[slug] || slug;
    
    if (articleSlug && articleSlug !== slug) {
      navigate(`/articles/${articleSlug}`);
    } else {
      navigate(`/product/${slug}`);
    }
  }, [navigate]);

  const categories = ['All', 'Phone', 'Tablet', 'Laptop'];
  
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // ===== Skeleton Loader =====
  if (loading) {
    return (
      <div className="min-h-screen bg-transparent py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="w-12 h-12 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-500 dark:text-gray-400 mt-4">{isRTL ? 'در حال بارگذاری...' : 'Loading...'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/images/samsung-pic/samsung-logo.png" 
              alt="Samsung" 
              className="h-10 w-auto dark:brightness-90"
            />
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">
              {isRTL ? 'محصولات سامسونگ' : 'Samsung Products'}
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            {products.length} {isRTL ? 'محصول' : 'products'} • {isRTL ? 'بروزرسانی شده' : 'Updated'}
          </p>
          <div className="w-20 h-1 bg-amber-500 rounded-full mx-auto mt-3" />
        </motion.div>

        {/* ===== CATEGORY FILTER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 md:px-6 py-2 rounded-full transition-all duration-300 text-sm font-bold ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-black shadow-lg scale-105'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-500/20 hover:text-amber-500'
              }`}
            >
              {cat === 'All' ? (isRTL ? 'همه' : 'All') : cat}
            </button>
          ))}
        </motion.div>

        {/* ===== PRODUCTS GRID ===== */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📱</div>
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
              {isRTL ? 'محصولی در این دسته‌بندی یافت نشد' : 'No products found in this category'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {filteredProducts.map((product, index) => {
              const productId = product._id || product.id;
              const productSlug = product.slug || productId;
              const articleSlug = articleMap[productSlug] || productSlug;
              const hasArticle = articleSlug !== productSlug;
              const isAdded = addedToCart[productId];

              return (
                <motion.div
                  key={productId}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:border-amber-400/50 dark:hover:border-amber-500/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="flex items-center justify-center h-32 md:h-40 mb-3 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden">
                    <img
                      src={product.thumbnail || '/images/placeholder.png'}
                      alt={getLangText(product.name)}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
                    />
                  </div>

                  {/* Info */}
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        {product.brand}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[40px]">
                      {getLangText(product.name)}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[32px]">
                      {getLangText(product.description)}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-black text-amber-500 dark:text-amber-400">
                        {product.price?.toLocaleString()}
                        <span className="text-xs font-normal text-gray-400 mr-1">{isRTL ? 'تومان' : 'Toman'}</span>
                      </span>
                    </div>

                    {/* ===== Buttons ===== */}
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="flex-1 px-3 py-2 bg-amber-500 text-black rounded-xl hover:bg-amber-600 transition text-xs font-bold flex items-center justify-center gap-1 group"
                      >
                        <HiOutlineEye size={14} className="group-hover:scale-110 transition" />
                        {hasArticle ? (isRTL ? 'مقاله' : 'Article') : (isRTL ? 'مشاهده' : 'View')}
                      </button>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`flex-1 px-3 py-2 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1 ${
                          isAdded
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-900 dark:bg-amber-500 text-white dark:text-black hover:opacity-90'
                        }`}
                      >
                        {isAdded ? (
                          <><HiOutlineCheck size={14} /> {isRTL ? 'افزوده شد' : 'Added'}</>
                        ) : (
                          <><HiOutlineShoppingCart size={14} /> {isRTL ? 'خرید' : 'Buy'}</>
                        )}
                      </button>
                    </div>

                    {/* Article Badge */}
                    {hasArticle && (
                      <span className="inline-block mt-2 text-[8px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                        📄 {isRTL ? 'مقاله دارد' : 'Has Article'}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ===== Footer Stats ===== */}
        {filteredProducts.length > 0 && (
          <div className="mt-10 text-center text-xs text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-6">
            {isRTL ? 'نمایش' : 'Showing'} {filteredProducts.length} {isRTL ? 'از' : 'of'} {products.length} {isRTL ? 'محصول' : 'products'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SamsungProducts;
