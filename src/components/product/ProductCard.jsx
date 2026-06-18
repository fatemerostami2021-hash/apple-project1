import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingBag, HiOutlineCheck, HiOutlineEye, HiOutlineNewspaper, HiOutlineArrowRight } from "react-icons/hi";
import { useCart } from "../../hooks/useCart";
import { articleMap } from "./articleMap";

const ProductCard = ({ product, onQuickView }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { add } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const isRTL = i18n.language === "fa";
  const lang = i18n.language === "fa" ? "fa" : "en";

  // دریافت متن بر اساس زبان
  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[lang] || data.en || data.fa || '';
  };

  // نام محصول
  const productName = getLangText(product.name);
  
  // شناسه محصول
  const productId = product._id || product.id;
  const productSlug = product.slug || productId;
  
  // بررسی وجود مقاله مرتبط
  const articleSlug = articleMap[productSlug] || productSlug;
  const hasArticle = articleSlug !== productSlug;

  // قیمت
  const price = product.price || 0;

  // دکمه افزودن به سبد خرید
  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    add(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }, [add, product]);

  // دکمه مشاهده → به مقاله یا محصول
  const handleView = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasArticle) {
      navigate(`/articles/${articleSlug}`);
    } else {
      navigate(`/product/${productSlug}`);
    }
  }, [hasArticle, articleSlug, productSlug, navigate]);

  // دکمه لایک
  const handleLike = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  }, [isLiked]);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-white/10 hover:border-amber-400/50 dark:hover:border-amber-500/50"
    >
      {/* ===== Image Section ===== */}
      <Link to={hasArticle ? `/articles/${articleSlug}` : `/product/${productSlug}`} className="block">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <img
            src={product.thumbnail || product.image || product.cover || '/images/placeholder.png'}
            alt={productName || 'Product'}
            className="w-full h-48 md:h-56 object-contain p-4 md:p-6 transition duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
          />

          {/* ===== Badges ===== */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                {isRTL ? "جدید" : "NEW"}
              </span>
            )}
            {product.discount && (
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                -{product.discount}% {isRTL ? "تخفیف" : "OFF"}
              </span>
            )}
            {hasArticle && (
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                <HiOutlineNewspaper size={10} />
                {isRTL ? "مقاله" : "Article"}
              </span>
            )}
          </div>

          {/* ===== Like Button ===== */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <HiOutlineHeart className={`w-4 h-4 ${isLiked ? "text-red-500 fill-red-500" : "text-gray-600 dark:text-gray-400"}`} />
          </button>

          {/* ===== Quick View Overlay ===== */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onQuickView) onQuickView(product);
              }}
              className="px-4 py-2 bg-white/90 dark:bg-black/80 text-black dark:text-white rounded-xl text-sm font-bold backdrop-blur-sm hover:scale-105 transition"
            >
              {isRTL ? "مشاهده سریع" : "Quick View"}
            </button>
          </div>
        </div>
      </Link>

      {/* ===== Content Section ===== */}
      <div className="p-4 text-center">
        {/* Brand */}
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {product.brand || 'Apple'}
        </p>

        {/* Title */}
        <Link to={hasArticle ? `/articles/${articleSlug}` : `/product/${productSlug}`}>
          <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mt-1 mb-1 line-clamp-1 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            {productName}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-lg md:text-xl font-bold text-amber-500 dark:text-amber-400">
            {price?.toLocaleString()}
            <span className="text-[10px] font-normal text-gray-400 mr-1">{isRTL ? 'تومان' : 'Toman'}</span>
          </span>
          {product.oldPrice && (
            <span className="text-xs line-through text-gray-400">
              {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* ===== Buttons ===== */}
        <div className="mt-3 flex gap-2">
          {/* ✅ دکمه مشاهده → مقاله یا محصول */}
          <button
            onClick={handleView}
            className="flex-1 px-3 py-2 bg-amber-500 text-black rounded-xl hover:bg-amber-600 transition text-xs font-bold flex items-center justify-center gap-1 group"
          >
            <HiOutlineEye size={14} className="group-hover:scale-110 transition" />
            {hasArticle ? (isRTL ? 'مقاله' : 'Article') : (isRTL ? 'مشاهده' : 'View')}
            {hasArticle && <HiOutlineArrowRight size={12} className="group-hover:translate-x-1 transition" />}
          </button>

          {/* ✅ دکمه خرید → سبد خرید */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 px-3 py-2 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1 ${
              isAdded
                ? 'bg-green-500 text-white'
                : 'bg-gray-900 dark:bg-amber-500 text-white dark:text-black hover:opacity-90'
            }`}
          >
            {isAdded ? (
              <><HiOutlineCheck size={14} /> {isRTL ? 'افزوده شد' : 'Added'}</>
            ) : (
              <><HiOutlineShoppingBag size={14} /> {isRTL ? 'خرید' : 'Buy'}</>
            )}
          </button>
        </div>

        {/* ===== Article Badge (در صورت وجود) ===== */}
        {hasArticle && (
          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="text-[8px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              📄 {isRTL ? 'مقاله مرتبط' : 'Related Article'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
