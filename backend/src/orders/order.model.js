const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      country: String,
      state: String,
      zipcode: String,
    },
    phone: {
      type: String,
      required: true,
    },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      default: "pending",
    },
    orderType: {
      type: String,
      enum: ["purchase", "rental"],
      required: true,
    },
    rentalDetails: {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      rentalType: String,
      rentalStartDate: Date,
      rentalEndDate: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
