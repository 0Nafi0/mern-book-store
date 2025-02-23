const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
//const port = process.env.PORT || 5000;
//require("dotenv").config();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

//routes
const bookRoutes = require("./src/books/book.route.js");
const orderRoutes = require("./src/orders/order.route.js");
const userRoutes =  require("./src/users/user.route");
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URI);
  app.use("/", (req, res) => {
    res.send("Book Store Server is running!");
  });
}

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
