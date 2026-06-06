const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// خواندن مقالات از فایل JSON
const articlesPath = path.join(__dirname, 'articles-content.json');
let articles = [];

try {
  const rawData = fs.readFileSync(articlesPath, 'utf8');
  const jsonData = JSON.parse(rawData);
  articles = jsonData;
  console.log(`✅ Loaded ${articles.length} articles from JSON file`);
} catch (error) {
  console.error('❌ Error loading JSON:', error.message);
  articles = [];
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', articlesCount: articles.length, mode: 'JSON-only' });
});

app.get('/api/articles', (req, res) => {
  res.json(articles);
});

app.get('/api/articles/:slug', (req, res) => {
  const article = articles.find(a => a.slug === req.params.slug);
  if (!article) {
    return res.status(404).json({ message: 'Article not found' });
  }
  res.json(article);
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║  🚀 Server running (JSON mode - No MongoDB)   ║
║  📡 http://localhost:${PORT}                    ║
║  📚 ${articles.length} articles loaded           ║
╚════════════════════════════════════════════════╝
  `);
});
