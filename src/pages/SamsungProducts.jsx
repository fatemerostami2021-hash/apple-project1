import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const SamsungProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products?brand=Samsung');
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const categories = ['All', 'Phone', 'Tablet', 'Laptop'];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-300">⏳ بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          📱 محصولات سامسونگ
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          {products.length} محصول موجود
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <Link to={`/product/${product.slug}`}>
                <img
                  src={product.thumbnail || '/placeholder.png'}
                  alt={product.name?.fa || product.name?.en || product.name}
                  className="w-full h-48 object-contain p-4 bg-gray-100 dark:bg-gray-700"
                  onError={(e) => {
                    e.target.src = '/placeholder.png';
                  }}
                />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.slug}`}>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 transition">
                    {product.name?.fa || product.name?.en || product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {product.category}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {product.price?.toLocaleString()} تومان
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to={`/product/${product.slug}`}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      مشاهده
                    </Link>
                    <button
                      onClick={() => {
                        // Add to cart logic
                        alert('🛒 به سبد خرید اضافه شد: ' + (product.name?.fa || product.name?.en));
                      }}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                    >
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            😕 محصولی در این دسته‌بندی یافت نشد.
          </div>
        )}
      </div>
    </div>
  );
};

export default SamsungProducts;
