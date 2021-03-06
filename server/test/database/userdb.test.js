require("../dbHelper");
const { expect } = require("chai");
const faker = require("faker");
const User = require("../../models/user");
const {
  getUser,
  createUser,
  editUser,
  deleteUser,
} = require("../../database/userdb");

describe("User database interface", async function () {
  let userDetails;
  let originalUser;

  before(async function () {
    userDetails = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    };

    originalUser = new User(userDetails);

    await originalUser.save();
  });

  it("should retrieve user data based on a given id", async function () {
    const user = await getUser(originalUser.id);

    expect(user.firstName).to.equal(userDetails.firstName);
    expect(user.lastName).to.equal(userDetails.lastName);
    expect(user.email).to.equal(userDetails.email);
  });

  it("should throw an error if an incorrect ID is passed", async function () {
    try {
      const user = await getUser("NOT_A_VALID_ID");
      return user; // shouldn't run
    } catch (err) {
      expect(err).to.haveOwnProperty("message");
      expect(err).to.haveOwnProperty("stack");
    }
  });

  it("should create a new user with the given data", async function () {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();

    const user = await createUser({ firstName, lastName, email });

    expect(user.firstName).to.equal(firstName);
    expect(user.lastName).to.equal(lastName);
    expect(user.email).to.equal(email);
  });

  it("should update an existing user", async function () {
    const newEmail = faker.internet.email();

    const updatedUser = await editUser({
      id: originalUser.id,
      firstName: originalUser.firstName,
      lastName: originalUser.lastName,
      email: newEmail,
    });

    expect(updatedUser.id).to.equal(originalUser.id);
    expect(updatedUser.email).to.equal(newEmail);
  });

  it("should delete a user with the given id", async function () {
    const response = await deleteUser(originalUser.id);

    expect(response.id).to.equal(originalUser.id);
  });
});
