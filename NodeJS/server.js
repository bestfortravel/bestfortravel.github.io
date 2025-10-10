const express = require('express');
const cors = require('cors');
const auth = require('./middleware/auth'); // 👈 import here

const app = express();

// ✅ Enable CORS globally
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Hardcoded credentials
const VALID_EMAIL = 'bf@t.com';
const VALID_PASSWORD = 'MyPassword';
const FAKE_TOKEN = 'fake-jwt-token';

// Login endpoint (no auth)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  console.log('email', email)
  console.log('password', password)
  console.log('VALID_EMAIL', email === VALID_EMAIL)
  console.log('VALID_PASSWORD', password === VALID_PASSWORD)

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    return res.json({ success: true, token: FAKE_TOKEN });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Protected routes (auth middleware)
app.get('/api/hom', auth, (req, res) => {
  res.json({ message: 'Welcome to protected Home page' });
});

app.get('/api/profile', auth, (req, res) => {
  res.json({ message: 'This is your protected Profile' });
});

app.listen(5050, () => {
  console.log('✅ Server running on http://localhost:5050');
});
