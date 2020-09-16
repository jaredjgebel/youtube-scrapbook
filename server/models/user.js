const mongoose = require("mongoose");
const bookSchema = require("./book").schema;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: {
    type: String,
    required: true,
  },
  authId: {
    type: String,
    required: true,
    unique: true,
  },
  data: mongoose.Schema.Types.Mixed,
  books: {
    type: [bookSchema],
  },
});

module.exports = mongoose.model("User", userSchema);
