const { z } = require("zod");

// Matches the real contract sent by frontend/app.js's startInterview(): candidateName and
// userProfile are already required client-side before the request is even sent, level is a
// fixed <select> of junior/mid/senior, and topic is always sent equal to role. We flip that
// last relationship around (default topic FROM role, instead of the old role-falls-back-to-topic)
// since role is what's actually required and used downstream.
const StartInterviewSchema = z
  .object({
    candidateName: z.string().trim().min(1, "candidateName is required.").max(100),
    candidateId: z.string().trim().max(100).optional().default(""),
    role: z.string().trim().min(1, "role is required.").max(100),
    topic: z.string().trim().max(100).optional().default(""),
    interviewLanguage: z.string().optional(),
    level: z.enum(["junior", "mid", "senior"], {
      errorMap: () => ({ message: "level must be junior, mid, or senior." }),
    }),
    userProfile: z.string().trim().min(1, "userProfile is required.").max(20000),
    profileSummary: z.string().trim().max(2000).optional().default(""),
    questionCount: z.coerce.number().int().min(1, "questionCount must be between 1 and 20.").max(20, "questionCount must be between 1 and 20."),
    interviewMinutes: z.coerce.number().int().min(1).max(180).catch(10),
  })
  .transform((data) => ({
    ...data,
    topic: data.topic || data.role,
    interviewLanguage: data.interviewLanguage === "en" ? "en" : "he",
  }));

const InterviewIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const FinishInterviewSchema = z
  .object({
    score: z.coerce.number().catch(0),
    maxScore: z.coerce.number().catch(0),
    overallFeedback: z.string().max(20000).optional().default(""),
    answers: z.array(z.unknown()).max(100).optional().default([]),
    summary: z.unknown().optional(),
  })
  .transform((data) => ({
    ...data,
    summary: data.summary && typeof data.summary === "object" ? data.summary : {},
  }));

module.exports = { StartInterviewSchema, InterviewIdParamsSchema, FinishInterviewSchema };
