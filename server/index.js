// server/index.js

const express = require('express');
const cors = require('cors');
// --- ADD THIS LINE ---
const authRoutes = require('./authRoutes'); 
const userRoutes = require('./userRoutes');
const propertyRoutes = require('./propertyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the server! The club is open.' });
});

// --- AND ADD THIS LINE ---
// Use the auth routes for any request to /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});