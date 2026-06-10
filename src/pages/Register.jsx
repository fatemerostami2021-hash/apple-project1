import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaApple, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaPhone, FaUserEdit, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// اطلاعات ادمین
const ADMIN_EMAIL = "rostamifatemeh.963@gmail.com";

// تابع ارسال ایمیل به ادمین
const sendAdminEmail = async (userData) => {
  const { name, email, phone, bio } = userData;
  const timestamp = new Date().toLocaleString("fa-IR");
  
  const emailSubject = `📋 ثبت نام جدید - ${name}`;
  const emailBody = `
📋 اطلاعات ثبت نام جدید
━━━━━━━━━━━━━━━━━━━━━
👤 نام: ${name}
📧 ایمیل: ${email}
📱 تلفن: ${phone || "❌ وارد نشده"}
📝 درباره: ${bio || "❌ وارد نشده"}
🕐 زمان: ${timestamp}
━━━━━━━━━━━━━━━━━━━━━
  `;
  
  const mailtoLink = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  window.open(mailtoLink, "_blank");
};

// Password Strength
function StrengthBar({ password, isRtl }) {
  const score = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3;
  
  const labels = isRtl ? ["", "ضعیف", "متوسط", "قوی", "عالی"] : ["", "Weak", "Fair", "Strong", "Excellent"];
  const colors = ["", "bg-red-500", "bg-amber-400", "bg-green-400", "bg-emerald-500"];
  
  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= score ? colors[score] : "bg-gray-200 dark:bg-white/10"}`} />
        ))}
      </div>
      <p className={`text-[10px] font-extrabold ${score === 1 ? "text-red-400" : score === 2 ? "text-amber-400" : "text-green-400"}`}>
        {labels[score]}
      </p>
    </div>
  );
}

export default function Register() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === "fa";
  
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", bio: "", password: "", confirmPassword: "",
  });

  const set = (field) => (e) => setFormData((p) => ({ ...p, [field]: e.target.value }));
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 0) {
      setStep(1);
      return;
    }
    
    if (step === 1) {
      if (!passwordsMatch) {
        setError(isRtl ? "رمز عبور و تکرار آن مطابقت ندارند" : "Passwords do not match");
        return;
      }
      if (!agreed) {
        setError(isRtl ? "لطفاً با شرایط و قوانین موافقت کنید" : "Please agree to the terms");
        return;
      }
      
      setIsLoading(true);
      setError("");
      
      try {
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            bio: formData.bio,
          })
        });
        
        const data = await res.json();
        
        if (res.ok && data.success) {
          localStorage.setItem("user_token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          await sendAdminEmail(formData);
          setStep(2);
        } else {
          setError(data.error || "خطا در ثبت نام");
        }
      } catch (err) {
        setError("خطا در ارتباط با سرور");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const backStep = () => step > 0 && setStep(step - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 mb-4">
            <FaApple className="text-amber-500 text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">TechCrunch</h1>
          <p className="text-gray-400 text-sm mt-1">{isRtl ? "ثبت نام در تک‌کرانچ" : "Register for TechCrunch"}</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h2 className="text-xl font-bold text-white mb-6">{isRtl ? "اطلاعات شخصی" : "Personal Info"}</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">{isRtl ? "نام و نام خانوادگی" : "Full Name"}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={set("name")}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none"
                      placeholder={isRtl ? "فاطمه رستمی" : "Fatemeh Rostami"}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">ایمیل</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={set("email")}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">{isRtl ? "شماره موبایل (اختیاری)" : "Phone (Optional)"}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={set("phone")}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none"
                      placeholder="0912 XXX XXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">{isRtl ? "درباره شما (اختیاری)" : "About You (Optional)"}</label>
                    <textarea
                      value={formData.bio}
                      onChange={set("bio")}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none resize-none"
                      placeholder={isRtl ? "مهارت‌ها، علایق..." : "Skills, interests..."}
                    />
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="w-full py-2 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-600 transition flex items-center justify-center gap-2"
                  >
                    {isRtl ? "مرحله بعد" : "Next"}
                    <FaArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <button onClick={backStep} className="flex items-center gap-1 text-gray-400 hover:text-amber-500 mb-4 text-sm">
                  <FaArrowLeft size={12} /> {isRtl ? "بازگشت" : "Back"}
                </button>
                
                <h2 className="text-xl font-bold text-white mb-6">{isRtl ? "ایجاد رمز عبور" : "Create Password"}</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">{isRtl ? "رمز عبور" : "Password"}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={set("password")}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </button>
                    </div>
                    <StrengthBar password={formData.password} isRtl={isRtl} />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">{isRtl ? "تکرار رمز عبور" : "Confirm Password"}</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={set("confirmPassword")}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  {!passwordsMatch && formData.confirmPassword && (
                    <p className="text-red-500 text-xs">{isRtl ? "رمزها مطابقت ندارند" : "Passwords don't match"}</p>
                  )}
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-gray-300 text-xs">
                      {isRtl ? "با شرایط و قوانین سایت موافقت می‌کنم" : "I agree to the terms and conditions"}
                    </span>
                  </label>
                  
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-2 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>{isRtl ? "ثبت نام" : "Register"} <FaArrowRight size={14} /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{isRtl ? "ثبت نام موفق!" : "Registration Successful!"}</h3>
                <p className="text-gray-400 text-sm mb-6">{isRtl ? `خوش آمدید ${formData.name}` : `Welcome ${formData.name}`}</p>
                <Link to="/login" className="inline-block w-full py-2 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-600 transition text-center">
                  {isRtl ? "ورود به حساب" : "Login Now"}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-6">
          {isRtl ? "قبلاً ثبت نام کرده‌اید؟" : "Already have an account?"}{" "}
          <Link to="/login" className="text-amber-500 hover:text-amber-400">ورود</Link>
        </p>
      </div>
    </div>
  );
}
