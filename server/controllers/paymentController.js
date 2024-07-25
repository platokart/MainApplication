const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Customer = require("../models/customerschema");
const Order = require("../models/order");
const cron = require("node-cron");

const razorpay = new Razorpay({
  key_id: "rzp_live_bhSFIlkXSdX0o2",
  key_secret: "nfZX4E5y9n1SWUiJmIZ6zDkF",
});

exports.paymentForm = () => {
  //send subscription page...
};

exports.myplan = async (req, res) => {
  try {
    const currentOrder = await Order.findOne({
      userId: req.params.userId,
      status: "paid",
    }).sort({ validTill: -1 });
    res.json(currentOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.invoices = async (req, res) => {
  try {
    const invoices = await Order.find({
      userId: req.params.userId,
      status: "paid",
    }).sort({ validTill: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createOrder = async (req, res) => {
  const { userId, amount, currency, receipt, planType, validTill } = req.body;
  try {
    const response = await razorpay.orders.create({
      amount: amount,
      currency,
      receipt,
    });
    const newOrder = new Order({
      userId: userId,
      orderId: response.id,
      amount: response.amount / 100,
      status: response.status,
      planType: planType,
      validTill: validTill,
    });
    await newOrder.save();
    res.json(response);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send(error);
  }
};
exports.verifyThePayment = async (req, res) => {
  const { orderId, paymentId, signature, Addcredits } = req.body;

  console.log("Received verification request:", {
    orderId,
    paymentId,
    signature,
    Addcredits,
    expiryDate,
  });

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  console.log("Generated signature:", generated_signature);
  console.log("Signature from request:", signature);

  if (generated_signature === signature) {
    try {
      console.log("Signature verified successfully");
      const order = await Order.findOneAndUpdate(
        { orderId: orderId },
        { paymentId: paymentId, status: "paid" },
        { new: true }
      );

      if (!order) {
        console.error("Order not found or failed to update");
        return res.status(500).send({
          success: false,
          error: "Order not found or failed to update.",
        });
      }
      const customerId = order.userId;

      const customer = await Customer.findById(customerId);
      if (!customer) {
        console.error("Customer not found");
        return res.status(404).send({
          success: false,
          error: "Customer not found.",
        });
      }

      customer.credits = (customer.credits || 0) + Addcredits;
      customer.addedCredits.push({
        amount: Addcredits,
        addedAt: new Date(),
        expiryDate: new Date(expiryDate),
      });
      await customer.save();
      // i want the Added credits to disappear after one month
      console.log("Order updated successfully:", order);
      return res.send({ success: true });
    } catch (error) {
      console.error("Failed to update order:", error);
      return res.status(500).send({
        success: false,
        error: "Failed to update order.",
        details: error.message,
      });
    }
  } else {
    console.error("Signature mismatch");
    return res.send({ success: false, error: "Signature mismatch." });
  }
};
