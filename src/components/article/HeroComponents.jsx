import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Typed from 'typed.js';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

function HighlightTyping({ lang }) {
  const el = useRef(null);
  const texts = lang === "fa" 
    ? ["تک‌کرانچ", "تحلیل عمیق", "تخصصی‌ترین مرجع"] 
    : ["TechCrunch", "Deep Analysis", "Expert Reviews"];
    
  useEffect(() => {
    if (!el.current) return;
    const typed = new Typed(el.current, { 
      strings: texts, 
      typeSpeed: 70, 
      backSpeed: 40,
      backDelay: 2500,
      loop: true 
    });
    return () => typed.destroy();
  }, [lang]);
  
  return <span ref={el} className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent font-black" />;
}

export function HeroSlider({ images, lang }) {
  return (
    <div className="relative w-full h-full">
      <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" autoplay={{ delay: 5000 }} pagination={{ clickable: true }} loop speed={1000} className="w-full h-full">
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} alt={`hero ${idx + 1}`} className="w-full h-full object-cover" style={{ filter: "brightness(0.85) contrast(1.05)" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-24 md:top-32 left-0 right-0 text-center z-20">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl"
        >
          <HighlightTyping lang={lang} />
        </motion.div>
      </div>
    </div>
  );
}

export function AnimatedWave() {
  return (
    <div className="w-full h-16 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20 mt-8 rounded-t-full" />
  );
}
