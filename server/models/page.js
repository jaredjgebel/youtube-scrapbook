const mongoose = require("mongoose");
const videoSchema = require("./video").schema;

const pageSchema = mongoose.Schema({
  number: Number,
  videos: {
    type: [videoSchema],
    validate: {
      validator: function hasFewerThanTwoVideos() {
        return this.videos.length <= 2;
      },
    },
  },
});

module.exports = mongoose.model("Page", pageSchema);
