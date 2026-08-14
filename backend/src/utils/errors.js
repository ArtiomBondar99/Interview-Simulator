// A small, uniform way to throw HTTP-aware errors with a stable machine-readable `code`.
// `message` on an AppError is always safe to send to the client (never a raw upstream/DB error).
class AppError extends Error {
  constructor(code, message, statusCode, options) {
    super(message, options);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

module.exports = { AppError };
