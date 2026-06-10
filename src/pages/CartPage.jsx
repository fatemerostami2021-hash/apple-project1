import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTrash, HiOutlineShoppingBag, HiOutlineArrowLeft } from "react-icons/hi";
import OptimizedImage from "../components/ui/OptimizedImage";
import { SEOHead } from "../components/seo/SEOHead";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL    = i18n.language === "fa";
  const { items, remove, update, clear, total, count } = useCart();

  const getLang = (v) => typeof v === "object" ? (v[i18n.language] || v.en || "") : (v || "");

  if (items.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead title={isRTL ? "سبد خرید" : "Cart"} lang={i18n.language} />
      <HiOutlineShoppingBag size={64} className="text-neutral-300" />
      <p className="text-xl font-semibold text-neutral-500">{isRTL ? "سبد خرید شما خالی است" : "Your cart is empty"}</p>
      <button onClick={() => navigate("/")} className="px-6 py-3 bg-[#D4AF37] text-black rounded-full font-bold text-sm">
        {isRTL ? "ادامه خرید" : "Continue Shopping"}
      </button>
    </div>
  );

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <SEOHead title={isRTL ? "سبد خرید" : "Cart"} lang={i18n.language} />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
            {isRTL ? `سبد خرید (${count})` : `Cart (${count})`}
          </h1>
          <button onClick={clear} className="text-sm text-neutral-400 hover:text-red-500 transition flex items-center gap-1">
            <HiOutlineTrash size={16} /> {isRTL ? "پاک کردن همه" : "Clear all"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map(item => (
                <motion.div key={item.id} layout exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                  className="flex items-center gap-4 bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-100 dark:border-neutral-800">
                  <OptimizedImage src={item.thumb} alt={getLang(item.name)} className="w-20 h-20 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-neutral-900 dark:text-white line-clamp-1">{getLang(item.name)}</p>
                    <p className="text-[#D4AF37] font-bold mt-1">${item.price?.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
                    <button onClick={() => update(item.id, (item.qty || 1) - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">−</button>
                    <span className="w-8 text-center text-sm font-semibold">{item.qty || 1}</span>
                    <button onClick={() => update(item.id, (item.qty || 1) + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">+</button>
                  </div>
                  <button onClick={() => remove(item.id)} className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-red-500 transition">
                    <HiOutlineTrash size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800 sticky top-24">
              <h2 className="font-bold text-neutral-900 dark:text-white mb-4">{isRTL ? "خلاصه سفارش" : "Order Summary"}</h2>
              <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                <div className="flex justify-between"><span>{isRTL ? "جمع کل:" : "Subtotal:"}</span><span className="font-bold text-neutral-900 dark:text-white">${total.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>{isRTL ? "ارسال:" : "Shipping:"}</span><span className="text-green-500">{isRTL ? "رایگان" : "Free"}</span></div>
              </div>
              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4 mb-6">
                <div className="flex justify-between font-black text-lg"><span>{isRTL ? "مجموع:" : "Total:"}</span><span className="text-[#D4AF37]">${total.toLocaleString()}</span></div>
              </div>
              <button onClick={() => navigate("/checkout")} className="w-full py-3.5 bg-neutral-900 dark:bg-[#D4AF37] text-white dark:text-black rounded-2xl font-bold hover:opacity-90 transition">
                {isRTL ? "ادامه پرداخت" : "Proceed to Checkout"}
              </button>
              <button onClick={() => navigate("/")} className="w-full py-3 mt-3 text-sm text-neutral-500 hover:text-[#D4AF37] transition flex items-center justify-center gap-1">
                <HiOutlineArrowLeft size={14} /> {isRTL ? "ادامه خرید" : "Continue Shopping"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
