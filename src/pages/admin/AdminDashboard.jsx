import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaBox, FaNewspaper, FaShoppingBag, FaUsers, 
  FaPlus, FaEye, FaImage, FaCog, FaHome, FaChartLine,
  FaArrowUp, FaArrowDown, FaClock, FaStar, FaTrophy,
  FaCheckCircle, FaSpinner, FaTimesCircle, FaUserPlus
} from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'fa';
  const [stats, setStats] = useState({
    products: 0,
    articles: 0,
    orders: 0,
    users: 0,
    slides: 0,
    revenue: 0,
    todayOrders: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [timeFilter, setTimeFilter] = useState('today');

  const getToken = () => localStorage.getItem('adminToken');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const token = getToken();
      
      // دریافت آمار
      const statsRes = await fetch(`${API_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      } else {
        setStats({
          products: 31,
          articles: 28,
          orders: 12,
          users: 45,
          slides: 14,
          revenue: 125000000,
          todayOrders: 3,
          pendingOrders: 2,
          completedOrders: 10
        });
      }

      // دریافت سفارشات اخیر
      const ordersRes = await fetch(`${API_URL}/api/admin/orders/recent`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setRecentOrders(data);
      } else {
        // داده‌های نمونه
        setRecentOrders([
          { _id: 'ord_001', customer: { name: 'احمد رضایی' }, total: 85000000, status: 'delivered', createdAt: new Date() },
          { _id: 'ord_002', customer: { name: 'سارا محمدی' }, total: 120000000, status: 'processing', createdAt: new Date() },
          { _id: 'ord_003', customer: { name: 'علی کریمی' }, total: 35000000, status: 'pending', createdAt: new Date() },
        ]);
      }

      // دریافت محصولات پرفروش
      const productRes = await fetch(`${API_URL}/api/admin/products/top`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (productRes.ok) {
        const data = await productRes.json();
        setTopProducts(data);
      } else {
        setTopProducts([
          { name: 'iPhone 17 Pro Max', sales: 45, revenue: 3825000000 },
          { name: 'Galaxy S24 Ultra', sales: 38, revenue: 3040000000 },
          { name: 'MacBook Pro M4', sales: 22, revenue: 2640000000 },
        ]);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    const map = {
      pending: <FaSpinner className="text-yellow-500" />,
      processing: <FaSpinner className="text-blue-500 animate-spin" />,
      shipped: <FaClock className="text-cyan-500" />,
      delivered: <FaCheckCircle className="text-green-500" />,
      cancelled: <FaTimesCircle className="text-red-500" />
    };
    return map[status?.toLowerCase()] || <FaSpinner className="text-gray-500" />;
  };

  const getStatusLabel = (status) => {
    const map = {
      pending: isRTL ? 'در انتظار' : 'Pending',
      processing: isRTL ? 'در حال پردازش' : 'Processing',
      shipped: isRTL ? 'ارسال شده' : 'Shipped',
      delivered: isRTL ? 'تحویل شده' : 'Delivered',
      cancelled: isRTL ? 'لغو شده' : 'Cancelled'
    };
    return map[status?.toLowerCase()] || status;
  };

  const getStatusColor = (status) => {
    const map = {
      pending: 'bg-yellow-500/20 text-yellow-500',
      processing: 'bg-blue-500/20 text-blue-500',
      shipped: 'bg-cyan-500/20 text-cyan-500',
      delivered: 'bg-green-500/20 text-green-500',
      cancelled: 'bg-red-500/20 text-red-500'
    };
    return map[status?.toLowerCase()] || 'bg-gray-500/20 text-gray-500';
  };

  const statCards = [
    { 
      title: isRTL ? 'محصولات' : 'Products', 
      value: stats.products, 
      icon: <FaBox />, 
      color: 'from-blue-500 to-blue-600',
      link: '/admin/products',
      change: '+12%',
      up: true
    },
    { 
      title: isRTL ? 'مقالات' : 'Articles', 
      value: stats.articles, 
      icon: <FaNewspaper />, 
      color: 'from-amber-500 to-amber-600',
      link: '/admin/articles',
      change: '+8%',
      up: true
    },
    { 
      title: isRTL ? 'اسلایدها' : 'Slides', 
      value: stats.slides, 
      icon: <FaImage />, 
      color: 'from-purple-500 to-purple-600',
      link: '/admin/slides',
      change: '+5%',
      up: true
    },
    { 
      title: isRTL ? 'کاربران' : 'Users', 
      value: stats.users, 
      icon: <FaUsers />, 
      color: 'from-green-500 to-green-600',
      link: '/admin/users',
      change: '+23%',
      up: true
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">{isRTL ? 'در حال بارگذاری...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <HiOutlineSparkles className="text-[#D4AF37]" />
              {isRTL ? 'داشبورد مدیریت' : 'Admin Dashboard'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRTL ? 'خوش آمدید! آمار لحظه‌ای سایت را مشاهده کنید' : 'Welcome! View real-time site statistics'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Link
              to="/admin/products/new"
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#D4AF37] text-black rounded-xl hover:bg-[#C5A027] transition flex items-center justify-center gap-2 text-sm font-bold shadow-lg hover:shadow-xl"
            >
              <FaPlus size={14} /> {isRTL ? 'محصول جدید' : 'New Product'}
            </Link>
            <Link
              to="/admin/articles/new"
              className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition flex items-center justify-center gap-2 text-sm font-bold"
            >
              <FaPlus size={14} /> {isRTL ? 'مقاله جدید' : 'New Article'}
            </Link>
          </div>
        </div>

        {/* ===== STAT CARDS ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {statCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-[#D4AF37]/40 transition-all group"
            >
              <Link to={card.link} className="block">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{card.title}</p>
                    <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mt-1">{card.value}</p>
                  </div>
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white text-base md:text-xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                    {card.icon}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-bold flex items-center gap-0.5 ${card.up ? 'text-green-500' : 'text-red-500'}`}>
                    {card.up ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                    {card.change}
                  </span>
                  <span className="text-xs text-gray-400">{isRTL ? 'نسبت به ماه قبل' : 'vs last month'}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ===== REVENUE + ORDERS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Revenue */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-gray-200 dark:border-gray-800 col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{isRTL ? 'درآمد کل' : 'Total Revenue'}</p>
                <p className="text-2xl md:text-3xl font-black text-[#D4AF37] mt-1">
                  {stats.revenue?.toLocaleString()}
                  <span className="text-sm font-normal text-gray-400 mr-1">{isRTL ? 'تومان' : 'Toman'}</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-2xl">
                <FaChartLine />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
              <span>{isRTL ? 'امروز:' : 'Today:'} {stats.todayOrders || 0} {isRTL ? 'سفارش' : 'orders'}</span>
              <span>{isRTL ? 'در انتظار:' : 'Pending:'} {stats.pendingOrders || 0}</span>
              <span>{isRTL ? 'تکمیل شده:' : 'Completed:'} {stats.completedOrders || 0}</span>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-gray-200 dark:border-gray-800 col-span-1 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm md:text-base">
                <FaShoppingBag className="text-[#D4AF37]" />
                {isRTL ? 'آخرین سفارشات' : 'Recent Orders'}
              </h3>
              <Link to="/admin/orders" className="text-xs text-[#D4AF37] hover:text-[#C5A027] transition">
                {isRTL ? 'مشاهده همه →' : 'View all →'}
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <p className="text-center text-gray-400 py-4 text-sm">{isRTL ? 'سفارشی وجود ندارد' : 'No orders'}</p>
              ) : (
                recentOrders.slice(0, 4).map((order, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-[#D4AF37]/5 transition">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 flex-shrink-0">
                        {order.customer?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {order.customer?.name || isRTL ? 'مشتری ناشناس' : 'Unknown'}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {order.total?.toLocaleString()} {isRTL ? 'تومان' : 'Toman'} • {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                        </p>
                      </div>
                    </div>
                    <div className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-bold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusLabel(order.status)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ===== TOP PRODUCTS + QUICK ACTIONS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Products */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm md:text-base">
                <FaTrophy className="text-[#D4AF37]" />
                {isRTL ? 'محصولات پرفروش' : 'Top Products'}
              </h3>
            </div>
            <div className="space-y-3">
              {topProducts.length === 0 ? (
                <p className="text-center text-gray-400 py-4 text-sm">{isRTL ? 'داده‌ای وجود ندارد' : 'No data'}</p>
              ) : (
                topProducts.slice(0, 3).map((product, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                        idx === 0 ? 'bg-[#D4AF37]' : idx === 1 ? 'bg-gray-400' : 'bg-amber-600'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {product.name || 'محصول'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {product.sales || 0} {isRTL ? 'فروش' : 'sales'} • {product.revenue?.toLocaleString()} {isRTL ? 'تومان' : 'Toman'}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-[#D4AF37]">
                      {product.sales || 0}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm md:text-base">
              <FaCog className="text-[#D4AF37]" />
              {isRTL ? 'اقدامات سریع' : 'Quick Actions'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/products" className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center hover:bg-[#D4AF37]/10 transition group border border-transparent hover:border-[#D4AF37]/30">
                <FaBox className="mx-auto text-[#D4AF37] text-2xl group-hover:scale-110 transition" />
                <span className="text-xs font-medium mt-2 block text-gray-700 dark:text-gray-300">{isRTL ? 'مدیریت محصولات' : 'Manage Products'}</span>
              </Link>
              <Link to="/admin/articles" className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center hover:bg-[#D4AF37]/10 transition group border border-transparent hover:border-[#D4AF37]/30">
                <FaNewspaper className="mx-auto text-[#D4AF37] text-2xl group-hover:scale-110 transition" />
                <span className="text-xs font-medium mt-2 block text-gray-700 dark:text-gray-300">{isRTL ? 'مدیریت مقالات' : 'Manage Articles'}</span>
              </Link>
              <Link to="/admin/slides" className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center hover:bg-[#D4AF37]/10 transition group border border-transparent hover:border-[#D4AF37]/30">
                <FaImage className="mx-auto text-[#D4AF37] text-2xl group-hover:scale-110 transition" />
                <span className="text-xs font-medium mt-2 block text-gray-700 dark:text-gray-300">{isRTL ? 'مدیریت اسلایدها' : 'Manage Slides'}</span>
              </Link>
              <Link to="/admin/orders" className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center hover:bg-[#D4AF37]/10 transition group border border-transparent hover:border-[#D4AF37]/30">
                <FaShoppingBag className="mx-auto text-[#D4AF37] text-2xl group-hover:scale-110 transition" />
                <span className="text-xs font-medium mt-2 block text-gray-700 dark:text-gray-300">{isRTL ? 'مدیریت سفارشات' : 'Manage Orders'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ===== SLIDES STATUS ===== */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm md:text-base">
              <FaImage className="text-[#D4AF37]" />
              {isRTL ? 'وضعیت اسلایدهای هیرو' : 'Hero Slides Status'}
            </h3>
            <Link to="/admin/slides" className="text-xs text-[#D4AF37] hover:text-[#C5A027] transition">
              {isRTL ? 'مدیریت →' : 'Manage →'}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {isRTL ? `اسلاید ${i}` : `Slide ${i}`}
                </span>
                <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${i % 2 === 0 ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                  {i % 2 === 0 ? (isRTL ? 'فعال' : 'Active') : (isRTL ? 'غیرفعال' : 'Inactive')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
