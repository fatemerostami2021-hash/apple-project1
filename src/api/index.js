import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========== Products ==========
export const getProducts = (params) => api.get('/api/products', { params });
export const getProductById = (id) => api.get(`/api/products/${id}`);
export const getProductBySlug = (slug) => api.get(`/api/products/slug/${slug}`);

// ========== Samsung ==========
export const getSamsungProducts = () => api.get('/api/samsung/products');

// ========== Articles ==========
export const getArticles = () => api.get('/api/articles');
export const getArticleBySlug = (slug) => api.get(`/api/articles/${slug}`);
export const likeArticle = (slug) => api.post(`/api/articles/${slug}/like`);

// ========== Footer ==========
export const getFooter = () => api.get('/api/footer');
export const updateFooter = (data) => api.put('/api/footer', data);

// ========== Auth ==========
export const login = (data) => api.post('/api/auth/login', data);
export const register = (data) => api.post('/api/auth/register', data);
export const getMe = () => api.get('/api/auth/me');

// ========== Cart ==========
export const addToCart = (data) => api.post('/api/cart', data);
export const getCart = () => api.get('/api/cart');
export const removeFromCart = (id) => api.delete(`/api/cart/${id}`);

// ========== Orders ==========
export const createOrder = (data) => api.post('/api/orders', data);
export const getOrders = () => api.get('/api/orders');

export default api;
