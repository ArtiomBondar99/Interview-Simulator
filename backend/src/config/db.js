const { Pool } = require("pg");
const { DATABASE_URL, DATABASE_SSL } = require("./env");
const { runMigrations } = require("./migrations");

const db = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_SSL ? { rejectUnauthorized: false } : false,
});

// Schema changes now live as ordered SQL files in backend/migrations/ (see
// config/migrations.js) instead of being hand-written here. The name `initDatabase` is kept
// so every caller (src/server.js, all of backend/test/*) can keep working unchanged --
// only what happens inside it changed.
async function initDatabase() {
  await runMigrations(db);
}

module.exports = { db, initDatabase };
