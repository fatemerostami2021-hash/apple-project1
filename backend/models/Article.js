const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  title: {
    fa: { type: String, required: true },
    en: { type: String, required: true }
  },
  excerpt: {
    fa: { type: String, default: '' },
    en: { type: String, default: '' }
  },
  content: {
    fa: { type: String, required: true },
    en: { type: String, required: true }
  },
  cover: { type: String, default: '' },
  gallery: { type: [String], default: [] },  // 👈 تغییر: آرایه از استرینگ
  mainVideo: {
    id: { type: String, default: '' },
    title: { type: String, default: '' },
    duration: { type: String, default: '' }
  },
  relatedVideos: [{
    id: String,
    title: String,
    duration: String
  }],
  readTime: { type: Number, default: 10 },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  isTrending: { type: Boolean, default: false },
  publishDate: { type: Date, default: Date.now },
  tags: [String],
  author: { type: String, default: 'مدیر سایت' }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
