const express = require("express");

const router = express.Router();

const {
  createQuestion,
  getQuestions,
  submitQuiz,
} = require("../../controllers/quiz.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

// Public
router.get("/", getQuestions);

// Student
router.post(
  "/submit",
  protect,
  submitQuiz
);

// Admin
router.post(
  "/",
  protect,
  authorize("admin"),
  createQuestion
);

module.exports = router;