import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

/* GET /api/comments/:articleSlug — همه کامنت‌های یک مقاله */
router.get("/:articleSlug", async (req, res, next) => {
  try {
    const comments = await Comment.find({
      articleSlug: req.params.articleSlug,
      approved: true,
    })
      .sort({ createdAt: -1 })
      .lean();
    res.json(comments);
  } catch (err) { next(err); }
});

/* POST /api/comments/:articleSlug — ثبت کامنت جدید */
router.post("/:articleSlug", async (req, res, next) => {
  try {
    const { author, text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "متن نظر الزامی است" });
    }

    const comment = await Comment.create({
      articleSlug: req.params.articleSlug,
      author: author?.trim() || "مهمان",
      text: text.trim(),
    });

    res.status(201).json(comment);
  } catch (err) { next(err); }
});

/* DELETE /api/comments/:id — حذف کامنت (ادمین) */
router.delete("/:id", async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
