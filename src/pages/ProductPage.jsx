import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingCart, HiOutlineHeart, HiHeart, HiOutlineShare, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useCart } from "../hooks/useCart";
import { getProductById, getProducts } from "../api/index";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' fill='%23ccc' text-anchor='middle' dominant-baseline='middle' font-size='13' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";

function SafeImg({ src, alt, className, priority = false }) {
  const [s, setS] = useState(src || PLACEHOLDER);
  useEffect(() => setS(src || PLACEHOLDER), [src]);
  return (
    <img src={s} alt={alt} loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : "low"} decoding="async"
      onError={() => setS(PLACEHOLDER)} className={className} />
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { add }  = useCart();
  const lang   = i18n.language === "fa" ? "fa" : "en";
  const isRTL  = lang === "fa";

  const [product,  setProduct]  = useState(null);
  const [related,  setRelated]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [liked,    setLiked]    = useState(false);
  const [qty,      setQty]      = useState(1);
  const [added,    setAdded]    = useState(false);
  const [imgIdx,   setImgIdx]   = useState(0);

  const gl = useCallback((v) => {
    if (!v) return "";
    return typeof v === "object" ? (v[lang] || v.en || Object.values(v)[0] || "") : String(v);
  }, [lang]);

  useEffect(() => {
    if (!id) return;
    let dead = false;
    setLoading(true);
    getProductById(id)
      .then(r => { if (!dead) { setProduct(r.data); setImgIdx(0); } })
      .catch(() => {})
      .finally(() => { if (!dead) setLoading(false); });
    return () => { dead = true; };
  }, [id]);

  useEffect(() => {
    if (!product?.brand) return;
    getProducts({ brand: product.brand, limit: 5 })
      .then(r => {
        const arr = r.data?.products || r.data || [];
        setRelated(arr.filter(p => String(p._id) !== id).slice(0, 4));
      })
      .catch(() => {});
  }, [product, id]);

  const handleAdd = () => {
    if (!product) return;
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const images = [product?.thumbnail, product?.image, ...(product?.gallery || [])].filter(Boolean);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
      <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-white dark:bg-neutral-950" dir={isRTL ? "rtl" : "ltr"}>
      <p className="text-5xl">📦</p>
      <p className="text-neutral-500 dark:text-neutral-400">{isRTL ? "محصول یافت نشد" : "Product not found"}</p>
      <button onClick={() => navigate("/")} className="px-5 py-2.5 bg-[#D4AF37] text-black rounded-full text-sm font-bold">
        {isRTL ? "بازگشت به خانه" : "Back to Home"}
      </button>
    </div>
  );

  const name  = gl(product.name);
  const desc  = gl(product.description) || `${name} — ${product.brand}`;
  const price = product.price ? `$${product.price.toLocaleString()}` : "";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">

      {/* breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-6 pb-2 flex items-center gap-2 text-sm text-neutral-400 flex-wrap">
        <Link to="/" className="hover:text-[#D4AF37] transition">{isRTL ? "خانه" : "Home"}</Link>
        <span>/</span>
        <button onClick={() => navigate(-1)} className="hover:text-[#D4AF37] transition">{product.brand}</button>
        <span>/</span>
        <span className="text-neutral-700 dark:text-neutral-200 line-clamp-1">{name}</span>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* ── تصویر ── */}
        <motion.div initial={{ opacity: 0, x: isRTL ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="sticky top-24">
          <div className="relative rounded-3xl bg-neutral-50 dark:bg-neutral-900 overflow-hidden aspect-square flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={imgIdx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }} className="w-full h-full flex items-center justify-center p-8">
                <SafeImg src={images[imgIdx]} alt={name} priority className="max-h-full max-w-full object-contain" />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 dark:bg-neutral-800/80 flex items-center justify-center shadow hover:bg-white dark:hover:bg-neutral-700 transition">
                  <HiOutlineChevronLeft size={18} />
                </button>
                <button onClick={() => setImgIdx(i => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 dark:bg-neutral-800/80 flex items-center justify-center shadow hover:bg-white dark:hover:bg-neutral-700 transition">
                  <HiOutlineChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-3 justify-center flex-wrap">
              {images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition ${imgIdx === i ? "border-[#D4AF37]" : "border-transparent hover:border-neutral-300"}`}>
                  <SafeImg src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── اطلاعات ── */}
        <motion.div initial={{ opacity: 0, x: isRTL ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">{product.brand}</span>
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-3 leading-tight">{name}</h1>

          <div className="flex items-center gap-2 mb-5">
            {product.inStock !== false ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                {isRTL ? "موجود در انبار" : "In Stock"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-3 py-1 rounded-full">
                {isRTL ? "ناموجود" : "Out of Stock"}
              </span>
            )}
            <span className="text-xs text-neutral-400">{product.category}</span>
          </div>

          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-7 text-sm md:text-base">{desc}</p>

          <div className="flex items-baseline gap-3 mb-7">
            <span className="text-4xl font-black text-neutral-900 dark:text-[#D4AF37]">{price}</span>
          </div>

          {/* qty */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-neutral-500">{isRTL ? "تعداد:" : "Qty:"}</span>
            <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">−</button>
              <span className="w-10 text-center font-semibold text-sm">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">+</button>
            </div>
          </div>

          {/* actions */}
          <div className="flex gap-3 flex-wrap">
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd} disabled={product.inStock === false}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                added ? "bg-green-500 text-white" : "bg-neutral-900 dark:bg-[#D4AF37] text-white dark:text-black hover:opacity-90"
              } disabled:opacity-40 disabled:cursor-not-allowed`}>
              <HiOutlineShoppingCart size={18} />
              {added ? (isRTL ? "اضافه شد ✓" : "Added ✓") : (isRTL ? "افزودن به سبد" : "Add to Cart")}
            </motion.button>

            <button onClick={() => setLiked(l => !l)}
              className="w-12 h-12 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              aria-label="like">
              {liked ? <HiHeart size={20} className="text-red-500" /> : <HiOutlineHeart size={20} className="text-neutral-500" />}
            </button>

            <button onClick={() => navigator.share?.({ title: name, url: window.location.href }).catch(() => {})}
              className="w-12 h-12 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              aria-label="share">
              <HiOutlineShare size={18} className="text-neutral-500" />
            </button>
          </div>

          {/* go to cart */}
          {added && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-center">
              <button onClick={() => navigate("/cart")} className="text-sm text-[#D4AF37] hover:underline">
                {isRTL ? "مشاهده سبد خرید ←" : "View Cart →"}
              </button>
            </motion.div>
          )}

          {/* tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-7">
              {product.tags.map(t => (
                <span key={t} className="text-xs border border-neutral-200 dark:border-neutral-700 text-neutral-500 px-3 py-1 rounded-full">#{t}</span>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16" dir={isRTL ? "rtl" : "ltr"}>
          <h2 className="text-xl font-black text-neutral-900 dark:text-white mb-6">
            {isRTL ? "محصولات مشابه" : "Related Products"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => (
              <motion.button key={p._id} whileHover={{ y: -4 }} onClick={() => navigate(`/product/${p._id}`)}
                className="rounded-2xl p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left hover:border-[#D4AF37]/50 transition-all">
                <div className="h-24 w-full rounded-xl overflow-hidden flex items-center justify-center mb-3 bg-white dark:bg-neutral-800">
                  <SafeImg src={p.thumbnail || p.image} alt={gl(p.name)} className="max-h-full max-w-full object-contain p-2" />
                </div>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-2">{gl(p.name)}</p>
                <p className="text-xs text-[#D4AF37] font-bold mt-1">${p.price?.toLocaleString()}</p>
              </motion.button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
