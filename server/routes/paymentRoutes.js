const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-order", paymentController.createOrder);
router.post("/verify-payment", paymentController.verifyThePayment);
router.get("/My-Plan/:id", paymentController.myplan);
module.exports = router;
