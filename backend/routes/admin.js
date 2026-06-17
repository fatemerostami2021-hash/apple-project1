import express from 'express';
const router = express.Router();
import Article from '../models/Article.js';
import Product from '../models/Product.js';
import Comment from '../models/Comment.js';
import authMiddleware from '../middleware/auth.js';

// ============ ARTICLES ============

// دریافت همه مقالات
router.get('/articles', authMiddleware, async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// دریافت یک مقاله
router.get('/articles/:slug', authMiddleware, async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ایجاد مقاله جدید
router.post('/articles', authMiddleware, async (req, res) => {
  try {
    const { slug, brand, title, content, cover, gallery, mainVideo, relatedVideos, readTime, tags, author } = req.body;
    
    const existing = await Article.findOne({ slug });
    if (existing) return res.status(400).json({ error: 'Slug already exists' });
    
    const article = new Article({
      slug,
      brand: brand || 'Apple',
      title: title || { fa: '', en: '' },
      content: content || { fa: '', en: '' },
      cover: cover || '',
      gallery: gallery || [],
      mainVideo: mainVideo || { id: '', title: '', duration: '' },
      relatedVideos: relatedVideos || [],
      readTime: readTime || 10,
      tags: tags || [],
      author: author || 'مدیر سایت',
      publishDate: new Date()
    });
    
    await article.save();
    res.json({ success: true, article });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ویرایش مقاله
router.put('/articles/:slug', authMiddleware, async (req, res) => {
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
    
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json({ success: true, article });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// حذف مقاله
router.delete('/articles/:slug', authMiddleware, async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    await Comment.deleteMany({ articleSlug: req.params.slug });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ PRODUCTS ============

// دریافت همه محصولات
router.get('/products', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// دریافت یک محصول
router.get('/products/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ایجاد محصول جدید
router.post('/products', authMiddleware, async (req, res) => {
  try {
    const { name, slug, brand, category, price, thumbnail, images, description, inStock, tags } = req.body;
    
    const existing = await Product.findOne({ slug });
    if (existing) return res.status(400).json({ error: 'Slug already exists' });
    
    const product = new Product({
      name: name || { fa: '', en: '' },
      slug,
      brand,
      category: category || 'Phone',
      price: parseFloat(price),
      thumbnail: thumbnail || '',
      images: images || [],
      description: description || { fa: '', en: '' },
      inStock: inStock !== false,
      tags: tags || []
    });
    
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ویرایش محصول
router.put('/products/:id', authMiddleware, async (req, res) => {
  try {
    const { name, brand, category, price, thumbnail, images, description, inStock, tags } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        brand,
        category,
        price: parseFloat(price),
        thumbnail,
        images: images || [],
        description,
        inStock,
        tags,
        updatedAt: new Date()
      },
      { new: true, runValidators: false }
    );
    
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// حذف محصول
router.delete('/products/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

// GET /api/admin/stats - دریافت آمار کلی
router.get('/stats', async (req, res) => {
  try {
    // در اینجا باید تعداد محصولات، مقالات، سفارشات و کاربران را از دیتابیس بگیرید
    // فعلاً داده‌های نمونه برمی‌گردانیم
    res.json({
      products: 31,
      articles: 28,
      orders: 0,
      users: 1
    });
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({ error: error.message });
  }
});
