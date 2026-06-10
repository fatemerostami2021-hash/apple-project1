import express from "express";
import jwt from "jsonwebtoken";
import Article from "../models/Article.js";
import Product from "../models/Product.js";
import Comment from "../models/Comment.js";

const router = express.Router();

/* ────────────────────────────────────────── */
/* احراز هویت ادمین (ورود)                    */
/* ────────────────────────────────────────── */
router.post("/login", async (req, res) => {
  const { token } = req.body;
  
  // توکن ساده برای ادمین (در پروژه واقعی از credential استفاده کن)
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "fatemeh963";
  
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "توکن نامعتبر است" });
  }
  
  // ساخت JWT برای جلسات بعدی
  const jwtToken = jwt.sign(
    { role: "admin", name: "Admin" },
    process.env.JWT_SECRET || "secret-key",
    { expiresIn: "7d" }
  );
  
  res.json({ success: true, token: jwtToken });
});

/* ────────────────────────────────────────── */
/* مدیریت مقالات                              */
/* ────────────────────────────────────────── */

// دریافت همه مقالات (برای پنل مدیریت)
router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ایجاد مقاله جدید
router.post("/articles", async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// به‌روزرسانی مقاله
router.put("/articles/:slug", async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: false }
    );
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json({ success: true, article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// حذف مقاله
router.delete("/articles/:slug", async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: "Article not found" });
    await Comment.deleteMany({ articleSlug: req.params.slug });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ────────────────────────────────────────── */
/* مدیریت محصولات                            */
/* ────────────────────────────────────────── */

// دریافت همه محصولات
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ایجاد محصول جدید
router.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// به‌روزرسانی محصول
router.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// حذف محصول
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
