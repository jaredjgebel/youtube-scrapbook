const mongoose = require("mongoose");
const videoSchema = require("./video");

const pageSchema = mongoose.Schema({
  number: Number,
  videos: [videoSchema],
});

module.exports = mongoose.model("Page", pageSchema);
