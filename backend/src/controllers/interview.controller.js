const interviewService = require("../services/interview.service");

const DELETE_ALL_CONFIRMATION = "DELETE_ALL_INTERVIEWS";

async function getInterviews(req, res, next) {
  try {
    const interviews = await interviewService.listInterviews();
    res.status(200).json(interviews);
  } catch (error) {
    next(error);
  }
}

async function getInterviewById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const interview = await interviewService.getInterviewById(id);

    if (!interview) {
      res.status(404).json({ error: "Interview not found." });
      return;
    }

    res.status(200).json(interview);
  } catch (error) {
    next(error);
  }
}

async function startInterview(req, res, next) {
  try {
    const body = req.body || {};
    const candidateName = String(body.candidateName || "");
    const candidateId = String(body.candidateId || "");
    const topic = String(body.topic || "");
    const role = String(body.role || topic);
    const interviewLanguage = String(body.interviewLanguage || "he");
    const level = String(body.level || "");
    const userProfile = String(body.userProfile || "");
    const profileSummary = String(body.profileSummary || "");
    const questionCount = Number(body.questionCount || 0);
    const interviewMinutes = Number(body.interviewMinutes || 10);

    if (!topic || !level || !Number.isInteger(questionCount) || questionCount < 1) {
      res.status(400).json({ error: "Missing role, level, or questionCount." });
      return;
    }

    const id = await interviewService.createInterview({
      candidateName,
      candidateId,
      topic,
      role,
      interviewLanguage,
      level,
      userProfile,
      profileSummary,
      questionCount,
      interviewMinutes,
    });

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
}

async function finishInterview(req, res, next) {
  try {
    const id = Number(req.params.id);
    const body = req.body || {};
    const score = Number(body.score || 0);
    const maxScore = Number(body.maxScore || 0);
    const overallFeedback = String(body.overallFeedback || "");
    const answers = Array.isArray(body.answers) ? body.answers : [];
    const summary = body.summary && typeof body.summary === "object" ? body.summary : {};

    const result = await interviewService.finishInterview(id, {
      score,
      maxScore,
      overallFeedback,
      answers,
      summary,
    });

    if (!result.found) {
      res.status(404).json({ error: "Interview not found." });
      return;
    }

    if (result.alreadyCompleted) {
      res.status(409).json({ error: "Interview is already completed." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

async function deleteAllInterviews(req, res, next) {
  try {
    const confirm = (req.body && req.body.confirm) || req.query.confirm;

    if (confirm !== DELETE_ALL_CONFIRMATION) {
      res.status(400).json({
        error: `Confirmation required. Send { "confirm": "${DELETE_ALL_CONFIRMATION}" } in the request body.`,
      });
      return;
    }

    await interviewService.deleteAllInterviews();
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

module.exports = { getInterviews, getInterviewById, startInterview, finishInterview, deleteAllInterviews };
