const Book = require("./book.model");
const fs = require("fs");
const path = require("path");

const postABook = async (req, res) => {
  try {
    // Handle file upload
    let coverImage = req.body.coverImageUrl || "";

    if (req.file) {
      // If a file was uploaded, save its path
      const uploadDir = path.join(__dirname, "../../public/uploads");

      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Save file with unique name
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, req.file.buffer);

      // Set the coverImage to the relative path
      coverImage = `/uploads/${fileName}`;
    }

    // Create new book with file path
    const newBook = await Book({
      ...req.body,
      coverImage,
    });

    await newBook.save();
    res
      .status(200)
      .send({ message: "Book posted successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};
//get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "Failed to fetch books" });
  }
};
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not Found!" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book", error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
};
// update book data
const UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating a book", error);
    res.status(500).send({ message: "Failed to update a book" });
  }
};
const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting a book", error);
    res.status(500).send({ message: "Failed to delete a book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
};
