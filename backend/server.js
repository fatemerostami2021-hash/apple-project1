import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes    from "./routes/auth.js";
import aboutRoutes   from "./routes/about.js";
import productRoutes from "./routes/products.js";
import articleRoutes from "./routes/articles.js";
import likeRoutes    from "./routes/like.js";
import viewsRoutes   from "./routes/views.js";
import commentRoutes from "./routes/comments.js";
import adminRoutes   from "./routes/admin.js";
import uploadRoutes  from "./routes/upload.js";
import slideRoutes   from "./routes/slides.js";
import footerRoutes  from "./routes/footer.js";

dotenv.config();

const app   = express();
const PORT  = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== "production";

/* ✅ اصلی‌ترین fix: trust proxy برای Vercel/Render
   بدون این خط، express-rate-limit با هدر X-Forwarded-For
   conflict می‌کنه و درخواست‌ها هرگز به Mongoose نمی‌رسن */
app.set("trust proxy", 1);

/* ── CORS ── */
const staticOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  ...(process.env.ALLOWED_ORIGINS?.split(",").map(o => o.trim()) || []),
];
const localNet = /^http:\/\/(192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+):(5173|5174|5175)$/;

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (staticOrigins.includes(origin) || (isDev && localNet.test(origin))) {
      return cb(null, true);
    }
    console.log("❌ Blocked CORS:", origin);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

app.use(helmet({ crossOriginEmbedderPolicy: false }));

/* ✅ Rate Limit — با validate برای جلوگیری از warning در express-rate-limit v7+ */
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 1000 : 200,
  message: { error: "Too many requests" },
  validate: { trustProxy: false }, /* چون قبلاً app.set('trust proxy',1) زدیم */
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("public/uploads"));

/* ── MongoDB Connection ──
   ✅ یکبار وصل میشه و cache میشه
   مناسب برای Serverless (Vercel) که instance ها می‌میرن و دوباره زنده میشن */
let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set!");
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS:          45000,
    maxPoolSize:              10,
    bufferCommands:           false, /* ✅ به‌جای buffering، خطا بده */
  });

  isConnected = true;
  console.log("✅ MongoDB Atlas connected");
}

/* ✅ مهم‌ترین اصلاح نسبت به نسخه‌ی قبلی:
   این میدلور باید قبل از تمام روت‌های /api ثبت شود، نه بعد از آن‌ها.
   در Express ترتیب app.use() = ترتیب اجرا. اگر این میدلور بعد از
   روت‌ها بیاید، درخواست هرگز قبل از رسیدن به کوئری Mongoose صبر
   نمی‌کند و دقیقاً همان مشکل قبلی (buffering/timeout) تکرار می‌شود. */
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ DB Connection failed:", err.message);
    res.status(503).json({
      error: "Database connection failed",
      detail: isDev ? err.message : "Service temporarily unavailable",
    });
  }
});

/* ── Routes ── */
app.use("/api/auth",     authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/slides",   slideRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/articles", likeRoutes);
app.use("/api/articles", viewsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin",    adminRoutes);
app.use("/api/about",    aboutRoutes);
app.use("/api/upload",   uploadRoutes);
app.use("/api/footer",   footerRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    env: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

/* ── Error Handler ── */
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS: origin not allowed" });
  }
  console.error("❌ Server Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

/* ── Start Server (فقط در حالت non-serverless) ── */
if (process.env.NODE_ENV !== "production" || process.env.FORCE_LISTEN) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      console.error("❌ Initial DB connection failed:", err.message);
      process.exit(1);
    });
} else {
  /* در Vercel: یک بار DB رو وارم کن تا اولین request سریع‌تر باشه */
  connectDB().catch(err => console.error("❌ Initial DB warmup failed:", err.message));
}

export default app;