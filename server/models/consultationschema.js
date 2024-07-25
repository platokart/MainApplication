const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  userId: {
    type: String, // Reference to the Users collection
    required: true,
  },
  consultantId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    default: " ",
    required: false,
  },
  industry: {
    type: String,
    required: false,
    default: " ",
  },
  functionName: {
    type: String,
    required: false,
    default: " ",
  },
  expertiseArea: {
    type: String,
    required: false,
    default: " ",
  },
  additionalInformation: {
    type: String,
    default: " ",
  },
  consultationTopic: {
    type: String,
    default: " ",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const consultation = mongoose.model("consultation", consultationSchema);

module.exports = consultation;
