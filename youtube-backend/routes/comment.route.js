const express = require("express");
const auth = require("../middleware/authentication");

// Import controller functions to handle comment operations
const { addComment, deleteComment, getCommentByVideoId, updateComment } = require("../controllers/comment.controller");

// Create an Express router for comment routes
const commentRoute = express.Router();

// Route to add a new comment; requires authentication
commentRoute.post("/comment", auth, addComment);

// Route to get all comments for a specific video by its ID; public access
commentRoute.get("/comment/:videoId", getCommentByVideoId);

// Route to update a specific comment by its ID; requires authentication
commentRoute.put("/comment/:commentId", auth, updateComment);

// Route to delete a specific comment by its ID; requires authentication
commentRoute.delete("/comment/:commentId", auth, deleteComment);

// Export the router to be used in the main app
module.exports = commentRoute;