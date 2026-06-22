import express from "express";
import Product from "../models/Product.js";
import mongoose from "mongoose";

const router = express.Router();

// ============================================================
// GET /api/products - دریافت محصولات با فیلتر
// ============================================================
router.get("/", async (req, res, next) => {
  try {
    const { brand, category, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (brand)    filter.brand    = new RegExp(`^${brand}$`, "i");
    if (category) filter.category = new RegExp(`^${category}$`, "i");

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)).lean(),
      Product.countDocuments(filter),
    ]);

    res.json({ products, total, page: Number(page), limit: Number(limit) });
  } catch (err) { next(err); }
});

// ============================================================
// ⚠️ مسیرهای خاص (categories, brands) باید قبل از :id بیایند
// ============================================================

// GET /api/products/categories - دریافت همه دسته‌بندی‌ها
router.get("/categories", async (req, res, next) => {
  try {
    const categories = await Product.distinct("category");
    res.json({ success: true, categories });
  } catch (err) {
    console.error("❌ Error fetching categories:", err);
    next(err);
  }
});

// GET /api/products/brands - دریافت همه برندها
router.get("/brands", async (req, res, next) => {
  try {
    const brands = await Product.distinct("brand");
    res.json({ success: true, brands });
  } catch (err) {
    console.error("❌ Error fetching brands:", err);
    next(err);
  }
});

// ============================================================
// GET /api/products/:id - دریافت یک محصول با ID (باید آخر باشد)
// ============================================================
router.get("/:id", async (req, res, next) => {
  try {
    // بررسی اینکه ID معتبر است
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) { next(err); }
});

export default router;
