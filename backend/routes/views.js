const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// ثبت بازدید
router.post('/:slug/view', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    
    article.views = (article.views || 0) + 1;
    await article.save();
    
    res.json({ success: true, views: article.views });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// دریافت بازدید
router.get('/:slug/views', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    
    res.json({ views: article.views || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
