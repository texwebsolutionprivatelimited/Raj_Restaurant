const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const { protect } = require("../middleware/authMiddleware");

// Get all customers (Admin)
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer by phone
router.get("/phone/:phone", async (req, res) => {
  try {
    const customer = await Customer.findOne({ phone: req.params.phone });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get profile (Protected)
router.get("/profile", protect, async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id).select("-password");
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, address },
      { new: true }
    ).select("-password");
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create customer
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const customer = await Customer.create({ name, email, phone, address });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete customer (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;