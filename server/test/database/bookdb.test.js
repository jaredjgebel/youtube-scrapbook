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
      userId: user._id,
      title: newTitle,
    });

    // new book placed at final index (after default)
    const newBookIndex = userWithNewBook.books.length - 1;

    expect(userWithNewBook.books[newBookIndex].title).to.equal(newTitle);
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
    } catch (error) {
      console.log(error);
    } finally {
      const editedUser = await getUser(user._id);

      expect(editedUser).to.be.an.instanceof(User);
    }
  });

  it("should delete a given book", async () => {
    const response = await deleteBook(book.id);

    expect(response._id.toString()).to.equal(book._id.toString());
  });
});
