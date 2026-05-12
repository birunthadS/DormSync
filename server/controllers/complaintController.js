const Complaint =
  require("../models/Complaint");

const Notification =
  require("../models/Notification");

const createComplaint =
  async (req, res) => {

    try {

      const {
        category,
        description,
        roomNumber,
      } = req.body;

      const complaint =
        await Complaint.create({
          category,
          description,
          roomNumber,

          createdBy:
            req.user._id,
        });

      await Notification.create({
        message:
          `New complaint from Room ${roomNumber}`,

        forRole:
          "admin",
      });

      res
        .status(201)
        .json(complaint);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getStudentComplaints =
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

const getAllComplaints =
  async (req, res) => {

    try {

      const complaints =
        await Complaint.find()
          .populate(
            "createdBy",
            "name email"
          )
          .sort({
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

const resolveComplaint =
  async (req, res) => {

    try {

      const complaint =
        await Complaint.findById(
          req.params.id
        );

      if (!complaint) {

        return res
          .status(404)
          .json({
            message:
              "Complaint not found",
          });
      }

      complaint.status =
        "Resolved";

      await complaint.save();

      await Notification.create({
        message:
          `Complaint resolved for Room ${complaint.roomNumber}`,

        forRole:
          "student",
      });

      res.json({
        message:
          "Complaint resolved",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  createComplaint,

  getStudentComplaints,

  getAllComplaints,

  resolveComplaint,
};