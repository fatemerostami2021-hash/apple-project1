import express from "express";
import Product from "../models/Product.js";

/* fallback داده local اگر DB خالی بود */
const samsungFallback = [
  { id: "1", name: "Galaxy S24 Ultra", brand: "Samsung", category: "Smartphones", price: 1299, thumbnail: "/images/samsung-pic/galaxy-s24-ultra.png", image: "/images/samsung-pic/galaxy-s24-ultra.png", inStock: true },
  { id: "2", name: "Galaxy S24 Plus", brand: "Samsung", category: "Smartphones", price: 999, thumbnail: "/images/samsung-pic/galaxy-s24-plus.png", image: "/images/samsung-pic/galaxy-s24-plus.png", inStock: true },
  { id: "3", name: "Galaxy Z Fold 6", brand: "Samsung", category: "Smartphones", price: 1799, thumbnail: "/images/samsung-pic/galaxy-z-fold-6.png", image: "/images/samsung-pic/galaxy-z-fold-6.png", inStock: true },
  { id: "4", name: "Galaxy Z Flip 6", brand: "Samsung", category: "Smartphones", price: 1099, thumbnail: "/images/samsung-pic/galaxy-z-flip-6.png", image: "/images/samsung-pic/galaxy-z-flip-6.png", inStock: true },
  { id: "5", name: "Galaxy Tab S10 Ultra", brand: "Samsung", category: "Tablets", price: 1199, thumbnail: "/images/samsung-pic/galaxy-tab-s10-ultra.png", image: "/images/samsung-pic/galaxy-tab-s10-ultra.png", inStock: true },
  { id: "6", name: "Galaxy Watch 7", brand: "Samsung", category: "Watches", price: 299, thumbnail: "/images/samsung-pic/galaxy-watch-7.png", image: "/images/samsung-pic/galaxy-watch-7.png", inStock: true },
  { id: "7", name: "Galaxy Buds 3 Pro", brand: "Samsung", category: "Audio", price: 249, thumbnail: "/images/samsung-pic/galaxy-buds-3-pro.png", image: "/images/samsung-pic/galaxy-buds-3-pro.png", inStock: true }
];

const router = express.Router();

/* GET /api/samsung */
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find({ brand: /^samsung$/i }).lean();
    /* اگر دیتابیس خالیه، داده local برگردان */
    res.json(products.length ? products : samsungFallback);
  } catch (err) { 
    next(err); 
  }
});

/* GET /api/samsung/:id */
router.get("/:id", async (req, res, next) => {
  try {
    let product = await Product.findOne({ _id: req.params.id, brand: /^samsung$/i }).lean();
    if (!product) {
      product = samsungFallback.find(p => p.id === req.params.id);
    }
    if (!product) {
      return res.status(404).json({ error: "محصول سامسونگ یافت نشد" });
    }
    res.json(product);
  } catch (err) { 
    next(err); 
  }
});

export default router;
