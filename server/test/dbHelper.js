const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/../.env") });

const mongoose = require("mongoose");

before(function (done) {
  mongoose.connect(process.env.MONGODB_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection
    .once("open", async function () {
      console.log("Test connection opened");

      await mongoose.connection.createCollection("users");
      done();
    })
    .on("error", function () {
      console.warn("Database connection error: ", error);
      done();
    });
});

after(function (done) {
  mongoose.connection.dropCollection("users", function usersDropped(err) {
    if (err) console.error(err);
    console.log("Users collection dropped");

    mongoose.connection.close(function (error) {
      if (error) console.error(error);
      console.log("Database connection closed.");
      done();
    });
  });
});
