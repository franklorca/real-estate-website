// server/propertyRoutes.js
const express = require("express");
const db = require("./db");
const { requireAdmin } = require("./authMiddleware");

const router = express.Router();

// === GET ALL PROPERTIES WITH SEARCH AND FILTERING (PUBLIC) ===
// This is the single, authoritative route for fetching lists of properties.
// It handles both fetching all properties and fetching filtered results.
router.get("/", async (req, res) => {
  // Add console logging to help debug the filters being received.
  console.log("Received filter query:", req.query);

  try {
    let query = db("properties").select("*");

    // 1. Search by City (case-insensitive keyword search)
    if (req.query.city) {
      query = query.where("city", "ilike", `%${req.query.city}%`);
    }
    // New filter for Listing Type
    if (req.query.listing_type) {
      query = query.where("listing_type", req.query.listing_type);
    }

    // 2. Filter by Minimum Price
    if (req.query.minPrice) {
      query = query.where("price", ">=", parseFloat(req.query.minPrice));
    }

    // 3. Filter by Maximum Price
    if (req.query.maxPrice) {
      query = query.where("price", "<=", parseFloat(req.query.maxPrice));
    }

    // 4. Filter by Minimum Bedrooms
    if (req.query.bedrooms) {
      query = query.where("bedrooms", ">=", parseInt(req.query.bedrooms, 10));
    }

    const properties = await query.orderBy("id");
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Error fetching properties" });
  }
});

// === GET A SINGLE PROPERTY BY ID (PUBLIC) ===
// This route must be defined AFTER the general '/' route to avoid conflicts
// with routes like '/search' if you add them later. However, with our current structure,
// placing it here after the more general search route is also safe.
router.get("/:id", async (req, res) => {
  try {
    const propertyId = parseInt(req.params.id, 10);

    // Validate that the ID is a number to prevent errors
    if (isNaN(propertyId)) {
      return res.status(400).json({ message: "Invalid property ID." });
    }

    const property = await db("properties").where({ id: propertyId }).first();

    if (property) {
      res.json(property);
    } else {
      // This will now correctly trigger if a property with the ID doesn't exist
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(`Error fetching property with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Error fetching property" });
  }
});

// === CREATE A NEW PROPERTY (ADMIN ONLY) ===
router.post("/", requireAdmin, async (req, res) => {
  try {
    const [newProperty] = await db("properties")
      .insert(req.body)
      .returning("*");
    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Error creating property" });
  }
});

// === UPDATE A PROPERTY (ADMIN ONLY) ===
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const propertyId = parseInt(req.params.id, 10);
    if (isNaN(propertyId)) {
      return res.status(400).json({ message: "Invalid property ID." });
    }

    const count = await db("properties")
      .where({ id: propertyId })
      .update(req.body);

    if (count > 0) {
      const updatedProperty = await db("properties")
        .where({ id: propertyId })
        .first();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(`Error updating property with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Error updating property" });
  }
});

// === DELETE A PROPERTY (ADMIN ONLY) ===
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const propertyId = parseInt(req.params.id, 10);
    if (isNaN(propertyId)) {
      return res.status(400).json({ message: "Invalid property ID." });
    }

    const count = await db("properties").where({ id: propertyId }).del();

    if (count > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(`Error deleting property with ID ${req.params.id}:`, error);
    res.status(500).json({ message: "Error deleting property" });
  }
});

module.exports = router;
