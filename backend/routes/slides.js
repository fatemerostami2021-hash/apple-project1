import express from 'express';
const router = express.Router();
import Slide from '../models/Slide.js';

// GET /api/slides - دریافت همه اسلایدها
router.get('/', async (req, res) => {
  try {
    const slides = await Slide.find({ active: true })
      .sort({ order: 1 })
      .populate('productId', 'name slug price thumbnail');
    res.json(slides);
  } catch (error) {
    console.error('❌ Error fetching slides:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/slides/admin - دریافت همه اسلایدها (برای ادمین)
router.get('/admin', async (req, res) => {
  try {
    const slides = await Slide.find().sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/slides - ایجاد اسلاید جدید (ادمین)
router.post('/', async (req, res) => {
  try {
    const slide = new Slide(req.body);
    await slide.save();
    res.status(201).json(slide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/slides/:id - ویرایش اسلاید (ادمین)
router.put('/:id', async (req, res) => {
  try {
    const slide = await Slide.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    res.json(slide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/slides/:id - حذف اسلاید (ادمین)
router.delete('/:id', async (req, res) => {
  try {
    const slide = await Slide.findByIdAndDelete(req.params.id);
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
