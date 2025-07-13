const Channel = require("../models/channel.model");
const Video = require("../models/video.model");

// Controller to create a new channel for the authenticated user
exports.postChannel = async (req, res) => {
  try {
    const { channelName, description, channelPic, channelBanner } = req.body;

    // Validate required fields
    if (!channelName || !description || !channelPic || !channelBanner) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let userId = req.user._id;

    // Get all videos uploaded by this user
    let videos = await Video.find({ user: userId });

    // Extract only the video IDs from the documents
    let videoIds = videos.map((video) => video._id);

    // Create a new channel with user info and associated video IDs
    let newChannel = new Channel({
      user: userId,
      video: videoIds,
      channelName,
      description,
      channelPic,
      channelBanner,
    });

    // Save the channel to the database
    await newChannel.save();

    // Respond with success and the created channel
    res.status(201).json({ message: "Channel Created", channel: newChannel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong in create channel" });
  }
};

// Controller to get the logged-in user's own channel details
exports.getChanneldetails = async (req, res) => {
  try {
    let userId = req.user._id;

    // Find channels where user is the owner, and populate video & user data
    let channel = await Channel.find({ user: userId })
      .populate("video")
      .populate("user");

    // If no channels found, respond with error
    if (channel.length == 0) {
      return res.status(400).json({ message: "No Such Channel" });
    }

    // Respond with the found channel
    res.status(200).json({ message: "Channel Receives", channel });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something Went wrong in get channel details" });
  }
};

// Controller to get a user's channel by userId (passed as route param)
exports.getChanneldetailsByUserlId = async (req, res) => {
  try {
    let { userId } = req.params;

    // Find channels by provided userId and populate associated video & user data
    let channelProfile = await Channel.find({ user: userId })
      .populate("video")
      .populate("user");

    // Check if channelProfile is empty
    if (channelProfile.length == null) {
      return res.status(400).json({ message: "No Such Video By Channel" });
    }

    // Respond with the found channel profile
    res.status(200).json({ message: "Channel Receives", channelProfile });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something Went wrong in get channel details" });
  }
};

// Controller to delete a video, only if the logged-in user owns the channel
exports.deleteVideoByOwner = async (req, res) => {
  try {
    const { videoId } = req.params;
    const loggedInUserId = req.user._id.toString();

    // Step 1: Find the video by ID
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Step 2: Find the channel that owns the video
    const channel = await Channel.findById(video.channel);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Step 3: Ensure the logged-in user is the owner of the channel
    if (channel.user.toString() !== loggedInUserId) {
      return res.status(403).json({ message: "Unauthorized: You are not the owner of this channel" });
    }

    // Step 4: Delete the video from the database
    await Video.findByIdAndDelete(videoId);

    // Step 5: Remove the video ID from the channel's video array
    channel.video = channel.video.filter((id) => id.toString() !== videoId);
    await channel.save();

    // Respond with success
    res.status(200).json({ message: "Video deleted successfully" });

  } catch (err) {
    console.error("Delete video error:", err);
    res.status(500).json({ message: "Server error" });
  }
};