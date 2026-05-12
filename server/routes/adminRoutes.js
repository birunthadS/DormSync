const express =
  require("express");

const {
  getAllComplaints,

  updateComplaintStatus,

  getAllVisitors,

  updateVisitorStatus,

  getAdminNotifications,
} = require(
  "../controllers/adminController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const adminOnly =
  require(
    "../middleware/adminMiddleware"
  );

const router =
  express.Router();

router.get(
  "/complaints",

  protect,

  adminOnly,

  getAllComplaints
);

router.put(
  "/complaints/:id",

  protect,

  adminOnly,

  updateComplaintStatus
);

router.get(
  "/visitors",

  protect,

  adminOnly,

  getAllVisitors
);

router.put(
  "/visitors/:id",

  protect,

  adminOnly,

  updateVisitorStatus
);

router.get(
  "/notifications",

  protect,

  adminOnly,

  getAdminNotifications
);

module.exports =
  router;