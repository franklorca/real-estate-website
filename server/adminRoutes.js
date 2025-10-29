// server/adminRoutes.js
const express = require("express");
const db = require("./db");
const { requireAdmin } = require("./authMiddleware"); // All routes here are admin-only

const router = express.Router();

// Use the middleware for all routes in this file
router.use(requireAdmin);

// === GET ALL USERS (ADMIN ONLY) ===
// Path: GET /api/admin/users
router.get("/users", async (req, res) => {
  try {
    const users = await db("users")
      .select("id", "name", "email", "role", "membership_status")
      .orderBy("id");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users." });
  }
});

// === GET A SINGLE USER (ADMIN ONLY) ===
// Path: GET /api/admin/users/:id
router.get("/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await db("users")
      .where({ id: userId })
      .select("id", "name", "email", "role", "membership_status")
      .first();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user." });
  }
});

// === UPDATE A USER (ADMIN ONLY) ===
// Path: PUT /api/admin/users/:id
router.put("/users/:id", async (req, res) => {
  // Only allow updating specific, safe fields
  const { role, membership_status } = req.body;
  const updates = { role, membership_status };

  try {
    const userId = parseInt(req.params.id, 10);
    const count = await db("users").where({ id: userId }).update(updates);
    if (count > 0) {
      const updatedUser = await db("users").where({ id: userId }).first();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user." });
  }
});

module.exports = router;
