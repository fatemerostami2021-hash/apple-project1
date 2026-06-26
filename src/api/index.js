import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== Articles =====
export const getArticles = async () => {
  const response = await api.get('/api/articles');
  return response.data;
};

export const getArticleBySlug = async (slug) => {
  const response = await api.get(`/api/articles/${slug}`);
  return response.data;
};

export const likeArticle = async (slug) => {
  const response = await api.post(`/api/articles/${slug}/like`);
  return response.data;
};

// ===== Products =====
export const getProducts = async (params) => {
  const response = await api.get('/api/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/api/products/slug/${slug}`);
  return response.data;
};

export const getSamsungProducts = async () => {
  const response = await api.get('/api/samsung/products');
  return response.data;
};

// ===== Footer =====
export const getFooter = async () => {
  const response = await api.get('/api/footer');
  return response.data;
};

export const updateFooter = async (data) => {
  const response = await api.put('/api/footer', data);
  return response.data;
};

// ===== Auth =====
export const login = async (data) => {
  const response = await api.post('/api/auth/login', data);
  return response.data;
};

export const register = async (data) => {
  const response = await api.post('/api/auth/register', data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

// ===== Cart =====
export const addToCart = async (data) => {
  const response = await api.post('/api/cart', data);
  return response.data;
};

export const getCart = async () => {
  const response = await api.get('/api/cart');
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await api.delete(`/api/cart/${id}`);
  return response.data;
};

// ===== Orders =====
export const createOrder = async (data) => {
  const response = await api.post('/api/orders', data);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/api/orders');
  return response.data;
};

export default api;
