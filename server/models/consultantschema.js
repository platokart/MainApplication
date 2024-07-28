const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const consultantSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    // required: true,
    unique: true,
  },

  basicdetails: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
        unique: true,
      },
      orgName: {
        type: String,
        required: true,
      },
      industry: {
        type: Array,
        required: true,
      },
      designation: {
        type: String,
        required: true,
      },
      functionName: {
        type: String,
        required: true,
      },
      skills: {
        type: Array,
        required: true,
      },
      yearsOfExperience: {
        type: String,
        required: true,
      },

      highestEducation: {
        type: String,
        required: true,
      },
      yearOfPassing: {
        type: String,
        required: true,
      },
      instituteName: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
    },
  ],

  additionalDetails: [
    {
      aboutYourself: {
        type: String,
        required: true,
        default: "enter",
      },
      resumeAttachment: {
        type: String,
        // required: true
        default: "file",
      },

      linkedinProfile: {
        type: String,
        required: true,
        default: "enter",
      },

      feePerSession: {
        type: String,
        required: true,
        default: "enter",
      },

      lastCTC: {
        type: String,
        // required: true,
        default: "file",
      },
      compensationDetails: {
        type: String,
        // required: true,
        default: "enter",
      },
      appointmentLetter: {
        type: String,
        // required: true,
        default: "file",
      },
    },
  ],

  criticalDetails: [
    {
      makeYourAvailability: {
        type: Array,
        required: true,
        default: "enter",
      },

      provideTimeAvailability: {
        type: String,
        required: true,
        default: "enter",
      },
    },
  ],
  paymentDetails: [
    {
      bankAccountNumber: {
        type: String,
        required: true,
        default: "enter",
      },
      ifscCode: {
        type: String,
        required: true,
        default: "enter",
      },
      bankName: {
        type: String,
        required: true,
        default: "enter",
      },
      bankBranch: {
        type: String,
        required: true,
        default: "enter",
      },
      cancelledCheque: {
        type: String,
        // required: true,
        default: "file",
      },
      panNumber: {
        type: String,
        required: true,
        default: "enter",
      },
    },
  ],

  passwordDetails: [
    {
      password: {
        type: String,
        required: true,
        default: "",
      },
    },
  ],

  registrationStatus: {
    type: String,
    default: "pending",
  },
});

consultantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Consultant = mongoose.model("Consultant", consultantSchema);

module.exports = Consultant;
