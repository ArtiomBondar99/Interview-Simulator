// A small, uniform way to throw HTTP-aware errors with a stable machine-readable `code`.
// `message` on an AppError is always safe to send to the client (never a raw upstream/DB error).
// `options.cause` is logged server-side only (see errorHandler.js's console.error).
// `options.details` (e.g. per-field validation issues) is safe to send to the client too.
class AppError extends Error {
  constructor(code, message, statusCode, options = {}) {
    super(message, options.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    if (options.details !== undefined) {
      this.details = options.details;
    }
  }
}

module.exports = { AppError };
