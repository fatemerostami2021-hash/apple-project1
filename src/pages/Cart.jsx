import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTrashAlt, FaPlus, FaMinus, FaShoppingBag, 
  FaArrowLeft, FaArrowRight, FaCreditCard, FaTruck, FaShieldAlt 
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === "fa";
  const { items, remove, update, clear, total, count } = useCart();

  const getLang = (v) => {
    if (!v) return "";
    return typeof v === "object" ? (v[i18n.language] || v.en || "") : v;
  };

  const subtotal = total;
  const shipping = subtotal > 1000 ? 0 : 29;
  const tax = subtotal * 0.09;
  const grandTotal = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white dark:bg-neutral-950">
        <FaShoppingBag size={64} className="text-neutral-300 dark:text-neutral-700" />
        <p className="text-xl font-semibold text-neutral-500 dark:text-neutral-400">
          {isRtl ? "سبد خرید شما خالی است" : "Your cart is empty"}
        </p>
        <button onClick={() => navigate("/")} className="px-6 py-3 bg-[#D4AF37] text-black rounded-full font-bold text-sm hover:opacity-90 transition">
          {isRtl ? "ادامه خرید" : "Continue Shopping"}
        </button>
      </div>
    );
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">
              {isRtl ? "سبد خرید" : "Shopping Cart"}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {count} {isRtl ? "محصول" : "items"} • ${subtotal.toFixed(0)}
            </p>
          </div>
          <button onClick={clear} className="text-sm text-red-500 hover:text-red-600 transition flex items-center gap-1">
            <FaTrashAlt size={14} /> {isRtl ? "پاک کردن همه" : "Clear all"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center gap-4 bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 hover:border-[#D4AF37]/50 transition"
                >
                  <img
                    src={item.thumb || '/images/placeholder.png'}
                    alt={getLang(item.name)}
                    className="w-20 h-20 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex-shrink-0 object-cover"
                    onError={(e) => { e.target.src = '/images/placeholder.png'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-neutral-900 dark:text-white line-clamp-1">
                      {getLang(item.name)}
                    </p>
                    <p className="text-[#D4AF37] font-bold">${item.price?.toLocaleString()}</p>
                    <p className="text-xs text-neutral-400">{item.brand || ''}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
                      <button onClick={() => update(item.id, (item.qty || 1) - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">−</button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty || 1}</span>
                      <button onClick={() => update(item.id, (item.qty || 1) + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">+</button>
                    </div>
                    <button onClick={() => remove(item.id)} className="text-neutral-400 hover:text-red-500 transition p-2">
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 sticky top-24">
              <h2 className="font-bold text-neutral-900 dark:text-white mb-4">{isRtl ? "خلاصه سفارش" : "Order Summary"}</h2>
              
              <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                <div className="flex justify-between">
                  <span>{isRtl ? "جمع کل:" : "Subtotal:"}</span>
                  <span className="font-bold text-neutral-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isRtl ? "ارسال:" : "Shipping:"}</span>
                  <span className={shipping === 0 ? "text-green-500" : "text-neutral-600"}>
                    {shipping === 0 ? (isRtl ? "رایگان" : "Free") : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{isRtl ? "مالیات (۹٪):" : "Tax (9%):"}</span>
                  <span className="font-bold text-neutral-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 mb-6">
                <div className="flex justify-between font-black text-lg">
                  <span className="text-neutral-900 dark:text-white">{isRtl ? "مجموع:" : "Total:"}</span>
                  <span className="text-[#D4AF37]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate("/checkout")} 
                className="w-full py-3.5 bg-neutral-900 dark:bg-[#D4AF37] text-white dark:text-black rounded-2xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <FaCreditCard size={16} />
                {isRtl ? "ادامه پرداخت" : "Proceed to Checkout"}
              </button>

              <button 
                onClick={() => navigate("/")} 
                className="w-full py-3 mt-3 text-sm text-neutral-500 hover:text-[#D4AF37] transition flex items-center justify-center gap-1"
              >
                {isRtl ? <FaArrowRight size={12} /> : <FaArrowLeft size={12} />}
                {isRtl ? "ادامه خرید" : "Continue Shopping"}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
                <FaShieldAlt size={12} />
                <span>{isRtl ? "پرداخت امن تضمین شده" : "Secure checkout guaranteed"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
