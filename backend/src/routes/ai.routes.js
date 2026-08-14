const express = require("express");
const controller = require("../controllers/ai.controller");
const { validate } = require("../middleware/validate");
const {
  GenerateQuestionsSchema,
  EvaluateInterviewSchema,
  EvaluateAnswerSchema,
  SummarizeSchema,
} = require("../validation/ai.schemas");

const router = express.Router();

router.get("/status", controller.getStatus);
router.post("/questions", validate(GenerateQuestionsSchema), controller.generateQuestions);
router.post("/evaluate", validate(EvaluateInterviewSchema), controller.evaluateInterview);
router.post("/evaluate-answer", validate(EvaluateAnswerSchema), controller.evaluateAnswer);
router.post("/summarize", validate(SummarizeSchema), controller.summarize);

module.exports = router;
