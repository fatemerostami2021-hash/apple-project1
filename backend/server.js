import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

/* ── import routes ── */
import productRoutes  from "./routes/products.js";
import samsungRoutes  from "./routes/samsung.js";
import articleRoutes  from "./routes/articles.js";
import commentRoutes  from "./routes/comments.js";
import adminRoutes    from "./routes/admin.js";
import slideRoutes    from "./routes/slides.js";
import authRoutes     from "./routes/auth.js";

const app  = express();
const PORT = process.env.PORT || 5000;

/* ══════════════════════════════════════════════
   Security Headers
══════════════════════════════════════════════ */
app.use(helmet({ crossOriginEmbedderPolicy: false }));

/* ══════════════════════════════════════════════
   CORS
══════════════════════════════════════════════ */
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
}));

/* ══════════════════════════════════════════════
   Rate Limiting
══════════════════════════════════════════════ */
const generalLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: "درخواست‌های زیاد — کمی صبر کنید" },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimit);
app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

/* ══════════════════════════════════════════════
   Static files
══════════════════════════════════════════════ */
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

/* ══════════════════════════════════════════════
   Routes — توجه: مسیرها با /api شروع می‌شوند
══════════════════════════════════════════════ */
app.use("/api/products",  productRoutes);
app.use("/api/samsung",   samsungRoutes);
app.use("/api/articles",  articleRoutes);
app.use("/api/comments",  commentRoutes);
app.use("/api/admin",     adminRoutes);
app.use("/api/slides",    slideRoutes);
app.use("/api/auth",      authRoutes);

/* Health check */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running", time: new Date() });
});

/* ══════════════════════════════════════════════
   Global Error Handler
══════════════════════════════════════════════ */
app.use((err, req, res, next) => {
  const status  = err.status  || 500;
  const message = err.message || "خطای سرور";
  if (process.env.NODE_ENV !== "production") {
    console.error(`[${req.method}] ${req.path} →`, err.message);
  }
  res.status(status).json({ error: message });
});

/* 404 Handler */
app.use((req, res) => {
  res.status(404).json({ error: `مسیر ${req.path} یافت نشد` });
});

/* ══════════════════════════════════════════════
   اتصال به MongoDB
══════════════════════════════════════════════ */
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/apple-store";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB متصل شد");
    app.listen(PORT, () => {
      console.log(`🚀 سرور روی پورت ${PORT} اجرا شد`);
      console.log(`📡 API: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((err) => {
    console.error("❌ خطا در اتصال MongoDB:", err.message);
    process.exit(1);
  });
