const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Create Appointment
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { date } = req.body;
    const appointment = new Appointment({ patient: req.user.id, date });
    await appointment.save();
    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get User's Appointments
router.get("/", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id }).populate("doctor", "name");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
