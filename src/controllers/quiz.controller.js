const quizService = require("../services/quiz.service");

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

const submitQuiz = async (req, res) => {
  try {
    const attempt = await quizService.submitQuiz(
      req.user.id,
      req.body.answers
    );

    res.status(201).json({
      success: true,
      message: "Quiz submitted successfully",
      data: attempt,
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
  submitQuiz,
};