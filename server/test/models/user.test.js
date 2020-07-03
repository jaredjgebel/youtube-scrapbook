const expect = require("chai").expect;
const faker = require("faker");
const User = require("../../models/user");

describe("User model", () => {
  it("should require first name on creation", async () => {
    const noFirstName = new User({
      lastName: faker.name.lastName(),
    });

    let userDoc;

    try {
      userDoc = await noFirstName.save();
    } catch (err) {
      expect(err._message).to.equal("User validation failed");
    }

    expect(userDoc).to.be.undefined;
  });

  it("should require last name on creation", async () => {
    const noLastName = new User({
      firstName: faker.name.firstName(),
    });

    let userDoc;

    try {
      userDoc = await noLastName.save();
    } catch (err) {
      expect(err._message).to.equal("User validation failed");
    }

    expect(userDoc).to.be.undefined;
  });

  it("should have one empty book upon creation", () => {
    const user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });

    expect(user.books.length).to.equal(1);
    expect(user.books[0].title).to.equal("");
  });
});
