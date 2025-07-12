const express = require("express");
const auth = require("../middleware/authentication");
const { postChannel, getChanneldetails, getChanneldetailsByUserlId, } = require("../controllers/channel.controller");

const channelRoute = express.Router();

channelRoute.post("/channel", auth, postChannel)
channelRoute.get("/getChannel", auth,  getChanneldetails);
channelRoute.get("/getChannel/:userId", auth,  getChanneldetailsByUserlId);

module.exports = channelRoute;