import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HiOutlineShoppingCart, HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineHeart, HiHeart, HiOutlineShare } from "react-icons/hi";
import OptimizedImage from "../components/ui/OptimizedImage";
import { SEOHead, ProductSchema } from "../components/seo/SEOHead";
import { getProductById, getProducts } from "../api/index";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang  = i18n.language === "fa" ? "fa" : "en";
  const isRTL = lang === "fa";

  const [product,  setProduct]  = useState(null);
  const [related,  setRelated]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [liked,    setLiked]    = useState(false);
  const [added,    setAdded]    = useState(false);
  const [quantity, setQuantity] = useState(1);

  const getLang = useCallback((v) => {
    if (!v) return "";
    return typeof v === "object" ? (v[lang] || v.en || "") : v;
  }, [lang]);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    getProductById(id)
      .then(res => { if (!cancelled) setProduct(res); })
      .catch(err => {
        console.error("Error fetching product:", err);
        setProduct(null);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!product?.brand) return;
    getProducts({ brand: product.brand, limit: 5 })
      .then(res => {
        const data = Array.isArray(res) ? res : (res?.products || []);
        setRelated(data.filter(p => (p._id || p.id) !== id).slice(0, 4));
      })
      .catch(() => {});
  }, [product, id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.qty = (existing.qty || 1) + quantity;
    } else {
      cart.push({ 
        id, 
        name: product?.name, 
        thumb: product?.thumbnail || product?.image, 
        price: product?.price, 
        qty: quantity 
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: getLang(product?.name), url: window.location.href }).catch(() => {});
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">📦</p>
        <p className="text-neutral-500">{isRTL ? "محصول یافت نشد" : "Product not found"}</p>
        <button onClick={() => navigate("/")} className="px-5 py-2 bg-[#D4AF37] text-black rounded-full text-sm font-semibold">
          {isRTL ? "بازگشت" : "Back"}
        </button>
      </div>
    );
  }

  const name  = getLang(product.name);
  const desc  = getLang(product.description) || `${name} — ${product.brand}`;
  const price = product.price ? `$${product.price.toLocaleString()}` : "";
  const thumb = product.thumbnail || product.image || "";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <SEOHead 
        title={name} 
        description={desc} 
        image={`${API_BASE}${thumb}`} 
        url={`/product/${id}`} 
        type="product" 
        lang={lang} 
      />
      <ProductSchema product={product} lang={lang} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8" aria-label="breadcrumb">
          <Link to="/" className="hover:text-[#D4AF37] transition">{isRTL ? "خانه" : "Home"}</Link>
          <span>/</span>
          <Link to="/" className="hover:text-[#D4AF37] transition">{product.brand}</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white line-clamp-1">{name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
            className="sticky top-24 rounded-3xl bg-neutral-50 dark:bg-neutral-900 p-8 flex items-center justify-center min-h-[400px]"
          >
            <OptimizedImage src={thumb} alt={name} priority className="max-h-[380px] w-full" />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">{product.brand}</span>
            <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mt-2 mb-4">{name}</h1>

            {/* Stock Status */}
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950 px-3 py-1 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> 
                {isRTL ? "موجود در انبار" : "In Stock"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950 px-3 py-1 rounded-full mb-6">
                {isRTL ? "ناموجود" : "Out of Stock"}
              </span>
            )}

            <p className="text-neutral-600 dark:text-gray-400 leading-relaxed mb-8">{desc}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-black text-neutral-900 dark:text-[#D4AF37]">{price}</span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-400 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-neutral-500">{isRTL ? "تعداد:" : "Qty:"}</span>
              <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <motion.button 
                whileTap={{ scale: 0.96 }} 
                onClick={addToCart} 
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition ${
                  added 
                    ? "bg-green-500 text-white" 
                    : "bg-neutral-900 dark:bg-[#D4AF37] text-white dark:text-black hover:opacity-90"
                } disabled:opacity-40`}
              >
                <HiOutlineShoppingCart size={18} />
                {added ? (isRTL ? "اضافه شد ✓" : "Added ✓") : (isRTL ? "افزودن به سبد" : "Add to Cart")}
              </motion.button>

              <button 
                onClick={() => setLiked(l => !l)} 
                className="w-12 h-12 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              >
                {liked ? <HiHeart size={20} className="text-red-500" /> : <HiOutlineHeart size={20} />}
              </button>

              <button 
                onClick={share} 
                className="w-12 h-12 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              >
                <HiOutlineShare size={20} />
              </button>
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {product.tags.map(tag => (
                  <span key={tag} className="text-xs border border-neutral-200 dark:border-neutral-700 text-neutral-500 px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-8">
              {isRTL ? "محصولات مشابه" : "Related Products"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => (
                <motion.button 
                  key={p._id || p.id} 
                  whileHover={{ y: -4 }} 
                  onClick={() => navigate(`/product/${p._id || p.id}`)}
                  className="rounded-2xl p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left hover:border-[#D4AF37]/50 transition-all"
                >
                  <OptimizedImage src={p.thumbnail || p.image} alt={getLang(p.name)} className="h-28 w-full rounded-xl mb-3" />
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white line-clamp-1">{getLang(p.name)}</p>
                  <p className="text-xs text-[#D4AF37] font-bold mt-1">${p.price?.toLocaleString()}</p>
                </motion.button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
