const express = require("express");
const {
  createAOrder,
  getOrderByEmail,
  handlePaymentSuccess,
  handlePaymentFailure,
  handlePaymentCancel,
} = require("./order.controller");

const router = express.Router();

// create order endpoint
router.post("/", createAOrder);

// get orders by user email
router.get("/email/:email", getOrderByEmail);

// payment endpoints
router.post("/payment/success/:transactionId", handlePaymentSuccess);
router.post("/payment/fail/:transactionId", handlePaymentFailure);
router.post("/payment/cancel/:transactionId", handlePaymentCancel);

module.exports = router;
