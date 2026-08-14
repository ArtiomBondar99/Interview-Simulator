-- One row per question actually asked in an interview, in order. Captures only what the
-- backend has ever actually received about a question (text/topic/difficulty) -- the richer
-- AI-generated metadata (hint, keywords, suggestedAnswer) is only ever known to the frontend
-- today and isn't sent to /finish, so it isn't persisted here either. That's a deliberate,
-- disclosed limitation: extending it would require a new endpoint plus a frontend change,
-- which is out of scope for this phase (see interview.service.js's finishInterview).
CREATE TABLE IF NOT EXISTS questions (
  id BIGSERIAL PRIMARY KEY,
  interview_id BIGINT NOT NULL REFERENCES interviews(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  topic TEXT NOT NULL DEFAULT '',
  question TEXT NOT NULL,
  difficulty TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (interview_id, position)
);
