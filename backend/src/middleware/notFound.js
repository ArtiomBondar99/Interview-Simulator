function notFound(req, res) {
  res.status(404).json({ error: { code: "ROUTE_NOT_FOUND", message: "API route not found." } });
}

module.exports = notFound;
