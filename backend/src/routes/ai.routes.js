const express = require("express");
const controller = require("../controllers/ai.controller");

const router = express.Router();

router.get("/status", controller.getStatus);
router.post("/questions", controller.generateQuestions);
router.post("/evaluate", controller.evaluateInterview);
router.post("/evaluate-answer", controller.evaluateAnswer);
router.post("/summarize", controller.summarize);

module.exports = router;
