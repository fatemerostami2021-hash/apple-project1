import express from 'express';
const router = express.Router();

// داده‌های پیش‌فرض فوتر
const footerData = {
  email: "fatimarostami963369@gmail.com",
  phone: "+98 917 789 2994",
  location: "Shiraz, Iran",
  locationFa: "شیراز، ایران",
  brandName: "Apple Store",
  tagline: "Premium Tech Experience",
  taglineFa: "تجربه فناوری پریمیوم",
  description: "A premium destination for Apple and Samsung products.",
  descriptionFa: "مرجع تخصصی محصولات اپل و سامسونگ با طراحی مدرن.",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/fatemeh-rostami963/",
    instagram: "https://www.instagram.com/fateme.rosttamii",
    telegram: "https://t.me/fitness_mindset",
    whatsapp: "https://wa.me/989177892994",
  },
  copyrightText: "All rights reserved.",
  copyrightTextFa: "تمامی حقوق محفوظ است.",
  designerName: "Fatemeh Rostami",
  designerNameFa: "فاطمه رستمی",
};

// GET /api/footer
router.get('/', (req, res) => {
  res.json(footerData);
});

// PUT /api/footer (برای ادمین)
router.put('/', (req, res) => {
  const newData = req.body;
  Object.assign(footerData, newData);
  res.json({ success: true, data: footerData });
});

export default router;
