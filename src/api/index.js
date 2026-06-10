import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) localStorage.removeItem("admin_token");
    return Promise.reject(err);
  }
);

// محصولات
export const getProducts = async (filters = {}) => {
  const res = await api.get("/api/products", { params: filters });
  if (res.data && res.data.products) {
    return res.data.products;
  }
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/api/products/${id}`);
  return res.data;
};

export const getSamsungProducts = async () => {
  const res = await api.get("/api/samsung");
  if (res.data && res.data.products) return res.data.products;
  return res.data;
};

// Hero Slides
export const getHeroSlides = () => api.get("/api/slides");

// مقالات
export const getArticles = (params = {}) => api.get("/api/articles", { params });
export const getArticleBySlug = (slug) => api.get(`/api/articles/${slug}`);
export const likeArticle = (slug) => api.post(`/api/articles/${slug}/like`);
export const unlikeArticle = (slug) => api.post(`/api/articles/${slug}/unlike`);

// کامنت‌ها
export const getComments = (slug) => api.get(`/api/comments/${slug}`);
export const postComment = ({ articleSlug, author, text }) =>
  api.post("/api/comments", { articleSlug, author, text });

// احراز هویت
export const loginAdmin = (credentials) => api.post("/api/auth/login", credentials);
export const registerUser = (userData) => api.post("/api/auth/register", userData);
export const loginUser = (credentials) => api.post("/api/auth/login", credentials);
export const getMe = () => api.get("/api/auth/me");

// محصولات اپل (alias)
export const getAppleProducts = () => getProducts({ brand: "Apple" });

export default api;
