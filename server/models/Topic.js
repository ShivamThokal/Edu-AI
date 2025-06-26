// === server/models/Topic.js ===
const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  level: { type: String, required: true },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: String,
  pdfUrl: String
});

module.exports = mongoose.model("Topic", topicSchema);
