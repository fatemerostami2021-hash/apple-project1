import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* GET /api/products — با فیلتر brand, category, page, limit */
router.get("/", async (req, res, next) => {
  try {
    const { brand, category, page = 1, limit = 50 } = req.query;
    const filter = {};
    
    if (brand && brand !== "All") {
      filter.brand = new RegExp(`^${brand}$`, "i");
    }
    if (category && category !== "All") {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    const pageNum = parseInt(page, 10);
    const limitNum = Math.min(parseInt(limit, 10), 50);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(limitNum).lean(),
      Product.countDocuments(filter),
    ]);
    
    res.json({ products, total, page: pageNum, limit: limitNum });
  } catch (err) { 
    next(err); 
  }
});

/* GET /api/products/:id */
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ error: "محصول یافت نشد" });
    }
    res.json(product);
  } catch (err) { 
    next(err); 
  }
});

export default router;
