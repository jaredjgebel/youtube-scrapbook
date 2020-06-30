const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  id: Number,
  link: String,
  notes: String,
});

module.exports = mongoose.model("Video", videoSchema);
