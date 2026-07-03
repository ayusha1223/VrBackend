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
const updateCourse = async (id, courseData) => {
  return await Course.findByIdAndUpdate(
    id,
    courseData,
    {
      new: true,
      runValidators: true,
    }
  );
};
const deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};