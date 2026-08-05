const test = require("node:test");
const assert = require("node:assert/strict");

process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || "test-key-placeholder";

const ai = require("../ai");

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

function baseArgs(overrides = {}) {
  return {
    role: "backend",
    roleLabel: "Backend Developer",
    level: "junior",
    language: "en",
    evaluatedAnswers: [
      { topic: "databases", difficulty: "medium", score: 90, answerLevel: "strong", strengths: ["Clear"], mistakes: [], missingPoints: [] },
      { topic: "apis", difficulty: "medium", score: 40, answerLevel: "weak", strengths: [], mistakes: ["Confused REST with RPC"], missingPoints: ["HTTP verbs"] },
    ],
    ...overrides,
  };
}

test.afterEach(() => {
  ai.__setClientForTests(null);
});

test("synthesizes a full interview summary from condensed per-answer evaluations", async () => {
  const fixture = {
    overallScore: 65,
    strengths: ["Solid database fundamentals"],
    improvementAreas: ["API design terminology"],
    repeatedMistakes: [{ mistake: "Confuses REST with RPC", occurrences: 2 }],
    learningRecommendations: ["Review REST vs RPC design"],
    roleFit: "Reasonable fit for a junior backend role with some gaps.",
    passRecommendation: "borderline",
    overallFeedback: "A mixed performance overall.",
  };
  const client = fakeClient(fixture);
  ai.__setClientForTests(client);

  const result = await ai.synthesizeInterviewSummary(baseArgs());

  assert.equal(result.overallScore, 65);
  assert.equal(result.passRecommendation, "borderline");
  assert.equal(result.repeatedMistakes[0].occurrences, 2);
  assert.equal(result.model, ai.model);
});

test("invalid JSON from the model falls back to a generic 502 error", async () => {
  const client = fakeClient(undefined);
  ai.__setClientForTests(client);

  await assert.rejects(
    () => ai.synthesizeInterviewSummary(baseArgs()),
    (error) => {
      assert.equal(error.statusCode, 502);
      assert.equal(error.message, "The model did not return a valid interview summary.");
      return true;
    },
  );
});

test("InterviewSummary schema rejects a repeated mistake with fewer than 2 occurrences", () => {
  const { InterviewSummary } = ai.__schemas;
  const valid = {
    overallScore: 50,
    strengths: [],
    improvementAreas: [],
    repeatedMistakes: [{ mistake: "x", occurrences: 2 }],
    learningRecommendations: [],
    roleFit: "ok",
    passRecommendation: "borderline",
    overallFeedback: "ok",
  };
  assert.equal(InterviewSummary.safeParse(valid).success, true);

  const invalid = { ...valid, repeatedMistakes: [{ mistake: "x", occurrences: 1 }] };
  assert.equal(InterviewSummary.safeParse(invalid).success, false);
});
