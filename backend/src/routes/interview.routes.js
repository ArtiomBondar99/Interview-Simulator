const express = require("express");
const controller = require("../controllers/interview.controller");

const router = express.Router();

router.get("/", controller.getInterviews);
router.get("/:id(\\d+)", controller.getInterviewById);
router.post("/start", controller.startInterview);
router.patch("/:id(\\d+)/finish", controller.finishInterview);
router.delete("/", controller.deleteAllInterviews);

module.exports = router;
