const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();

const handleLogin = async (req, res, expectedRole) => {
  const { email, password } = req.body;
  try {
    const user = await db('users').where({ email }).first();
    
    if (!user || user.role !== expectedRole) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user.id, email: user.email, role: user.role, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful!',
      token: token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Error during login' });
  }
};


router.post('/login', (req, res) => handleLogin(req, res, 'admin'));
router.post('/member-login', (req, res) => handleLogin(req, res, 'member'));

module.exports = router;