const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// خواندن داده‌ها از فایل JSON
const articlesPath = path.join(__dirname, 'articles-data.json');
let articles = [];

try {
  const rawData = fs.readFileSync(articlesPath, 'utf8');
  const jsonData = JSON.parse(rawData);
  articles = jsonData.articles || jsonData;
  console.log(`✅ Loaded ${articles.length} articles from JSON file`);
} catch (error) {
  console.error('❌ Error loading articles.json:', error.message);
  articles = [];
}

// ========== API Routes ==========

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    articlesCount: articles.length
  });
});

// دریافت همه مقالات
app.get('/api/articles', (req, res) => {
  let result = [...articles];
  
  res.json({
    success: true,
    data: result,
    total: result.length
  });
});

// دریافت یک مقاله با اسلاگ
app.get('/api/articles/:slug', (req, res) => {
  const { slug } = req.params;
  const article = articles.find(a => a.slug === slug);
  
  if (!article) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }
  
  res.json({ success: true, data: article });
});

// لایک کردن مقاله
app.post('/api/articles/:slug/like', (req, res) => {
  const { slug } = req.params;
  const articleIndex = articles.findIndex(a => a.slug === slug);
  
  if (articleIndex === -1) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }
  
  articles[articleIndex].likes = (articles[articleIndex].likes || 0) + 1;
  
  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
  
  res.json({ success: true, likes: articles[articleIndex].likes });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// شروع سرور
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║     🚀 Blog API Server (JSON Mode)                      ║
║     📡 Running on http://localhost:${PORT}                 ║
║     📝 API: http://localhost:${PORT}/api/articles         ║
║     ❤️  Health: http://localhost:${PORT}/api/health       ║
║     📚 Articles loaded: ${articles.length}                  ║
╚══════════════════════════════════════════════════════════╝
  `);
});
