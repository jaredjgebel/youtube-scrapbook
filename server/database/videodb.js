const Video = require("../models/video");
const { getUser } = require("./userdb");

async function createVideo({ userId, bookId, pageId, link, notes }) {
  try {
    const user = await getUser(userId);

    user.books
      .id(bookId)
      .pages.id(pageId)
      .videos.push(new Video({ link, notes }));

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function editVideo({ userId, bookId, pageId, videoId, link, notes }) {
  try {
    const user = await getUser(userId);
    const video = user.books.id(bookId).pages.id(pageId).videos.id(videoId);

    video.link = link;
    video.notes = notes;

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function deleteVideo({ userId, bookId, pageId, videoId }) {
  try {
    const user = await getUser(userId);

    const page = user.books.id(bookId).pages.id(pageId);

    page.videos = page.videos.filter((video) => !video._id.equals(videoId));

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
