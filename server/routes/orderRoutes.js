const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// USER - create order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ ADD THIS (IMPORTANT)
router.get("/", async (req, res) => {
  console.log("HEADERS:", req.headers);
  console.log("BODY RAW:", req.body);
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// USER - my orders (future use with auth)
router.get("/my", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user?.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


/*
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Menu = require("../models/Menu");
const Customer = require("../models/Customer");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Generate order ID
const generateOrderId = () => "ORD" + Math.floor(100000 + Math.random() * 900000);

// Get all orders (Admin)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer orders (Protected)
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ "customer.phone": req.user.phone }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    
    if (order.customer.phone !== req.user.phone && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order
router.post("/", async (req, res) => {
  try {
    const { customer, items, amount, paymentMethod, date, time } = req.body;

    // Check stock
    for (const item of items) {
      const menuItem = await Menu.findOne({ name: item.name });
      if (!menuItem) return res.status(400).json({ message: `Item ${item.name} not found` });
      if (menuItem.stock < item.qty) return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
    }

    // Deduct stock
    for (const item of items) {
      await Menu.findOneAndUpdate({ name: item.name }, { $inc: { stock: -item.qty } });
    }

    // Create order
    const order = await Order.create({
      orderId: generateOrderId(),
      customer,
      items,
      amount,
      payment: paymentMethod === "COD" ? "Pending" : "Paid",
      paymentMethod,
      status: "Pending",
      date,
      time,
    });

    // Update customer
    if (customer.phone) {
      await Customer.findOneAndUpdate(
        { phone: customer.phone },
        { $inc: { orders: 1, totalSpent: amount }, $set: { name: customer.name, email: customer.email, address: customer.address } },
        { upsert: true }
      );
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update status (Admin)
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel order
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.customer.phone !== req.user.phone) return res.status(403).json({ message: "Not authorized" });
    if (order.status !== "Pending" && order.status !== "Preparing") {
      return res.status(400).json({ message: "Cannot cancel" });
    }

    // Restore stock
    for (const item of order.items) {
      await Menu.findOneAndUpdate({ name: item.name }, { $inc: { stock: item.qty } });
    }

    order.status = "Cancelled";
    order.payment = "Refunded";
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete order (Admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

*/