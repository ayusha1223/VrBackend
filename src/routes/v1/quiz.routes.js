const express = require("express");

const router = express.Router();

const {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  submitQuiz,
  getRecommendationHistory,
} = require("../../controllers/quiz.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

/* ==========================
   Public Routes
========================== */

router.get("/", getQuestions);

/* ==========================
   Student Routes
========================== */

router.post(
  "/submit",
  protect,
  submitQuiz
);

/* ==========================
   Admin Routes
========================== */

router.post(
  "/",
  protect,
  authorize("admin"),
  createQuestion
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateQuestion
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteQuestion
);
router.get(
  "/history",
  protect,
  getRecommendationHistory
);

module.exports = router;