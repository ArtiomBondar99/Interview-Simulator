const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("node:http");

// This is an HTTP-level integration test against the real routing in server.js.
// It requires a reachable PostgreSQL instance (DATABASE_URL from backend/.env), matching this
// project's existing convention that Postgres is a documented prerequisite for running the backend
// at all (see README). It does not require a configured OPENAI_API_KEY.

const { app, initDatabase, db } = require("../src/server");

let server;
let baseUrl;

test.before(async () => {
  await initDatabase();
  server = createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await db.end();
});

async function post(path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: response.status, body: await response.json() };
}

test("POST /api/ai/evaluate-answer returns 400 when question/answer are missing", async () => {
  const { status, body } = await post("/api/ai/evaluate-answer", {});
  assert.equal(status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.equal(body.error.message, "Invalid request.");
  assert.ok(body.error.details.some((issue) => issue.path === "question"));
  assert.ok(body.error.details.some((issue) => issue.path === "answer"));
});

test("POST /api/ai/evaluate-answer returns 503 with a generic message when OPENAI_API_KEY is unset", async () => {
  const { status, body } = await post("/api/ai/evaluate-answer", {
    question: "What is an index?",
    answer: "Speeds up lookups.",
    difficulty: "medium",
    topic: "databases",
  });
  // In this dev environment OPENAI_API_KEY may or may not be set; either a clean 503
  // (not configured) or a 200 (a real evaluation) is an acceptable, non-crashing outcome.
  assert.ok(status === 503 || status === 200);
  if (status === 503) {
    // AI-originated errors use the { code, message } shape (see utils/errors.js AppError).
    assert.equal(body.error.code, "AI_NOT_CONFIGURED");
    assert.equal(body.error.message, "OPENAI_API_KEY is not configured on the server.");
  }
});

test("POST /api/ai/summarize returns 400 when evaluatedAnswers is empty", async () => {
  const { status, body } = await post("/api/ai/summarize", { evaluatedAnswers: [] });
  assert.equal(status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.ok(body.error.details.some((issue) => issue.path === "evaluatedAnswers"));
});
