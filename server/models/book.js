const mongoose = require("mongoose");
const pageSchema = require("./page").schema;

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  pages: {
    type: [pageSchema],
    required: true,
    validate: {
      validator: function isLessThan100Pages() {
        return this.pages.length <= 100;
      },
    },
  },
});

module.exports = mongoose.model("Book", bookSchema);
