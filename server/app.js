/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const cors = require("cors");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const pagesRouter = require("./routes/pages");
const videosRouter = require("./routes/videos");
const errorHelper = require("./middleware/errorHelper");

const app = express();
const port = process.env.API_PORT || 3000;
const host = "localhost";

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
  }),
  audience: `${process.env.AUTH0_AUDIENCE}`,
  issuer: `${process.env.AUTH0_ISSUER}`,
  algorithms: ["RS256"],
});

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.set("useCreateIndex", true);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(jwtCheck);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/users", booksRouter);
app.use("/api/v1/users", pagesRouter);
app.use("/api/v1/users", videosRouter);

app.use(errorHelper);

const db = mongoose.connection;
const uri =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function onDatabaseConnectionSuccess() {
  console.log("Database has been successfully connected.");
});

let args;
// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}\n`);
});

// If file is being run directly, start the server
if (require.main === module) {
  // eslint-disable-next-line prefer-spread
  app.listen.apply(app, args);
}

module.exports = app;
