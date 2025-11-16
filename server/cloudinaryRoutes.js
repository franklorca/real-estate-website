// server/cloudinaryRoutes.js
const express = require("express");
const cloudinary = require("cloudinary").v2;
const { requireAdmin } = require("./authMiddleware");

const router = express.Router();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// This endpoint provides a signature for the frontend to use for direct uploads
router.get("/signature", requireAdmin, (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  try {
    // Use the api_sign_request method to create the signature
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: timestamp },
      process.env.CLOUDINARY_API_SECRET
    );
    res.json({ signature, timestamp });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    res.status(500).json({ error: "Failed to generate signature" });
  }
});

module.exports = router;
