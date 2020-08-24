const faker = require("faker");

const createRandomUserData = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  };
};

module.exports = createRandomUserData;
