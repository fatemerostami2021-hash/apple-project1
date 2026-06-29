import express from "express";
import mongoose from "mongoose";
const router = express.Router();

router.post("/import/:collection", async (req, res) => {
  try {
    const token = req.headers["x-migrate-token"];
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { collection } = req.params;
    const ALLOWED = ["products", "articles", "slides", "users", "siteabouts", "comments"];
    if (!ALLOWED.includes(collection)) {
      return res.status(400).json({ error: "Invalid collection name" });
    }

    const docs = req.body.docs;
    if (!Array.isArray(docs) || docs.length === 0) {
      return res.status(400).json({ error: "No documents provided" });
    }

    const col = mongoose.connection.db.collection(collection);
    const { ObjectId } = mongoose.mongo;

    const fixedDocs = docs.map((d) => {
      if (d._id && typeof d._id === "string") {
        try { d._id = new ObjectId(d._id); } catch (e) {}
      }
      return d;
    });

    const existingCount = await col.countDocuments();
    if (existingCount > 0) {
      await col.deleteMany({});
    }

    const result = await col.insertMany(fixedDocs, { ordered: false });
    res.json({ success: true, inserted: result.insertedCount, collection });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
