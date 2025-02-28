const express = require("express");
const router = express.Router();
const { register, verifyEmail, login } = require("./auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

// Protected route example
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
