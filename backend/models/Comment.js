const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  articleSlug: { type: String, required: true, index: true },
  author: { type: String, default: 'کاربر' },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
