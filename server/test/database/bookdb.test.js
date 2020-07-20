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

  beforeEach(async () => {
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
    } catch (error) {
      throw new Error(error);
    }
  });

  it("should create a new book ", async () => {
    const userWithNewBook = await createBook({ userId: user.id, title });

    // new book placed at final index (after default)
    const newBookIndex = userWithNewBook.books.length - 1;

    expect(userWithNewBook.books[newBookIndex].title).to.equal(title);
  });

  // it("should edit a given book", async () => {
  //   const user = User.findById

  //   const userWithEditedBook = await editBook({ })
  // })

  afterEach(async () => {
    await User.findOneAndDelete({ id: user.id });
  });
});
