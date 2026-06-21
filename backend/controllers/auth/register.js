import User from '../../models/User.js';
import { hashPassword } from '../../utils/security/encrypt.js';
import { validateEmail, validatePassword } from '../../utils/validation.js';
import { generateToken } from '../../utils/jwt.js';

export const register = async (req, res) => {
  try {
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'این ایمیل قبلاً ثبت شده است' 
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      role: 'user',
      isActive: true
    });

    await user.save();

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
    console.error('❌ Error in register:', error);
    res.status(500).json({ 
      success: false, 
      error: 'خطا در ثبت‌نام' 
    });
  }
};
