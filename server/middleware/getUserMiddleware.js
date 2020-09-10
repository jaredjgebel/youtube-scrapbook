/* eslint-disable consistent-return */
const User = require("../models/user");

const getUserMiddleware = async function runUserMiddleware(req, res, next) {
  let user;

  try {
    user = await User.findOne({ authId: req.user.sub }).exec();
    if (!user) {
      return res
        .status(404)
        .json({ message: "Cannot find user with given id" });
    }
  } catch (err) {
    return res.status(500).json("Internal database error");
  } finally {
    req.databaseUser = user;
    next();
  }
};

module.exports = getUserMiddleware;
