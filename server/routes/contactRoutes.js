const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// CREATE message
router.post("/", async (req, res) => {
  try {
    const msg = await Contact.create(req.body);
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all messages (ADMIN)
router.get("/", async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;