import express from 'express';
const router = express.Router();
import Product from '../models/Product.js';

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { brand, category, page = 1, limit = 50 } = req.query;
    const filter = {};
    
    if (brand && brand !== 'All') {
      filter.brand = new RegExp(`^${brand}$`, 'i');
    }
    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
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
    console.error('❌ Error fetching products:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/slug/:slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

// GET /api/products/categories - دریافت همه دسته‌بندی‌ها
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    
    const result = [
      ...brands.map(b => ({ id: b, label: { en: b, fa: b } })),
      ...categories.map(c => ({ id: c, label: { en: c, fa: c === 'Phone' ? 'گوشی' : c === 'Tablet' ? 'تبلت' : c === 'Laptop' ? 'لپ‌تاپ' : c === 'Watch' ? 'ساعت' : c } }))
    ];
    
    // حذف موارد تکراری
    const unique = result.filter((item, index, self) => 
      index === self.findIndex(f => f.id === item.id)
    );
    
    res.json(unique);
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/categories - دریافت همه دسته‌بندی‌ها و برندها
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    
    const result = [
      { id: 'All', label: { en: 'All', fa: 'همه' } },
      ...brands.map(b => ({ id: b, label: { en: b, fa: b } })),
      ...categories.map(c => ({ 
        id: c, 
        label: { 
          en: c, 
          fa: c === 'Phone' ? 'گوشی' : 
               c === 'Tablet' ? 'تبلت' : 
               c === 'Laptop' ? 'لپ‌تاپ' : 
               c === 'Watch' ? 'ساعت' : 
               c === 'Accessory' ? 'لوازم جانبی' : c 
        } 
      }))
    ];
    
    // حذف موارد تکراری
    const unique = result.filter((item, index, self) => 
      index === self.findIndex(f => f.id === item.id)
    );
    
    res.json(unique);
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    res.status(500).json({ error: error.message });
  }
});
