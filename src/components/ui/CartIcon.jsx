import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "../../hooks/useCart";

export default function CartIcon({ className = "" }) {
  const navigate = useNavigate();
  const { count } = useCart();

  return (
    <button 
      onClick={() => navigate("/cart")} 
      aria-label="Cart"
      className={`relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${className}`}
    >
      <HiOutlineShoppingCart size={22} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span 
            key="badge" 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            exit={{ scale: 0 }}
            className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#D4AF37] text-black text-[10px] font-black rounded-full flex items-center justify-center leading-none"
          >
            {count > 9 ? "9+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
