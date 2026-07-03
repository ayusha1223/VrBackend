const QuizQuestion = require("../models/quizQuestion.model");

const createQuestion = async (questionData) => {
  return await QuizQuestion.create(questionData);
};

const getQuestions = async () => {
  return await QuizQuestion.find({ isActive: true });
};

module.exports = {
  createQuestion,
  getQuestions,
};