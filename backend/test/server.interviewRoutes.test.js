const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("node:http");

// HTTP-level integration test against the real routing in src/app.js.
// Requires a reachable PostgreSQL instance (DATABASE_URL from backend/.env), same convention
// as server.evaluateAnswerRoute.test.js.

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

async function get(path) {
  const response = await fetch(`${baseUrl}${path}`);
  return { status: response.status, body: await response.json() };
}

test("GET /api/interviews/:id returns the interview that was just created", async () => {
  const created = await post("/api/interviews/start", {
    topic: "Backend",
    level: "junior",
    questionCount: 3,
  });
  assert.equal(created.status, 201);

  const { status, body } = await get(`/api/interviews/${created.body.id}`);
  assert.equal(status, 200);
  assert.equal(body.id, created.body.id);
  assert.equal(body.topic, "Backend");
  assert.equal(body.status, "in_progress");
  assert.deepEqual(body.answers, []);
});

test("GET /api/interviews/:id returns 404 for an id that does not exist", async () => {
  const { status, body } = await get("/api/interviews/999999999");
  assert.equal(status, 404);
  assert.equal(body.error, "Interview not found.");
});

test("GET /api/interviews/:id returns 404 (API route not found) for a non-numeric id", async () => {
  const { status, body } = await get("/api/interviews/not-a-number");
  assert.equal(status, 404);
  assert.equal(body.error, "API route not found.");
});
