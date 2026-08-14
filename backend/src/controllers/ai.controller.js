const aiService = require("../services/ai.service");

function getStatus(req, res) {
  res.status(200).json({ configured: aiService.isConfigured(), model: aiService.model });
}

async function generateQuestions(req, res, next) {
  try {
    const result = await aiService.generateInterviewQuestions(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function evaluateInterview(req, res, next) {
  try {
    const result = await aiService.evaluateInterview(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function evaluateAnswer(req, res, next) {
  try {
    const result = await aiService.evaluateCandidateAnswer(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function summarize(req, res, next) {
  try {
    const result = await aiService.synthesizeInterviewSummary(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getStatus, generateQuestions, evaluateInterview, evaluateAnswer, summarize };
