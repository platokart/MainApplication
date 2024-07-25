const mongoose = require("mongoose");
const Consultation = require("./consultation");

const videoCallSchema = new mongoose.Schema({
  ConsultationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  consultantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const VideoCall = mongoose.model("VideoCall", videoCallSchema);

module.exports = VideoCall;
