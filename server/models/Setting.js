const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    restaurantName: String,
    email: String,
    phone: String,
    address: String,
    description: String,

    currency: String,
    timezone: String,
    language: String,

    orderPrepTime: Number,
    minOrderAmount: Number,
    maxOrderAmount: Number,
    deliveryRadius: Number,

    acceptCOD: Boolean,
    acceptUPI: Boolean,
    acceptCard: Boolean,

    emailNotifications: Boolean,
    smsNotifications: Boolean,
    orderAlerts: Boolean,

    taxEnabled: Boolean,
    taxName: String,
    taxRate: Number,

    maintenanceMode: Boolean,
    darkMode: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);