require("../dbHelper");
const expect = require("chai").expect;
const faker = require("faker");
const User = require("../../models/user");
const {
  getUser,
  createUser,
  editUser,
  deleteUser,
} = require("../../database/userdb");

const userOneDetails = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
};

let userOne;

before(async () => {
  userOne = new User(userOneDetails);

  await userOne.save();
});

describe("User model database interface", async () => {
  it("should retrieve user data based on a given id", async () => {
    const user = await getUser(userOne.id);

    expect(user.firstName).to.equal(userOneDetails.firstName);
    expect(user.lastName).to.equal(userOneDetails.lastName);
    expect(user.email).to.equal(userOneDetails.email);
  });

  it("should throw an error if an incorrect ID is passed", async () => {
    try {
      const user = await getUser("NOT_A_VALID_ID");
      return user; // shouldn't run
    } catch (err) {
      expect(err).to.haveOwnProperty("message");
      expect(err).to.haveOwnProperty("stack");
    }
  });

  it("should create a new user with the given data", async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();

    const user = await createUser({ firstName, lastName, email });

    expect(user.firstName).to.equal(firstName);
    expect(user.lastName).to.equal(lastName);
    expect(user.email).to.equal(email);
  });

  it("should update an existing user", async () => {
    const newEmail = faker.internet.email();

    const updatedUser = await editUser({
      id: userOne.id,
      firstName: userOne.firstName,
      lastName: userOne.lastName,
      email: newEmail,
    });

    expect(updatedUser.id).to.equal(userOne.id);
    expect(updatedUser.email).to.equal(newEmail);
  });

  it("should delete a user with the given id", async () => {
    const response = await deleteUser(userOne.id);

    expect(response.id).to.equal(userOne.id);
  });
});
