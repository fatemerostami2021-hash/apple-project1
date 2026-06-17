import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { HiOutlineEye, HiOutlineShoppingCart, HiOutlineNewspaper } from 'react-icons/hi';
import { useCart } from '../../hooks/useCart';
import { articleMap } from '../../components/product/articleMap';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AppleProducts = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "fa";
  const { add } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});

  // دریافت محصولات اپل از API
  useEffect(() => {
    const fetchAppleProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/products?brand=Apple`);
        setProducts(res.data.products || res.data || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching Apple products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppleProducts();
  }, []);

  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[i18n.language] || data.en || '';
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    add(product, 1);
    setAddedToCart(prev => ({ ...prev, [product._id || product.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product._id || product.id]: false }));
    }, 2000);
  };

  // دکمه مشاهده → به مقاله
  const handleViewArticle = (product, e) => {
    e.stopPropagation();
    const slug = product.slug || product._id;
    const articleSlug = articleMap[slug] || slug;
    navigate(`/articles/${articleSlug}`);
  };

  // دکمه خرید → به سبد خرید
  const handleBuy = (product, e) => {
    e.stopPropagation();
    handleAddToCart(product, e);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{isRTL ? 'خطا در بارگذاری محصولات' : 'Error loading products'}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-[#D4AF37] text-black rounded-full text-sm font-bold"
        >
          {isRTL ? 'تلاش مجدد' : 'Retry'}
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400">
          {isRTL ? 'محصولات اپل یافت نشد' : 'No Apple products found'}
        </p>
      </div>
    );
  }

  return (
    <section className="relative py-10 md:py-14 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            {isRTL ? "ویترین محصولات اپل" : "Apple Products Showcase"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {products.length} {isRTL ? "محصول" : "products"}
          </p>
          <div className="w-20 h-1 bg-[#D4AF37] rounded-full mx-auto mt-3" />
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          {products.map((product, index) => {
            const productId = product._id || product.id;
            const slug = product.slug || productId;
            const articleSlug = articleMap[slug] || slug;
            const isAdded = addedToCart[productId];

            return (
              <motion.div
                key={productId}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="flex items-center justify-center h-32 md:h-36 mb-3 bg-gray-50 dark:bg-neutral-800 rounded-xl overflow-hidden">
                  <img
                    src={product.thumbnail || '/images/placeholder.png'}
                    alt={getLangText(product.name)}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.png';
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className={isRTL ? "text-right" : "text-left"}>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {getLangText(product.name)}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {getLangText(product.description)}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#D4AF37]">
                      {product.price?.toLocaleString()} {isRTL ? 'تومان' : 'Toman'}
                    </span>
                  </div>

                  {/* ===== دکمه‌ها ===== */}
                  <div className="mt-3 flex gap-2">
                    {/* ✅ دکمه مشاهده → به مقاله */}
                    <button
                      onClick={(e) => handleViewArticle(product, e)}
                      className="flex-1 px-3 py-1.5 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C5A027] transition text-xs font-bold flex items-center justify-center gap-1"
                    >
                      <HiOutlineEye size={14} />
                      {isRTL ? 'مشاهده مقاله' : 'View Article'}
                    </button>

                    {/* ✅ دکمه خرید → به سبد خرید */}
                    <button
                      onClick={(e) => handleBuy(product, e)}
                      className={`flex-1 px-3 py-1.5 rounded-lg transition text-xs font-bold flex items-center justify-center gap-1 ${
                        isAdded 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-900 dark:bg-[#D4AF37] text-white dark:text-black hover:opacity-90'
                      }`}
                    >
                      {isAdded ? (
                        <span>{isRTL ? '✓' : '✓'}</span>
                      ) : (
                        <HiOutlineShoppingCart size={14} />
                      )}
                      {isAdded ? (isRTL ? 'افزوده شد' : 'Added') : (isRTL ? 'خرید' : 'Buy')}
                    </button>
                  </div>

                  {/* Brand Badge */}
                  <span className="inline-block mt-2 text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {product.brand}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default AppleProducts;
