require("../dbHelper");
const request = require("supertest");
const faker = require("faker");
const { expect } = require("chai");
const app = require("../../app");
const { createUser } = require("../../database/userdb");
const { createBook } = require("../../database/bookdb");
const { createPage } = require("../../database/pagedb");
const createRandomUserData = require("../factoryHelper");

const apiPrefix = "/api/v1";

let user;
let userWithBook;
let book;
let userWithPage;
let page;

before(async () => {
  const userInfo = createRandomUserData();
  user = await createUser(userInfo);

  if (user instanceof Error) {
    throw new Error(`${user}`);
  }

  userWithBook = await createBook({
    userId: user.id,
    title: faker.lorem.words(5),
  });

  if (userWithBook instanceof Error) {
    throw new Error(`${user}`);
  }

  // eslint-disable-next-line prefer-destructuring
  book = userWithBook.books[0];

  userWithPage = await createPage({
    userId: user.id,
    bookId: book.id,
    number: 1,
  });

  // eslint-disable-next-line prefer-destructuring
  page = userWithPage.books[0].pages[0];
});

describe("GET /pages", () => {
  it("retrieves data for a given page", (done) => {
    request(app)
      .get(`${apiPrefix}/users/${user.id}/books/${book.id}/pages/${page.id}`)
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.page.number).to.equal(page.number);
      })
      .end(done);
  });
});

describe("POST /pages", () => {
  const randomNumber = faker.random.number(50);

  it("responds with a list of pages for given book, including new page", (done) => {
    request(app)
      .post(`${apiPrefix}/users/${user.id}/books/${book.id}/pages`)
      .send({ number: randomNumber })
      .expect((response) => {
        expect(response.status).to.equal(201);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.pages[1].number).to.equal(randomNumber);
      })
      .end(done);
  });
});

describe("PATCH /pages", () => {
  const newRandomNumber = faker.random.number(50);

  it("responds with a list of pages for given book, including edited page", (done) => {
    request(app)
      .patch(`${apiPrefix}/users/${user.id}/books/${book.id}/pages/${page.id}`)
      .send({ number: newRandomNumber })
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.pages[0].number).to.equal(newRandomNumber);
      })
      .end(done);
  });
});

describe("DELETE /pages", () => {
  it("responds with a list of pages for given book, without newly deleted book", (done) => {
    request(app)
      .delete(`${apiPrefix}/users/${user.id}/books/${book.id}/pages/${page.id}`)
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.pages.find((aPage) => aPage._id === page.id)).to.be
          .undefined;
      })
      .end(done);
  });
});
