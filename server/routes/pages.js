const express = require("express");

const router = express.Router();
const getUserMiddleware = require("../middleware/getUserMiddleware");
const { createPage, editPage, deletePage } = require("../database/pagedb");
const isValidObjectId = require("../middleware/idValidationMiddleware");

router.get(
  "/books/:bookId/pages/:pageId",
  isValidObjectId,
  getUserMiddleware,
  function getPagesFromUser(req, res) {
    const { user } = req;
    const { bookId, pageId } = req.params;

    const page = user.books.id(bookId).pages.id(pageId);

    return res.status(200).json({ page });
  }
);

router.post(
  "/books/:bookId/pages",
  isValidObjectId,
  getUserMiddleware,
  async function postPageRequest(req, res, next) {
    const { databaseUser } = req;
    const { bookId } = req.params;
    const number = req.body && req.body.number;

    try {
      const userWithNewPage = await createPage({
        userId: databaseUser._id,
        bookId,
        number,
      });

      if (userWithNewPage instanceof Error) {
        return next(userWithNewPage);
      }

      return res
        .status(201)
        .json({ pages: userWithNewPage.books.id(bookId).pages });
    } catch (error) {
      return next(error);
    }
  }
);

router.patch(
  "/books/:bookId/pages/:pageId",
  isValidObjectId,
  getUserMiddleware,
  async function patchPageRequest(req, res, next) {
    const { databaseUser } = req;
    const { bookId, pageId } = req.params;
    const page = databaseUser.books.id(bookId).pages.id(pageId);

    const number = (req.body && req.body.number) || page.number;

    try {
      const userWithEditedPage = await editPage({
        userId: databaseUser._id,
        bookId,
        pageId,
        number,
      });

      if (userWithEditedPage) {
        return next(userWithEditedPage);
      }

      return res
        .status(200)
        .json({ pages: userWithEditedPage.books.id(bookId).pages });
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/books/:bookId/pages/:pageId",
  isValidObjectId,
  getUserMiddleware,
  async function deletePageRequest(req, res, next) {
    const { databaseUser } = req;
    const { bookId, pageId } = req.params;

    try {
      const userWithDeletedPage = await deletePage({
        userId: databaseUser._id,
        bookId,
        pageId,
      });

      if (userWithDeletedPage instanceof Error) {
        next(userWithDeletedPage);
      }

      return res
        .status(200)
        .json({ pages: userWithDeletedPage.books.id(bookId).pages });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
