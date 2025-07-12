const express = require("express");
const {uploadVideo, getAllVideo, getVideoById, getAllVideoByUserId} = require("../controllers/video.controller")
const auth = require("../middleware/authentication");

const videoRoute = express.Router();


videoRoute.post("/video",auth, uploadVideo)
videoRoute.get("/allVideo", getAllVideo)
videoRoute.get("/getVideoById/:id", getVideoById);


module.exports = videoRoute;