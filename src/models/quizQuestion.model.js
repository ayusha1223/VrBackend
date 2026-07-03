const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: [
      {
        text: {
          type: String,
          required: true,
        },

        weight: {
          type: Number,
          required: true,
        },

        course: {
          type: String,
          required: true,
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);