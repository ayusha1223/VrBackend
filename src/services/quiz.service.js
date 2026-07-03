const QuizQuestion = require("../models/quizQuestion.model");
const QuizAttempt = require("../models/quizAttempt.model");
const aiService = require("./ai.service");

// ==========================
// Create Quiz Question
// ==========================
const createQuestion = async (questionData) => {
  return await QuizQuestion.create(questionData);
};

// ==========================
// Get All Active Questions
// ==========================
const getQuestions = async () => {
  return await QuizQuestion.find({ isActive: true }).sort({ createdAt: 1 });
};

// ==========================
// Update Quiz Question
// ==========================
const updateQuestion = async (id, questionData) => {
  return await QuizQuestion.findByIdAndUpdate(
    id,
    questionData,
    {
      new: true,
      runValidators: true,
    }
  );
};

// ==========================
// Delete Quiz Question
// ==========================
const deleteQuestion = async (id) => {
  return await QuizQuestion.findByIdAndDelete(id);
};

// ==========================
// Submit Quiz
// ==========================
const submitQuiz = async (studentId, answers) => {
  let totalScore = 0;

  const processedAnswers = [];
  const courseScores = {};

  for (const answer of answers) {
    const question = await QuizQuestion.findById(answer.questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    const option = question.options[answer.optionIndex];

    if (!option) {
      throw new Error("Invalid option selected");
    }

    totalScore += option.weight;

    courseScores[option.course] =
      (courseScores[option.course] || 0) + option.weight;

    processedAnswers.push({
      questionId: question._id,
      optionIndex: answer.optionIndex,
      selectedCourse: option.course,
      weight: option.weight,
    });
  }

  // Temporary recommendation before AI
  let recommendedCourse = "";
  let highestScore = 0;

  for (const course in courseScores) {
    if (courseScores[course] > highestScore) {
      highestScore = courseScores[course];
      recommendedCourse = course;
    }
  }

  // AI Recommendation
  const aiResponse = await aiService.generateRecommendation({
    totalScore,
    courseScores,
    answers: processedAnswers,
  });

  let recommendation;

  try {
    recommendation = JSON.parse(aiResponse);
  } catch (error) {
    recommendation = {
      recommendedCourse,
      confidence: 80,
      reason: "AI response could not be parsed.",
      topCourses: [],
    };
  }

  // Save Quiz Attempt
  const attempt = await QuizAttempt.create({
    student: studentId,
    answers: processedAnswers,
    totalScore,
    recommendedCourse: recommendation.recommendedCourse,
    confidence: recommendation.confidence,
    aiReason: recommendation.reason,
  });

  return {
    attempt,
    ai: recommendation,
  };
};
const getRecommendationHistory = async (studentId) => {
  return await QuizAttempt.find({
    student: studentId,
  }).sort({
    createdAt: -1,
  });
};

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  submitQuiz,
  getRecommendationHistory,
};