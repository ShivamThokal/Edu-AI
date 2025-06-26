// server/scripts/createAdmin.js
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ username: "admin" });
    if (existing) {
      console.log("⚠️  Admin already exists.");
    } else {
      await User.create({
        username: "admin",
        password: "admin123",
        role: "admin"
      });
      console.log("✅ Admin user created: admin / admin123");
    }
    process.exit();
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });
