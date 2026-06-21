import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

/* POST /api/like/:slug — افزایش لایک یک مقاله */
router.post("/:slug", async (req, res, next) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!article) return res.status(404).json({ error: "مقاله یافت نشد" });
    res.json({ likes: article.likes });
  } catch (err) { next(err); }
});

/* DELETE /api/like/:slug — کاهش لایک (آنلایک) */
router.delete("/:slug", async (req, res, next) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { likes: -1 } },
      { new: true }
    );
    if (!article) return res.status(404).json({ error: "مقاله یافت نشد" });
    res.json({ likes: Math.max(0, article.likes) });
  } catch (err) { next(err); }
});

export default router;
