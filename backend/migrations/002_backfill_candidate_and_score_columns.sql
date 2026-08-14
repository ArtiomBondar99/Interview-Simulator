-- Defensive backfill for any database created from an even earlier version of this schema
-- that predates these columns being in the CREATE TABLE itself (001). Safe to re-run: it
-- simply does nothing on a database where they already exist.
ALTER TABLE interviews
  ADD COLUMN IF NOT EXISTS candidate_name TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS candidate_id TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS previous_score INTEGER DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS improvement_score INTEGER DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS overall_feedback TEXT DEFAULT '';
