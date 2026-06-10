import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineEye } from 'react-icons/hi';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('admin_token') || localStorage.getItem('adminToken');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchArticles();
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/articles`, {
        headers: { 'Authorization': 'Bearer ' + getToken() }
      });
      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm('آیا از حذف این مقاله مطمئن هستید؟')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/articles/${slug}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + getToken() }
      });
      if (res.ok) {
        fetchArticles();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin_authenticated');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-sm border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              پنل مدیریت
            </h1>
            <p className="text-xs text-gray-500">{articles.length} مقاله</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/articles/new" className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-600 transition flex items-center gap-2 text-sm">
              <HiOutlinePlus size={18} />
              مقاله جدید
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm">
              خروج
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-4">
          {articles.map((article, idx) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800 p-4 hover:border-amber-500/30 transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                      {article.brand || 'Apple'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(article.publishDate).toLocaleDateString('fa-IR')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {article.title?.fa || article.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-1">
                    اسلاگ: {article.slug}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/article/${article.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg text-gray-400 hover:text-amber-500 transition"
                  >
                    <HiOutlineEye size={18} />
                  </Link>
                  <Link
                    to={`/admin/articles/edit/${article.slug}`}
                    className="p-2 rounded-lg text-gray-400 hover:text-blue-500 transition"
                  >
                    <HiOutlinePencil size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(article.slug)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 transition"
                  >
                    <HiOutlineTrash size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
