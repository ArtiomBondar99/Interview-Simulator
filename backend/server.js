const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const { join, extname } = require("node:path");
const { Pool } = require("pg");
const ai = require("./ai");

const PORT = Number(process.env.PORT || 3000);
const BACKEND_DIR = __dirname;
const FRONTEND_DIR = join(BACKEND_DIR, "..", "frontend");
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required. See backend/.env.example.");
}

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const db = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

async function initDatabase() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS interviews (
      id BIGSERIAL PRIMARY KEY,
      candidate_name TEXT NOT NULL DEFAULT '',
      candidate_id TEXT NOT NULL DEFAULT '',
      topic TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT '',
      interview_language TEXT NOT NULL DEFAULT 'he',
      level TEXT NOT NULL,
      user_profile TEXT NOT NULL DEFAULT '',
      profile_summary TEXT NOT NULL DEFAULT '',
      question_count INTEGER NOT NULL,
      interview_minutes INTEGER NOT NULL DEFAULT 10,
      score INTEGER NOT NULL DEFAULT 0,
      max_score INTEGER NOT NULL DEFAULT 0,
      previous_score INTEGER DEFAULT NULL,
      improvement_score INTEGER DEFAULT NULL,
      answers_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      overall_feedback TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'in_progress',
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      completed_at TIMESTAMPTZ
    )
  `);

  // CREATE TABLE IF NOT EXISTS above doesn't add columns to a table that already exists
  // from an older version of this schema, so backfill any that are missing.
  await db.query(`
    ALTER TABLE interviews
      ADD COLUMN IF NOT EXISTS candidate_name TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS candidate_id TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS previous_score INTEGER DEFAULT NULL,
      ADD COLUMN IF NOT EXISTS improvement_score INTEGER DEFAULT NULL,
      ADD COLUMN IF NOT EXISTS overall_feedback TEXT DEFAULT ''
  `);
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString("utf8");
  return body ? JSON.parse(body) : {};
}

async function listInterviews() {
  const result = await db.query(`
      SELECT id::text, candidate_name AS "candidateName", candidate_id AS "candidateId",
             topic, role, level, question_count AS "questionCount",
             interview_language AS "interviewLanguage",
             interview_minutes AS "interviewMinutes", score, max_score AS "maxScore",
             previous_score AS "previousScore", improvement_score AS "improvementScore",
             user_profile AS "userProfile", profile_summary AS "profileSummary",
             status, started_at AS "startedAt", completed_at AS "completedAt"
      FROM interviews
      ORDER BY id DESC
      LIMIT 20
  `);

  return result.rows;
}

async function handleApi(request, response, url) {
  if (request.method === "GET" && url.pathname === "/api/ai/status") {
    sendJson(response, 200, { configured: ai.isConfigured(), model: ai.model });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/ai/questions") {
    const body = await readJsonBody(request);
    const questionCount = Number(body.questionCount || 0);

    if (!Number.isInteger(questionCount) || questionCount < 1 || questionCount > 20) {
      sendJson(response, 400, { error: "questionCount must be between 1 and 20." });
      return;
    }

    const result = await ai.generateInterviewQuestions({
      role: String(body.role || "general-tech").slice(0, 100),
      roleLabel: String(body.roleLabel || body.role || "General technical interview").slice(0, 200),
      level: String(body.level || "junior").slice(0, 50),
      language: body.language === "en" ? "en" : "he",
      questionCount,
      userProfile: String(body.userProfile || "").slice(0, 12000),
    });

    sendJson(response, 200, result);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/ai/evaluate") {
    const body = await readJsonBody(request);
    const answers = Array.isArray(body.answers) ? body.answers.slice(0, 20) : [];

    if (!answers.length) {
      sendJson(response, 400, { error: "At least one answer is required." });
      return;
    }

    const result = await ai.evaluateInterview({
      role: String(body.role || "general-tech").slice(0, 100),
      level: String(body.level || "junior").slice(0, 50),
      language: body.language === "en" ? "en" : "he",
      answers,
    });

    sendJson(response, 200, result);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/interviews") {
    sendJson(response, 200, await listInterviews());
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/interviews/start") {
    const body = await readJsonBody(request);
    const candidateName = String(body.candidateName || "");
    const candidateId = String(body.candidateId || "");
    const topic = String(body.topic || "");
    const role = String(body.role || topic);
    const interviewLanguage = String(body.interviewLanguage || "he");
    const level = String(body.level || "");
    const userProfile = String(body.userProfile || "");
    const profileSummary = String(body.profileSummary || "");
    const questionCount = Number(body.questionCount || 0);
    const interviewMinutes = Number(body.interviewMinutes || 10);

    if (!topic || !level || !Number.isInteger(questionCount) || questionCount < 1) {
      sendJson(response, 400, { error: "Missing role, level, or questionCount." });
      return;
    }

    const result = await db.query(
      `
        INSERT INTO interviews (
          candidate_name, candidate_id, topic, role, interview_language, level, user_profile, profile_summary,
          question_count, interview_minutes, max_score
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id::text
      `,
      [
        candidateName,
        candidateId,
        topic,
        role,
        interviewLanguage,
        level,
        userProfile,
        profileSummary,
        questionCount,
        interviewMinutes,
        questionCount * 2,
      ],
    );

    sendJson(response, 201, { id: result.rows[0].id });
    return;
  }

  const finishMatch = url.pathname.match(/^\/api\/interviews\/(\d+)\/finish$/);
  if (request.method === "PATCH" && finishMatch) {
    const id = Number(finishMatch[1]);
    const body = await readJsonBody(request);
    const score = Number(body.score || 0);
    const maxScore = Number(body.maxScore || 0);
    const overallFeedback = String(body.overallFeedback || "");
    const answers = Array.isArray(body.answers) ? body.answers : [];

    // Get the same candidate's most recent other completed interview for the same role,
    // matched by candidate_id (falls back to candidate_name client-side, see frontend/app.js).
    const prevResult = await db.query(
      `
      SELECT score FROM interviews
      WHERE candidate_id = (SELECT candidate_id FROM interviews WHERE id = $1)
        AND role = (SELECT role FROM interviews WHERE id = $1)
        AND status = 'completed'
        AND id != $1
      ORDER BY completed_at DESC
      LIMIT 1
      `,
      [id],
    );
    const previousScore = prevResult.rows.length > 0 ? prevResult.rows[0].score : null;
    const improvementScore = previousScore !== null ? score - previousScore : null;

    const result = await db.query(
      `
      UPDATE interviews
      SET score = $1, max_score = $2, answers_json = $3::jsonb, overall_feedback = $4,
          previous_score = $5, improvement_score = $6,
          status = 'completed', completed_at = NOW()
      WHERE id = $7
      `,
      [score, maxScore, JSON.stringify(answers), overallFeedback, previousScore, improvementScore, id],
    );

    if (result.rowCount === 0) {
      sendJson(response, 404, { error: "Interview not found." });
      return;
    }

    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === "DELETE" && url.pathname === "/api/interviews") {
    await db.query("TRUNCATE TABLE interviews RESTART IDENTITY");
    sendJson(response, 200, { ok: true });
    return;
  }

  sendJson(response, 404, { error: "API route not found." });
}

async function serveStatic(response, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = join(FRONTEND_DIR, requestedPath);

  if (!filePath.startsWith(FRONTEND_DIR)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
    });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);

  try {
    if (url.pathname.startsWith("/api/")) {
      await handleApi(request, response, url);
      return;
    }

    await serveStatic(response, decodeURIComponent(url.pathname));
  } catch (error) {
    console.error(error);
    sendJson(response, error.statusCode || 500, {
      error: error.statusCode ? error.message : "The server could not complete the request.",
    });
  }
}

initDatabase()
  .then(() => {
    const server = createServer(handleRequest).listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log("Connected to PostgreSQL.");
    });

    const shutdown = () => {
      server.close(async () => {
        await db.end();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })
  .catch((error) => {
    console.error("Failed to initialize PostgreSQL:", error.message);
    process.exit(1);
  });
