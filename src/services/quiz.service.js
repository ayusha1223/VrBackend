const QuizQuestion = require("../models/quizQuestion.model");
const QuizAttempt = require("../models/quizAttempt.model");

const createQuestion = async (questionData) => {
  return await QuizQuestion.create(questionData);
};

const getQuestions = async () => {
  return await QuizQuestion.find({ isActive: true });
};

const submitQuiz = async (studentId, answers) => {
  const totalScore = answers.reduce(
    (sum, answer) => sum + answer.weight,
    0
  );

  const attempt = await QuizAttempt.create({
    student: studentId,
    answers,
    totalScore,
  });

  return attempt;
};

module.exports = {
  createQuestion,
  getQuestions,
  submitQuiz,
};