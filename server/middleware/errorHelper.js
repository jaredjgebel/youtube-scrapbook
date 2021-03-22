// eslint-disable-next-line no-unused-vars
function errorHelper(err, req, res, next) {
  // if header was already set when error was thrown
  if (res.headersSent) {
    return next();
  }

  if (err._message) {
    return res.status(400).json({ error: err.errors });
  }

  console.log(req);
  return res.status(500).json({
    status: 500,
    statusText: "Internal Server Error",
    message: err.message,
    error: {
      errno: err.errno,
      call: err.syscall,
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    },
  });
}

module.exports = errorHelper;
