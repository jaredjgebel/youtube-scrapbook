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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  authId: {
    type: String,
    required: true,
  },
  books: {
    type: [bookSchema],
  },
});

module.exports = mongoose.model("User", userSchema);
