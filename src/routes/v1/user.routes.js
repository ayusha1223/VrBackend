const express = require("express");

const router = express.Router();

const { getUsers } = require("../../controllers/user.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

router.get(
  "/",
  protect,
  authorize("admin"),
  getUsers
);

module.exports = router;