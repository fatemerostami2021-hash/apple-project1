import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  brand: {
    type: String,
    default: 'Apple'
  },
  title: {
    fa: { type: String, default: '' },
    en: { type: String, default: '' }
  },
  content: {
    fa: { type: String, default: '' },
    en: { type: String, default: '' }
  },
  excerpt: {
    fa: { type: String, default: '' },
    en: { type: String, default: '' }
  },
  cover: {
    type: String,
    default: ''
  },
  gallery: {
    type: [String],
    default: []
  },
  // ✅ اضافه کردن mainVideo
  mainVideo: {
    id: { type: String, default: '' },
    title: { type: String, default: '' },
    duration: { type: String, default: '' }
  },
  relatedVideos: {
    type: [{
      id: { type: String, default: '' },
      title: { type: String, default: '' },
      duration: { type: String, default: '' }
    }],
    default: []
  },
  readTime: {
    type: Number,
    default: 10
  },
  tags: {
    type: [String],
    default: []
  },
  author: {
    type: String,
    default: 'مدیر سایت'
  },
  active: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  publishDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, {
  timestamps: true
});

export default mongoose.model('Article', articleSchema);
