const { Pool } = require("pg");
const { DATABASE_URL, DATABASE_SSL } = require("./env");

const db = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_SSL ? { rejectUnauthorized: false } : false,
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
      summary_json JSONB NOT NULL DEFAULT '{}'::jsonb,
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
      ADD COLUMN IF NOT EXISTS overall_feedback TEXT DEFAULT '',
      ADD COLUMN IF NOT EXISTS summary_json JSONB NOT NULL DEFAULT '{}'::jsonb
  `);
}

module.exports = { db, initDatabase };
