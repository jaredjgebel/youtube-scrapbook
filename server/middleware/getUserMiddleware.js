const { getUser } = require("../database/userdb");
const getUserMiddleware = async (req, res, next) => {
  let user;

  try {
    user = await getUser(req.params.id);

    if (!user.id) {
      return res
        .status(404)
        .JSON({ message: "Cannot find user with given id" });
    }
  } catch (err) {
    return res.status(500).JSON({ error: err.message });
  }

  req.user = user;
  next();
};

module.exports = getUserMiddleware;
