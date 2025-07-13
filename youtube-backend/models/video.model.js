// const mongoose  = require("mongoose")

// const videoSchema = new mongoose.Schema({
//     user:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "user",
//         required: true
//     },
//     title: { 
//         type: String, 
//         required: true 
//     },
//     description: { 
//         type: String ,
//         required: true
//     },
//     videoLink: { 
//         type: String, 
//         required: true 
//     },
//     channel: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "channel"
//     },
//     thumbnail: { 
//         type: String ,
//         required:true
//     },
//     views: { 
//         type: Number, 
//         default: 0 
//     },
//     likes: { 
//         type: Number, 
//         default: 0 
//     },
//     dislikes: { 
//         type: Number, 
//         default: 0 
//     },
//     videoType: { 
//         type: String ,
//         default: "All"
//     },
// },{ timestamps: true });

// module.exports =  mongoose.model("video", videoSchema);

// Comments
const mongoose = require("mongoose");

// 🟢 Schema definition for a Video document
const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // ✅ Reference to the user who uploaded the video
    ref: "user",
    required: true
  },
  title: {
    type: String,
    required: true  // ✅ Title is mandatory
  },
  description: {
    type: String,
    required: true  // ✅ Description is mandatory
  },
  videoLink: {
    type: String,
    required: true  // ✅ Link to the actual video file or source
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId, // ✅ Reference to the channel to which the video belongs
    required: true,
    ref: "channel"
  },
  thumbnail: {
    type: String,
    required: true  // ✅ Thumbnail image URL or path is mandatory
  },
  views: {
    type: Number,
    default: 0     // ✅ Starts with 0 views
  },
  likes: {
    type: Number,
    default: 0     // ✅ Starts with 0 likes
  },
  dislikes: {
    type: Number,
    default: 0     // ✅ Starts with 0 dislikes
  },
  videoType: {
    type: String,
    default: "All" // ✅ Default category or type of the video
  },
}, { timestamps: true }); // ✅ Automatically adds createdAt and updatedAt

module.exports = mongoose.model("video", videoSchema); // ✅ Register the schema as 'video' model