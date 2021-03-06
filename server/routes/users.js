const express = require("express");

const router = express.Router();
const { createUser, editUser, deleteUser } = require("../database/userdb");
const getUserMiddleware = require("../middleware/getUserMiddleware");
const isValidObjectId = require("../middleware/idValidationMiddleware");

router.get("/", getUserMiddleware, function getUserRequest(req, res) {
  return res.status(200).json({ user: req.databaseUser });
});

router.post("/", async function postUserRequest(req, res, next) {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    authId: req.body.authId,
  };

  try {
    const userPostResponse = await createUser(user);

    if (userPostResponse instanceof Error) {
      return next(userPostResponse);
    }

    return res.status(201).json({ user: userPostResponse });
  } catch (error) {
    return next(error);
  }
});

router.patch(
  "/:id",
  isValidObjectId,
  getUserMiddleware,
  async function patchUserRequest(req, res, next) {
    const editedUser = {
      id: req.databaseUser.id,
      firstName: req.body.firstName || req.databaseUser.firstName,
      lastName: req.body.lastName || req.databaseUser.lastName,
      email: req.body.email || req.databaseUser.email,
    };

    try {
      const userPatchResponse = await editUser(editedUser);

      if (userPatchResponse instanceof Error) {
        return next(userPatchResponse);
      }

      return res.status(200).json({ user: userPatchResponse });
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/:id",
  isValidObjectId,
  getUserMiddleware,
  async function deleteUserRequest(req, res, next) {
    try {
      const userDeleteResponse = await deleteUser(req.databaseUser.id);

      if (userDeleteResponse instanceof Error) {
        return next(userDeleteResponse);
      }

      return res.status(200).json({ user: userDeleteResponse });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
