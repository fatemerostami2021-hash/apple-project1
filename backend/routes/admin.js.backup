import express from "express";
import mongoose from "mongoose";
const router = express.Router();

// ============================================================
// 🔐 Middleware بررسی توکن ادمین
// ============================================================
const checkAdminToken = (req, res, next) => {
  const token = req.headers["x-migrate-token"] || req.headers.authorization?.split(' ')[1];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// ============================================================
// 📦 مدل‌ها
// ============================================================
import Product from '../models/Product.js';
import Article from '../models/Article.js';
import Slide from '../models/Slide.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Comment from '../models/Comment.js';

// ============================================================
// 📊 مدیریت محصولات (Admin Products)
// ============================================================

// دریافت همه محصولات
router.get('/products', checkAdminToken, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// دریافت یک محصول
router.get('/products/:id', checkAdminToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'محصول یافت نشد' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ایجاد محصول جدید
router.post('/products', checkAdminToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ویرایش محصول
router.put('/products/:id', checkAdminToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'محصول یافت نشد' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// حذف محصول
router.delete('/products/:id', checkAdminToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'محصول یافت نشد' });
    res.json({ success: true, message: 'محصول با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================================
// 📰 مدیریت مقالات (Admin Articles)
// ============================================================

// دریافت همه مقالات
router.get('/articles', checkAdminToken, async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// دریافت یک مقاله با slug
router.get('/articles/:slug', checkAdminToken, async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ success: false, message: 'مقاله یافت نشد' });
    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ایجاد مقاله جدید
router.post('/articles', checkAdminToken, async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ویرایش مقاله
router.put('/articles/:slug', checkAdminToken, async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!article) return res.status(404).json({ success: false, message: 'مقاله یافت نشد' });
    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// حذف مقاله
router.delete('/articles/:slug', checkAdminToken, async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ slug: req.params.slug });
    if (!article) return res.status(404).json({ success: false, message: 'مقاله یافت نشد' });
    res.json({ success: true, message: 'مقاله با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================================
// 🎠 مدیریت اسلایدها (Admin Slides)
// ============================================================

router.get('/slides', checkAdminToken, async (req, res) => {
  try {
    const slides = await Slide.find().sort({ order: 1 });
    res.json({ success: true, data: slides });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/slides', checkAdminToken, async (req, res) => {
  try {
    const slide = new Slide(req.body);
    await slide.save();
    res.json({ success: true, data: slide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/slides/:id', checkAdminToken, async (req, res) => {
  try {
    const slide = await Slide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: slide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/slides/:id', checkAdminToken, async (req, res) => {
  try {
    await Slide.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'اسلاید حذف شد' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================================
// 🚀 مسیر موقتی مهاجرت (Migrate)
// ============================================================
router.post("/import/:collection", async (req, res) => {
  try {
    const token = req.headers["x-migrate-token"];
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { collection } = req.params;
    const ALLOWED = ["products", "articles", "slides", "users", "siteabouts", "comments"];
    if (!ALLOWED.includes(collection)) {
      return res.status(400).json({ error: "Invalid collection name" });
    }

    const docs = req.body.docs;
    if (!Array.isArray(docs) || docs.length === 0) {
      return res.status(400).json({ error: "No documents provided" });
    }

    const col = mongoose.connection.db.collection(collection);
    const { ObjectId } = mongoose.mongo;

    const seen = new Set();
    const fixedDocs = [];
    for (const d of docs) {
      if (d._id && typeof d._id === "string") {
        try { d._id = new ObjectId(d._id); } catch (e) {}
      }
      const key = d._id ? d._id.toString() : JSON.stringify(d);
      if (seen.has(key)) {
        console.warn("⚠️ duplicate _id inside payload, skipped:", key);
        continue;
      }
      seen.add(key);
      fixedDocs.push(d);
    }

    const ops = fixedDocs.map((doc) => ({
      replaceOne: {
        filter: { _id: doc._id },
        replacement: doc,
        upsert: true,
      },
    }));

    const result = await col.bulkWrite(ops, { ordered: false });
    res.json({
      success: true,
      message: `✅ ${result.upsertedCount + result.modifiedCount + result.insertedCount} documents processed`,
      details: result
    });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
