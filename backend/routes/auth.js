import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ──────────────────────────────────────────────
// ثبت نام کاربر جدید
// POST /api/auth/register
// ──────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, bio } = req.body;
    
    // بررسی وجود کاربر
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.email === email 
          ? "این ایمیل قبلاً ثبت شده است" 
          : "این شماره تلفن قبلاً ثبت شده است" 
      });
    }
    
    // ایجاد کاربر جدید
    const user = new User({
      name,
      email,
      phone: phone || undefined,
      password,
      bio: bio || "",
    });
    
    await user.save();
    
    // ساخت توکن JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "30d" }
    );
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "خطا در ثبت نام" });
  }
});

// ──────────────────────────────────────────────
// ورود کاربر
// POST /api/auth/login
// ──────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    
    // جستجو با ایمیل یا شماره تلفن
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { phone: identifier },
      ],
    });
    
    if (!user) {
      return res.status(401).json({ error: "ایمیل/شماره یا رمز عبور اشتباه است" });
    }
    
    // بررسی رمز
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: "ایمیل/شماره یا رمز عبور اشتباه است" });
    }
    
    // به‌روزرسانی آخرین ورود
    user.lastLogin = new Date();
    await user.save();
    
    // ساخت توکن
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "30d" }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "خطا در ورود" });
  }
});

// ──────────────────────────────────────────────
// دریافت اطلاعات کاربر جاری (با توکن)
// GET /api/auth/me
// ──────────────────────────────────────────────
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "توکن یافت نشد" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret-key");
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ error: "کاربر یافت نشد" });
    }
    
    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: "توکن نامعتبر است" });
  }
});

export default router;
