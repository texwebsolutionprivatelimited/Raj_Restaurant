const Menu = require("../models/Menu");

exports.getAllMenuItems = async (req, res) => {
  try {
    const items = await Menu.find().sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = new Menu({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      discount: req.body.discount,
      stock: req.body.stock,
      status: req.body.status,
      description: req.body.description,
      highlights: req.body.highlights,
      specifications: req.body.specifications,
      image: req.body.image || "",
    });

    const savedItem = await menuItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};