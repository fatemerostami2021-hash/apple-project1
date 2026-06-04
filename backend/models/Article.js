const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  fa: { type: String, required: true },
  en: { type: String, required: true }
});

const excerptSchema = new mongoose.Schema({
  fa: { type: String, required: true },
  en: { type: String, required: true }
});

const contentSchema = new mongoose.Schema({
  fa: { type: String, required: true },
  en: { type: String, required: true }
});

const articleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  brand: { 
    type: String, 
    enum: ['Apple', 'Samsung', 'Comparison'],
    required: true 
  },
  slug: { type: String, required: true, unique: true }, // ← اینجا unique: true کافی است
  cover: { type: String, required: true },
  title: { type: titleSchema, required: true },
  excerpt: { type: excerptSchema, required: true },
  content: { type: contentSchema, required: true },
  readTime: { type: Number, required: true, min: 1 },
  likes: { type: Number, default: 0 },
  isTrending: { type: Boolean, default: false },
  publishDate: { type: Date, required: true, default: Date.now },
  tags: [{ type: String }],
  author: { type: String, default: 'Tech Team' },
  views: { type: Number, default: 0 }
}, {
  timestamps: true
});

// ✅ فقط این ایندکس‌ها را نگه دار (ایندکس slug را حذف کن چون قبلاً unique: true دارد)
articleSchema.index({ brand: 1 });
articleSchema.index({ isTrending: 1 });
articleSchema.index({ tags: 1 });
// articleSchema.index({ slug: 1 }); ← این خط را حذف کن یا کامنت کن

module.exports = mongoose.model('Article', articleSchema);