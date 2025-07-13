const express = require("express");
const auth = require("../middleware/authentication");

// Import controller functions for channel-related operations
const {
  postChannel,
  getChanneldetails,
  getChanneldetailsByUserlId,
  deleteVideoByOwner,
} = require("../controllers/channel.controller");

const channelRoute = express.Router();

// Route to create a new channel for the logged-in user
channelRoute.post("/channel", auth, postChannel);

// Route to get the channel details of the currently logged-in user
channelRoute.get("/getChannel", auth, getChanneldetails);

// Route to get channel details of a specific user by their userId (for profile view, etc.)
channelRoute.get("/getChannel/:userId", auth, getChanneldetailsByUserlId);

// Route to delete a video by ID, only if it belongs to a channel owned by the logged-in user
channelRoute.delete("/getChannel/:videoId", auth, deleteVideoByOwner);

module.exports = channelRoute;