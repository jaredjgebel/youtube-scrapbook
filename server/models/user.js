const mongoose = require("mongoose");
const bookSchema = require("./book").schema;

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
  books: {
    type: [bookSchema],
  },
});

module.exports = mongoose.model("User", userSchema);
