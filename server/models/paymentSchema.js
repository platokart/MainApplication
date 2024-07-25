const mongoose = require('mongoose');

// Order Schema
const paymentSchema = new mongoose.Schema({
  orderId: String,
  userId:String,
  paymentId: String,
  amount: Number,
  status: String
});

const Order = mongoose.model('Order', paymentSchema);

module.exports = Order;
