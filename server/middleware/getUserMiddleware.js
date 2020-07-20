const { getUser } = require("../database/userdb");

const getUserMiddleware = async (req, res, next) => {
  let user;

  try {
    user = await getUser(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Cannot find user with given id" });
    }

    // forces user model to be evaluated
    // unsure why necessary
    user = JSON.parse(JSON.stringify(user));
  } catch (err) {
    return res.status(500).json("Internal database error");
  }

  user.id = user._id;
  req.user = user;
  next();
};

module.exports = getUserMiddleware;
