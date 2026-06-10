import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    articleSlug: { type: String, required: true, index: true },
    author: { type: String, default: "کاربر" },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
