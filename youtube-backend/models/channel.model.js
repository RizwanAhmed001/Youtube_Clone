// const mongoose = require("mongoose")

// const channelSchema = new mongoose.Schema({
//     channelName: {
//         type: String,
//         required: true 
//     },
//     description: { 
//         type: String 
//     },
//     channelPic: { 
//         type: String 
//     },
//     channelBanner: { 
//         type: String 
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "user",
//         required: true,
//     },
//     subscribers: { 
//         type: Number, 
//         default: 0 
//     },
//     video: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "video" 
//     }],
// }, { timestamps: true });

// module.exports = mongoose.model("channel", channelSchema);

// Comments
const mongoose = require("mongoose");

// 🟢 Schema definition for a Channel document
const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true  // ✅ Channel name is mandatory
  },
  description: {
    type: String     // ✅ Optional channel description
  },
  channelPic: {
    type: String     // ✅ URL or path to profile picture
  },
  channelBanner: {
    type: String     // ✅ URL or path to banner image
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // ✅ Reference to the owner user
    ref: "user",
    required: true,
  },
  subscribers: {
    type: Number,
    default: 0      // ✅ Starts with 0 subscribers
  },
  video: [{
    type: mongoose.Schema.Types.ObjectId, // ✅ Array of video IDs linked to channel
    ref: "video"
  }],
}, { timestamps: true }); // ✅ Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model("channel", channelSchema); // ✅ Register the schema with the name 'channel'
