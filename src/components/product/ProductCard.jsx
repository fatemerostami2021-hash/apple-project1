import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HiOutlineShoppingCart, HiOutlineEye } from "react-icons/hi";
import { useCart } from "../../hooks/useCart";

const PH = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f5f5f5'/%3E%3C/svg%3E";

const ProductCard = React.memo(({ product, onQuickView }) => {
  const { i18n, t } = useTranslation();
  const navigate     = useNavigate();
  const { add }      = useCart();
  const lang  = i18n.language;
  const isRTL = lang === "fa";

  const name  = typeof product?.name === "object" ? (product.name[lang] || product.name.en || "") : (product?.name || "");
  const thumb = product?.thumbnail || product?.image || PH;
  const price = typeof product?.price === "number" ? `$${product.price.toLocaleString()}` : (product?.price || "");
  const id    = product?._id || product?.id;

  const handleView = useCallback((e) => { e.stopPropagation(); if (onQuickView) onQuickView(product); else if (id) navigate(`/product/${id}`); }, [product, onQuickView, navigate, id]);
  const handleNav  = useCallback(() => { if (id) navigate(`/product/${id}`); }, [navigate, id]);
  const handleCart = useCallback((e) => { e.stopPropagation(); add(product); }, [add, product]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={handleNav}
      className={`group relative cursor-pointer rounded-3xl p-5 overflow-hidden bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200 dark:border-[#D4AF37]/20 shadow-sm hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)] transition-all duration-500 ${isRTL ? "text-right" : "text-center"}`}>

      <div className="h-36 mb-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl overflow-hidden">
        <motion.img src={thumb} alt={name} whileHover={{ scale: 1.1, y: -3 }} transition={{ duration: 0.4 }}
          className="h-28 w-full object-contain" loading="lazy" decoding="async"
          onError={(e) => { e.target.src = PH; }} draggable={false} />
      </div>

      <div className="space-y-1">
        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{product?.brand}</p>
        <h3 className="text-sm font-extrabold text-neutral-900 dark:text-[#D4AF37] line-clamp-2 leading-tight">{name}</h3>
        <p className="text-base font-black text-neutral-900 dark:text-[#D4AF37] pt-1">{price}</p>
        <div className="pt-2 flex gap-2">
          <motion.button whileTap={{ scale: 0.96 }} onClick={handleCart}
            className="flex-1 py-2 rounded-xl bg-neutral-900 dark:bg-[#D4AF37] text-white dark:text-black font-bold text-xs flex items-center justify-center gap-1 hover:opacity-90 transition">
            <HiOutlineShoppingCart size={13} />
            {isRTL ? "سبد" : "Add"}
          </motion.button>
          <motion.button whileTap={{ scale: 0.96 }} onClick={handleView}
            className="w-9 h-9 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:border-[#D4AF37] transition" aria-label="view">
            <HiOutlineEye size={14} className="text-neutral-500 dark:text-neutral-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
