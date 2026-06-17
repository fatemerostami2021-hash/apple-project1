import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaBox,
  FaFilter, FaSortAmountDown, FaSortAmountUp, FaTag, FaDollarSign,
  FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminProducts() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('All');
  const [filterStock, setFilterStock] = useState('All');

  const getToken = () => localStorage.getItem('adminToken');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/products`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(isRTL ? 'آیا از حذف این محصول مطمئن هستید؟' : 'Are you sure?')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getLang = (data) => {
    if (!data) return '';
    return typeof data === 'object' ? (data[i18n.language] || data.en || '') : data;
  };

  // فیلتر و مرتب‌سازی
  const filteredProducts = products
    .filter(p => {
      const matchSearch = getLang(p.name).toLowerCase().includes(search.toLowerCase()) ||
        p.slug?.toLowerCase().includes(search.toLowerCase());
      const matchBrand = filterBrand === 'All' || p.brand === filterBrand;
      const matchStock = filterStock === 'All' || 
        (filterStock === 'InStock' && p.inStock !== false) ||
        (filterStock === 'OutOfStock' && p.inStock === false);
      return matchSearch && matchBrand && matchStock;
    });

  const brands = ['All', 'Apple', 'Samsung'];
  const stockOptions = [
    { value: 'All', label: isRTL ? 'همه' : 'All' },
    { value: 'InStock', label: isRTL ? 'موجود' : 'In Stock' },
    { value: 'OutOfStock', label: isRTL ? 'ناموجود' : 'Out of Stock' }
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

  const inStockCount = products.filter(p => p.inStock !== false).length;
  const outOfStockCount = products.filter(p => p.inStock === false).length;

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xl">
              <FaBox />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
                {isRTL ? 'مدیریت محصولات' : 'Products Management'}
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {products.length} {isRTL ? 'محصول' : 'products'} • {isRTL ? 'آخرین بروزرسانی' : 'Last updated'}: {new Date().toLocaleDateString('fa-IR')}
              </p>
            </div>
          </div>
          <Link
            to="/admin/products/new"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#D4AF37] text-black rounded-xl hover:bg-[#C5A027] transition flex items-center justify-center gap-2 text-sm font-bold shadow-lg hover:shadow-xl"
          >
            <FaPlus size={14} /> {isRTL ? 'محصول جدید' : 'New Product'}
          </Link>
        </div>

        {/* ===== STATS BAR ===== */}
        <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-3 border border-gray-200 dark:border-gray-800">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {inStockCount} {isRTL ? 'موجود' : 'In Stock'}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            {outOfStockCount} {isRTL ? 'ناموجود' : 'Out of Stock'}
          </span>
          <span className="flex items-center gap-2 text-[#D4AF37]">
            <FaTag size={12} />
            {filteredProducts.length} {isRTL ? 'نمایش داده شده' : 'displayed'}
          </span>
        </div>

        {/* ===== SEARCH & FILTERS ===== */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRTL ? 'جستجوی محصول بر اساس نام یا اسلاگ...' : 'Search by name or slug...'}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 focus:border-[#D4AF37] focus:outline-none transition text-gray-900 dark:text-white placeholder-gray-400 text-sm"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="px-4 py-3 pr-10 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 focus:border-[#D4AF37] focus:outline-none text-gray-900 dark:text-white text-sm appearance-none"
              >
                {brands.map(b => (
                  <option key={b} value={b}>
                    {b === 'All' ? (isRTL ? 'همه برندها' : 'All Brands') : b}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>

            <div className="relative">
              <select
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
                className="px-4 py-3 pr-10 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 focus:border-[#D4AF37] focus:outline-none text-gray-900 dark:text-white text-sm appearance-none"
              >
                {stockOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* ===== PRODUCTS LIST ===== */}
        <div className="grid grid-cols-1 gap-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-lg font-medium">{isRTL ? 'محصولی یافت نشد' : 'No products found'}</p>
              <p className="text-sm mt-1">{isRTL ? 'سعی کنید جستجوی خود را تغییر دهید' : 'Try changing your search'}</p>
              <Link to="/admin/products/new" className="text-[#D4AF37] hover:text-[#C5A027] mt-4 inline-block font-bold">
                {isRTL ? 'اولین محصول را اضافه کنید →' : 'Add your first product →'}
              </Link>
            </div>
          ) : (
            filteredProducts.map((product, idx) => {
              const isInStock = product.inStock !== false;
              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-5 hover:border-[#D4AF37]/40 transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Image */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                      <img
                        src={product.thumbnail || '/images/placeholder.png'}
                        alt={getLang(product.name)}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = '/images/placeholder.png'; }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] md:text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-bold">
                          {product.brand || 'Apple'}
                        </span>
                        <span className="text-[10px] md:text-xs text-gray-400">
                          {product.category || 'Product'}
                        </span>
                        <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium ${
                          isInStock 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {isInStock ? (isRTL ? 'موجود' : 'In Stock') : (isRTL ? 'ناموجود' : 'Out of Stock')}
                        </span>
                      </div>

                      <Link to={`/admin/products/edit/${product._id}`}>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white hover:text-[#D4AF37] transition line-clamp-1">
                          {getLang(product.name)}
                        </h3>
                      </Link>

                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaDollarSign size={12} className="text-[#D4AF37]" />
                          {product.price?.toLocaleString()} {isRTL ? 'تومان' : 'Toman'}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaTag size={12} />
                          {product.slug}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1.5 flex-shrink-0 self-start">
                      <Link
                        to={`/product/${product._id}`}
                        target="_blank"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
                        title={isRTL ? 'مشاهده در سایت' : 'View on site'}
                      >
                        <FaEye size={15} />
                      </Link>
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 transition"
                        title={isRTL ? 'ویرایش' : 'Edit'}
                      >
                        <FaEdit size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition"
                        title={isRTL ? 'حذف' : 'Delete'}
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* ===== FOOTER STATS ===== */}
        {filteredProducts.length > 0 && (
          <div className="text-center text-xs text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-800">
            {isRTL ? 'نمایش' : 'Showing'} {filteredProducts.length} {isRTL ? 'از' : 'of'} {products.length} {isRTL ? 'محصول' : 'products'}
          </div>
        )}
      </div>
    </div>
  );
}
