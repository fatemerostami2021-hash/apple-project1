import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

/* POST /api/views/:slug — افزایش بازدید یک مقاله */
router.post("/:slug", async (req, res, next) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!article) return res.status(404).json({ error: "مقاله یافت نشد" });
    res.json({ views: article.views });
  } catch (err) { next(err); }
});

export default router;
