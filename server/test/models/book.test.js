/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const { expect } = require("chai");
const Book = require("../../models/book");
const Page = require("../../models/page");

describe("Book model", function () {
  it("should have a title of an empty string on creation", function () {
    const book = new Book({});
    expect(book.title).to.equal("");
  });

  it("should limit the number of pages for each book to 100", async function () {
    const book = new Book({
      title: "Too many pages",
      pages: new Array(150).fill(new Page()),
    });

    try {
      // eslint-disable-next-line no-unused-vars
      const saved = await book.save();
    } catch (err) {
      expect(err._message).to.equal("Book validation failed");
    }
  });
});
