const { expect } = require("chai");
const faker = require("faker");
const User = require("../../models/user");

describe("User model", function () {
  it("should require first name on creation", async function () {
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

  it("should require last name on creation", async function () {
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
});
