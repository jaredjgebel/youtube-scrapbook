const express = require("express");
const router = express.Router();
const { getUser } = require("../database/userdb");
const getUserMiddleware = require("../middleware/getUserMiddleware");

router.get("/:id", getUserMiddleware, async function (req, res, next) {
  console.log("req.user", req.user);
  return res.status(200).json("jlkj");
});

module.exports = router;
