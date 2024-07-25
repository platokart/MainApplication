const mongoose = require("mongoose");
const User = require("../models/customerschema");
const requestSchema = new mongoose.Schema({
  //   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  industry: String,
  functionName: String,
  expertise: String,
  additionalInformation: String,
  consultationTopic: String,
  userEmail: String,
  AcceptedBy: { type: String, default: "" },
  customerEmail: String,
  consultantEmail: String,
  status: { type: String, default: "pending" },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
