const express = require("express");

// Import user controller functions for authentication
const { signUp, signIn, logout } = require("../controllers/user.controller");

// Create an Express router for user-related routes
const userRoute = express.Router();

// Route to register a new user
userRoute.post("/signUp", signUp);

// Route to authenticate a user and create a session/token
userRoute.post("/signIn", signIn);

// Route to log out the authenticated user
userRoute.post("/logout", logout);

// Export the router to be used in the main app
module.exports = userRoute;