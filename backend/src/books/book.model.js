const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    trending: {
      type: Boolean,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    rentalPricePerDay: {
      type: Number,
      required: true,
    },
    rentalPricePerWeek: {
      type: Number,
    },
    rentalPricePerMonth: {
      type: Number,
    },
    availableForRent: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
