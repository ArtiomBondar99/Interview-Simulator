const interviewService = require("../services/interview.service");
const { AppError } = require("../utils/errors");

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
    const { id } = req.params;
    const interview = await interviewService.getInterviewById(id);

    if (!interview) {
      throw new AppError("INTERVIEW_NOT_FOUND", "Interview not found.", 404);
    }

    res.status(200).json(interview);
  } catch (error) {
    next(error);
  }
}

async function startInterview(req, res, next) {
  try {
    const id = await interviewService.createInterview(req.body);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
}

async function finishInterview(req, res, next) {
  try {
    const { id } = req.params;
    const result = await interviewService.finishInterview(id, req.body);

    if (!result.found) {
      throw new AppError("INTERVIEW_NOT_FOUND", "Interview not found.", 404);
    }

    if (result.alreadyCompleted) {
      throw new AppError("INTERVIEW_ALREADY_COMPLETED", "Interview is already completed.", 409);
    }

    if (result.abandoned) {
      throw new AppError("INTERVIEW_ABANDONED", "Interview was abandoned and can no longer be finished.", 409);
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
      throw new AppError(
        "VALIDATION_ERROR",
        `Confirmation required. Send { "confirm": "${DELETE_ALL_CONFIRMATION}" } in the request body.`,
        400,
      );
    }

    await interviewService.deleteAllInterviews();
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

module.exports = { getInterviews, getInterviewById, startInterview, finishInterview, deleteAllInterviews };
