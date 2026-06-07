const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// افزایش لایک
router.post('/:slug/like', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    article.likes = (article.likes || 0) + 1;
    await article.save();
    
    res.json({ success: true, likes: article.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// کاهش لایک
router.post('/:slug/unlike', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    article.likes = Math.max(0, (article.likes || 0) - 1);
    await article.save();
    
    res.json({ success: true, likes: article.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// دریافت تعداد لایک
router.get('/:slug/likes', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ likes: article.likes || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
