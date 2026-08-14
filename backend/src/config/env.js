const PORT = Number(process.env.PORT || 3000);
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_SSL = process.env.DATABASE_SSL === "true";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-2024-08-06";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required. See backend/.env.example.");
}

module.exports = { PORT, DATABASE_URL, DATABASE_SSL, OPENAI_API_KEY, OPENAI_MODEL };
