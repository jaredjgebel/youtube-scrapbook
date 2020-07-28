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
    default: [new pageSchema({ number: 1 })],
    validate: {
      validator: function () {
        return this.pages.length <= 100;
      },
    },
  },
});

// bookSchema.set("toObject", { getters: true });

module.exports = mongoose.model("Book", bookSchema);
