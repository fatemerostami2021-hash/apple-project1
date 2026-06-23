import express from "express";
import SiteAbout from "../models/SiteAbout.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/* ════════════════════════════════════════
   GET /api/about
   عمومی — برای نمایش در صفحه‌ی About فروشگاه
════════════════════════════════════════ */
router.get("/", async (req, res) => {
  try {
    const about = await SiteAbout.getSingleton();
    res.json(about);
  } catch (err) {
    console.error("❌ Error fetching about:", err.message);
    res.status(500).json({ error: "Failed to fetch about content" });
  }
});

/* ════════════════════════════════════════
   PUT /api/about
   فقط ادمین — ویرایش محتوای About
════════════════════════════════════════ */
router.put("/", authMiddleware, async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden - Admins only" });
    }

    const about = await SiteAbout.getSingleton();

    const {
      title,
      story,
      mission,
      features,
      techStack,
      creator,
      active,
    } = req.body;

    if (title) about.title = title;
    if (story) about.story = story;
    if (mission) about.mission = mission;
    if (Array.isArray(features)) about.features = features;
    if (Array.isArray(techStack)) about.techStack = techStack;
    if (creator) about.creator = { ...about.creator.toObject?.(), ...creator };
    if (typeof active === "boolean") about.active = active;

    await about.save();
    res.json({ success: true, about });
  } catch (err) {
    console.error("❌ Error updating about:", err.message);
    res.status(500).json({ error: "Failed to update about content" });
  }
});

export default router;
