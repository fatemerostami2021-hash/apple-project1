import express from "express";
import mongoose from "mongoose";
const router = express.Router();

// ====== 🚀 موقتی — برای مهاجرت داده با bulkWrite ======
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

    // dedupe درون خودِ payload بر اساس _id
    const seen = new Set();
    const fixedDocs = [];
    for (const d of docs) {
      if (d._id && typeof d._id === "string") {
        try { d._id = new ObjectId(d._id); } catch (e) {}
      }
      const key = d._id ? d._id.toString() : JSON.stringify(d);
      if (seen.has(key)) {
        console.warn("⚠️ duplicate _id inside payload, skipped:", key);
        continue;
      }
      seen.add(key);
      fixedDocs.push(d);
    }

    // bulkWrite با replaceOne+upsert => atomic و idempotent
    const ops = fixedDocs.map((doc) => ({
      replaceOne: {
        filter: { _id: doc._id },
        replacement: doc,
        upsert: true,
      },
    }));

    const result = await col.bulkWrite(ops, { ordered: false });

    res.json({
      success: true,
      collection,
      received: docs.length,
      afterDedupe: fixedDocs.length,
      upserted: result.upsertedCount,
      modified: result.modifiedCount,
      matched: result.matchedCount,
    });
  } catch (err) {
    console.error("Import error for", req.params.collection, ":", err);
    res.status(500).json({
      error: err.message,
      writeErrors: err.writeErrors?.map(e => e.errmsg) || undefined,
    });
  }
});

export default router;
