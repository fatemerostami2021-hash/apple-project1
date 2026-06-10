import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

/* GET /api/comments/:articleSlug — دریافت کامنت‌های یک مقاله */
router.get("/:articleSlug", async (req, res) => {
  try {
    const comments = await Comment.find({ articleSlug: req.params.articleSlug })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* POST /api/comments — افزودن کامنت جدید */
router.post("/", async (req, res) => {
  try {
    const { articleSlug, author, text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "متن کامنت نمی‌تواند خالی باشد" });
    }
    const comment = new Comment({
      articleSlug,
      author: author?.trim() || "کاربر",
      text: text.trim()
    });
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* DELETE /api/comments/:id — حذف کامنت (فقط برای مدیریت) */
router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
