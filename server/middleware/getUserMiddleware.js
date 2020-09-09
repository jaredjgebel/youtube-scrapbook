/* eslint-disable consistent-return */
const { getUser } = require("../database/userdb");

const getUserMiddleware = async function runUserMiddleware(req, res, next) {
  let user;

  try {
    user = await getUser(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Cannot find user with given id" });
    }
  } catch (err) {
    return res.status(500).json("Internal database error");
  }

  req.databaseUser = user;
  next();
};

module.exports = getUserMiddleware;
