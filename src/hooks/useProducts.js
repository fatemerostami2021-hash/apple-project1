import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useProducts(brand = null) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = brand 
          ? `${API_URL}/api/products?brand=${brand}`
          : `${API_URL}/api/products`;
        
        const res = await axios.get(url);
        console.log('✅ داده دریافت شد:', res.data);
        
        // ✅ بررسی ساختار داده
        if (res.data && res.data.products) {
          setProducts(res.data.products);
        } else if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
          setError('ساختار داده نامعتبر است');
        }
      } catch (err) {
        console.error('❌ خطا در دریافت محصولات:', err.message);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand]);

  return { products, loading, error };
}
