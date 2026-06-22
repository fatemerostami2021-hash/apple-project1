import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HiOutlineEye, HiOutlineShoppingCart, HiOutlineCheck, HiOutlineNewspaper } from 'react-icons/hi';
import { useCart } from '../../hooks/useCart';

const SamsungCard = ({ product }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { add } = useCart();
  const isRTL = i18n.language === 'fa';
  const lang = i18n.language === 'fa' ? 'fa' : 'en';
  const [isAdded, setIsAdded] = useState(false);

  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[lang] || data.en || '';
  };

  const productId = product._id || product.id;
  const productSlug = product.slug || productId;
  const articleSlug = product.articleSlug || product.article || null;
  const hasArticle = Boolean(articleSlug);

  // ✅ تابع مشاهده - اگر مقاله دارد به مقاله، وگرنه به محصول
  const handleView = () => {
    if (hasArticle && articleSlug) {
      navigate(`/articles/${articleSlug}`);
    } else {
      navigate(`/product/${productSlug}`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    add(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/50"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
        <img
          src={product.thumbnail || '/images/placeholder.png'}
          alt={getLangText(product.name)}
          loading="lazy"
          className="w-full h-48 md:h-56 object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          onError={(e) => e.target.src = '/images/placeholder.png'}
        />
        
        {/* Badge: Article */}
        {hasArticle && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 text-[8px] font-bold text-amber-500 bg-amber-500/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-amber-500/30">
              📄 {isRTL ? 'مقاله' : 'Article'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className={isRTL ? "text-right" : "text-left"}>
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {product.brand || 'Samsung'}
          </span>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[40px] mt-1 group-hover:text-[#D4AF37] transition-colors">
            {getLangText(product.name)}
          </h3>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-black text-[#D4AF37]">
              {product.price?.toLocaleString()}
              <span className="text-[10px] font-normal text-gray-400 mr-1">
                {isRTL ? 'تومان' : 'Toman'}
              </span>
            </span>
          </div>

          {/* ===== دکمه‌ها ===== */}
          <div className="mt-3 flex gap-2">
            {/* ✅ دکمه مشاهده - اگر مقاله دارد به مقاله، وگرنه به محصول */}
            <button
              onClick={handleView}
              className="flex-1 px-3 py-2 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C5A027] transition text-sm font-bold flex items-center justify-center gap-1 group"
              title={hasArticle ? (isRTL ? 'مشاهده مقاله' : 'View Article') : (isRTL ? 'مشاهده' : 'View')}
            >
              <HiOutlineEye size={14} className="group-hover:scale-110 transition" />
              {hasArticle ? (isRTL ? 'مقاله' : 'Article') : (isRTL ? 'مشاهده' : 'View')}
              {hasArticle && (
                <span className="text-[8px]">📄</span>
              )}
            </button>

            {/* ✅ دکمه خرید */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 px-3 py-2 rounded-lg transition text-sm font-bold flex items-center justify-center gap-1 ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : 'bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
              }`}
            >
              {isAdded ? (
                <><HiOutlineCheck size={14} /> {isRTL ? 'افزوده شد' : 'Added'}</>
              ) : (
                <><HiOutlineShoppingCart size={14} /> {isRTL ? 'خرید' : 'Buy'}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SamsungCard;
