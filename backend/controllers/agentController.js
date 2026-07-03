import dotenv from "dotenv";
dotenv.config();
import { PRODUCT_COMPLETION_PROMPT, ARTICLE_COMPLETION_PROMPT } from '../utils/prompts.js';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

function extractJSON(text) {
  const cleaned = text.replace(/```json|```/g, '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('پاسخ مدل فرمت JSON معتبر نداشت');
  return JSON.parse(match[0]);
}

const callOpenRouter = async (prompt, maxTokens = 2000) => {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY تنظیم نشده است');
  }

  console.log('📤 ارسال درخواست به OpenRouter...');
  console.log('🔑 کلید API:', OPENROUTER_API_KEY ? '✅ موجود است' : '❌ وجود ندارد');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 ثانیه timeout

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5000',
        'X-Title': 'Apple Store Agent'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ OpenRouter API Error:', error);
      throw new Error(`OpenRouter API error: ${error}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '{}';
    console.log('📦 پاسخ OpenRouter:', text.substring(0, 200) + '...');
    return extractJSON(text);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('درخواست به OpenRouter timeout شد (بیش از 30 ثانیه)');
    }
    throw error;
  }
};

export const completeProduct = async (req, res) => {
  try {
    const { name, brand, category, existingData } = req.body;
    if (!name || !brand) {
      return res.status(400).json({ success: false, error: 'نام و برند محصول الزامی است' });
    }

    const prompt = PRODUCT_COMPLETION_PROMPT({ name, brand, category, ...existingData });
    const completed = await callOpenRouter(prompt);

    res.json({ success: true, data: completed, message: 'محصول با موفقیت تکمیل شد' });
  } catch (error) {
    console.error('❌ Complete Product Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const completeArticle = async (req, res) => {
  try {
    const { title, brand, category, existingData } = req.body;
    if (!title || !brand) {
      return res.status(400).json({ success: false, error: 'عنوان و برند مقاله الزامی است' });
    }

    console.log('📝 ارسال درخواست برای مقاله:', title);
    
    const prompt = `فقط JSON برگردان. داده‌ی موجود مقاله: ${JSON.stringify({ title, brand, category, ...existingData })}`;
    const completed = await callOpenRouter(prompt, 4000);

    res.json({ success: true, data: completed, message: 'مقاله با موفقیت تکمیل شد' });
  } catch (error) {
    console.error('❌ Complete Article Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const completeBatch = async (req, res) => {
  try {
    const { type, items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'لیست آیتم‌ها خالی است' });
    }

    const results = [];
    const errors = [];

    for (const item of items) {
      try {
        const prompt = `فقط JSON برگردان: ${JSON.stringify(item)}`;
        const completed = await callOpenRouter(prompt);
        results.push({ item, completed });
      } catch (error) {
        errors.push({ item, error: error.message });
      }
    }

    res.json({
      success: true,
      results,
      errors,
      summary: { total: items.length, completed: results.length, failed: errors.length },
    });
  } catch (error) {
    console.error('❌ Batch Complete Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
