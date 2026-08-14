-- One row per answer, 1:1 with the question it answers. The original plan called for separate
-- "answers" and "evaluations" tables, but in this app a candidate answer and its AI evaluation
-- are always created together in a single API call (ai.service.js's evaluateCandidateAnswer)
-- and never have an independent lifecycle -- splitting them into two tables would just force
-- an artificial 1:1 join on every read with no real benefit. The evaluation's free-text arrays
-- (strengths/mistakes/missingPoints) stay JSONB: small, always read as a whole, never queried
-- by individual element.
CREATE TABLE IF NOT EXISTS answers (
  id BIGSERIAL PRIMARY KEY,
  question_id BIGINT NOT NULL UNIQUE REFERENCES questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL DEFAULT '',
  score INTEGER,
  correctness_score INTEGER,
  relevance_score INTEGER,
  depth_score INTEGER,
  clarity_score INTEGER,
  answer_level TEXT,
  strengths JSONB NOT NULL DEFAULT '[]'::jsonb,
  mistakes JSONB NOT NULL DEFAULT '[]'::jsonb,
  missing_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  feedback TEXT NOT NULL DEFAULT '',
  improved_answer TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
