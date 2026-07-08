import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// ============================================================
// 🔐 Middleware بررسی API Key مخصوص Agent
// ============================================================
const checkAgentKey = (req, res, next) => {
  const apiKey = req.headers['x-agent-key'];
  const validKey = process.env.AGENT_API_KEY || 'agent-secret-key-2026';
  
  if (!apiKey || apiKey !== validKey) {
    console.log('❌ Invalid Agent API Key:', apiKey);
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized - Invalid Agent API Key' 
    });
  }
  next();
};

// ============================================================
// 📰 ایجاد مقاله توسط Agent (با API Key)
// ============================================================
router.post('/agent-article', checkAgentKey, async (req, res) => {
  try {
    console.log('📝 درخواست ایجاد مقاله توسط Agent:', req.body.slug);
    
    const { slug, title_fa, title_en, content_fa, content_en, meta_description_fa, meta_description_en, tags } = req.body;

    // اعتبارسنجی
    if (!slug || !title_fa || !content_fa) {
      return res.status(400).json({ 
        success: false, 
        error: 'فیلدهای slug, title_fa, content_fa الزامی هستند' 
      });
    }

    // بررسی تکراری نبودن slug
    const existing = await Article.findOne({ slug });
    if (existing) {
      return res.status(409).json({ 
        success: false, 
        error: `مقاله با اسلاگ "${slug}" قبلاً وجود دارد` 
      });
    }

    // ایجاد مقاله جدید
    const article = new Article({
      slug,
      title: {
        fa: title_fa,
        en: title_en || title_fa
      },
      content: {
        fa: content_fa,
        en: content_en || content_fa
      },
      excerpt: {
        fa: meta_description_fa || title_fa,
        en: meta_description_en || title_en || title_fa
      },
      tags: tags || [],
      active: true,
      publishDate: new Date().toISOString().split('T')[0]
    });

    await article.save();

    console.log('✅ مقاله با موفقیت ایجاد شد:', slug);

    res.status(201).json({
      success: true,
      message: 'مقاله با موفقیت ایجاد شد',
      data: article
    });
  } catch (error) {
    console.error('❌ Agent Article Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export default router;
