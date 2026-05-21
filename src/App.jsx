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

import GalaxyBackground from "./components/GalaxyBackground";

export default function App() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  // RTL / LTR
  useEffect(() => {
    document.documentElement.dir =
      i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  // DARK MODE CLASS
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
    ${
      theme === "dark"
        ? "bg-transparent text-white" // شفاف شد تا کهکشان دیده شود
        : "bg-[#E8F5FF] text-black"   // رنگ اصلی تم روشن
    }
  `}
  style={{ fontFamily: "IRANSans, sans-serif" }}
>
  {/* کهکشان فقط در دارک مود رندر می‌شود */}
  <GalaxyBackground theme={theme} />
  
  <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />

          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/articles" element={<div>Articles Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />

          <Route path="/apple-products/iphone" element={<IphonePage />} />
          <Route path="/apple-products/ipad" element={<div>iPad Page</div>} />
          <Route path="/apple-products/macbook" element={<div>MacBook Page</div>} />
          <Route path="/apple-products/watch" element={<div>Apple Watch Page</div>} />
          <Route path="/apple-products/airpods" element={<div>AirPods Page</div>} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />

        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
