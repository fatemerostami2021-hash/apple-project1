// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// دریافت همه مقالات
export const getArticles = async () => {
  try {
    const response = await api.get('/articles');
    console.log('Raw API response:', response.data);
    
    // داده‌های واقعی داخل response.data.data هستند
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    // اگر ساختار متفاوت بود
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
    
    console.warn('Unexpected API response structure:', response.data);
    return [];
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

// دریافت یک مقاله با اسلاگ
export const getArticleBySlug = async (slug) => {
  const response = await api.get(`/articles/${slug}`);
  // داده داخل response.data.data است
  return response.data.data || response.data;
};

// دریافت مقالات ترند
export const getTrendingArticles = async () => {
  const response = await api.get('/articles/trending');
  return response.data.data || response.data;
};

// دریافت مقالات مرتبط
export const getRelatedArticles = async (slug, limit = 3) => {
  const response = await api.get(`/articles/related/${slug}?limit=${limit}`);
  return response.data.data || response.data;
};

// لایک کردن مقاله
export const likeArticle = async (slug) => {
  const response = await api.post(`/articles/${slug}/like`);
  return response.data.likes;
};

// دیسلایک کردن مقاله
export const unlikeArticle = async (slug) => {
  const response = await api.post(`/articles/${slug}/unlike`);
  return response.data.likes;
};

export default api;