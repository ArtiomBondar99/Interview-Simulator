-- Baseline: the interviews table as it was first created. This file is never edited after
-- being applied -- every later schema change gets its own new migration file below.
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
);
