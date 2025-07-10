const express = require("express")
const auth = require("../middleware/authentication");
const { addComment, editComment, deleteComment, getCommentByVideoId } = require("../controllers/comment.controller");

const commentRoute = express.Router();

commentRoute.post("/comment", auth, addComment)
commentRoute.get("/comment/:videoId", getCommentByVideoId);
commentRoute.patch("/comment/:id", auth, editComment)
commentRoute.delete("/comment/:id", auth, deleteComment)

module.exports = commentRoute;