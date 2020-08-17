require("../dbHelper");
const { expect } = require("chai");
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
const { getUser } = require("../../database/userdb");

describe("Video database interface", function () {
  let user;
  let book;
  let page;
  let video;

  before(async function () {
    user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });

    book = new Book({ title: faker.random.words(5) });
    page = new Page({ number: 4 });
    video = new Video({
      link: "https://www.youtube.com/watch?v=7Q17ubqLfaM",
      notes: faker.lorem.sentences(3),
    });

    page.videos.push(video);
    book.pages.push(page);
    user.books.push(book);

    try {
      const userDocument = await user.save();

      if (userDocument.errors) {
        throw new Error(userDocument.errors);
      }
    } catch (error) {
      throw new Error(error);
    }
  });

  it("should create a new video for a given page", async function () {
    let userWithNewVideo;

    const link = "https://www.youtube.com/watch?v=41GSinwoMYA";
    const notes = faker.lorem.sentences(3);

    try {
      userWithNewVideo = await createVideo({
        userId: user._id,
        bookId: book._id,
        pageId: page._id,
        link,
        notes,
      });

      expect(userWithNewVideo).to.be.an.instanceof(User);
    } catch (error) {
      throw new Error(error);
    } finally {
      const savedUser = await getUser(user._id);

      const { videos } = savedUser.books.id(book._id).pages.id(page._id);

      expect(
        videos.filter(
          (aVideo) => aVideo.link === link && aVideo.notes === notes
        ).length
      ).to.equal(1);
    }
  });

  it("should edit a given video", async function () {
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
    } finally {
      const savedUser = await getUser(user._id);
      const editedVideo = savedUser.books
        .id(book._id)
        .pages.id(page._id)
        .videos.id(video._id);

      expect(editedVideo.link).to.equal(newLink);
      expect(editedVideo.notes).to.equal(newNotes);
    }
  });

  it("should delete a given video", async function () {
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
    } finally {
      const savedUser = await getUser(user._id);
      const deletedVideo = savedUser.books
        .id(book._id)
        .pages.id(page._id)
        .videos.id(video._id);

      expect(deletedVideo).to.be.null;
    }
  });
});
