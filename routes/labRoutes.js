const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const LabResult = require("../models/LabResult");

const router = express.Router();

// Add Lab Result
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { testName, result } = req.body;
    const labResult = new LabResult({ patient: req.user.id, testName, result });
    await labResult.save();
    res.status(201).json({ message: "Lab result added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
