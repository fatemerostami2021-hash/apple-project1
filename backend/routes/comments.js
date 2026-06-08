const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// دریافت کامنت‌های یک مقاله
router.get('/:articleSlug', async (req, res) => {
  try {
    const comments = await Comment.find({ articleSlug: req.params.articleSlug })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// افزودن کامنت جدید
router.post('/', async (req, res) => {
  try {
    const { articleSlug, author, text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'متن کامنت نمی‌تواند خالی باشد' });
    }
    const comment = new Comment({
      articleSlug,
      author: author?.trim() || 'کاربر',
      text: text.trim()
    });
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// حذف کامنت (فقط برای مدیریت)
router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
