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

async function patch(path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
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

test("finishInterview computes improvementScore from the candidate's previous completed interview for the same role", async () => {
  const candidateId = `race-cand-${Date.now()}`;

  const first = await post("/api/interviews/start", {
    candidateId,
    role: "Backend Developer",
    topic: "Backend",
    level: "junior",
    questionCount: 2,
  });
  const firstFinish = await patch(`/api/interviews/${first.body.id}/finish`, { score: 10, maxScore: 20, answers: [] });
  assert.equal(firstFinish.status, 200);

  const second = await post("/api/interviews/start", {
    candidateId,
    role: "Backend Developer",
    topic: "Backend",
    level: "junior",
    questionCount: 2,
  });
  const secondFinish = await patch(`/api/interviews/${second.body.id}/finish`, { score: 16, maxScore: 20, answers: [] });
  assert.equal(secondFinish.status, 200);

  const fetched = await get(`/api/interviews/${second.body.id}`);
  assert.equal(fetched.body.previousScore, 10);
  assert.equal(fetched.body.improvementScore, 6);
});

test("finishing an already-completed interview returns 409 and does not overwrite its data", async () => {
  const created = await post("/api/interviews/start", { topic: "Backend", level: "junior", questionCount: 2 });
  const id = created.body.id;

  const first = await patch(`/api/interviews/${id}/finish`, { score: 10, maxScore: 20, answers: [] });
  assert.equal(first.status, 200);

  const second = await patch(`/api/interviews/${id}/finish`, { score: 999, maxScore: 999, answers: [] });
  assert.equal(second.status, 409);
  assert.equal(second.body.error, "Interview is already completed.");

  const fetched = await get(`/api/interviews/${id}`);
  assert.equal(fetched.body.score, 10);
});

test("two concurrent finish requests for the same interview apply exactly once", async () => {
  const created = await post("/api/interviews/start", { topic: "Backend", level: "junior", questionCount: 2 });
  const id = created.body.id;

  const [a, b] = await Promise.all([
    patch(`/api/interviews/${id}/finish`, { score: 15, maxScore: 20, answers: [] }),
    patch(`/api/interviews/${id}/finish`, { score: 18, maxScore: 20, answers: [] }),
  ]);

  const statuses = [a.status, b.status].sort();
  assert.deepEqual(statuses, [200, 409]);

  const fetched = await get(`/api/interviews/${id}`);
  assert.ok(fetched.body.score === 15 || fetched.body.score === 18);
});
