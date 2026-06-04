const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  title: {
    fa: { type: String, required: true },
    en: { type: String, required: true }
  },
  excerpt: {
    fa: { type: String, required: true },
    en: { type: String, required: true }
  },
  content: {
    fa: { type: String, required: true },
    en: { type: String, required: true }
  },
  cover: String,
  readTime: Number,
  likes: { type: Number, default: 0 },
  isTrending: { type: Boolean, default: false },
  publishDate: Date,
  tags: [String],
  author: String
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);