const express = require("express");

const router = express.Router();
const getUserMiddleware = require("../middleware/getUserMiddleware");
const { createVideo, editVideo, deleteVideo } = require("../database/videodb");
const isValidObjectId = require("../middleware/idValidationMiddleware");

router.get(
  "/books/:bookId/pages/:pageId/videos/:videoId",
  isValidObjectId,
  getUserMiddleware,
  function getVideosFromUser(req, res) {
    const { databaseUser } = req;
    const { bookId, pageId, videoId } = req.params;

    const video = databaseUser.books
      .id(bookId)
      .pages.id(pageId)
      .videos.id(videoId);

    return res.status(200).json({ video });
  }
);

router.post(
  "/books/:bookId/pages/:pageId/videos",
  isValidObjectId,
  getUserMiddleware,
  async function postVideoRequest(req, res, next) {
    const { databaseUser } = req;
    const { bookId, pageId } = req.params;
    const { link, notes } = req.body;

    try {
      const userWithNewVideo = await createVideo({
        userId: databaseUser._id,
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
  "/books/:bookId/pages/:pageId/videos/:videoId",
  isValidObjectId,
  getUserMiddleware,
  async function patchVideoRequest(req, res, next) {
    const { databaseUser } = req;
    const { bookId, pageId, videoId } = req.params;
    const { notes, link } = req.body;

    try {
      const userWithEditedVideo = await editVideo({
        userId: databaseUser._id,
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
  "/books/:bookId/pages/:pageId/videos/:videoId",
  isValidObjectId,
  getUserMiddleware,
  async function deleteVideoRequest(req, res, next) {
    const { databaseUser } = req;
    const { bookId, pageId, videoId } = req.params;

    try {
      const userWithDeletedVideo = await deleteVideo({
        userId: databaseUser._id,
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
