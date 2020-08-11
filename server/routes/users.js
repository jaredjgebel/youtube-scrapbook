const express = require("express");

const router = express.Router();
const { createUser, editUser, deleteUser } = require("../database/userdb");
const getUserMiddleware = require("../middleware/getUserMiddleware");

router.get("/:id", getUserMiddleware, function (req, res) {
  return res.status(200).json({ user: req.user });
});

router.post("/", async function (req, res) {
  const user = {
    firstName: req.query.first,
    lastName: req.query.last,
    email: req.query.email,
  };

  try {
    const userPostResponse = await createUser(user);

    if (userPostResponse.errors) {
      return res.status(400).json({ error: userPostResponse.errors.message });
    }

    return res.status(200).json({ user: userPostResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", getUserMiddleware, async function (req, res) {
  const editedUser = {
    id: req.user.id,
    firstName: req.query.first || req.user.firstName,
    lastName: req.query.last || req.user.lastName,
    email: req.query.email || req.user.email,
  };

  try {
    const userPatchResponse = await editUser(editedUser);

    if (userPatchResponse.errors) {
      return res.status(400).json({ error: userPatchResponse.errors.message });
    }

    return res.status(200).json({ user: userPatchResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", getUserMiddleware, async function (req, res) {
  try {
    const userDeleteResponse = await deleteUser(req.user.id);

    if (userDeleteResponse.errors) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ user: userDeleteResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
