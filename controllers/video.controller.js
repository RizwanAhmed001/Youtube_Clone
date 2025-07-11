const Video = require("../models/video.model")
const Channel = require("../models/channel.model");

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    // 1. Validation
    if (!title || !description || !videoLink || !thumbnail) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const userId = req.user._id;

    // 2. Find the user's channel
    const channel = await Channel.findOne({ user: userId });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found for this user" });
    }

    // 3. Create and save video
    const videoUpload = new Video({
      user: userId,
      channel: channel._id,  // store channel ID, not the full document
      title,
      description,
      videoLink,
      videoType,
      thumbnail
    });

    await videoUpload.save();

    // 4. Add video to the channel's video list
    channel.video.push(videoUpload._id);
    await channel.save();

    // 5. Success response
    res.status(201).json({ message: "Video uploaded successfully", video: videoUpload });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Something went wrong while uploading the video" });
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
    .populate("channel", "channelName createdAt channelPic")
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