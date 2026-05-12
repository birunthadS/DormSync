const mongoose =
  require("mongoose");

const Complaint =
  require("../models/Complaint");

const Notification =
  require("../models/Notification");

const visitorSchema =
  new mongoose.Schema(
    {
      visitorName: String,
      purpose: String,
      roomNumber: String,

      status: {
        type: String,
        default: "Pending",
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

const Visitor =
  mongoose.models.Visitor ||
  mongoose.model(
    "Visitor",
    visitorSchema
  );

const createVisitor =
  async (req, res) => {

    try {

      const visitor =
        await Visitor.create({
          visitorName:
            req.body
              .visitorName,

          purpose:
            req.body.purpose,

          roomNumber:
            req.body.roomNumber,

          createdBy:
            req.user._id,
        });

      await Notification.create({
        message:
          `Visitor request for Room ${req.body.roomNumber}`,

        forRole:
          "admin",
      });

      res
        .status(201)
        .json(visitor);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getVisitors =
  async (req, res) => {

    try {

      const visitors =
        await Visitor.find({
          createdBy:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.json(
        visitors
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getComplaints =
  async (req, res) => {

    try {

      const complaints =
        await Complaint.find({
          createdBy:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.json(
        complaints
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getStudentNotifications =
  async (req, res) => {

    const notifications =
      await Notification.find({
        forRole:
          "student",
      }).sort({
        createdAt: -1,
      });

    res.json(
      notifications
    );
  };

module.exports = {
  createVisitor,

  getVisitors,

  getComplaints,

  getStudentNotifications,
};