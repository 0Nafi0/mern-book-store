const express = require("express");
const router = express.Router();
const {
  addToRentals,
  getRentals,
  returnBook,
  clearRental,
  clearAllRentals,
} = require("../users/rental.controller");
const authMiddleware = require("../middleware/auth.middleware");

// All routes require authentication
router.use(authMiddleware);

// Rent a book
router.post("/rent", addToRentals);

// Get all rentals
router.get("/", getRentals);

// Return a book
router.put("/return/:bookId", returnBook);

// Clear specific rental
router.delete("/:bookId", clearRental);

// Clear all rentals
router.delete("/", clearAllRentals);

module.exports = router;
