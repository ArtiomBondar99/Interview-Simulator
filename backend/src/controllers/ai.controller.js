const aiService = require("../services/ai.service");

function getStatus(req, res) {
  res.status(200).json({ configured: aiService.isConfigured(), model: aiService.model });
}

async function generateQuestions(req, res, next) {
  try {
    const body = req.body || {};
    const questionCount = Number(body.questionCount || 0);

    if (!Number.isInteger(questionCount) || questionCount < 1 || questionCount > 20) {
      res.status(400).json({ error: "questionCount must be between 1 and 20." });
      return;
    }

    const result = await aiService.generateInterviewQuestions({
      role: String(body.role || "general-tech").slice(0, 100),
      roleLabel: String(body.roleLabel || body.role || "General technical interview").slice(0, 200),
      level: String(body.level || "junior").slice(0, 50),
      language: body.language === "en" ? "en" : "he",
      questionCount,
      userProfile: String(body.userProfile || "").slice(0, 12000),
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function evaluateInterview(req, res, next) {
  try {
    const body = req.body || {};
    const answers = Array.isArray(body.answers) ? body.answers.slice(0, 20) : [];

    if (!answers.length) {
      res.status(400).json({ error: "At least one answer is required." });
      return;
    }

    const result = await aiService.evaluateInterview({
      role: String(body.role || "general-tech").slice(0, 100),
      level: String(body.level || "junior").slice(0, 50),
      language: body.language === "en" ? "en" : "he",
      answers,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function evaluateAnswer(req, res, next) {
  try {
    const body = req.body || {};
    const question = String(body.question || "").slice(0, 2000);
    const answer = String(body.answer || "").slice(0, 6000);

    if (!question || !answer) {
      res.status(400).json({ error: "question and answer are required." });
      return;
    }

    const difficulty = ["easy", "medium", "hard"].includes(body.difficulty) ? body.difficulty : "medium";
    const history = Array.isArray(body.history) ? body.history.slice(-3) : [];

    const result = await aiService.evaluateCandidateAnswer({
      role: String(body.role || "general-tech").slice(0, 100),
      roleLabel: String(body.roleLabel || body.role || "General technical interview").slice(0, 200),
      level: String(body.level || "junior").slice(0, 50),
      language: body.language === "en" ? "en" : "he",
      topic: String(body.topic || "").slice(0, 200),
      question,
      answer,
      difficulty,
      history: history.map((item) => ({
        topic: String(item.topic || "").slice(0, 200),
        question: String(item.question || "").slice(0, 500),
        answerLevel: item.answerLevel,
        difficulty: item.difficulty,
      })),
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function summarize(req, res, next) {
  try {
    const body = req.body || {};
    const evaluatedAnswers = Array.isArray(body.evaluatedAnswers) ? body.evaluatedAnswers.slice(0, 20) : [];

    if (!evaluatedAnswers.length) {
      res.status(400).json({ error: "At least one evaluated answer is required." });
      return;
    }

    const result = await aiService.synthesizeInterviewSummary({
      role: String(body.role || "general-tech").slice(0, 100),
      roleLabel: String(body.roleLabel || body.role || "General technical interview").slice(0, 200),
      level: String(body.level || "junior").slice(0, 50),
      language: body.language === "en" ? "en" : "he",
      evaluatedAnswers: evaluatedAnswers.map((item) => ({
        topic: String(item.topic || "").slice(0, 200),
        difficulty: item.difficulty,
        score: Number(item.score) || 0,
        answerLevel: item.answerLevel,
        strengths: Array.isArray(item.strengths) ? item.strengths.slice(0, 6) : [],
        mistakes: Array.isArray(item.mistakes) ? item.mistakes.slice(0, 6) : [],
        missingPoints: Array.isArray(item.missingPoints) ? item.missingPoints.slice(0, 6) : [],
      })),
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getStatus, generateQuestions, evaluateInterview, evaluateAnswer, summarize };
