const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("node:http");

// HTTP-level integration tests for the interview status state machine
// (in_progress -> completed | abandoned) — see interview.service.js's
// abandonStaleInterviews() and the CHECK constraint added in config/db.js.
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

function startPayload(overrides = {}) {
  return {
    candidateName: "Test Candidate",
    userProfile: "A few years of backend experience.",
    role: "backend",
    topic: "Backend",
    level: "junior",
    questionCount: 3,
    interviewMinutes: 5,
    ...overrides,
  };
}

// There's no API to backdate started_at (it's always NOW() at creation), so simulating a
// stale session for the sweep to detect requires writing to the DB directly, same as the
// other tests in this suite use `db` for setup that the HTTP API itself can't express.
async function backdateInterview(id, minutesAgo) {
  await db.query(`UPDATE interviews SET started_at = NOW() - ($2 * INTERVAL '1 minute') WHERE id = $1`, [id, minutesAgo]);
}

test("a stale in_progress interview is reported as abandoned when fetched", async () => {
  const created = await post("/api/interviews/start", startPayload());
  await backdateInterview(created.body.id, 40); // interviewMinutes(5) + 30min grace = 35min threshold

  const { status, body } = await get(`/api/interviews/${created.body.id}`);
  assert.equal(status, 200);
  assert.equal(body.status, "abandoned");
});

test("a stale in_progress interview shows as abandoned in the history list", async () => {
  const created = await post("/api/interviews/start", startPayload());
  await backdateInterview(created.body.id, 40);

  await get(`/api/interviews/${created.body.id}`); // any read triggers the sweep

  const { body: list } = await get("/api/interviews");
  const entry = list.find((item) => item.id === created.body.id);
  assert.equal(entry.status, "abandoned");
});

test("an interview well within its own time budget is not marked abandoned", async () => {
  const created = await post("/api/interviews/start", startPayload({ interviewMinutes: 60 }));

  const { body } = await get(`/api/interviews/${created.body.id}`);
  assert.equal(body.status, "in_progress");
});

test("finishing an abandoned interview returns 409 INTERVIEW_ABANDONED", async () => {
  const created = await post("/api/interviews/start", startPayload());
  await backdateInterview(created.body.id, 40);
  await get(`/api/interviews/${created.body.id}`); // trigger the sweep before finishing

  const { status, body } = await patch(`/api/interviews/${created.body.id}/finish`, {
    score: 5,
    maxScore: 10,
    answers: [],
  });
  assert.equal(status, 409);
  assert.equal(body.error.code, "INTERVIEW_ABANDONED");
});

test("the status column rejects any value outside in_progress/completed/abandoned", async () => {
  const created = await post("/api/interviews/start", startPayload());

  await assert.rejects(
    () => db.query(`UPDATE interviews SET status = 'bogus' WHERE id = $1`, [created.body.id]),
    (error) => {
      assert.match(error.message, /interviews_status_check/);
      return true;
    },
  );
});
