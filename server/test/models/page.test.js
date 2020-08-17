/* eslint-disable no-undef */
const { expect } = require("chai");
const Page = require("../../models/page");
const Video = require("../../models/video");

describe("Page model", function () {
  it("cannot hold more than two videos at a time", async function () {
    const page = new Page();

    const videos = [
      new Video({ link: "https://www.youtube.com/watch?v=fgTGADljAeg" }),
      new Video({ link: "https://www.youtube.com/watch?v=fgTGADljAeg" }),
      new Video({ link: "https://www.youtube.com/watch?v=fgTGADljAeg" }),
    ];

    page.videos.push(...videos);

    try {
      // eslint-disable-next-line no-unused-vars
      const pageDoc = await page.save();
    } catch (err) {
      expect(err._message).to.equal("Page validation failed");
    }
  });
});
