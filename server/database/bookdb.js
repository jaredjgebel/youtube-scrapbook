const Book = require("../models/book");
const { getUser } = require("./userdb");

async function createBook({ userId, title = "" }) {
  const user = await getUser(userId);

  user.books.push(new Book({ title }));

  try {
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

    user.books[index] = { ...bookToUpdate, title };

    const response = await user.save();

    return response;
  } catch (error) {
    return error;
  }
}

async function deleteBook(userId, bookId) {
  try {
    const user = await getUser(userId);

    const bookToDelete = user.books.find((book) => book._id.equals(bookId));

    const index = user.books.indexOf(bookToDelete);

    delete user.books[index];

    const userWithDeletedBook = await user.save();

    return userWithDeletedBook;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createBook,
  editBook,
  deleteBook,
};
