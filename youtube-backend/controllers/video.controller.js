// const Video = require("../models/video.model")
// const Channel = require("../models/channel.model");


// exports.uploadVideo = async (req, res) => {
//   try {
//     const { title, description, videoLink, videoType, thumbnail } = req.body;

//     // 1. Validation
//     if (!title || !description || !videoType || !videoLink || !thumbnail) {
//       return res.status(400).json({ message: "All fields are mandatory" });
//     }

//     const userId = req.user._id;

//     // 2. Check for channel
//     let channel = await Channel.findOne({ user: userId });

//     if (!channel) {
//       return res.status(400).json({ message: "No such channel" });
//     }

//     // 3. Create and save video
//     const videoUpload = new Video({
//       user: userId,
//       channel: channel._id,
//       title,
//       description,
//       videoLink,
//       videoType,
//       thumbnail,
//     });

//     await videoUpload.save();

//     // 4. Add video to channel
//     channel.video.push(videoUpload._id);
//     await channel.save();

//     // 5. Respond
//     res.status(201).json({
//       message: "Video uploaded successfully",
//       video: videoUpload,
//     });

//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ message: "Something went wrong while uploading the video" });
//   }
// };

// exports.getAllVideo = async (req, res) => {
//   try{
//     const video = await Video.find()
//     .populate("user", "userName profilePic")
//     .populate("channel", "channelName createdAt")

//     if(video.length === 0){
//       return res.status(400).json({message: "No Video Available"})
//     }
//     res.status(200).json({message: "All Videos", video})

//   }catch(err){
//     res.status(500).json({message: "Something went wrong while getting the video"})
//   }
// }

// exports.getVideoById = async (req, res) => {
//   try{
//     const {id} = req.params;
//     const video = await Video.findById(id)
//     .populate("user", "userName profilePic")
//     .populate("channel", "channelName createdAt channelPic")
//     if(video.length === 0){
//       return res.status(404).json({message: "No such Videos"})
//     }
//     res.status(200).json({message: "Video received", video})
//   }catch(err){
//     res.status(500).json({message: "Something went wrong while getting the video"})
//   }
// }



// exports.incrementLike = async (req, res) => {
//   try {
//     const { videoId } = req.params;

//     const userId = req.user._id;

//     const video = await Video.findById(videoId);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     video.likes += 1;
//     await video.save();

//     res.status(200).json({ message: "Like count updated", likes: video.likes });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating like count" });
//   }
// };

// // 👎 Increment Dislike Count
// exports.incrementDislike = async (req, res) => {
//   try {
//     const { videoId } = req.params;

//     const userId = req.user._id;

//     const video = await Video.findById(videoId);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     video.dislikes += 1;
//     await video.save();

//     res.status(200).json({ message: "Dislike count updated", dislikes: video.dislikes });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating dislike count" });
//   }
// };



// comment code

const Video = require("../models/video.model")
const Channel = require("../models/channel.model");


// 🟢 Controller to handle video upload by user
exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    // ✅ Step 1: Validate required fields
    if (!title || !description || !videoType || !videoLink || !thumbnail) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const userId = req.user._id; // ✅ Extract logged-in user ID from auth middleware

    // ✅ Step 2: Check if user has an existing channel
    let channel = await Channel.findOne({ user: userId });

    if (!channel) {
      return res.status(400).json({ message: "No such channel" });
    }

    // ✅ Step 3: Create a new video document
    const videoUpload = new Video({
      user: userId,
      channel: channel._id,
      title,
      description,
      videoLink,
      videoType,
      thumbnail,
    });

    await videoUpload.save(); // ✅ Save video in DB

    // ✅ Step 4: Push video ID to user's channel document
    channel.video.push(videoUpload._id);
    await channel.save();

    // ✅ Step 5: Send success response
    res.status(201).json({
      message: "Video uploaded successfully",
      video: videoUpload,
    });

  } catch (err) {
    // ⚠️ Handle unexpected server error
    console.error("Upload error:", err);
    res.status(500).json({ message: "Something went wrong while uploading the video" });
  }
};


// 🟢 Controller to fetch all videos
exports.getAllVideo = async (req, res) => {
  try {
    const video = await Video.find()
      .populate("user", "userName profilePic") // ✅ Join user info
      .populate("channel", "channelName createdAt"); // ✅ Join channel info

    // ❗ If no videos found, return 400
    if (video.length === 0) {
      return res.status(400).json({ message: "No Video Available" });
    }

    res.status(200).json({ message: "All Videos", video });

  } catch (err) {
    // ⚠️ Handle server error
    res.status(500).json({ message: "Something went wrong while getting the video" });
  }
};


// 🟢 Controller to fetch single video by ID
exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id)
      .populate("user", "userName profilePic") // ✅ Join user info
      .populate("channel", "channelName createdAt channelPic"); // ✅ Join channel info

    // ⚠️ `video.length === 0` is not needed for findById (returns null, not array)
    if (!video) {
      return res.status(404).json({ message: "No such Videos" });
    }

    res.status(200).json({ message: "Video received", video });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong while getting the video" });
  }
};


// 👍 Controller to increment like count
exports.incrementLike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id; // ✅ Use this if needed later for per-user logic

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.likes += 1; // ✅ Increment likes
    await video.save();

    res.status(200).json({ message: "Like count updated", likes: video.likes });

  } catch (err) {
    res.status(500).json({ message: "Error updating like count" });
  }
};


// 👎 Controller to increment dislike count
exports.incrementDislike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id; // ✅ Use this if needed for future logic

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.dislikes += 1; // ✅ Increment dislikes
    await video.save();

    res.status(200).json({ message: "Dislike count updated", dislikes: video.dislikes });

  } catch (err) {
    res.status(500).json({ message: "Error updating dislike count" });
  }
};