const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },

  type: {
    type: String,
    enum: ["Percentage", "Flat", "Shipping"],
    default: "Percentage",
  },

  discount: {
    type: Number,
    required: function () {
      return this.type !== "Shipping";
    },
  },

  minOrder: {
    type: Number,
    default: 0,
  },

  maxUsage: {
    type: Number,
    default: 100,
  },

  usage: {
    type: Number,
    default: 0,
  },

  active: {
    type: Boolean,
    default: true,
  },

  validUntil: Date,

  description: String,
},
  {
    timestamps: true,
  });

module.exports = mongoose.model("Offer", offerSchema);