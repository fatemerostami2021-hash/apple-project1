import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { HiOutlineEye, HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "../../hooks/useCart";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PH = "/images/placeholder.png";

const AppleProducts = () => {
  const { i18n } = useTranslation();
  const navigate  = useNavigate();
  const isRTL     = i18n.language === "fa";
  const { add }   = useCart();

  const [products, setProducts]   = useState([]);
  const [loading,  setLoading]    = useState(true);
  const [error,    setError]      = useState(null);
  const [addedMap, setAddedMap]   = useState({});

  useEffect(() => {
    let cancelled = false;
    const fetchAppleProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_URL}/api/products`, {
          params: { brand: "Apple" },
        });
        const data = res.data?.products || res.data || [];
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error fetching Apple products:", err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchAppleProducts();
    return () => { cancelled = true; };
  }, []);

  const getLangText = (data) => {
    if (!data) return "";
    if (typeof data === "string") return data;
    return data[i18n.language] || data.en || "";
  };

  const handleViewArticle = (product, e) => {
    e.stopPropagation();
    const articleSlug = product.article || product.articleSlug;
    if (articleSlug) {
      navigate(`/articles/${articleSlug}`);
    } else {
      navigate(`/product/${product.slug || product._id}`);
    }
  };

  const handleBuy = (product, e) => {
    e.stopPropagation();
    add(product, 1);
    const id = product._id || product.id;
    setAddedMap(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setAddedMap(prev => ({ ...prev, [id]: false })), 2000);
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
        <p className="text-red-500">{isRTL ? "خطا در بارگذاری محصولات" : "Error loading products"}</p>
        <button onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-[#D4AF37] text-black rounded-full text-sm font-bold">
          {isRTL ? "تلاش مجدد" : "Retry"}
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400">
          {isRTL ? "محصولات اپل یافت نشد" : "No Apple products found"}
        </p>
      </div>
    );
  }

  return (
    <section className="relative py-10 md:py-14 bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* ===== HERO SECTION ===== */}
      <div className="relative w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[420px] overflow-hidden mb-10 md:mb-14 rounded-2xl md:rounded-3xl">
        <img
          src="/images/apple-hero-product-home.png"
          alt="Apple Vision Pro"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
          <div className="px-6 sm:px-10 md:px-16 lg:px-20 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
            >
              Shop Apple Vision Pro
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-white/80 mt-2 md:mt-4 max-w-lg"
            >
              {isRTL
                ? "دنیای جدیدی از واقعیت افزوده را با Apple Vision Pro تجربه کنید."
                : "Experience a new world of augmented reality with Apple Vision Pro."}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => navigate("/products?brand=Apple")}
              className="mt-4 md:mt-6 px-6 md:px-8 py-2.5 md:py-3.5 bg-[#D4AF37] text-black rounded-full font-bold text-sm md:text-base hover:bg-[#C5A027] transition-all shadow-lg shadow-[#D4AF37]/30 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              {isRTL ? "مشاهده محصولات" : "Explore Products"}
            </motion.button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent" />
      </div>

      {/* ===== PRODUCTS GRID ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            {isRTL ? "ویترین محصولات اپل" : "Apple Products Showcase"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {products.length} {isRTL ? "محصول" : "products"}
          </p>
          <div className="w-20 h-1 bg-[#D4AF37] rounded-full mx-auto mt-3" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          {products.map((product, index) => {
            const id      = product._id || product.id;
            const isAdded = addedMap[id];
            const hasArticle = Boolean(product.article || product.articleSlug);

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .45, delay: index * .05 }} viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => navigate(`/product/${product.slug || id}`)}
                className="group relative cursor-pointer bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-center justify-center h-32 md:h-36 mb-3 bg-gray-50 dark:bg-neutral-800 rounded-xl overflow-hidden">
                  <img src={product.thumbnail || PH} alt={getLangText(product.name)}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={e => { e.target.src = PH; }} loading="lazy" />
                </div>

                <div className={isRTL ? "text-right" : "text-left"}>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {getLangText(product.name)}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {getLangText(product.description)}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#D4AF37]">
                      ${product.price?.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2">
                    {hasArticle && (
                      <button onClick={(e) => handleViewArticle(product, e)}
                        className="flex-1 px-3 py-1.5 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C5A027] transition text-xs font-bold flex items-center justify-center gap-1">
                        <HiOutlineEye size={14} />
                        {isRTL ? "مشاهده مقاله" : "Article"}
                      </button>
                    )}
                    <button onClick={(e) => handleBuy(product, e)}
                      className={`flex-1 px-3 py-1.5 rounded-lg transition text-xs font-bold flex items-center justify-center gap-1 ${
                        isAdded ? "bg-green-500 text-white" : "bg-gray-900 dark:bg-[#D4AF37] text-white dark:text-black hover:opacity-90"
                      }`}>
                      {isAdded ? "✓" : <HiOutlineShoppingCart size={14} />}
                      {isAdded ? (isRTL ? "افزوده شد" : "Added") : (isRTL ? "خرید" : "Buy")}
                    </button>
                  </div>

                  <span className="inline-block mt-2 text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {product.brand}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppleProducts;
