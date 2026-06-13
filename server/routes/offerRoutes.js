const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");

// GET all offers
router.get("/", async (req, res) => {
  res.json(await Offer.find());
});

// CREATE offer
router.post("/", async (req, res) => {
  const offer = await Offer.create(req.body);
  res.json(offer);
});

// UPDATE offer
router.put("/:id", async (req, res) => {
  const updated = await Offer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE offer
router.delete("/:id", async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});


// ✅ ADD THIS: APPLY COUPON
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
    } else if (offer.type === "Flat") {
      discountAmount = offer.discount;
    } else if (offer.type === "Shipping") {
      return res.json({
        success: true,
        discountAmount: 40,
        offerType: "Shipping",
      });
    }

    return res.json({
      success: true,
      discountAmount,
      offerType: offer.type,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;