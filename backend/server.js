import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
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

// ✅ CORS - همه پورت‌های توسعه
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ Blocked CORS from:', origin);
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
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
app.use("/api/upload", uploadRoutes);
app.use("/api/footer", footerRoutes);
app.use("/uploads", express.static("public/uploads"));

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/apple_store")
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
