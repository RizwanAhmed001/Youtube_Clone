// const mongoose = require("mongoose")

// const commentSchema = new mongoose.Schema({
//   user:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//     reuired: true
//   },
//   video:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "video",
//     required: true
//   },
//   message: {
//     type:String,
//     required: true
//   }
// },{timestamps: true})

// module.exports = mongoose.model("comment",commentSchema)

// Comments
const mongoose = require("mongoose");

// 🟢 Schema definition for a Comment document
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // ✅ Reference to the user who made the comment
    ref: "user",
    reuired: true  // ❗ Typo: should be `required` instead of `reuired`
  },
  video: {
    type: mongoose.Schema.Types.ObjectId, // ✅ Reference to the video on which comment was made
    ref: "video",
    required: true
  },
  message: {
    type: String, // ✅ Content of the comment
    required: true
  }
}, { timestamps: true }); // ✅ Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("comment", commentSchema); // ✅ Register the schema as 'comment' model