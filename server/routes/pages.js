const express = require("express");
const router = express.Router();
const getUserMiddleware = require("../middleware/getUserMiddleware");
const { createPage, editPage, deletePage } = require("../database/pagedb");

router.get("/:id/books/:bookId/pages/:pageId", getUserMiddleware, function (
  req,
  res
) {
  const { user } = req;
  const { bookId } = req.params;
  const { pageId } = req.params;

  const book = user.books.find((book) => book._id.toString() === bookId);
  const page = book.pages.find((page) => page._id.toString() === pageId);

  return res.status(200).json({ page });
});

router.post("/:id/books/:bookId/pages", getUserMiddleware, async function (
  req,
  res
) {
  const { user } = req;
  const { bookId } = req.params;
  const title = (req.body && req.body.title) || "";

  try {
    const userWithNewPage = await createPage({
      userId: user._id,
      bookId,
      title,
    });

    if (userWithNewPage.errors) {
      return res.status(400).json({ error: userWithNewPage.errors.message });
    }

    return res.status(200).json({ user: userWithNewPage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch(
  "/:id/books/:bookId/pages/:pageId",
  getUserMiddleware,
  async function (req, res) {
    const { user } = req;
    const { bookId } = req.params;
    const { pageId } = req.params;
    const book = user.books.find((book) => book._id.toString() === bookId);
    const page = book.pages.find((page) => page._id.toString() === pageId);

    const number = (req.body && req.body.number) || page.number;

    try {
      const userWithEditedPage = await editPage({
        userId: user._id,
        bookId,
        pageId,
        number,
      });

      if (userWithEditedPage && userWithEditedPage.errors) {
        return res
          .status(400)
          .json({ error: userWithEditedPage.errors.message });
      }

      return res.status(200).json({ user: userWithEditedPage });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
