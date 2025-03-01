const User = require("./user.model");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId; // From auth middleware
    const { bookId, quantity = 1 } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if book already exists in cart
    const existingCartItem = user.cart.find(
      (item) => item.book.toString() === bookId
    );

    if (existingCartItem) {
      // Update quantity if book already in cart
      existingCartItem.quantity += quantity;
    } else {
      // Add new book to cart
      user.cart.push({
        book: bookId,
        quantity,
        addedAt: new Date(),
      });
    }

    await user.save();

    // Populate the cart items with book details
    await user.populate("cart.book");

    res.status(200).json({
      message: "Book added to cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate("cart.book");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Failed to get cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => item.book.toString() !== bookId);
    await user.save();

    res.status(200).json({
      message: "Book removed from cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Failed to remove from cart" });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = [];
    await user.save();

    res.status(200).json({
      message: "Cart cleared successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
};
