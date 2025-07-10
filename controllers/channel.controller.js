const Channel = require("../models/channel.model")
const Video = require("../models/video.model")

exports.postChannel = async (req, res) => {
  try{
    const {channelName, description, channelPic, channelBanner} = req.body;
    console.log("I am working")
    if(!channelName || !description || !channelPic || !channelBanner){
      return res.status(400).json({message: "Please Fill All Fields"})
    }
  let userId = req.user._id;
  let videos = await Video.find({ user: userId })
  let newChannel = new Channel({user: userId, video: videos, channelName, description,channelPic, channelBanner})

  await newChannel.save();
  res.status(201).json({message: "Channel Created"})

  }catch(err){
    res.status(500).json({message: "Something Went wrong in create channel"})
  }
}

exports.getChanneldetails = async (req, res) => {
  try{
    
  }catch(err){
    res.status(500).json({message: "Something Went wrong in get channel details"})
  }
}