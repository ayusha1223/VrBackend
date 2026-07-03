const Course = require("../models/course.model");

const createCourse = async (courseData) => {
  return await Course.create(courseData);
};

const getAllCourses = async () => {
  return await Course.find().sort({ createdAt: -1 });
};

module.exports = {
  createCourse,
  getAllCourses,
};