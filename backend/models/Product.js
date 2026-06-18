import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: mongoose.Schema.Types.Mixed, 
      required: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      index: true 
    },
    brand: { 
      type: String, 
      required: true, 
      index: true 
    },
    category: { 
      type: String, 
      required: true, 
      index: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    thumbnail: { 
      type: String, 
      default: "" 
    },
    image: { 
      type: String, 
      default: "" 
    },
    images: { 
      type: [String], 
      default: [] 
    },
    description: { 
      type: mongoose.Schema.Types.Mixed, 
      default: {} 
    },
    inStock: { 
      type: Boolean, 
      default: true 
    },
    tags: { 
      type: [String], 
      default: [] 
    },
    featured: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

/* index ترکیبی برای فیلتر سریع */
productSchema.index({ brand: 1, category: 1 });
productSchema.index({ slug: 1 });

export default mongoose.model("Product", productSchema);
