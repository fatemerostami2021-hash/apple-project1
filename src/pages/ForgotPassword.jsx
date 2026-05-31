// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaApple,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaShieldAlt,
  FaHome,
  FaNewspaper,
  FaUserCircle,
  FaHeadset,
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaCommentDots,
} from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineMail } from "react-icons/hi";

// تصویر Hero
import heroImage from "../assets/cart-hero/apple-store.png";

export default function ForgotPassword() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [isChatOpen, setIsChatOpen] = useState(false);

  // حالت‌های مختلف صفحه
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [errors, setErrors] = useState({});

  // اطلاعات سایت برای سایدبار
  const siteInfo = {
    address: isRtl ? "تهران، ایران" : "Tehran, Iran",
    phone: "+989177892994",
    email: "fatimarostami963369@gmail.com",
    hours: isRtl ? "شنبه تا پنجشنبه: ۹ صبح تا ۶ عصر" : "Sat - Thu: 9 AM - 6 PM",
  };

  const socialLinks = [
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/fateme.rosttamii", color: "hover:text-pink-500" },
    { name: "WhatsApp", icon: <FaWhatsapp />, url: "https://wa.me/989177892994", color: "hover:text-green-500" },
    { name: "Telegram", icon: <FaTelegram />, url: "https://t.me/fitness_mindset", color: "hover:text-blue-500" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/fatemeh-rostami", color: "hover:text-blue-700" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/rostamifatemeh963", color: "hover:text-gray-700" },
    { name: "Twitter", icon: <FaTwitter />, url: "#", color: "hover:text-sky-500" },
  ];

  const chatChannels = [
    { name: "WhatsApp", icon: <FaWhatsapp size={22} />, url: "https://wa.me/989177892994", color: "from-green-500 to-green-600", status: "online", username: "+98 917 789 2994" },
    { name: "Telegram", icon: <FaTelegram size={22} />, url: "https://t.me/fitness_mindset", color: "from-blue-500 to-blue-600", status: "online", username: "@fitness_mindset" },
    { name: "Instagram", icon: <FaInstagram size={22} />, url: "https://www.instagram.com/fateme.rosttamii", color: "from-pink-500 to-orange-500", status: "online", username: "@fateme.rosttamii" },
  ];

  const navLinks = [
    { name: isRtl ? "خانه" : "Home", icon: <FaHome />, path: "/" },
    { name: isRtl ? "مقالات" : "Articles", icon: <FaNewspaper />, path: "/blog" },
    { name: isRtl ? "درباره ما" : "About Us", icon: <FaUserCircle />, path: "/about" },
    { name: isRtl ? "تماس با ما" : "Contact", icon: <FaHeadset />, path: "/contact" },
  ];

  const popularArticles = [
    { title: isRtl ? "آیفون ۱۷ پرو مکس" : "iPhone 17 Pro Max", slug: "iphone-17-pro-max" },
    { title: isRtl ? "گلکسی S24 اولترا" : "Galaxy S24 Ultra", slug: "galaxy-s24-ultra-ai-revolution" },
    { title: isRtl ? "مقایسه اپل و سامسونگ" : "Apple vs Samsung", slug: "iphone-vs-samsung-camera-battle-2025" },
  ];

  // ارسال کد تأیید
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: isRtl ? "ایمیل خود را وارد کنید" : "Please enter your email" });
      return;
    }
    if (!email.includes("@")) {
      setErrors({ email: isRtl ? "ایمیل نامعتبر است" : "Invalid email address" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setResendTimer(60);
      startResendTimer();
    }, 1500);
  };

  const startResendTimer = () => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setErrors({ otp: isRtl ? "کد ۶ رقمی را کامل وارد کنید" : "Enter complete 6-digit code" });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (enteredOtp === "123456") {
        setStep(3);
        setErrors({});
      } else {
        setErrors({ otp: isRtl ? "کد نامعتبر است" : "Invalid code" });
      }
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (newPassword.length < 8) {
      newErrors.newPassword = isRtl ? "رمز عبور باید حداقل ۸ کاراکتر باشد" : "Password must be at least 8 characters";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = isRtl ? "رمز عبور و تکرار آن مطابقت ندارند" : "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 1500);
  };

  const handleResendCode = () => {
    if (resendTimer > 0) return;
    setResendTimer(60);
    startResendTimer();
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: isRtl ? 50 : -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isRtl ? -50 : 50 },
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{isRtl ? "فراموشی رمز عبور | تک‌کرانچ" : "Forgot Password | TechCrunch"}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Hero Image Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="relative h-40 md:h-56 lg:h-64 w-full">
            <img
              src={heroImage}
              alt="Apple Store"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center justify-center">
              <div className="text-center text-white">
                <FaApple className="w-12 h-12 mx-auto mb-2 text-amber-400" />
                <h2 className="text-2xl md:text-3xl font-black">
                  {isRtl ? "به خانواده اپل خوش آمدید" : "Welcome to Apple Family"}
                </h2>
                <p className="text-sm text-white/80">
                  {isRtl ? "بازیابی رمز عبور در چند مرحله ساده" : "Password recovery in a few simple steps"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ==================== LEFT SIDE - FORM ==================== */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/40 dark:border-white/10 shadow-2xl"
            >
              {/* Glow Effects */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl" />

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`flex-1 flex items-center ${s < 4 ? "flex-1" : ""}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${
                        step >= s
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                          : "bg-white/60 dark:bg-white/10 text-gray-400 border border-gray-200 dark:border-white/15"
                      }`}
                    >
                      {step > s ? <FaCheckCircle size={14} /> : s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 rounded-full transition-all duration-300 ${
                          step > s ? "bg-amber-500" : "bg-gray-200 dark:bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Steps Content */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 mb-4">
                        <HiOutlineMail className="w-8 h-8 text-amber-500" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                        {isRtl ? "فراموشی رمز عبور" : "Forgot Password?"}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isRtl
                          ? "ایمیل خود را وارد کنید تا کد تأیید برای شما ارسال شود"
                          : "Enter your email to receive a verification code"}
                      </p>
                    </div>

                    <form onSubmit={handleSendCode} className="space-y-5">
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
                            className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border ${
                              errors.email ? "border-red-500" : "border-gray-200 dark:border-white/15 focus:border-amber-500"
                            } focus:outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30`}
                            placeholder="example@email.com"
                          />
                        </div>
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>

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
                            {isRtl ? "ارسال کد تأیید" : "Send Verification Code"}
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 mb-4">
                        <FaShieldAlt className="w-8 h-8 text-amber-500" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                        {isRtl ? "تأیید هویت" : "Verify Identity"}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isRtl ? `کد تأیید ۶ رقمی به ایمیل ${email} ارسال شد` : `A 6-digit code was sent to ${email}`}
                      </p>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="space-y-5">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 text-center">
                          {isRtl ? "کد تأیید" : "Verification Code"}
                        </label>
                        <div className="flex justify-center gap-2">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              id={`otp-${index}`}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              className={`w-12 h-12 text-center text-xl font-black rounded-xl bg-white/50 dark:bg-black/30 border ${
                                errors.otp ? "border-red-500" : "border-gray-200 dark:border-white/15 focus:border-amber-500"
                              } focus:outline-none transition-all text-gray-900 dark:text-white`}
                            />
                          ))}
                        </div>
                        {errors.otp && <p className="text-xs text-red-500 text-center mt-2">{errors.otp}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm uppercase tracking-wider hover:shadow-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <FaCheckCircle size={18} />
                            {isRtl ? "تأیید کد" : "Verify Code"}
                          </>
                        )}
                      </button>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleResendCode}
                          disabled={resendTimer > 0}
                          className={`text-sm font-bold transition-all ${
                            resendTimer > 0 ? "text-gray-400 cursor-not-allowed" : "text-amber-600 dark:text-amber-400 hover:underline"
                          }`}
                        >
                          {resendTimer > 0
                            ? isRtl ? `ارسال مجدد پس از ${resendTimer} ثانیه` : `Resend in ${resendTimer}s`
                            : isRtl ? "ارسال مجدد کد" : "Resend Code"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 mb-4">
                        <FaLock className="w-8 h-8 text-amber-500" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                        {isRtl ? "رمز عبور جدید" : "New Password"}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isRtl ? "رمز عبور جدید خود را وارد کنید" : "Enter your new password"}
                      </p>
                    </div>

                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          {isRtl ? "رمز عبور جدید" : "New Password"}
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`w-full pl-12 pr-12 py-3 rounded-xl bg-white/50 dark:bg-black/30 border ${
                              errors.newPassword ? "border-red-500" : "border-gray-200 dark:border-white/15 focus:border-amber-500"
                            } focus:outline-none transition-all text-gray-900 dark:text-white`}
                            placeholder={isRtl ? "حداقل ۸ کاراکتر" : "Minimum 8 characters"}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                          >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                          </button>
                        </div>
                        {errors.newPassword && <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          {isRtl ? "تکرار رمز عبور" : "Confirm Password"}
                        </label>
                        <div className="relative">
                          <FaCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full pl-12 pr-12 py-3 rounded-xl bg-white/50 dark:bg-black/30 border ${
                              errors.confirmPassword ? "border-red-500" : "border-gray-200 dark:border-white/15 focus:border-amber-500"
                            } focus:outline-none transition-all text-gray-900 dark:text-white`}
                            placeholder={isRtl ? "تکرار رمز عبور" : "Confirm password"}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                          >
                            {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                      </div>

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
                            {isRtl ? "بازنشانی رمز عبور" : "Reset Password"}
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 mb-4">
                      <FaCheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                      {isRtl ? "رمز عبور تغییر کرد!" : "Password Changed!"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      {isRtl
                        ? "رمز عبور شما با موفقیت تغییر کرد. اکنون می‌توانید وارد حساب کاربری خود شوید."
                        : "Your password has been successfully changed. You can now log in."}
                    </p>
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <FaApple size={18} />
                      {isRtl ? "ورود به حساب کاربری" : "Login to Account"}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Back to Login Link */}
              {step !== 4 && (
                <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
                  <Link to="/login" className="text-amber-600 dark:text-amber-400 font-bold hover:underline transition-all inline-flex items-center gap-1">
                    {isRtl ? <FaArrowRight size={12} /> : <FaArrowLeft size={12} />}
                    {isRtl ? "بازگشت به صفحه ورود" : "Back to Login"}
                  </Link>
                </p>
              )}
            </motion.div>
          </div>

          {/* ==================== RIGHT SIDE - INFO PANEL ==================== */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              
              {/* Live Chat Support Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-xl rounded-2xl p-5 border border-amber-500/30 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => setIsChatOpen(!isChatOpen)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                      <FaCommentDots className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-gray-900 dark:text-white">
                        {isRtl ? "پشتیبانی آنلاین" : "Live Support"}
                      </h3>
                      <p className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        {isRtl ? "آنلاین - پاسخ فوری" : "Online - Instant reply"}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isChatOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-amber-500"
                  >
                    ▼
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isChatOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-amber-500/20 space-y-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {isRtl
                            ? "از طریق پیامرسان‌های زیر با پشتیبانی در ارتباط باشید:"
                            : "Connect with support via messengers below:"}
                        </p>
                        {chatChannels.map((channel, idx) => (
                          <a
                            key={idx}
                            href={channel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-white/5 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-amber-600/20 transition-all duration-300 group"
                          >
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${channel.color} flex items-center justify-center text-white`}>
                              {channel.icon}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-amber-500 transition-colors">
                                {channel.name}
                              </p>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400">{channel.username}</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Site Navigation Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/40 dark:border-white/10 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200 dark:border-white/10">
                  <FaApple className="text-amber-500 text-xl" />
                  <h3 className="text-base font-black text-gray-900 dark:text-white">
                    {isRtl ? "تک‌کرانچ" : "TechCrunch"}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {navLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.path}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="text-amber-500 text-base">{link.icon}</div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-amber-500 transition-colors">
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Popular Articles Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/40 dark:border-white/10 shadow-lg"
              >
                <h3 className="text-base font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FaNewspaper className="text-amber-500" />
                  {isRtl ? "مقالات محبوب" : "Popular Articles"}
                </h3>
                
                <div className="space-y-2">
                  {popularArticles.map((article, idx) => (
                    <Link
                      key={idx}
                      to={`/blog/${article.slug}`}
                      className="block p-2 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-300"
                    >
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-amber-500 transition-colors line-clamp-2">
                        {article.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Contact Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/40 dark:border-white/10 shadow-lg"
              >
                <h3 className="text-base font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FaHeadset className="text-amber-500" />
                  {isRtl ? "تماس با ما" : "Contact Us"}
                </h3>
                
                <div className="space-y-2">
                  <a href={`tel:${siteInfo.phone}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 transition-colors">
                    <FaPhone className="text-amber-500 text-xs" />
                    <span>{siteInfo.phone}</span>
                  </a>
                  <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 transition-colors">
                    <FaEnvelope className="text-amber-500 text-xs" />
                    <span className="truncate">{siteInfo.email}</span>
                  </a>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaMapMarkerAlt className="text-amber-500 text-xs" />
                    <span>{siteInfo.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaClock className="text-amber-500 text-xs" />
                    <span>{siteInfo.hours}</span>
                  </div>
                </div>
              </motion.div>

              {/* Social Media Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/40 dark:border-white/10 shadow-lg text-center"
              >
                <h3 className="text-base font-black text-gray-900 dark:text-white mb-3">
                  {isRtl ? "شبکه‌های اجتماعی" : "Social Media"}
                </h3>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 hover:text-white transition-all duration-300 transform hover:scale-110`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}