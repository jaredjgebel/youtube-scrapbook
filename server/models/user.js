const mongoose = require("mongoose");
const bookSchema = require("./book");

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
    required: true,
    default: [new bookSchema()],
    type: Array,
  },
});

// userSchema.set("toObject", { getters: true });

module.exports = mongoose.model("User", userSchema);
