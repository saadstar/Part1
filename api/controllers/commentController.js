const asyncHandler = require("express-async-handler");
const Comment = require("../model/CommentModel");


// @GET
const allComments = asyncHandler(async (req, res) => {
    try {
        const comments = await Comment.find({})
        res.status(200).json(comments);        
    }
    catch (err) {
        res.status(500).json("Error in Fetching All Comments!");
    }
})
// @POST 
const createComment = asyncHandler(async (req, res) => {
    try {
        const newComment = await new Comment(req.body).save();
        res.status(200).json(newComment);
    } catch (err) {
        console.log("error in posting a comment!")
    }
});

// @GET by comment id
const getcomentReply = asyncHandler(async (req, res) => {
  try {
      const comment = await Comment.findById(req.params.id);
    const list = await Promise.all(
      comment.reply.map((reply) => {
          return Reply.findById(reply)
      }));
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json("Error in Fetching All Comments!");
  }
});
//PUT find by id and update   just for admin
const updateComment = asyncHandler(async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { content:req.body.content}, { new: true })
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(400).json({
            success: false,
            err,
                message:"Error in editing your comment"
        })
    }
});

// DELETE find by id   and delete
const deleteComment = asyncHandler(async (req, res) => {
  try {
     await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment Have Deleted successfuly!");
  } catch (err) {
    res.status(400).json({
      success: false,
      err,
      message: "Error in Delete",
    });
  }
});

const updateReply = asyncHandler(async (req, res) => {
  await Comment.updateOne({
    _id: req.body.id,
    "reply._id": req.params.replyid,
  }, {
    $set: {
    'reply.$.content':req.body.content
  }});
})
module.exports = {
  allComments,
  createComment,
  getcomentReply,
  updateComment,
  deleteComment,
};