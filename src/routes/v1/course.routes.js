const express = require("express");

const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../../controllers/course.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

/* ---------- Public Routes ---------- */

router.get("/", getAllCourses);
router.get("/:id", getCourseById);

/* ---------- Admin Routes ---------- */

router.post(
  "/",
  protect,
  authorize("admin"),
  createCourse
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateCourse
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCourse
);

module.exports = router;