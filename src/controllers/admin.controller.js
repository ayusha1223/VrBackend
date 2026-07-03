const User = require("../models/user.model");
const Course = require("../models/course.model");
const QuizQuestion = require("../models/quizQuestion.model");
const QuizAttempt = require("../models/quizAttempt.model");

const getDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalCourses = await Course.countDocuments();

    const totalQuestions = await QuizQuestion.countDocuments();

    const totalAttempts = await QuizAttempt.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalCourses,
        totalQuestions,
        totalAttempts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};