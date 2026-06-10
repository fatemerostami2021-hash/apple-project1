import { useNavigate } from "react-router-dom";
import { useTranslation }react-i18next";
import { motion } from "framer-motion";
import { HiOutlineHome } from "react-icons/hi";

export default function NotFound() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white dark:bg-neutral-950 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center"
      >
        <p className="text-8xl md:text-9xl font-black text-neutral-200 dark:text-neutral-800">404</p>
        <div className="relative">
          <p className="text-5xl md:text-6xl mt-4">🔍</p>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 text-2xl"
          >
            ❓
          </motion.div>
        </div>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white text-center"
      >
        {isRTL ? "صفحه‌ای که به دنبال آن بودید پیدا نشد!" : "Oops! Page not found!"}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-neutral-500 dark:text-neutral-400 text-center max-w-md"
      >
        {isRTL 
          ? "متاسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است." 
          : "Sorry, the page you are looking for doesn't exist or has been moved."}
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-[#D4AF37] text-black rounded-full font-bold flex items-center gap-2 hover:bg-amber-500 transition shadow-lg hover:shadow-xl"
      >
        <HiOutlineHome size={18} />
        {isRTL ? "بازگشت به خانه" : "Back to Home"}
      </motion.button>
    </div>
  );
}
