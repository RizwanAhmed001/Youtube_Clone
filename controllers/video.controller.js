const Video = require("../models/video.model")
const Channel = require("../models/channel.model");
exports.uploadVideo = async (req, res) => {
  try{

    const {title, description, videoLink, videoType, thumbnail} = req.body;
    if(!title || !description || !videoLink || !thumbnail){
      return res.status(400).json({message: "All Fields are mandatory"})
    }
    let userId = req.user._id;
    const channelData = await Channel.findOne({user: userId})
    const videoUpload = new Video({user: userId, title, channel: channelData,  description,videoLink, videoType, thumbnail })

    await videoUpload.save();
    res.status(201).json({message: "Video Uploaded", videoUpload})

  }catch(err){
    res.status(500).json({message: "Something went wrong while uploading the video"})
  }
}

exports.getAllVideo = async (req, res) => {
  try{
    const video = await Video.find()
    .populate("user", "userName profilePic")
    .populate("channel", "channelName createdAt")

    if(video.length === 0){
      return res.status(400).json({message: "No Video Available"})
    }
    res.status(200).json({message: "All Videos", video})

  }catch(err){
    res.status(500).json({message: "Something went wrong while getting the video"})
  }
}

exports.getVideoById = async (req, res) => {
  try{
    const {id} = req.params;
    const video = await Video.findById(id)
    .populate("user", "userName profilePic")
    .populate("channel", "channelName createdAt")
    if(video.length === 0){
      return res.status(404).json({message: "No such Videos"})
    }
    res.status(200).json({message: "Video received", video})
  }catch(err){
    res.status(500).json({message: "Something went wrong while getting the video"})
  }
}

exports.getAllVideoByUserId = async (req, res) => {
  try{
    let {userId} = req. params;
    const videos = await Video.find({user: userId})
    .populate("user", "userName profilePic")
    .populate("channel", "channelName createdAt")
    if(videos.length === 0){
      return res.status(404).json({message: "No such user!"})
    }
    res.status(200).json({message: "Video Receives", videos})
  }catch(err){
    res.status(500).json({message: "Something went wrong while getting the video"})
  }
}