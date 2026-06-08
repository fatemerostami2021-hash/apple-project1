import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineUpload, HiOutlinePhotograph, HiOutlineVideoCamera, 
  HiOutlinePlus, HiOutlineX, HiOutlineEye, HiOutlineCode,
  HiOutlineSave, HiOutlineTrash
} from 'react-icons/hi';

export default function AdminArticleForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
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
      const res = await fetch(`http://localhost:5000/api/admin/articles/${slug}`, {
        headers: { 'Authorization': 'Bearer ' + getToken() }
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
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await fetch(`http://localhost:5000/api/upload/image?type=${type}`, {
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

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file, 'covers');
    if (url) setFormData({ ...formData, cover: url });
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      const url = await uploadImage(file, 'gallery');
      if (url) setFormData({ ...formData, gallery: [...formData.gallery, url] });
    }
  };

  const removeGalleryImage = (index) => {
    const newGallery = [...formData.gallery];
    newGallery.splice(index, 1);
    setFormData({ ...formData, gallery: newGallery });
  };

  const addRelatedVideo = () => {
    setFormData({
      ...formData,
      relatedVideos: [...formData.relatedVideos, { id: '', title: '', duration: '' }]
    });
  };

  const updateRelatedVideo = (index, field, value) => {
    const newVideos = [...formData.relatedVideos];
    newVideos[index][field] = value;
    setFormData({ ...formData, relatedVideos: newVideos });
  };

  const removeRelatedVideo = (index) => {
    const newVideos = [...formData.relatedVideos];
    newVideos.splice(index, 1);
    setFormData({ ...formData, relatedVideos: newVideos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = slug ? 'PUT' : 'POST';
    const url = slug 
      ? `http://localhost:5000/api/admin/articles/${slug}`
      : 'http://localhost:5000/api/admin/articles';

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
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-amber-500/20 overflow-hidden"
        >
          {/* Header with Tabs */}
          <div className="border-b border-gray-800 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                {slug ? '✏️ ویرایش مقاله' : '✨ مقاله جدید'}
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                    activeTab === 'edit' 
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <HiOutlineCode size={16} />
                  ویرایش
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                    activeTab === 'preview' 
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <HiOutlineEye size={16} />
                  پیش‌نمایش
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'preview' ? (
              // Preview Mode
              <div className="space-y-6">
                {/* Cover Image Preview */}
                {formData.cover && (
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={formData.cover} alt="cover" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h1 className="text-3xl font-bold text-white">{formData.title.fa || 'عنوان فارسی'}</h1>
                      <div className="flex gap-3 mt-2 text-sm text-gray-300">
                        <span>{formData.brand}</span>
                        <span>•</span>
                        <span>{formData.readTime} دقیقه مطالعه</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Content Preview */}
                <div className="prose prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: formData.content.fa }} />
                </div>
                
                {/* Gallery Preview */}
                {formData.gallery.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-amber-400 mb-3">گالری تصاویر</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {formData.gallery.map((img, idx) => (
                        <img key={idx} src={img} alt="" className="rounded-lg h-32 w-full object-cover" />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Video Preview */}
                {formData.mainVideo.id && (
                  <div>
                    <h3 className="text-lg font-bold text-amber-400 mb-3">ویدیو بررسی</h3>
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <iframe 
                        src={`https://www.youtube.com/embed/${formData.mainVideo.id}`} 
                        className="w-full h-full"
                        title={formData.mainVideo.title}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Edit Mode Form
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">اسلاگ (آدرس یکتا)</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition"
                      required
                      disabled={!!slug}
                      placeholder="iphone-17-pro-max"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">برند</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                {/* Titles */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">عنوان فارسی</label>
                    <input
                      type="text"
                      value={formData.title.fa}
                      onChange={(e) => setFormData({ ...formData, title: { ...formData.title, fa: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">عنوان انگلیسی</label>
                    <input
                      type="text"
                      value={formData.title.en}
                      onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">📸 عکس شاخص (کاور)</label>
                  <div className="flex items-center gap-4">
                    {formData.cover && (
                      <div className="relative">
                        <img src={formData.cover} alt="cover" className="w-20 h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, cover: '' })}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                        >
                          <HiOutlineTrash size={10} />
                        </button>
                      </div>
                    )}
                    <label className="px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl cursor-pointer hover:bg-amber-500/20 transition flex items-center gap-2">
                      <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                      <HiOutlineUpload size={18} className="text-amber-400" />
                      <span className="text-amber-400 text-sm">{uploading ? 'در حال آپلود...' : 'انتخاب عکس'}</span>
                    </label>
                  </div>
                </div>

                {/* Gallery */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">🖼️ گالری تصاویر</label>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {formData.gallery.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
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

                {/* Main Video */}
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                  <h3 className="text-sm font-bold text-amber-400 mb-3">🎬 ویدیو اصلی</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={formData.mainVideo.id}
                      onChange={(e) => setFormData({ ...formData, mainVideo: { ...formData.mainVideo, id: e.target.value } })}
                      placeholder="YouTube ID"
                      className="px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      value={formData.mainVideo.title}
                      onChange={(e) => setFormData({ ...formData, mainVideo: { ...formData.mainVideo, title: e.target.value } })}
                      placeholder="عنوان"
                      className="px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      value={formData.mainVideo.duration}
                      onChange={(e) => setFormData({ ...formData, mainVideo: { ...formData.mainVideo, duration: e.target.value } })}
                      placeholder="مدت"
                      className="px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Related Videos */}
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-amber-400">📺 ویدیوهای مرتبط</h3>
                    <button type="button" onClick={addRelatedVideo} className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1">
                      <HiOutlinePlus size={14} /> افزودن
                    </button>
                  </div>
                  {formData.relatedVideos.map((video, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-2 mb-2 items-center">
                      <input
                        type="text"
                        value={video.id}
                        onChange={(e) => updateRelatedVideo(idx, 'id', e.target.value)}
                        placeholder="YouTube ID"
                        className="px-2 py-1.5 rounded bg-gray-800/50 border border-gray-700 text-white text-xs"
                      />
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) => updateRelatedVideo(idx, 'title', e.target.value)}
                        placeholder="عنوان"
                        className="px-2 py-1.5 rounded bg-gray-800/50 border border-gray-700 text-white text-xs col-span-2"
                      />
                      <input
                        type="text"
                        value={video.duration}
                        onChange={(e) => updateRelatedVideo(idx, 'duration', e.target.value)}
                        placeholder="مدت"
                        className="px-2 py-1.5 rounded bg-gray-800/50 border border-gray-700 text-white text-xs"
                      />
                      <button type="button" onClick={() => removeRelatedVideo(idx)} className="text-red-500 text-sm">✕</button>
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">📝 محتوا (HTML) - فارسی</label>
                  <textarea
                    value={formData.content.fa}
                    onChange={(e) => setFormData({ ...formData, content: { ...formData.content, fa: e.target.value } })}
                    rows={12}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 font-mono text-sm"
                    placeholder="<h1>عنوان مقاله</h1><p>متن مقاله...</p>"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">📝 محتوا (HTML) - انگلیسی</label>
                  <textarea
                    value={formData.content.en}
                    onChange={(e) => setFormData({ ...formData, content: { ...formData.content, en: e.target.value } })}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500 font-mono text-sm"
                  />
                </div>

                {/* Extra Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">⏱️ زمان مطالعه (دقیقه)</label>
                    <input
                      type="number"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">👤 نویسنده</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">🏷️ تگ‌ها (با کاما جدا کنید)</label>
                  <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-amber-500"
                    placeholder="آیفون, اپل, بررسی"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50 flex items-center gap-2"
                  >
                    <HiOutlineSave size={18} />
                    {loading ? 'در حال ذخیره...' : (slug ? 'به‌روزرسانی' : 'ذخیره مقاله')}
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
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
