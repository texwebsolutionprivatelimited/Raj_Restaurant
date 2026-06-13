const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const Menu = require("./models/Menu");
const roomBookingRoutes = require("./routes/roomBookingRoutes");
const Offer = require("./models/Offer");
const Category = require("./models/Category");
const categoryRoutes = require("./routes/categoryRoutes");
const EventBooking = require("./models/EventBooking.js")
const offerRoutes = require("./routes/offerRoutes");
const paymentRoutes = require("./routes/paymentRoutes.js");
const eventBookingRoutes = require("./routes/eventBookingRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Public Routes
app.get("/api/menu", async (req, res) => {
  const items = await Menu.find({ status: { $ne: "Out of Stock" } });
  res.json(items);
});

app.get("/api/offers", async (req, res) => {
  const offers = await Offer.find({ active: true });
  res.json(offers);
});

app.get("/api/menu/featured", async (req, res) => {
  try {
    const items = await Menu.find({
      featured: true,
      status: { $ne: "Out of Stock" },
    }).limit(4);

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Auth Routes
app.use("/api/auth", authRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);


app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/payments", paymentRoutes);

app.use("/api/event-bookings", eventBookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/room-bookings", roomBookingRoutes);
app.use("/api/offers", adminRoutes);


app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

// Status
app.get("/api/status", (req, res) => {
  res.json({ status: "online", message: "API Running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});