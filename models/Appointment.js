const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "completed"], default: "pending" },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
