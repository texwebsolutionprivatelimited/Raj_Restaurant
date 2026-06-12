const express = require("express");
const router = express.Router();
const RoomBooking = require("../models/RoomBooking");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET all bookings (Admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const bookings = await RoomBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - User create booking (Public)
router.post("/", async (req, res) => {
  try {
    const booking = await RoomBooking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Update status (Admin)
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await RoomBooking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE (Admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const booking = await RoomBooking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;