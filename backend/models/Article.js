import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: {
    en: { type: String, required: true },
    fa: { type: String, required: true }
  },
  slug: { type: String, required: true, unique: true },
  brand: { type: String, default: 'Apple' },
  category: { type: String, default: 'Review' },
  content: {
    en: { type: String, default: '' },
    fa: { type: String, default: '' }
  },
  excerpt: {
    en: { type: String, default: '' },
    fa: { type: String, default: '' }
  },
  cover: { type: String, default: '' },
  gallery: [{ type: String }],
  tags: [{ type: String }],
  publishDate: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  readTime: { type: Number, default: 5 },
  active: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Article', articleSchema);
