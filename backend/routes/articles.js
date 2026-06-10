import express from "express";
import Article from "../models/Article.js";
import Comment from "../models/Comment.js";

const router = express.Router();

/* ────────────────────────────────────────── */
/* GET all articles                           */
/* ────────────────────────────────────────── */
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ────────────────────────────────────────── */
/* GET single article by slug                 */
/* ────────────────────────────────────────── */
router.get("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ────────────────────────────────────────── */
/* POST increase like (لایک)                  */
/* ────────────────────────────────────────── */
router.post("/:slug/like", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: "Article not found" });
    
    article.likes = (article.likes || 0) + 1;
    await article.save();
    res.json({ success: true, likes: article.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ────────────────────────────────────────── */
/* POST decrease like (آنلایک)                */
/* ────────────────────────────────────────── */
router.post("/:slug/unlike", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: "Article not found" });
    
    article.likes = Math.max(0, (article.likes || 0) - 1);
    await article.save();
    res.json({ success: true, likes: article.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ────────────────────────────────────────── */
/* POST increase view (بازدید)                */
/* ────────────────────────────────────────── */
router.post("/:slug/view", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: "Article not found" });
    
    article.views = (article.views || 0) + 1;
    await article.save();
    res.json({ success: true, views: article.views });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ────────────────────────────────────────── */
/* POST create new article (ادمین)            */
/* ────────────────────────────────────────── */
router.post("/", async (req, res) => {
  try {
    const { slug, brand, title, content, cover, gallery, mainVideo, relatedVideos, readTime, tags, author } = req.body;
    
    const existing = await Article.findOne({ slug });
    if (existing) return res.status(400).json({ error: "Slug already exists" });
    
    const article = new Article({
      slug,
      brand: brand || "Apple",
      title: title || { fa: "", en: "" },
      content: content || { fa: "", en: "" },
      cover: cover || "",
      gallery: gallery || [],
      mainVideo: mainVideo || { id: "", title: "", duration: "" },
      relatedVideos: relatedVideos || [],
      readTime: readTime || 10,
      tags: tags || [],
      author: author || "مدیر سایت",
      publishDate: new Date()
    });
    
    await article.save();
    res.json({ success: true, article });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ────────────────────────────────────────── */
/* PUT update article by slug (ادمین)         */
/* ────────────────────────────────────────── */
router.put("/:slug", async (req, res) => {
  try {
    const { brand, title, content, cover, gallery, mainVideo, relatedVideos, readTime, tags, author } = req.body;
    
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      {
        brand,
        title,
        content,
        cover,
        gallery: gallery || [],
        mainVideo,
        relatedVideos: relatedVideos || [],
        readTime,
        tags,
        author,
        updatedAt: new Date()
      },
      { new: true, runValidators: false }
    );
    
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json({ success: true, article });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ────────────────────────────────────────── */
/* DELETE article by slug (ادمین)             */
/* ────────────────────────────────────────── */
router.delete("/:slug", async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: "Article not found" });
    await Comment.deleteMany({ articleSlug: req.params.slug });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
