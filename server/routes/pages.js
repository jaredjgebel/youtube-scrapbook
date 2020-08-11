const express = require("express");

const router = express.Router();
const getUserMiddleware = require("../middleware/getUserMiddleware");
const { createPage, editPage } = require("../database/pagedb");

router.get(
  "/:id/books/:bookId/pages/:pageId",
  getUserMiddleware,
  function getPagesFromUser(req, res) {
    const { user } = req;
    const { bookId } = req.params;
    const { pageId } = req.params;

    const page = user.books.id(bookId).pages.id(pageId);

    return res.status(200).json({ page });
  }
);

router.post(
  "/:id/books/:bookId/pages",
  getUserMiddleware,
  async function postPagesRequest(req, res) {
    const { user } = req;
    const { bookId } = req.params;
    const title = (req.body && req.body.title) || "";

    try {
      const userWithNewPage = await createPage({
        userId: user._id,
        bookId,
        title,
      });

      if (userWithNewPage instanceof Error) {
        return res.status(400).json({ error: userWithNewPage.message });
      }

      return res.status(200).json({ user: userWithNewPage });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.patch(
  "/:id/books/:bookId/pages/:pageId",
  getUserMiddleware,
  async function patchPagesRequest(req, res) {
    const { user } = req;
    const { bookId } = req.params;
    const { pageId } = req.params;
    const page = user.books.id(bookId).pages.id(pageId);

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
