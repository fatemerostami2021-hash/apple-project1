import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineShoppingBag } from "react-icons/hi";
import { useCart } from "../hooks/useCart";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const { items, total, clear } = useCart();

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const gl = (v) => typeof v === "object" ? (v[i18n.language] || v.en || "") : (v || "");

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError(isRTL ? "نام و ایمیل الزامی است" : "Name and email are required");
      return;
    }
    if (items.length === 0) {
      setError(isRTL ? "سبد خرید خالی است" : "Cart is empty");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.id,
            name: i.name,
            thumbnail: i.thumb || '/images/placeholder.png',
            price: i.price,
            qty: i.qty || 1
          })),
          total,
          customer: form,
          lang: i18n.language,
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "خطا");
      }

      const data = await res.json();
      clear();
      setSuccess(data.orderId);
    } catch (err) {
      setError(err.message || (isRTL ? "خطا در ثبت سفارش" : "Order failed"));
    } finally {
      setLoading(false);
    }
  };

  // ===== صفحه موفقیت =====
  if (success) {
    return (
      <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white dark:bg-neutral-950 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white mb-2">
            {isRTL ? "سفارش ثبت شد!" : "Order Placed!"}
          </h1>
          <p className="text-neutral-500 text-sm mb-2">
            {isRTL ? "شماره سفارش:" : "Order ID:"}
            <span className="font-mono text-[#D4AF37] ml-2">{String(success).slice(-8).toUpperCase()}</span>
          </p>
          <p className="text-neutral-400 text-xs mb-6">
            {isRTL ? "با ایمیل پیگیری خواهید کرد" : "You will receive a confirmation email"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-[#D4AF37] text-black rounded-full font-bold hover:opacity-90 transition"
          >
            {isRTL ? "بازگشت به خانه" : "Back to Home"}
          </button>
        </motion.div>
      </div>
    );
  }

  const inp = "w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37] transition text-sm";
  const lbl = "block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1.5";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
          >
            <HiOutlineArrowLeft size={20} className={isRTL ? "rotate-180" : ""} />
          </button>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
            {isRTL ? "تکمیل سفارش" : "Checkout"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== فرم ===== */}
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className={lbl}>{isRTL ? "نام کامل *" : "Full Name *"}</label>
              <input
                className={inp}
                value={form.name}
                onChange={set("name")}
                placeholder={isRTL ? "نام و نام خانوادگی" : "Your full name"}
                required
                maxLength={80}
              />
            </div>
            <div>
              <label className={lbl}>{isRTL ? "ایمیل *" : "Email *"}</label>
              <input
                className={inp}
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="email@example.com"
                required
                maxLength={120}
              />
            </div>
            <div>
              <label className={lbl}>{isRTL ? "شماره تماس" : "Phone"}</label>
              <input
                className={inp}
                value={form.phone}
                onChange={set("phone")}
                placeholder={isRTL ? "مثال: ۰۹۱۲..." : "+98..."}
                maxLength={20}
              />
            </div>
            <div>
              <label className={lbl}>{isRTL ? "آدرس تحویل" : "Delivery Address"}</label>
              <textarea
                className={`${inp} resize-none`}
                rows={3}
                value={form.address}
                onChange={set("address")}
                placeholder={isRTL ? "شهر، خیابان، پلاک..." : "City, street, unit..."}
                maxLength={300}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/40 px-4 py-2 rounded-xl">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-neutral-900 dark:bg-[#D4AF37] text-white dark:text-black rounded-2xl font-black text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <HiOutlineShoppingBag size={16} />
                  {isRTL ? "ثبت سفارش" : "Place Order"}
                </>
              )}
            </button>
          </form>

          {/* ===== خلاصه سفارش ===== */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800 h-fit sticky top-24">
            <h2 className="font-bold text-neutral-900 dark:text-white mb-4 text-sm">
              {isRTL ? "خلاصه سبد" : "Order Summary"}
            </h2>
            <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
              {items.map(i => (
                <div key={i.id} className="flex justify-between items-center gap-3 text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400 line-clamp-1 flex-1">
                    {typeof i.name === "object" ? (i.name[i18n.language] || i.name.en) : i.name} ×{i.qty || 1}
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white flex-shrink-0">
                    ${(i.price * (i.qty || 1)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
              <div className="flex justify-between font-black text-lg">
                <span className="text-neutral-900 dark:text-white">{isRTL ? "مجموع" : "Total"}</span>
                <span className="text-[#D4AF37]">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
