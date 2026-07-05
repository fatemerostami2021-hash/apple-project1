import React, { useCallback, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HiOutlineShoppingCart, HiOutlineEye, HiOutlineHeart, HiHeart, HiOutlineCheck, HiOutlineBookOpen } from "react-icons/hi";
import { useCart } from "../../hooks/useCart";

const PH = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f5f5f5'/%3E%3C/svg%3E";

const ProductCard = memo(({ product, onQuickView, onWishlist, variant = "default", className = "" }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { add } = useCart();
  const lang = i18n.language;
  const isRTL = lang === "fa";

  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const name = typeof product?.name === "object" ? (product.name[lang] || product.name.en || "") : (product?.name || "");
  const thumb = product?.thumbnail || product?.image || PH;
  const price = typeof product?.price === "number" ? `${product.price.toLocaleString()} ${isRTL ? 'تومان' : 'Toman'}` : (product?.price || "");
  const id = product?._id || product?.id;
  const hasArticle = product?.article || product?.articleSlug;

  const inStock = product?.inStock !== false;

  // ✅ رفتن به صفحه محصول یا مقاله
  const handleNavigate = useCallback(() => {
    if (hasArticle) {
      navigate(`/articles/${hasArticle}`);
    } else {
      navigate(`/product/${id}`);
    }
  }, [navigate, id, hasArticle]);

  // ✅ اضافه به سبد خرید
  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    if (!inStock) return;
    add(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }, [add, product, inStock]);

  // ✅ لایک
  const handleLike = useCallback((e) => {
    e.stopPropagation();
    setIsLiked(prev => !prev);
    onWishlist?.(product, !isLiked);
  }, [isLiked, onWishlist, product]);

  // ✅ مشاهده مقاله
  const handleArticleClick = useCallback((e) => {
    e.stopPropagation();
    if (hasArticle) navigate(`/articles/${hasArticle}`);
  }, [navigate, hasArticle]);

  const getVariantClasses = () => {
    switch (variant) {
      case "compact": return "p-3 rounded-xl";
      case "featured": return "p-6 rounded-3xl border-2 border-[#D4AF37]/30 dark:border-[#D4AF37]/20";
      case "horizontal": return "p-4 rounded-2xl flex flex-row gap-4 items-center";
      default: return "p-4 rounded-2xl sm:p-5 sm:rounded-3xl";
    }
  };

  const isHorizontal = variant === "horizontal";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, scale: 1.005 }} // ✅ کاهش انیمیشن برای جلوگیری از لرزش
      transition={{ duration: 0.3, ease: "easeOut" }} // ✅ کاهش duration
      onClick={handleNavigate}
      className={`
        group relative cursor-pointer overflow-hidden
        bg-white/90 dark:bg-neutral-900/90
        backdrop-blur-xl
        border border-neutral-200/80 dark:border-neutral-800/80
        shadow-sm hover:shadow-2xl dark:hover:shadow-[#D4AF37]/10
        transition-all duration-300
        ${getVariantClasses()}
        ${!inStock ? 'opacity-75' : ''}
        ${isHorizontal ? 'flex flex-row items-center gap-4' : 'flex flex-col'}
        ${className}
        ${isRTL ? "text-right" : "text-left"}
      `}
    >
      {/* ===== نشان‌ها ===== */}
      <div className="absolute top-2 left-2 right-2 flex justify-between z-10 pointer-events-none">
        <div className="flex flex-col gap-1.5">
          {product?.discount && (
            <span className="bg-red-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              {product.discount}% OFF
            </span>
          )}
          {product?.featured && (
            <span className="bg-[#D4AF37] text-black text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              {isRTL ? "ویژه" : "Featured"}
            </span>
          )}
          {hasArticle && (
            <span className="bg-gradient-to-r from-black via-neutral-900 to-black text-[#f6e27a] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-[#D4AF37]/50 flex items-center gap-1">
              <HiOutlineBookOpen className="text-[10px] sm:text-xs" />
              {isRTL ? "مقاله" : "Article"}
            </span>
          )}
        </div>
        {!inStock && (
          <span className="bg-gray-800/90 text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-lg backdrop-blur-sm">
            {isRTL ? "ناموجود" : "Out of Stock"}
          </span>
        )}
      </div>

      {/* ===== دکمه‌های اکشن (فقط لایک) ===== */}
      <div className="absolute top-2 right-2 sm:right-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="pointer-events-auto w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
          aria-label="like"
        >
          {isLiked ? (
            <HiHeart className="text-red-500 text-sm sm:text-base" />
          ) : (
            <HiOutlineHeart className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base" />
          )}
        </motion.button>
      </div>

      {/* ===== تصویر ===== */}
      <div className={`
        relative flex items-center justify-center overflow-hidden
        bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900
        ${isHorizontal ? 'w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-xl' : 'w-full aspect-square rounded-xl sm:rounded-2xl mb-3 sm:mb-4'}
      `}>
        <motion.img
          src={imgError ? PH : thumb}
          alt={name}
          whileHover={{ scale: 1.05, rotate: -1 }} // ✅ کاهش انیمیشن
          transition={{ duration: 0.4 }}
          className="w-full h-full object-contain p-2 sm:p-3"
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          draggable={false}
        />
      </div>

      {/* ===== محتوا ===== */}
      <div className={`flex-1 min-w-0 ${isHorizontal ? 'space-y-0.5' : 'space-y-0.5 sm:space-y-1'}`}>
        <p className="text-[8px] sm:text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest truncate">
          {product?.brand || ' '}
        </p>

        <h3 className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white line-clamp-2 leading-tight group-hover:text-[#D4AF37] dark:group-hover:text-[#D4AF37] transition-colors">
          {name}
        </h3>

        {product?.rating && (
          <div className="flex items-center gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-[8px] sm:text-[10px] ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
                ★
              </span>
            ))}
            <span className="text-[8px] sm:text-[10px] text-neutral-400 dark:text-neutral-500 mr-1">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 pt-0.5 sm:pt-1">
          <p className="text-sm sm:text-base font-black text-[#D4AF37] dark:text-[#D4AF37]">
            {price}
          </p>
          {product?.oldPrice && (
            <p className="text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-500 line-through">
              {product.oldPrice.toLocaleString()}
            </p>
          )}
        </div>

        <div className={`pt-1.5 sm:pt-2 flex gap-1.5 sm:gap-2 ${isHorizontal ? 'flex-wrap' : ''}`}>
          {/* ===== دکمه‌ی خرید ===== */}
          <motion.button
            whileHover={inStock ? { scale: 1.02 } : {}}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`
              flex-1 py-1.5 sm:py-2.5 rounded-xl font-bold text-[10px] sm:text-xs
              flex items-center justify-center gap-1
              border transition-all duration-300
              ${isAdded
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/30'
                : inStock
                  ? 'bg-gradient-to-br from-black to-neutral-900 text-[#f6e27a] border-[#D4AF37]/40 shadow-md hover:border-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/25 hover:from-neutral-900 hover:to-black'
                  : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 border-transparent cursor-not-allowed'
              }
            `}
          >
            {isAdded ? (
              <><HiOutlineCheck size={12} /> {isRTL ? "افزوده شد" : "Added"}</>
            ) : (
              <><HiOutlineShoppingCart size={12} /> {isRTL ? "سبد" : "Add"}</>
            )}
          </motion.button>
        </div>

        {/* ===== دکمه‌ی مقاله مرتبط ===== */}
        {hasArticle && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleArticleClick}
            className="mt-1.5 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold text-black bg-gradient-to-r from-[#D4AF37] via-[#f6e27a] to-[#D4AF37] shadow-md hover:shadow-lg hover:brightness-105 transition-all"
          >
            <HiOutlineBookOpen size={12} />
            {isRTL ? "مشاهده مقاله" : "Read Article"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;