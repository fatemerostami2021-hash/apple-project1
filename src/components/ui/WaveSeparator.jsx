import { motion } from "framer-motion";

const WaveSeparator = ({ flip = false }) => {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
      <motion.svg
        viewBox="0 0 1440 120"
        className="w-full h-[80px] md:h-[120px]"
        initial={{ y: 20 }}
        animate={{ y: [20, 0, 20] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,85.3C672,64,768,32,864,26.7C960,21,1056,43,1152,58.7C1248,75,1344,85,1392,90.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          className="fill-gray-100 dark:fill-zinc-900"
        />
      </motion.svg>
    </div>
  );
};

export default WaveSeparator;
