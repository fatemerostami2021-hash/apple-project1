// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";

import "./i18n";
import { useTheme } from "./store/theme";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import IphonePage from "./pages/apple/IphonePage";
import BlogPage from "./pages/blog/BlogPage";
import ArticlePage from "./pages/blog/ArticlePage";
import About from "./pages/About";

import GalaxyBackground from "./components/GalaxyBackground";
import ProductPage from "./pages/ProductPage";
import WatchPage from "./pages/apple/WatchPage";

// ✅ مقالات اپل واچ از مسیر جدید
import ArticleAppleWatchUltra4 from "./pages/products/watch/article/ArticleAppleWatchUltra4";
import ArticleAppleWatchUltra3 from "./pages/products/watch/article/ArticleAppleWatchUltra3";
import ArticleAppleWatchSeries12 from "./pages/products/watch/article/ArticleAppleWatchSeries12";
import ArticleAppleWatchSE3 from "./pages/products/watch/article/ArticleAppleWatchSE3";

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
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/articles" element={<div>Articles Page</div>} />
          
          {/* ✅ فقط یک مسیر about */}
          <Route path="/about" element={<About />} />

          {/* Apple Products */}
          <Route path="/apple-products/iphone" element={<IphonePage />} />
          <Route path="/apple-products/ipad" element={<div>iPad Page</div>} />
          <Route path="/apple-products/macbook" element={<div>MacBook Page</div>} />
          <Route path="/apple-products/watch" element={<WatchPage />} />
          <Route path="/apple-products/airpods" element={<div>AirPods Page</div>} />

          {/* Apple Watch Articles - مسیر جدید */}
          <Route path="/apple-products/watch/article/apple-watch-ultra-4" element={<ArticleAppleWatchUltra4 />} />
          <Route path="/apple-products/watch/article/apple-watch-ultra-3" element={<ArticleAppleWatchUltra3 />} />
          <Route path="/apple-products/watch/article/apple-watch-series-12" element={<ArticleAppleWatchSeries12 />} />
          <Route path="/apple-products/watch/article/apple-watch-se-3" element={<ArticleAppleWatchSE3 />} />

          {/* Main Blog - فقط آیفون و سامسونگ */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}