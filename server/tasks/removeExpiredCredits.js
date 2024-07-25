const cron = require("node-cron");
const Customer = require("../models/customerschema");
const removeExpiredCredits = async () => {
  try {
    const now = new Date();

    const customers = await Customer.find({
      "addedCredits.expiryDate": { $lte: now },
    });

    for (const customer of customers) {
      let creditsToRemove = 0;
      customer.addedCredits = customer.addedCredits.filter((credit) => {
        if (credit.expiryDate <= now) {
          creditsToRemove += credit.amount;
          return false;
        }
        return true;
      });
      customer.credits -= creditsToRemove;
      await customer.save();
      console.log(
        `Removed ${creditsToRemove} credits from customer ${customer._id}`
      );
    }
  } catch (error) {
    console.error("Error removing expired credits:", error);
  }
};

// Schedule the task to run daily at midnight
cron.schedule("0 0 * * *", removeExpiredCredits);

module.exports = removeExpiredCredits;
