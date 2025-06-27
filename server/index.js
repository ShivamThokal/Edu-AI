// === server/index.js ===
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") }); // Force path

const express = require("express");
const cors = require("cors");
// const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');


const OpenAI = require("openai");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

//cloudinary connection
const cloudinaryConnection = require('./Config/Cloudinary');
cloudinaryConnection();


const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  tempFileDir:'/tmp',
  useTempFiles: true,
}))


// console.log("Loaded API key:", OPENAI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
