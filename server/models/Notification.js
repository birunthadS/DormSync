const mongoose =
  require("mongoose");

const notificationSchema =
  new mongoose.Schema(
    {
      message: {
        type: String,
        required: true,
      },

      forRole: {
        type: String,

        enum: [
          "student",
          "admin",
        ],

        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Notification",
    notificationSchema
  );