const Page = require("../models/page");
const { getUser } = require("./userdb");

async function createPage({ userId, bookId, number }) {
  const Book = require("../models/book");
  try {
    const user = await getUser(userId);
    const book = user.books.find((book) => book._id.equals(bookId));

    user = user.addPage(bookId, number);
    // const pages = book.getPages();

    // const bookIndex = user.books.indexOf(book);
    // const page = new Page({ number: number || book.pages.length + 1 });

    // book.pages.push(page);
    // const pageIndex = book.pages.indexOf(page);
    // user.books[bookIndex].pages.push(page);
    // user.markModified(`books[${bookIndex}].pages`);
    // `books[${bookIndex}].pages[${pageIndex}]`

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function editPage({ userId, bookId, pageId, number }) {
  try {
    const user = await getUser(userId);

    const book = user.books.find((book) => book._id.equals(bookId));
    const bookIndex = user.books.indexOf(book);
    const page = book.pages.find((page) => page._id.equals(pageId));
    const pageIndex = book.pages.indexOf(page);

    user.books[bookIndex].pages.set(pageIndex, { book, number });
    // page.number = number;
    // user.markModified(`books[${bookIndex}].pages[${pageIndex}].number`);
    // user.set(`books[${bookIndex}].pages[${pageIndex}].number`, number);

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
