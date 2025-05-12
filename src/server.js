const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// Mock database for users (Replace with real database logic)
const users = [
  { id: 1, username: 'admin', password: '$2a$10$K1z6U4zSf9q.DNFBsdf3PqaHok9y7EMzn.L2gUchjeEdmwa9hRCOe', role: 'admin' }, // hashed password 'admin123'
];

// Login Route (POST /login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).send('Invalid username or password');
  }

  // Compare passwords
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err || !isMatch) {
      return res.status(400).send('Invalid username or password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token }); // Send token to client
  });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(400).send('Invalid token');
    }
    req.user = decoded; // Store decoded user info
    next();
  });
};

// Protected route for Admin Dashboard
app.get('/admin', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Forbidden');
  }

  res.send('Welcome to the Admin Dashboard');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
