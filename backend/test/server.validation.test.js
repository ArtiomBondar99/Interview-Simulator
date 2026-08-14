const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("node:http");

// HTTP-level integration tests for the Zod validation middleware (validate.js) wired into
// interview.routes.js / ai.routes.js, and for the consistent { error: { code, message } }
// shape produced by errorHandler.js for every kind of failure.
// Requires a reachable PostgreSQL instance (DATABASE_URL from backend/.env), same convention
// as the other server.*.test.js files.

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

async function postRaw(path, rawBody) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: rawBody,
  });
  return { status: response.status, body: await response.json() };
}

// candidateName and userProfile are required by StartInterviewSchema — see the comment in
// server.interviewRoutes.test.js's own startPayload() for why.
function startPayload(overrides = {}) {
  return {
    candidateName: "Test Candidate",
    userProfile: "A few years of backend experience.",
    role: "backend",
    topic: "Backend",
    level: "junior",
    questionCount: 3,
    ...overrides,
  };
}

test("POST /api/interviews/start rejects an invalid level with VALIDATION_ERROR", async () => {
  const { status, body } = await post("/api/interviews/start", startPayload({ level: "expert" }));
  assert.equal(status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.equal(body.error.message, "Invalid request.");
  assert.ok(body.error.details.some((issue) => issue.path === "level"));
});

test("POST /api/interviews/start rejects a missing candidateName with VALIDATION_ERROR", async () => {
  const payload = startPayload();
  delete payload.candidateName;

  const { status, body } = await post("/api/interviews/start", payload);
  assert.equal(status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.ok(body.error.details.some((issue) => issue.path === "candidateName"));
});

test("POST /api/interviews/start rejects questionCount outside 1-20", async () => {
  const { status, body } = await post("/api/interviews/start", startPayload({ questionCount: 50 }));
  assert.equal(status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
});

test("POST /api/interviews/start coerces a numeric-looking string questionCount", async () => {
  const { status, body } = await post("/api/interviews/start", startPayload({ questionCount: "5" }));
  assert.equal(status, 201);
  assert.ok(body.id);
});

test("POST /api/ai/questions rejects questionCount outside 1-20 with VALIDATION_ERROR", async () => {
  const { status, body } = await post("/api/ai/questions", { questionCount: 0 });
  assert.equal(status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
});

test("DELETE /api/interviews rejects a missing/incorrect confirm token with VALIDATION_ERROR", async () => {
  const response = await fetch(`${baseUrl}/api/interviews`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ confirm: "please" }),
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
});

test("POST /api/ai/evaluate-answer coerces a numeric-looking string consecutiveFollowUps", async () => {
  const { status } = await post("/api/ai/evaluate-answer", {
    question: "What is an index?",
    answer: "Speeds up lookups.",
    consecutiveFollowUps: "1",
  });
  // No OPENAI_API_KEY is configured in this dev environment (same as every other AI test in
  // this suite) -- what matters here is that validation accepted the coerced value (not a 400),
  // regardless of whether the AI call itself then succeeds or cleanly fails as unconfigured.
  assert.ok(status === 503 || status === 200);
});

test("POST /api/ai/evaluate-answer rejects a negative consecutiveFollowUps with VALIDATION_ERROR", async () => {
  const { status, body } = await post("/api/ai/evaluate-answer", {
    question: "What is an index?",
    answer: "Speeds up lookups.",
    consecutiveFollowUps: -1,
  });
  assert.equal(status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
});

test("a malformed JSON request body returns a clean VALIDATION_ERROR, not a raw parser message", async () => {
  const { status, body } = await postRaw("/api/interviews/start", "{ this is not json");
  assert.equal(status, 400);
  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.equal(body.error.message, "Request body is not valid JSON.");
});
