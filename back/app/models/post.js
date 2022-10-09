const mongoose = require("mongoose");

// Define a schema
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: [300, "Message is too long"],
    },
    imageUrl: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    usersLikeId: [
      {
        type: String,
        ref: "User",
      },
    ],
    usersDislikeId: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
