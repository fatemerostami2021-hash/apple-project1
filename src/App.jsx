import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import FloatingSocialButtons from "./components/layout/FloatingSocialButtons";
import "./i18n";
import { useTheme } from "./store/theme";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArticleForm from "./pages/admin/AdminArticleForm";
import AdminProductForm from "./pages/admin/AdminProductForm.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminSlides from "./pages/admin/AdminSlides.jsx";
import AdminSlideForm from "./pages/admin/AdminSlideForm.jsx";
import AdminArticles from "./pages/admin/AdminArticles.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import IphonePage from "./pages/apple/IphonePage";
import BlogPage from "./pages/blog/BlogPage";
import ArticlePage from "./pages/blog/ArticlePage";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";

import GalaxyBackground from "./components/GalaxyBackground";
import ProductPage from "./pages/ProductPage";
import WatchPage from "./pages/apple/WatchPage";

// مقالات اپل واچ
import ArticleAppleWatchUltra4 from "./pages/products/watch/article/ArticleAppleWatchUltra4";
import ArticleAppleWatchUltra3 from "./pages/products/watch/article/ArticleAppleWatchUltra3";
import ArticleAppleWatchSeries12 from "./pages/products/watch/article/ArticleAppleWatchSeries12";
import ArticleAppleWatchSE3 from "./pages/products/watch/article/ArticleAppleWatchSE3";

// صفحه مقایسه و تکامل آیفون
import IPhoneEvolutionArticle from "./pages/articles/IPhoneEvolutionArticle";

export default function App() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className={`
        relative min-h-screen flex flex-col transition-colors duration-300
        ${theme === "dark" ? "bg-transparent text-white" : "bg-[#E8F5FF] text-black"}
      `}
      style={{ fontFamily: "IRANSans, sans-serif" }}
    >
      <GalaxyBackground theme={theme} />
      
      <Header />

      <main className="flex-1 w-full">
        <Routes>
          {/* ===== صفحات اصلی ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          
          {/* ===== احراز هویت ===== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ===== سبد خرید و تسویه ===== */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* ===== بلاگ - مسیر دقیق قبل از مسیر داینامیک ===== */}
          <Route path="/blog" element={<BlogPage />} />
          
          {/* ===== مقالات - مسیرهای داینامیک ===== */}
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/iphone/:slug" element={<ArticlePage />} />
          
          {/* ===== صفحات دیگر ===== */}
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/articles" element={<div>Articles Page</div>} />

          {/* ===== اپل واچ ===== */}
          <Route path="/apple-products/watch" element={<WatchPage />} />
          <Route path="/apple-products/iphone" element={<IphonePage />} />
          <Route path="/apple-products/ipad" element={<div>iPad Page</div>} />
          <Route path="/apple-products/macbook" element={<div>MacBook Page</div>} />
          <Route path="/apple-products/airpods" element={<div>AirPods Page</div>} />

          {/* ===== مقالات اپل واچ ===== */}
          <Route path="/apple-products/watch/article/apple-watch-ultra-4" element={<ArticleAppleWatchUltra4 />} />
          <Route path="/apple-products/watch/article/apple-watch-ultra-3" element={<ArticleAppleWatchUltra3 />} />
          <Route path="/apple-products/watch/article/apple-watch-series-12" element={<ArticleAppleWatchSeries12 />} />
          <Route path="/apple-products/watch/article/apple-watch-se-3" element={<ArticleAppleWatchSE3 />} />

          {/* ===== صفحه مقایسه آیفون ===== */}
          <Route path="/iphone/compare" element={<IPhoneEvolutionArticle />} />

          {/* ===== پنل ادمین ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/articles/new" element={<AdminArticleForm />} />
<Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/articles/edit/:slug" element={<AdminArticleForm />} />
          <Route path="/admin/products/new" element={<AdminProductForm />} />
          <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
<Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/slides" element={<AdminSlides />} />
          <Route path="/admin/slides/new" element={<AdminSlideForm />} />
          <Route path="/admin/slides/edit/:id" element={<AdminSlideForm />} />
<Route path="/admin/orders" element={<AdminOrders />} />

          {/* ===== صفحه 404 ===== */}
          <Route path="*" element={<div className="text-center py-20 text-2xl text-gray-500">404 - صفحه یافت نشد</div>} />
        </Routes>
      </main>

      <Footer />
      <FloatingSocialButtons />
    </div>
  );
}
