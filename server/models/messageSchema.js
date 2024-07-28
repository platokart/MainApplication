const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  consultant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  imagefile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fs.files",
    default: null,
  },
  photo: {
    type: String,
  },
  replyTo: {
    type: new mongoose.Schema({
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommunityMessage",
      },
      name: String,
      message: String,
    }),
    default: null,
  },
  deletedForMe: {
    type: Boolean,
    default: false,
  },
  deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Consultant" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("CommunityMessage", messageSchema);

module.exports = Message;
