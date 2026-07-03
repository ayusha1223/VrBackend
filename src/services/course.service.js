const Course = require("../models/course.model");

const createCourse = async (courseData) => {
  return await Course.create(courseData);
};

const getAllCourses = async () => {
  return await Course.find().sort({ createdAt: -1 });
};
const getCourseById = async (id) => {
  return await Course.findById(id);
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
};