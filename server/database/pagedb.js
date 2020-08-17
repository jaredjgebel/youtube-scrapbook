const Page = require("../models/page");
const { getUser } = require("./userdb");

async function createPage({ userId, bookId, number }) {
  try {
    const user = await getUser(userId);
    user.books.id(bookId).pages.push(new Page({ number }));

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function editPage({ userId, bookId, pageId, number }) {
  try {
    const user = await getUser(userId);

    const page = user.books.id(bookId).pages.id(pageId);

    page.number = number;

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function deletePage({ userId, bookId, pageId }) {
  try {
    const user = await getUser(userId);

    const book = user.books.id(bookId);

    book.pages = book.pages.pull(pageId);

    return await user.save();
  } catch (error) {
    return error;
  }
}

module.exports = { createPage, editPage, deletePage };
