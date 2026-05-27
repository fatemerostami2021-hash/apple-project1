// src/components/product/ProductCard.jsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingBag, HiOutlineStar } from "react-icons/hi";
import { useState } from "react";

const ProductCard = ({ product, onQuickView }) => {
  const { t, i18n } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const isRTL = i18n.language === "fa";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-white/10 hover:border-yellow-500/50"
    >
      {/* Image Section */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <img
            src={product.thumbnail || product.image || product.cover}
            alt={product.name}
            className="w-full h-56 object-contain p-6 transition duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Badges */}
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
          </div>

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <HiOutlineHeart className={`w-4 h-4 ${isLiked ? "text-red-500 fill-red-500" : "text-gray-600 dark:text-gray-400"}`} />
          </button>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4 text-center">
        {/* Brand */}
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {product.brand}
        </p>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1 mb-1 line-clamp-1 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <HiOutlineStar
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">({product.reviews || 0})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price?.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-xs line-through text-gray-400">
              ${product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="mt-3 text-[11px] text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
          >
            {isRTL ? "مشاهده سریع" : "Quick View"}
          </button>
        )}

        {/* Add to Cart Button */}
        <button className="mt-3 w-full bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-200 text-white dark:text-black py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
          <HiOutlineShoppingBag className="w-4 h-4" />
          {t("add_to_cart") || (isRTL ? "افزودن به سبد خرید" : "Add to Cart")}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;