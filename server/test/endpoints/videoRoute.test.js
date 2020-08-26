/* eslint-disable prefer-destructuring */

require("../dbHelper");
const request = require("supertest");
const faker = require("faker");
const { expect } = require("chai");
const app = require("../../app");
const { createUser } = require("../../database/userdb");
const { createBook } = require("../../database/bookdb");
const { createPage } = require("../../database/pagedb");
const { createVideo } = require("../../database/videodb");
const createRandomUserData = require("../factoryHelper");

const apiPrefix = "/api/v1";

let user;
let userWithBook;
let book;
let userWithPage;
let page;
let userWithVideo;
let video;

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
    throw new Error(`${userWithBook}`);
  }

  book = userWithBook.books[0];

  userWithPage = await createPage({
    userId: user.id,
    bookId: book.id,
    number: 1,
  });

  if (userWithPage instanceof Error) {
    throw new Error(`${userWithPage}`);
  }

  page = userWithPage.books[0].pages[0];

  userWithVideo = await createVideo({
    userId: user.id,
    bookId: book.id,
    pageId: page.id,
    link: "youtube.com?v=sdflkjweflkj",
    notes: faker.lorem.sentence(14, 18),
  });

  video = userWithVideo.books[0].pages[0].videos[0];
});

describe("GET /videos", () => {
  it("retrieves data for a given video", (done) => {
    request(app)
      .get(
        `${apiPrefix}/users/${user.id}/books/${book.id}/pages/${page.id}/videos/${video.id}`
      )
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.video.link).to.equal(video.link);
      })
      .end(done);
  });
});

describe("POST /videos", () => {
  const newVideoInfo = {
    link: "youtube.com/differenty-link",
    notes: faker.lorem.sentence(14, 18),
  };

  it("responds with a list of videos for given page, including new video", (done) => {
    request(app)
      .post(
        `${apiPrefix}/users/${user.id}/books/${book.id}/pages/${page.id}/videos`
      )
      .send(newVideoInfo)
      .expect((response) => {
        expect(response.status).to.equal(201);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.videos[1].link).to.equal(newVideoInfo.link);
        expect(response.body.videos[1].notes).to.equal(newVideoInfo.notes);
      })
      .end(done);
  });
});

describe("PATCH /videos", () => {
  const patchVideoInfo = {
    link: "youtube.com/another-different-video",
    notes: faker.lorem.sentence(14, 18),
  };

  it("responds with a list of videos for given page, including edited video", (done) => {
    request(app)
      .patch(
        `${apiPrefix}/users/${user.id}/books/${book.id}/pages/${page.id}/videos/${video.id}`
      )
      .send(patchVideoInfo)
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.videos[0].link).to.equal(patchVideoInfo.link);
        expect(response.body.videos[0].notes).to.equal(patchVideoInfo.notes);
      })
      .end(done);
  });
});

describe("DELETE /videos", () => {
  it("responds with a list of videos for given page, without given video", (done) => {
    request(app)
      .delete(
        `${apiPrefix}/users/${user.id}/books/${book.id}/pages/${page.id}/videos/${video.id}`
      )
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(
          response.body.videos.find((aVideo) => aVideo.link === video.link)
        ).to.be.undefined;
      })
      .end(done);
  });
});
