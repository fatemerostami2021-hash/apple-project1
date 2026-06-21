import express from "express";
import multer  from "multer";
import path    from "path";
import fs      from "fs";

const router = express.Router();

/* پوشه‌های مجاز برای آپلود */
const ALLOWED_TYPES = ["covers", "gallery", "products", "slides"];

/* تنظیمات ذخیره‌سازی */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = ALLOWED_TYPES.includes(req.query.type) ? req.query.type : "misc";
    const dir  = path.join(process.cwd(), "uploads", type);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext       = path.extname(file.originalname);
    const safeName  = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|avif|gif/;
  const isValidExt  = allowed.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowed.test(file.mimetype);
  if (isValidExt && isValidMime) cb(null, true);
  else cb(new Error("فقط فایل‌های تصویری مجاز هستند (jpg, png, webp, avif, gif)"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
});

/* POST /api/upload/image?type=covers|gallery|products|slides */
router.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: "فایلی ارسال نشد" });

  const type = ALLOWED_TYPES.includes(req.query.type) ? req.query.type : "misc";
  const url  = `/uploads/${type}/${req.file.filename}`;

  res.json({ success: true, url });
});

/* error handler مخصوص multer (سایز/فرمت غلط) */
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ success: false, error: err.message });
  }
  next();
});

export default router;
