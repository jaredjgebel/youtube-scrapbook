const Book = require("../models/book");
const { getUser } = require("./userdb");

async function createBook({ userId, title = "" }) {
  try {
    const user = await getUser(userId);

    user.books.push(new Book({ title }));

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function editBook({ userId, bookId, title }) {
  try {
    const user = await getUser(userId);

    const bookToUpdate = user.books.find((book) => book._id.equals(bookId));
    const index = user.books.indexOf(bookToUpdate);

    user.books[index].title = title;

    return await user.save();
  } catch (error) {
    return error;
  }
}

async function deleteBook(userId, bookId) {
  try {
    const user = await getUser(userId);

    user.books.pull(bookId);

    return await user.save();
  } catch (error) {
    return error;
  }
}

module.exports = {
  createBook,
  editBook,
  deleteBook,
};
