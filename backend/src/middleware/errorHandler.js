// Express recognizes this as error-handling middleware specifically because it takes 4 arguments.
function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(error);

  const statusCode = error.statusCode || 500;

  // AppError (see utils/errors.js) always carries a stable `code` and a message that's already
  // safe to show the client. Everything else (validation checks, unexpected errors) keeps the
  // older flat shape until the rest of the API is migrated to AppError too.
  if (error.code) {
    res.status(statusCode).json({ error: { code: error.code, message: error.message } });
    return;
  }

  const message = error.statusCode ? error.message : "The server could not complete the request.";
  res.status(statusCode).json({ error: message });
}

module.exports = errorHandler;
