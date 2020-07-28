require("../dbHelper");
const expect = require("chai").expect;
const faker = require("faker");
const User = require("../../models/user");
const Book = require("../../models/book");
const { createBook, editBook, deleteBook } = require("../../database/bookdb");

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
      const bookResponse = await book.save();

      if (response.errors) {
        throw new Error(response.errors.message);
      }
      if (bookResponse.errors) {
        throw new Error(bookResponse.errors.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  });

  it("should create a new book ", async () => {
    const newTitle = faker.random.words(5);
    const userWithNewBook = await createBook({
      userId: user.id,
      title: newTitle,
    });

    // new book placed at final index (after default)
    const newBookIndex = userWithNewBook.books.length - 1;

    expect(userWithNewBook.books[newBookIndex].title).to.equal(newTitle);
  });

  it("should edit a given book", async () => {
    const newTitle = faker.random.words(5);
    const editedBook = await editBook({
      id: book.id,
      title: newTitle,
    });

    expect(editedBook.title).to.equal(newTitle);
  });

  it("should delete a given book", async () => {
    const response = await deleteBook(book.id);

    expect(response.id).to.equal(book.id);
  });
});
