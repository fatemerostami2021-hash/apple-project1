import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HiOutlineSave, HiOutlineTrash, HiOutlineUpload } from 'react-icons/hi';
import AdminLayout from './AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminSlideForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: { fa: '', en: '' },
    subtitle: { fa: '', en: '' },
    description: { fa: '', en: '' },
    image: '',
    brand: 'Apple',
    articleSlug: '',
    productId: '',
    buttonText: { en: 'Buy Now', fa: 'خرید' },
    order: 0,
    active: true
  });

  const getToken = () => localStorage.getItem('adminToken');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (id) fetchSlide();
  }, [id]);

  const fetchSlide = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/slides/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await fetch(`${API_URL}/api/upload/image?type=slides`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setFormData({ ...formData, image: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = id ? 'PUT' : 'POST';
    const url = id 
      ? `${API_URL}/api/admin/slides/${id}`
      : `${API_URL}/api/admin/slides`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        navigate('/admin/slides');
      } else {
        const error = await res.json();
        alert('خطا: ' + (error.error || 'مشکلی پیش آمد'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('خطا در ارتباط با سرور');
    }
    setLoading(false);
  };

  const inp = "w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 transition";
  const lbl = "block text-sm text-gray-400 mb-1";

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6"
      >
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-6">
          {id ? '✏️ ویرایش اسلاید' : '✨ اسلاید جدید'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* عنوان‌ها */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>{isRTL ? 'عنوان فارسی' : 'Title (FA)'}</label>
              <input
                className={inp}
                value={formData.title.fa}
                onChange={(e) => setFormData({ ...formData, title: { ...formData.title, fa: e.target.value } })}
                placeholder="عنوان فارسی"
              />
            </div>
            <div>
              <label className={lbl}>{isRTL ? 'عنوان انگلیسی' : 'Title (EN)'}</label>
              <input
                className={inp}
                value={formData.title.en}
                onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                placeholder="English title"
              />
            </div>
          </div>

          {/* زیرعنوان‌ها */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>{isRTL ? 'زیرعنوان فارسی' : 'Subtitle (FA)'}</label>
              <input
                className={inp}
                value={formData.subtitle.fa}
                onChange={(e) => setFormData({ ...formData, subtitle: { ...formData.subtitle, fa: e.target.value } })}
                placeholder="زیرعنوان فارسی"
              />
            </div>
            <div>
              <label className={lbl}>{isRTL ? 'زیرعنوان انگلیسی' : 'Subtitle (EN)'}</label>
              <input
                className={inp}
                value={formData.subtitle.en}
                onChange={(e) => setFormData({ ...formData, subtitle: { ...formData.subtitle, en: e.target.value } })}
                placeholder="English subtitle"
              />
            </div>
          </div>

          {/* برند و ترتیب */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>{isRTL ? 'برند' : 'Brand'}</label>
              <select
                className={inp}
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Concept">Concept</option>
              </select>
            </div>
            <div>
              <label className={lbl}>{isRTL ? 'ترتیب' : 'Order'}</label>
              <input
                className={inp}
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                placeholder="0"
              />
            </div>
          </div>

          {/* تصویر */}
          <div>
            <label className={lbl}>{isRTL ? '📸 تصویر اسلاید' : 'Slide Image'}</label>
            <div className="flex items-center gap-4">
              {formData.image && (
                <div className="relative">
                  <img src={formData.image} alt="slide" className="w-32 h-20 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                  >
                    <HiOutlineTrash size={10} />
                  </button>
                </div>
              )}
              <label className="px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl cursor-pointer hover:bg-amber-500/20 transition flex items-center gap-2">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <HiOutlineUpload size={18} className="text-amber-400" />
                <span className="text-amber-400 text-sm">{uploading ? 'در حال آپلود...' : 'انتخاب عکس'}</span>
              </label>
            </div>
          </div>

          {/* لینک‌ها */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>{isRTL ? 'اسلاگ مقاله' : 'Article Slug'}</label>
              <input
                className={inp}
                value={formData.articleSlug}
                onChange={(e) => setFormData({ ...formData, articleSlug: e.target.value })}
                placeholder="iphone-17-pro-max-review"
              />
            </div>
            <div>
              <label className={lbl}>{isRTL ? 'شناسه محصول' : 'Product ID'}</label>
              <input
                className={inp}
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                placeholder="67f5b3..."
              />
            </div>
          </div>

          {/* دکمه‌ها */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>{isRTL ? 'متن دکمه فارسی' : 'Button Text (FA)'}</label>
              <input
                className={inp}
                value={formData.buttonText.fa}
                onChange={(e) => setFormData({ ...formData, buttonText: { ...formData.buttonText, fa: e.target.value } })}
                placeholder="خرید"
              />
            </div>
            <div>
              <label className={lbl}>{isRTL ? 'متن دکمه انگلیسی' : 'Button Text (EN)'}</label>
              <input
                className={inp}
                value={formData.buttonText.en}
                onChange={(e) => setFormData({ ...formData, buttonText: { ...formData.buttonText, en: e.target.value } })}
                placeholder="Buy Now"
              />
            </div>
          </div>

          {/* فعال */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 accent-amber-500"
              />
              <span className="text-sm text-gray-400">{isRTL ? 'فعال' : 'Active'}</span>
            </label>
          </div>

          {/* دکمه‌های عملیات */}
          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
            >
              <HiOutlineSave size={18} />
              {loading ? 'در حال ذخیره...' : (id ? 'به‌روزرسانی' : 'ذخیره اسلاید')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/slides')}
              className="px-6 py-2.5 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition"
            >
              {isRTL ? 'انصراف' : 'Cancel'}
            </button>
          </div>
        </form>
      </motion.div>
    </AdminLayout>
  );
}
