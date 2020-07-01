const mongoose = require("mongoose");
const videoSchema = require("./video");

const pageSchema = mongoose.Schema({
  number: Number,
  videos: {
    required: true,
    default: [],
    type: Array,
  },
});

module.exports = mongoose.model("Page", pageSchema);
