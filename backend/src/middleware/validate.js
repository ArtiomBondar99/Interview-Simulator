const { AppError } = require("../utils/errors");

// Validates req[source] (default "body") against a Zod schema. On success, replaces
// req[source] with the parsed result — so any defaults/coercions/fallbacks the schema
// applies (e.g. trimming, "junior" as a default level) take effect for the controller,
// which can then trust the shape completely instead of re-checking it. On failure, every
// route fails the same way: a single VALIDATION_ERROR with per-field details, instead of
// each controller inventing its own ad hoc 400 response.
function validate(schema, source = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        path: issue.path.join(".") || source,
        message: issue.message,
      }));
      next(new AppError("VALIDATION_ERROR", "Invalid request.", 400, { details }));
      return;
    }

    req[source] = result.data;
    next();
  };
}

module.exports = { validate };
