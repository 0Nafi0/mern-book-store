const express = require("express");
const router = express.Router();
const { register, verifyEmail, login } = require("./auth.controller");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("./cart.controller");
const {
  addToRentals,
  getRentals,
  returnBook,
  clearRental,
  clearAllRentals,
} = require("./rental.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

// Cart routes
router.post("/cart", authMiddleware, addToCart);
router.get("/cart", authMiddleware, getCart);
router.delete("/cart/:bookId", authMiddleware, removeFromCart);
router.delete("/cart", authMiddleware, clearCart);

// Rental routes
router.post("/rentals", authMiddleware, addToRentals);
router.get("/rentals", authMiddleware, getRentals);
router.put("/rentals/:bookId/return", authMiddleware, returnBook);
router.delete("/rentals/:bookId", authMiddleware, clearRental);
router.delete("/rentals", authMiddleware, clearAllRentals);

// Protected route example
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
