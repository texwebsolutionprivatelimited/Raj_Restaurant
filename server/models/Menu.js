const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },

  category: {
    type: String,
    required: true,
    enum: [
      "Sweets",
      "Spicy",
      "Beverages",
      "Other"
    ]
  },

  price: { type: Number, required: true },
  discount: { type: String, default: "" },
  stock: { type: Number, default: 0 },

  description: { type: String, default: "" },
  highlights: { type: String, default: "" },
  specifications: { type: String, default: "" },

  image: { type: String, default: null },

  // Veg / Non-Veg
  isVeg: {
  type: Boolean,
  default: true,
  required: true
},

  // NEW
  rating: {
    type: Number,
    default: 4.5
  },

  // NEW
  featured: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: ["In Stock", "Low Stock", "Out of Stock"],
    default: "Out of Stock"
  },

  spicyLevel: {
    type: String,
    enum: ["Mild", "Medium", "High", "Extra"],
    default: "Mild"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Menu", menuSchema);