const Comment = require("../models/comment.model");


exports.addComment = async (req, res) => {
  try{
    const {message, video} = req.body;
    const addComment = new Comment({user: req.user._id, message, video})
    await addComment.save();
    res.status(201).json({message: "Message added", addComment})
  }catch(err){
    res.status(500).json({message: "Server Error"})
  }
}

exports.getCommentByVideoId = async (req, res) => {
  try{
    let {videoId} = req.params
    const comment = await Comment.find({video: videoId})
    .populate("video").populate("user")
    res.status(200).json({message: "All Comments", comment})
  }catch(err){
    res.status(500).json({message: "Server Error"})
  }
}

exports.editComment = async (req, res) => {
  try{
    const commentId = req.params.id; // grab comment ID from route
    const { message } = req.body;       // updated text sent in body

    // Validate input
    if (!message) {
      return res.status(400).json({ message: "Updated text is required" });
    }

    // Update the comment
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { message },       // field(s) to update
      { new: true }   // return the updated document
    );

    // If comment not found
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Send success response
    res.status(200).json({
      message: "Comment updated successfully",
      comment: updatedComment
    });
  }catch(err){
    res.status(500).json({message: "Server Error"})
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id; 

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      message: "Comment deleted successfully",
      deletedComment
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};