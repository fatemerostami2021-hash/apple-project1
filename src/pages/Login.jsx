// src/pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FaApple, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

export default function Login() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // شبیه‌سازی لاگین
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login:", { email, password, rememberMe });
    }, 1500);
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <Helmet>
        <title>{isRtl ? "ورود | تک‌کرانچ" : "Login | TechCrunch"}</title>
      </Helmet>

      <div className="max-w-md w-full">
        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/40 dark:border-white/10 shadow-2xl"
        >
          {/* Glow Effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl" />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 mb-4">
              <FaApple className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
              {isRtl ? "خوش آمدید" : "Welcome Back"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRtl 
                ? "برای ورود به حساب کاربری ایمیل و رمز عبور خود را وارد کنید" 
                : "Enter your email and password to access your account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                {isRtl ? "ایمیل" : "Email"}
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/15 focus:border-amber-500 focus:outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30"
                  placeholder={isRtl ? "example@email.com" : "example@email.com"}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                {isRtl ? "رمز عبور" : "Password"}
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/15 focus:border-amber-500 focus:outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30"
                  placeholder={isRtl ? "••••••••" : "••••••••"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isRtl ? "مرا به خاطر بسپار" : "Remember me"}
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-bold transition-colors"
              >
                {isRtl ? "رمز عبور خود را فراموش کرده‌اید؟" : "Forgot password?"}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <HiOutlineSparkles size={18} />
                  {isRtl ? "ورود" : "Sign In"}
                </>
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white/60 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                {isRtl ? "یا ادامه با" : "Or continue with"}
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 font-bold hover:border-amber-500/50 hover:text-amber-600 transition-all duration-300">
              <FaGoogle className="text-red-500" />
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 font-bold hover:border-amber-500/50 hover:text-amber-600 transition-all duration-300">
              <FaGithub className="text-gray-700 dark:text-gray-400" />
              <span className="text-sm">GitHub</span>
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            {isRtl ? "حساب کاربری ندارید؟" : "Don't have an account?"}{" "}
            <Link to="/register" className="text-amber-600 dark:text-amber-400 font-bold hover:underline transition-all">
              {isRtl ? "ثبت نام" : "Sign Up"}
            </Link>
          </p>
        </motion.div>

        {/* Footer Text */}
        <p className="text-center mt-6 text-xs text-gray-400 dark:text-gray-500">
          {isRtl 
            ? "با ورود به حساب کاربری، شرایط و قوانین سایت را می‌پذیرید" 
            : "By signing in, you agree to our Terms and Privacy Policy"}
        </p>
      </div>
    </div>
  );
}