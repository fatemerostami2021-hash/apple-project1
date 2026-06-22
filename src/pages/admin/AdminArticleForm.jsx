import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  HiOutlineUpload, HiOutlinePhotograph, HiOutlineVideoCamera, 
  HiOutlinePlus, HiOutlineX, HiOutlineEye, HiOutlineCode,
  HiOutlineSave, HiOutlineTrash, HiOutlineArrowLeft
} from 'react-icons/hi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminArticleForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  const [formData, setFormData] = useState({
    slug: '',
    brand: 'Apple',
    title: { fa: '', en: '' },
    content: { fa: '', en: '' },
    cover: '',
    gallery: [],
    mainVideo: { id: '', title: '', duration: '' },
    relatedVideos: [],
    readTime: 10,
    tags: [],
    author: 'مدیر سایت'
  });

  const getToken = () => localStorage.getItem('adminToken');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (slug) fetchArticle();
  }, [slug, navigate]);

  const fetchArticle = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/articles/${slug}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFormData({
          slug: data.slug,
          brand: data.brand,
          title: data.title || { fa: '', en: '' },
          content: data.content || { fa: '', en: '' },
          cover: data.cover || '',
          gallery: data.gallery || [],
          mainVideo: data.mainVideo || { id: '', title: '', duration: '' },
          relatedVideos: data.relatedVideos || [],
          readTime: data.readTime || 10,
          tags: data.tags || [],
          author: data.author || 'مدیر سایت'
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const uploadImage = async (file, type) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    
    try {
      const res = await fetch(`${API_URL}/api/upload/image?type=${type}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd
      });
      const data = await res.json();
      if (data.success) return data.url;
      return null;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file, 'covers');
    if (url) setFormData(prev => ({ ...prev, cover: url }));
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      const url = await uploadImage(file, 'gallery');
      if (url) setFormData(prev => ({ ...prev, gallery: [...prev.gallery, url] }));
    }
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => {
      const newGallery = [...prev.gallery];
      newGallery.splice(index, 1);
      return { ...prev, gallery: newGallery };
    });
  };

  const addRelatedVideo = () => {
    setFormData(prev => ({
      ...prev,
      relatedVideos: [...prev.relatedVideos, { id: '', title: '', duration: '' }]
    }));
  };

  const updateRelatedVideo = (index, field, value) => {
    setFormData(prev => {
      const newVideos = [...prev.relatedVideos];
      newVideos[index] = { ...newVideos[index], [field]: value };
      return { ...prev, relatedVideos: newVideos };
    });
  };

  const removeRelatedVideo = (index) => {
    setFormData(prev => {
      const newVideos = [...prev.relatedVideos];
      newVideos.splice(index, 1);
      return { ...prev, relatedVideos: newVideos };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = slug ? 'PUT' : 'POST';
    const url = slug 
      ? `${API_URL}/api/admin/articles/${slug}`
      : `${API_URL}/api/admin/articles`;

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
        navigate('/admin/articles');
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

  const inp = "w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition text-sm";

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/admin/articles')}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#D4AF37] transition mb-4 text-sm"
        >
          <HiOutlineArrowLeft className={isRTL ? 'rotate-180' : ''} />
          {isRTL ? 'بازگشت' : 'Back'}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="flex flex-wrap justify-between items-center gap-3 p-4 md:p-6 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">
              {slug ? '✏️ ویرایش مقاله' : '✨ مقاله جدید'}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition flex items-center gap-1.5 text-xs md:text-sm ${
                  activeTab === 'edit' 
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <HiOutlineCode size={16} />
                {isRTL ? 'ویرایش' : 'Edit'}
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition flex items-center gap-1.5 text-xs md:text-sm ${
                  activeTab === 'preview' 
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <HiOutlineEye size={16} />
                {isRTL ? 'پیش‌نمایش' : 'Preview'}
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 'preview' ? (
              <div className="space-y-6">
                {formData.cover && (
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={formData.cover} alt="cover" className="w-full h-48 md:h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h1 className="text-2xl md:text-3xl font-bold text-white">{formData.title.fa || 'عنوان فارسی'}</h1>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs md:text-sm text-gray-300">
                        <span>{formData.brand}</span>
                        <span>•</span>
                        <span>{formData.readTime} {isRTL ? 'دقیقه مطالعه' : 'min read'}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: formData.content.fa || formData.content.en }} />
                </div>
                {formData.gallery.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-[#D4AF37] mb-3">{isRTL ? 'گالری تصاویر' : 'Gallery'}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {formData.gallery.map((img, idx) => (
                        <img key={idx} src={img} alt="" className="rounded-lg h-24 md:h-32 w-full object-cover" />
                      ))}
                    </div>
                  </div>
                )}
                {formData.mainVideo.id && (
                  <div>
                    <h3 className="text-lg font-bold text-[#D4AF37] mb-3">{isRTL ? 'ویدیو بررسی' : 'Video Review'}</h3>
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <iframe 
                        src={`https://www.youtube.com/embed/${formData.mainVideo.id}`} 
                        className="w-full h-full"
                        title={formData.mainVideo.title}
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? 'اسلاگ (آدرس یکتا)' : 'Slug'}</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className={inp}
                      required
                      disabled={!!slug}
                      placeholder="iphone-17-pro-max"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? 'برند' : 'Brand'}</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      className={inp}
                      placeholder="Apple"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? 'عنوان فارسی' : 'Title (FA)'}</label>
                    <input
                      type="text"
                      value={formData.title.fa}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, fa: e.target.value } }))}
                      className={inp}
                      placeholder={isRTL ? 'عنوان فارسی' : 'Persian title'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? 'عنوان انگلیسی' : 'Title (EN)'}</label>
                    <input
                      type="text"
                      value={formData.title.en}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: { ...prev.title, en: e.target.value } }))}
                      className={inp}
                      placeholder="English title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? '📸 عکس شاخص (کاور)' : 'Cover Image'}</label>
                  <div className="flex flex-wrap items-center gap-4">
                    {formData.cover && (
                      <div className="relative">
                        <img src={formData.cover} alt="cover" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, cover: '' }))}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                        >
                          <HiOutlineTrash size={10} />
                        </button>
                      </div>
                    )}
                    <label className="px-4 py-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl cursor-pointer hover:bg-[#D4AF37]/20 transition flex items-center gap-2 text-sm">
                      <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                      <HiOutlineUpload size={18} className="text-[#D4AF37]" />
                      <span className="text-[#D4AF37] text-xs md:text-sm">{uploading ? 'در حال آپلود...' : 'انتخاب عکس'}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? '🖼️ گالری تصاویر' : 'Image Gallery'}</label>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {formData.gallery.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} alt="" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                        >
                          <HiOutlineX size={10} />
                        </button>
                      </div>
                    ))}
                    <label className="w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#D4AF37] transition group">
                      <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                      <HiOutlinePlus size={24} className="text-gray-500 group-hover:text-[#D4AF37]" />
                      <span className="text-[8px] md:text-[10px] text-gray-500 mt-0.5">{isRTL ? 'افزودن' : 'Add'}</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-[#D4AF37] mb-3">{isRTL ? '🎬 ویدیو اصلی' : 'Main Video'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={formData.mainVideo.id}
                      onChange={(e) => setFormData(prev => ({ ...prev, mainVideo: { ...prev.mainVideo, id: e.target.value } }))}
                      placeholder="YouTube ID"
                      className={inp}
                    />
                    <input
                      type="text"
                      value={formData.mainVideo.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, mainVideo: { ...prev.mainVideo, title: e.target.value } }))}
                      placeholder={isRTL ? 'عنوان' : 'Title'}
                      className={inp}
                    />
                    <input
                      type="text"
                      value={formData.mainVideo.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, mainVideo: { ...prev.mainVideo, duration: e.target.value } }))}
                      placeholder={isRTL ? 'مدت' : 'Duration'}
                      className={inp}
                    />
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-[#D4AF37]">{isRTL ? '📺 ویدیوهای مرتبط' : 'Related Videos'}</h3>
                    <button type="button" onClick={addRelatedVideo} className="text-xs text-[#D4AF37] hover:text-[#C5A027] flex items-center gap-1">
                      <HiOutlinePlus size={14} /> {isRTL ? 'افزودن' : 'Add'}
                    </button>
                  </div>
                  {formData.relatedVideos.map((video, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2 items-center">
                      <input
                        type="text"
                        value={video.id}
                        onChange={(e) => updateRelatedVideo(idx, 'id', e.target.value)}
                        placeholder="YouTube ID"
                        className={`${inp} col-span-1`}
                      />
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) => updateRelatedVideo(idx, 'title', e.target.value)}
                        placeholder={isRTL ? 'عنوان' : 'Title'}
                        className={`${inp} col-span-2`}
                      />
                      <input
                        type="text"
                        value={video.duration}
                        onChange={(e) => updateRelatedVideo(idx, 'duration', e.target.value)}
                        placeholder={isRTL ? 'مدت' : 'Duration'}
                        className={`${inp} col-span-1`}
                      />
                      <button type="button" onClick={() => removeRelatedVideo(idx)} className="text-red-500 text-sm col-span-1 sm:col-span-auto">✕</button>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? '📝 محتوا (HTML) - فارسی' : 'Content (HTML) - FA'}</label>
                  <textarea
                    value={formData.content.fa}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: { ...prev.content, fa: e.target.value } }))}
                    rows={10}
                    className={`${inp} font-mono text-xs md:text-sm resize-none`}
                    placeholder="<h1>عنوان مقاله</h1><p>متن مقاله...</p>"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? '📝 محتوا (HTML) - انگلیسی' : 'Content (HTML) - EN'}</label>
                  <textarea
                    value={formData.content.en}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: { ...prev.content, en: e.target.value } }))}
                    rows={8}
                    className={`${inp} font-mono text-xs md:text-sm resize-none`}
                    placeholder="<h1>Article Title</h1><p>Article content...</p>"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? '⏱️ زمان مطالعه (دقیقه)' : 'Read Time (min)'}</label>
                    <input
                      type="number"
                      value={formData.readTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, readTime: parseInt(e.target.value) || 0 }))}
                      className={inp}
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? '👤 نویسنده' : 'Author'}</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className={inp}
                      placeholder={isRTL ? 'مدیر سایت' : 'Admin'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">{isRTL ? '🏷️ تگ‌ها (با کاما جدا کنید)' : 'Tags (comma separated)'}</label>
                  <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))}
                    className={inp}
                    placeholder={isRTL ? 'آیفون, اپل, بررسی' : 'iPhone, Apple, Review'}
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 md:px-6 py-2.5 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C5A027] transition disabled:opacity-50 flex items-center gap-2 text-sm"
                  >
                    <HiOutlineSave size={18} />
                    {loading ? (isRTL ? 'در حال ذخیره...' : 'Saving...') : (slug ? (isRTL ? 'به‌روزرسانی' : 'Update') : (isRTL ? 'ذخیره مقاله' : 'Save Article'))}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/articles')}
                    className="px-5 md:px-6 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition text-sm"
                  >
                    {isRTL ? 'انصراف' : 'Cancel'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
