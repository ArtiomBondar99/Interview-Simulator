-- Interview status state machine: in_progress -> completed, or in_progress -> abandoned
-- (see interview.service.js's abandonStaleInterviews). PostgreSQL has no
-- "ADD CONSTRAINT IF NOT EXISTS" -- catching duplicate_object is the safe way to make this
-- re-runnable, matching the migration runner's own advisory-lock protection against two
-- processes ever attempting this concurrently in the first place.
DO $$
BEGIN
  ALTER TABLE interviews
    ADD CONSTRAINT interviews_status_check
    CHECK (status IN ('in_progress', 'completed', 'abandoned'));
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;
