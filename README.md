A lightweight Node.js + Express backend connected to MongoDB Atlas, built to power user signup and login for the FurNest pet adoption app.

This backend now stores real user data safely and permanently in the database (instead of using a temporary in-memory array). 

Features:

User Signup API with name, email, and password
User Login API with proper credential validation
MongoDB Storage using Mongoose models
Email Uniqueness Check (no duplicate accounts allowed)
Password Hashing with bcrypt for security
CORS Support to allow connection from the React Native frontend
Environment Variables (.env) to secure database credentials
Clean JSON API Responses for easy frontend integration

Tech Stack:

Node.js
Express.js
MongoDB Atlas
Mongoose
bcryptjs
dotenv
CORS
