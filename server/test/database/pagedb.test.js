require("../dbHelper");
const { expect } = require("chai");
const faker = require("faker");
const User = require("../../models/user");
const Book = require("../../models/book");
const { createPage, editPage, deletePage } = require("../../database/pagedb");
const { getUser } = require("../../database/userdb");

describe("Page database interfaces", () => {
  let user;
  let book;
  let page;

  before(async () => {
    user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });

    book = new Book({ title: faker.random.words(5) });
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
    let userWithNewPage;

    try {
      userWithNewPage = await createPage({
        userId: user._id,
        bookId: book._id,
        number: 3,
      });

      expect(userWithNewPage).to.be.an.instanceof(User);
    } catch (error) {
      throw new Error(error);
    } finally {
      const savedUser = await getUser(user._id);

      const bookWithNewPage = savedUser.books.find((aBook) =>
        aBook._id.equals(book._id)
      );
      const newPage = bookWithNewPage.pages.find((aPage) => aPage.number === 3);

      expect(newPage.number).to.equal(3);
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
      expect(userWithEditedPage).to.be.an.instanceof(User);
    } catch (error) {
      throw new Error(error);
    } finally {
      const savedUser = await getUser(user._id);
      const editedPage = savedUser.books.id(book._id).pages.id(page._id);

      expect(editedPage.title).to.equal(newTitle);
    }
  });

  it("should delete a given page in the database", async () => {
    let userWithDeletedPage;

    try {
      userWithDeletedPage = await deletePage({
        userId: user._id,
        bookId: book._id,
        pageId: page._id,
      });
      expect(userWithDeletedPage).to.be.an.instanceof(User);
    } catch (error) {
      throw new Error(error);
    } finally {
      const savedUser = await getUser(user._id);
      const deletedPage = savedUser.books.id(book._id).pages.id(page._id);

      expect(deletedPage).to.be.undefined;
    }
  });
});
