const Video = require("../models/video");
const { getUser } = require("./userdb");

async function createVideo({ userId, bookId, pageId, link, notes }) {
  try {
    const user = await getUser(userId);

    const book = user.books.find((book) => book._id.equals(bookId));
    const page = book.pages.find((page) => page._id.equals(pageId));

    page.videos.push(new Video({ link, notes }));

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function editVideo({ userId, bookId, pageId, videoId, link, notes }) {
  try {
    const user = await getUser(userId);

    const book = user.books.find((book) => book._id.equals(bookId));
    const page = book.pages.find((page) => page._id.equals(pageId));
    const video = page.videos.find((page) => page._id.equals(videoId));

    const index = page.videos.indexOf(video);

    page.videos[index] = { ...video, link, notes };

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function deleteVideo({ userId, bookId, pageId, videoId }) {
  try {
    const user = await getUser(userId);

    const book = user.books.find((book) => book._id.equals(bookId));
    const page = book.pages.find((page) => page._id.equals(pageId));
    const video = page.videos.find((video) => video._id.equals(videoId));

    const index = page.videos.indexOf(video);
    delete video[index];

    return await user.save();
  } catch (error) {
    return error;
  }
}

module.exports = {
  createVideo,
  editVideo,
  deleteVideo,
};
