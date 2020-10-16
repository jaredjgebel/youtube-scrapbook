const express = require("express");

const router = express.Router();
const getUserMiddleware = require("../middleware/getUserMiddleware");
const { createBook, editBook, deleteBook } = require("../database/bookdb");
const isValidObjectId = require("../middleware/idValidationMiddleware");

router.get(
  "/books/:bookId",
  isValidObjectId,
  getUserMiddleware,
  function getBookRequest(req, res) {
    const { user } = req;
    const { bookId } = req.params;

    const book = user.books.id(bookId);

    return res.status(200).json({ book });
  }
);

router.post(
  "/books",
  isValidObjectId,
  getUserMiddleware,
  async function postBookRequest(req, res, next) {
    const book = {
      userId: req.databaseUser._id,
      title: req.body.title || "",
    };

    try {
      const userWithNewBook = await createBook(book);

      if (userWithNewBook instanceof Error) {
        return next(userWithNewBook);
      }

      return res.status(201).json({ books: userWithNewBook.books });
    } catch (error) {
      return next(error);
    }
  }
);

router.patch(
  "/books/:bookId",
  isValidObjectId,
  getUserMiddleware,
  async function patchBookRequest(req, res, next) {
    const { databaseUser } = req;
    const { bookId } = req.params;

    const book = databaseUser.books.id(bookId);

    const title = (req.body && req.body.title) || book.title;

    try {
      const userWithEditedBook = await editBook({
        userId: databaseUser._id,
        bookId,
        title,
      });

      if (userWithEditedBook instanceof Error) {
        return next(userWithEditedBook);
      }

      return res.status(200).json({ books: userWithEditedBook.books });
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/books/:bookId",
  isValidObjectId,
  getUserMiddleware,
  async function deleteBookRequest(req, res, next) {
    const { bookId } = req.params;

    try {
      const userWithDeletedBook = await deleteBook(
        req.databaseUser._id,
        bookId
      );

      if (userWithDeletedBook instanceof Error) {
        return next(userWithDeletedBook);
      }

      return res.status(200).json({ user: userWithDeletedBook });
    } catch (error) {
      return next(error);
    }
  }
);
module.exports = router;
