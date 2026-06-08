const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  brand: String,
  publishDate: String,
  readTime: Number,
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  author: String,
  tags: [String],
  
  // ========== فیلدهای جدید ==========
  gallery: [{
    src: String,
    alt: String,
    caption: String
  }],
  sections: [{
    id: String,
    title: {
      fa: String,
      en: String
    }
  }],
  relatedVideos: [{
    id: String,
    title: String,
    duration: String
  }],
  
  title: {
    fa: String,
    en: String
  },
  content: {
    fa: String,
    en: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
