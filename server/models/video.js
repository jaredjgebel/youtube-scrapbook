const mongoose = require("mongoose");

const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/g;

const videoSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    validate: {
      validator: function isAYoutubeLink(v) {
        return youtubeRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid youtube link`,
    },
  },
  notes: String,
});

module.exports = mongoose.model("Video", videoSchema);
