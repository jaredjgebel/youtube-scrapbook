const expect = require("chai").expect;
const faker = require("faker");
const Video = require("../../models/video");

describe("Video model", () => {
  it("must have a link to a YouTube video", async () => {
    const video = new Video({
      link: "https://someotherwebsite.com/video?k=sdkjfsldkf",
    });

    try {
      await video.save();
    } catch (err) {
      expect(err._message).to.equal("Video validation failed");
    }
  });
});
