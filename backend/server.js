import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import aboutRoutes from "./routes/about.js";
import productRoutes from "./routes/products.js";
import articleRoutes from "./routes/articles.js";
import likeRoutes from "./routes/like.js";
import viewsRoutes from "./routes/views.js";
import commentRoutes from "./routes/comments.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import slideRoutes from "./routes/slides.js";
import footerRoutes from "./routes/footer.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ════════════════════════════════════════
   ✅ CORS — توسعه: لوکال + هر دستگاه روی شبکه محلی
   پروڈاکشن: فقط دامنه‌های رسمی (از .env بخون)
════════════════════════════════════════ */
const isDev = process.env.NODE_ENV !== "production";

// دامنه‌های ثابت (localhost + production domains از .env)
const staticOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  ...(process.env.ALLOWED_ORIGINS?.split(",").map(o => o.trim()) || []),
];

// الگوی IP شبکه محلی برای حالت dev (مثل 192.168.x.x یا 198.18.x.x با هر پورت ویت)
const localNetworkPattern = /^http:\/\/(192\.168\.\d{1,3}\.\d{1,3}|198\.18\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}):(5173|5174|5175)$/;

app.use(cors({
  origin: function (origin, callback) {
    // درخواست‌های بدون origin (مثل Postman، curl، یا same-origin) همیشه مجازن
    if (!origin) return callback(null, true);

    const isStaticAllowed = staticOrigins.includes(origin);
    const isLocalNetwork = isDev && localNetworkPattern.test(origin);

    if (isStaticAllowed || isLocalNetwork) {
      return callback(null, true);
    }

    // ✅ این بار واقعاً بلاک می‌کنیم، نه فقط لاگ می‌کنیم
    console.log("❌ Blocked CORS from:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

app.use(helmet({ crossOriginEmbedderPolicy: false }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/slides", slideRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/articles", likeRoutes);
app.use("/api/articles", viewsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/footer", footerRoutes);
app.use("/uploads", express.static("public/uploads"));

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ✅ CORS error handler جدا — پیام واضح‌تر برمی‌گردونه
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS: This origin is not allowed" });
  }
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/apple_store")
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// ✅ فقط در لوکال اجرا شود
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// ✅ برای Vercel
export default app;
