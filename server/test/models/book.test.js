const expect = require("chai").expect;
const faker = require("faker");
const Book = require("../../models/book");
const Page = require("../../models/page");

describe("Book model", () => {
  it("should have a title of an empty string on creation", () => {
    const book = new Book({});
    expect(book.title).to.equal("");
  });

  it("should have one empty page by default", () => {
    const book = new Book({});
    expect(book.pages.length).to.equal(1);
    expect(book.pages[0].videos.length).to.equal(0);
  });

  it("should limit the number of pages for each book to 100", async () => {
    const book = new Book({
      title: "Too many pages",
      pages: new Array(150).fill(new Page()),
    });

    try {
      const saved = await book.save();
    } catch (err) {
      expect(err._message).to.equal("Book validation failed");
    }
  });
});
