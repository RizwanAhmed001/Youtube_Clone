const express = require("express");
const { postUploadVideo, getAllVideos, getSingleVideos } = require("../controllers/video.controller");

const videoRoute = express.Router();

videoRoute.post("/uploadVideo", postUploadVideo)
videoRoute.get("/videos", getAllVideos)
videoRoute.get("/videos/:id",getSingleVideos)

module.exports = videoRoute;