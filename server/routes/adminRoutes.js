const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Menu = require("../models/Menu");
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const EventBooking = require("../models/EventBooking");
const Offer = require("../models/Offer");
const Category = require("../models/Category");
const upload = require("../middleware/upload");
const mongoose = require("mongoose");

const Setting = require("../models/Setting");


// ===== MENU MANAGEMENT =====
// Get all menu items
router.get("/menu", async (req, res) => {
  try {
    const items = await Menu.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add menu item
router.post("/menu", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      discount,
      stock,
      description,
      highlights,
      specifications,
    } = req.body;
    const isVeg = req.body.isVeg === "true" || req.body.isVeg === true;
    const numPrice = Number(price);
    const numStock = Number(stock);

    const status =
      numStock <= 0
        ? "Out of Stock"
        : numStock <= 20
          ? "Low Stock"
          : "In Stock";

    const item = await Menu.create({
      name,
      category,
      price: numPrice,
      discount,
      stock: numStock,
      description,
      highlights,
      specifications,
      image: req.file?.path || "",
      status,
      isVeg
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update menu item
router.put("/menu/:id", upload.single("image"), async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    // ✅ FIX THIS
    data.isVeg =
      req.body.isVeg === "true" || req.body.isVeg === true;

    if (req.file) {
      data.image = req.file.path;
    }

    if (data.price) data.price = Number(data.price);
    if (data.stock) data.stock = Number(data.stock);

    data.status =
      data.stock <= 0
        ? "Out of Stock"
        : data.stock <= 20
          ? "Low Stock"
          : "In Stock";

    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete menu item
router.delete("/menu/:id", async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== ORDER MANAGEMENT =====
// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status

router.put("/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//offers 
router.post("/apply", async (req, res) => {
  try {
    const { code, orderAmount = 0 } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Coupon code required" });
    }

    const offer = await Offer.findOne({
      code: code.toUpperCase(),
      active: true,
    });

    if (!offer) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    if (orderAmount < offer.minOrder) {
      return res.status(400).json({
        message: `Minimum order ₹${offer.minOrder} required`,
      });
    }

    let discountAmount = 0;

    if (offer.type === "Percentage") {
      discountAmount = (orderAmount * offer.discount) / 100;
    }

    if (offer.type === "Flat") {
      discountAmount = offer.discount;
    }

    if (offer.type === "Shipping") {
      return res.json({
        success: true,
        discountAmount: 0,
        offerType: "Shipping",
        message: "Free Shipping Applied",
      });
    }

    return res.json({
      success: true,
      discountAmount,
      offerType: offer.type,
    });

  } catch (err) {
    console.error("APPLY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/offers", async (req, res) => {
  try {
    const { code, type, discount, minOrder, maxUsage, validUntil, description } = req.body;

    if (!code || discount === undefined) {
      return res.status(400).json({ message: "Code & discount required" });
    }

    const existing = await Offer.findOne({ code: code.toUpperCase() });

    if (existing) {
      return res.status(400).json({ message: "Coupon already exists" });
    }

    const offer = await Offer.create({
      code: code.toUpperCase(),
      type,
      discount: Number(discount),
      minOrder: Number(minOrder) || 0,
      maxUsage: Number(maxUsage) || 100,
      validUntil,
      description,
      active: true,
      usage: 0,
    });

    res.status(201).json({
      success: true,
      offer,
    });

  } catch (error) {
    console.error("OFFER CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ===== CUSTOMER MANAGEMENT =====
/*
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

     console.log("CUSTOMERS =>", customers);
    const formatted = customers.map((c) => ({
      _id: c._id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      address: c.address,
      createdAt: c.createdAt,

      // IMPORTANT FIX (fallbacks)
      orders: c.orders?.length || 0,
      totalSpent: c.totalSpent || 0,

      status:
        c.totalSpent > 8000
          ? "VIP"
          : c.totalSpent > 5000
            ? "Premium"
            : c.totalSpent > 1000
              ? "Regular"
              : "New",

      points: c.points || 0,
      joined: c.createdAt,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});*/

router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();

    const formatted = customers.map((c) => ({
      ...c.toObject(),

      orders: c.orders || 0,
      totalSpent: c.totalSpent || 0,
      points: c.points || 0,

      status:
        c.status ||
        ((c.totalSpent || 0) > 8000
          ? "VIP"
          : (c.totalSpent || 0) > 5000
            ? "Premium"
            : (c.totalSpent || 0) > 1000
              ? "Regular"
              : "New"),
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===== BOOKING MANAGEMENT =====
router.put(
  "/event-bookings/:id/status",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { status } = req.body;

      // Validation
      if (!["Pending", "Confirmed"].includes(status)) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      const booking = await EventBooking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      res.json(booking);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

router.get(
  "/event-bookings",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const bookings = await EventBooking.find().sort({
        createdAt: -1,
      });

      res.json(bookings);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ===== OFFER MANAGEMENT =====
router.get("/offers", async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.put("/offers/:id", async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/offers/:id", async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: "Offer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== CATEGORY MANAGEMENT =====
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
router.post("/categories", upload.single("image"), async (req, res) => {
  console.log("=== HIT ===");
  console.log(req.body);
  console.log(req.file);
  try {
    const existingCategory = await Category.findOne({
      name: new RegExp(`^${req.body.name}$`, "i"),
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
      icon: req.body.icon,
      image: req.file ? req.file.path : null,
    });


    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});*/

router.post("/categories", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    return res.json({
      body: req.body,
      file: req.file,
    });
  } catch (error) {
    console.error(error);
  }
});

router.put("/categories/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      icon: req.body.icon,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/categories/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== DASHBOARD STATS =====
// ===== DASHBOARD STATS =====
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const { filter } = req.query;

    let dateFilter = {};
    const now = new Date();

    if (filter === "today") {
      dateFilter = {
        createdAt: {
          $gte: new Date(now.setHours(0, 0, 0, 0)),
        },
      };
    }

    if (filter === "week") {
      dateFilter = {
        createdAt: {
          $gte: new Date(now.setDate(now.getDate() - 7)),
        },
      };
    }

    if (filter === "month") {
      dateFilter = {
        $gte: new Date(now.setMonth(now.getMonth() - 1)),
      };
    }

    const orders = await Order.find(dateFilter);
    const bookings = await EventBooking.find(dateFilter); // ✅ FIXED
    const customers = await Customer.find(dateFilter);

    const revenue = orders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    );

    res.json({
      totalOrders: orders.length,
      totalBookings: bookings.length,
      totalCustomers: customers.length,
      totalRevenue: revenue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/settings", async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/settings", async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    res.json({
      success: true,
      settings,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const items = await Menu.find({
      featured: true,
      status: { $ne: "Out of Stock" },
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;