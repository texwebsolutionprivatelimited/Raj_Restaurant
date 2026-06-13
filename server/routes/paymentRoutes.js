const express = require("express");
const router = express.Router();

// dummy test route
router.get("/", (req, res) => {
  res.json([
    {
      _id: "1",
      customer: "Test User",
      amount: 100,
      status: "Success",
    },
  ]);
});

module.exports = router;