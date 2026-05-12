import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.25 }}
      className="group bg-white dark:bg-zinc-900 rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden"
    >
      {/* image */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-zinc-800">

        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-72 object-contain p-8 transition duration-500 group-hover:scale-110"
        />

        {product.isNew && (
          <span className="absolute top-4 ltr:left-4 rtl:right-4 bg-black text-white text-xs px-3 py-1 rounded-full">
            NEW
          </span>
        )}

      </div>

      {/* content */}
      <div className="p-6 text-center">

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mt-2 uppercase tracking-wide">
          {product.brand}
        </p>

        {/* price */}
        <div className="mt-5 flex items-center justify-center gap-3">

          <span className="text-2xl font-bold text-black dark:text-white">
            ${product.price}
          </span>

          {product.oldPrice && (
            <span className="text-sm line-through text-gray-400">
              ${product.oldPrice}
            </span>
          )}

        </div>

        {/* button */}
        <button className="mt-6 w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-xl hover:opacity-90 transition">
          {t("add_to_cart")}
        </button>

      </div>
    </motion.div>
  );
};

export default ProductCard;
