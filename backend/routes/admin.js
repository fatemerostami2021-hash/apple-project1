const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Comment = require('../models/Comment');

// دریافت همه مقالات
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// دریافت یک مقاله
router.get('/articles/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ایجاد مقاله جدید
router.post('/articles', async (req, res) => {
  try {
    const { slug, brand, title, content, cover, gallery, mainVideo, relatedVideos, readTime, tags, author } = req.body;
    
    const existing = await Article.findOne({ slug });
    if (existing) return res.status(400).json({ error: 'Slug already exists' });
    
    const article = new Article({
      slug,
      brand: brand || 'Apple',
      title: title || { fa: '', en: '' },
      content: content || { fa: '', en: '' },
      cover: cover || '',
      gallery: gallery || [],
      mainVideo: mainVideo || { id: '', title: '', duration: '' },
      relatedVideos: relatedVideos || [],
      readTime: readTime || 10,
      tags: tags || [],
      author: author || 'مدیر سایت',
      publishDate: new Date()
    });
    
    await article.save();
    res.json({ success: true, article });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ویرایش مقاله
router.put('/articles/:slug', async (req, res) => {
  try {
    const { brand, title, content, cover, gallery, mainVideo, relatedVideos, readTime, tags, author } = req.body;
    
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      {
        brand,
        title,
        content,
        cover,
        gallery: gallery || [],
        mainVideo,
        relatedVideos: relatedVideos || [],
        readTime,
        tags,
        author,
        updatedAt: new Date()
      },
      { new: true, runValidators: false }
    );
    
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json({ success: true, article });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// حذف مقاله
router.delete('/articles/:slug', async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    await Comment.deleteMany({ articleSlug: req.params.slug });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
