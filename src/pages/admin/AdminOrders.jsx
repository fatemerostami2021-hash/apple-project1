import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaEye, FaSearch } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminOrders() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem('adminToken');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-500',
      paid: 'bg-blue-500/20 text-blue-500',
      processing: 'bg-purple-500/20 text-purple-500',
      shipped: 'bg-cyan-500/20 text-cyan-500',
      delivered: 'bg-green-500/20 text-green-500',
      cancelled: 'bg-red-500/20 text-red-500'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-500/20 text-gray-500';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: isRTL ? 'در انتظار' : 'Pending',
      paid: isRTL ? 'پرداخت شده' : 'Paid',
      processing: isRTL ? 'در حال پردازش' : 'Processing',
      shipped: isRTL ? 'ارسال شده' : 'Shipped',
      delivered: isRTL ? 'تحویل داده شده' : 'Delivered',
      cancelled: isRTL ? 'لغو شده' : 'Cancelled'
    };
    return labels[status?.toLowerCase()] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <FaShoppingBag className="text-[#D4AF37] text-2xl" />
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                {isRTL ? 'مدیریت سفارشات' : 'Orders Management'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {orders.length} {isRTL ? 'سفارش' : 'orders'} {isRTL ? 'در دیتابیس' : 'in database'}
              </p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="grid gap-4">
          {orders.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-2xl mb-2">🛒</p>
              <p className="text-lg">{isRTL ? 'سفارشی وجود ندارد' : 'No orders found'}</p>
            </div>
          ) : (
            orders.map((order, idx) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-5 hover:border-[#D4AF37]/40 transition hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        #{String(order._id).slice(-6).toUpperCase()}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full ${getStatusColor(order.status)} font-bold`}>
                        {getStatusLabel(order.status)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('fa-IR') : ''}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {order.customer?.name || isRTL ? 'مشتری ناشناس' : 'Unknown customer'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.items?.length || 0} {isRTL ? 'محصول' : 'items'} • 
                      {order.total?.toLocaleString()} {isRTL ? 'تومان' : 'Toman'}
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0 self-start">
                    <button className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition">
                      <FaEye size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
