const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addOneMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date;
};

const CreditSchema = new mongoose.Schema({
  Plan: {
    type: String,
    required: true,
    default: "One free credit",
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
    default: addOneMonth,
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
    addedCredits: {
      type: [CreditSchema],
      default: () => [new mongoose.model("Credit", CreditSchema)()],
    },
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
