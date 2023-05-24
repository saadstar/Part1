const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReplySchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: "1 min ago",
    },
    score: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "./images/avatars/image-juliusomo.png",
    },
    username: {
      type: String,
      default: "juliusomo",
    },
  }
);
const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: "1 min ago",
    },
    score: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "./images/avatars/image-juliusomo.png",
    },
    username: {
      type: String,
      default: "juliusomo",
    },
    reply: {
      type: [ReplySchema],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Comment", CommentSchema);