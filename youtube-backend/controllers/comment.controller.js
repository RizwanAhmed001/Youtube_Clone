const Comment = require("../models/comment.model");


// 🟢 Controller to add a new comment to a video
exports.addComment = async (req, res) => {
  try {
    const { message, video } = req.body;

    // ✅ Create new comment with message, videoId, and userId
    const addComment = new Comment({ user: req.user._id, message, video });

    await addComment.save(); // ✅ Save to DB

    res.status(201).json({ message: "Message added", addComment });
  } catch (err) {
    // ⚠️ Handle server errors
    res.status(500).json({ message: "Server Error" });
  }
};


// 🟢 Controller to get all comments for a specific video
exports.getCommentByVideoId = async (req, res) => {
  try {
    let { videoId } = req.params;

    // ✅ Find comments by videoId and populate video + user data
    const comment = await Comment.find({ video: videoId })
      .populate("video")
      .populate("user");

    res.status(200).json({ message: "All Comments", comment });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// 🟢 Controller to update a comment's message by its ID
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { message } = req.body;

    // ✅ Find comment by ID
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // ✅ Check if the logged-in user is the comment owner
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to edit this comment' });
    }

    // ✅ Update message content
    comment.message = message;
    await comment.save();

    return res.status(200).json({ message: 'Comment updated successfully', comment });
  } catch (error) {
    console.error('Error updating comment:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// 🟢 Controller to delete a comment by ID
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // ✅ Find comment
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // ✅ Only owner of comment can delete
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    // ✅ Delete comment
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};