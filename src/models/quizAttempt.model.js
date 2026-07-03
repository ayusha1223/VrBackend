const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QuizQuestion",
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
    ],

    recommendedCourse: {
      type: String,
      default: "",
    },

    totalScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);