const Page = require("../models/page");
const { getUser } = require("./userdb");

async function createPage({ userId, bookId, number }) {
  try {
    const user = await getUser(userId);
    user.books.id(bookId).push(new Page({ number }));

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function editPage({ userId, bookId, pageId, number }) {
  try {
    const user = await getUser(userId);

    const book = user.books.find((abook) => abook._id.equals(bookId));
    const bookIndex = user.books.indexOf(book);
    const page = book.pages.find((apage) => apage._id.equals(pageId));
    const pageIndex = book.pages.indexOf(page);

    user.books[bookIndex].pages.set(pageIndex, { book, number });

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function deletePage({ userId, bookId, pageId }) {
  try {
    const user = await getUser(userId);

    const book = user.books.find((book) => book._id.equals(bookId));
    const page = book.pages.find((page) => page._id.equals(pageId));
    const index = book.pages.indexOf(page);

    book.pages = book.pages.slice(index, 1);

    return await user.save();
  } catch (error) {
    return error;
  }
}

module.exports = { createPage, editPage, deletePage };
