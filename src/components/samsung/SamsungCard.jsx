import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../hooks/useCart';
import { HiOutlineShoppingCart, HiOutlineEye, HiOutlineNewspaper } from 'react-icons/hi';

const SamsungCard = ({ product }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { add } = useCart();
  const isRTL = i18n.language === 'fa';

  const getLang = (data) => {
    if (!data) return '';
    return typeof data === 'object' ? (data[i18n.language] || data.en || '') : data;
  };

  // نقشه slug محصول به slug مقاله
  const getArticleSlug = (productSlug) => {
    const articleMap = {
      'galaxy-s24': 'galaxy-s24-review',
      'galaxy-s24-plus': 'galaxy-s24-plus-review',
      'galaxy-s24-ultra': 'galaxy-s24-ultra-review',
      'galaxy-s25-ultra': 'galaxy-s25-ultra-review',
      'galaxy-s26': 'galaxy-s26-review',
      'galaxy-z-fold-6': 'galaxy-z-fold-6-review',
      'galaxy-z-flip-6': 'galaxy-z-flip-6-review',
      'galaxy-tab-s10-ultra': 'galaxy-tab-s10-ultra-review',
      'galaxy-book': 'galaxy-book-review',
      'galaxy-book-6': 'galaxy-book-6-review',
    };
    return articleMap[productSlug] || productSlug;
  };

  const articleSlug = getArticleSlug(product.slug);
  const productId = product._id || product.id;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    add(product, 1);
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.slug || productId}`);
  };

  const handleViewArticle = () => {
    navigate(`/articles/${articleSlug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/50"
    >
      {/* Image */}
      <Link to={`/product/${product.slug || productId}`} className="block">
        <div className="relative h-48 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-700 dark:to-gray-800">
          <img
            src={product.thumbnail || '/images/placeholder.png'}
            alt={getLang(product.name)}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.src = '/images/placeholder.png'; }}
          />
          {/* برند Badge */}
          <span className="absolute top-3 left-3 text-[10px] font-bold text-[#D4AF37] bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-[#D4AF37]/30">
            {product.brand}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* دسته‌بندی */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded-full">
            {product.category || 'Product'}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {product.inStock !== false ? '✅ موجود' : '❌ ناموجود'}
          </span>
        </div>

        {/* عنوان */}
        <Link to={`/product/${product.slug || productId}`}>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white hover:text-[#D4AF37] transition line-clamp-2">
            {getLang(product.name)}
          </h3>
        </Link>

        {/* قیمت */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-black text-[#D4AF37]">
            {product.price?.toLocaleString()} تومان
          </span>

          {/* دکمه‌ها - فقط ۲ دکمه اصلی */}
          <div className="flex gap-2">
            {/* دکمه مشاهده */}
            <button
              onClick={handleViewProduct}
              className="px-3 py-2 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C5A027] transition text-sm font-bold flex items-center gap-1"
              title={isRTL ? 'مشاهده محصول' : 'View Product'}
            >
              <HiOutlineEye size={14} />
            </button>

            {/* دکمه سبد خرید */}
            <button
              onClick={handleAddToCart}
              className="px-3 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition text-sm font-bold flex items-center gap-1"
              title={isRTL ? 'افزودن به سبد' : 'Add to Cart'}
            >
              <HiOutlineShoppingCart size={14} />
            </button>
          </div>
        </div>

        {/* دکمه مقاله (جداگانه و کوچک‌تر) */}
        {articleSlug && (
          <button
            onClick={handleViewArticle}
            className="mt-3 w-full py-1.5 text-xs font-medium text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg hover:bg-[#D4AF37]/10 transition flex items-center justify-center gap-1"
          >
            <HiOutlineNewspaper size={12} />
            {isRTL ? 'مشاهده مقاله' : 'Read Article'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SamsungCard;
