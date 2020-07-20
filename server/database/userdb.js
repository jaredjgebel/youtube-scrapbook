const User = require("../models/user");

async function getUser(id) {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (err) {
    return err;
  }
}

async function createUser({ firstName, lastName, email }) {
  try {
    return await User.create({ firstName, lastName, email });
  } catch (err) {
    return err;
  }
}

async function editUser({ id, firstName, lastName, email }) {
  try {
    return await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
      { new: true }
    );
  } catch (err) {
    return err;
  }
}

async function deleteUser(id) {
  try {
    return await User.findOneAndDelete({ _id: id });
  } catch (err) {
    return err;
  }
}

module.exports = { getUser, createUser, editUser, deleteUser };
