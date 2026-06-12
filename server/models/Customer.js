const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    unique: true,
    sparse: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  password: { type: String, required: true },

  address: { type: String, default: "" },

  orders: { type: Number, default: 0 },

  totalSpent: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ["New", "Regular", "Premium", "VIP"],
    default: "New",
  },

  points: { type: Number, default: 0 },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

customerSchema.methods.comparePassword = async function (
  candidatePassword
) {
  return await bcrypt.compare(
    candidatePassword,
    this.password
  );
};

module.exports = mongoose.model(
  "Customer",
  customerSchema
);