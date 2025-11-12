const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory "database" (will reset when server restarts – fine for now)
const users = [];

// Test route
app.get('/', (req, res) => {
  res.send('FurNest backend is running 🐾');
});

// SIGNUP ROUTE
app.post('/signup', (req, res) => {
  const { fullName, email, password } = req.body;

  console.log('Incoming signup data:', fullName, email, password);

  // Basic validation
  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: 'All fields (fullName, email, password) are required.',
    });
  }

  // Check for existing user by email
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    console.log('⚠️ Signup blocked: email already exists:', email);
    return res.status(409).json({
      message: 'An account with this email already exists. Please log in instead.',
    });
  }

  // Save new user
  const newUser = { fullName, email, password };
  users.push(newUser);

  console.log('Users array now:', users);

  return res.status(201).json({
    message: 'Signup successful! Welcome to FurNest 🐾',
    user: {
      fullName,
      email,
    },
  });
});

// LOGIN ROUTE (for the next steps)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Incoming login data:', email, password);

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.',
    });
  }

  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({
      message: 'Invalid email or password.',
    });
  }

  return res.status(200).json({
    message: 'Login successful!',
    user: {
      fullName: user.fullName,
      email: user.email,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});