import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "./store/theme";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import FloatingSocialButtons from "./components/layout/FloatingSocialButtons";
import GalaxyBackground from "./components/GalaxyBackground";
import "./i18n";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ArticlePage = lazy(() => import("./pages/blog/ArticlePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const IphonePage = lazy(() => import("./pages/apple/IphonePage"));
const WatchPage = lazy(() => import("./pages/apple/WatchPage"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Cart = lazy(() => import("./pages/Cart"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminArticleForm = lazy(() => import("./pages/admin/AdminArticleForm"));

// Apple Watch Articles
const ArticleAppleWatchUltra4 = lazy(() => import("./pages/products/watch/article/ArticleAppleWatchUltra4"));
const ArticleAppleWatchUltra3 = lazy(() => import("./pages/products/watch/article/ArticleAppleWatchUltra3"));
const ArticleAppleWatchSeries12 = lazy(() => import("./pages/products/watch/article/ArticleAppleWatchSeries12"));
const ArticleAppleWatchSE3 = lazy(() => import("./pages/products/watch/article/ArticleAppleWatchSE3"));
const IPhoneEvolutionArticle = lazy(() => import("./pages/articles/IPhoneEvolutionArticle"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

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
    >
      <GalaxyBackground theme={theme} />
      <Header />
      
      <main className="flex-1 w-full">
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            
            {/* Legacy Routes */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            
            {/* Apple Products */}
            <Route path="/apple-products/iphone" element={<IphonePage />} />
            <Route path="/apple-products/ipad" element={<div className="text-center py-20">iPad Page</div>} />
            <Route path="/apple-products/macbook" element={<div className="text-center py-20">MacBook Page</div>} />
            <Route path="/apple-products/watch" element={<WatchPage />} />
            <Route path="/apple-products/airpods" element={<div className="text-center py-20">AirPods Page</div>} />

            {/* Apple Watch Articles */}
            <Route path="/apple-products/watch/article/apple-watch-ultra-4" element={<ArticleAppleWatchUltra4 />} />
            <Route path="/apple-products/watch/article/apple-watch-ultra-3" element={<ArticleAppleWatchUltra3 />} />
            <Route path="/apple-products/watch/article/apple-watch-series-12" element={<ArticleAppleWatchSeries12 />} />
            <Route path="/apple-products/watch/article/apple-watch-se-3" element={<ArticleAppleWatchSE3 />} />

            {/* Article Routes */}
            <Route path="/blog/:slug" element={<ArticlePage />} />
            <Route path="/iphone/:slug" element={<ArticlePage />} />
            <Route path="/iphone/compare" element={<IPhoneEvolutionArticle />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart-old" element={<Cart />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/articles/new" element={<AdminArticleForm />} />
            <Route path="/admin/articles/edit/:slug" element={<AdminArticleForm />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <FloatingSocialButtons />
    </div>
  );
}
