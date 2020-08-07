require("../dbHelper");
const expect = require("chai").expect;
const faker = require("faker");
const User = require("../../models/user");
const Book = require("../../models/book");
const { createBook, editBook, deleteBook } = require("../../database/bookdb");
const { getUser } = require("../../database/userdb");

describe("Book model database functions", () => {
  let user;
  let book;
  const title = faker.random.words(5);

  before(async () => {
    user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });

    book = new Book({ title });
    user.books.push(book);

    try {
      const response = await user.save();

      if (response.errors) {
        throw new Error(response.errors.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  });

  it("should create a new book ", async () => {
    const title = faker.random.words(5);
    const userWithNewBook = await createBook({
      userId: user._id,
      title: title,
    });

    // new book placed at final index (after default)
    const newBookIndex = userWithNewBook.books.length - 1;

    expect(userWithNewBook.books[newBookIndex].title).to.equal(title);
  });

  it("should edit a given book", async () => {
    const newTitle = faker.random.words(5);
    let editedUser;

    try {
      editedUser = await editBook({
        userId: user._id,
        bookId: book._id,
        title: newTitle,
      });

      expect(editedUser).to.be.an.instanceof(User);
    } catch (error) {
      throw new Error(error);
    } finally {
      const savedUser = await getUser(user._id);
      const updatedBook = savedUser.books.find((updatedBook) =>
        updatedBook._id.equals(book._id)
      );

      const bookIndex = savedUser.books.indexOf(updatedBook);

      expect(savedUser.books[bookIndex].title).to.equal(newTitle);
    }
  });

  it("should delete a given book", async () => {
    try {
      const userWithDeletedBook = await deleteBook(user._id, book._id);

      expect(userWithDeletedBook).to.be.an.instanceof(User);
    } catch (error) {
      throw new Error(error);
    } finally {
      const savedUser = await getUser(user._id);

      const deletedBook = savedUser.books.find((aBook) =>
        aBook._id.equals(book._id)
      );

      expect(deletedBook).to.be.undefined;
    }
  });
});
