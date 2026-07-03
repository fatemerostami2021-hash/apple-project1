import express from 'express';
import rateLimit from 'express-rate-limit';
import { completeProduct, completeArticle, completeBatch } from '../controllers/agentController.js';

const router = express.Router();

// ============================================================
// 🛡️ فقط Rate Limit (بدون احراز هویت)
// ============================================================
const agentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 ساعت
  max: 20, // ۲۰ درخواست در ساعت
  message: {
    success: false,
    error: 'تعداد درخواست‌ها محدود است، لطفاً بعداً تلاش کنید',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ============================================================
// 🛣️ مسیرها (عمومی - بدون نیاز به توکن)
// ============================================================
router.post('/complete-product', agentLimiter, completeProduct);
router.post('/complete-article', agentLimiter, completeArticle);
router.post('/complete-batch', agentLimiter, completeBatch);

export default router;
