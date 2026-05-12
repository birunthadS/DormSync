const express =
  require("express");

const {
  createVisitor,

  getVisitors,

  getComplaints,

  getStudentNotifications,
} = require(
  "../controllers/studentController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.post(
  "/visitors",

  protect,

  createVisitor
);

router.get(
  "/visitors",

  protect,

  getVisitors
);

router.get(
  "/complaints",

  protect,

  getComplaints
);

router.get(
  "/notifications",

  protect,

  getStudentNotifications
);

module.exports =
  router;