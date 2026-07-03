const quizService = require("../services/quiz.service");

// ==========================
// Create Question
// ==========================
const createQuestion = async (req, res) => {
  try {
    const question = await quizService.createQuestion(req.body);

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Questions
// ==========================
const getQuestions = async (req, res) => {
  try {
    const questions = await quizService.getQuestions();

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Question
// ==========================
const updateQuestion = async (req, res) => {
  try {
    const question = await quizService.updateQuestion(
      req.params.id,
      req.body
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Question
// ==========================
const deleteQuestion = async (req, res) => {
  try {
    const question = await quizService.deleteQuestion(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Submit Quiz
// ==========================
const submitQuiz = async (req, res) => {
  try {
    const result = await quizService.submitQuiz(
      req.user.id,
      req.body.answers
    );

    res.status(201).json({
      success: true,
      message: "Quiz submitted successfully",
      recommendation: result.ai,
      data: result.attempt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getRecommendationHistory = async (req, res) => {
  try {
    const history = await quizService.getRecommendationHistory(req.user.id);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  submitQuiz,
  getRecommendationHistory,
};