import express from "express";

const router = express.Router();

/* GET /api/slides — در آینده از DB خواهد خواند */
router.get("/", async (req, res, next) => {
  try {
    /* TODO: model Slide بساز و از MongoDB بخون */
    res.json([]);
  } catch (err) { next(err); }
});

export default router;
