const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Import the User model
const User = require('./models/User');

// --- Initialize Express ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Connect to MongoDB ---
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}
connectDB();

// --- Test route ---
app.get('/', (req, res) => {
  res.send('FurNest backend is running 🐾');
});

// --- SIGNUP ROUTE ---
app.post('/signup', async (req, res) => {
  try {
    console.log('/signup hit with body:', req.body);

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      console.log('❌ Missing fields');
      return res.status(400).json({
        message: 'All fields (fullName, email, password) are required.',
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    console.log('🔎 Existing user check result:', existing);

    if (existing) {
      console.log('⚠️ User already exists');
      return res.status(409).json({
        message: 'An account with this email already exists. Please log in instead.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    console.log('Password hashed');

    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
    });

    const count = await User.countDocuments();
    console.log('✅ User created in MongoDB:', user);
    console.log(' Total users in collection:', count);

    return res.status(201).json({
      message: 'Signup successful! Welcome to FurNest 🐾',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(' Signup error:', err);
    return res.status(500).json({ message: 'Signup failed. Please try again later.' });
  }
});


// --- Start the server ---
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});