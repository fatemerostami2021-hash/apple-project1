// src/components/BrandBubbles.jsx - نسخه با لوپ نامحدود
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const brands = [
  "Apple", "Samsung", "Google", "Microsoft", "Amazon", "Meta", "Tesla",
  "Nike", "Adidas", "Coca-Cola", "Pepsi", "McDonald's", "Toyota", "BMW",
  "Mercedes-Benz", "Ferrari", "Porsche", "Sony", "LG", "Huawei", "Xiaomi",
  "Intel", "NVIDIA", "AMD", "Netflix", "Spotify", "Adobe", "Oracle", "IBM",
  "Cisco", "Louis Vuitton", "Gucci", "Chanel", "Rolex", "IKEA", "Zara",
  "H&M", "Starbucks", "Red Bull", "LEGO"
];

// کامپوننت حباب تکی با لوپ نامحدود
const Bubble = ({ text, index, startX, startY, duration, delay, windowHeight }) => {
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const loopCountRef = useRef(0);

  useEffect(() => {
    const endY = -80;
    const randomXEnd = (Math.random() - 0.5) * 250;
    const endX = startX + randomXEnd;
    
    const animate = () => {
      if (!isAnimating) return;
      
      const elapsed = Date.now() - startTimeRef.current;
      let progress = (elapsed % duration) / duration;
      
      // محاسبه موقعیت Y (حرکت از پایین به بالا)
      let newY = startY + (endY - startY) * progress;
      
      // محاسبه موقعیت X با حرکت سینوسی برای افکت موجی
      const waveX = Math.sin(progress * Math.PI * 2.5) * 60;
      let newX = startX + (endX - startX) * progress + waveX;
      
      // اگر به انتهای مسیر رسیدیم، ریست کنیم
      if (progress >= 0.99) {
        loopCountRef.current++;
        // ریست کردن زمان شروع برای لوپ جدید
        startTimeRef.current = Date.now();
        // موقعیت جدید X برای هر لوپ
        const newStartX = Math.random() * (window.innerWidth - 100) + 50;
        setPosition({ x: newStartX, y: windowHeight + 50 });
        startX = newStartX;
        // به روز رسانی ref
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      setPosition({ x: newX, y: newY });
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // تأخیر در شروع انیمیشن
    const timeoutId = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration, delay, startX, startY, windowHeight, isAnimating]);

  // افکت ناپدید شدن تدریجی در اوج
  const opacity = Math.min(0.6, position.y < 100 ? position.y / 200 + 0.2 : 0.6);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: opacity }}
      transition={{ delay: delay, duration: 0.3 }}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 75,
        height: 75,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <div className={`w-full h-full rounded-full bg-gradient-to-br from-blue-300/20 to-blue-500/10 
                      backdrop-blur-sm flex items-center justify-center border border-blue-300/30 
                      shadow-lg shadow-blue-500/10 transition-all duration-300
                      hover:scale-110 hover:border-blue-400/50`}>
        <span className="text-[10px] md:text-xs font-bold text-amber-500/80 dark:text-yellow-400/80 
                         text-center px-2 break-words leading-tight">
          {text}
        </span>
        {/* افکت درخشش ملایم */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-400/0 via-blue-300/10 to-blue-200/20 animate-pulse" />
      </div>
    </motion.div>
  );
};

// کامپوننت اصلی با لوپ نامحدود
const BrandBubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (windowSize.height === 0) return;
    
    // ایجاد حباب‌ها با موقعیت‌های متفاوت
    const newBubbles = brands.map((brand, index) => ({
      id: index,
      text: brand,
      startX: Math.random() * (windowSize.width - 100) + 50,
      startY: windowSize.height + 50 + Math.random() * 200,
      duration: 15000 + Math.random() * 15000, // 15 تا 30 ثانیه
      delay: Math.random() * 15, // تأخیر 0 تا 15 ثانیه
      windowHeight: windowSize.height,
    }));
    
    setBubbles(newBubbles);
  }, [windowSize]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          text={bubble.text}
          index={bubble.id}
          startX={bubble.startX}
          startY={bubble.startY}
          duration={bubble.duration}
          delay={bubble.delay}
          windowHeight={bubble.windowHeight}
        />
      ))}
    </div>
  );
};

export default BrandBubbles;