import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { useEffect, useState } from "react";

const texts = [
  "Think Different",
  "Innovation First",
  "Beyond Imagination",
  "Do What You Can't",
  "Future in Your Hands",
  "Create Tomorrow",
  "Premium Experience",
  "Designed for Visionaries",
  "Next Level Technology",
  "Power Your Vision",
];

const FloatingGoldText = () => {
  const [index, setIndex] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      const { innerWidth, innerHeight } = window;

      const mouseX = e.clientX - innerWidth / 2;
      const mouseY = e.clientY - innerHeight / 2;

      x.set(mouseX);
      y.set(mouseY);
    };

    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [x, y]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">

      <AnimatePresence mode="wait">
        <motion.h1
          key={texts[index]}
          style={{ rotateX, rotateY }}
          initial={{
            opacity: 0,
            filter: "blur(20px)",
            scale: 0.9,
            y: 40,
          }}
          animate={{
            opacity: 0.08,
            filter: "blur(0px)",
            scale: 1,
            y: [0, -20, 0],
          }}
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.1,
            y: -40,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
     className="
floating-gold-text
text-[36px]
sm:text-[60px]
md:text-[90px]
lg:text-[120px]
xl:text-[160px]
font-black
tracking-widest
whitespace-nowrap
select-none
"

        >
          {texts[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default FloatingGoldText;
