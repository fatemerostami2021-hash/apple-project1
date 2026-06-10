import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/index";
import { ProductGridSkeleton, ErrorMessage } from "../../components/ui/Skeletons";

const AppleProducts = ({ setSelectedProduct, getLangText, isRTL, i18n }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppleProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        let data = res.data;
        let productsArray = [];
        
        if (Array.isArray(data)) {
          productsArray = data;
        } else if (data?.products && Array.isArray(data.products)) {
          productsArray = data.products;
        }
        
        // فیلتر محصولات اپل
        const appleProducts = productsArray.filter(
          p => p.brand?.toLowerCase() === "apple"
        ).slice(0, 6);
        
        setProducts(appleProducts);
      } catch (err) {
        console.error("Error fetching Apple products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppleProducts();
  }, []);

  const handleProductClick = (product) => {
    // اگر slug داره، برو به صفحه مقاله
    if (product.slug) {
      navigate(`/article/${product.slug}`);
    } else {
      // در غیر این صورت، QuickView رو باز کن
      setSelectedProduct(product);
    }
  };

  if (loading) {
    return (
      <section className="relative py-10 md:py-14 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ProductGridSkeleton count={6} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="relative py-10 md:py-14 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`text-center mb-8 ${isRTL ? "font-[Vazirmatn]" : ""}`}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {i18n.language === "fa"
              ? "ویترین محصولات اپل"
              : "Apple Products Showcase"}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            {i18n.language === "fa"
              ? "برای مشاهده مقاله کامل روی هر محصول کلیک کنید"
              : "Click on any product to read the full article"}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {products.map((product, index) => (
            <motion.div
              key={product._id || product.id || index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleProductClick(product)}
              className="group relative bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="flex items-center justify-center h-32 md:h-36 mb-3">
                <img
                  src={product.thumbnail || product.image || "/images/placeholder.png"}
                  alt={getLangText(product.name) || product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/images/placeholder.png";
                  }}
                />
              </div>

              <div className={isRTL ? "text-right" : "text-left"}>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                  {getLangText(product.name) || product.name}
                </h3>

                <p className="mt-2 text-xs text-gray-600 line-clamp-3">
                  {getLangText(product.description) || 
                    (i18n.language === "fa" 
                      ? "محصول اپل با طراحی مینیمال و عملکرد فوق‌العاده" 
                      : "Apple product with premium design and great performance")}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">
                    ${product.price?.toLocaleString() || "—"}
                  </span>

                  <span className="text-xs text-blue-600 font-medium">
                    {i18n.language === "fa" ? "مشاهده مقاله" : "Read Article"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppleProducts;
