const mongoose = require("mongoose");
const pageSchema = require("./page");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  pages: {
    type: Array,
    required: true,
    default: [new pageSchema({})],
  },
});

module.exports = mongoose.model("Book", bookSchema);
