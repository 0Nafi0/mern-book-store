const User = require("./user.model");
const Book = require("../books/book.model");

const addToRentals = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.body;

    // Find the book to get its rental price
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if book is already rented
    const existingRental = user.rentals.find(
      (rental) => rental.book.toString() === bookId && !rental.returned
    );

    if (existingRental) {
      return res.status(400).json({ message: "Book already rented" });
    }

    // Calculate rental dates and price
    const rentalStartDate = new Date();
    const rentalEndDate = new Date();
    rentalEndDate.setDate(rentalEndDate.getDate() + 30); // 30 days rental period

    // Calculate rental price (using daily rate)
    const rentalPrice = book.rentalPricePerDay * 30; // 30 days rental price

    // Add new rental
    user.rentals.push({
      book: bookId,
      rentalStartDate,
      rentalEndDate,
      rentalPrice,
      returned: false,
    });

    await user.save();
    await user.populate("rentals.book");

    res.status(200).json({
      message: "Book rented successfully",
      rentals: user.rentals,
    });
  } catch (error) {
    console.error("Add to rentals error:", error);
    res.status(500).json({ message: "Failed to rent book" });
  }
};

const getRentals = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate("rentals.book");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ rentals: user.rentals });
  } catch (error) {
    console.error("Get rentals error:", error);
    res.status(500).json({ message: "Failed to get rentals" });
  }
};

const returnBook = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const rental = user.rentals.find(
      (rental) =>
        rental.book.toString() === bookId && rental.status === "active"
    );

    if (!rental) {
      return res.status(404).json({ message: "Active rental not found" });
    }

    rental.status = "returned";
    await user.save();

    await user.populate("rentals.book");

    res.status(200).json({
      message: "Book returned successfully",
      rentals: user.rentals,
    });
  } catch (error) {
    console.error("Return book error:", error);
    res.status(500).json({ message: "Failed to return book" });
  }
};

const clearRental = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the specific rental
    user.rentals = user.rentals.filter(
      (rental) => rental.book.toString() !== bookId
    );

    await user.save();
    await user.populate("rentals.book");

    res.status(200).json({
      message: "Rental cleared successfully",
      rentals: user.rentals,
    });
  } catch (error) {
    console.error("Clear rental error:", error);
    res.status(500).json({ message: "Failed to clear rental" });
  }
};

const clearAllRentals = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear all rentals
    user.rentals = [];
    await user.save();

    res.status(200).json({
      message: "All rentals cleared successfully",
      rentals: [],
    });
  } catch (error) {
    console.error("Clear all rentals error:", error);
    res.status(500).json({ message: "Failed to clear all rentals" });
  }
};

module.exports = {
  addToRentals,
  getRentals,
  returnBook,
  clearRental,
  clearAllRentals,
};
