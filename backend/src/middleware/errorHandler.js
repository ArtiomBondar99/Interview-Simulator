// Express recognizes this as error-handling middleware specifically because it takes 4 arguments.
function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(error);

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "The server could not complete the request.";

  res.status(statusCode).json({ error: message });
}

module.exports = errorHandler;
