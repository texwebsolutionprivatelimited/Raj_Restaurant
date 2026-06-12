const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const upload = require("../middleware/upload");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  try {
    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
      icon: req.body.icon,
      image: req.file ? req.file.path : null,
    });

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      icon: req.body.icon,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;