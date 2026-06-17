import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    fa: { type: String, required: true }
  },
  subtitle: {
    en: { type: String, default: '' },
    fa: { type: String, default: '' }
  },
  description: {
    en: { type: String, default: '' },
    fa: { type: String, default: '' }
  },
  image: { type: String, required: true },
  brand: { type: String, default: 'Apple' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  articleSlug: { type: String, default: '' },
  buttonText: {
    en: { type: String, default: 'Buy Now' },
    fa: { type: String, default: 'خرید' }
  },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Slide', slideSchema);
