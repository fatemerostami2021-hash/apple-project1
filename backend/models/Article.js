import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    brand: { type: String, default: "Apple" },
    title: { type: mongoose.Schema.Types.Mixed, default: { fa: "", en: "" } },
    content: { type: mongoose.Schema.Types.Mixed, default: { fa: "", en: "" } },
    cover: { type: String, default: "" },
    gallery: { type: Array, default: [] },
    mainVideo: { type: mongoose.Schema.Types.Mixed, default: { id: "", title: "", duration: "" } },
    relatedVideos: { type: Array, default: [] },
    readTime: { type: Number, default: 10 },
    tags: { type: Array, default: [] },
    author: { type: String, default: "مدیر سایت" },
    publishDate: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
