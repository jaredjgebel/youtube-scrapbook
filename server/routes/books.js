const express = require("express");
const router = express.Router();
const getUserMiddleware = require("../middleware/getUserMiddleware");

router.get("/:id/books/:bookId", getUserMiddleware, function (req, res) {
  const user = req.user;
  const id = req.params.bookId;

  const book = user.books.filter((book) => book.id === id);

  return res.status(200).json({ book });
});

module.exports = router;
