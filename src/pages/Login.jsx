// src/pages/Login.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FaApple, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaArrowRight, FaArrowLeft, FaShieldAlt, FaServer, FaCloud, FaNetworkWired, FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

// رنگ‌های تم
const colors = {
  gold: "#D4AF37",
  goldHover: "#F3D27A",
  blue: "#38BDF8",
  silver: "#C0C7D1",
  darkBg: "#0B0B0F",
  cardBg: "rgba(26, 29, 36, 0.72)",
  silverBorder: "rgba(192, 199, 209, 0.22)",
  goldGlow: "rgba(212, 175, 55, 0.35)",
  blueGlow: "rgba(56, 189, 248, 0.30)",
};

// لینک‌های معتبر
const trustedLinks = [
  { name: "Limoowp", url: "https://limoowp.com/", icon: <FaServer size={12} />, color: "gold" },
  { name: "Samanehha", url: "https://www.samanehha.com/", icon: <FaCloud size={12} />, color: "blue" },
  { name: "Enamad", url: "https://enamad.ir/", icon: <FaShieldAlt size={12} />, color: "gold" },
  { name: "IranServer", url: "https://hub.iranserver.com/", icon: <FaServer size={12} />, color: "blue" },
  { name: "NIC", url: "https://new.nic.ir/", icon: <FaNetworkWired size={12} />, color: "gold" },
];

// ── Particle field (cinematic background) ──────────────────────
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let animationTime = 0;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 80;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.7 ? "gold" : "blue",
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime += 0.005;
      
      pts.forEach((p) => {
        p.x += p.vx + Math.sin(animationTime + p.y * 0.01) * 0.05;
        p.y += p.vy + Math.cos(animationTime + p.x * 0.01) * 0.05;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const particleColor = p.color === "gold" ? colors.gold : colors.blue;
        ctx.fillStyle = particleColor.replace("rgb", "rgba").replace(")", `, ${p.o})`);
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}

// ── Magnetic button wrapper ─────────────────────────────────────
function MagneticBtn({ children, className, onClick, type = "button", disabled }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  };
  const handleLeave = () => {
    animate(x, 0, { type: "spring", stiffness: 400, damping: 25 });
    animate(y, 0, { type: "spring", stiffness: 400, damping: 25 });
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// ── Cinematic Input ─────────────────────────────────────────────
function CinemaInput({ label, icon: Icon, type, value, onChange, placeholder, required, children }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const isActive = focused || filled || value?.length > 0;

  return (
    <div className="relative group">
      <label
        className={`absolute z-10 transition-all duration-300 pointer-events-none font-bold tracking-wide ${
          isActive
            ? "-top-2.5 left-3 text-[10px] text-[#D4AF37]"
            : "top-3.5 left-11 text-sm text-[#C0C7D1]"
        }`}
      >
        {label}
      </label>

      <div
        className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
          focused
            ? "border-[#D4AF37] shadow-[0_0_0_3px_rgba(212,175,55,0.15)]"
            : "border-[rgba(192,199,209,0.22)] hover:border-[#D4AF37]/50"
        } bg-[rgba(26,29,36,0.6)] backdrop-blur-sm`}
      >
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C0C7D1] z-10 group-hover:text-[#D4AF37] transition-colors">
          <Icon size={16} />
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => {
            onChange(e);
            setFilled(e.target.value.length > 0);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          placeholder={focused ? placeholder : ""}
          className="w-full pl-10 pr-12 pt-5 pb-2 bg-transparent text-[#F8FAFC] text-sm focus:outline-none placeholder:text-[#C0C7D1]/40"
        />
        {children && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10">{children}</span>
        )}
        <motion.span
          className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#D4AF37] to-[#38BDF8] rounded-full"
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// ── Main Login ──────────────────────────────────────────────────
export default function Login() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }, 1800);
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen flex items-center justify-center py-16 px-4 relative overflow-hidden" style={{ backgroundColor: colors.darkBg }}>
      <Helmet>
        <title>{isRtl ? "ورود | تک‌کرانچ" : "Sign In | TechCrunch"}</title>
      </Helmet>

      <ParticleField />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ backgroundColor: colors.goldGlow }} />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ backgroundColor: colors.blueGlow }} />

      <div className="relative max-w-md w-full z-10">

        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-8">
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(26,29,36,0.8)] backdrop-blur-xl border border-[rgba(212,175,55,0.3)] mb-4 shadow-lg" style={{ boxShadow: `0 0 20px ${colors.goldGlow}` }}>
            <FaApple className="text-[#D4AF37]" size={28} />
          </motion.div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37]/80">TechCrunch</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border overflow-hidden shadow-2xl"
          style={{ backgroundColor: colors.cardBg, borderColor: colors.silverBorder, backdropFilter: "blur(20px)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.03)] via-transparent to-[rgba(56,189,248,0.03)] pointer-events-none" />
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <div className="absolute top-0.5 left-1/3 right-1/3 h-[0.5px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent" />

          <div className="relative p-8 md:p-10">

            {/* Header */}
            <div className="mb-8">
              <motion.h2 initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="text-3xl font-black tracking-tight mb-1" style={{ color: "#F8FAFC" }}>
                {isRtl ? "خوش آمدید" : "Welcome back"}<span className="text-[#D4AF37]">.</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="text-sm" style={{ color: colors.silver }}>
                {isRtl ? "برای ادامه وارد حساب کاربری خود شوید" : "Sign in to continue to your account"}
              </motion.p>
            </div>

            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(212,175,55,0.15)", border: `1px solid ${colors.gold}`, boxShadow: `0 0 20px ${colors.goldGlow}` }}>
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </motion.div>
                <p className="font-black text-lg" style={{ color: "#F8FAFC" }}>{isRtl ? "ورود موفق!" : "Signed in!"}</p>
                <p className="text-sm mt-1" style={{ color: colors.silver }}>{isRtl ? "در حال انتقال..." : "Redirecting..."}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <CinemaInput label={isRtl ? "ایمیل" : "Email address"} icon={FaEnvelope} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                <CinemaInput label={isRtl ? "رمز عبور" : "Password"} icon={FaLock} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#C0C7D1] hover:text-[#D4AF37] transition-colors">{showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}</button>
                </CinemaInput>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div onClick={() => setRememberMe(!rememberMe)} className={`w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center cursor-pointer ${rememberMe ? "border-[#D4AF37]" : "border-[rgba(192,199,209,0.3)] group-hover:border-[#D4AF37]"}`} style={{ backgroundColor: rememberMe ? colors.gold : "transparent" }}>
                      {rememberMe && <svg className="w-2.5 h-2.5 text-[#0B0B0F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-xs" style={{ color: colors.silver }}>{isRtl ? "مرا به خاطر بسپار" : "Remember me"}</span>
                  </label>
                  <Link to="/forgot-password" className="text-xs font-semibold transition-colors hover:opacity-80" style={{ color: colors.blue }}>{isRtl ? "فراموشی رمز" : "Forgot password?"}</Link>
                </div>

                <MagneticBtn type="submit" disabled={isLoading} className="relative w-full py-3.5 rounded-xl font-black text-sm tracking-wide overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 mt-3" style={{ background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldHover})`, color: colors.darkBg, boxShadow: `0 4px 15px ${colors.goldGlow}` }}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg> : <>{isRtl ? "ورود به حساب" : "Sign in"}{isRtl ? <FaArrowLeft size={14} /> : <FaArrowRight size={14} />}</>}
                  </span>
                </MagneticBtn>

                <div className="relative my-6 flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ backgroundColor: colors.silverBorder }} />
                  <span className="text-[11px] uppercase tracking-widest" style={{ color: colors.silver }}>{isRtl ? "یا" : "or"}</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: colors.silverBorder }} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a href="mailto:rostamifatemeh.963@gmail.com" className="flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-bold transition-all duration-200" style={{ backgroundColor: "rgba(26, 29, 36, 0.5)", borderColor: colors.silverBorder, color: colors.silver }}>
                    <FaGoogle className="text-red-400" size={15} /> Google
                  </a>
                  <a href="https://github.com/rostamifatemeh963" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-bold transition-all duration-200" style={{ backgroundColor: "rgba(26, 29, 36, 0.5)", borderColor: colors.silverBorder, color: colors.silver }}>
                    <FaGithub size={15} /> GitHub
                  </a>
                </div>
              </form>
            )}

            {/* ✅ لینک به صفحه ثبت نام - کاربر را به Register هدایت می‌کند */}
            {!success && (
              <p className="text-center mt-7 text-sm" style={{ color: colors.silver }}>
                {isRtl ? "حساب کاربری ندارید؟" : "New here?"}{" "}
                <Link 
                  to="/register" 
                  className="font-black transition-colors hover:opacity-80 inline-flex items-center gap-1"
                  style={{ color: colors.gold }}
                >
                  {isRtl ? "ثبت نام رایگان" : "Create account"}
                  {isRtl ? <FaArrowLeft size={12} /> : <FaArrowRight size={12} />}
                </Link>
              </p>
            )}
          </div>
        </motion.div>

        {/* Trusted Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {trustedLinks.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105" style={{ backgroundColor: "rgba(26, 29, 36, 0.5)", border: `1px solid ${colors.silverBorder}`, color: colors.silver }}>
                <span style={{ color: link.color === "gold" ? colors.gold : colors.blue }}>{link.icon}</span>
                <span className="text-[10px] font-bold">{link.name}</span>
                <FaExternalLinkAlt size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.gold }} />
              </a>
            ))}
          </div>
          <p className="text-center mt-3 text-[9px]" style={{ color: "rgba(192, 199, 209, 0.4)" }}>
            {isRtl ? "مورد تایید مراجع رسمی" : "Verified by official authorities"}
          </p>
        </motion.div>

        {/* Bottom caption */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-center mt-5 text-[11px]" style={{ color: "rgba(192, 199, 209, 0.4)" }}>
          {isRtl ? "با ورود، شرایط و سیاست حریم خصوصی را می‌پذیرید" : "By signing in you agree to our Terms & Privacy Policy"}
        </motion.p>
      </div>
    </div>
  );
}