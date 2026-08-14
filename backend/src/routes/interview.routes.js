const express = require("express");
const controller = require("../controllers/interview.controller");
const { validate } = require("../middleware/validate");
const { StartInterviewSchema, InterviewIdParamsSchema, FinishInterviewSchema } = require("../validation/interview.schemas");

const router = express.Router();

router.get("/", controller.getInterviews);
router.get("/:id(\\d+)", validate(InterviewIdParamsSchema, "params"), controller.getInterviewById);
router.post("/start", validate(StartInterviewSchema), controller.startInterview);
router.patch(
  "/:id(\\d+)/finish",
  validate(InterviewIdParamsSchema, "params"),
  validate(FinishInterviewSchema),
  controller.finishInterview,
);
router.delete("/", controller.deleteAllInterviews);

module.exports = router;
