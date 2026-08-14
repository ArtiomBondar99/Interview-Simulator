const { db } = require("../config/db");

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

async function getInterviewById(id) {
  const result = await db.query(
    `
      SELECT id::text, candidate_name AS "candidateName", candidate_id AS "candidateId",
             topic, role, level, question_count AS "questionCount",
             interview_language AS "interviewLanguage",
             interview_minutes AS "interviewMinutes", score, max_score AS "maxScore",
             previous_score AS "previousScore", improvement_score AS "improvementScore",
             user_profile AS "userProfile", profile_summary AS "profileSummary",
             answers_json AS "answers", overall_feedback AS "overallFeedback",
             summary_json AS "summary",
             status, started_at AS "startedAt", completed_at AS "completedAt"
      FROM interviews
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
}

async function createInterview({
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
}) {
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

  return result.rows[0].id;
}

// Finishing an interview reads "the candidate's previous score for this role" and then writes
// the final result — a classic read-then-write sequence, so it has to run as a single atomic
// transaction or two concurrent finishes can interleave and corrupt that derived data.
//
// Two different races are possible here, and each needs its own lock:
//  1. The SAME interview id finished twice at once (e.g. a double-click, or a retried request).
//     `SELECT ... FOR UPDATE` takes a row lock on that specific interview, so the second
//     transaction blocks until the first COMMITs, then sees status = 'completed' and is
//     rejected instead of silently overwriting the first result.
//  2. TWO DIFFERENT interviews for the SAME candidate+role finishing at once. Row-locking one
//     interview does nothing to protect the other row, so both could compute "previous score"
//     from each other's still-uncommitted state. `pg_advisory_xact_lock` takes a lock keyed by
//     candidate+role (not tied to any specific row) that's automatically released at
//     COMMIT/ROLLBACK, serializing "finish" calls for the same candidate+role without needing
//     any locking outside PostgreSQL itself.
async function finishInterview(id, { score, maxScore, overallFeedback, answers, summary }) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const currentResult = await client.query(
      `SELECT candidate_id, role, status FROM interviews WHERE id = $1 FOR UPDATE`,
      [id],
    );

    if (currentResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return { found: false, alreadyCompleted: false };
    }

    const current = currentResult.rows[0];

    if (current.status === "completed") {
      await client.query("ROLLBACK");
      return { found: true, alreadyCompleted: true };
    }

    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [`${current.candidate_id}:${current.role}`]);

    // Get the same candidate's most recent other completed interview for the same role.
    const prevResult = await client.query(
      `
      SELECT score FROM interviews
      WHERE candidate_id = $1 AND role = $2 AND status = 'completed' AND id != $3
      ORDER BY completed_at DESC
      LIMIT 1
      `,
      [current.candidate_id, current.role, id],
    );
    const previousScore = prevResult.rows.length > 0 ? prevResult.rows[0].score : null;
    const improvementScore = previousScore !== null ? score - previousScore : null;

    await client.query(
      `
      UPDATE interviews
      SET score = $1, max_score = $2, answers_json = $3::jsonb, overall_feedback = $4,
          previous_score = $5, improvement_score = $6, summary_json = $7::jsonb,
          status = 'completed', completed_at = NOW()
      WHERE id = $8
      `,
      [score, maxScore, JSON.stringify(answers), overallFeedback, previousScore, improvementScore, JSON.stringify(summary), id],
    );

    await client.query("COMMIT");
    return { found: true, alreadyCompleted: false };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function deleteAllInterviews() {
  await db.query("TRUNCATE TABLE interviews RESTART IDENTITY");
}

module.exports = { listInterviews, getInterviewById, createInterview, finishInterview, deleteAllInterviews };
