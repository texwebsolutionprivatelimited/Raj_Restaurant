const mongoose = require("mongoose");

const roomBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  roomType: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: Number, default: 1 },
  request: { type: String, default: "" },
  status: { 
    type: String, 
    enum: ["Pending", "Confirmed", "Cancelled"], 
    default: "Pending" 
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RoomBooking", roomBookingSchema);