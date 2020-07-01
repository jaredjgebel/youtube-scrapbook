const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  id: Number,
  link: {
    type: String,
    required: true,
  },
  notes: String,
});

module.exports = mongoose.model("Video", videoSchema);
