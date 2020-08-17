const User = require("../models/user");

async function getUser(id) {
  try {
    const response = await User.findById(id).exec();
    return response;
  } catch (error) {
    return error;
  }
}

async function createUser({ firstName, lastName, email }) {
  try {
    return await User.create({ firstName, lastName, email });
  } catch (error) {
    return error;
  }
}

async function editUser({ id, firstName, lastName, email }) {
  try {
    return await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
      { new: true }
    );
  } catch (error) {
    return error;
  }
}

async function deleteUser(id) {
  try {
    return await User.findOneAndDelete({ _id: id });
  } catch (error) {
    return error;
  }
}

module.exports = { getUser, createUser, editUser, deleteUser };
