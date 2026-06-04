// backend/routes/articles.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// ========== GET /api/articles - دریافت همه مقالات ==========
router.get('/', async (req, res) => {
  try {
    const { brand, trending, limit = 20, page = 1, sort = '-publishDate' } = req.query;
    
    let query = {};
    if (brand && brand !== 'all') query.brand = brand;
    if (trending === 'true') query.isTrending = true;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const articles = await Article.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Article.countDocuments(query);
    
    res.json({
      success: true,
      data: articles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ========== GET /api/articles/trending - مقالات ترند ==========
router.get('/trending', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const articles = await Article.find({ isTrending: true })
      .sort('-likes')
      .limit(parseInt(limit));
    
    res.json({ success: true, data: articles });
  } catch (error) {
    console.error('Error fetching trending articles:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ========== GET /api/articles/search - جستجو ==========
router.get('/search', async (req, res) => {
  try {
    const { q, language = 'fa' } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({ success: true, data: [] });
    }
    
    const searchField = language === 'fa' ? 'title.fa' : 'title.en';
    const articles = await Article.find({
      [searchField]: { $regex: q, $options: 'i' }
    }).limit(10);
    
    res.json({ success: true, data: articles });
  } catch (error) {
    console.error('Error searching articles:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ========== GET /api/articles/related/:slug - مقالات مرتبط ==========
router.get('/related/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { limit = 3 } = req.query;
    
    const currentArticle = await Article.findOne({ slug });
    if (!currentArticle) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    const related = await Article.find({
      slug: { $ne: slug },
      brand: currentArticle.brand
    })
      .sort('-publishDate')
      .limit(parseInt(limit));
    
    res.json({ success: true, data: related });
  } catch (error) {
    console.error('Error fetching related articles:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ========== GET /api/articles/:slug - دریافت یک مقاله ==========
// IMPORTANT: این route باید بعد از routeهای خاص بیاد
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug });
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    // افزایش بازدید
    article.views = (article.views || 0) + 1;
    await article.save();
    
    res.json({ success: true, data: article });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ========== POST /api/articles/:slug/like - لایک ==========
router.post('/:slug/like', async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug });
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    article.likes = (article.likes || 0) + 1;
    await article.save();
    
    res.json({ success: true, likes: article.likes });
  } catch (error) {
    console.error('Error liking article:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ========== POST /api/articles/:slug/unlike - دیسلایک ==========
router.post('/:slug/unlike', async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug });
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    article.likes = Math.max(0, (article.likes || 0) - 1);
    await article.save();
    
    res.json({ success: true, likes: article.likes });
  } catch (error) {
    console.error('Error unliking article:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ========== POST /api/articles - ایجاد مقاله جدید ==========
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ========== PUT /api/articles/:id - به‌روزرسانی مقاله ==========
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    res.json({ success: true, data: article });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ========== DELETE /api/articles/:id - حذف مقاله ==========
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;