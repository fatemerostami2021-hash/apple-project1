import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FaApple, FaKey, FaEye, FaEyeSlash, FaArrowLeft, FaShieldAlt } from "react-icons/fa";

// رنگ‌های تم (Theme Colors)
const colors = {
  primaryText: "#F8FAFC",
  secondaryText: "#C0C7D1",
  gold: "#D4AF37",
  goldHover: "#F3D27A",
  silverBorder: "rgba(192, 199, 209, 0.25)",
  glassBg: "rgba(10, 12, 18, 0.85)",
  goldGlow: "rgba(212, 175, 55, 0.25)",
};

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

// ── 3D Tilt Card ─────────────────────────────────────────────
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxRotate = 8;
    
    const rotateYVal = ((e.clientX - centerX) / (rect.width / 2)) * maxRotate;
    const rotateXVal = ((centerY - e.clientY) / (rect.height / 2)) * maxRotate;
    
    setRotateY(rotateYVal);
    setRotateX(rotateXVal);
  };

  const handleLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Modern Input ─────────────────────────────────────────────
function ModernInput({ label, icon: Icon, type, value, onChange, placeholder, required, showToggle, onToggle, showPassword }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const isActive = focused || filled || value?.length > 0;

  return (
    <div className="relative group">
      <label
        className={`absolute z-10 transition-all duration-300 pointer-events-none font-semibold ${
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
            ? "border-[#D4AF37] shadow-[0_0_0_3px_rgba(212,175,55,0.12)]"
            : "border-[rgba(192,199,209,0.2)] hover:border-[#D4AF37]/40"
        } bg-[rgba(15,18,25,0.7)] backdrop-blur-sm`}
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
          className="w-full pl-10 pr-12 pt-5 pb-2 bg-transparent text-[#F8FAFC] text-sm focus:outline-none placeholder:text-[#C0C7D1]/30"
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C0C7D1] hover:text-[#D4AF37] transition-colors"
          >
            {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
          </button>
        )}
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/60 rounded-full"
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// ── Main Admin Login ──────────────────────────────────────────────────
export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    localStorage.setItem("adminToken", token);
    
    try {
      const res = await fetch("http://localhost:5000/api/admin/articles", {
        headers: { Authorization: "Bearer " + token }
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      } else {
        setError("❌ توکن نامعتبر است. لطفاً دوباره تلاش کنید.");
        localStorage.removeItem("adminToken");
      }
    } catch (err) {
      setError("❌ خطا در ارتباط با سرور. مطمئن شوید بک‌اند روشن است.");
      localStorage.removeItem("adminToken");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 relative">
      
      {/* بدون بک‌گراند اضافی - فقط گرادیان ساده */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f15] to-[#0a0a0f]" />

      <div className="relative max-w-md w-full z-10">

        {/* ── LOGO ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a1d24] to-[#0f1218] border border-[#D4AF37]/30 mb-3 shadow-xl">
            <FaApple className="text-[#D4AF37]" size={26} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/70">
            Admin Portal
          </p>
        </motion.div>

        {/* ── 3D TILT CARD ── */}
        <TiltCard className="w-full">
          <div
            className="relative rounded-2xl border overflow-hidden shadow-2xl"
            style={{ 
              backgroundColor: colors.glassBg,
              borderColor: colors.silverBorder,
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Multi-dimensional borders (چندبعدی) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 pointer-events-none" />
            <div className="absolute -inset-px bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-[#D4AF37]/20 rounded-2xl blur-sm pointer-events-none" />
            
            {/* Top gold accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <div className="relative p-6 md:p-8">

              {/* Header */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-black tracking-tight text-white">
                  پنل مدیریت
                  <span className="text-[#D4AF37]">.</span>
                </h2>
                <p className="text-xs text-[#C0C7D1] mt-1">
                  برای ورود توکن ادمین را وارد کنید
                </p>
              </div>

              {/* Success State */}
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 bg-[#D4AF37]/10 border border-[#D4AF37]/50">
                    <svg className="w-7 h-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-bold text-white text-lg">ورود موفق!</p>
                  <p className="text-sm text-[#C0C7D1] mt-1">در حال انتقال...</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <ModernInput
                    label="توکن ادمین"
                    icon={FaKey}
                    type={showPassword ? "text" : "password"}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="fatemeh963"
                    required
                    showToggle={true}
                    onToggle={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                  />

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-center gap-2 text-red-400 text-xs bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                    >
                      <FaShieldAlt size={12} />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <MagneticBtn
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full py-3 rounded-xl font-bold text-sm tracking-wide overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldHover})`,
                      color: "#0a0a0f",
                      boxShadow: `0 4px 15px ${colors.goldGlow}`,
                    }}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <span className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                      ) : (
                        <>
                          ورود به پنل
                          <FaArrowLeft size={13} />
                        </>
                      )}
                    </span>
                  </MagneticBtn>
                </form>
              )}

              {/* Footer */}
              {!success && (
                <p className="text-center mt-6 text-[10px] text-[#C0C7D1]/40">
                  توکن پیش‌فرض: <span className="text-[#D4AF37] font-mono">fatemeh963</span>
                </p>
              )}
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
