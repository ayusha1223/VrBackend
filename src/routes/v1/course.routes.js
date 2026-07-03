const express = require("express");

const router = express.Router();

const {
  createCourse,
  getAllCourses,
} = require("../../controllers/course.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

// Public
router.get("/", getAllCourses);

// Admin Only
router.post(
  "/",
  protect,
  authorize("admin"),
  createCourse
);

module.exports = router;