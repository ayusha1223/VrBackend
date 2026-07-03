const express = require("express");

const router = express.Router();

const { getDashboard } = require("../../controllers/admin.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

// Admin Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboard
);

module.exports = router;