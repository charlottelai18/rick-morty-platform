const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

// In-memory user store (for now)
const users = [];

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ message: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashed });

  res.json({ message: 'User registered' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '2h' });

  res.json({ token });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
