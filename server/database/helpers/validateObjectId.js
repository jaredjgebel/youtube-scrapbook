// code snippet from
// https://github.com/Automattic/mongoose/issues/1959#issuecomment-491677222
const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const validateObjectId = (id) =>
  ObjectId.isValid(id) && new ObjectId(id).toString() === id;

module.exports = validateObjectId;
