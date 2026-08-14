-- Added to store the AI-generated end-of-interview summary (see ai.service.js's
-- synthesizeInterviewSummary) as a full snapshot alongside answers_json.
ALTER TABLE interviews
  ADD COLUMN IF NOT EXISTS summary_json JSONB NOT NULL DEFAULT '{}'::jsonb;
