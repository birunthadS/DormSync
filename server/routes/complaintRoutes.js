const express =
  require("express");

const {
  createComplaint,

  getStudentComplaints,

  getAllComplaints,

  resolveComplaint,
} = require(
  "../controllers/complaintController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.post(
  "/",

  protect,

  createComplaint
);

router.get(
  "/student",

  protect,

  getStudentComplaints
);

router.get(
  "/admin",

  protect,

  getAllComplaints
);

router.put(
  "/resolve/:id",

  protect,

  resolveComplaint
);

module.exports =
  router;