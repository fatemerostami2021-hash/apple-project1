import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaHome, FaBox, FaNewspaper, FaImage, FaShoppingBag, 
  FaUser, FaSignOutAlt, FaChartLine, FaCog 
} from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'fa';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <FaChartLine />, label: isRTL ? 'داشبورد' : 'Dashboard' },
    { path: '/admin/products', icon: <FaBox />, label: isRTL ? 'محصولات' : 'Products' },
    { path: '/admin/articles', icon: <FaNewspaper />, label: isRTL ? 'مقالات' : 'Articles' },
    { path: '/admin/slides', icon: <FaImage />, label: isRTL ? 'اسلایدها' : 'Slides' },
    { path: '/admin/orders', icon: <FaShoppingBag />, label: isRTL ? 'سفارشات' : 'Orders' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-[#D4AF37]">Admin Panel</h1>
          <p className="text-xs text-gray-500">v2.0</p>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition group"
            >
              <span className="text-gray-500 group-hover:text-[#D4AF37]">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 hover:text-red-500 transition"
          >
            <FaSignOutAlt className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{isRTL ? 'خروج' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
