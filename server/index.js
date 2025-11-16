// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const propertyRoutes = require("./propertyRoutes");
const agentRoutes = require("./agentRoutes");
const inquiryRoutes = require("./inquiryRoutes");
const adminRoutes = require("./adminRoutes");
const paymentRoutes = require("./paymentRoutes");
const cloudinaryRoutes = require("./cloudinaryRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the server! The club is open." });
});

// Use the auth routes for any request to /api/auth
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
