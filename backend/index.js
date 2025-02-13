const express = require("express");
const app = express();
const cors=require("cors");
const mongoose = require("mongoose");
//const port = process.env.PORT || 5000;
//require("dotenv").config();
require('dotenv').config();
const PORT = process.env.PORT || 5000;


// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use("/", (req, res) => {
  res.send("Book Store server is running");
});
//routes
const bookRoutes =require('./src/books/book.route.js')
app.use("/api/books",bookRoutes)
async function main() {
  await mongoose.connect(process.env.DB_URI);
}

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
