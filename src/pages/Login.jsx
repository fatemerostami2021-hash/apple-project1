import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FaApple, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaArrowRight, FaArrowLeft, FaShieldAlt, FaServer, FaCloud, FaNetworkWired, FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.002,
      vy: (Math.random() - 0.5) * 0.002,
      r: Math.random() * 2 + 1,
      a: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      animationTime += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        
        const x = p.x * canvas.width;
        const y = p.y * canvas.height;
        const alpha = p.a * (0.8 + 0.2 * Math.sin(animationTime * 0.5 + p.x * 10));
        
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.fill();
      });
      
      raf = requestAnimationFrame(draw);
    };
    draw();
    
    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />;
}

// ── Main Login Component ─────────────────────────────────────────
export default function Login() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "fa";
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email: email.trim(),
        password
      });

      if (res.data.success) {
        // ✅ ذخیره توکن در localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        // ✅ اگر کاربر ادمین است، توکن ادمین را هم ذخیره کن
        if (res.data.user.role === 'admin') {
          localStorage.setItem('adminToken', 'fatemeh963');
        }
        
        setSuccess('ورود با موفقیت انجام شد');
        
        // ✅ هدایت به صفحه اصلی بعد از 1 ثانیه
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'خطا در ورود');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'ورود | اپل استور' : 'Login | Apple Store'}</title>
      </Helmet>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-[#0B0B0F]">
        <ParticleField />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-[#1A1D24]/90 backdrop-blur-xl rounded-3xl p-8 border border-[#D4AF37]/20 shadow-2xl shadow-[#D4AF37]/5">
            
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30">
                <FaApple className="text-3xl text-[#D4AF37]" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-white mb-2">
              {isRTL ? 'ورود به حساب کاربری' : 'Welcome Back'}
            </h1>
            <p className="text-center text-gray-400 text-sm mb-6">
              {isRTL ? 'به اپل استور خوش آمدید' : 'Sign in to your Apple Store account'}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  {isRTL ? 'ایمیل' : 'Email Address'}
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#0B0B0F]/60 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-white placeholder-gray-500 transition"
                    placeholder={isRTL ? 'ایمیل خود را وارد کنید' : 'Enter your email'}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  {isRTL ? 'رمز عبور' : 'Password'}
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-[#0B0B0F]/60 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent text-white placeholder-gray-500 transition"
                    placeholder={isRTL ? 'رمز عبور خود را وارد کنید' : 'Enter your password'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A027] text-black rounded-xl font-bold hover:from-[#C5A027] hover:to-[#B8921A] transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>{isRTL ? 'در حال ورود...' : 'Logging in...'}</span>
                ) : (
                  <>
                    {isRTL ? 'ورود' : 'Sign In'}
                    <FaArrowRight className={isRTL ? 'rotate-180' : ''} size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-400">
              {isRTL ? 'حساب کاربری ندارید؟' : "Don't have an account?"}
              <Link to="/register" className="text-[#D4AF37] hover:text-[#F3D27A] font-bold ml-1 transition">
                {isRTL ? 'ثبت‌نام' : 'Sign Up'}
              </Link>
            </div>

            {/* Trusted Links */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-[10px] text-center text-gray-500 uppercase tracking-wider mb-3">
                {isRTL ? 'لینک‌های معتبر' : 'Trusted Links'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {trustedLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition group"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                    <FaExternalLinkAlt size={8} className="opacity-50 group-hover:opacity-100 transition" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
