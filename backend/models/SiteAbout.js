import mongoose from "mongoose";

const localizedString = {
  en: { type: String, default: "" },
  fa: { type: String, default: "" },
};

const featureSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "✨" },
    title: localizedString,
    description: localizedString,
  },
  { _id: false }
);

const siteAboutSchema = new mongoose.Schema(
  {
    title: { type: localizedString, default: () => ({}) },
    story: { type: localizedString, default: () => ({}) },
    mission: { type: localizedString, default: () => ({}) },
    features: { type: [featureSchema], default: [] },
    techStack: { type: [String], default: [] },
    creator: {
      name: { type: String, default: "" },
      role: { type: localizedString, default: () => ({}) },
      portfolioUrl: { type: String, default: "" },
      githubUrl: { type: String, default: "" },
      linkedinUrl: { type: String, default: "" },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

siteAboutSchema.statics.getSingleton = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create({
      title: { en: "About Our Store", fa: "درباره فروشگاه ما" },
      story: {
        en: "A showcase e-commerce platform for Apple and Samsung products, built to demonstrate a modern shopping experience.",
        fa: "یک پلتفرم نمایشی فروشگاهی برای محصولات اپل و سامسونگ، که برای نمایش یک تجربه‌ی خرید مدرن ساخته شده است.",
      },
      mission: {
        en: "To deliver a fast, bilingual, and beautifully designed shopping experience.",
        fa: "ارائه‌ی یک تجربه‌ی خرید سریع، دوزبانه و با طراحی زیبا.",
      },
      features: [
        {
          icon: "🛒",
          title: { en: "Full Shopping Cart", fa: "سبد خرید کامل" },
          description: {
            en: "Add to cart, checkout, and order management.",
            fa: "افزودن به سبد، تسویه حساب و مدیریت سفارش‌ها.",
          },
        },
        {
          icon: "🌐",
          title: { en: "Bilingual (EN/FA)", fa: "دوزبانه (فارسی/انگلیسی)" },
          description: {
            en: "Full RTL/LTR support across the entire site.",
            fa: "پشتیبانی کامل از راست‌چین و چپ‌چین در تمام سایت.",
          },
        },
        {
          icon: "🌓",
          title: { en: "Dark / Light Theme", fa: "تم تیره و روشن" },
          description: {
            en: "A galaxy-themed dark mode and a clean light mode.",
            fa: "تم تیره با افکت کهکشانی و تم روشن و تمیز.",
          },
        },
        {
          icon: "⚙️",
          title: { en: "Admin Panel", fa: "پنل مدیریت" },
          description: {
            en: "Full CRUD for products, articles, and site content.",
            fa: "مدیریت کامل محصولات، مقالات و محتوای سایت.",
          },
        },
      ],
      techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Framer Motion"],
      creator: {
        name: "Fatemeh Rostami",
        role: { en: "Full-Stack Developer", fa: "توسعه‌دهنده فول‌استک" },
        portfolioUrl: "",
        githubUrl: "",
        linkedinUrl: "",
      },
      active: true,
    });
  }
  return doc;
};

export default mongoose.model("SiteAbout", siteAboutSchema);
