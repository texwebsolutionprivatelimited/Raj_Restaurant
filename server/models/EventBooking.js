const mongoose = require("mongoose");

const eventBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    eventType: {
      type: String,
      required: true,
    },

    guests: Number,

    date: Date,

    venue: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "EventBooking",
  eventBookingSchema
);