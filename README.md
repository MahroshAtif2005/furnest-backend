# Furnest Signup Backend 🐾

A lightweight temporary backend built with **Node.js** and **Express** to test user signup and login functionality for the Furnest pet adoption app.
This server uses an in-memory array (`users[]`) to store data temporarily — meaning all users reset when the server restarts. It’s ideal for testing frontend integration before connecting to a real database (e.g. MongoDB).

- Basic user signup with name, email, and password
- Basic login endpoint for validation
- Email uniqueness check (prevents duplicate accounts)
- Built-in CORS support for frontend connection
- JSON-based API responses
