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

async function finishInterview(id, { score, maxScore, overallFeedback, answers, summary }) {
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
        previous_score = $5, improvement_score = $6, summary_json = $7::jsonb,
        status = 'completed', completed_at = NOW()
    WHERE id = $8
    `,
    [score, maxScore, JSON.stringify(answers), overallFeedback, previousScore, improvementScore, JSON.stringify(summary), id],
  );

  return result.rowCount > 0;
}

async function deleteAllInterviews() {
  await db.query("TRUNCATE TABLE interviews RESTART IDENTITY");
}

module.exports = { listInterviews, getInterviewById, createInterview, finishInterview, deleteAllInterviews };
