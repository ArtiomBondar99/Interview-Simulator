const { AppError } = require("../utils/errors");

// Express recognizes this as error-handling middleware specifically because it takes 4 arguments.
function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(error);

  // AppError (see utils/errors.js) is how every intentional error in this codebase is now
  // thrown. Its `code` and `message` are always safe to send to the client. We check
  // `instanceof AppError` specifically (not just "does it have a .code") because plain
  // database errors from `pg` also carry a `.code` (a Postgres SQLSTATE) — treating those as
  // AppError would leak raw database internals to the client.
  if (error instanceof AppError) {
    const body = { code: error.code, message: error.message };
    if (error.details) {
      body.details = error.details;
    }
    res.status(error.statusCode).json({ error: body });
    return;
  }

  // A malformed JSON request body is caught by express.json() itself, before our own
  // validation even runs. It's a client mistake, not a server failure, so it gets its own
  // clean 400 instead of falling into the generic 500 below.
  if (error.type === "entity.parse.failed") {
    res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Request body is not valid JSON." } });
    return;
  }

  // Anything else (a raw database error, a network failure, a programming bug) is unexpected —
  // never forward its message or stack to the client, only the console.error(error) above,
  // which is for the server operator.
  res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "The server could not complete the request." } });
}

module.exports = errorHandler;
