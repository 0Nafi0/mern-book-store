const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use("/", (req, res) => {
  res.send("Book Store server is running");
});

async function main() {
  await mongoose.connect(process.env.DB_URI);
}

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
