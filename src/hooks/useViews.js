import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useViews(slug) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (!slug) return;

    const incrementViews = async () => {
      try {
        await axios.post(`${API_URL}/api/articles/${slug}/view`);
      } catch (error) {
        console.error('❌ Error incrementing views:', error.message);
      }
    };

    incrementViews();

    // دریافت تعداد بازدید
    const fetchViews = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/articles/${slug}/views`);
        setViews(res.data.views || 0);
      } catch (error) {
        console.error('❌ Error fetching views:', error.message);
      }
    };

    fetchViews();
  }, [slug]);

  return views;
}
