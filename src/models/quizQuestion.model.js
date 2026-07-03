const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false }
);

const quizQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [optionSchema],
      validate: {
        validator: (value) => value.length >= 2,
        message: "Question must have at least two options.",
      },
    },

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