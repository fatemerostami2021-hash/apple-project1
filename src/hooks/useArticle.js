import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useArticle(slug) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError('No slug provided');
      return;
    }

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/articles/${slug}`);
        setArticle(res.data);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching article:', err.message);
        setError(err.response?.data?.message || err.message);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return { article, loading, error };
}
