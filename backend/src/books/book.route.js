const express = require("express");
const Book = require("./book.model");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
} = require("./book.controller");
const router = express.Router();
const upload = require("../middleware/upload");

// frontend => backend server => controller => book schema  => database => send to server => back to the frontend
//post= when submit smtg fronted to db
//get= when get smtg back from db
//put/patch=when edit or update smtg
//dlt
//post a book
router.post("/create-book", upload.single("coverImage"), postABook);

// get all books
router.get("/", getAllBooks);

// single book endpoint
router.get("/:id", getSingleBook);

// update a book endpoint
router.put("/edit/:id", UpdateBook);
router.delete("/:id", deleteABook);

module.exports = router;
