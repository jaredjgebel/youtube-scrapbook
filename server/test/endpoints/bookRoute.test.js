require("../dbHelper");
const request = require("supertest");
const faker = require("faker");
const { expect } = require("chai");
const app = require("../../app");
const User = require("../../models/user");
const { createUser } = require("../../database/userdb");
const { createBook } = require("../../database/bookdb");
const createRandomUserData = require("../factoryHelper");

const apiPrefix = "/api/v1";

let user;
let userWithBook;
let book;

before(async () => {
  const userInfo = createRandomUserData();

  user = await createUser(userInfo);

  if (!(user instanceof User)) {
    throw new Error(`${user}`);
  }

  userWithBook = await createBook({
    userId: user.id,
    title: faker.lorem.words(5),
  });

  if (!(userWithBook instanceof User)) {
    throw new Error(`${userWithBook}`);
  }

  // eslint-disable-next-line prefer-destructuring
  book = userWithBook.books[0];
});

describe("GET /books", () => {
  it("responds with information for a given book", (done) => {
    request(app)
      .get(`${apiPrefix}/users/${user.id}/books/${book.id}`)
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.book.title).to.equal(book.title);
      })
      .end(done);
  });
});

describe("POST /books", () => {
  const newBookTitle = faker.lorem.words(5);

  it("responds with a list of books for given user, including new book", (done) => {
    request(app)
      .post(`${apiPrefix}/users/${user.id}/books`)
      .send({ title: newBookTitle })
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.books[1].title).to.equal(newBookTitle);
      })
      .end(done);
  });
});

describe("PATCH /books", () => {
  const patchBookTitle = faker.lorem.words(5);

  it("responds with books for given user, including edited book", (done) => {
    request(app)
      .patch(`${apiPrefix}/users/${user.id}/books/${book.id}`)
      .send({ title: patchBookTitle })
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.books[0].title).to.equal(patchBookTitle);
      })
      .end(done);
  });
});

describe("DELETE /books", () => {
  it("deletes given book", (done) => {
    request(app)
      .delete(`${apiPrefix}/users/${user.id}/books/${book.id}`)
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.user.books.find((aBook) => aBook.id === book.id))
          .to.be.undefined;
      })
      .end(done);
  });
});
