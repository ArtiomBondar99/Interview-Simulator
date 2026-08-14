const test = require("node:test");
const assert = require("node:assert/strict");

process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || "test-key-placeholder";

const ai = require("../src/services/ai.service");

function fakeClient(parsedFixture) {
  return {
    beta: {
      chat: {
        completions: {
          parse: async () => ({ parsed: parsedFixture }),
        },
      },
    },
  };
}

function fakeThrowingClient(error) {
  return {
    beta: {
      chat: {
        completions: {
          parse: async () => {
            throw error;
          },
        },
      },
    },
  };
}

function baseArgs(overrides = {}) {
  return {
    role: "backend",
    level: "junior",
    language: "en",
    answers: [{ question: "What is an index?", answer: "Speeds up lookups.", keywords: ["index"] }],
    ...overrides,
  };
}

test.afterEach(() => {
  ai.__setClientForTests(null);
});

test("evaluates every answer and preserves the input count", async () => {
  const fixture = {
    answers: [
      { index: 0, score: 2, matchedKeywords: ["index"], missingKeywords: [], suggestedAnswer: "x", feedback: "Good." },
    ],
    overallFeedback: "Solid overall.",
  };
  ai.__setClientForTests(fakeClient(fixture));

  const result = await ai.evaluateInterview(baseArgs());

  assert.equal(result.answers.length, 1);
  assert.equal(result.model, ai.model);
});

test("a mismatched answer count from the model raises AI_INVALID_RESPONSE", async () => {
  const fixture = { answers: [], overallFeedback: "x" };
  ai.__setClientForTests(fakeClient(fixture));

  await assert.rejects(
    () => ai.evaluateInterview(baseArgs()),
    (error) => {
      assert.equal(error.code, "AI_INVALID_RESPONSE");
      assert.equal(error.statusCode, 502);
      return true;
    },
  );
});

test("an OpenAI SDK failure raises a safe AI_SERVICE_UNAVAILABLE error, not the raw cause", async () => {
  const rawError = new Error("rate limit exceeded");
  ai.__setClientForTests(fakeThrowingClient(rawError));

  await assert.rejects(
    () => ai.evaluateInterview(baseArgs()),
    (error) => {
      assert.equal(error.code, "AI_SERVICE_UNAVAILABLE");
      assert.equal(error.statusCode, 502);
      assert.notEqual(error.message, rawError.message);
      return true;
    },
  );
});
