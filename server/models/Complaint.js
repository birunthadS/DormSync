const mongoose =
  require("mongoose");

const complaintSchema =
  new mongoose.Schema(
    {
      category: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      roomNumber: {
        type: String,
        required: true,
      },

      status: {
        type: String,

        enum: [
          "Pending",
          "Resolved",
        ],

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

module.exports =
  mongoose.models.Complaint ||
  mongoose.model(
    "Complaint",
    complaintSchema
  );