require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();
const port = process.env.PORT || 3000;
const host = "localhost";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/users", booksRouter);

const db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database has been successfully connected.");
});

let args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}\n`);
});

// If file is being run directly, start the server
if (require.main === module) {
  app.listen.apply(app, args);
}

module.exports = app;
