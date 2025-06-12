// index.js: Server-side entry point that handles authentication logic using Express.js

// Import required modules
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = 5050;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// In-memory user store (for demonstration purposes only, not persistent)
const users = [];

// Secret key for signing JWT tokens
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

/**
 * POST /api/register
 * Registers a new user with name, email, and password.
 * Password is hashed before storing.
 */
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existing = users.find(u => u.email === email);
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // Hash the password and store user
    const hashed = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashed });

    res.json({ message: 'User registered' });
});

/**
 * POST /api/login
 * Logs in a user by verifying credentials.
 * Returns a JWT token if successful.
 */
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
