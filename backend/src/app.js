const path = require("node:path");
const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const interviewRoutes = require("./routes/interview.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const FRONTEND_DIR = path.join(__dirname, "..", "..", "frontend");

const app = express();

// The original hand-rolled body reader had no size cap at all. A full interview "finish"
// payload (up to 20 questions, each with a rich AI evaluation) can be several hundred KB,
// well past Express's 100kb default, so this needs a generous explicit limit.
app.use(express.json({ limit: "5mb" }));

app.use("/api/ai", aiRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api", notFound);

app.use(express.static(FRONTEND_DIR));
app.use((req, res) => {
  res.status(404).type("text/plain").send("Not found");
});

app.use(errorHandler);

module.exports = app;
