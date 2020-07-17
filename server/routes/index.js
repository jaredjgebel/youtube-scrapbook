const express = require("express");
const router = express.Router();
const { createUser, editUser } = require("../database/userdb");
const getUserMiddleware = require("../middleware/getUserMiddleware");

router.get("/users/:id", getUserMiddleware, function (req, res) {
  return res.status(200).json({ user: req.user });
});

router.post("/users", async function (req, res) {
  const user = {
    firstName: req.query.first,
    lastName: req.query.last,
    email: req.query.email,
  };

  try {
    const userPostResponse = await createUser(user);

    if (userPostResponse.errors) {
      return res.status(400).json({ error: userPostResponse.errors });
    }

    return res.status(200).json({ user: userPostResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/users/:id", getUserMiddleware, async function (req, res) {
  const editedUser = {
    id: req.user.id,
    firstName: req.query.first || req.user.firstName,
    lastName: req.query.last || req.user.lastName,
    email: req.query.email || req.user.email,
  };

  try {
    const userPatchResponse = await editUser(editedUser);

    if (userPatchResponse.errors) {
      return res.status(400).json({ error: userPatchResponse.errors });
    }

    return res.status(200).json({ user: userPatchResponse });
  } catch (error) {
    const response = res.status(500).json({ error: error.message });

    return response;
  }
});

module.exports = router;
