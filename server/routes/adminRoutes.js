// === server/routes/adminRoutes.js ===
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const Topic = require("../models/Topic");
const path = require("path");

router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// CREATE Topic with optional files
router.post("/topics", auth(["admin"]), upload.fields([
  { name: "image", maxCount: 1 },
  { name: "pdf", maxCount: 1 }
]), async (req, res) => {
  const { level, subject, title } = req.body;
  const imageUrl = req.files.image?.[0].filename;
  const pdfUrl = req.files.pdf?.[0].filename;

  const topic = new Topic({ level, subject, title, imageUrl, pdfUrl });
  await topic.save();
  res.json({ message: "Topic added", topic });
});

// READ Topics
router.get("/topics", async (req, res) => {
  const topics = await Topic.find();
  res.json(topics);
});

// UPDATE Topic
router.put("/topics/:id", auth(["admin"]), async (req, res) => {
  const { level, subject, title } = req.body;
  const updated = await Topic.findByIdAndUpdate(
    req.params.id,
    { level, subject, title },
    { new: true }
  );
  res.json({ message: "Topic updated", updated });
});

// DELETE Topic
router.delete("/topics/:id", auth(["admin"]), async (req, res) => {
  await Topic.findByIdAndDelete(req.params.id);
  res.json({ message: "Topic deleted" });
});

module.exports = router;
