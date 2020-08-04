require("../dbHelper");
const expect = require("chai").expect;
const faker = require("faker");
const User = require("../../models/user");
const Book = require("../../models/book");
const Page = require("../../models/page");
const Video = require("../../models/video");
const {
  createVideo,
  editVideo,
  deleteVideo,
} = require("../../database/videodb");
const { createPage } = require("../../database/pagedb");

describe("Video database interface", () => {
  let user, book, page, video;

  before(async () => {
    user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });

    book = new Book({ title: faker.random.words(5) });
    page = new Page({ title: faker.random.words(5) });
    video = new Video({ link: "", notes: faker.lorem.sentences(3) });

    user.books.push(book);
    book.pages.push(page);
    page.videos.push(video);

    try {
      const userDocument = await user.save();

      if (userDocument.errors) {
        throw new Error(userDocument.errors);
      }
    } catch (error) {
      throw new Error(error);
    }
  });

  it("should create a new video for a given page", async () => {
    let userWithNewVideo, bookWithNewVideo, pageWithNewVideo;

    const link = "https://www.youtube.com/watch?v=fzI9FNjXQ0o";
    const notes = faker.lorem.sentences(3);

    try {
      userWithNewVideo = await createVideo({
        userId: user._id,
        bookId: book._id,
        pageId: page._id,
        link,
        notes,
      });

      bookWithNewVideo = userWithNewVideo.books.find((book) =>
        book._id.equals(book._id)
      );
      pageWithNewVideo = bookWithNewVideo.pages.find((page) =>
        page._id.equals(page._id)
      );

      expect(userWithNewVideo).to.be.an.instanceof(User);
      // if I expect to check the values, I'll need to re-request the user in a finally block
      // expect(
      //   pageWithNewVideo.videos.find(
      //     (video) => video.link === link && video.notes === notes
      //   )
      // ).to.be.true;
    } catch (error) {
      throw new Error(error);
    }
  });

  it("should edit a given video", async () => {
    const newLink = "https://www.youtube.com/watch?v=jfYWwQrtzzY";
    const newNotes = faker.lorem.sentences(3);
    let userWithEditedVideo;

    try {
      userWithEditedVideo = await editVideo({
        userId: user._id,
        bookId: book._id,
        pageId: page._id,
        videoId: video.id,
        link: newLink,
        notes: newNotes,
      });

      expect(userWithEditedVideo).to.be.instanceOf(User);
    } catch (error) {
      throw new Error(error);
    }
  });

  it("should delete a given video", async () => {
    try {
      const userWithDeletedVideo = await deleteVideo({
        userId: user._id,
        bookId: book._id,
        pageId: page._id,
        videoId: video._id,
      });

      expect(userWithDeletedVideo).to.be.instanceOf(User);
    } catch (error) {
      throw new Error(error);
    }
  });
});
