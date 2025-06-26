const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const users = await User.find();
    console.log("Users in DB:", users);
    process.exit();
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });
