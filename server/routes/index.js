const express = require("express");
const router = express.Router();
const { getUser } = require("../database/userdb");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.send("placeholder");
});

module.exports = router;
