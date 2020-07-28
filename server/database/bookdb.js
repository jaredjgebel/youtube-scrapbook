const User = require("../models/user");
const Book = require("../models/book");
const { getUser } = require("./userdb");

async function createBook({ userId, title = "" }) {
  const user = await getUser(userId);

  user.books.push(new Book({ title }));

  try {
    return await user.save();
  } catch {
    throw new Error(err);
  }
}

async function editBook({ userId, bookId, title }) {
  try {
    const user = await User.findById(userId);

    const [bookToUpdate] = user.books.filter((book) => book._id.equals(bookId));

    const index = user.books.indexOf(bookToUpdate);

    user.books[index] = { ...bookToUpdate, title };

    const response = await user.save();

    return response;
  } catch (err) {
    return err;
  }
}

async function deleteBook(id) {
  try {
    return await Book.findByIdAndDelete({ _id: id });
  } catch (err) {
    return err;
  }
}

module.exports = {
  createBook,
  editBook,
  deleteBook,
};
