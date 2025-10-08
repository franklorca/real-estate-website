const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();
const JWT_SECRET = 'a-super-secret-key-for-our-mvp';

const { requireAuth } = require('./authMiddleware');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const password_hash = bcrypt.hashSync(password, 10);

    const [newUserId] = await db('users').insert({ name, email, password_hash, role: 'member' });

    const newUser = await db('users').where({ id: newUserId }).first();

    const payload = { userId: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User registered successfully!',
      token: token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: 'Error registering user' });
  }
});


router.get('/me/saved-properties', requireAuth, async (req, res) => {
  try {
    const saved = await db('saved_properties')
      .join('properties', 'saved_properties.property_id', '=', 'properties.id')
      .where('saved_properties.user_id', req.user.userId)
      .select('properties.*');
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved properties' });
  }
});

// === SAVE A PROPERTY ===
router.post('/me/saved-properties', requireAuth, async (req, res) => {
  const { property_id } = req.body;
  const user_id = req.user.userId;
  try {
    await db('saved_properties').insert({ user_id, property_id });
    res.status(201).json({ message: 'Property saved successfully' });
  } catch (error) {
    // Handle case where it's already saved (violates primary key)
    if (error.code === 'SQLITE_CONSTRAINT') {
      return res.status(409).json({ message: 'Property already saved' });
    }
    res.status(500).json({ message: 'Error saving property' });
  }
});

// === UNSAVE A PROPERTY ===
router.delete('/me/saved-properties/:propertyId', requireAuth, async (req, res) => {
  const { propertyId } = req.params;
  const user_id = req.user.userId;
  try {
    const count = await db('saved_properties')
      .where({ user_id, property_id: propertyId })
      .del();
    if (count > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Saved property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error unsaving property' });
  }
});

module.exports = router;