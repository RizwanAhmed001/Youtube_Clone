const express = require("express");

// Import controller functions to handle video-related operations
const {
  uploadVideo,
  getAllVideo,
  getVideoById,
  getAllVideoByUserId,
  incrementLike,
  incrementDislike,
} = require("../controllers/video.controller");

// Import authentication middleware to protect certain routes
const auth = require("../middleware/authentication");

// Create an Express router for video routes
const videoRoute = express.Router();

// Route to upload a new video; requires authentication
videoRoute.post("/video", auth, uploadVideo);

// Route to get all videos; accessible publicly
videoRoute.get("/allVideo", getAllVideo);

// Route to get a single video by its ID; accessible publicly
videoRoute.get("/getVideoById/:id", getVideoById);

// Route to increment like count on a video; requires authentication
videoRoute.put("/likes/:videoId", auth, incrementLike);

// Route to increment dislike count on a video; requires authentication
videoRoute.put("/dislike/:videoId", auth, incrementDislike);

// Export the router to be used in the main app
module.exports = videoRoute;