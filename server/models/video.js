const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  notes: String,
});

module.exports = mongoose.model("Video", videoSchema);
