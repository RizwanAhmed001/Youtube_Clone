const Channel = require("../models/channel.model");
const Video = require("../models/video.model");

exports.postChannel = async (req, res) => {
  try {
    const { channelName, description, channelPic, channelBanner } = req.body;

    if (!channelName || !description || !channelPic || !channelBanner) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let userId = req.user._id;

    // Get videos uploaded by this user
    let videos = await Video.find({ user: userId });
    let videoIds = videos.map((video) => video._id); // ✅ Extract only IDs

    // Create the channel
    let newChannel = new Channel({
      user: userId,
      video: videoIds, // ✅ Use the correct field name and value
      channelName,
      description,
      channelPic,
      channelBanner,
    });

    await newChannel.save();

    res.status(201).json({ message: "Channel Created", channel: newChannel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong in create channel" });
  }
};

exports.getChanneldetails = async (req, res) => {
  try {
    let userId = req.user._id;
    let channel = await Channel.find({ user: userId })
      .populate("video")
      .populate("user");
    if (channel.length == 0) {
      return res.status(400).json({ message: "No Such Channel" });
    }
    res.status(200).json({ message: "Channel Receives", channel });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something Went wrong in get channel details" });
  }
};

exports.getChanneldetailsByUserlId = async (req, res) => {
  try {
    let { userId } = req.params;
    let channelProfile = await Channel.find({user: userId})
      .populate("video")
      .populate("user");
    if (channelProfile.length == null) {
      return res.status(400).json({ message: "No Such Video By Channel" });
    }
    res.status(200).json({ message: "Channel Receives", channelProfile });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something Went wrong in get channel details" });
  }
};
