const { z } = require("zod");

// These schemas intentionally replicate the exact fallback chains the old controllers had
// (role -> "general-tech", roleLabel -> role -> "General technical interview", level ->
// "junior", language -> "en"/"he") via `.transform()`, instead of hard-requiring every field.
// That keeps the AI endpoints exactly as tolerant as before while still enforcing real
// types/lengths/ranges, which they had none of previously.

const HistoryItemSchema = z.object({
  topic: z.string().trim().max(200).optional().default(""),
  question: z.string().trim().max(500).optional().default(""),
  answerLevel: z.unknown().optional(),
  difficulty: z.unknown().optional(),
});

const GenerateQuestionsSchema = z
  .object({
    role: z.string().trim().max(100).optional(),
    roleLabel: z.string().trim().max(200).optional(),
    level: z.string().trim().max(50).optional(),
    language: z.string().optional(),
    questionCount: z.coerce
      .number()
      .int()
      .min(1, "questionCount must be between 1 and 20.")
      .max(20, "questionCount must be between 1 and 20."),
    userProfile: z.string().max(12000).optional().default(""),
  })
  .transform((data) => ({
    role: data.role || "general-tech",
    roleLabel: data.roleLabel || data.role || "General technical interview",
    level: data.level || "junior",
    language: data.language === "en" ? "en" : "he",
    questionCount: data.questionCount,
    userProfile: data.userProfile,
  }));

const EvaluateInterviewSchema = z
  .object({
    role: z.string().trim().max(100).optional(),
    level: z.string().trim().max(50).optional(),
    language: z.string().optional(),
    answers: z.array(z.unknown()).min(1, "At least one answer is required.").max(20),
  })
  .transform((data) => ({
    role: data.role || "general-tech",
    level: data.level || "junior",
    language: data.language === "en" ? "en" : "he",
    answers: data.answers,
  }));

const EvaluateAnswerSchema = z
  .object({
    role: z.string().trim().max(100).optional(),
    roleLabel: z.string().trim().max(200).optional(),
    level: z.string().trim().max(50).optional(),
    language: z.string().optional(),
    topic: z.string().trim().max(200).optional().default(""),
    question: z.string().trim().min(1, "question and answer are required.").max(2000),
    answer: z.string().trim().min(1, "question and answer are required.").max(6000),
    difficulty: z.string().optional(),
    history: z.array(HistoryItemSchema).optional().default([]),
    // Sanity ceiling only (garbage-input protection) -- the actual product-level follow-up cap
    // (MAX_CONSECUTIVE_FOLLOW_UPS = 2) is enforced in ai.service.js, not here. Don't conflate
    // the two numbers.
    consecutiveFollowUps: z.coerce.number().int().min(0).max(20).optional().default(0),
  })
  .transform((data) => ({
    role: data.role || "general-tech",
    roleLabel: data.roleLabel || data.role || "General technical interview",
    level: data.level || "junior",
    language: data.language === "en" ? "en" : "he",
    topic: data.topic,
    question: data.question,
    answer: data.answer,
    difficulty: ["easy", "medium", "hard"].includes(data.difficulty) ? data.difficulty : "medium",
    history: data.history.slice(-3),
    // This transform rebuilds the object as an allow-list (not a spread) -- a field only added
    // to the raw shape above would be silently dropped if not also re-listed here.
    consecutiveFollowUps: data.consecutiveFollowUps,
  }));

const EvaluatedAnswerInputSchema = z.object({
  topic: z.string().trim().max(200).optional().default(""),
  difficulty: z.unknown().optional(),
  score: z.coerce.number().catch(0),
  answerLevel: z.unknown().optional(),
  strengths: z.array(z.string()).max(6).optional().default([]),
  mistakes: z.array(z.string()).max(6).optional().default([]),
  missingPoints: z.array(z.string()).max(6).optional().default([]),
  misconceptions: z.array(z.string()).max(6).optional().default([]),
});

const SummarizeSchema = z
  .object({
    role: z.string().trim().max(100).optional(),
    roleLabel: z.string().trim().max(200).optional(),
    level: z.string().trim().max(50).optional(),
    language: z.string().optional(),
    evaluatedAnswers: z.array(EvaluatedAnswerInputSchema).min(1, "At least one evaluated answer is required.").max(20),
  })
  .transform((data) => ({
    role: data.role || "general-tech",
    roleLabel: data.roleLabel || data.role || "General technical interview",
    level: data.level || "junior",
    language: data.language === "en" ? "en" : "he",
    evaluatedAnswers: data.evaluatedAnswers,
  }));

module.exports = { GenerateQuestionsSchema, EvaluateInterviewSchema, EvaluateAnswerSchema, SummarizeSchema };
