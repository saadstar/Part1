const express = require("express")
const router = express.Router();
const {
  allComments,
  createComment,
  getcomentReply,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
router.get("/",allComments);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

//localhost:3600/api/comment/reply/hotelid
 router.get("/reply/:id", getcomentReply);
module.exports = router;