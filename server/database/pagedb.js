const Page = require("../models/page");
const { getUser } = require("./userdb");

async function createPage({ userId, bookId, title }) {
  try {
    const user = await getUser(userId);
    const book = user.books.find((book) => book._id.equals(bookId));
    const page = new Page({ title, number: book.pages.length - 1 });
    book.pages.push(page);

    const userWithNewPage = await user.save();
    return userWithNewPage;
  } catch (error) {
    return error;
  }
}

async function editPage({ userId, bookId, pageId, title }) {
  try {
    const user = await getUser(userId);
    if (!title) return user;

    const book = user.books.find((book) => book._id.equals(bookId));
    const page = book.pages.find((page) => page._id.equals(pageId));

    page.title = title;

    const userWithEditedPage = await user.save();

    return userWithEditedPage;
  } catch (error) {
    return error;
  }
}

async function deletePage({ userId, bookId, pageId }) {}

module.exports = { createPage, editPage, deletePage };
