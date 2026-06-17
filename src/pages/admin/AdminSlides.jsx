import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import AdminLayout from './AdminLayout';

export default function AdminSlides() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem('adminToken');

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/slides', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSlides(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(isRTL ? 'آیا از حذف این اسلاید مطمئن هستید؟' : 'Are you sure?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/admin/slides/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) fetchSlides();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              {isRTL ? 'مدیریت اسلایدها' : 'Slides Management'}
            </h1>
            <p className="text-sm text-gray-500">{slides.length} {isRTL ? 'اسلاید' : 'slides'}</p>
          </div>
          <Link
            to="/admin/slides/new"
            className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C5A027] transition flex items-center gap-2"
          >
            <FaPlus /> {isRTL ? 'اسلاید جدید' : 'New Slide'}
          </Link>
        </div>

        <div className="grid gap-4">
          {slides.map((slide, idx) => (
            <motion.div
              key={slide._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4"
            >
              <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={slide.image || '/images/placeholder.png'}
                  alt={slide.title?.en}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {slide.title?.fa || slide.title?.en}
                </h3>
                <p className="text-sm text-gray-500">
                  {isRTL ? 'ترتیب' : 'Order'}: {slide.order} • {slide.brand}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-[#D4AF37] transition">
                  <FaArrowUp />
                </button>
                <button className="p-2 text-gray-400 hover:text-[#D4AF37] transition">
                  <FaArrowDown />
                </button>
                <Link
                  to={`/admin/slides/edit/${slide._id}`}
                  className="p-2 text-blue-500 hover:text-blue-600 transition"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(slide._id)}
                  className="p-2 text-red-500 hover:text-red-600 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
