const Page = require("../models/page");
const { getUser } = require("./userdb");

async function createPage({ userId, bookId, title }) {
  try {
    const user = await getUser(userId);
    const book = user.books.find((book) => book._id.equals(bookId));
    const page = new Page({ title, number: book.pages.length - 1 });

    book.pages.push(page);

    return await user.save();
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