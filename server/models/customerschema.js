const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CreditSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});
const customerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },

    basicdetails: [
      {
        companyName: {
          type: String,
          required: true,
        },
        industry: {
          type: String,
          required: true,
        },
        companyType: {
          type: String,
          required: true,
        },
        fundingStage: {
          type: String,
          required: true,
        },
        companyFounded: {
          type: String,
          required: true,
        },
        numberOfEmployees: {
          type: String,
          required: true,
        },
        headquarterLocation: {
          type: String,
          required: true,
        },
        numberOfOfferings: {
          type: String,
          required: true,
        },
        companyWebsite: {
          type: String,
          required: true,
        },
        contact: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
      },
    ],
    passwordDetails: [
      {
        password: {
          type: String,
          required: true,
        },
      },
    ],
    credits: {
      type: Number,
      default: 1,
    },
    addedCredits: [CreditSchema],
  },
  {
    timestamps: true,
  }
);

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
