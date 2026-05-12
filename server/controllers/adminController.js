const Complaint =
  require("../models/Complaint");

const Visitor =
  require("../models/Visitor");

const Notification =
  require("../models/Notification");

const getAllComplaints =
  async (req, res) => {

    const complaints =
      await Complaint.find()

        .populate(
          "createdBy",
          "name"
        )

        .sort({
          createdAt: -1,
        });

    res.json(
      complaints
    );
  };

const updateComplaintStatus =
  async (req, res) => {

    const complaint =
      await Complaint.findById(
        req.params.id
      );

    complaint.status =
      req.body.status;

    await complaint.save();

    await Notification.create({
      message:
        `Complaint for Room ${complaint.roomNumber} marked ${complaint.status}`,

      forRole:
        "student",
    });

    res.json(
      complaint
    );
  };

const getAllVisitors =
  async (req, res) => {

    const visitors =
      await Visitor.find()

        .populate(
          "createdBy",
          "name"
        )

        .sort({
          createdAt: -1,
        });

    res.json(visitors);
  };

const updateVisitorStatus =
  async (req, res) => {

    const visitor =
      await Visitor.findById(
        req.params.id
      );

    visitor.status =
      req.body.status;

    await visitor.save();

    await Notification.create({
      message:
        `Visitor request for Room ${visitor.roomNumber} was ${visitor.status}`,

      forRole:
        "student",
    });

    res.json(visitor);
  };

const getAdminNotifications =
  async (req, res) => {

    const notifications =
      await Notification.find({
        forRole:
          "admin",
      }).sort({
        createdAt: -1,
      });

    res.json(
      notifications
    );
  };

module.exports = {
  getAllComplaints,

  updateComplaintStatus,

  getAllVisitors,

  updateVisitorStatus,

  getAdminNotifications,
};