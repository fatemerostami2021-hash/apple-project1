// src/components/StarryBackground.jsx
import React, { useEffect, useRef } from "react";

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let shootingStars = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      // تعداد ستاره‌ها بر اساس سایصفحه
      const starCount = Math.floor((canvas.width * canvas.height) / 4000);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
          blinkSpeed: 0.3 + Math.random() * 1.5,
          blinkPhase: Math.random() * Math.PI * 2,
          goldIntensity: 0.5 + Math.random() * 0.5,
        });
      }
      
      // اضافه کردن ستاره‌های بزرگتر (درخشان‌تر)
      for (let i = 0; i < starCount / 5; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 1.5,
          alpha: Math.random() * 0.8 + 0.3,
          blinkSpeed: 0.2 + Math.random() * 1,
          blinkPhase: Math.random() * Math.PI * 2,
          goldIntensity: 0.7 + Math.random() * 0.3,
          isBig: true,
        });
      }
    };

    // ایجاد ستاره دنباله‌دار
    const createShootingStar = () => {
      if (Math.random() < 0.02) { // 2% شانس در هر فریم
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.3, // از یک‌سوم بالای صفحه
          length: 80 + Math.random() * 60,
          speed: 8 + Math.random() * 6,
          angle: Math.PI / 3 + (Math.random() - 0.5) * Math.PI / 6,
          alpha: 0.8,
          life: 1,
        });
      }
    };

    // رسم ستاره دنباله‌دار
    const drawShootingStars = () => {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        const endX = s.x - Math.cos(s.angle) * s.length;
        const endY = s.y - Math.sin(s.angle) * s.length;
        ctx.lineTo(endX, endY);
        
        const gradient = ctx.createLinearGradient(s.x, s.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${s.alpha})`);
        gradient.addColorStop(1, `rgba(255, 215, 0, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // حرکت ستاره دنباله‌دار
        s.x -= Math.cos(s.angle) * s.speed;
        s.y -= Math.sin(s.angle) * s.speed;
        s.life -= 0.02;
        
        if (s.life <= 0 || s.x < 0 || s.x > canvas.width || s.y < 0 || s.y > canvas.height) {
          shootingStars.splice(i, 1);
        }
      }
    };

    const drawStars = () => {
      if (!ctx) return;
      
      // پس‌زمینه مشکی به سبک اپل
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.3, '#0a0a0a');
      gradient.addColorStop(0.7, '#050505');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // اضافه کردن افکت نویز بسیار ملایم (اختیاری)
      if (Math.random() < 0.05) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.01)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // رسم ستاره‌ها با رنگ طلایی
      stars.forEach(star => {
        const time = Date.now() / 1000;
        const blink = Math.sin(time * star.blinkSpeed + star.blinkPhase);
        const alpha = star.alpha * (0.4 + blink * 0.6);
        
        // رنگ طلایی برای ستاره‌ها
        const goldBase = [255, 215, 0]; // RGB طلایی
        const goldWhite = [255, 255, 200];
        
        const r = goldBase[0] * star.goldIntensity + goldWhite[0] * (1 - star.goldIntensity);
        const g = goldBase[1] * star.goldIntensity + goldWhite[1] * (1 - star.goldIntensity);
        const b = goldBase[2] * star.goldIntensity + goldWhite[2] * (1 - star.goldIntensity);
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
        
        // هاله طلایی اطراف ستاره‌های بزرگ
        if (star.radius > 1.5 || star.isBig) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * (2 + Math.sin(time * star.blinkSpeed) * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${alpha * 0.15})`;
          ctx.fill();
        }
        
        // افکت کراس (چهارپر) برای ستاره‌های بزرگ
        if (star.isBig && blink > 0.5) {
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI / 2) + time * star.blinkSpeed;
            const x2 = star.x + Math.cos(angle) * star.radius * 2.5;
            const y2 = star.y + Math.sin(angle) * star.radius * 2.5;
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(x2, y2);
          }
          ctx.strokeStyle = `rgba(255, 215, 0, ${alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
      
      // رسم ستاره‌های دنباله‌دار
      drawShootingStars();
      
      // ایجاد ستاره‌های دنباله‌دار جدید
      createShootingStar();
      
      animationId = requestAnimationFrame(drawStars);
    };

    resizeCanvas();
    drawStars();
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default StarryBackground;