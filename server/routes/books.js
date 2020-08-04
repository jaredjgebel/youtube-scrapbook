const express = require("express");
const router = express.Router();
const getUserMiddleware = require("../middleware/getUserMiddleware");
const { createBook, editBook, deleteBook } = require("../database/bookdb");

router.get("/:id/books/:bookId", getUserMiddleware, function (req, res) {
  const user = req.user;
  const id = req.params.bookId;

  const book = user.books.filter((book) => book.id === id);

  return res.status(200).json({ book });
});

router.post("/:id/books", getUserMiddleware, async function (req, res) {
  const book = {
    userId: req.user.id,
    title: req.body.title || "",
  };

  try {
    const newBook = await createBook(book);

    if (newBook.errors) {
      return res.status(400).json({ error: newBook.errors.message });
    }

    return res.status(200).json({ book: newBook });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/:id/books/:bookId", getUserMiddleware, async function (
  req,
  res
) {
  const user = req.user;
  const id = req.params.bookId;
  const book = user.books.find((book) => book.id === id);
  const title = (req.body && req.body.title) || book.title;

  try {
    const editedBook = await editBook({ userId: user.id, bookId: id, title });

    if (editedBook && editedBook.errors) {
      return res.status(400).json({ error: editedBook.errors.message });
    }

    return res.status(200).json({ book: editedBook });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
