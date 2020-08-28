const validateObjectId = require("../database/helpers/validateObjectId");

const isValidObjectId = async function runValidationMiddleware(req, res, next) {
  const { id, bookId, pageId, videoId } = req.params;

  if (id && !validateObjectId(id)) {
    return res.status(400).json({ error: `"${id}" is not a valid ObjectID` });
  }

  if (bookId && !validateObjectId(bookId)) {
    return res
      .status(400)
      .json({ error: `"${bookId}" is not a valid ObjectID` });
  }

  if (pageId && !validateObjectId(pageId)) {
    return res
      .status(400)
      .json({ error: `"${pageId}" is not a valid ObjectID` });
  }

  if (videoId && !validateObjectId(videoId)) {
    return res
      .status(400)
      .json({ error: `"${videoId}" is not a valid ObjectID` });
  }

  return next();
};

module.exports = isValidObjectId;
