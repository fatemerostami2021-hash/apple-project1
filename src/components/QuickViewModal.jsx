import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

const QuickViewModal = ({ product, onClose }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === "fa";

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
     <motion.div
  initial={{ y: 50, opacity: 0, scale: 0.95 }}
  animate={{ y: 0, opacity: 1, scale: 1 }}
  exit={{ y: 50, opacity: 0, scale: 0.95 }}
  transition={{ type: "spring", damping: 25, stiffness: 300 }}
  onClick={(e) => e.stopPropagation()}
  className={`relative w-[80vw] max-w-[1200px] overflow-hidden rounded-[2.5rem]
  bg-white/90 dark:bg-neutral-900/90 shadow-2xl border border-white/20 dark:border-neutral-800
  ${isRTL ? "font-iranyekan text-right" : "text-left"}`}
>

          {/* close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white transition"
          >
            <IoClose size={24} />
          </button>

          <div className="grid md:grid-cols-2">
            
            {/* image */}
            <div className="bg-neutral-50 dark:bg-neutral-800/30 p-12 flex items-center justify-center">
              <motion.img
                layoutId={`prod-${product.id}`}
                src={product.thumbnail}
                alt={product.name?.[lang]}
                className="max-h-[350px] w-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">

                <div>
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold 
                  bg-blue-100 text-blue-600 dark:bg-[#D4AF37]/20 dark:text-[#D4AF37] rounded-full">
                    {product.brand}
                  </span>

                  <h2 className="text-3xl md:text-4xl font-black mt-3 text-neutral-900 dark:text-white">
                    {product.name?.[lang]}
                  </h2>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-neutral-900 dark:text-white">
                    ${product.price?.toLocaleString()}
                  </span>
                  <span className="text-sm text-neutral-400 line-through">
                    ${(product.price * 1.2).toFixed(0)}
                  </span>
                </div>

                {/* specs */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="space-y-1">
                    <p className="text-xs text-neutral-400 uppercase">RAM</p>
                    <p className="font-semibold text-neutral-700 dark:text-neutral-200">8GB</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-neutral-400 uppercase">Storage</p>
                    <p className="font-semibold text-neutral-700 dark:text-neutral-200">256GB</p>
                  </div>
                </div>

                {/* buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6">

                  <button
                    className="flex-1 bg-black dark:bg-[#D4AF37] text-white dark:text-black
                    font-bold py-4 rounded-2xl
                    hover:scale-[1.02] active:scale-95 transition-all
                    shadow-lg shadow-black/10 dark:shadow-[#D4AF37]/20"
                  >
                    {t("cart.add_to_cart")}
                  </button>

                  <button
                    className="px-8 py-4 rounded-2xl font-bold
                    border border-neutral-200 dark:border-neutral-700
                    hover:bg-neutral-50 dark:hover:bg-neutral-800
                    transition text-neutral-900 dark:text-white"
                  >
                    {t("common.details")}
                  </button>

                </div>

              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
