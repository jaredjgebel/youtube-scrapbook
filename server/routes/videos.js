const express = require("express");

const router = express.Router();
const getUserMiddleware = require("../middleware/getUserMiddleware");
const { createVideo, editVideo, deleteVideo } = require("../database/videodb");

router.get(
  "/:id/books/:bookId/pages/:pageId/videos/:videoId",
  getUserMiddleware,
  function getVideosFromUser(req, res) {
    const { user } = req;
    const { bookId, pageId, videoId } = req.params;

    const video = user.books.id(bookId).pages.id(pageId).videos.id(videoId);

    return res.status(200).json({ video });
  }
);

router.post(
  "/:id/books/:bookId/pages/:pageId/videos",
  getUserMiddleware,
  async function postVideoRequest(req, res, next) {
    const { user } = req;
    const { bookId, pageId } = req.params;
    const { link, notes } = req.body;

    try {
      const userWithNewVideo = await createVideo({
        userId: user.id,
        bookId,
        pageId,
        link,
        notes,
      });

      if (userWithNewVideo instanceof Error) {
        return next(userWithNewVideo);
      }

      return res.status(201).json({
        videos: userWithNewVideo.books.id(bookId).pages.id(pageId).videos,
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.patch(
  "/:id/books/:bookId/pages/:pageId/videos/:videoId",
  getUserMiddleware,
  async function patchVideoRequest(req, res, next) {
    const { user } = req;
    const { bookId, pageId, videoId } = req.params;
    const { notes, link } = req.body;

    try {
      const userWithEditedVideo = await editVideo({
        userId: user.id,
        bookId,
        pageId,
        videoId,
        notes,
        link,
      });

      if (userWithEditedVideo instanceof Error) {
        return next(userWithEditedVideo);
      }

      return res.status(200).json({
        videos: userWithEditedVideo.books.id(bookId).pages.id(pageId).videos,
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/:id/books/:bookId/pages/:pageId/videos/:videoId",
  getUserMiddleware,
  async function deleteVideoRequest(req, res, next) {
    const { user } = req;
    const { bookId, pageId, videoId } = req.params;

    try {
      const userWithDeletedVideo = await deleteVideo({
        userId: user.id,
        bookId,
        pageId,
        videoId,
      });

      if (userWithDeletedVideo instanceof Error) {
        return next(userWithDeletedVideo);
      }

      return res.status(200).json({
        videos: userWithDeletedVideo.books.id(bookId).pages.id(pageId).videos,
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;