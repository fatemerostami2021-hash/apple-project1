import { motion } from "framer-motion";

const HeroBackground = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* هاله‌های نوری متحرک - فقط در حالت Dark Mode جذاب‌تر هستند */}
      {darkMode && (
        <>
          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 50, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"
          />
          <motion.div
            animate={{
              x: [0, -80, 80, 0],
              y: [0, 100, -100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"
          />
        </>
      )}
      
      {/* لایه بافت (Noise Texture) برای حس سینمایی */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default HeroBackground;
