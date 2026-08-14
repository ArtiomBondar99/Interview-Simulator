const fs = require("node:fs/promises");
const path = require("node:path");

const MIGRATIONS_DIR = path.join(__dirname, "..", "..", "migrations");

// A single advisory lock key for this project's whole migration run. pg_advisory_lock is
// session-scoped (unlike pg_advisory_xact_lock, used elsewhere in this codebase, which
// releases itself at COMMIT/ROLLBACK) -- we want it held across MULTIPLE transactions here
// (one per migration file), only released once every file has been checked, so it must be
// unlocked explicitly.
const MIGRATION_LOCK_KEY = "interview_simulator_migrations";

// Runs every .sql file in backend/migrations/ that hasn't been applied yet, in filename order
// (hence the zero-padded numeric prefixes), each in its own transaction, tracked in a
// schema_migrations table. Takes a session advisory lock for the whole run so that multiple
// processes booting concurrently against the same database (e.g. several test files, or
// several server instances) can't both decide a migration is unapplied and race to run it --
// the loser just waits, then sees it's already applied and skips it.
async function runMigrations(db) {
  const client = await db.connect();

  try {
    await client.query("SELECT pg_advisory_lock(hashtext($1))", [MIGRATION_LOCK_KEY]);

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const appliedResult = await client.query("SELECT name FROM schema_migrations");
    const applied = new Set(appliedResult.rows.map((row) => row.name));

    const allFiles = await fs.readdir(MIGRATIONS_DIR);
    const migrationFiles = allFiles.filter((file) => file.endsWith(".sql")).sort();

    for (const file of migrationFiles) {
      if (applied.has(file)) {
        continue;
      }

      const sql = await fs.readFile(path.join(MIGRATIONS_DIR, file), "utf8");

      try {
        await client.query("BEGIN");
        await client.query(sql);
        await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
        await client.query("COMMIT");
        console.log(`Applied migration: ${file}`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(`Migration ${file} failed: ${error.message}`, { cause: error });
      }
    }
  } finally {
    await client.query("SELECT pg_advisory_unlock(hashtext($1))", [MIGRATION_LOCK_KEY]);
    client.release();
  }
}

module.exports = { runMigrations };
