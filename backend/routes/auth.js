import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { validateEmail, validatePassword } from '../utils/validation.js';

const router = express.Router();

// ============================================================
// ثبت‌نام
// ============================================================
router.post('/register', async (req, res) => {
  try {
    console.log('📝 Register request:', req.body);
    
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'نام، ایمیل و رمز عبور الزامی است' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'ایمیل نامعتبر است' 
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ 
        success: false, 
        error: 'رمز عبور باید حداقل ۶ کاراکتر باشد' 
      });
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'این ایمیل قبلاً ثبت شده است' 
      });
    }

    // ✅ هش کردن رمز در اینجا
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      role: 'user',
      isActive: true
    });

    await user.save();
    console.log('✅ User created:', user._id);

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'ثبت‌نام با موفقیت انجام شد',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'خطا در ثبت‌نام: ' + error.message 
    });
  }
});

// ============================================================
// ورود
// ============================================================
router.post('/login', async (req, res) => {
  try {
    console.log('🔑 Login request:', req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'ایمیل و رمز عبور الزامی است' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'ایمیل نامعتبر است' 
      });
    }

    const user = await User.findOne({ 
      email: email.trim().toLowerCase() 
    });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'ایمیل یا رمز عبور اشتباه است' 
      });
    }

    if (user.isActive === false) {
      return res.status(403).json({ 
        success: false, 
        error: 'حساب کاربری شما غیرفعال شده است' 
      });
    }

    // ✅ مقایسه رمز با bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'ایمیل یا رمز عبور اشتباه است' 
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'ورود با موفقیت انجام شد',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'خطا در ورود: ' + error.message 
    });
  }
});

// ============================================================
// خروج
// ============================================================
router.post('/logout', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'خروج با موفقیت انجام شد'
    });
  } catch (error) {
    console.error('❌ Logout error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'خطا در خروج' 
    });
  }
});

export default router;
