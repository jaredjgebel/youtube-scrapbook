const mongoose = require("mongoose");
const pageSchema = require("./page");

const bookSchema = mongoose.Schema({
  title: String,
  pages: [pageSchema],
});

module.exports = mongoose.model("Book", bookSchema);
