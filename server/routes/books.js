const express = require("express");

const router = express.Router();
const getUserMiddleware = require("../middleware/getUserMiddleware");
const { createBook, editBook, deleteBook } = require("../database/bookdb");

router.get("/:id/books/:bookId", getUserMiddleware, function runGetUser(
  req,
  res
) {
  const { user } = req;
  const { bookId } = req.params;

  const book = user.books.find((aBook) => aBook._id.toString() === bookId);

  return res.status(200).json({ book });
});

router.post("/:id/books", getUserMiddleware, async function postUser(req, res) {
  const book = {
    userId: req.user._id,
    title: req.body.title || "",
  };

  try {
    const userWithNewBook = await createBook(book);

    if (userWithNewBook.errors) {
      return res.status(400).json({ error: userWithNewBook.errors.message });
    }

    return res.status(200).json({ user: userWithNewBook });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/:id/books/:bookId", getUserMiddleware, async function patchUser(
  req,
  res
) {
  const { user } = req;
  const { bookId } = req.params;
  const book = user.books.find((aBook) => aBook._id.toString() === bookId);
  const title = (req.body && req.body.title) || book.title;

  try {
    const userWithEditedBook = await editBook({
      userId: user._id,
      bookId,
      title,
    });

    if (userWithEditedBook && userWithEditedBook.errors) {
      return res.status(400).json({ error: userWithEditedBook.errors.message });
    }

    return res.status(200).json({ user: userWithEditedBook });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete(
  "/:id/books/:bookId",
  getUserMiddleware,
  async function runDeleteUser(req, res) {
    const { bookId } = req.params;

    try {
      const deletedBook = await deleteBook(req.user._id, bookId);
      if (deletedBook && deletedBook.errors) {
        return res.status(400).json({ error: deletedBook.errors.message });
      }

      return res.status(200).json({ book: deletedBook });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);
module.exports = router;
