const HttpError = require("../types/httpError");
const errorHandler = function (err, req, res, next) {
  console.error(err);
  if (err instanceof HttpError) {
    res.status(err.statusCode).send(err.message ?? "Server error");
  } else {
    res.status(500).send("Server error");
  }
};

module.exports = errorHandler;
