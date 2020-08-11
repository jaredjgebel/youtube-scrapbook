const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/../.env") });

const mongoose = require("mongoose");

before((done) => {
  mongoose.connect(process.env.MONGODB_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection
    .once("open", () => {
      console.log("Test connection opened");
      done();
    })
    .on("error", () => {
      console.warn("Database connection error: ", error);
      done();
    });
});

after((done) => {
  mongoose.connection.close((err) => {
    if (err) console.error(err);
    console.log("Database connection closed.");
    done();
  });
});
