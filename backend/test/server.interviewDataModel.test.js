const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("node:http");

// HTTP-level integration tests for the normalized questions/answers tables written by
// finishInterview (see interview.service.js and migrations/005_create_questions.sql,
// migrations/006_create_answers.sql). Requires a reachable PostgreSQL instance
// (DATABASE_URL from backend/.env), same convention as the other server.*.test.js files.

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
    questionCount: 2,
    ...overrides,
  };
}

test("finishing an interview persists a normalized row per answered question, in order", async () => {
  const created = await post("/api/interviews/start", startPayload());
  const id = created.body.id;

  const answers = [
    {
      question: "What is an index?",
      answer: "Speeds up lookups.",
      topic: "databases",
      difficulty: "easy",
      score: 80,
      correctnessScore: 85,
      relevanceScore: 90,
      depthScore: 70,
      clarityScore: 80,
      strengths: ["Clear definition"],
      mistakes: [],
      missingPoints: ["Write-cost tradeoff"],
      feedback: "Good, but missing the tradeoff.",
      improvedAnswer: "An index speeds up reads at the cost of slower writes.",
      answerLevel: "partial",
    },
    {
      question: "What is middleware?",
      answer: "Code that runs between request and response.",
      topic: "express",
      difficulty: "medium",
      score: 95,
      correctnessScore: 95,
      relevanceScore: 95,
      depthScore: 90,
      clarityScore: 95,
      strengths: ["Accurate", "Concise"],
      mistakes: [],
      missingPoints: [],
      feedback: "Excellent.",
      improvedAnswer: "",
      answerLevel: "strong",
    },
  ];

  const finished = await patch(`/api/interviews/${id}/finish`, { score: 175, maxScore: 200, answers });
  assert.equal(finished.status, 200);

  const questionsResult = await db.query(
    "SELECT position, topic, question, difficulty FROM questions WHERE interview_id = $1 ORDER BY position",
    [id],
  );
  assert.equal(questionsResult.rows.length, 2);
  assert.equal(questionsResult.rows[0].position, 0);
  assert.equal(questionsResult.rows[0].question, "What is an index?");
  assert.equal(questionsResult.rows[0].difficulty, "easy");
  assert.equal(questionsResult.rows[1].position, 1);
  assert.equal(questionsResult.rows[1].question, "What is middleware?");

  const answersResult = await db.query(
    `
    SELECT a.answer_text, a.score, a.answer_level, a.strengths, a.missing_points
    FROM answers a
    JOIN questions q ON q.id = a.question_id
    WHERE q.interview_id = $1
    ORDER BY q.position
    `,
    [id],
  );
  assert.equal(answersResult.rows.length, 2);
  assert.equal(answersResult.rows[0].answer_text, "Speeds up lookups.");
  assert.equal(answersResult.rows[0].score, 80);
  assert.equal(answersResult.rows[0].answer_level, "partial");
  assert.deepEqual(answersResult.rows[0].missing_points, ["Write-cost tradeoff"]);
  assert.equal(answersResult.rows[1].score, 95);
});

test("an unanswered question slot (null, from a sparse array) is not persisted", async () => {
  const created = await post("/api/interviews/start", startPayload());
  const id = created.body.id;

  const answers = [
    null, // question 0 was never answered (e.g. the timer ran out)
    {
      question: "What is a closure?",
      answer: "A function bundled with its lexical scope.",
      topic: "javascript",
      difficulty: "medium",
      score: 90,
      answerLevel: "strong",
      strengths: [],
      mistakes: [],
      missingPoints: [],
      feedback: "Good.",
      improvedAnswer: "",
    },
  ];

  const finished = await patch(`/api/interviews/${id}/finish`, { score: 90, maxScore: 200, answers });
  assert.equal(finished.status, 200);

  const questionsResult = await db.query("SELECT question FROM questions WHERE interview_id = $1", [id]);
  assert.equal(questionsResult.rows.length, 1);
  assert.equal(questionsResult.rows[0].question, "What is a closure?");
});

test("initDatabase (the migration runner) can run multiple times without error", async () => {
  await assert.doesNotReject(() => initDatabase());
});
