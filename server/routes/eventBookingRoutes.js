const express = require("express");
const router = express.Router();

const EventBooking = require("../models/EventBooking");

router.post("/", async (req, res) => {
  try {
     console.log("🔥 BODY RECEIVED:", req.body);
      console.log("HEADERS:", req.headers);
    const booking = await EventBooking.create(req.body);

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;