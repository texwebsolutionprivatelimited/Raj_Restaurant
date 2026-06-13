const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },

    customer: {
      name: { type: String, required: true },
      email: String,
      phone: { type: String, required: true },
      address: String,
    },

    items: [
      {
        name: String,
        qty: Number,
        price: Number,
      },
    ],

    amount: { type: Number, required: true },

    payment: {
      type: String,
      enum: ["Paid", "Pending", "Refunded"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    transactionId: String,

    status: {
      type: String,
      enum: [
        "Pending",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    totalAmount: Number,
    guestCount: {
      type: Number,
      default: 1,
    },

    tableId: {
      type: String,
      default: null,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);