const mongoose = require('mongoose'); //Mongoose is a library that helps Node.js app talk to MongoDB easily

// Define how a user looks in the database
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Ensure email is unique at the DB level
userSchema.index({ email: 1 }, { unique: true });

// Export the model so server.js can use it
module.exports = mongoose.model('User', userSchema)