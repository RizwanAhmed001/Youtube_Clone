const mongoose = require("mongoose");

// 🟢 Schema definition for a User document
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true // ✅ Username is mandatory
  },
  email: {
    type: String,
    required: true, // ✅ Email is mandatory
    unique: true    // ✅ Must be unique across users
  },
  password: {
    type: String,
    required: true  // ✅ Hashed password is required
  },
  about: {
    type: String,
    required: true  // ✅ About info is required (bio or description)
  },
  profilePic: {
    type: String,
    required: true  // ✅ URL or path to profile picture
  }
}, { timestamps: true }); // ✅ Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("user", userSchema); // ✅ Register the schema as 'user' model

