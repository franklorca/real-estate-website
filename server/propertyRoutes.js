// server/propertyRoutes.js
const express = require('express');
const db = require('./db');
const { requireAdmin } = require('./authMiddleware'); // <-- Import our bouncer

const router = express.Router();

// === GET ALL PROPERTIES (PUBLIC) ===
// This route does NOT have the middleware, so anyone can see it.
router.get('/', async (req, res) => {
  try {
    const properties = await db('properties').select('*').orderBy('id');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties' });
  }
});

// === GET A SINGLE PROPERTY BY ID (PUBLIC) ===
// Path: GET /api/properties/:id
router.get('/:id', async (req, res) => {
  try {
    const property = await db('properties').where({ id: req.params.id }).first();
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property' });
  }
});

// === CREATE A NEW PROPERTY (ADMIN ONLY) ===
// We place the requireAdmin middleware before the main route logic.
router.post('/', requireAdmin, async (req, res) => {
  try {
    const [newPropertyId] = await db('properties').insert(req.body);
    const newProperty = await db('properties').where({ id: newPropertyId }).first();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property' });
  }
});

// === UPDATE A PROPERTY (ADMIN ONLY) ===
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const count = await db('properties').where({ id: req.params.id }).update(req.body);
    if (count > 0) {
      const updatedProperty = await db('properties').where({ id: req.params.id }).first();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating property' });
  }
});

// === DELETE A PROPERTY (ADMIN ONLY) ===
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const count = await db('properties').where({ id: req.params.id }).del();
    if (count > 0) {
      res.status(204).send(); // 204 No Content is a standard success response for delete
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property' });
  }
});

module.exports = router;