const express = require("express");

const router = express.Router();

const {
  createQuestion,
  getQuestions,
} = require("../../controllers/quiz.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

// Public - Students can view questions
router.get("/", getQuestions);

// Admin - Create question
router.post(
  "/",
  protect,
  authorize("admin"),
  createQuestion
);

module.exports = router;