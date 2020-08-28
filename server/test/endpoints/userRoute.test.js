require("../dbHelper");
const request = require("supertest");
const { expect } = require("chai");
const app = require("../../app");
const User = require("../../models/user");
const { createUser } = require("../../database/userdb");
const createRandomUserData = require("../factoryHelper");

const apiPrefix = "/api/v1";

let user;
const userInfo = createRandomUserData();

before(async function () {
  user = await createUser(userInfo);

  if (!(user instanceof User)) {
    throw new Error(`${user}`);
  }
});

describe("GET /users", function getUserTest() {
  it("responds with all user information", function (done) {
    request(app)
      .get(`${apiPrefix}/users/${user.id}`)
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.user.firstName).to.equal(userInfo.firstName);
      })
      .end(done);
  });
});

describe("/POST users", function () {
  const newUserInfo = createRandomUserData();

  it("responds with the created user", (done) => {
    request(app)
      .post(`${apiPrefix}/users`)
      .send(newUserInfo)
      .expect((response) => {
        expect(response.status).to.equal(201);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.user.firstName).to.equal(newUserInfo.firstName);
        expect(response.body.user.email).to.equal(newUserInfo.email);
      })
      .end(done);
  });

  it("responds with status 400 if user has not entered first and last name", async () => {
    const incompleteUserInfo = {
      firstName: "Tina",
      email: "tinag@gmail.com",
    };

    request(app)
      .post(`${apiPrefix}/users`)
      .send(incompleteUserInfo)
      .expect((response) => {
        expect(response.status).to.equal(400);
        expect(response.headers["content-type"]).to.include("json");

        expect(
          Object.keys(response.body.error).find((key) => key === "lastName")
        ).to.exist;
      });
  });
});

describe("/PATCH users", function () {
  const patchUserInfo = createRandomUserData();

  it("responds with the edited user", (done) => {
    request(app)
      .patch(`${apiPrefix}/users/${user.id}`)
      .send(patchUserInfo)
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.user.firstName).to.equal(patchUserInfo.firstName);
        expect(response.body.user.lastName).to.equal(patchUserInfo.lastName);
        expect(response.body.user.email).to.equal(patchUserInfo.email);
      })
      .end(done);
  });
});

describe("/DELETE users", function () {
  it("deletes a given user", (done) => {
    request(app)
      .delete(`${apiPrefix}/users/${user.id}`)
      .expect((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.include("json");

        expect(response.body.user._id).to.equal(user.id);
      })
      .end(done);
  });
});
