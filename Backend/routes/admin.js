const express = require("express");
const Admin = require("../models/admin");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Multer setup
const uploadsDir = path.join(__dirname, "..", "..", "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add product with image upload
router.post("/add-product", upload.single("image"), async (req, res) => {
  const { name, category, price, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const product = new Product({
      name,
      category,
      price,
      description,
      image,
    });
    await product.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
