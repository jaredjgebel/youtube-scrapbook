const User = require("../models/user");

async function getUser(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

async function createUser({ firstName, lastName, email }) {
  try {
    return await User.create({ firstName, lastName, email });
  } catch (err) {
    console.log(err._message);
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
    console.log(err._message);
  }
}

async function deleteUser(id) {
  try {
    return await User.findOneAndDelete({ _id: id });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getUser, createUser, editUser, deleteUser };
