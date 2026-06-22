import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useKeenSlider } from 'keen-slider/react';
import { 
  FaShoppingCart, FaEye, FaArrowRight, 
  FaMicrochip, FaBatteryFull, FaDesktop,
  FaCheck, FaPlay, FaStar, FaHeart, FaShare
} from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';
import 'keen-slider/keen-slider.min.css';

// ============================================================
// داده‌های مک‌بوک
// ============================================================
const macbookData = [
  {
    id: 'macbook-pro-m4',
    slug: 'macbook-pro-m4',
    name: { en: 'MacBook Pro M4', fa: 'مک‌بوک پرو M4' },
    tagline: { en: 'The most powerful MacBook ever', fa: 'قدرتمندترین مک‌بوک تاریخ' },
    priceDisplay: '$1,999',
    chip: 'M4 Pro / Max',
    display: 'Liquid Retina XDR',
    battery: '22 Hours',
    colors: ['#1d1d1f', '#f5f5f7', '#d4af37'],
    image: '/assets/macbook/macbook-pro.png',
    gallery: [
      '/assets/macbook/macbook-pro.png',
      '/assets/macbook/mackbook-pro-14-m3.png',
      '/assets/macbook/mackbook-pro-13-inch.png'
    ],
    features: [
      { en: '16-core CPU, 40-core GPU', fa: '۱۶ هسته پردازشی، ۴۰ هسته گرافیکی' },
      { en: 'Up to 128GB Unified Memory', fa: 'تا ۱۲۸ گیگابایت حافظه یکپارچه' },
      { en: '1600 nits Peak Brightness', fa: '۱۶۰۰ نیت حداکثر روشنایی' }
    ],
    description: {
      en: 'Mind-blowing. Eye-opening. The new MacBook Pro is a beast with M4 chip.',
      fa: 'خیره کننده. فراتر از تصور. مک‌بوک پرو جدید با تراشه M4 یک غول واقعی است.'
    },
    articleSlug: 'macbook-pro-m4-review',
    videoId: 'mxdLZSiXbPQ',
    rating: 4.9,
    reviews: 5234
  },
  {
    id: 'macbook-air-m3',
    slug: 'macbook-air-m3',
    name: { en: 'MacBook Air M3', fa: 'مک‌بوک ایر M3' },
    tagline: { en: 'Lean. Mean. M3 machine.', fa: 'بسیار نازک. بسیار قدرتمند.' },
    priceDisplay: '$1,099',
    chip: 'M3 Chip',
    display: 'Liquid Retina',
    battery: '18 Hours',
    colors: ['#f5f5f7', '#2d2d2d', '#4d4d4f'],
    image: '/assets/macbook/macboo-air-m3--.png',
    gallery: [
      '/assets/macbook/macboo-air-m3--.png',
      '/assets/macbook/mackbook-pro-13-inch.png'
    ],
    features: [
      { en: 'Superlight and under half inch thin', fa: 'فوق سبک و ضخامت کمتر از نیم اینچ' },
      { en: 'Powerful 8-core CPU', fa: 'پردازنده قدرتمند ۸ هسته‌ای' },
      { en: 'Silent, fanless design', fa: 'طراحی بدون فن و کاملاً بی‌صدا' }
    ],
    description: {
      en: 'Designed to go everywhere. Powerful enough for everything.',
      fa: 'طراحی شده برای همه جا. به اندازه کافی قدرتمند برای هر کاری.'
    },
    articleSlug: 'macbook-air-m3-review',
    videoId: 'mxdLZSiXbPQ',
    rating: 4.8,
    reviews: 4123
  }
];

// ============================================================
// کامپوننت: MacBookHero
// ============================================================
const MacBookHero = ({ isRTL, selectedModel, onBuyNow }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);
  
  const words = isRTL 
    ? ['قدرت محض', 'طراحی هوشمند', 'خلاقیت بی‌پایان']
    : ['Pure Power', 'Smart Design', 'Infinite Creativity'];

  useEffect(() => {
    const currentWord = words[loop % words.length];
    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoop(loop + 1);
      } else {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loop, words]);

  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden py-12">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="text-[10px] font-black text-amber-500 tracking-[0.25em] uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              MacBook
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500">
              {isRTL ? 'مک‌بوک' : 'MacBook'}
            </span>
          </h1>

          <div className="h-12 md:h-16 text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-200">
            {text}
            <span className="animate-pulse text-amber-500">|</span>
          </div>

          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-3 max-w-md font-medium">
            {isRTL 
              ? 'قدرتمندترین و نازک‌ترین مک‌بوک‌های تاریخ با تراشه‌های M3 و M4'
              : 'The most powerful and thinnest MacBooks ever with M3 and M4 chips'}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
            <button 
              onClick={onBuyNow}
              className="px-7 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-full font-extrabold hover:shadow-xl transition-all flex items-center gap-2 text-sm tracking-wide"
            >
              <FaShoppingCart size={14} />
              {isRTL ? 'خرید کنید' : 'Buy Now'}
            </button>
            <a 
              href="#explore" 
              className="px-7 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-full font-extrabold hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2 text-sm"
            >
              {isRTL ? 'کشف کنید' : 'Explore'}
              <FaArrowRight size={14} />
            </a>
          </div>

          <div className="flex flex-wrap gap-5 mt-6 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300">
              <FaMicrochip className="text-amber-500" size={15} />
              <span>M3 / M4</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300">
              <FaBatteryFull className="text-amber-500" size={15} />
              <span>18-22h</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300">
              <FaDesktop className="text-amber-500" size={15} />
              <span>Liquid Retina</span>
            </div>
          </div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.img
            src={selectedModel.image}
            alt={selectedModel.name.en}
            className="w-[80%] max-w-[450px] drop-shadow-2xl"
            whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250 }}
          />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-neutral-400"
      >
        <div className="h-5 w-0.5 bg-amber-500/40 mx-auto animate-pulse" />
        <span className="mt-1 block text-[7px] uppercase tracking-[0.2em] opacity-40 font-bold">
          {isRTL ? 'اسکرول' : 'Scroll'}
        </span>
      </motion.div>
    </section>
  );
};

// ============================================================
// کامپوننت: MacBookModelCard
// ============================================================
const MacBookModelCard = ({ model, isRTL, selected, onSelect }) => {
  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[isRTL ? 'fa' : 'en'] || data.en || '';
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onSelect(model)}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer backdrop-blur-xl bg-white/40 dark:bg-black/30 border transition-all duration-500 p-6 text-center ${
        selected?.id === model.id
          ? 'border-amber-500 ring-2 ring-amber-500/50 shadow-2xl shadow-amber-500/20'
          : 'border-white/60 dark:border-white/10 hover:border-amber-400/50'
      }`}
    >
      <div className="w-40 h-40 mx-auto mb-3 flex items-center justify-center">
        <img
          src={model.image}
          alt={getLangText(model.name)}
          className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-lg font-black text-gray-900 dark:text-white">
        {getLangText(model.name)}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{model.chip}</p>
      <div className="mt-2 flex justify-center gap-2">
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 font-bold">
          {model.rating} ⭐
        </span>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-600 font-bold">
          {model.reviews} reviews
        </span>
      </div>
    </motion.div>
  );
};

// ============================================================
// کامپوننت: MacBookDetail
// ============================================================
const MacBookDetail = ({ model, isRTL, onAddToCart, onViewArticle, isAdded }) => {
  const [activeImg, setActiveImg] = useState(model.image);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(model.colors[0]);

  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[isRTL ? 'fa' : 'en'] || data.en || '';
  };

  const [sliderRef] = useKeenSlider({
    slides: { perView: 2, spacing: 15 },
    breakpoints: { "(min-width: 768px)": { slides: { perView: 3 } } }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/50 dark:bg-black/40 border border-white/70 dark:border-white/15 shadow-2xl p-6 md:p-8"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={activeImg}
                alt={getLangText(model.name)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-h-[350px] object-contain"
              />
            </AnimatePresence>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition"
            >
              <FaHeart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
            </button>
          </div>

          <div className="flex gap-2 mt-3 justify-center">
            {model.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition ${
                  activeImg === img ? 'border-amber-500' : 'border-transparent hover:border-amber-300'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-3">
            {model.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-7 h-7 rounded-full border-2 transition ${
                  selectedColor === color ? 'border-amber-500 scale-110' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={isRTL ? "text-right" : "text-left"}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold bg-amber-500/20 text-amber-600 px-3 py-1 rounded-full">
              {model.rating} ⭐
            </span>
            <span className="text-xs text-gray-400">({model.reviews} reviews)</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-3">
            {getLangText(model.name)}
          </h2>
          <p className="text-xl font-bold text-amber-500 mt-2">
            {model.priceDisplay}
          </p>

          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed text-sm">
            {getLangText(model.description)}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-wider">{isRTL ? 'تراشه' : 'Chip'}</p>
              <p className="font-extrabold text-sm">{model.chip}</p>
            </div>
            <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-wider">{isRTL ? 'نمایشگر' : 'Display'}</p>
              <p className="font-extrabold text-sm">{model.display}</p>
            </div>
            <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-wider">{isRTL ? 'باتری' : 'Battery'}</p>
              <p className="font-extrabold text-sm">{model.battery}</p>
            </div>
            <div className="bg-white/30 dark:bg-black/20 rounded-xl p-3">
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-wider">{isRTL ? 'دوربین' : 'Camera'}</p>
              <p className="font-extrabold text-sm">12MP Center Stage</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => onAddToCart(model)}
              className={`flex-1 py-3 rounded-full font-extrabold transition flex items-center justify-center gap-2 text-sm tracking-wide ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:shadow-xl'
              }`}
            >
              {isAdded ? (
                <><FaCheck size={14} /> {isRTL ? 'افزوده شد' : 'Added'}</>
              ) : (
                <><FaShoppingCart size={14} /> {isRTL ? 'خرید' : 'Buy'}</>
              )}
            </button>

            <Link
              to={`/articles/${model.articleSlug}`}
              className="flex-1 py-3 border-2 border-amber-500 text-amber-500 rounded-full font-extrabold hover:bg-amber-500 hover:text-black transition flex items-center justify-center gap-2 text-sm tracking-wide"
            >
              <FaEye size={14} />
              {isRTL ? 'مشاهده مقاله' : 'Read Article'}
            </Link>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
            <FaShare size={12} />
            <span>{isRTL ? 'اشتراک‌گذاری' : 'Share'}</span>
          </div>
        </div>
      </div>

      {/* Similar Products Slider */}
      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
        <h4 className="text-lg font-black mb-4">{isRTL ? 'مدل‌های مشابه' : 'Similar Models'}</h4>
        <div ref={sliderRef} className="keen-slider">
          {macbookData.filter(m => m.id !== model.id).map((m) => (
            <div key={m.id} className="keen-slider__slide px-2">
              <div
                onClick={() => window.location.reload()}
                className="bg-white/30 dark:bg-black/30 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-lg transition text-center"
              >
                <img src={m.image} className="h-20 mx-auto object-contain mb-2" alt={m.name.en} />
                <p className="text-xs font-bold">{isRTL ? m.name.fa : m.name.en}</p>
                <p className="text-amber-500 font-bold text-xs">{m.priceDisplay}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// کامپوننت: RelatedProducts
// ============================================================
const RelatedProducts = ({ isRTL, onViewProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products?brand=Apple&category=Laptop`);
        const data = await res.json();
        setProducts(data.products || data || []);
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getLangText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return data[isRTL ? 'fa' : 'en'] || data.en || '';
  };

  if (loading || products.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-black mb-6 text-center">
        {isRTL ? 'محصولات مرتبط' : 'Related Products'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ y: -4 }}
            className="bg-white/30 dark:bg-black/30 rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-amber-400/50 transition cursor-pointer"
            onClick={() => onViewProduct(product)}
          >
            <img
              src={product.thumbnail || '/images/placeholder.png'}
              alt={getLangText(product.name)}
              className="w-full h-28 object-contain mb-2"
              onError={(e) => e.target.src = '/images/placeholder.png'}
            />
            <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
              {getLangText(product.name)}
            </h4>
            <p className="text-sm font-bold text-amber-500">
              ${product.price?.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// کامپوننت: VideoSection
// ============================================================
const VideoSection = ({ isRTL, videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl md:text-5xl font-black mb-2">Cinematic Experience</h2>
        <p className="opacity-50 text-sm font-medium">
          {isRTL ? "مک‌بوک پرو M4 در عمل" : "M4 MacBook Pro in action"}
        </p>
      </motion.div>

      <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-black/90">
        {!isPlaying ? (
          <div className="relative w-full h-full cursor-pointer group" onClick={handlePlay}>
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover opacity-40"
              onError={(e) => {
                e.target.src = "https://img.youtube.com/vi/${videoId}/hqdefault.jpg";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center hover:scale-110 transition shadow-2xl shadow-amber-500/30 group-hover:shadow-amber-500/50">
                <FaPlay size={36} className="text-black ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-bold tracking-widest">
              {isRTL ? "برای پخش کلیک کنید" : "Click to play"}
            </div>
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

// ============================================================
// کامپوننت اصلی: MacbookPage
// ============================================================
export default function MacbookPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { add } = useCart();
  const isRTL = i18n.language === 'fa';
  const lang = i18n.language === 'fa' ? 'fa' : 'en';

  const [selectedModel, setSelectedModel] = useState(macbookData[0]);
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (product) => {
    add(product, 1);
    const key = product.id || product._id;
    setAddedToCart(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setAddedToCart(prev => ({ ...prev, [key]: false })), 2000);
  };

  const handleBuyNow = () => navigate('/cart');
  const handleViewArticle = (product) => {
    if (product.articleSlug) {
      navigate(`/articles/${product.articleSlug}`);
    }
  };
  const handleViewProduct = (product) => {
    navigate(`/product/${product.slug || product._id}`);
  };

  const isAdded = (product) => addedToCart[product.id || product._id] || false;

  return (
    <main className={`min-h-screen bg-transparent ${isRTL ? 'font-vazir' : 'font-sans'}`}>
      <Helmet>
        <title>MacBook | Apple World</title>
        <meta name="description" content="Explore the latest MacBooks with M3 and M4 chips" />
      </Helmet>

      {/* ===== Hero ===== */}
      <MacBookHero
        isRTL={isRTL}
        selectedModel={selectedModel}
        onBuyNow={handleBuyNow}
      />

      {/* ===== Model Selection ===== */}
      <section id="explore" className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {macbookData.map((model) => (
            <MacBookModelCard
              key={model.id}
              model={model}
              isRTL={isRTL}
              selected={selectedModel}
              onSelect={setSelectedModel}
            />
          ))}
        </div>
      </section>

      {/* ===== Detail ===== */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <MacBookDetail
          model={selectedModel}
          isRTL={isRTL}
          onAddToCart={handleAddToCart}
          onViewArticle={handleViewArticle}
          isAdded={isAdded(selectedModel)}
        />
      </section>

      {/* ===== Video ===== */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <VideoSection isRTL={isRTL} videoId={selectedModel.videoId} />
      </section>

      {/* ===== Related Products ===== */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <RelatedProducts isRTL={isRTL} onViewProduct={handleViewProduct} />
      </section>

      {/* ===== Footer ===== */}
      <section className="py-12 text-center">
        <h3 className="text-gray-300 dark:text-gray-800 text-[12vw] font-black tracking-tighter select-none opacity-30">
          MACBOOK
        </h3>
      </section>
    </main>
  );
}
