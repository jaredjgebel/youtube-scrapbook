/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const cors = require("cors");
const morgan = require("morgan");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const pagesRouter = require("./routes/pages");
const videosRouter = require("./routes/videos");
const errorHelper = require("./middleware/errorHelper");

const app = express();
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 3000;
const host =
  process.env.NODE_ENV === "production"
    ? "youtube-scrapbook.herokuapp.com"
    : "localhost";
const DIST_DIR = path.join(__dirname, "../client/build");

app.use(express.static(DIST_DIR));

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

console.log("**JWTCHECK**", jwtCheck);

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.set("useCreateIndex", true);

const origin =
  process.env.NODE_ENV === "production"
    ? "youtube-scrapbook.herokuapp.com"
    : "localhost";

app.use(
  cors({
    origin,
    credentials: true,
  })
);
app.use(jwtCheck);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1", booksRouter);
app.use("/api/v1", pagesRouter);
app.use("/api/v1", videosRouter);

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

app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
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
