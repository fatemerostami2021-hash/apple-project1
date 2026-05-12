import { motion } from "framer-motion";

const WaveCircleText = ({ darkMode }) => {
  const text = "PREMIUM QUALITY • APPLE INNOVATION • DESIGNED FOR FUTURE • ";

  const gradientId = darkMode ? "goldGradient" : "silverGradient";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-20 right-20 hidden lg:block pointer-events-none z-0"
    >
      <motion.div
        animate={{
          rotate: 360,
          y: [0, -20, 0],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 15, ease: "linear" },
          y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
        className="relative w-48 h-48"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            id="circlePath"
            d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            fill="none"
          />

          <text className="text-[12px] font-bold uppercase tracking-[2px]">
            <textPath href="#circlePath" fill={`url(#${gradientId})`}>
              {text}
            </textPath>
          </text>

          <defs>
            {/* Dark mode - gold */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BF953F" />
              <stop offset="25%" stopColor="#FCF6BA" />
              <stop offset="50%" stopColor="#B38728" />
              <stop offset="75%" stopColor="#FBF5B7" />
              <stop offset="100%" stopColor="#AA771C" />
            </linearGradient>

            {/* Light mode - silver */}
            <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B7280" />
              <stop offset="50%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#4B5563" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default WaveCircleText;
