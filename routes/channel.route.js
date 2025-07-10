const express = require("express");
const auth = require("../middleware/authentication");
const { postChannel } = require("../controllers/channel.controller");

const channelRoute = express.Router();

channelRoute.post("/channel", auth, postChannel)
channelRoute.get("/getChannel", auth,  )
module.exports = channelRoute;