const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Customer = require("../models/Customer");

const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });

// Admin Login
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (admin && (await admin.comparePassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
        token: generateToken(admin._id, "admin"),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Customer/User Register
router.post("/register", async (req, res) => {
  try {
    const { name, email,phone,  password } = req.body;

    const customerExists = await Customer.findOne({
      $or: [{ email , phone}],
    });

    if (customerExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const customer = await Customer.create({
      name,
      email,
      password,
      phone,
      status: "New",
    });

    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      role: "user",
      token: generateToken(customer._id, "user"),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
});

// Customer Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ $or: [{ email }]});
    
    if (customer && (await customer.comparePassword(password))) {
      res.json({
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        //phone: customer.phone,
        role: "user",
        token: generateToken(customer._id, "user"),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create Initial Admin
router.post("/init", async (req, res) => {
  try {
    const adminExists = await Admin.findOne({ email: "admin@rajrestaurant.com" });

    if (adminExists) {
      return res.json({ message: "Admin already exists" });
    }

    const admin = new Admin({
      name: "Admin",
      email: "admin@rajrestaurant.com",
      password: "admin123",
      role: "admin",
    });

    await admin.save(); // ensures pre-save runs properly

    res.status(201).json({
      message: "Admin created",
      email: admin.email,
      password: "admin123",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;