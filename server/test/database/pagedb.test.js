require("../dbHelper");
const expect = require("chai").expect;
const faker = require("faker");
const User = require("../../models/user");
const Book = require("../../models/book");
const Page = require("../../models/page");
const { createPage, editPage, deletePage } = require("../../database/pagedb");

describe("Page database interfaces", () => {
  let user, book, page;

  before(async () => {
    user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });

    book = new Book({ title: faker.random.words(5) });

    page = new Page({ title: faker.random.words(5) });

    book.pages.push(page);
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

  it("should create a new page for a given book in the database", async () => {
    let userWithNewPage, bookWithNewPage, newPage;
    const newTitle = faker.random.words(5);

    try {
      userWithNewPage = await createPage({
        userId: user._id,
        bookId: book._id,
        title: newTitle,
      });

      bookWithNewPage = userWithNewPage.books.find((newBook) =>
        newBook._id.equals(book._id)
      );

      expect(userWithNewPage).to.be.an.instanceof(User);
    } catch (error) {
      throw new Error(error);
    }
  });

  it("should edit a given page in the database", async () => {
    const newTitle = faker.random.words(5);

    let userWithEditedPage;

    try {
      userWithEditedPage = await editPage({
        userId: user._id,
        bookId: book._id,
        pageId: page._id,
        title: newTitle,
      });
    } catch (error) {
      throw new Error(error);
    }

    expect(userWithEditedPage).to.be.an.instanceof(User);
  });

  xit("should delete a given page in the database", async () => {
    let userWithDeletedPage;

    try {
      userWithDeletedPage = await deletePage({
        userId: user._id,
        bookId: book._id,
        pageId: page._id,
      });
    } catch (error) {
      throw new Error(error);
    }

    expect(userWithDeletedPage.to.be.an.instanceof(User));
  });
});
