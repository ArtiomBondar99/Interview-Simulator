const app = require("./app");
const { PORT } = require("./config/env");
const { db, initDatabase } = require("./config/db");

if (require.main === module) {
  initDatabase()
    .then(() => {
      const server = app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log("Connected to PostgreSQL.");
      });

      const shutdown = () => {
        server.close(async () => {
          await db.end();
          process.exit(0);
        });
      };

      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    })
    .catch((error) => {
      console.error("Failed to initialize PostgreSQL:", error.message);
      process.exit(1);
    });
}

module.exports = { app, initDatabase, db };
