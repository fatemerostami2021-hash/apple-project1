import User from '../../models/User.js';
import { comparePassword } from '../../utils/security/encrypt.js';
import { validateEmail } from '../../utils/validation.js';
import { generateToken } from '../../utils/jwt.js';

export const login = async (req, res) => {
  try {
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

    const user = await User.findOne({ email });
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

    const isPasswordValid = await comparePassword(password, user.password);
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
    console.error('❌ Error in login:', error);
    res.status(500).json({ 
      success: false, 
      error: 'خطا در ورود' 
    });
  }
};
