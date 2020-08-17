const { expect } = require("chai");
const faker = require("faker");

const User = require("../../models/user");
const Book = require("../../models/book");
const Page = require("../../models/page");
const Video = require("../../models/video");

describe("Video model", function () {
  let user;
  let book;
  let page;
  let video;

  before(async function () {
    user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });

    book = new Book({
      title: faker.lorem.words(5),
    });

    page = new Page({
      number: faker.random.number({ min: 1, max: 100 }),
    });

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
});
