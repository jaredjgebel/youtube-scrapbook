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

async function editBook({ id, title }) {}

async function deleteBook({ id }) {}

module.exports = {
  createBook,
  editBook,
  deleteBook,
};
