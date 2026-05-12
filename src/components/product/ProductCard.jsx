import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product, onQuickView, onClick }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === "fa";

  const name = product?.name?.[lang] ?? product?.title ?? "";
  const thumb = product?.thumbnail ?? product?.image ?? "";
  const priceNumber = typeof product?.price === "number" ? product.price : null;
  const priceText =
    product?.priceText ??
    (priceNumber !== null ? `$${priceNumber.toLocaleString()}` : product?.price ?? "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onClick={() => onClick?.(product)}
      className={[
        "group relative cursor-pointer rounded-3xl p-5 overflow-hidden",
        "bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl",
        "border border-neutral-200 dark:border-[#D4AF37]/30",
        "transition-all duration-500",
        "shadow-sm hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]",
        isRTL ? "font-iranyekan text-right" : "text-center",
      ].join(" ")}
    >
      {/* cinematic light sweep */}
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <span
          className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[120%]
          transition-transform duration-[1200ms] ease-out
          bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)]"
        />
      </span>

      {/* IMAGE (Quick View) */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onQuickView?.(product);
        }}
        className="h-36 mb-4 flex items-center justify-center
        bg-neutral-100 dark:bg-neutral-800
        rounded-2xl cursor-pointer overflow-hidden"
      >
        <motion.img
          src={thumb}
          alt={name}
          whileHover={{ scale: 1.12, y: -4, rotate: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-28 object-contain"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="space-y-1">
        <AnimatePresence mode="wait">
          <motion.h3
            key={lang}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-lg font-extrabold text-neutral-900 dark:text-[#D4AF37]"
          >
            {name}
          </motion.h3>
        </AnimatePresence>

        <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
          {product?.brand ?? ""}
        </p>

        <div className="pt-2 flex flex-col items-center gap-2">
          <span className="text-xl font-extrabold text-neutral-900 dark:text-[#D4AF37]">
            {priceText}
          </span>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              // اگر می‌خوای Buy هم QuickView باز کنه:
              onQuickView?.(product);
            }}
            className="w-full py-2.5 rounded-xl
            bg-black dark:bg-[#D4AF37]
            text-white dark:text-black
            font-bold text-sm
            transition
            group-hover:scale-[1.01]
            hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]"
          >
            {t("product.buy_now")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
