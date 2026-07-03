import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineUpload, HiOutlinePhotograph, HiOutlinePlus, 
  HiOutlineX, HiOutlineSave, HiOutlineTrash, HiOutlineSparkles
} from 'react-icons/hi';
import { FaMagic } from 'react-icons/fa';

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [formData, setFormData] = useState({
    name: { fa: '', en: '' },
    slug: '',
    brand: 'Apple',
    category: 'Phone',
    price: '',
    thumbnail: '',
    images: [],
    description: { fa: '', en: '' },
    inStock: true,
    tags: []
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const getToken = () => localStorage.getItem('adminToken');

  // ============================================================
  // ✨ تکمیل با AI
  // ============================================================
  const handleAIComplete = async () => {
    if (!formData.name.fa && !formData.name.en) {
      alert('لطفاً حداقل نام محصول را وارد کنید');
      return;
    }

    setAiLoading(true);
    setAiError(null);

    try {
      const res = await fetch(`${API_URL}/api/agent/complete-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.en || formData.name.fa,
          brand: formData.brand,
          category: formData.category,
          existingData: {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            tags: formData.tags,
          }
        }),
      });

      const result = await res.json();

      if (result.success) {
        setFormData(prev => ({
          ...prev,
          description: {
            fa: result.data.description?.fa || prev.description.fa,
            en: result.data.description?.en || prev.description.en,
          },
          price: result.data.price || prev.price,
          tags: result.data.tags || prev.tags,
          // specs: result.data.specs || prev.specs,
        }));
      } else {
        setAiError(result.error || 'خطا در تکمیل خودکار');
      }
    } catch (error) {
      setAiError('خطا در ارتباط با سرور');
    } finally {
      setAiLoading(false);
    }
  };

  // ============================================================
  // 📥 دریافت محصول برای ویرایش
  // ============================================================
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (id) fetchProduct();
  }, [id, navigate]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        headers: { 'Authorization': 'Bearer ' + getToken() }
      });
      if (res.ok) {
        const data = await res.json();
        setFormData({
          name: data.name || { fa: '', en: '' },
          slug: data.slug || '',
          brand: data.brand || 'Apple',
          category: data.category || 'Phone',
          price: data.price || '',
          thumbnail: data.thumbnail || '',
          images: data.images || [],
          description: data.description || { fa: '', en: '' },
          inStock: data.inStock !== false,
          tags: data.tags || []
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ============================================================
  // 📤 آپلود تصاویر
  // ============================================================
  const uploadImage = async (file, type) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await fetch(`${API_URL}/api/upload/image?type=${type}`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + getToken() },
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

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file, 'products');
    if (url) setFormData({ ...formData, thumbnail: url });
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      const url = await uploadImage(file, 'products');
      if (url) setFormData({ ...formData, images: [...formData.images, url] });
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  // ============================================================
  // 💾 ذخیره محصول
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = id ? 'PUT' : 'POST';
    const url = id 
      ? `${API_URL}/api/admin/products/${id}`
      : `${API_URL}/api/admin/products`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        navigate('/admin/dashboard');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-amber-500/20 overflow-hidden"
        >
          <div className="border-b border-gray-800 px-6 py-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {id ? '✏️ ویرایش محصول' : '✨ محصول جدید'}
            </h1>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* ============================================================
                  ✨ دکمه تکمیل با AI
                  ============================================================ */}
              <div className="flex items-center justify-between p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                <div>
                  <h3 className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                    <FaMagic className="text-sm" />
                    تکمیل خودکار با AI
                  </h3>
                  <p className="text-xs text-gray-500">
                    توضیحات، قیمت و تگ‌ها را به‌صورت خودکار تکمیل می‌کند
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAIComplete}
                  disabled={aiLoading || (!formData.name.fa && !formData.name.en)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all
                    ${aiLoading || (!formData.name.fa && !formData.name.en)
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:scale-105'
                    }
                  `}
                >
                  {aiLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                      در حال تکمیل...
                    </>
                  ) : (
                    <>
                      <HiOutlineSparkles className="text-sm" />
                      تکمیل با AI
                    </>
                  )}
                </button>
              </div>

              {aiError && (
                <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg">
                  ❌ {aiError}
                </div>
              )}

              {/* ============================================================
                  اطلاعات پایه
                  ============================================================ */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">نام فارسی</label>
                  <input
                    type="text"
                    value={formData.name.fa}
                    onChange={(e) => setFormData({ ...formData, name: { ...formData.name, fa: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 transition"
                    placeholder="آیفون ۱۷ پرو مکس"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">نام انگلیسی</label>
                  <input
                    type="text"
                    value={formData.name.en}
                    onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 transition"
                    placeholder="iPhone 17 Pro Max"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">اسلاگ (آدرس یکتا)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 transition"
                    placeholder="iphone-17-pro-max"
                    required
                    disabled={!!id}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">قیمت (تومان)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 transition"
                    placeholder="85000000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">برند</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 transition"
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">دسته‌بندی</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 transition"
                  >
                    <option value="Phone">گوشی</option>
                    <option value="Tablet">تبلت</option>
                    <option value="Laptop">لپ‌تاپ</option>
                    <option value="Watch">ساعت</option>
                    <option value="Accessory">لوازم جانبی</option>
                  </select>
                </div>
              </div>

              {/* ============================================================
                  تصویر شاخص
                  ============================================================ */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">📸 تصویر شاخص</label>
                <div className="flex items-center gap-4">
                  {formData.thumbnail && (
                    <div className="relative">
                      <img src={formData.thumbnail} alt="thumbnail" className="w-24 h-24 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, thumbnail: '' })}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                      >
                        <HiOutlineTrash size={10} />
                      </button>
                    </div>
                  )}
                  <label className="px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl cursor-pointer hover:bg-amber-500/20 transition flex items-center gap-2">
                    <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="hidden" />
                    <HiOutlineUpload size={18} className="text-amber-400" />
                    <span className="text-amber-400 text-sm">{uploading ? 'در حال آپلود...' : 'انتخاب عکس'}</span>
                  </label>
                </div>
              </div>

              {/* ============================================================
                  گالری تصاویر
                  ============================================================ */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">🖼️ گالری تصاویر</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                      >
                        <HiOutlineX size={10} />
                      </button>
                    </div>
                  ))}
                  <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-amber-500 transition group">
                    <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                    <HiOutlinePlus size={24} className="text-gray-500 group-hover:text-amber-400" />
                    <span className="text-[10px] text-gray-500 mt-1">افزودن</span>
                  </label>
                </div>
              </div>

              {/* ============================================================
                  توضیحات
                  ============================================================ */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">توضیحات فارسی</label>
                <textarea
                  value={formData.description.fa}
                  onChange={(e) => setFormData({ ...formData, description: { ...formData.description, fa: e.target.value } })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500"
                  placeholder="توضیحات کامل محصول به فارسی..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">توضیحات انگلیسی</label>
                <textarea
                  value={formData.description.en}
                  onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500"
                  placeholder="Product description in English..."
                />
              </div>

              {/* ============================================================
                  تگ‌ها و موجودی
                  ============================================================ */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">🏷️ تگ‌ها (با کاما جدا کنید)</label>
                  <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500"
                    placeholder="پرچمدار, آیفون, جدید"
                  />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <span className="text-sm text-gray-400">موجود در انبار</span>
                  </label>
                </div>
              </div>

              {/* ============================================================
                  دکمه‌های عملیات
                  ============================================================ */}
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50 flex items-center gap-2"
                >
                  <HiOutlineSave size={18} />
                  {loading ? 'در حال ذخیره...' : (id ? 'به‌روزرسانی' : 'ذخیره محصول')}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-6 py-2.5 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}