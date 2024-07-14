class HttpError extends Error {
  statusCode;
  constructor(props, statusCode) {
    super(props);
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;
