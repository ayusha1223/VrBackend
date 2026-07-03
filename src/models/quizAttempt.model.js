const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizQuestion",
      required: true,
    },

    optionIndex: {
      type: Number,
      required: true,
    },

    selectedCourse: {
      type: String,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    answers: [answerSchema],

    totalScore: {
      type: Number,
      default: 0,
    },

    recommendedCourse: {
      type: String,
      default: "",
    },

    aiReason: {
      type: String,
      default: "",
    },

    confidence: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);