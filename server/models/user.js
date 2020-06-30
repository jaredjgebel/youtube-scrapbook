const mongoose = require("mongoose");
const bookSchema = require("./bookSchema");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: String,
  books: [bookSchema],
});

module.exports = mongoose.model("User", userSchema);
