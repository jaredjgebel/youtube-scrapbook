const mongoose = require("mongoose");
const videoSchema = require("./video");

const pageSchema = mongoose.Schema({
  number: Number,
  videos: {
    default: [],
    type: Array,
    validate: {
      validator: function () {
        return this.videos.length <= 2;
      },
    },
  },
});

module.exports = mongoose.model("Page", pageSchema);
