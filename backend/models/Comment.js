import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  articleSlug: { type: String, required: true, index: true },
  author:      { type: String, default: "مهمان", trim: true, maxlength: 60 },
  text:        { type: String, required: true, trim: true, maxlength: 1000 },
  approved:    { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);
